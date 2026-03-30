import Anthropic from "@anthropic-ai/sdk";
import { buildEmployerSystemPrompt } from "@/lib/employer-system-prompt";
import { parseEmployerResponse } from "@/lib/employer-response-parser";
import type { EmployerParsedResponse } from "@/lib/employer-response-parser";
import type { ApiMessage } from "@/lib/claude";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1024;

const FALLBACK_RESPONSE: EmployerParsedResponse = {
  text: "Sorry, I'm having a moment — could you try that again?",
  cards: [],
  suggestions: [
    "How are my stores performing?",
    "Any compliance risks?",
    "Which store needs the most attention?",
  ],
  dashboardHighlight: null,
};

export async function sendEmployerMessage(
  messages: ApiMessage[]
): Promise<EmployerParsedResponse> {
  try {
    const systemPrompt = buildEmployerSystemPrompt();

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages,
    });

    const block = response.content[0];
    if (block.type !== "text") {
      console.error("[ava-employer] Unexpected response block type:", block.type);
      return FALLBACK_RESPONSE;
    }

    return parseEmployerResponse(block.text);
  } catch (error) {
    console.error("[ava-employer] Claude API error:", error);
    return FALLBACK_RESPONSE;
  }
}
