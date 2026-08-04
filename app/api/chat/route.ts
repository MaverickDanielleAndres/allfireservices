import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_INSTRUCTION } from "@/lib/allfire-knowledge";

type ChatMessage = {
  role: "user" | "model";
  content: string;
};

// Keep history short — long histories inflate latency and token cost without
// improving answer quality for a scoped support chatbot.
const MAX_HISTORY_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2_000;

// Force the route to run on the Node.js runtime — the streaming response uses
// ReadableStream which is well-supported there.
export const runtime = "nodejs";
// Each generation can take a few seconds; give the model breathing room.
export const maxDuration = 60;

function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

function sanitizeMessages(raw: unknown): ChatMessage[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const out: ChatMessage[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") return null;
    const message = entry as Record<string, unknown>;
    const role = message.role;
    const content = message.content;
    if (role !== "user" && role !== "model") return null;
    if (typeof content !== "string") return null;
    const trimmed = content.trim();
    if (!trimmed) return null;
    if (trimmed.length > MAX_CONTENT_LENGTH) return null;
    out.push({ role, content: trimmed });
  }
  return out;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Don't leak the variable name to the client.
    return NextResponse.json(
      { error: "Chat service is not configured." },
      { status: 503 },
    );
  }

  let payload: { messages?: unknown };
  try {
    payload = (await req.json()) as { messages?: unknown };
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const messages = sanitizeMessages(payload.messages);
  if (!messages) {
    return badRequest("Messages must be a non-empty array of { role, content }.");
  }

  // Always end on a user turn so we know what to answer.
  if (messages[messages.length - 1].role !== "user") {
    return badRequest("Last message must be from the user.");
  }

  // Trim history from the front so the most recent context survives.
  const trimmedHistory = messages.slice(-MAX_HISTORY_MESSAGES);
  const lastMessage = trimmedHistory[trimmedHistory.length - 1].content;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      // 1.5 Flash is the fastest Gemini tier — ideal for a chat widget where
      // perceived latency matters more than depth.
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.4,
        topP: 0.85,
        topK: 32,
        maxOutputTokens: 512,
        // Faster first-token latency.
        candidateCount: 1,
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH },
      ],
    });

    const formattedHistory = trimmedHistory
      .slice(0, -1)
      .map((m) => ({ role: m.role, parts: [{ text: m.content }] }));

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessageStream(lastMessage);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
      cancel() {
        // Client disconnected — stop reading from the model.
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("[/api/chat] error:", error);
    return NextResponse.json(
      { error: "Sorry — something went wrong on our end. Please call 1300 765 594." },
      { status: 500 },
    );
  }
}

// Reject other methods cleanly.
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
