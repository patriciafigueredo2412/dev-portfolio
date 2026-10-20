"use client";

import { useState } from "react";

import { Sprite } from "@/components/Sprite";
import { skills } from "@/data/skills";
import type { SkillItem, SkillLevel } from "@/types/portfolio";

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
  "Git / GitHub": { abbr: "GIT", bg: "#f05033", fg: "#fff" },
  Docker: { abbr: "DKR", bg: "#2496ed", fg: "#fff" },
  "Linux / Unix CLI": { abbr: "SH", bg: "#2f2f2f", fg: "#7fe07f" },
  PostgreSQL: { abbr: "PG", bg: "#336791", fg: "#fff" },
  "Next.js": { abbr: "NX", bg: "#151515", fg: "#fff" },
  C: { abbr: "C", bg: "#a8b9cc", fg: "#1b2a4a" },
  "C++": { abbr: "C++", bg: "#00599c", fg: "#fff" },
  Java: { abbr: "JAVA", bg: "#e76f00", fg: "#fff" },
  Arduino: { abbr: "ARD", bg: "#00979d", fg: "#fff" },
  "Motor Drivers": { abbr: "MTR", bg: "#6d5a3c", fg: "#ffe8a3" },
  "Bluetooth Serial": { abbr: "BT", bg: "#0082fc", fg: "#fff" },
  "Digital Logic": { abbr: "LOG", bg: "#1f6f3f", fg: "#b8ffcf" },
  "OOP Design": { abbr: "OOP", bg: "#8e44ad", fg: "#fff" },
  Debugging: { abbr: "DBG", bg: "#c0392b", fg: "#fff" },
  Algorithms: { abbr: "ALG", bg: "#2c3e50", fg: "#f1c40f" },
  "Data Structures": { abbr: "DS", bg: "#16a085", fg: "#fff" },
  "Relational Modeling": { abbr: "ERD", bg: "#5d6d7e", fg: "#fff" },
  "JetBrains IDEs": { abbr: "JB", bg: "#000000", fg: "#fff" },
  "VS Code": { abbr: "VSC", bg: "#007acc", fg: "#fff" },
  "Process Optimization": { abbr: "OPT", bg: "#b9770e", fg: "#fff" },
  "Automated Scheduling": { abbr: "SCH", bg: "#1e8449", fg: "#fff" },
  "Document Processing": { abbr: "DOC", bg: "#7d6608", fg: "#fff" },
  Spanish: { abbr: "ES", bg: "#c60b1e", fg: "#ffc400" },
  English: { abbr: "EN", bg: "#012169", fg: "#fff" },
  ASL: { abbr: "ASL", bg: "#f5b041", fg: "#3a2e1f" },
};

const FALLBACK: BadgeMeta = { abbr: "?", bg: "#4a4a4a", fg: "#fff" };


/** Numeric weight of each rarity — drives the character sheet's level + bars. */
const LEVEL_RANK: Record<SkillLevel, number> = {
  Novice: 1,
  Apprentice: 2,
  Journeyman: 3,
  Expert: 4,
  Master: 5,
};

const COLS = 5;
const CELL = 58;

const flatSkills: SkillItem[] = skills.flatMap((category) => category.items);
const TOTAL_SLOTS = Math.ceil(flatSkills.length / COLS) * COLS;

const skillPoints = flatSkills.reduce((sum, item) => sum + LEVEL_RANK[item.level], 0);
const maxPoints = flatSkills.length * LEVEL_RANK.Master;
const masteredCount = flatSkills.filter((item) => item.level === "Master").length;

function StatBar({ label, value, variant }: { label: string; value: number; variant: string }) {
  return (
    <div className="xp-bar flex-1">
      <div className={`xp-bar__fill ${variant}`} style={{ width: `${value}%` }} />
      <span className="xp-bar__label">{label}</span>
    </div>
  );
}

export function ItemInventory() {
  const [selected, setSelected] = useState(0);
  const current = flatSkills[selected];

  return (
    <div className="font-sans flex min-h-full flex-col gap-3 p-3 text-[var(--color-quest-ink)]">
      <section className="xp-panel">
        <h2 className="xp-panel__header flex items-center justify-between">
          Inventory
          <span className="font-terminal text-[15px]">
            {flatSkills.length} / {TOTAL_SLOTS} slots
          </span>
        </h2>

        <div
          className="grid justify-center gap-x-2 gap-y-2 p-3"
          style={{ gridTemplateColumns: `repeat(${COLS}, ${CELL}px)` }}
        >
          {Array.from({ length: TOTAL_SLOTS }).map((_, index) => {
            const item = flatSkills[index];
            if (!item) {
              return (
                <div key={index} className="flex flex-col items-center gap-1" aria-hidden>
                  <span className="inv-slot inv-slot--empty block" style={{ width: CELL, height: CELL }} />
                </div>
              );
            }
            const meta = BADGE_META[item.name] ?? FALLBACK;
            return (
              <button
                key={index}
                type="button"
                className="flex flex-col items-center gap-1 outline-none"
                title={`${item.name} — ${item.level}`}
                onMouseEnter={() => setSelected(index)}
                onFocus={() => setSelected(index)}
                onClick={() => setSelected(index)}
              >
                <span
                  className="inv-slot relative grid place-items-center"
                  data-rarity={item.level}
                  data-selected={selected === index}
                  style={{ width: CELL, height: CELL }}
                >
                  <span
                    className="font-pixel grid h-9 w-9 place-items-center rounded-[3px] border-2 border-black/50 text-[7px] leading-none shadow-[2px_2px_0_0_rgba(0,0,0,0.3)]"
                    style={{ background: meta.bg, color: meta.fg }}
                  >
                    {meta.abbr}
                  </span>
                  <span className="font-terminal absolute bottom-0 right-1 text-[13px] leading-none text-white [text-shadow:1px_1px_0_#000]">
                    {LEVEL_RANK[item.level]}
                  </span>
                </span>
                <span className="font-terminal w-full truncate text-center text-[14px] leading-none">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Character sheet */}
      <section className="xp-panel flex items-center gap-3 p-3">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded border-2 border-[var(--color-quest-ink)] bg-[#cfe3f7] p-1">
          <Sprite name="avatar" className="h-full w-full object-contain" />
        </span>
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="font-pixel text-[11px]">Level {skillPoints} Programmer</p>
          <div className="flex items-center gap-2">
            <span className="font-pixel w-6 text-[9px]">HP</span>
            <StatBar
              label={`Mastered ${masteredCount} / ${flatSkills.length}`}
              value={(masteredCount / flatSkills.length) * 100}
              variant="xp-bar__fill--hp"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-pixel w-6 text-[9px]">XP</span>
            <StatBar
              label={`${skillPoints} / ${maxPoints} skill XP`}
              value={(skillPoints / maxPoints) * 100}
              variant="xp-bar__fill--mp"
            />
          </div>
          <p className="font-terminal truncate text-[15px] leading-none text-[#5a4a35]">
            &gt; Equipped: <b>{current.name}</b> — {current.level}
          </p>
        </div>
      </section>
    </div>
  );
}
