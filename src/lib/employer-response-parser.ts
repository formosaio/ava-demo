import type { EmployerCardData } from "@/types";

export interface EmployerParsedResponse {
  text: string;
  cards: EmployerCardData[];
  suggestions: string[];
  dashboardHighlight: string | null;
}

const DEFAULT_SUGGESTIONS = [
  "How are my stores performing?",
  "Any compliance risks?",
  "Which store needs the most attention?",
  "Show me the ROI on reducing turnover",
];

export function parseEmployerResponse(rawText: string): EmployerParsedResponse {
  const trimmed = rawText.trim();

  // Try parsing as JSON directly
  try {
    const parsed = JSON.parse(trimmed);
    return normalise(parsed);
  } catch {
    // Not valid JSON
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
    dashboardHighlight: null,
  };
}

function normalise(parsed: Record<string, unknown>): EmployerParsedResponse {
  const text =
    typeof parsed.text === "string" ? parsed.text : String(parsed.text ?? "");

  const cards: EmployerCardData[] = Array.isArray(parsed.cards)
    ? (parsed.cards as EmployerCardData[]).filter(
        (c) => c && typeof c.type === "string" && c.data
      )
    : [];

  const suggestions: string[] = Array.isArray(parsed.suggestions)
    ? (parsed.suggestions as string[]).filter(
        (s) => typeof s === "string" && s.length > 0
      )
    : DEFAULT_SUGGESTIONS;

  const dashboardHighlight =
    typeof parsed.dashboard_highlight === "string"
      ? parsed.dashboard_highlight
      : null;

  return { text, cards, suggestions, dashboardHighlight };
}
