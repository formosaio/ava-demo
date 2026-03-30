import type { CardData } from "@/types";

export interface ParsedResponse {
  text: string;
  cards: CardData[];
  suggestions: string[];
}

const DEFAULT_SUGGESTIONS = [
  "When's my next shift?",
  "How much will I earn this month?",
  "Any overtime available?",
  "Show my holiday balance",
];

export function parseAvaResponse(rawText: string): ParsedResponse {
  const trimmed = rawText.trim();

  // Try parsing as JSON directly
  try {
    const parsed = JSON.parse(trimmed);
    return normalise(parsed);
  } catch {
    // Not valid JSON — maybe it's wrapped in markdown code fences
  }

  // Try extracting JSON from code fences
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    try {
      const parsed = JSON.parse(fenceMatch[1].trim());
      return normalise(parsed);
    } catch {
      // Still invalid
    }
  }

  // Try finding a JSON object in the text
  const braceStart = trimmed.indexOf("{");
  const braceEnd = trimmed.lastIndexOf("}");
  if (braceStart !== -1 && braceEnd > braceStart) {
    try {
      const parsed = JSON.parse(trimmed.slice(braceStart, braceEnd + 1));
      return normalise(parsed);
    } catch {
      // Give up on JSON extraction
    }
  }

  // Fall back to plain text
  return {
    text: trimmed,
    cards: [],
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

function normalise(parsed: Record<string, unknown>): ParsedResponse {
  const text =
    typeof parsed.text === "string" ? parsed.text : String(parsed.text ?? "");

  const cards: CardData[] = Array.isArray(parsed.cards)
    ? (parsed.cards as CardData[]).filter(
        (c) => c && typeof c.type === "string" && c.data
      )
    : [];

  const suggestions: string[] = Array.isArray(parsed.suggestions)
    ? (parsed.suggestions as string[]).filter(
        (s) => typeof s === "string" && s.length > 0
      )
    : DEFAULT_SUGGESTIONS;

  return { text, cards, suggestions };
}
