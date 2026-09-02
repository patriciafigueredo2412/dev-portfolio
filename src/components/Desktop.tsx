"use client";

import { type ReactNode, useState } from "react";

import { desktopIcons } from "@/data/desktopIcons";
import type { WindowId } from "@/types/desktop";

interface DesktopProps {
  /** Called when a shortcut is activated (double-click / Enter). */
  onOpen: (id: WindowId) => void;
  /** The window layer — rendered above the wallpaper, below the taskbar. */
  children: ReactNode;
}

export function Desktop({ onOpen, children }: DesktopProps) {
  const [selected, setSelected] = useState<WindowId | null>(null);

  return (
    <main
      className="scanlines relative h-full w-full overflow-hidden"
      onPointerDown={(event) => {
        // Clicking empty desktop clears icon selection.
        if (event.target === event.currentTarget) setSelected(null);
      }}
    >
      {/* Desktop shortcut icons */}
      <ul className="absolute left-3 top-3 grid w-[76px] auto-rows-min gap-3">
        {desktopIcons.map((icon) => {
          const Icon = icon.icon;
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
                <span className="desktop-icon-art grid h-10 w-10 place-items-center rounded-sm p-1">
                  <Icon
                    className="pixelated h-8 w-8 text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,0.8)]"
                    aria-hidden
                  />
                </span>
                <span className="desktop-icon-label rounded-sm px-1 py-px">
                  {icon.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Window layer */}
      {children}
    </main>
  );
}
