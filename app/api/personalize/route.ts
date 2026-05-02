import { NextRequest } from "next/server";
import { CHAPTERS } from "@/lib/chapters";

export const runtime = "edge";

interface RequestBody {
  apiKey: string;
  model?: string;
  chapterN: number;
  profileContext: string;
}

export async function POST(req: NextRequest) {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { apiKey, model, chapterN, profileContext } = body;

  if (!apiKey || !apiKey.startsWith("sk-or-")) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid OpenRouter key" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const chapter = CHAPTERS.find((c) => c.n === chapterN);
  if (!chapter) {
    return new Response(
      JSON.stringify({ error: "Chapter not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  const systemPrompt = `You are writing a "Modern Mirror" - a 3-4 sentence translation of a chapter of the Bhagavad Gita to a specific reader's actual life.

You will be given:
- The chapter's number, title, and central teaching
- The universal Modern Mirror (already written for all readers)
- A profile of THIS reader

Your job: write a NEW Modern Mirror calibrated to this specific reader. It should land where they actually are - their life stage, what's loudest in their life, what they're afraid of, what they're trying to decide. Use details from their profile. Be specific. Don't reuse the universal Mirror's phrasing.

CRITICAL RULES:
1. Length: 3-4 sentences. No more. The Gita's verses are short.
2. Form: Write in the same voice as the universal Modern Mirror - direct, concrete, second-person ("you"). Not therapeutic. Not flattering.
3. Use specifics from their profile. If they wrote "I'm afraid I've wasted twenty years," reference twenty years. If they're a college student weighing a job, that's the situation.
4. Don't moralize. Don't list. Don't summarize the chapter - translate the chapter's teaching to their situation.
5. End with a clean landing - a small invitation, a sharp question, a clear name of what's at stake. Not a wrap-up. Not "I hope this helps."
6. Output ONLY the Modern Mirror body text. No headline, no tag, no preamble like "Here is your personalized..." Just the prose.

If the reader's profile is sparse, work with what's there - don't refuse, don't ask for more.`;

  const userPrompt = `THE CHAPTER:
Chapter ${chapter.n}: ${chapter.title} (${chapter.sanskrit})
Subtitle: ${chapter.subtitle}

UNIVERSAL MODERN MIRROR (already shown to the reader - write something different but in the same voice):
"${chapter.mirror.body}"

THIS READER:
${profileContext}

Write the personalized Modern Mirror for this reader and this chapter now. 3-4 sentences. Specific to them.`;

  const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://gita-five.vercel.app",
      "X-Title": "Gita Companion - Personalize",
    },
    body: JSON.stringify({
      model: model || "anthropic/claude-haiku-4.5",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      stream: true,
      temperature: 0.6,
      max_tokens: 400,
    }),
  });

  if (!orRes.ok) {
    const text = await orRes.text();
    return new Response(
      JSON.stringify({ error: `OpenRouter error (${orRes.status}): ${text.slice(0, 400)}` }),
      { status: orRes.status, headers: { "Content-Type": "application/json" } }
    );
  }

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
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {}
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
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
  });
}
