"use client";

import { useState } from "react";
import { CHAPTERS } from "@/lib/chapters";
import ChapterReader from "@/components/ChapterReader";

export default function HomePage() {
  const [chapterIdx, setChapterIdx] = useState(0);

  return (
    <div className="max-w-md mx-auto px-4 pt-6">
      <header className="mb-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-dust-200/70">The Bhagavad Gita</p>
        <h1 className="text-2xl font-serif-d text-dharma-400 mt-1">A companion, not a substitute</h1>
      </header>

      {/* Chapter pills — horizontal scroll */}
      <div className="no-scrollbar overflow-x-auto -mx-4 px-4 mb-5">
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

      <ChapterReader key={chapterIdx} chapter={CHAPTERS[chapterIdx]} />
    </div>
  );
}
