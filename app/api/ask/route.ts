import { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/ask-system-prompt";
import { findPersona } from "@/lib/ask-personas";

// Edge runtime — better for streaming, lower cold start
export const runtime = "edge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  apiKey: string;
  model: string;
  personaId?: string;
  customPersona?: string;
  messages: ChatMessage[];
}

export async function POST(req: NextRequest) {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { apiKey, model, personaId, customPersona, messages } = body;

  if (!apiKey || !apiKey.startsWith("sk-or-")) {
    return new Response(
      JSON.stringify({
        error: "Missing or invalid OpenRouter key. Keys start with 'sk-or-'.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "No messages provided" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const persona = personaId ? findPersona(personaId) : undefined;
  const systemPrompt = buildSystemPrompt(persona, customPersona);

  // Build the OpenRouter request
  const openrouterBody = {
    model: model || "anthropic/claude-haiku-4.5",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 1200,
  };

  const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://gita-five.vercel.app",
      "X-Title": "Gita Companion",
    },
    body: JSON.stringify(openrouterBody),
  });

  if (!orRes.ok) {
    const text = await orRes.text();
    return new Response(
      JSON.stringify({
        error: `OpenRouter error (${orRes.status}): ${text.slice(0, 400)}`,
      }),
      { status: orRes.status, headers: { "Content-Type": "application/json" } }
    );
  }

  // Stream the response back to the client.
  // OpenRouter sends SSE events; we parse them and re-emit just the text deltas
  // so the client doesn't need to parse SSE.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = orRes.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          // SSE messages are separated by \n\n
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const parsed = JSON.parse(payload);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // skip malformed line
            }
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
