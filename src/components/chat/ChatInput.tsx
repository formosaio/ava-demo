"use client";

import { useState, useRef } from "react";
import type { ChatInputProps } from "@/types";

export function ChatInput({ onSend, suggestions, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <div className="border-t border-gray-100 bg-white px-3 pb-5 pt-2">
      {/* Suggestion chips */}
      {suggestions.length > 0 && (
        <div className="mb-2 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {suggestions.map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={disabled}
              onClick={() => handleSend(chip)}
              className="flex-shrink-0 rounded-full border border-gray-200 px-3 py-1.5 text-[14px] text-gray-600 transition-colors hover:border-quinyx hover:text-quinyx disabled:opacity-40"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend(value);
          }}
          placeholder="Ask Ava anything..."
          disabled={disabled}
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-[15px] text-gray-900 placeholder:text-gray-400 focus:border-quinyx focus:outline-none disabled:opacity-40"
        />
        <button
          type="button"
          disabled={disabled || !value.trim()}
          onClick={() => handleSend(value)}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-quinyx text-white transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 2 11 13" />
            <path d="M22 2 15 22 11 13 2 9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
