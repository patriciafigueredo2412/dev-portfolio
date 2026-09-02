"use client";

import { type ReactNode, useState } from "react";

import { PIXEL_ICONS, PixelDino, PixelSharkFin } from "@/components/PixelIcons";
import { desktopIcons } from "@/data/desktopIcons";
import type { WindowId } from "@/types/desktop";

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
      <ul className="absolute left-2 top-3 grid w-[92px] auto-rows-min gap-3">
        {desktopIcons.map((icon) => {
          const PixelIcon = PIXEL_ICONS[icon.id];
          const isSelected = selected === icon.id;
          return (
            <li key={icon.id}>
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
                  <PixelIcon className="h-11 w-11" />
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
        title="Recycle Bin — Fossils"
        className="terrain-critter absolute bottom-[13%] left-[46%] w-20"
        onClick={() => onOpen("dino-bin")}
      >
        <PixelDino className="h-full w-full" />
      </button>
      <button
        type="button"
        aria-label="Investigate the shark fin"
        title="Shark Radar.exe"
        className="terrain-critter absolute bottom-[7%] right-[27%] w-[88px]"
        onClick={() => onOpen("shark-radar")}
      >
        <PixelSharkFin className="h-full w-full" />
      </button>

      {/* Window layer */}
      {children}
    </main>
  );
}
