"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CHAPTERS } from "@/lib/chapters";
import { loadProfile, profileToPromptContext, ReaderProfile } from "@/lib/reader-profile";
import { getPersonalizedMirrors, SYNTHESIS_MIN_CHAPTERS } from "@/lib/progress";
import { downloadPDF, PdfData } from "@/lib/pdf-export";

const SYNTHESIS_CACHE_KEY = "gita_synthesis_v1";
const KEY_STORAGE = "gita_or_key";
const MODEL_STORAGE = "gita_model";

interface CachedSynthesis {
  text: string;
  generatedAt: string;
  mirrorCount: number;
  profileFingerprint: string;
}

function fingerprintProfile(p: ReaderProfile): string {
  return JSON.stringify({
    ls: p.lifeStage,
    pre: p.preoccupations,
    arr: p.arrival,
    ht: p.hardestThing,
    da: p.decidingAbout,
    wo: p.worthItOutcome,
    sp: p.spirituality,
    tf: p.triedThatFailed,
    ob: p.obligations,
    hs: p.honestSuccess,
    gf: p.greatestFear,
    se: p.somethingElse,
  });
}

export default function SynthesisExperience() {
  const [profile, setProfile] = useState<ReaderProfile | null>(null);
  const [mirrors, setMirrors] = useState<Array<{ n: number; text: string; generatedAt: string }>>([]);
  const [synthesis, setSynthesis] = useState<string>("");
  const [synthesisGeneratedAt, setSynthesisGeneratedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);
  const [phase, setPhase] = useState<"intro" | "synthesis" | "mirrors" | "outro">("intro");
  const [mirrorIdx, setMirrorIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const advanceTimer = useRef<NodeJS.Timeout | null>(null);

  // Load everything
  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setMirrors(getPersonalizedMirrors());
    if (typeof window !== "undefined") {
      setHasKey(!!localStorage.getItem(KEY_STORAGE));
      const cached = localStorage.getItem(SYNTHESIS_CACHE_KEY);
      if (cached && p) {
        try {
          const parsed: CachedSynthesis = JSON.parse(cached);
          if (parsed.profileFingerprint === fingerprintProfile(p)) {
            setSynthesis(parsed.text);
            setSynthesisGeneratedAt(parsed.generatedAt);
          }
        } catch {}
      }
    }
  }, []);

  const generateSynthesis = async () => {
    if (!profile || !hasKey || mirrors.length < SYNTHESIS_MIN_CHAPTERS) return;
    const apiKey = localStorage.getItem(KEY_STORAGE);
    if (!apiKey) return;
    const model = localStorage.getItem(MODEL_STORAGE) || "anthropic/claude-sonnet-4";

    setLoading(true);
    setError(null);
    setSynthesis("");

    try {
      const res = await fetch("/api/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey,
          model,
          profileContext: profileToPromptContext(profile),
          personalizedMirrors: mirrors.map((m) => ({ n: m.n, text: m.text })),
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        let parsed = errText;
        try { parsed = JSON.parse(errText).error || errText; } catch {}
        setError(parsed);
        setLoading(false);
        return;
      }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setSynthesis(acc);
      }
      const now = new Date().toISOString();
      const cache: CachedSynthesis = {
        text: acc,
        generatedAt: now,
        mirrorCount: mirrors.length,
        profileFingerprint: fingerprintProfile(profile),
      };
      localStorage.setItem(SYNTHESIS_CACHE_KEY, JSON.stringify(cache));
      setSynthesisGeneratedAt(now);
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  // Auto-advance through mirrors when in mirrors phase
  useEffect(() => {
    if (phase !== "mirrors" || paused) {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      return;
    }
    if (mirrorIdx >= mirrors.length - 1) {
      // finished — go to outro after a pause
      advanceTimer.current = setTimeout(() => setPhase("outro"), 8000);
    } else {
      advanceTimer.current = setTimeout(() => setMirrorIdx((i) => i + 1), 7000);
    }
    return () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); };
  }, [phase, mirrorIdx, mirrors.length, paused]);

  // ============== GATING ==============
  if (!profile) {
    return (
      <Lockscreen
        title="Synthesis is for readers who have shared who they are"
        body="The synthesis reads across your personalized Modern Mirrors — and those depend on your reader profile. Build your profile first; then start personalizing chapters."
        cta={{ href: "/profile", label: "Build profile" }}
      />
    );
  }

  if (mirrors.length < SYNTHESIS_MIN_CHAPTERS) {
    const remaining = SYNTHESIS_MIN_CHAPTERS - mirrors.length;
    return (
      <Lockscreen
        title="Read a few more chapters first"
        body={`The synthesis pulls a through-line from your personalized Modern Mirrors. You have ${mirrors.length} so far. Personalize at least ${remaining} more for the synthesis to have real signal to work with.`}
        cta={{ href: "/read", label: "Continue reading" }}
        progress={{ have: mirrors.length, need: SYNTHESIS_MIN_CHAPTERS }}
      />
    );
  }

  if (!hasKey) {
    return (
      <Lockscreen
        title="Add your OpenRouter key"
        body="The synthesis is generated by an LLM, like the personalized Mirrors. It uses your own key — costs about $0.005 to generate."
        cta={{ href: "/ask", label: "Add API key on Ask tab" }}
      />
    );
  }

  // ============== READY ==============
  // Parse synthesis into parts
  const finalIdx = synthesis.search(/FINAL\s*WORD\s*:/i);
  const synthBody = finalIdx === -1
    ? synthesis.replace(/^SYNTHESIS\s*:\s*/i, "").trim()
    : synthesis.slice(0, finalIdx).replace(/^SYNTHESIS\s*:\s*/i, "").trim();
  const finalWord = finalIdx === -1
    ? ""
    : synthesis.slice(finalIdx).replace(/^FINAL\s*WORD\s*:\s*/i, "").trim();

  const canDownload = !!synthesis && !!profile && synthesisGeneratedAt && !loading;

  const handleDownload = (mode: "light" | "full") => {
    if (!profile || !synthesis || !synthesisGeneratedAt) return;
    const data: PdfData = {
      profile,
      synthesis,
      personalizedMirrors: mirrors,
      generatedAt: synthesisGeneratedAt,
    };
    downloadPDF(data, mode);
  };

  return (
    <div className="min-h-[calc(100dvh-180px)] md:min-h-[calc(100dvh-160px)]">
      {/* Phase: intro */}
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="text-center pt-8 pb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-dharma-400 mb-3">
              Chapter 19 · Beyond the eighteen
            </p>
            <h1 className="font-serif-d text-3xl md:text-4xl text-dust-50 leading-tight mb-4">
              The Synthesis
            </h1>
            <p className="text-[14px] text-dust-200/80 leading-relaxed max-w-md mx-auto mb-2">
              You walked through {mirrors.length} of 18 chapters with Krishna.
            </p>
            <p className="text-[13px] text-dust-200/70 leading-relaxed max-w-md mx-auto mb-8">
              This is what the conversation, taken as one piece, said to you.
            </p>

            {!synthesis && (
              <button
                onClick={async () => {
                  await generateSynthesis();
                  setPhase("synthesis");
                }}
                disabled={loading}
                className="px-6 py-3 rounded-full text-[14px] font-medium bg-dharma-400 text-dust-900 disabled:opacity-50"
              >
                {loading ? "Generating…" : "Begin"}
              </button>
            )}

            {synthesis && (
              <button
                onClick={() => setPhase("synthesis")}
                className="px-6 py-3 rounded-full text-[14px] font-medium bg-dharma-400 text-dust-900"
              >
                Open the synthesis
              </button>
            )}

            {error && (
              <p className="text-[12px] text-arjuna-400 mt-4 max-w-md mx-auto">{error}</p>
            )}
          </motion.div>
        )}

        {/* Phase: synthesis */}
        {phase === "synthesis" && (
          <motion.div
            key="synthesis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto pt-4"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-dharma-400 mb-2">
              The Synthesis
            </p>
            <h2 className="font-serif-d text-2xl text-dust-50 leading-tight mb-5">
              The through-line
            </h2>

            <div className="space-y-4 mb-8">
              {synthBody.split(/\n\s*\n/).map((para, i) => (
                <p
                  key={i}
                  className="font-serif-d text-[16px] md:text-[17px] text-dust-50 leading-relaxed"
                >
                  {para.trim()}
                </p>
              ))}
              {loading && (
                <span className="inline-block w-1.5 h-5 bg-dharma-400 animate-pulse" />
              )}
            </div>

            {finalWord && (
              <div
                className="rounded-2xl p-5 mb-8"
                style={{
                  background: "rgba(217, 164, 65, 0.06)",
                  border: "0.5px solid rgba(217,164,65,0.4)",
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-dharma-400 mb-2">
                  The Final Word
                </p>
                <p className="font-serif-d italic text-[17px] md:text-[18px] text-dust-50 leading-relaxed">
                  {finalWord}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <button
                onClick={() => { setMirrorIdx(0); setPhase("mirrors"); }}
                className="px-5 py-2.5 rounded-full text-[13px] font-medium bg-dharma-400 text-dust-900"
              >
                Walk through the 18 mirrors →
              </button>
              <button
                onClick={() => setPhase("outro")}
                className="px-5 py-2.5 rounded-full text-[13px] font-medium border border-dust-600/50 text-dust-100"
              >
                Skip to download
              </button>
            </div>
          </motion.div>
        )}

        {/* Phase: mirrors (auto-advancing) */}
        {phase === "mirrors" && mirrors[mirrorIdx] && (
          <motion.div
            key={`mirrors-${mirrorIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="max-w-xl mx-auto pt-4"
          >
            <ProgressDots count={mirrors.length} active={mirrorIdx} />

            <AnimatePresence mode="wait">
              <motion.div
                key={mirrorIdx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-[10px] uppercase tracking-[0.22em] text-dharma-400 mb-2">
                  Chapter {mirrors[mirrorIdx].n}
                </p>
                <h3 className="font-serif-d text-2xl text-dust-50 leading-tight mb-1">
                  {CHAPTERS.find((c) => c.n === mirrors[mirrorIdx].n)?.title}
                </h3>
                <p className="font-serif-d italic text-[12px] text-dust-200/60 mb-5">
                  {CHAPTERS.find((c) => c.n === mirrors[mirrorIdx].n)?.sanskrit}
                </p>
                <p className="font-serif-d text-[16px] md:text-[18px] leading-relaxed text-dust-50">
                  {mirrors[mirrorIdx].text}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-10">
              <button
                onClick={() => setMirrorIdx(Math.max(0, mirrorIdx - 1))}
                disabled={mirrorIdx === 0}
                className="px-4 py-2 rounded-full text-[13px] font-medium border border-dust-600/40 text-dust-100 disabled:opacity-30"
              >
                ← Prev
              </button>
              <button
                onClick={() => {
                  if (mirrorIdx >= mirrors.length - 1) setPhase("outro");
                  else setMirrorIdx(mirrorIdx + 1);
                }}
                className="px-4 py-2 rounded-full text-[13px] font-medium bg-dharma-400 text-dust-900"
              >
                {mirrorIdx >= mirrors.length - 1 ? "Finish →" : "Next →"}
              </button>
              <button
                onClick={() => setPhase("outro")}
                className="px-4 py-2 rounded-full text-[13px] text-dust-200/60"
              >
                Skip to end
              </button>
            </div>
          </motion.div>
        )}

        {/* Phase: outro — download */}
        {phase === "outro" && (
          <motion.div
            key="outro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md mx-auto pt-8 pb-12"
          >
            <p className="text-[10px] uppercase tracking-[0.22em] text-dharma-400 mb-3">
              Take it with you
            </p>
            <h2 className="font-serif-d text-2xl text-dust-50 leading-tight mb-3">
              Download your record
            </h2>
            <p className="text-[13px] text-dust-200/70 leading-relaxed mb-7">
              A keepsake of what you brought to the dialogue and what was said back. Two formats —
              pick the one you'll actually open later.
            </p>

            <div className="space-y-2 mb-8">
              <button
                onClick={() => handleDownload("light")}
                disabled={!canDownload}
                className="w-full text-left rounded-xl px-4 py-3 bg-dust-800/40 border border-dust-600/40 hover:border-dharma-400/40 transition-colors disabled:opacity-50"
              >
                <p className="text-[14px] font-medium text-dust-50">Quick reference</p>
                <p className="text-[11px] text-dust-200/70 mt-0.5">
                  The synthesis + your 18 personalized Mirrors. Compact.
                </p>
              </button>
              <button
                onClick={() => handleDownload("full")}
                disabled={!canDownload}
                className="w-full text-left rounded-xl px-4 py-3 bg-dust-800/40 border border-dust-600/40 hover:border-dharma-400/40 transition-colors disabled:opacity-50"
              >
                <p className="text-[14px] font-medium text-dust-50">Full record</p>
                <p className="text-[11px] text-dust-200/70 mt-0.5">
                  Everything: profile + synthesis + personalized + universal Mirrors.
                </p>
              </button>
            </div>

            <div className="flex justify-center gap-3 flex-wrap">
              <button
                onClick={() => setPhase("synthesis")}
                className="px-4 py-2 rounded-full text-[12px] text-dust-200/70 border border-dust-600/40"
              >
                ← Back to the synthesis
              </button>
              <button
                onClick={() => generateSynthesis()}
                disabled={loading}
                className="px-4 py-2 rounded-full text-[12px] text-dust-200/70 border border-dust-600/40 disabled:opacity-50"
              >
                {loading ? "Regenerating…" : "Regenerate synthesis"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Lockscreen({
  title, body, cta, progress,
}: {
  title: string; body: string;
  cta: { href: string; label: string };
  progress?: { have: number; need: number };
}) {
  return (
    <div className="max-w-md mx-auto text-center pt-8 pb-12 px-2">
      <p className="text-[10px] uppercase tracking-[0.22em] text-dharma-400 mb-3">
        Chapter 19 · The Synthesis
      </p>
      <h1 className="font-serif-d text-2xl md:text-3xl text-dust-50 leading-tight mb-4">
        {title}
      </h1>
      <p className="text-[14px] text-dust-200/80 leading-relaxed mb-6">{body}</p>

      {progress && (
        <div className="mb-6">
          <div className="flex gap-1 max-w-xs mx-auto">
            {Array.from({ length: progress.need }).map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full"
                style={{
                  background: i < progress.have
                    ? "#D9A441"
                    : "rgba(217,164,65,0.18)",
                }}
              />
            ))}
          </div>
          <p className="text-[11px] text-dust-200/60 mt-2">
            {progress.have} of {progress.need} chapters personalized
          </p>
        </div>
      )}

      <Link
        href={cta.href}
        className="inline-block px-5 py-2.5 rounded-full text-[14px] font-medium bg-dharma-400 text-dust-900"
      >
        {cta.label}
      </Link>
    </div>
  );
}

function ProgressDots({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex justify-center gap-1.5 mb-8">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="rounded-full transition-all"
          style={{
            width: i === active ? 18 : 6,
            height: 4,
            background: i <= active ? "#D9A441" : "rgba(217,164,65,0.2)",
          }}
        />
      ))}
    </div>
  );
}
