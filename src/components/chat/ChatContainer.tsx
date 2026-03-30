"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage, CardData } from "@/types";
import type { ParsedResponse } from "@/lib/response-parser";
import { SUGGESTION_CHIPS, getFormattedDate } from "@/data/sarah-world";
import { matchGoldenResponse } from "@/data/golden-responses";
import { ChatMessage as ChatMessageBubble } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";

const TIMEOUT_MS = 8000;

function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(SUGGESTION_CHIPS);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);
  const hasSentWelcome = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const [welcomeGeneration, setWelcomeGeneration] = useState(0);

  // Track whether user is scrolled to the bottom
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

  // Auto-scroll only if already at bottom
  useEffect(() => {
    if (isAtBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Ctrl+Shift+R panic reset
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.shiftKey && e.key === "R") {
        e.preventDefault();
        abortRef.current?.abort();
        abortRef.current = null;
        setMessages([]);
        setSuggestions(SUGGESTION_CHIPS);
        setIsTyping(false);
        hasSentWelcome.current = false;
        setWelcomeGeneration((g) => g + 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const callApiWithTimeout = useCallback(
    async (
      apiMessages: { role: "user" | "assistant"; content: string }[],
      userText: string
    ): Promise<ParsedResponse> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const fallback = matchGoldenResponse(userText);

      try {
        const fetchPromise = fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
          signal: controller.signal,
        }).then(async (res) => {
          if (!res.ok) {
            console.error("[ava] API returned", res.status);
            throw new Error(`API ${res.status}`);
          }
          return (await res.json()) as ParsedResponse;
        });

        const result = await Promise.race([
          fetchPromise,
          new Promise<"timeout">((resolve) =>
            setTimeout(() => resolve("timeout"), TIMEOUT_MS)
          ),
        ]);

        if (result === "timeout") {
          console.warn("[ava] API timed out after 8s");
          if (fallback) {
            console.log("[ava] Using golden response fallback");
            controller.abort();
            return fallback;
          }
          console.log("[ava] No golden match, continuing to wait...");
          return await fetchPromise;
        }

        return result;
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          console.log("[ava] Request aborted");
        } else {
          console.error("[ava] API error:", error);
        }

        if (fallback) {
          console.log("[ava] Using golden response after error");
          return fallback;
        }

        return {
          text: "Sorry, I'm having a moment — could you try that again?",
          cards: [],
          suggestions: SUGGESTION_CHIPS,
        };
      }
    },
    []
  );

  // Welcome message on mount (and after panic reset)
  useEffect(() => {
    if (hasSentWelcome.current) return;
    hasSentWelcome.current = true;

    async function fetchWelcome() {
      setIsTyping(true);
      const today = getFormattedDate();
      const welcomePrompt = `[SYSTEM] The user just opened the app. Today is ${today}. Generate a warm, proactive greeting.`;
      const result = await callApiWithTimeout(
        [{ role: "user", content: welcomePrompt }],
        welcomePrompt
      );
      setMessages([
        {
          id: makeId(),
          role: "ava",
          content: result.text,
          cards: result.cards as CardData[],
          timestamp: new Date(),
        },
      ]);
      setSuggestions(result.suggestions);
      setIsTyping(false);
    }

    fetchWelcome();
  }, [callApiWithTimeout, welcomeGeneration]);

  function handleSend(text: string) {
    const userMessage: ChatMessage = {
      id: makeId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setSuggestions([]);
    isAtBottomRef.current = true;

    const history: { role: "user" | "assistant"; content: string }[] = [
      ...messages.map((m) => ({
        role: m.role === "ava" ? ("assistant" as const) : ("user" as const),
        content: m.content,
      })),
      { role: "user", content: text },
    ];

    callApiWithTimeout(history, text).then((result) => {
      setMessages((prev) => [
        ...prev,
        {
          id: makeId(),
          role: "ava",
          content: result.text,
          cards: result.cards as CardData[],
          timestamp: new Date(),
        },
      ]);
      setSuggestions(result.suggestions);
      setIsTyping(false);
    });
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header bar — below Dynamic Island */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-4 pb-3 pt-14">
        <div className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-quinyx text-sm font-semibold text-white">
          A
          {/* Online dot */}
          <span className="animate-online-pulse absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-medium text-gray-900">
            Hi Sarah
          </span>
          <span className="text-[13px] text-gray-400">
            Costa Coffee — Manchester Arndale
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-3">
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        suggestions={suggestions}
        disabled={isTyping}
      />
    </div>
  );
}
