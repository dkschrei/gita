import React from "react";

// Stylized SVG portraits — symbolic, not photorealistic
// Each portrait is 200x240, designed to fit in a card

interface PortraitProps {
  className?: string;
  size?: number;
}

export function KrishnaPortrait({ className = "", size = 200 }: PortraitProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      width={size}
      height={(size * 240) / 200}
      className={className}
      role="img"
      aria-label="Krishna — divine charioteer"
    >
      {/* Sky/halo background */}
      <defs>
        <radialGradient id="krishnaHalo" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#D9A441" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#A47419" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0F2D5C" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="240" fill="#0F2D5C" />
      <circle cx="100" cy="90" r="90" fill="url(#krishnaHalo)" />

      {/* Peacock feathers in crown */}
      <g transform="translate(100, 35)">
        <ellipse cx="-12" cy="0" rx="3" ry="14" fill="#1E4F8E" transform="rotate(-15)" />
        <ellipse cx="-12" cy="-10" rx="2.5" ry="3" fill="#D9A441" transform="rotate(-15)" />
        <ellipse cx="0" cy="-4" rx="3.5" ry="16" fill="#1E4F8E" />
        <ellipse cx="0" cy="-16" rx="3" ry="3.5" fill="#D9A441" />
        <ellipse cx="12" cy="0" rx="3" ry="14" fill="#1E4F8E" transform="rotate(15)" />
        <ellipse cx="12" cy="-10" rx="2.5" ry="3" fill="#D9A441" transform="rotate(15)" />
      </g>

      {/* Crown band */}
      <path d="M 70 55 Q 100 48 130 55 L 128 65 Q 100 60 72 65 Z" fill="#D9A441" />
      <circle cx="100" cy="58" r="3" fill="#8B3E1D" />

      {/* Head — divine blue */}
      <ellipse cx="100" cy="90" rx="32" ry="36" fill="#4A7DB8" />

      {/* Tilaka mark on forehead */}
      <path d="M 96 75 L 100 68 L 104 75 L 102 85 L 98 85 Z" fill="#D9A441" opacity="0.85" />

      {/* Calm closed eyes */}
      <path d="M 84 92 Q 90 95 96 92" stroke="#0F2D5C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 104 92 Q 110 95 116 92" stroke="#0F2D5C" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Subtle smile */}
      <path d="M 92 110 Q 100 114 108 110" stroke="#0F2D5C" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Neck */}
      <rect x="92" y="120" width="16" height="12" fill="#4A7DB8" />

      {/* Body — orange dhoti, garland */}
      <path d="M 70 132 Q 100 126 130 132 L 138 200 L 62 200 Z" fill="#C56A3E" />
      {/* Yellow scarf/garland over body */}
      <path d="M 75 138 Q 100 148 125 138 L 130 152 Q 100 162 70 152 Z" fill="#D9A441" opacity="0.9" />
      {/* Flower garland (vaijayanti) */}
      <g opacity="0.85">
        <circle cx="80" cy="138" r="2.5" fill="#F2C9B3" />
        <circle cx="92" cy="143" r="2.5" fill="#F2C9B3" />
        <circle cx="108" cy="143" r="2.5" fill="#F2C9B3" />
        <circle cx="120" cy="138" r="2.5" fill="#F2C9B3" />
      </g>

      {/* Reins in hands — symbolic, not weapons */}
      <path
        d="M 50 195 Q 80 175 100 175 Q 120 175 150 195"
        stroke="#5C2611"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Arm/hand */}
      <ellipse cx="62" cy="190" rx="8" ry="12" fill="#4A7DB8" />
      <ellipse cx="138" cy="190" rx="8" ry="12" fill="#4A7DB8" />
    </svg>
  );
}

export function ArjunaPortrait({ className = "", size = 200 }: PortraitProps) {
  return (
    <svg
      viewBox="0 0 200 240"
      width={size}
      height={(size * 240) / 200}
      className={className}
      role="img"
      aria-label="Arjuna — warrior in crisis"
    >
      <defs>
        <radialGradient id="arjunaHalo" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#C56A3E" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1A1810" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="240" fill="#2A2718" />
      <circle cx="100" cy="100" r="100" fill="url(#arjunaHalo)" />

      {/* Hair — warrior's topknot */}
      <ellipse cx="100" cy="50" rx="14" ry="14" fill="#1A1810" />
      <rect x="93" y="55" width="14" height="20" fill="#1A1810" />

      {/* Headband / warrior tilaka band */}
      <rect x="68" y="68" width="64" height="6" fill="#8B3E1D" />
      <circle cx="100" cy="71" r="3" fill="#D9A441" />

      {/* Head — sun-darkened */}
      <ellipse cx="100" cy="95" rx="30" ry="34" fill="#C56A3E" />

      {/* Tilaka — vertical streak */}
      <path d="M 97 80 L 100 76 L 103 80 L 102 88 L 98 88 Z" fill="#5C2611" />

      {/* Eyes — open, troubled, looking down */}
      <ellipse cx="89" cy="96" rx="3.5" ry="2" fill="#1A1810" />
      <ellipse cx="111" cy="96" rx="3.5" ry="2" fill="#1A1810" />
      {/* Furrowed brow */}
      <path d="M 84 88 L 94 91" stroke="#5C2611" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 116 88 L 106 91" stroke="#5C2611" strokeWidth="1.5" strokeLinecap="round" />

      {/* Mouth — set, troubled */}
      <path d="M 92 113 Q 100 112 108 113" stroke="#5C2611" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Beard hint */}
      <path d="M 88 115 Q 100 122 112 115 Q 108 124 100 125 Q 92 124 88 115" fill="#5C2611" opacity="0.5" />

      {/* Neck */}
      <rect x="92" y="124" width="16" height="10" fill="#C56A3E" />

      {/* Armor — bronze chest plate */}
      <path d="M 60 134 Q 100 128 140 134 L 144 200 L 56 200 Z" fill="#5C2611" />
      {/* Armor detailing */}
      <path d="M 70 144 L 130 144" stroke="#D9A441" strokeWidth="1.5" />
      <path d="M 70 158 L 130 158" stroke="#D9A441" strokeWidth="1.5" opacity="0.7" />
      <circle cx="100" cy="150" r="6" fill="none" stroke="#D9A441" strokeWidth="1.5" />
      <circle cx="100" cy="150" r="2" fill="#D9A441" />

      {/* Shoulder pauldrons */}
      <ellipse cx="62" cy="138" rx="10" ry="8" fill="#8B3E1D" />
      <ellipse cx="138" cy="138" rx="10" ry="8" fill="#8B3E1D" />

      {/* Quiver strap */}
      <path d="M 56 138 Q 70 165 80 200" stroke="#3A1F0C" strokeWidth="3" fill="none" />

      {/* Bow — Gandiva, lowered */}
      <path
        d="M 48 175 Q 38 195 48 220"
        stroke="#D9A441"
        strokeWidth="2.5"
        fill="none"
      />
      <line x1="48" y1="175" x2="48" y2="220" stroke="#1A1810" strokeWidth="0.8" />

      {/* Arm holding bow loosely */}
      <ellipse cx="58" cy="195" rx="9" ry="13" fill="#C56A3E" />
    </svg>
  );
}

export function SanjayaPortrait({ className = "", size = 200 }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" width={size} height={(size * 240) / 200} className={className} role="img" aria-label="Sanjaya — narrator with divine sight">
      <rect width="200" height="240" fill="#54503F" />
      <ellipse cx="100" cy="55" rx="22" ry="22" fill="#2A2718" />
      <ellipse cx="100" cy="100" rx="30" ry="34" fill="#E8E2D4" />
      {/* Third eye open — divine sight */}
      <ellipse cx="100" cy="82" rx="5" ry="3" fill="#D9A441" />
      <circle cx="100" cy="82" r="1.5" fill="#1A1810" />
      {/* Closed physical eyes */}
      <path d="M 86 95 Q 92 98 98 95" stroke="#54503F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 102 95 Q 108 98 114 95" stroke="#54503F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 92 116 Q 100 119 108 116" stroke="#54503F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Beard */}
      <path d="M 78 118 Q 100 142 122 118 Q 116 145 100 148 Q 84 145 78 118" fill="#E8E2D4" />
      {/* Robe */}
      <path d="M 60 140 Q 100 134 140 140 L 145 200 L 55 200 Z" fill="#8A8472" />
    </svg>
  );
}

export function DhritarashtraPortrait({ className = "", size = 200 }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" width={size} height={(size * 240) / 200} className={className} role="img" aria-label="Dhritarashtra — the blind king">
      <rect width="200" height="240" fill="#1A1810" />
      <path d="M 70 50 L 100 35 L 130 50 L 134 65 L 66 65 Z" fill="#D9A441" />
      <circle cx="100" cy="48" r="4" fill="#8B3E1D" />
      <ellipse cx="100" cy="100" rx="32" ry="36" fill="#C9C2B0" />
      {/* Closed/blind eyes — heavy lines */}
      <path d="M 82 96 Q 90 100 100 96" stroke="#1A1810" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 100 96 Q 110 100 118 96" stroke="#1A1810" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Furrowed brow */}
      <path d="M 78 86 Q 90 84 96 88" stroke="#54503F" strokeWidth="1.5" fill="none" />
      <path d="M 122 86 Q 110 84 104 88" stroke="#54503F" strokeWidth="1.5" fill="none" />
      <path d="M 92 116 L 108 116" stroke="#54503F" strokeWidth="1.5" strokeLinecap="round" />
      {/* White beard — old king */}
      <path d="M 76 120 Q 100 158 124 120 Q 116 156 100 160 Q 84 156 76 120" fill="#F0EBE0" />
      <path d="M 60 142 Q 100 136 140 142 L 145 200 L 55 200 Z" fill="#5C2611" />
    </svg>
  );
}

export function DuryodhanaPortrait({ className = "", size = 200 }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" width={size} height={(size * 240) / 200} className={className} role="img" aria-label="Duryodhana — the ambitious cousin">
      <rect width="200" height="240" fill="#3A1F0C" />
      <ellipse cx="100" cy="55" rx="20" ry="16" fill="#1A1810" />
      <path d="M 70 55 L 100 40 L 130 55 L 132 70 L 68 70 Z" fill="#D9A441" />
      <circle cx="100" cy="52" r="4" fill="#8B3E1D" />
      <ellipse cx="100" cy="100" rx="32" ry="36" fill="#C56A3E" />
      {/* Tilaka */}
      <path d="M 97 78 L 100 73 L 103 78 L 102 87 L 98 87 Z" fill="#5C2611" />
      {/* Sharp eyes */}
      <ellipse cx="89" cy="98" rx="4" ry="2" fill="#1A1810" />
      <ellipse cx="111" cy="98" rx="4" ry="2" fill="#1A1810" />
      {/* Angled brows */}
      <path d="M 82 88 L 94 92" stroke="#1A1810" strokeWidth="2" strokeLinecap="round" />
      <path d="M 118 88 L 106 92" stroke="#1A1810" strokeWidth="2" strokeLinecap="round" />
      {/* Mustache */}
      <path d="M 86 114 Q 100 110 114 114" stroke="#1A1810" strokeWidth="2.5" fill="none" />
      <path d="M 88 117 Q 100 120 112 117" stroke="#1A1810" strokeWidth="1.5" fill="none" />
      {/* Armor */}
      <path d="M 58 134 Q 100 128 142 134 L 146 200 L 54 200 Z" fill="#1A1810" />
      <path d="M 70 145 L 130 145" stroke="#D9A441" strokeWidth="1.5" />
      <circle cx="100" cy="155" r="6" fill="none" stroke="#D9A441" strokeWidth="1.5" />
      <ellipse cx="60" cy="138" rx="10" ry="8" fill="#5C2611" />
      <ellipse cx="140" cy="138" rx="10" ry="8" fill="#5C2611" />
    </svg>
  );
}

export function BhishmaPortrait({ className = "", size = 200 }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" width={size} height={(size * 240) / 200} className={className} role="img" aria-label="Bhishma — the grand-uncle bound by oath">
      <rect width="200" height="240" fill="#54503F" />
      <ellipse cx="100" cy="50" rx="20" ry="16" fill="#F0EBE0" />
      <path d="M 70 55 L 100 40 L 130 55 L 132 68 L 68 68 Z" fill="#D9A441" />
      <ellipse cx="100" cy="100" rx="32" ry="36" fill="#C9C2B0" />
      <path d="M 97 80 L 100 75 L 103 80 L 102 89 L 98 89 Z" fill="#5C2611" />
      <ellipse cx="89" cy="97" rx="3" ry="2" fill="#1A1810" />
      <ellipse cx="111" cy="97" rx="3" ry="2" fill="#1A1810" />
      <path d="M 84 88 L 94 91" stroke="#54503F" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 116 88 L 106 91" stroke="#54503F" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 92 113 Q 100 116 108 113" stroke="#54503F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* White beard */}
      <path d="M 76 118 Q 100 162 124 118 Q 116 160 100 164 Q 84 160 76 118" fill="#F0EBE0" />
      <path d="M 58 142 Q 100 136 142 142 L 146 200 L 54 200 Z" fill="#1A1810" />
      <path d="M 70 152 L 130 152" stroke="#D9A441" strokeWidth="1.5" />
      <ellipse cx="60" cy="144" rx="10" ry="8" fill="#5C2611" />
      <ellipse cx="140" cy="144" rx="10" ry="8" fill="#5C2611" />
    </svg>
  );
}

export function DronaPortrait({ className = "", size = 200 }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" width={size} height={(size * 240) / 200} className={className} role="img" aria-label="Drona — Arjuna's archery teacher">
      <rect width="200" height="240" fill="#3A2F1A" />
      {/* Topknot — sage */}
      <circle cx="100" cy="48" r="10" fill="#1A1810" />
      <ellipse cx="100" cy="100" rx="30" ry="34" fill="#E8E2D4" />
      {/* Tilaka — three horizontal lines (Brahmin) */}
      <line x1="92" y1="80" x2="108" y2="80" stroke="#5C2611" strokeWidth="1.5" />
      <line x1="92" y1="84" x2="108" y2="84" stroke="#5C2611" strokeWidth="1.5" />
      <line x1="92" y1="88" x2="108" y2="88" stroke="#5C2611" strokeWidth="1.5" />
      <ellipse cx="89" cy="97" rx="3" ry="2" fill="#1A1810" />
      <ellipse cx="111" cy="97" rx="3" ry="2" fill="#1A1810" />
      <path d="M 92 115 Q 100 117 108 115" stroke="#54503F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Beard */}
      <path d="M 78 118 Q 100 152 122 118 Q 114 154 100 156 Q 86 154 78 118" fill="#F0EBE0" />
      {/* Sacred thread */}
      <path d="M 70 138 Q 100 152 130 138" stroke="#D9A441" strokeWidth="1" fill="none" />
      <path d="M 60 142 Q 100 136 140 142 L 145 200 L 55 200 Z" fill="#8A8472" />
    </svg>
  );
}

// Generic placeholder for concept nodes — symbolic disc
export function ConceptIcon({
  className = "",
  size = 80,
  symbol = "•",
  fill = "#D9A441"
}: PortraitProps & { symbol?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size} className={className} role="img">
      <circle cx="40" cy="40" r="36" fill="#1A1810" stroke={fill} strokeWidth="1.5" />
      <text
        x="40"
        y="50"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, serif"
        fontSize="32"
        fill={fill}
      >
        {symbol}
      </text>
    </svg>
  );
}

export const PORTRAITS: Record<string, React.ComponentType<PortraitProps>> = {
  krishna: KrishnaPortrait,
  arjuna: ArjunaPortrait,
  sanjaya: SanjayaPortrait,
  dhritarashtra: DhritarashtraPortrait,
  duryodhana: DuryodhanaPortrait,
  bhishma: BhishmaPortrait,
  drona: DronaPortrait,
};
