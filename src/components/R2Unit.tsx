"use client";

import { useEffect, useRef, useState } from "react";

import { Sprite } from "@/components/Sprite";

const CHATTER = [
  "Beep boop! Bwee-oop!",
  "Bweeep... boop boop beep!",
  "Bee-dee-boop! (He likes your style.)",
  "Wheee-oo! Boop-bip-bip!",
  "Bzzt! Beep beep boop. (Translation: hire her.)",
  "Dweeep-dweeoo... boop?",
];

let audio: AudioContext | null = null;

/** A burst of R2-style chirps: short square/sine blips with pitch slides. */
function chirp() {
  audio ??= new AudioContext();
  const ctx = audio;
  void ctx.resume();
  let t = ctx.currentTime + 0.02;
  const blips = 5 + Math.floor(Math.random() * 4);
  for (let i = 0; i < blips; i++) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const length = 0.05 + Math.random() * 0.12;
    const from = 700 + Math.random() * 1800;
    const to = 700 + Math.random() * 1800;
    osc.type = Math.random() > 0.4 ? "sine" : "square";
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(to, t + length);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.06, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + length);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + length + 0.02);
    t += length + Math.random() * 0.05;
  }
}

/** Terrain easter egg: click the astromech droid and he chatters back. */
export function R2Unit({ className = "" }: { className?: string }) {
  const [line, setLine] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const talk = () => {
    setLine((prev) => {
      const options = CHATTER.filter((text) => text !== prev);
      return options[Math.floor(Math.random() * options.length)];
    });
    try {
      chirp();
    } catch {
      // Audio unavailable — the speech bubble still works.
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLine(null), 3200);
  };

  return (
    <button
      type="button"
      aria-label="Talk to the astromech droid"
      className={`terrain-critter group ${className}`}
      data-talking={line !== null}
      onClick={talk}
    >
      <span className="critter-bubble font-pixel" aria-live="polite">
        {line ?? "Bleep? *whirr*"}
      </span>
      <Sprite name="r2d2" className={`h-auto w-full ${line ? "r2-wobble" : ""}`} />
    </button>
  );
}
