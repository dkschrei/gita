// Reader Profile schema. Stored locally in browser localStorage as JSON.
// Three tiers (quick / standard / deep) — same data shape, more fields filled in deeper tiers.

export type LifeStage =
  | "early-adult"
  | "building-career"
  | "midlife"
  | "late-career"
  | "retired"
  | "unspecified";

export type Preoccupation =
  | "work" | "family" | "health" | "loss"
  | "relationships" | "meaning" | "money" | "freedom";

export type ArrivalReason =
  | "curiosity" | "crisis" | "recommended"
  | "spiritual-practice" | "rereading" | "other";

export type Spirituality =
  | "devout" | "spiritual-not-religious" | "agnostic"
  | "atheist" | "complicated" | "unconsidered";

export interface ReaderProfile {
  // META
  tier: "quick" | "standard" | "deep";
  completedAt: string; // ISO timestamp
  version: 1;

  // TIER 1 (Quick — required)
  lifeStage: LifeStage;
  preoccupations: Preoccupation[]; // max 3
  arrival: ArrivalReason;

  // TIER 2 (Standard — optional unless tier === 'standard' or 'deep')
  hardestThing?: string;
  decidingAbout?: string;
  worthItOutcome?: string;
  spirituality?: Spirituality;

  // TIER 3 (Deep — optional unless tier === 'deep')
  triedThatFailed?: string;
  obligations?: string;
  honestSuccess?: string;
  greatestFear?: string;
  somethingElse?: string;
}

const STORAGE_KEY = "gita_reader_profile_v1";

export function loadProfile(): ReaderProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1) return null;
    return parsed as ReaderProfile;
  } catch {
    return null;
  }
}

export function saveProfile(p: ReaderProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function clearProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Render the profile as natural-language paragraph for injecting into LLM system prompts
export function profileToPromptContext(p: ReaderProfile): string {
  const lifeStageText: Record<LifeStage, string> = {
    "early-adult": "early adulthood (early 20s, building first chapter of life)",
    "building-career": "building career (late 20s through 30s)",
    "midlife": "midlife",
    "late-career": "late career, with retirement on the horizon",
    "retired": "retired or post-retirement",
    "unspecified": "an unspecified stage of life",
  };
  const arrivalText: Record<ArrivalReason, string> = {
    curiosity: "out of curiosity",
    crisis: "in the middle of a crisis",
    recommended: "because someone recommended it",
    "spiritual-practice": "as part of an existing spiritual practice",
    rereading: "to reread it after time away",
    other: "for reasons of their own",
  };
  const spiritualityText: Record<Spirituality, string> = {
    devout: "devoutly religious",
    "spiritual-not-religious": "spiritual but not religious",
    agnostic: "agnostic",
    atheist: "atheist",
    complicated: "their relationship with spirituality is complicated",
    unconsidered: "they haven't thought much about spirituality",
  };

  const lines: string[] = [];
  lines.push(`The reader is in ${lifeStageText[p.lifeStage]}.`);
  if (p.preoccupations.length > 0) {
    lines.push(`What is loudest in their life right now: ${p.preoccupations.join(", ")}.`);
  }
  lines.push(`They came to the Gita ${arrivalText[p.arrival]}.`);
  if (p.spirituality) lines.push(`Spiritually, ${spiritualityText[p.spirituality]}.`);
  if (p.hardestThing) lines.push(`The hardest thing about their situation, in their own words: "${p.hardestThing}"`);
  if (p.decidingAbout) lines.push(`What they're trying to decide: "${p.decidingAbout}"`);
  if (p.worthItOutcome) lines.push(`What 'this was worth my time' would feel like: "${p.worthItOutcome}"`);
  if (p.triedThatFailed) lines.push(`What they've already tried that didn't work: "${p.triedThatFailed}"`);
  if (p.obligations) lines.push(`Who they're carrying obligations to: "${p.obligations}"`);
  if (p.honestSuccess) lines.push(`What success honestly looks like to them (not the version they tell others): "${p.honestSuccess}"`);
  if (p.greatestFear) lines.push(`What they're most afraid of: "${p.greatestFear}"`);
  if (p.somethingElse) lines.push(`Something else they want their teacher to know: "${p.somethingElse}"`);

  return lines.join("\n");
}

export function profileSummary(p: ReaderProfile): string {
  const stage = p.lifeStage.replace(/-/g, " ");
  const top = p.preoccupations.slice(0, 2).join(", ");
  return top ? `${stage} · ${top}` : stage;
}
