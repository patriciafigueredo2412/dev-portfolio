"use client";

import { useCallback, useRef, useState } from "react";

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
 * Guitar Chord Player (Web Audio API)
 * ------------------------------------------------------------------ */
const CHORDS: { name: string; freqs: number[] }[] = [
  { name: "Em", freqs: [164.81, 196.0, 246.94, 329.63] },
  { name: "G", freqs: [196.0, 246.94, 293.66, 392.0] },
  { name: "D", freqs: [146.83, 220.0, 293.66, 369.99] },
  { name: "C", freqs: [130.81, 196.0, 261.63, 329.63] },
  { name: "Am", freqs: [220.0, 261.63, 329.63, 440.0] },
];

function GuitarPlayer() {
  const audioRef = useRef<AudioContext | null>(null);
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);

  const strum = useCallback((chord: (typeof CHORDS)[number]) => {
    if (typeof window === "undefined") return;
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioContextCtor) return;

    const ctx = audioRef.current ?? new AudioContextCtor();
    audioRef.current = ctx;
    if (ctx.state === "suspended") void ctx.resume();

    const now = ctx.currentTime;
    chord.freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const start = now + index * 0.045;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.22, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 1.7);
    });
    setLastPlayed(chord.name);
  }, []);

  return (
    <div className="bg-[#241a12] p-4 text-center font-sans">
      <p className="font-terminal mb-3 text-[16px] text-[#e8b23a]">
        {lastPlayed ? `♪ now ringing: ${lastPlayed}` : "pick a chord — audio starts on click"}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {CHORDS.map((chord) => (
          <button
            key={chord.name}
            type="button"
            className="rpg-button"
            onClick={() => strum(chord)}
          >
            {chord.name}
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-1" aria-hidden>
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index} className="h-24 w-px bg-[#6b5a3c]" />
        ))}
      </div>
      <p className="mt-2 font-mono text-[10px] text-[#8a7a5c]">
        Progression I keep coming back to: Em – C – G – D
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Climbing Beta Log
 * ------------------------------------------------------------------ */
const BETA_LOG = [
  { date: "2026-08-19", route: "The Prow", grade: "V5", note: "Sent! Heel hook on the arête was the unlock." },
  { date: "2026-08-12", route: "Slab Church", grade: "V4", note: "Feet, faith, and friction. No hands allowed past the crimp." },
  { date: "2026-07-30", route: "Café Mocha", grade: "V6", note: "Project. Still spitting me off the dyno to the sloper." },
  { date: "2026-07-15", route: "Tendon Roll", grade: "V3", note: "Flash. Good warm-up, mean name." },
];

function ClimbingLog() {
  return (
    <div className="bg-[#0f130f] p-4 font-terminal text-[16px] text-[#8ef0c8]">
      <p className="text-[#4a8a6a]">/var/log/climbing/beta.log — tail -f</p>
      <ul className="mt-2 space-y-2">
        {BETA_LOG.map((entry) => (
          <li key={entry.route} className="border-l-2 border-[#2f7d4f] pl-2">
            <span className="text-[#4a8a6a]">[{entry.date}]</span>{" "}
            <span className="text-[#e8ff6a]">{entry.grade}</span> · {entry.route}
            <br />
            <span className="text-[#7cc9a8]">↳ {entry.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Dispatcher
 * ------------------------------------------------------------------ */
const WIDGETS: Record<EasterEggType, () => React.ReactElement> = {
  "shark-radar": SharkRadar,
  "dino-bin": DinoBin,
  "guitar-player": GuitarPlayer,
  "climbing-log": ClimbingLog,
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
