"use client";

import { useState } from "react";

import { skills } from "@/data/skills";
import type { SkillItem } from "@/types/portfolio";

interface BadgeMeta {
  abbr: string;
  bg: string;
  fg: string;
}

/** Brand-ish color + short tag for each skill's inventory badge. */
const BADGE_META: Record<string, BadgeMeta> = {
  HTML: { abbr: "HTML", bg: "#e34f26", fg: "#fff" },
  CSS: { abbr: "CSS", bg: "#1572b6", fg: "#fff" },
  JavaScript: { abbr: "JS", bg: "#f7df1e", fg: "#1b1b1b" },
  TypeScript: { abbr: "TS", bg: "#3178c6", fg: "#fff" },
  React: { abbr: "RE", bg: "#61dafb", fg: "#12324a" },
  "Tailwind CSS": { abbr: "TW", bg: "#38bdf8", fg: "#0b3a52" },
  Python: { abbr: "PY", bg: "#3776ab", fg: "#ffd43b" },
  "Node.js": { abbr: "NODE", bg: "#5fa04e", fg: "#fff" },
  FastAPI: { abbr: "API", bg: "#059488", fg: "#fff" },
  SQL: { abbr: "SQL", bg: "#d9770a", fg: "#fff" },
  "C#": { abbr: "C#", bg: "#68217a", fg: "#fff" },
  PyTorch: { abbr: "TOR", bg: "#ee4c2c", fg: "#fff" },
  "scikit-learn": { abbr: "SKL", bg: "#f7931e", fg: "#1b1b1b" },
  "Multi-Agent Systems": { abbr: "MAS", bg: "#7a4fce", fg: "#fff" },
  Qiskit: { abbr: "QSK", bg: "#6929c4", fg: "#fff" },
  Git: { abbr: "GIT", bg: "#f05033", fg: "#fff" },
  Docker: { abbr: "DKR", bg: "#2496ed", fg: "#fff" },
  "Linux / Shell": { abbr: "SH", bg: "#2f2f2f", fg: "#7fe07f" },
  PostgreSQL: { abbr: "PG", bg: "#336791", fg: "#fff" },
  "Next.js": { abbr: "NX", bg: "#151515", fg: "#fff" },
};

const FALLBACK: BadgeMeta = { abbr: "?", bg: "#4a4a4a", fg: "#fff" };

/** Which skills get a permanent RPG "Mastered!" callout, and its spell school. */
const CALLOUTS: Record<string, string> = {
  JavaScript: "web",
  React: "web",
  Git: "git",
  Python: "data",
};

const COLS = 5;
const CELL = 52;
const GAP = 4;

const flatSkills: SkillItem[] = skills.flatMap((category) => category.items);
const TOTAL_SLOTS = Math.ceil(flatSkills.length / COLS) * COLS;

export function ItemInventory() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="font-sans min-h-full bg-[#241d12] p-3 text-[#f4ecd8]">
      <div className="mb-3 flex items-center justify-between border-b-2 border-[#6b5a3c] pb-2">
        <h2 className="font-pixel text-[11px] text-[var(--color-rpg-gold)]">
          SKILLS INVENTORY
        </h2>
        <span className="font-terminal text-[15px] text-[#c9bd9a]">
          {flatSkills.length} / {TOTAL_SLOTS} slots
        </span>
      </div>

      {/* Inventory grid + anchored callouts */}
      <div className="relative pr-[132px]">
        <div
          className="grid w-max"
          style={{ gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`, gap: GAP }}
        >
          {Array.from({ length: TOTAL_SLOTS }).map((_, index) => {
            const item = flatSkills[index];
            const meta = item ? (BADGE_META[item.name] ?? FALLBACK) : null;
            const callout = item ? CALLOUTS[item.name] : undefined;
            return (
              <div
                key={index}
                className="inv-slot relative grid place-items-center"
                style={{ width: CELL, height: CELL }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered((h) => (h === index ? null : h))}
                title={item ? `${item.name} — ${item.level}` : "Empty"}
              >
                {meta ? (
                  <span
                    className="font-pixel grid h-9 w-9 place-items-center border border-black/40 text-[7px] leading-none"
                    style={{ background: meta.bg, color: meta.fg }}
                  >
                    {meta.abbr}
                  </span>
                ) : null}

                {item && callout ? (
                  <span className="inv-callout font-terminal absolute left-[44px] top-0 z-20 flex w-[126px] flex-col text-[13px] leading-[1.15]">
                    <b className="font-sans text-[11px] font-bold">{item.name}</b>
                    <span>Mastered!</span>
                    <span>Allows {callout} spells</span>
                  </span>
                ) : null}

                {item && hovered === index && !callout ? (
                  <span className="inv-callout font-terminal absolute left-[44px] top-0 z-30 flex w-[118px] flex-col text-[13px] leading-[1.15]">
                    <b className="font-sans text-[11px] font-bold">{item.name}</b>
                    <span>{item.level}</span>
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <p className="font-terminal mt-3 border-t-2 border-[#6b5a3c] pt-2 text-[14px] text-[#c9bd9a]">
        Hover a slot to inspect. Lettered tiles are the working kit.
      </p>
    </div>
  );
}
