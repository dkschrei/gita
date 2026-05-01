"use client";

import { useState } from "react";
import KnowledgeGraph from "@/components/KnowledgeGraph";
import BottomSheet from "@/components/BottomSheet";
import FactSheet from "@/components/FactSheet";
import { GraphNode, getNode, NODES } from "@/lib/graph";

export default function GraphPage() {
  const [openNode, setOpenNode] = useState<GraphNode | null>(null);
  const [filter, setFilter] = useState<"all" | "character" | "concept">("all");

  const filters: { id: typeof filter; label: string }[] = [
    { id: "all", label: "Everything" },
    { id: "character", label: "Characters" },
    { id: "concept", label: "Concepts" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 pt-6">
      <header className="mb-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-dust-200/70">Knowledge map</p>
        <h1 className="text-2xl font-serif-d text-dharma-400 mt-1">How the pieces connect</h1>
        <p className="text-[13px] text-dust-200/80 mt-1.5 leading-snug">
          Tap any node for its fact sheet. Drag to rearrange. Pinch to zoom.
        </p>
      </header>

      {/* Filter pills */}
      <div className="flex gap-2 mb-3">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${
              filter === f.id
                ? "bg-dharma-400 text-dust-900"
                : "bg-dust-800/60 text-dust-100 border border-dust-600/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Graph canvas */}
      <KnowledgeGraph
        filter={filter}
        onNodeTap={(id) => setOpenNode(getNode(id) ?? null)}
      />

      {/* Quick legend */}
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-dust-200/70">
        <LegendDot color="#4A7DB8" label="Divine / Krishna" />
        <LegendDot color="#C56A3E" label="Pandava" />
        <LegendDot color="#5C2611" label="Kaurava" />
        <LegendDot color="#D9A441" label="Core teaching" />
        <LegendDot color="#A47419" label="Metaphysics" />
        <LegendDot color="#8B3E1D" label="Obstacle" />
      </div>

      {/* Index list — alphabetical, for the "I want to find X" case */}
      <div className="mt-6 mb-2">
        <p className="text-[11px] uppercase tracking-wider text-dust-200/60 mb-2">Full index</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
          {[...NODES]
            .filter((n) => filter === "all" || n.kind === filter)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((n) => (
              <button
                key={n.id}
                onClick={() => setOpenNode(n)}
                className="text-left px-3 py-2 rounded-lg bg-dust-800/40 border border-dust-600/30 active:scale-[0.98] transition-transform"
              >
                <p className="text-[13px] text-dust-50 font-medium leading-tight">{n.name}</p>
                <p className="text-[10px] text-dust-200/60 mt-0.5 truncate">{n.short}</p>
              </button>
            ))}
        </div>
      </div>

      <BottomSheet open={!!openNode} onClose={() => setOpenNode(null)}>
        {openNode && <FactSheet node={openNode} onNavigate={(id) => setOpenNode(getNode(id) ?? null)} />}
      </BottomSheet>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span>{label}</span>
    </span>
  );
}
