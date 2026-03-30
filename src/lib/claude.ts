import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { parseAvaResponse } from "@/lib/response-parser";
import type { ParsedResponse } from "@/lib/response-parser";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1024;

export interface ApiMessage {
  role: "user" | "assistant";
  content: string;
}

const FALLBACK_RESPONSE: ParsedResponse = {
  text: "Sorry, I'm having a moment — could you try that again?",
  cards: [],
  suggestions: [
    "When's my next shift?",
    "How much will I earn this month?",
    "Show my holiday balance",
  ],
};

export async function sendMessage(
  messages: ApiMessage[]
): Promise<ParsedResponse> {
  try {
    const systemPrompt = buildSystemPrompt();

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages,
    });

    const block = response.content[0];
    if (block.type !== "text") {
      console.error("[ava] Unexpected response block type:", block.type);
      return FALLBACK_RESPONSE;
    }

    return parseAvaResponse(block.text);
  } catch (error) {
    console.error("[ava] Claude API error:", error);
    return FALLBACK_RESPONSE;
  }
}
