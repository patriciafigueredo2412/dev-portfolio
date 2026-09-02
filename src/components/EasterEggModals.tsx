"use client";

import { useState } from "react";

import type { EasterEggModal, EasterEggType } from "@/types/portfolio";

/* ------------------------------------------------------------------ *
 * Shark Radar
 * ------------------------------------------------------------------ */
const RADAR_BLIPS = [
  { top: "28%", left: "62%", delay: "0s" },
  { top: "55%", left: "38%", delay: "1.4s" },
  { top: "70%", left: "68%", delay: "2.7s" },
  { top: "42%", left: "22%", delay: "3.6s" },
];

function SharkRadar() {
  return (
    <div className="bg-[#02160c] p-4 text-center font-terminal text-[16px] text-[#4bf08a]">
      <div className="relative mx-auto aspect-square w-56 rounded-full border-2 border-[#0f7a3d] bg-[radial-gradient(circle,#063d21_0%,#02160c_75%)]">
        {/* rings */}
        <span className="absolute inset-[18%] rounded-full border border-[#0f7a3d]/60" />
        <span className="absolute inset-[36%] rounded-full border border-[#0f7a3d]/60" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#0f7a3d]/50" />
        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[#0f7a3d]/50" />
        {/* sweep */}
        <span
          className="radar-sweep absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(75,240,138,0.45) 0deg, transparent 55deg)",
            animation: "radar-sweep 4s linear infinite",
          }}
        />
        {/* blips */}
        {RADAR_BLIPS.map((blip, index) => (
          <span
            key={index}
            className="absolute h-2 w-2 rounded-full bg-[#e8ff6a] shadow-[0_0_8px_2px_#e8ff6a]"
            style={{
              top: blip.top,
              left: blip.left,
              animation: `blip-fade 4s linear ${blip.delay} infinite`,
            }}
          />
        ))}
      </div>
      <p className="mt-3">CONTACTS: {RADAR_BLIPS.length} &nbsp;|&nbsp; RANGE: 3 NM</p>
      <p className="text-[#2ea15c]">
        Advisory: all contacts fictional. Swim responsibly.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Dino Fossil Bin
 * ------------------------------------------------------------------ */
const FOSSILS = [
  { file: "raptor_v1.bak", joke: "Why don't dinosaurs talk? Because they're all dead. (Deleted for being too dark.)" },
  { file: "trex_arms.psd", joke: "A T-Rex's least favorite exercise? Push-ups." },
  { file: "meteor_notes.txt", joke: "The dinosaurs didn't file their taxes. Look what happened to them." },
  { file: "bronto_pun.docx", joke: "I was going to tell a fossil joke, but it's a little old." },
  { file: "stego_plates.svg", joke: "What do you call a dino that crashes its code? A Try-try-try-ceratops." },
  { file: "amber_backup.zip", joke: "Dino-mite work recovering this one." },
];

function DinoBin() {
  const [excavated, setExcavated] = useState<string | null>(null);
  return (
    <div className="p-4 font-sans text-[12px]">
      <p className="mb-3 text-[#3a3a3a]">
        Deleted files, fossilized. Click one to excavate.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {FOSSILS.map((fossil) => (
          <button
            key={fossil.file}
            type="button"
            className="bevel-sunken flex flex-col items-center gap-1 bg-[#efe7d2] p-2 text-center"
            onClick={() => setExcavated(fossil.joke)}
          >
            <span className="text-2xl" aria-hidden>
              🦴
            </span>
            <span className="font-mono text-[9px] leading-tight break-all">
              {fossil.file}
            </span>
          </button>
        ))}
      </div>
      <div className="rpg-frame mt-4">
        <p className="rpg-frame__inner font-terminal text-[16px]">
          {excavated ?? "> awaiting excavation..."}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Dispatcher
 * ------------------------------------------------------------------ */
const WIDGETS: Record<EasterEggType, () => React.ReactElement> = {
  "shark-radar": SharkRadar,
  "dino-bin": DinoBin,
};

export function EasterEggContent({ egg }: { egg: EasterEggModal }) {
  const Widget = WIDGETS[egg.easterEggType];
  return (
    <div>
      <p className="border-b-2 border-[#b8b49a] bg-[var(--color-xp-face)] p-3 font-sans text-[12px] text-[#3a3a3a]">
        {egg.description}
      </p>
      <Widget />
    </div>
  );
}
