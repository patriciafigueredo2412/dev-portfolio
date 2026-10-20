"use client";

import { useState } from "react";

import { Sprite } from "@/components/Sprite";

const LINES = [
  "Welcome! Explore my pixel portfolio!",
  "Double-click a desktop icon to open a window.",
  "The Skills Inventory holds every tool I've mastered.",
  "Poke the dino and the shark fin — they do things.",
  "Grab my resume from the About Me window. Safe travels!",
];

export function DialogueBox() {
  const [index, setIndex] = useState(0);
  const advance = () => setIndex((i) => (i + 1) % LINES.length);

  return (
    <div className="pointer-events-auto fixed bottom-14 right-4 z-[1] w-[320px] max-w-[calc(100vw-2rem)]">
      <div className="rpg-frame">
        <div className="rpg-frame__inner flex items-start gap-3">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded border-2 border-[var(--color-quest-ink)] bg-[#cfe3f7]">
            <Sprite name="avatar" className="h-full w-full object-contain" />
          </span>
          <div className="min-h-[3.5rem] flex-1">
            <p className="font-terminal text-[18px] leading-tight text-[var(--color-quest-ink)]">
              &quot;{LINES[index]}&quot;
            </p>
          </div>
          <button
            type="button"
            aria-label="Next line"
            onClick={advance}
            className="mt-auto shrink-0"
          >
            <span className="block h-0 w-0 animate-bounce border-x-[7px] border-t-[10px] border-x-transparent border-t-[var(--color-rpg-crimson)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
