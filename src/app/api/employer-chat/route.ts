import { NextResponse } from "next/server";
import { sendEmployerMessage } from "@/lib/employer-claude";
import type { ApiMessage } from "@/lib/claude";

interface RequestBody {
  messages: ApiMessage[];
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required" },
        { status: 400 }
      );
    }

    for (const msg of body.messages) {
      if (
        !msg.role ||
        !msg.content ||
        (msg.role !== "user" && msg.role !== "assistant")
      ) {
        return NextResponse.json(
          {
            error:
              'Invalid message: each message must have a role ("user" or "assistant") and content',
          },
          { status: 400 }
        );
      }
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("[ava-employer] ANTHROPIC_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const result = await sendEmployerMessage(body.messages);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[ava-employer] Route handler error:", error);
    return NextResponse.json(
      {
        text: "Sorry, I'm having a moment — could you try that again?",
        cards: [],
        suggestions: [
          "How are my stores performing?",
          "Any compliance risks?",
          "Which store needs the most attention?",
        ],
        dashboardHighlight: null,
      },
      { status: 500 }
    );
  }
}
