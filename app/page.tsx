"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CHAPTERS } from "@/lib/chapters";
import { loadProfile, profileSummary } from "@/lib/reader-profile";
import { loadProgress, getPersonalizedChapters, canSynthesize } from "@/lib/progress";
import { KrishnaPortrait, ArjunaPortrait } from "@/components/Portraits";

export default function LandingPage() {
  const [hasProfile, setHasProfile] = useState(false);
  const [profileLine, setProfileLine] = useState<string>("");
  const [lastChapter, setLastChapter] = useState<number | null>(null);
  const [personalizedCount, setPersonalizedCount] = useState(0);
  const [hasKey, setHasKey] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const p = loadProfile();
    setHasProfile(!!p);
    if (p) setProfileLine(profileSummary(p));
    const prog = loadProgress();
    if (prog) setLastChapter(prog.lastChapter);
    setPersonalizedCount(getPersonalizedChapters().length);
    setHasKey(!!localStorage.getItem("gita_or_key"));
    setHydrated(true);
  }, []);

  // Determine the primary CTA
  let primaryCta: { href: string; label: string; sub: string };
  if (!hasProfile) {
    primaryCta = {
      href: "/profile",
      label: "Make this app yours",
      sub: "Tell the app a little about your life — Modern Mirrors will calibrate to who you are. ~30 seconds.",
    };
  } else if (lastChapter && lastChapter > 1) {
    const ch = CHAPTERS[lastChapter - 1];
    primaryCta = {
      href: "/read",
      label: `Continue at chapter ${lastChapter}`,
      sub: ch.title,
    };
  } else {
    primaryCta = {
      href: "/read",
      label: "Begin chapter 1",
      sub: "Observing the armies — Arjuna sees who he must fight, and freezes.",
    };
  }

  const synthesisReady = canSynthesize();

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 pt-6 md:pt-12 pb-16">
      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-14"
      >
        <p className="text-[10px] uppercase tracking-[0.22em] text-dust-200/60 mb-2">
          The Bhagavad Gita
        </p>
        <h1 className="font-serif-d text-3xl md:text-5xl text-dharma-400 leading-tight mb-4">
          A companion, not a substitute.
        </h1>
        <p className="text-[14px] md:text-[16px] text-dust-100 leading-relaxed max-w-xl mx-auto mb-2">
          An interactive walk through the eighteen chapters — and a conversation with Krishna that
          calibrates to your actual life.
        </p>
        <p className="text-[12px] md:text-[13px] text-dust-200/60 leading-relaxed max-w-xl mx-auto">
          Read each scene as a graphic-novel storyboard. Personalize the teaching. Ask hard
          questions. Take a record with you.
        </p>
      </motion.header>

      {/* Primary CTA */}
      {hydrated && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Link
            href={primaryCta.href}
            className="block rounded-2xl p-5 md:p-6 bg-dharma-400 text-dust-900 hover:bg-dharma-400/90 transition-colors"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] opacity-80 mb-1">
              {!hasProfile ? "Start here" : lastChapter && lastChapter > 1 ? "Continue" : "Begin"}
            </p>
            <h2 className="font-serif-d text-2xl md:text-3xl leading-tight mb-1">
              {primaryCta.label}
            </h2>
            <p className="text-[13px] md:text-[14px] opacity-85">{primaryCta.sub}</p>
          </Link>
        </motion.div>
      )}

      {/* Three doors */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10"
      >
        <DoorCard
          href="/read"
          eyebrow="Read"
          title="The 18 chapters"
          body="Storyboard, scene by scene. Color-coded panels. The teaching as graphic novel."
          status={lastChapter ? `Last at chapter ${lastChapter}` : null}
        />
        <DoorCard
          href="/ask"
          eyebrow="Ask"
          title="Talk to Krishna"
          body="Multi-turn dialogue. Five voices. The LLM is grounded in your reader profile."
          status={hasKey ? "Connected" : "Needs OpenRouter key"}
        />
        <DoorCard
          href="/profile"
          eyebrow="Personalize"
          title="Make it yours"
          body="A short intake. Your Modern Mirrors calibrate to where you actually are."
          status={hasProfile ? profileLine : null}
        />
      </motion.div>

      {/* Synthesis door — appears prominently when ready */}
      {hydrated && synthesisReady && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10"
        >
          <Link
            href="/synthesis"
            className="block rounded-2xl p-5 md:p-6 transition-colors"
            style={{
              background: "rgba(217, 164, 65, 0.08)",
              border: "0.5px solid rgba(217,164,65,0.55)",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <KrishnaPortrait size={56} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.18em] text-dharma-400 mb-1">
                  Chapter 19 · The Synthesis
                </p>
                <h3 className="font-serif-d text-xl text-dust-50 leading-tight mb-1">
                  The through-line of your reading
                </h3>
                <p className="text-[13px] text-dust-200/80 leading-snug">
                  You've personalized {personalizedCount} of 18 chapters. The synthesis is unlocked.
                  Read what the conversation, taken as one piece, said to you. Download as PDF.
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* How this works */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-2xl p-5 md:p-6 mb-8"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "0.5px solid rgba(217,164,65,0.15)",
        }}
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-dust-200/60 mb-2">
          How this works
        </p>
        <h3 className="font-serif-d text-xl text-dust-50 mb-4">
          The fastest way to actually use the Gita
        </h3>
        <ol className="space-y-3 text-[13px] md:text-[14px] text-dust-100 leading-relaxed">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-dharma-400/20 text-dharma-400 text-[11px] font-medium flex items-center justify-center mt-0.5">1</span>
            <span><strong className="text-dust-50 font-medium">Personalize once.</strong> A short intake — life stage, what's loudest, what brought you here. The longer the intake, the more calibrated the rest of the app gets.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-dharma-400/20 text-dharma-400 text-[11px] font-medium flex items-center justify-center mt-0.5">2</span>
            <span><strong className="text-dust-50 font-medium">Read the chapters.</strong> Eighteen storyboards. Each ends with a Modern Mirror — the chapter's teaching translated to a present-day life. Your reader profile generates a personalized version below the universal one.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-dharma-400/20 text-dharma-400 text-[11px] font-medium flex items-center justify-center mt-0.5">3</span>
            <span><strong className="text-dust-50 font-medium">Ask Krishna anything.</strong> Real questions, multi-turn. The LLM is grounded in your profile, so the answers know your situation.</span>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-dharma-400/20 text-dharma-400 text-[11px] font-medium flex items-center justify-center mt-0.5">4</span>
            <span><strong className="text-dust-50 font-medium">Read the synthesis.</strong> When you've personalized at least six chapters, Chapter 19 unlocks — a through-line across what was said to you, plus a downloadable PDF you can keep.</span>
          </li>
        </ol>
      </motion.section>

      {/* Note about the LLM features */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-[12px] text-dust-200/60 leading-relaxed text-center mb-8 px-2"
      >
        <p className="mb-2">
          The Ask, Personalize, and Synthesis features use an LLM via your own
          <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" className="text-dharma-400 underline ml-1">
            OpenRouter key
          </a>
          {" "}— a few cents fully covers a complete reading.
          Everything else (storyboard, knowledge graph, your profile) works without a key, fully offline-capable.
        </p>
        <p>
          All data — profile, progress, generated content — stays in your browser. Nothing is sent to
          any server other than OpenRouter when you invoke an LLM feature.
        </p>
      </motion.section>

      {/* Footer */}
      <footer className="text-center text-[11px] text-dust-200/40 pt-6 border-t border-dust-600/20">
        <p className="mb-1">
          <Link href="/about" className="hover:text-dharma-400">About</Link>
          {" · "}
          <Link href="/graph" className="hover:text-dharma-400">Knowledge graph</Link>
          {" · "}
          <a href="https://github.com/dkschrei/gita" target="_blank" rel="noreferrer" className="hover:text-dharma-400">
            Source
          </a>
          {" · "}
          <a href="https://pantheon-lilac.vercel.app" target="_blank" rel="noreferrer" className="hover:text-dharma-400">
            Pantheon
          </a>
        </p>
        <p className="opacity-70">A companion to the text, not a substitute. MIT licensed.</p>
      </footer>
    </div>
  );
}

function DoorCard({
  href, eyebrow, title, body, status,
}: {
  href: string; eyebrow: string; title: string; body: string; status: string | null;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl p-4 md:p-5 transition-colors hover:border-dharma-400/40"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "0.5px solid rgba(217,164,65,0.18)",
      }}
    >
      <p className="text-[10px] uppercase tracking-[0.18em] text-dharma-400 mb-1">{eyebrow}</p>
      <h3 className="font-serif-d text-[19px] text-dust-50 leading-tight mb-1.5">{title}</h3>
      <p className="text-[12px] text-dust-200/80 leading-snug mb-2">{body}</p>
      {status && (
        <p className="text-[10px] uppercase tracking-[0.14em] text-dust-200/50 truncate">
          · {status}
        </p>
      )}
    </Link>
  );
}
