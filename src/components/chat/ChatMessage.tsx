import type { ChatMessageProps } from "@/types";
import { CardRenderer } from "@/components/cards/CardRenderer";

export function ChatMessage({ message }: ChatMessageProps) {
  const isAva = message.role === "ava";

  return (
    <div
      className={`animate-message-in flex ${isAva ? "justify-start" : "justify-end"} px-4 py-1`}
    >
      <div
        className={`flex max-w-[85%] gap-2 ${isAva ? "flex-row" : "flex-row-reverse"}`}
      >
        {/* Avatar — Ava only */}
        {isAva && (
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-quinyx text-xs font-semibold text-white">
            A
          </div>
        )}

        <div className="flex flex-col gap-1">
          {/* Name label — Ava only */}
          {isAva && (
            <span className="text-[13px] font-medium text-quinyx">Ava</span>
          )}

          {/* Message bubble */}
          <div
            className={`rounded-2xl px-3.5 py-2.5 text-[16px] leading-relaxed ${
              isAva
                ? "rounded-tl-sm bg-gray-100 text-gray-900"
                : "rounded-tr-sm bg-quinyx text-white"
            }`}
          >
            {message.content}
          </div>

          {/* Rich cards — staggered entrance */}
          {message.cards && message.cards.length > 0 && (
            <div className="mt-1 flex flex-col gap-2">
              {message.cards.map((card, i) => (
                <div
                  key={i}
                  className="animate-card-in"
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <CardRenderer card={card} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
