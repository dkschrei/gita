"use client";

import { GraphNode, getNode } from "@/lib/graph";
import { PORTRAITS } from "./Portraits";

interface Props {
  node: GraphNode;
  onNavigate: (id: string) => void;
}

const kindLabel: Record<GraphNode["kind"], string> = {
  character: "Character",
  concept: "Concept",
};

const groupAccent: Record<string, string> = {
  pandava: "#C56A3E",
  kaurava: "#A33D3D",
  divine: "#4A7DB8",
  narrator: "#D9A441",
  teacher: "#D9A441",
  "core-teaching": "#8B7FD8",
  practice: "#1D9E75",
  state: "#7CA044",
  obstacle: "#A33D3D",
  cosmology: "#8B7FD8",
  object: "#8A8472",
};

export default function FactSheet({ node, onNavigate }: Props) {
  const Portrait = PORTRAITS[node.id];
  const accent = groupAccent[node.group] ?? "#D9A441";

  return (
    <div className="pt-2">
      <div className="flex gap-3 mb-4 items-start">
        {Portrait ? (
          <div
            className="rounded-xl overflow-hidden flex-shrink-0 border border-dust-600/40"
            style={{ width: 84 }}
          >
            <Portrait size={84} />
          </div>
        ) : (
          <div
            className="rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              width: 84,
              height: 100,
              background: `${accent}1A`,
              border: `0.5px solid ${accent}66`,
            }}
          >
            <span className="font-serif-d text-3xl" style={{ color: accent }}>
              {node.name[0]}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0 pt-1">
          <p
            className="text-[10px] uppercase tracking-[0.16em] font-medium mb-1"
            style={{ color: accent }}
          >
            {kindLabel[node.kind]} · {node.group}
          </p>
          <h3 className="font-serif-d text-[22px] text-dust-50 leading-tight">{node.name}</h3>
          {node.sanskrit && (
            <p className="font-serif-d italic text-[14px] text-dust-200/70 mt-0.5">
              {node.sanskrit}
            </p>
          )}
          <p className="text-[12px] text-dust-200/80 mt-1.5 leading-snug">{node.short}</p>
        </div>
      </div>

      <div
        className="mb-4 rounded-xl p-3"
        style={{ background: `${accent}10`, border: `0.5px solid ${accent}33` }}
      >
        <p className="text-[14px] text-dust-50 leading-relaxed">{node.body}</p>
      </div>

      {node.appears && node.appears.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 font-medium mb-2">
            Appears in chapters
          </p>
          <div className="flex flex-wrap gap-1.5">
            {node.appears.map((ch) => (
              <span
                key={ch}
                className="px-2 py-0.5 rounded-full text-[11px] font-medium border border-dust-600/40 text-dust-100 bg-dust-800/40"
              >
                {ch}
              </span>
            ))}
          </div>
        </div>
      )}

      {node.related && node.related.length > 0 && (
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.16em] text-dust-200/60 font-medium mb-2">
            Related
          </p>
          <div className="flex flex-wrap gap-1.5">
            {node.related.map((rid) => {
              const r = getNode(rid);
              if (!r) return null;
              return (
                <button
                  key={rid}
                  onClick={() => onNavigate(rid)}
                  className="px-3 py-1.5 rounded-full text-[12px] border text-dust-50 active:scale-95 transition-transform"
                  style={{
                    background: "rgba(217,164,65,0.06)",
                    borderColor: "rgba(217,164,65,0.25)",
                  }}
                >
                  {r.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
