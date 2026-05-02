// Reading progress tracker. Stored in localStorage. Tracks:
//   - last chapter the user was on
//   - which chapters they have personalized mirrors for
//   - first-visit timestamp

const PROGRESS_KEY = "gita_reading_progress_v1";
const PERSONALIZED_PREFIX = "gita_personalized_mirror_";

export interface ReadingProgress {
  lastChapter: number;       // 1-18
  startedAt: string;         // ISO
  lastVisitedAt: string;     // ISO
  visitCount: number;
}

export function loadProgress(): ReadingProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ReadingProgress;
  } catch {
    return null;
  }
}

export function recordChapterVisit(chapterN: number): ReadingProgress {
  const now = new Date().toISOString();
  const existing = loadProgress();
  const next: ReadingProgress = {
    lastChapter: chapterN,
    startedAt: existing?.startedAt || now,
    lastVisitedAt: now,
    visitCount: (existing?.visitCount || 0) + 1,
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
  return next;
}

export function clearProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROGRESS_KEY);
}

// Returns the chapter numbers (1-18) for which a personalized mirror exists in cache
export function getPersonalizedChapters(): number[] {
  if (typeof window === "undefined") return [];
  const result: number[] = [];
  for (let n = 1; n <= 18; n++) {
    if (localStorage.getItem(PERSONALIZED_PREFIX + n)) result.push(n);
  }
  return result;
}

// Read all cached personalized mirrors back as { n: number, text: string }[]
export function getPersonalizedMirrors(): Array<{ n: number; text: string; generatedAt: string }> {
  if (typeof window === "undefined") return [];
  const result: Array<{ n: number; text: string; generatedAt: string }> = [];
  for (let n = 1; n <= 18; n++) {
    const raw = localStorage.getItem(PERSONALIZED_PREFIX + n);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.text) {
        result.push({ n, text: parsed.text, generatedAt: parsed.generatedAt });
      }
    } catch {
      // skip
    }
  }
  return result;
}

export const SYNTHESIS_MIN_CHAPTERS = 6;

export function canSynthesize(): boolean {
  return getPersonalizedChapters().length >= SYNTHESIS_MIN_CHAPTERS;
}
