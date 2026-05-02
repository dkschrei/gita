"use client";

import jsPDF from "jspdf";
import { ReaderProfile } from "./reader-profile";
import { CHAPTERS } from "./chapters";

export interface PdfData {
  profile: ReaderProfile;
  synthesis: string;       // full synthesis text incl. SYNTHESIS: and FINAL WORD: sections
  personalizedMirrors: Array<{ n: number; text: string; generatedAt: string }>;
  generatedAt: string;
}

export type PdfMode = "light" | "full";

const PALETTE = {
  ink: [40, 36, 30] as [number, number, number],
  muted: [110, 102, 88] as [number, number, number],
  gold: [180, 130, 50] as [number, number, number],
  paper: [250, 246, 236] as [number, number, number],
};

function setText(doc: jsPDF, color: [number, number, number]) {
  doc.setTextColor(color[0], color[1], color[2]);
}

function parseSynthesis(raw: string): { synthesis: string; finalWord: string } {
  // Split on "FINAL WORD:" — case-insensitive
  const finalIdx = raw.search(/FINAL\s*WORD\s*:/i);
  if (finalIdx === -1) {
    return { synthesis: raw.replace(/^SYNTHESIS\s*:\s*/i, "").trim(), finalWord: "" };
  }
  const synthRaw = raw.slice(0, finalIdx).replace(/^SYNTHESIS\s*:\s*/i, "").trim();
  const finalRaw = raw.slice(finalIdx).replace(/^FINAL\s*WORD\s*:\s*/i, "").trim();
  return { synthesis: synthRaw, finalWord: finalRaw };
}

export function generatePDF(data: PdfData, mode: PdfMode): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "letter",
  });

  const PAGE_W = doc.internal.pageSize.getWidth();
  const PAGE_H = doc.internal.pageSize.getHeight();
  const MARGIN = 56;
  const CONTENT_W = PAGE_W - MARGIN * 2;

  const { synthesis, finalWord } = parseSynthesis(data.synthesis);

  let y = MARGIN;

  const newPage = () => {
    doc.addPage();
    y = MARGIN;
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_H - MARGIN) newPage();
  };

  const drawText = (
    text: string,
    opts: {
      size?: number;
      font?: "helvetica" | "times";
      style?: "normal" | "italic" | "bold";
      color?: [number, number, number];
      lineHeight?: number;
      indent?: number;
      align?: "left" | "center";
    } = {}
  ) => {
    const size = opts.size || 11;
    const lh = opts.lineHeight || size * 1.5;
    doc.setFont(opts.font || "times", opts.style || "normal");
    doc.setFontSize(size);
    setText(doc, opts.color || PALETTE.ink);

    const indent = opts.indent || 0;
    const w = CONTENT_W - indent * 2;
    const lines: string[] = doc.splitTextToSize(text, w) as string[];
    for (const line of lines) {
      ensureSpace(lh);
      const x = opts.align === "center" ? PAGE_W / 2 : MARGIN + indent;
      doc.text(line, x, y, { align: opts.align || "left" });
      y += lh;
    }
  };

  const drawLabel = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setText(doc, PALETTE.gold);
    ensureSpace(14);
    doc.text(text.toUpperCase(), MARGIN, y, { charSpace: 1.5 });
    y += 16;
  };

  const drawDivider = () => {
    ensureSpace(24);
    doc.setDrawColor(PALETTE.gold[0], PALETTE.gold[1], PALETTE.gold[2]);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y, MARGIN + 60, y);
    y += 22;
  };

  const space = (n: number = 12) => {
    y += n;
    if (y > PAGE_H - MARGIN) newPage();
  };

  // ============== COVER PAGE ==============
  // Centered, generous whitespace
  y = PAGE_H * 0.32;
  drawText("THE BHAGAVAD GITA", {
    size: 9, font: "helvetica", color: PALETTE.muted, align: "center",
  });
  space(10);
  drawText("A Personal Synthesis", {
    size: 28, font: "times", style: "italic", color: PALETTE.gold, align: "center",
  });
  space(14);
  drawText(
    `Prepared for the reader on ${new Date(data.generatedAt).toLocaleDateString(undefined, {
      weekday: "long", year: "numeric", month: "long", day: "numeric",
    })}`,
    { size: 10, color: PALETTE.muted, align: "center" }
  );
  space(40);
  drawText(
    `${data.personalizedMirrors.length} of 18 chapters personalized`,
    { size: 9, color: PALETTE.muted, align: "center" }
  );

  newPage();

  // ============== READER PROFILE PAGE (full mode only) ==============
  if (mode === "full") {
    drawLabel("Your Profile");
    space(4);
    drawText("Who you said you were", {
      size: 22, font: "times", style: "italic", color: PALETTE.ink,
    });
    drawDivider();

    const p = data.profile;
    const lifeStageLabels: Record<string, string> = {
      "early-adult": "Early adulthood",
      "building-career": "Building career",
      "midlife": "Midlife",
      "late-career": "Late career",
      "retired": "Retired or beyond",
      "unspecified": "Unspecified life stage",
    };
    const arrivalLabels: Record<string, string> = {
      curiosity: "out of curiosity",
      crisis: "in the middle of a crisis",
      recommended: "because someone recommended it",
      "spiritual-practice": "as part of an existing spiritual practice",
      rereading: "to reread it after time away",
      other: "for personal reasons",
    };

    const profileLines: Array<{ label: string; value: string | undefined }> = [
      { label: "Life stage", value: lifeStageLabels[p.lifeStage] },
      { label: "What's loudest", value: p.preoccupations.join(", ") || undefined },
      { label: "What pulled you here", value: arrivalLabels[p.arrival] },
      { label: "Spirituality", value: p.spirituality },
      { label: "The hardest thing", value: p.hardestThing },
      { label: "Trying to decide", value: p.decidingAbout },
      { label: "Worth-it outcome", value: p.worthItOutcome },
      { label: "Tried that didn't work", value: p.triedThatFailed },
      { label: "Obligations", value: p.obligations },
      { label: "Honest definition of success", value: p.honestSuccess },
      { label: "Greatest fear", value: p.greatestFear },
      { label: "Something else", value: p.somethingElse },
    ];

    for (const line of profileLines) {
      if (!line.value) continue;
      ensureSpace(40);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      setText(doc, PALETTE.muted);
      doc.text(line.label.toUpperCase(), MARGIN, y, { charSpace: 1.2 });
      y += 13;
      drawText(line.value, { size: 11, font: "times", color: PALETTE.ink });
      space(8);
    }
    newPage();
  }

  // ============== SYNTHESIS PAGE ==============
  drawLabel("The Synthesis");
  space(4);
  drawText("What the eighteen chapters, taken together, said to you.", {
    size: 22, font: "times", style: "italic", color: PALETTE.ink, lineHeight: 30,
  });
  drawDivider();

  // Synthesis prose — split paragraphs by double newlines
  const synthParas = synthesis.split(/\n\s*\n/).filter((p) => p.trim());
  for (const para of synthParas) {
    drawText(para.trim(), { size: 12, font: "times", lineHeight: 18 });
    space(10);
  }

  if (finalWord) {
    space(20);
    drawDivider();
    drawLabel("The Final Word");
    space(4);
    drawText(finalWord, {
      size: 13, font: "times", style: "italic", color: PALETTE.ink, lineHeight: 20,
    });
  }

  // ============== INDIVIDUAL MIRRORS ==============
  newPage();
  drawLabel(mode === "light" ? "Personalized Mirrors" : "The Mirrors, One by One");
  space(4);
  drawText("Each chapter, calibrated to you.", {
    size: 22, font: "times", style: "italic", color: PALETTE.ink,
  });
  drawDivider();

  for (const m of data.personalizedMirrors) {
    const ch = CHAPTERS.find((c) => c.n === m.n);
    if (!ch) continue;

    ensureSpace(160);

    // Chapter header
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setText(doc, PALETTE.gold);
    doc.text(`CHAPTER ${m.n}`, MARGIN, y, { charSpace: 1.5 });
    y += 14;

    drawText(ch.title, { size: 16, font: "times", style: "italic", color: PALETTE.ink });
    drawText(ch.sanskrit, { size: 9, font: "times", style: "italic", color: PALETTE.muted });
    space(8);

    // Personalized mirror
    drawText(m.text.trim(), { size: 11, font: "times", lineHeight: 16 });

    // In full mode, also include the universal mirror underneath
    if (mode === "full") {
      space(6);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      setText(doc, PALETTE.muted);
      ensureSpace(12);
      doc.text("UNIVERSAL VERSION", MARGIN, y, { charSpace: 1.2 });
      y += 12;
      drawText(ch.mirror.body, {
        size: 9.5, font: "times", style: "italic", color: PALETTE.muted, lineHeight: 14,
      });
    }

    space(20);
  }

  // ============== FOOTER on every page ==============
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    setText(doc, PALETTE.muted);
    doc.text(
      `gita-five.vercel.app · ${new Date(data.generatedAt).toLocaleDateString()}`,
      MARGIN,
      PAGE_H - 28,
      { charSpace: 0.6 }
    );
    doc.text(`${i} / ${totalPages}`, PAGE_W - MARGIN, PAGE_H - 28, { align: "right" });
  }

  return doc;
}

export function downloadPDF(data: PdfData, mode: PdfMode) {
  const doc = generatePDF(data, mode);
  const stamp = new Date(data.generatedAt).toISOString().slice(0, 10);
  const name = mode === "light" ? `gita-synthesis-${stamp}.pdf` : `gita-full-record-${stamp}.pdf`;
  doc.save(name);
}
