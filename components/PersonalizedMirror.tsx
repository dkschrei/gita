"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loadProfile, profileToPromptContext, ReaderProfile } from "@/lib/reader-profile";

interface Props {
  chapterN: number;
  accent: string;
}

const CACHE_KEY_PREFIX = "gita_personalized_mirror_";
const KEY_STORAGE = "gita_or_key";
const MODEL_STORAGE = "gita_model";

interface CacheEntry {
  text: string;
  generatedAt: string;
  profileFingerprint: string;
  chapterN: number;
}

function fingerprintProfile(p: ReaderProfile): string {
  return JSON.stringify({
    ls: p.lifeStage, pre: p.preoccupations, arr: p.arrival,
    ht: p.hardestThing, da: p.decidingAbout, wo: p.worthItOutcome,
    sp: p.spirituality, tf: p.triedThatFailed, ob: p.obligations,
    hs: p.honestSuccess, gf: p.greatestFear, se: p.somethingElse,
  });
}

export default function PersonalizedMirror({ chapterN, accent }: Props) {
  const [profile, setProfile] = useState<ReaderProfile | null>(null);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    if (typeof window !== "undefined") {
      setHasKey(!!localStorage.getItem(KEY_STORAGE));
    }
    if (p) {
      const cached = localStorage.getItem(CACHE_KEY_PREFIX + chapterN);
      if (cached) {
        try {
          const entry: CacheEntry = JSON.parse(cached);
          if (entry.chapterN === chapterN && entry.profileFingerprint === fingerprintProfile(p)) {
            setText(entry.text);
          } else {
            localStorage.removeItem(CACHE_KEY_PREFIX + chapterN);
          }
        } catch {
          localStorage.removeItem(CACHE_KEY_PREFIX + chapterN);
        }
      }
    }
  }, [chapterN]);

  const generate = async () => {
    if (!profile || !hasKey) return;
    const apiKey = localStorage.getItem(KEY_STORAGE);
    if (!apiKey) return;
    const model = localStorage.getItem(MODEL_STORAGE) || "anthropic/claude-haiku-4.5";

    setLoading(true);
    setError(null);
    setText("");

    try {
      const res = await fetch("/api/personalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey, model, chapterN,
          profileContext: profileToPromptContext(profile),
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
        setText(acc);
      }
      const entry: CacheEntry = {
        text: acc,
        generatedAt: new Date().toISOString(),
        profileFingerprint: fingerprintProfile(profile),
        chapterN,
      };
      localStorage.setItem(CACHE_KEY_PREFIX + chapterN, JSON.stringify(entry));
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="rounded-2xl p-3.5 mb-4 border-dashed"
           style={{ background: "rgba(217, 164, 65, 0.04)", border: "1px dashed rgba(217,164,65,0.35)" }}>
        <p className="text-[10px] uppercase tracking-[0.16em] font-medium mb-1.5" style={{ color: accent }}>
          Make this yours
        </p>
        <p className="text-[13px] text-dust-100 leading-relaxed mb-2.5">
          Tell the app a little about your life and the Modern Mirror will be calibrated to where
          you actually are - not a generic translation.
        </p>
        <a href="/profile" className="inline-block px-3 py-1.5 rounded-full text-[12px] font-medium"
           style={{ background: accent, color: "#1A1810" }}>
          Build your reader profile →
        </a>
      </div>
    );
  }

  if (!hasKey) {
    return (
      <div className="rounded-2xl p-3.5 mb-4 border-dashed"
           style={{ background: "rgba(217, 164, 65, 0.04)", border: "1px dashed rgba(217,164,65,0.35)" }}>
        <p className="text-[10px] uppercase tracking-[0.16em] font-medium mb-1.5" style={{ color: accent }}>
          Personalize this Modern Mirror
        </p>
        <p className="text-[13px] text-dust-100 leading-relaxed mb-2.5">
          Your profile is saved. Add an OpenRouter key on the Ask tab and the Modern Mirror will
          calibrate to your specific situation. Each generation costs about $0.001.
        </p>
        <a href="/ask" className="inline-block px-3 py-1.5 rounded-full text-[12px] font-medium"
           style={{ background: accent, color: "#1A1810" }}>
          Add API key →
        </a>
      </div>
    );
  }

  if (!text && !loading) {
    return (
      <div className="rounded-2xl p-3.5 mb-4"
           style={{ background: `${accent}08`, border: `0.5px solid ${accent}40` }}>
        <p className="text-[10px] uppercase tracking-[0.16em] font-medium mb-1.5" style={{ color: accent }}>
          For you, specifically
        </p>
        <p className="text-[13px] text-dust-100 leading-relaxed mb-2.5">
          The Modern Mirror above is universal. Tap below to generate a version calibrated to your
          reader profile. Costs ~$0.001.
        </p>
        <button onClick={generate} className="px-3 py-1.5 rounded-full text-[12px] font-medium"
                style={{ background: accent, color: "#1A1810" }}>
          Personalize this →
        </button>
        {error && <p className="text-[11px] text-arjuna-400 mt-2 leading-snug">{error}</p>}
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-4 mb-4"
                style={{ background: `${accent}10`, border: `0.5px solid ${accent}66` }}>
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
          <p className="text-[10px] uppercase tracking-[0.16em] font-medium" style={{ color: accent }}>
            For you, specifically {loading && "· generating"}
          </p>
        </div>
        {!loading && text && (
          <button onClick={generate}
                  className="text-[10px] uppercase tracking-[0.14em] text-dust-200/60 hover:text-dharma-400">
            Regenerate
          </button>
        )}
      </div>
      <p className="font-serif-d text-[15px] leading-relaxed text-dust-50 whitespace-pre-wrap">
        {text}
        {loading && <span className="inline-block w-1.5 h-4 ml-0.5 animate-pulse" style={{ background: accent }} />}
      </p>
      {error && <p className="text-[11px] text-arjuna-400 mt-2 leading-snug">{error}</p>}
    </motion.div>
  );
}
