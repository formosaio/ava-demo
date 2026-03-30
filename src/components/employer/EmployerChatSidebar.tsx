"use client";

import { useState, useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from "react";
import { useRouter } from "next/navigation";
import type { ChatMessage, EmployerCardData } from "@/types";
import type { EmployerParsedResponse } from "@/lib/employer-response-parser";
import { getFormattedDate } from "@/data/sarah-world";
import { matchEmployerGoldenResponse, GUIDED_STEPS } from "@/data/employer-golden-responses";
import { EmployerCardRenderer } from "./cards/EmployerCardRenderer";

const EMPLOYER_SUGGESTIONS = [
  "Morning briefing",
  "Which store needs most attention?",
  "Show me compliance risks",
];

const TIMEOUT_MS = 8000;

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export interface EmployerChatHandle {
  sendFromDashboard: (text: string) => void;
}

interface EmployerChatSidebarProps {
  onHighlight: (slug: string | null) => void;
}

export const EmployerChatSidebar = forwardRef<EmployerChatHandle, EmployerChatSidebarProps>(
  function EmployerChatSidebar({ onHighlight }, ref) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>(EMPLOYER_SUGGESTIONS);
    const scrollRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const isAtBottomRef = useRef(true);
    const hasSentWelcome = useRef(false);
    const abortRef = useRef<AbortController | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState("");
    const [welcomeGeneration, setWelcomeGeneration] = useState(0);
    const [guidedMode, setGuidedMode] = useState(false);
    const guidedStepRef = useRef(0);
    const router = useRouter();
    const handleSendRef = useRef<(text: string) => void>(() => {});

    // Scroll tracking
    useEffect(() => {
      const el = scrollRef.current;
      if (!el) return;
      function handleScroll() {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        isAtBottomRef.current = scrollHeight - scrollTop - clientHeight < 40;
      }
      el.addEventListener("scroll", handleScroll, { passive: true });
      return () => el.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      if (isAtBottomRef.current) {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages, isTyping]);

    // Ctrl+Shift+R reset + G for guided mode
    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

        if (e.ctrlKey && e.shiftKey && e.key === "R") {
          e.preventDefault();
          abortRef.current?.abort();
          abortRef.current = null;
          setMessages([]);
          setSuggestions(EMPLOYER_SUGGESTIONS);
          setIsTyping(false);
          hasSentWelcome.current = false;
          guidedStepRef.current = 0;
          setWelcomeGeneration((g) => g + 1);
        }

        if (e.key === "g" && !e.metaKey && !e.ctrlKey && !e.altKey) {
          setGuidedMode((g) => !g);
        }
      }

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const callApiWithTimeout = useCallback(
      async (
        apiMessages: { role: "user" | "assistant"; content: string }[],
        userText: string
      ): Promise<EmployerParsedResponse> => {
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const fallback = matchEmployerGoldenResponse(userText);

        try {
          const fetchPromise = fetch("/api/employer-chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: apiMessages }),
            signal: controller.signal,
          }).then(async (res) => {
            if (!res.ok) throw new Error(`API ${res.status}`);
            return (await res.json()) as EmployerParsedResponse;
          });

          const result = await Promise.race([
            fetchPromise,
            new Promise<"timeout">((resolve) =>
              setTimeout(() => resolve("timeout"), TIMEOUT_MS)
            ),
          ]);

          if (result === "timeout") {
            console.warn("[ava-employer] API timed out after 8s");
            if (fallback) {
              console.log("[ava-employer] Using golden response fallback");
              controller.abort();
              return fallback;
            }
            console.log("[ava-employer] No golden match, continuing to wait...");
            return await fetchPromise;
          }

          return result;
        } catch (error) {
          if ((error as Error).name === "AbortError") {
            return null as unknown as EmployerParsedResponse;
          }
          console.error("[ava-employer] API error:", error);

          if (fallback) {
            console.log("[ava-employer] Using golden response after error");
            return fallback;
          }

          return {
            text: "Sorry, I'm having a moment — could you try that again?",
            cards: [],
            suggestions: EMPLOYER_SUGGESTIONS,
            dashboardHighlight: null,
          };
        }
      },
      []
    );

    function applyResponse(result: EmployerParsedResponse) {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "ava",
          content: result.text,
          cards: result.cards as unknown as ChatMessage["cards"],
          timestamp: new Date(),
        },
      ]);

      // In guided mode, use guided step suggestions; otherwise use API suggestions
      if (guidedMode) {
        const step = GUIDED_STEPS[guidedStepRef.current] ?? GUIDED_STEPS[GUIDED_STEPS.length - 1];
        setSuggestions(step);
        guidedStepRef.current = Math.min(guidedStepRef.current + 1, GUIDED_STEPS.length - 1);
      } else {
        setSuggestions(result.suggestions);
      }

      onHighlight(result.dashboardHighlight);
      setIsTyping(false);
    }

    // Welcome
    useEffect(() => {
      if (hasSentWelcome.current) return;
      hasSentWelcome.current = true;

      async function fetchWelcome() {
        setIsTyping(true);
        const today = getFormattedDate();
        const welcomePrompt = `[SYSTEM] James just opened his dashboard. Today is ${today}. Give a concise morning briefing: what needs attention, what's going well, and one proactive network insight.`;
        const result = await callApiWithTimeout(
          [{ role: "user", content: welcomePrompt }],
          welcomePrompt
        );
        if (!result) { setIsTyping(false); return; }

        setMessages([
          {
            id: makeId(),
            role: "ava",
            content: result.text,
            cards: result.cards as unknown as ChatMessage["cards"],
            timestamp: new Date(),
          },
        ]);

        if (guidedMode) {
          setSuggestions(GUIDED_STEPS[0]);
          guidedStepRef.current = 1;
        } else {
          setSuggestions(result.suggestions);
        }
        onHighlight(result.dashboardHighlight);
        setIsTyping(false);
      }

      fetchWelcome();
    }, [callApiWithTimeout, onHighlight, welcomeGeneration, guidedMode]);

    function handleSend(text: string) {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      // Navigate to employee view if requested
      if (trimmed.toLowerCase().includes("sarah's experience") || trimmed.toLowerCase().includes("view as employee")) {
        router.push("/employee");
        return;
      }

      const userMessage: ChatMessage = {
        id: makeId(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);
      setSuggestions([]);
      setInputValue("");
      isAtBottomRef.current = true;

      const history: { role: "user" | "assistant"; content: string }[] = [
        ...messages.map((m) => ({
          role: m.role === "ava" ? ("assistant" as const) : ("user" as const),
          content: m.content,
        })),
        { role: "user", content: trimmed },
      ];

      callApiWithTimeout(history, trimmed).then((result) => {
        if (!result) { setIsTyping(false); return; }
        applyResponse(result);
      });
    }

    // Keep ref in sync for useImperativeHandle
    useEffect(() => {
      handleSendRef.current = handleSend;
    });

    useImperativeHandle(ref, () => ({
      sendFromDashboard(text: string) {
        handleSendRef.current(text);
      },
    }));

    return (
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center gap-2.5 border-b border-gray-100 px-4 py-3">
          <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-quinyx text-xs font-semibold text-white">
            A
            <span className="animate-online-pulse absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border-[1.5px] border-white bg-green-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-semibold text-gray-900">Ava</p>
              {guidedMode && (
                <span className="rounded bg-quinyx/10 px-1.5 py-0.5 text-[9px] font-semibold text-quinyx uppercase tracking-wide">
                  Guided
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-400">Workforce intelligence</p>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto py-2">
          {messages.map((msg) => {
            const isAva = msg.role === "ava";
            return (
              <div
                key={msg.id}
                className={`animate-message-in flex ${isAva ? "justify-start" : "justify-end"} px-3 py-0.5`}
              >
                <div className={`flex max-w-[90%] gap-1.5 ${isAva ? "flex-row" : "flex-row-reverse"}`}>
                  {isAva && (
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-quinyx text-[10px] font-semibold text-white">
                      A
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5">
                    <div
                      className={`rounded-xl px-3 py-2 text-[14px] leading-relaxed ${
                        isAva
                          ? "rounded-tl-sm bg-gray-100 text-gray-900"
                          : "rounded-tr-sm bg-quinyx text-white"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.cards && (msg.cards as unknown as EmployerCardData[]).length > 0 && (
                      <div className="mt-0.5 flex flex-col gap-1">
                        {(msg.cards as unknown as EmployerCardData[]).map((card, i) => (
                          <div
                            key={i}
                            className="animate-card-in"
                            style={{ animationDelay: `${(i + 1) * 100}ms` }}
                          >
                            <EmployerCardRenderer card={card} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div className="animate-fade-in flex justify-start px-3 py-0.5">
              <div className="flex gap-1.5">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-quinyx text-[10px] font-semibold text-white">
                  A
                </div>
                <div className="flex items-center gap-1 rounded-xl rounded-tl-sm bg-gray-100 px-3 py-2">
                  <span className="animate-dot-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                  <span className="animate-dot-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
                  <span className="animate-dot-3 h-1.5 w-1.5 rounded-full bg-gray-400" />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 px-3 pb-3 pt-2">
          {suggestions.length > 0 && (
            <div className="mb-1.5 flex gap-1.5 overflow-x-auto scrollbar-none">
              {suggestions.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  disabled={isTyping}
                  onClick={() => handleSend(chip)}
                  className="flex-shrink-0 rounded-full border border-gray-200 px-2.5 py-1 text-[13px] text-gray-500 transition-colors hover:border-quinyx hover:text-quinyx disabled:opacity-40"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(inputValue); }}
              placeholder="Ask Ava..."
              disabled={isTyping}
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-quinyx focus:outline-none disabled:opacity-40"
            />
            <button
              type="button"
              disabled={isTyping || !inputValue.trim()}
              onClick={() => handleSend(inputValue)}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-quinyx text-white transition-opacity hover:opacity-90 disabled:opacity-30"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22 11 13 2 9z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
);
