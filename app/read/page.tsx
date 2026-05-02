"use client";

import { useState, useEffect } from "react";
import { recordChapterVisit, loadProgress } from "@/lib/progress";
import { CHAPTERS } from "@/lib/chapters";
import ChapterReader from "@/components/ChapterReader";

export default function HomePage() {
  const [chapterIdx, setChapterIdx] = useState(0);

  // On mount, restore last-visited chapter if any
  useEffect(() => {
    const p = loadProgress();
    if (p && p.lastChapter >= 1 && p.lastChapter <= 18) {
      setChapterIdx(p.lastChapter - 1);
    }
  }, []);

  // Record chapter visit whenever chapterIdx changes
  useEffect(() => {
    recordChapterVisit(chapterIdx + 1);
  }, [chapterIdx]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 pt-6">
      {/* Mobile-only header (desktop has it in top nav) */}
      <header className="mb-4 md:hidden">
        <p className="text-[11px] uppercase tracking-[0.18em] text-dust-200/70">The Bhagavad Gita</p>
        <h1 className="text-2xl font-serif-d text-dharma-400 mt-1">A companion, not a substitute</h1>
      </header>

      {/* Mobile: horizontal chapter pills */}
      <div className="no-scrollbar overflow-x-auto -mx-4 px-4 mb-5 md:hidden">
        <div className="flex gap-2 w-max">
          {CHAPTERS.map((ch, i) => {
            const active = i === chapterIdx;
            return (
              <button
                key={ch.n}
                onClick={() => setChapterIdx(i)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-[12px] font-medium transition-colors ${
                  active
                    ? "bg-dharma-400 text-dust-900"
                    : "bg-dust-800/60 text-dust-100 border border-dust-600/40"
                }`}
              >
                Ch {ch.n}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: two-column layout — vertical chapter rail + wide reading column */}
      <div className="md:grid md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] md:gap-8 lg:gap-12">
        {/* Desktop chapter rail */}
        <aside className="hidden md:block">
          <div className="sticky top-24">
            <p className="text-[10px] uppercase tracking-[0.18em] text-dust-200/60 mb-3">Chapters</p>
            <div className="space-y-0.5">
              {CHAPTERS.map((ch, i) => {
                const active = i === chapterIdx;
                return (
                  <button
                    key={ch.n}
                    onClick={() => setChapterIdx(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors ${
                      active
                        ? "bg-dharma-400/15 text-dharma-400 border-l-2 border-dharma-400"
                        : "text-dust-100 hover:bg-dust-800/40 border-l-2 border-transparent"
                    }`}
                  >
                    <span className="text-[11px] tabular-nums opacity-60 mr-2">
                      {String(ch.n).padStart(2, "0")}
                    </span>
                    {ch.title}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Reading column */}
        <div className="md:max-w-[680px]">
          <ChapterReader key={chapterIdx} chapter={CHAPTERS[chapterIdx]} />
        </div>
      </div>
    </div>
  );
}
