"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Chapter, Panel } from "@/lib/chapters";
import { PORTRAITS } from "./Portraits";
import BottomSheet from "./BottomSheet";
import { getNode, GraphNode } from "@/lib/graph";
import FactSheet from "./FactSheet";
import PersonalizedMirror from "./PersonalizedMirror";

interface Props {
  chapter: Chapter;
}

const speakerStyle: Record<string, { bg: string; text: string; label: string }> = {
  krishna: { bg: "rgba(74, 125, 184, 0.18)", text: "#A9C6E6", label: "#4A7DB8" },
  arjuna: { bg: "rgba(197, 106, 62, 0.18)", text: "#F2C9B3", label: "#C56A3E" },
  narrator: { bg: "rgba(138, 132, 114, 0.15)", text: "#C9C2B0", label: "#8A8472" },
  sanjaya: { bg: "rgba(217, 164, 65, 0.15)", text: "#D9A441", label: "#A47419" },
  dhritarashtra: { bg: "rgba(58, 31, 12, 0.4)", text: "#F2C9B3", label: "#8B3E1D" },
  other: { bg: "rgba(138, 132, 114, 0.12)", text: "#C9C2B0", label: "#8A8472" },
};

const accentMap: Record<string, string> = {
  krishna: "#4A7DB8",
  arjuna: "#C56A3E",
  dharma: "#D9A441",
  dust: "#8A8472",
};

function speakerLabel(who: string): string {
  const k = who.toLowerCase();
  if (k.startsWith("krishna")) return "Krishna";
  if (k.startsWith("arjuna")) return "Arjuna";
  if (k.startsWith("sanjaya")) return "Sanjaya";
  if (k.startsWith("dhritarashtra")) return "Dhritarashtra";
  if (k.startsWith("narrator")) return "Narrator";
  return who.charAt(0).toUpperCase() + who.slice(1);
}

function speakerKey(who: string): string {
  const k = who.toLowerCase();
  for (const key of ["krishna", "arjuna", "sanjaya", "dhritarashtra", "narrator"]) {
    if (k.includes(key)) return key;
  }
  return "other";
}

export default function ChapterReader({ chapter }: Props) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [openNode, setOpenNode] = useState<GraphNode | null>(null);

  const scene = chapter.scenes[sceneIdx];
  const isLastScene = sceneIdx === chapter.scenes.length - 1;
  const accent = accentMap[chapter.accent] ?? "#D9A441";

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{ background: `${accent}22`, color: accent }}
          >
            Chapter {chapter.n}
          </span>
          <span className="text-[11px] text-dust-200/60 font-serif-d italic">
            {chapter.sanskrit}
          </span>
        </div>
        <h2 className="text-xl font-serif-d text-dust-50 leading-tight">{chapter.title}</h2>
        <p className="text-[13px] text-dust-200/80 mt-1.5 leading-snug">{chapter.subtitle}</p>
      </div>

      <CharacterStrip ids={chapter.characters} onTap={(id) => setOpenNode(getNode(id) ?? null)} />

      <div
        className="rounded-2xl overflow-hidden mb-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "0.5px solid rgba(217,164,65,0.15)",
        }}
      >
        <div className="px-4 pt-4 pb-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-dust-200/50">
            Scene {sceneIdx + 1} of {chapter.scenes.length}
          </p>
          <p className="text-[12px] italic text-dust-200/80 mt-1 leading-snug font-serif-d">
            {scene.setting}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${chapter.n}-${sceneIdx}`}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
            className="p-3 grid grid-cols-1 gap-2"
          >
            {scene.panels.map((p, i) => (
              <PanelCard key={i} panel={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 mb-5">
        <button
          onClick={() => setSceneIdx(Math.max(0, sceneIdx - 1))}
          disabled={sceneIdx === 0}
          className="px-4 py-2 rounded-full text-[13px] font-medium border border-dust-600/40 text-dust-100 disabled:opacity-30"
        >
          ← Prev
        </button>
        <div className="flex gap-1.5">
          {chapter.scenes.map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === sceneIdx ? 22 : 6,
                background: i === sceneIdx ? accent : "rgba(217,164,65,0.25)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => setSceneIdx(Math.min(chapter.scenes.length - 1, sceneIdx + 1))}
          disabled={sceneIdx === chapter.scenes.length - 1}
          className="px-4 py-2 rounded-full text-[13px] font-medium border border-dust-600/40 text-dust-100 disabled:opacity-30"
        >
          Next →
        </button>
      </div>

      <AnimatePresence>
        {isLastScene && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl p-4 mb-4"
            style={{
              background: "rgba(217, 164, 65, 0.06)",
              border: "0.5px solid rgba(217,164,65,0.3)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              <p className="text-[10px] uppercase tracking-[0.16em] text-dharma-400 font-medium">
                {chapter.mirror.headline} · {chapter.mirror.tag}
              </p>
            </div>
            <p className="text-[14px] leading-relaxed text-dust-50">{chapter.mirror.body}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {isLastScene && (
        <PersonalizedMirror chapterN={chapter.n} accent={accent} />
      )}

      {isLastScene && (
        <div className="rounded-2xl p-4 mb-4 bg-dust-900/40 border border-dust-600/30">
          <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 mb-2">
            Sit with this
          </p>
          <p className="font-serif-d text-[16px] leading-relaxed text-dust-50 italic">
            {chapter.reflection}
          </p>
        </div>
      )}

      {isLastScene && chapter.whyPrompts && chapter.whyPrompts.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 mb-2">
            Why this? — tangents
          </p>
          <div className="space-y-1.5">
            {chapter.whyPrompts.map((q, i) => (
              <div
                key={i}
                className="rounded-xl px-3 py-2 text-[13px] text-dust-100 leading-snug"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "0.5px solid rgba(217,164,65,0.15)",
                }}
              >
                {q}
              </div>
            ))}
          </div>
        </div>
      )}

      {chapter.concepts.length > 0 && (
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 mb-2">
            Concepts in this chapter
          </p>
          <div className="flex flex-wrap gap-2">
            {chapter.concepts.map((cId) => {
              const c = getNode(cId);
              if (!c) return null;
              return (
                <button
                  key={cId}
                  onClick={() => setOpenNode(c)}
                  className="px-3 py-1.5 rounded-full text-[12px] border text-dust-50 active:scale-95 transition-transform"
                  style={{
                    background: "rgba(217,164,65,0.08)",
                    borderColor: "rgba(217,164,65,0.3)",
                  }}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <BottomSheet open={!!openNode} onClose={() => setOpenNode(null)}>
        {openNode && (
          <FactSheet
            node={openNode}
            onNavigate={(id) => setOpenNode(getNode(id) ?? null)}
          />
        )}
      </BottomSheet>
    </div>
  );
}

function PanelCard({ panel, index }: { panel: Panel; index: number }) {
  const sk = speakerKey(panel.who);
  const s = speakerStyle[sk] ?? speakerStyle.other;
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="rounded-xl p-3"
      style={{ background: s.bg, borderLeft: `2px solid ${s.label}` }}
    >
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-[10px] uppercase tracking-[0.12em] font-medium"
          style={{ color: s.label }}
        >
          {speakerLabel(panel.who)}
        </span>
        <span className="text-[10px] opacity-50" style={{ color: s.label }}>
          {index + 1}
        </span>
      </div>
      <p className="font-serif-d text-[15px] leading-snug" style={{ color: s.text }}>
        {panel.line}
      </p>
    </motion.div>
  );
}

function CharacterStrip({
  ids,
  onTap,
}: {
  ids: string[];
  onTap: (id: string) => void;
}) {
  const characters = ids.filter((id) => PORTRAITS[id]);
  if (characters.length === 0) return null;
  return (
    <div className="no-scrollbar overflow-x-auto -mx-4 px-4 mb-4">
      <div className="flex gap-2 w-max pb-1">
        {characters.map((id) => {
          const Portrait = PORTRAITS[id];
          const node = getNode(id);
          return (
            <button
              key={id}
              onClick={() => onTap(id)}
              className="rounded-xl overflow-hidden flex-shrink-0 border border-dust-600/30 active:scale-95 transition-transform bg-dust-900/40"
              style={{ width: 72 }}
            >
              <div className="w-full" style={{ aspectRatio: "200/240" }}>
                <Portrait size={72} />
              </div>
              <p className="text-[10px] font-medium text-dust-100 py-1 px-1 truncate">
                {node?.name ?? id}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
