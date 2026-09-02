"use client";

import { Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

import { desktopIcons, windowTitles } from "@/data/desktopIcons";
import { profile } from "@/data/profile";
import type { WindowId, WindowInstance } from "@/types/desktop";

interface TaskbarProps {
  order: WindowId[];
  windows: Record<WindowId, WindowInstance>;
  focusedId: WindowId | null;
  onTabClick: (id: WindowId) => void;
  onStartItemClick: (id: WindowId) => void;
}

const iconById = new Map(desktopIcons.map((icon) => [icon.id, icon]));

function Clock() {
  // Lazy init keeps SSR/CSR markup identical enough; `suppressHydrationWarning`
  // covers the second-level drift, and the interval only updates from its callback.
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <time
      suppressHydrationWarning
      className="font-sans text-[11px] text-white tabular-nums"
    >
      {now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
    </time>
  );
}

export function Taskbar({
  order,
  windows,
  focusedId,
  onTabClick,
  onStartItemClick,
}: TaskbarProps) {
  const [startOpen, setStartOpen] = useState(false);

  // Close the Start menu on outside click / Escape.
  useEffect(() => {
    if (!startOpen) return;
    const close = () => setStartOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStartOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [startOpen]);

  return (
    <footer className="xp-taskbar fixed inset-x-0 bottom-0 z-[9999] flex h-10 items-stretch gap-1 pr-1">
      {/* Start button */}
      <div className="relative">
        <button
          type="button"
          className="xp-start-button flex h-full items-center gap-1.5 pl-2 pr-4"
          data-open={startOpen}
          onClick={(event) => {
            event.stopPropagation();
            setStartOpen((open) => !open);
          }}
        >
          <span
            className="grid h-4 w-4 shrink-0 grid-cols-2 grid-rows-2 gap-px rounded-[2px] bg-white/90 p-px"
            aria-hidden
          >
            <span className="bg-[#e8402a]" />
            <span className="bg-[#4aa32e]" />
            <span className="bg-[#3f8cf3]" />
            <span className="bg-[#f2c024]" />
          </span>
          start
        </button>

        {startOpen ? (
          <div
            className="bevel-raised absolute bottom-11 left-0 w-60 bg-[var(--color-xp-face)] p-1 pixel-shadow-lg"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <div className="xp-titlebar mb-1 px-3 py-2 font-pixel text-[10px]">
              {profile.name}
            </div>
            <ul>
              {desktopIcons.map((icon) => {
                const Icon = icon.icon;
                return (
                  <li key={icon.id}>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] font-sans hover:bg-[var(--color-xp-selection)] hover:text-white"
                      onClick={() => {
                        setStartOpen(false);
                        onStartItemClick(icon.id);
                      }}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      {icon.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      {/* Active window tabs */}
      <ul className="flex flex-1 items-center gap-1 overflow-x-auto py-1 no-scrollbar">
        {order.map((id) => {
          const icon = iconById.get(id);
          const Icon = icon?.icon;
          const win = windows[id];
          const active = focusedId === id && !win.isMinimized;
          return (
            <li key={id}>
              <button
                type="button"
                className="xp-tasktab flex h-8 max-w-[160px] items-center gap-1.5 px-2 text-[11px] font-sans"
                data-active={active}
                onClick={() => onTabClick(id)}
              >
                {Icon ? <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden /> : null}
                <span className="truncate">{windowTitles[id]}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* MSN-style status ticker */}
      <div className="hidden max-w-[240px] items-center overflow-hidden border-x border-white/20 px-2 md:flex">
        <div className="relative w-full overflow-hidden">
          <div
            className="ticker-track flex whitespace-nowrap font-terminal text-[15px] text-[#d7e6ff]"
            style={{ animation: "ticker-scroll 22s linear infinite" }}
          >
            <span className="pr-12">{profile.statusMessage}</span>
            <span className="pr-12" aria-hidden>
              {profile.statusMessage}
            </span>
          </div>
        </div>
      </div>

      {/* System tray */}
      <div className="xp-tray flex items-center gap-2 px-3">
        <Volume2 className="h-4 w-4 text-white" aria-hidden />
        <Clock />
      </div>
    </footer>
  );
}
