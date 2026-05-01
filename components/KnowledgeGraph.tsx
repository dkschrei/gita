"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { NODES, EDGES } from "@/lib/graph";

interface Props {
  filter: "all" | "character" | "concept";
  onNodeTap: (id: string) => void;
}

const groupColors: Record<string, string> = {
  divine: "#4A7DB8",
  pandava: "#C56A3E",
  kaurava: "#5C2611",
  narrator: "#D9A441",
  object: "#8A8472",
  core: "#D9A441",
  path: "#4A7DB8",
  metaphysics: "#A47419",
  obstacle: "#8B3E1D",
  goal: "#D9A441",
  practice: "#4A7DB8",
};

export default function KnowledgeGraph({ filter, onNodeTap }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svgEl = svgRef.current;
    const width = svgEl.clientWidth || 360;
    const height = svgEl.clientHeight || 420;

    const filteredNodes = NODES.filter((n) => filter === "all" || n.kind === filter);
    const idSet = new Set(filteredNodes.map((n) => n.id));
    const filteredEdges = EDGES.filter((e) => idSet.has(e.source as string) && idSet.has(e.target as string));

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .on("zoom", (event) => g.attr("transform", event.transform));
    svg.call(zoom as any);

    const nodes = filteredNodes.map((n) => ({ ...n }));
    const links = filteredEdges.map((e) => ({ ...e }));

    const sim = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(60)
          .strength(0.6)
      )
      .force("charge", d3.forceManyBody().strength(-180))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(28));

    const link = g
      .append("g")
      .attr("stroke", "rgba(217,164,65,0.25)")
      .attr("stroke-width", 1)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-dasharray", (d: any) => (d.kind === "opposes" ? "3 3" : null));

    const node = g
      .append("g")
      .selectAll<SVGGElement, any>("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer")
      .call(
        d3
          .drag<SVGGElement, any>()
          .on("start", (event, d: any) => {
            if (!event.active) sim.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d: any) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d: any) => {
            if (!event.active) sim.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }) as any
      )
      .on("click", (_, d: any) => onNodeTap(d.id))
      .on("touchend", (_, d: any) => onNodeTap(d.id));

    node
      .append("circle")
      .attr("r", (d: any) => (d.kind === "character" ? 16 : 11))
      .attr("fill", (d: any) => groupColors[d.group] || "#D9A441")
      .attr("stroke", "rgba(255,255,255,0.4)")
      .attr("stroke-width", 1);

    node
      .filter((d: any) => d.kind === "concept")
      .append("circle")
      .attr("r", 3)
      .attr("fill", "rgba(255,255,255,0.85)");

    node
      .append("text")
      .text((d: any) => d.name)
      .attr("text-anchor", "middle")
      .attr("dy", (d: any) => (d.kind === "character" ? 28 : 22))
      .attr("font-family", "Inter, system-ui, sans-serif")
      .attr("font-size", (d: any) => (d.kind === "character" ? 11 : 10))
      .attr("font-weight", 500)
      .attr("fill", "rgba(240,235,224,0.9)")
      .attr("pointer-events", "none");

    sim.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      sim.stop();
    };
  }, [filter, onNodeTap]);

  return (
    <div
      className="rounded-2xl overflow-hidden h-[420px] md:h-[560px] lg:h-[640px]"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "0.5px solid rgba(217,164,65,0.15)",
        touchAction: "none",
      }}
    >
      <svg ref={svgRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
