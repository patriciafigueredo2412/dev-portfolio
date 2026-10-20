"use client";

import { type ReactNode, useState } from "react";

import { PIXEL_ICONS } from "@/components/PixelIcons";
import { R2Unit } from "@/components/R2Unit";
import { Sprite, type SpriteName } from "@/components/Sprite";
import { desktopIcons } from "@/data/desktopIcons";
import type { WindowId } from "@/types/desktop";

/** Shortcuts drawn with bitmap pixel icons; the rest use the SVG sprites. */
const SHORTCUT_SPRITES: Partial<Record<WindowId, SpriteName>> = {
  "quest-log": "chest",
  "overworld-map": "resume",
  "item-inventory": "backpack",
  "trainer-card": "avatar",
};

interface DesktopProps {
  /** Called when a shortcut or terrain critter is activated. */
  onOpen: (id: WindowId) => void;
  /** The window layer — rendered above the wallpaper, below the taskbar. */
  children: ReactNode;
}

export function Desktop({ onOpen, children }: DesktopProps) {
  const [selected, setSelected] = useState<WindowId | null>(null);

  return (
    <main
      className="scanlines absolute inset-x-0 bottom-0 top-[34px] overflow-hidden"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) setSelected(null);
      }}
    >
      {/* Desktop shortcut icons */}
      <ul className="absolute bottom-14 left-2 top-3 flex flex-col flex-wrap content-start gap-3">
        {desktopIcons.map((icon) => {
          const PixelIcon = PIXEL_ICONS[icon.id];
          const isSelected = selected === icon.id;
          return (
            <li key={icon.id} className="w-[92px]">
              <button
                type="button"
                className="desktop-icon group flex w-full flex-col items-center gap-1 rounded p-1 text-center outline-none"
                data-selected={isSelected}
                aria-label={`Open ${icon.label}`}
                onClick={() => setSelected(icon.id)}
                onDoubleClick={() => onOpen(icon.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpen(icon.id);
                  }
                }}
              >
                <span className="desktop-icon-art grid h-12 w-12 place-items-center rounded-sm p-0.5">
                  {SHORTCUT_SPRITES[icon.id] ? (
                    <Sprite name={SHORTCUT_SPRITES[icon.id]!} className="h-11 w-auto" />
                  ) : (
                    <PixelIcon className="h-11 w-11" />
                  )}
                </span>
                <span className="desktop-icon-label max-w-full rounded px-1.5 py-0.5">
                  {icon.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Terrain easter eggs */}
      <button
        type="button"
        aria-label="Poke the dinosaur"
        className="terrain-critter group absolute left-[max(9%,120px)] top-[27%] w-11"
        onClick={() => onOpen("dino-bin")}
      >
        <span className="critter-bubble critter-bubble--left font-pixel">RAWR! Dig up my fossils?</span>
        <Sprite name="dino" className="critter-idle h-auto w-full" />
      </button>
      <button
        type="button"
        aria-label="Investigate the shark fin"
        className="terrain-critter group absolute bottom-[6%] right-[26%] w-16"
        onClick={() => onOpen("shark-radar")}
      >
        <span className="critter-bubble font-pixel">Land shark spotted. Open radar?</span>
        <Sprite name="shark-fin" className="critter-bob h-auto w-full" />
      </button>

      <R2Unit className="absolute bottom-[13%] left-[22%] w-16" />

      {/* Window layer */}
      {children}
    </main>
  );
}
