"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ReaderProfile, LifeStage, Preoccupation, ArrivalReason, Spirituality,
  loadProfile, saveProfile, clearProfile, profileSummary,
} from "@/lib/reader-profile";
import Link from "next/link";

const LIFE_STAGES: { id: LifeStage; label: string; sub: string }[] = [
  { id: "early-adult", label: "Early adulthood", sub: "first jobs, first big choices, ~18–28" },
  { id: "building-career", label: "Building", sub: "career, family, foundations, ~28–40" },
  { id: "midlife", label: "Midlife", sub: "the long middle, ~40–55" },
  { id: "late-career", label: "Late career", sub: "endgame in sight, ~55–65" },
  { id: "retired", label: "Retired or beyond", sub: "the work is mostly done" },
];

const PREOCCUPATIONS: { id: Preoccupation; label: string }[] = [
  { id: "work", label: "Work" },
  { id: "family", label: "Family" },
  { id: "health", label: "Health" },
  { id: "loss", label: "Loss / grief" },
  { id: "relationships", label: "Relationships" },
  { id: "meaning", label: "Meaning" },
  { id: "money", label: "Money" },
  { id: "freedom", label: "Freedom" },
];

const ARRIVAL_REASONS: { id: ArrivalReason; label: string; sub: string }[] = [
  { id: "curiosity", label: "Curiosity", sub: "wanted to see what's in here" },
  { id: "crisis", label: "Crisis", sub: "something is forcing the question" },
  { id: "recommended", label: "Recommended", sub: "someone said I should read it" },
  { id: "spiritual-practice", label: "Practice", sub: "part of an ongoing spiritual life" },
  { id: "rereading", label: "Returning", sub: "I've read it before, coming back" },
  { id: "other", label: "Other", sub: "" },
];

const SPIRITUALITY: { id: Spirituality; label: string }[] = [
  { id: "devout", label: "Devout" },
  { id: "spiritual-not-religious", label: "Spiritual, not religious" },
  { id: "agnostic", label: "Agnostic" },
  { id: "atheist", label: "Atheist" },
  { id: "complicated", label: "Complicated" },
  { id: "unconsidered", label: "Haven't really thought about it" },
];

export default function ProfilePage() {
  const [tier, setTier] = useState<"quick" | "standard" | "deep" | null>(null);
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<Partial<ReaderProfile>>({});
  const [existing, setExisting] = useState<ReaderProfile | null>(null);
  const [savedToast, setSavedToast] = useState(false);

  useEffect(() => {
    const p = loadProfile();
    setExisting(p);
    if (p) setProfile(p);
  }, []);

  const set = <K extends keyof ReaderProfile>(k: K, v: ReaderProfile[K]) =>
    setProfile((prev) => ({ ...prev, [k]: v }));

  const togglePreoc = (p: Preoccupation) => {
    setProfile((prev) => {
      const list = prev.preoccupations || [];
      if (list.includes(p)) return { ...prev, preoccupations: list.filter((x) => x !== p) };
      if (list.length >= 3) return prev;
      return { ...prev, preoccupations: [...list, p] };
    });
  };

  const finalize = (chosenTier: "quick" | "standard" | "deep") => {
    const final: ReaderProfile = {
      tier: chosenTier,
      completedAt: new Date().toISOString(),
      version: 1,
      lifeStage: profile.lifeStage || "unspecified",
      preoccupations: profile.preoccupations || [],
      arrival: profile.arrival || "other",
      hardestThing: profile.hardestThing,
      decidingAbout: profile.decidingAbout,
      worthItOutcome: profile.worthItOutcome,
      spirituality: profile.spirituality,
      triedThatFailed: profile.triedThatFailed,
      obligations: profile.obligations,
      honestSuccess: profile.honestSuccess,
      greatestFear: profile.greatestFear,
      somethingElse: profile.somethingElse,
    };
    saveProfile(final);
    setExisting(final);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2400);
    setTier(null);
    setStep(0);
  };

  const reset = () => {
    if (confirm("Clear your reader profile? You can rebuild it any time.")) {
      clearProfile();
      setExisting(null);
      setProfile({});
    }
  };

  // ============== TIER PICKER (entry screen) ==============
  if (!tier) {
    return (
      <div className="max-w-2xl mx-auto px-4 md:px-8 pt-6 pb-20">
        <header className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.18em] text-dust-200/70">Reader profile</p>
          <h1 className="text-2xl font-serif-d text-dharma-400 mt-1 leading-tight">
            Make this app yours
          </h1>
          <p className="text-[14px] text-dust-200/80 mt-2 leading-relaxed">
            The Gita is a 5,000-year-old letter — but every reader who picks it up has their own
            specific life. Tell the app a little about yours, and the Modern Mirror sections of
            each chapter will be calibrated to where you actually are.
          </p>
          <p className="text-[13px] text-dust-200/60 mt-2 leading-relaxed">
            All answers stay in your browser. Nothing is sent anywhere unless you also use the Ask
            Krishna feature, which uses your own OpenRouter key.
          </p>
        </header>

        {existing && (
          <div className="mb-5 rounded-xl p-4 bg-dharma-400/10 border border-dharma-400/30">
            <p className="text-[10px] uppercase tracking-[0.16em] text-dharma-400 font-medium mb-1">
              You already have a profile
            </p>
            <p className="text-[14px] text-dust-50 mb-2">{profileSummary(existing)}</p>
            <p className="text-[12px] text-dust-200/70">
              Saved {new Date(existing.completedAt).toLocaleDateString()} · Tier: {existing.tier}
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { setTier(existing.tier); setStep(0); }}
                className="px-3 py-1.5 rounded-full text-[12px] font-medium border border-dharma-400/40 text-dharma-400"
              >
                Edit
              </button>
              <button
                onClick={reset}
                className="px-3 py-1.5 rounded-full text-[12px] font-medium border border-arjuna-400/40 text-arjuna-400"
              >
                Clear profile
              </button>
            </div>
          </div>
        )}

        <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 font-medium mb-2">
          Pick a depth
        </p>
        <div className="space-y-2 mb-6">
          {[
            { id: "quick" as const, t: "Quick", n: "3 questions", time: "30 seconds", desc: "Just the basics — life stage, what's loudest, why you're here" },
            { id: "standard" as const, t: "Standard", n: "7 questions", time: "2 minutes", desc: "Adds emotional context and what you're hoping to gain" },
            { id: "deep" as const, t: "Deep", n: "12 questions", time: "5 minutes", desc: "Fullest profile — fears, obligations, honest definitions" },
          ].map((o) => (
            <button
              key={o.id}
              onClick={() => { setTier(o.id); setStep(0); }}
              className="w-full text-left rounded-xl px-4 py-3 bg-dust-800/40 border border-dust-600/40 hover:border-dharma-400/40 hover:bg-dust-800/60 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <span className="text-[15px] font-serif-d text-dust-50">{o.t}</span>
                <span className="text-[11px] text-dust-200/60">{o.n} · {o.time}</span>
              </div>
              <p className="text-[12px] text-dust-200/70 mt-1 leading-snug">{o.desc}</p>
            </button>
          ))}
        </div>

        <Link href="/" className="text-[12px] text-dust-200/60 underline">← Skip and continue without a profile</Link>

        {savedToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-dharma-400 text-dust-900 text-[13px] font-medium z-50"
          >
            Profile saved
          </motion.div>
        )}
      </div>
    );
  }

  // ============== QUESTION FLOW ==============
  // Steps map per-tier
  const stepsForTier: Record<typeof tier, string[]> = {
    quick: ["lifeStage", "preoccupations", "arrival", "review"],
    standard: ["lifeStage", "preoccupations", "arrival", "spirituality", "hardestThing", "decidingAbout", "worthItOutcome", "review"],
    deep: ["lifeStage", "preoccupations", "arrival", "spirituality", "hardestThing", "decidingAbout", "worthItOutcome", "triedThatFailed", "obligations", "honestSuccess", "greatestFear", "somethingElse", "review"],
  };
  const steps = stepsForTier[tier];
  const currentKey = steps[step];
  const total = steps.length;

  const goNext = () => setStep((s) => Math.min(s + 1, total - 1));
  const goBack = () => {
    if (step === 0) { setTier(null); return; }
    setStep((s) => s - 1);
  };

  return (
    <div className="max-w-xl mx-auto px-4 md:px-8 pt-6 pb-20">
      <button onClick={goBack} className="text-[12px] text-dust-200/60 hover:text-dharma-400 mb-3">← Back</button>
      <div className="flex gap-1 mb-5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-colors"
            style={{ background: i <= step ? "#D9A441" : "rgba(217,164,65,0.18)" }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentKey}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.18 }}
        >
          {currentKey === "lifeStage" && (
            <Question
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="Where are you in life?"
              hint="Roughly. Pick whichever fits closest — these are loose buckets, not categories you're stuck in."
            >
              <div className="space-y-2">
                {LIFE_STAGES.map((s) => (
                  <ChoiceCard
                    key={s.id}
                    selected={profile.lifeStage === s.id}
                    onClick={() => { set("lifeStage", s.id); setTimeout(goNext, 200); }}
                    title={s.label}
                    sub={s.sub}
                  />
                ))}
              </div>
            </Question>
          )}

          {currentKey === "preoccupations" && (
            <Question
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="What's loudest in your life right now?"
              hint="Pick up to 3. The thing your mind keeps drifting toward when it's quiet."
            >
              <div className="grid grid-cols-2 gap-2">
                {PREOCCUPATIONS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => togglePreoc(p.id)}
                    className={`rounded-xl px-3 py-3 text-[14px] font-medium transition-colors text-left ${
                      profile.preoccupations?.includes(p.id)
                        ? "bg-dharma-400/15 border border-dharma-400/50 text-dharma-400"
                        : "bg-dust-800/40 border border-dust-600/40 text-dust-50"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <NextButton onClick={goNext} disabled={(profile.preoccupations || []).length === 0} />
            </Question>
          )}

          {currentKey === "arrival" && (
            <Question
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="What pulled you here?"
              hint="There's no wrong answer. Be honest — it shapes how the teaching reaches you."
            >
              <div className="space-y-2">
                {ARRIVAL_REASONS.map((r) => (
                  <ChoiceCard
                    key={r.id}
                    selected={profile.arrival === r.id}
                    onClick={() => { set("arrival", r.id); setTimeout(goNext, 200); }}
                    title={r.label}
                    sub={r.sub}
                  />
                ))}
              </div>
            </Question>
          )}

          {currentKey === "spirituality" && (
            <Question
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="Your relationship with spirituality?"
              hint="The Gita doesn't require a particular answer. This just helps the teaching meet you in the right register."
            >
              <div className="space-y-2">
                {SPIRITUALITY.map((s) => (
                  <ChoiceCard
                    key={s.id}
                    selected={profile.spirituality === s.id}
                    onClick={() => { set("spirituality", s.id); setTimeout(goNext, 200); }}
                    title={s.label}
                    sub=""
                  />
                ))}
              </div>
            </Question>
          )}

          {currentKey === "hardestThing" && (
            <TextQuestion
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="What's the hardest thing about your situation right now?"
              hint="One sentence. The thing you'd say if a friend asked, 'so what's actually going on?'"
              value={profile.hardestThing || ""}
              onChange={(v) => set("hardestThing", v)}
              onNext={goNext}
              required
            />
          )}

          {currentKey === "decidingAbout" && (
            <TextQuestion
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="Anything you're trying to decide?"
              hint="Optional. If you're in a decision, name it. If not, write 'nothing specific.'"
              value={profile.decidingAbout || ""}
              onChange={(v) => set("decidingAbout", v)}
              onNext={goNext}
            />
          )}

          {currentKey === "worthItOutcome" && (
            <TextQuestion
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="What would 'this was worth my time' feel like at the end?"
              hint="One sentence. Not a goal — a feeling, or a clarity."
              value={profile.worthItOutcome || ""}
              onChange={(v) => set("worthItOutcome", v)}
              onNext={goNext}
            />
          )}

          {currentKey === "triedThatFailed" && (
            <TextQuestion
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="Anything you've already tried that didn't work?"
              hint="Optional. Therapy, books, practices, a move, a conversation, a relationship. Brief."
              value={profile.triedThatFailed || ""}
              onChange={(v) => set("triedThatFailed", v)}
              onNext={goNext}
            />
          )}

          {currentKey === "obligations" && (
            <TextQuestion
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="Who, if anyone, are you carrying obligations to?"
              hint="Optional. Children, parents, employees, a partner, a community. Be specific or general."
              value={profile.obligations || ""}
              onChange={(v) => set("obligations", v)}
              onNext={goNext}
            />
          )}

          {currentKey === "honestSuccess" && (
            <TextQuestion
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="What does success look like for you, honestly?"
              hint="Not the version you tell others. The version you'd only tell a stranger you'll never see again."
              value={profile.honestSuccess || ""}
              onChange={(v) => set("honestSuccess", v)}
              onNext={goNext}
            />
          )}

          {currentKey === "greatestFear" && (
            <TextQuestion
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="What are you most afraid of?"
              hint="The thing you don't want to look at directly. Naming it dilutes its hold."
              value={profile.greatestFear || ""}
              onChange={(v) => set("greatestFear", v)}
              onNext={goNext}
            />
          )}

          {currentKey === "somethingElse" && (
            <TextQuestion
              eyebrow={`Question ${step + 1} of ${total - 1}`}
              q="Anything else you'd want a teacher to know about you?"
              hint="Optional. Catchall. Whatever didn't fit above."
              value={profile.somethingElse || ""}
              onChange={(v) => set("somethingElse", v)}
              onNext={goNext}
            />
          )}

          {currentKey === "review" && (
            <Review
              tier={tier!}
              profile={profile}
              onSave={() => finalize(tier!)}
              onUpgrade={(t) => { setTier(t); setStep(stepsForTier[t].length - 2); }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ========== Sub-components ==========

function Question({
  eyebrow, q, hint, children,
}: {
  eyebrow: string; q: string; hint: string; children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 mb-1">{eyebrow}</p>
      <h2 className="font-serif-d text-[22px] text-dust-50 leading-tight mb-2">{q}</h2>
      <p className="text-[13px] text-dust-200/70 leading-relaxed mb-5">{hint}</p>
      {children}
    </div>
  );
}

function ChoiceCard({
  selected, onClick, title, sub,
}: {
  selected: boolean; onClick: () => void; title: string; sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl px-4 py-3 text-left transition-colors ${
        selected
          ? "bg-dharma-400/15 border border-dharma-400/50"
          : "bg-dust-800/40 border border-dust-600/40 hover:border-dust-600/70"
      }`}
    >
      <p className={`text-[15px] font-medium ${selected ? "text-dharma-400" : "text-dust-50"}`}>{title}</p>
      {sub && <p className="text-[12px] text-dust-200/70 mt-0.5 leading-snug">{sub}</p>}
    </button>
  );
}

function TextQuestion({
  eyebrow, q, hint, value, onChange, onNext, required,
}: {
  eyebrow: string; q: string; hint: string;
  value: string; onChange: (v: string) => void; onNext: () => void; required?: boolean;
}) {
  return (
    <Question eyebrow={eyebrow} q={q} hint={hint}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full px-3 py-2.5 rounded-xl bg-dust-900/60 border border-dust-600/40 text-dust-50 text-[15px] outline-none focus:border-dharma-400/60 resize-none"
        placeholder={required ? "Required" : "Optional — leave blank to skip"}
        autoFocus
      />
      <NextButton onClick={onNext} disabled={required ? !value.trim() : false} />
    </Question>
  );
}

function NextButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-5 px-5 py-2.5 rounded-full text-[14px] font-medium bg-dharma-400 text-dust-900 disabled:opacity-30 disabled:cursor-not-allowed"
    >
      Next →
    </button>
  );
}

function Review({
  tier, profile, onSave, onUpgrade,
}: {
  tier: "quick" | "standard" | "deep";
  profile: Partial<ReaderProfile>;
  onSave: () => void;
  onUpgrade: (t: "standard" | "deep") => void;
}) {
  const fields: { k: keyof ReaderProfile; label: string }[] = [
    { k: "lifeStage", label: "Life stage" },
    { k: "preoccupations", label: "What's loudest" },
    { k: "arrival", label: "What pulled you here" },
    { k: "spirituality", label: "Spirituality" },
    { k: "hardestThing", label: "Hardest thing right now" },
    { k: "decidingAbout", label: "Trying to decide" },
    { k: "worthItOutcome", label: "Worth-it outcome" },
    { k: "triedThatFailed", label: "Tried that didn't work" },
    { k: "obligations", label: "Obligations" },
    { k: "honestSuccess", label: "Honest definition of success" },
    { k: "greatestFear", label: "Greatest fear" },
    { k: "somethingElse", label: "Something else" },
  ];

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 mb-1">Review & save</p>
      <h2 className="font-serif-d text-[22px] text-dust-50 leading-tight mb-4">Looks like this:</h2>

      <div className="space-y-2 mb-5">
        {fields.map(({ k, label }) => {
          const v = (profile as any)[k];
          if (!v || (Array.isArray(v) && v.length === 0)) return null;
          return (
            <div key={k} className="rounded-lg px-3 py-2 bg-dust-900/50 border border-dust-600/30">
              <p className="text-[10px] uppercase tracking-[0.14em] text-dust-200/60 mb-0.5">{label}</p>
              <p className="text-[13px] text-dust-50">{Array.isArray(v) ? v.join(", ") : v}</p>
            </div>
          );
        })}
      </div>

      <button
        onClick={onSave}
        className="w-full px-5 py-3 rounded-xl text-[15px] font-medium bg-dharma-400 text-dust-900"
      >
        Save profile
      </button>

      {tier === "quick" && (
        <button onClick={() => onUpgrade("standard")} className="w-full mt-2 text-[13px] text-dust-200/70 underline">
          Want to go deeper? → Standard (4 more questions, ~90 sec)
        </button>
      )}
      {tier === "standard" && (
        <button onClick={() => onUpgrade("deep")} className="w-full mt-2 text-[13px] text-dust-200/70 underline">
          Want to go all the way? → Deep (5 more questions, ~3 min)
        </button>
      )}
    </div>
  );
}
