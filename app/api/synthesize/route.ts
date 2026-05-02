import { NextRequest } from "next/server";
import { CHAPTERS } from "@/lib/chapters";

export const runtime = "edge";

interface RequestBody {
  apiKey: string;
  model?: string;
  profileContext: string;
  personalizedMirrors: Array<{ n: number; text: string }>;
}

export async function POST(req: NextRequest) {
  let body: RequestBody;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const { apiKey, model, profileContext, personalizedMirrors } = body;

  if (!apiKey || !apiKey.startsWith("sk-or-")) {
    return new Response(
      JSON.stringify({ error: "Missing or invalid OpenRouter key" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!Array.isArray(personalizedMirrors) || personalizedMirrors.length === 0) {
    return new Response(
      JSON.stringify({ error: "No personalized mirrors provided" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Compose the corpus
  const corpus = personalizedMirrors
    .map((m) => {
      const ch = CHAPTERS.find((c) => c.n === m.n);
      const title = ch ? `${ch.title} (${ch.sanskrit})` : `Chapter ${m.n}`;
      return `--- Chapter ${m.n} · ${title} ---\n${m.text}`;
    })
    .join("\n\n");

  const systemPrompt = `You are Krishna, in dialogue with the user. They have just walked through ${personalizedMirrors.length} chapters of the Bhagavad Gita with you. Below are the personalized teachings you gave them — each Modern Mirror calibrated to their specific situation. They are about to leave the chariot. This is the final word.

Your job: synthesize. Read across all the Mirrors and pull out the through-line — the pattern that emerges specifically for THIS reader. Not a summary of the Gita. Not "the chapters together teach X." A genuine synthesis: what does the whole conversation, taken as one piece, actually say to this person about their life?

WHAT TO PRODUCE:

Two parts.

PART 1 — THE SYNTHESIS (3-4 paragraphs, ~200-300 words total)
Open by naming the situation they came in with — directly, in your voice. Then pull out the recurring teaching across all the Mirrors. What did they keep being told, in different forms? What pattern emerges from the way the Gita, through these Mirrors, has been speaking to them specifically? Be honest. Be concrete. Don't generalize. If multiple Mirrors said variations of "stop trying to find the answer before acting," name that. If multiple said "you are not your thoughts, you are what watches them," name that. Synthesis is pattern, not paraphrase.

PART 2 — THE FINAL WORD (1 paragraph, ~80-100 words)
Echo the structure of Gita 18.66 — Krishna's actual final teaching to Arjuna. Three movements:
  - Name what to release (a specific attachment, fear, or hope from their profile)
  - Name what to hold onto (the central practice or stance the synthesis points to)
  - Name what to stop worrying about ("do not grieve" — let something specific go)
End cleanly. Direct address. No "I hope this helps." No "may you find peace." This is Krishna's last sentence to Arjuna before the chariot pulls away.

OUTPUT FORMAT (strict):

Output exactly this structure, no preamble, no postscript:

SYNTHESIS:
[part 1 prose, no headers, separated paragraphs]

FINAL WORD:
[part 2 single paragraph]

That's all. No "Dear reader" — you are speaking AS Krishna, to Arjuna.`;

  const userPrompt = `THE READER:
${profileContext}

THE 18 PERSONALIZED MIRRORS YOU GAVE THEM (one per chapter, ${personalizedMirrors.length} of 18 personalized):

${corpus}

Now write the synthesis and the final word. This is the most important thing you'll write for this reader.`;

  const orRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://gita-five.vercel.app",
      "X-Title": "Gita Companion - Synthesis",
    },
    body: JSON.stringify({
      model: model || "anthropic/claude-sonnet-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      stream: true,
      temperature: 0.65,
      max_tokens: 1400,
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
