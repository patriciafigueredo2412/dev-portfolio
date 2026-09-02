"use client";

import { Globe, Music2, ShieldCheck, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

import { desktopIcons, windowIcons, windowTitles } from "@/data/desktopIcons";
import { profile } from "@/data/profile";
import type { WindowId, WindowInstance } from "@/types/desktop";

interface TaskbarProps {
  order: WindowId[];
  windows: Record<WindowId, WindowInstance>;
  focusedId: WindowId | null;
  onTabClick: (id: WindowId) => void;
  onStartItemClick: (id: WindowId) => void;
}

function Clock() {
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
    <footer className="xp-taskbar fixed inset-x-0 bottom-0 z-[9999] flex h-10 items-stretch">
      {/* Start button */}
      <div className="relative">
        <button
          type="button"
          className="xp-start-button flex h-full items-center gap-2 pl-2 pr-5"
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
          START
        </button>

        {startOpen ? (
          <div
            className="bevel-raised pixel-shadow-lg absolute bottom-11 left-0 w-60 bg-[var(--color-xp-face)] p-1"
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
                      className="font-sans flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] hover:bg-[var(--color-xp-selection)] hover:text-white"
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

      {/* Quick launch */}
      <div className="flex items-center gap-2 border-r border-white/25 px-2">
        <Globe className="h-4 w-4 text-[#9fd0ff]" aria-hidden />
        <Music2 className="h-4 w-4 text-[#9fd0ff]" aria-hidden />
      </div>

      {/* Active window tabs */}
      <ul className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto px-2 py-1">
        {order.map((id) => {
          const Icon = windowIcons[id];
          const win = windows[id];
          const active = focusedId === id && !win.isMinimized;
          return (
            <li key={id}>
              <button
                type="button"
                className="xp-tasktab font-terminal flex h-8 max-w-[180px] items-center gap-1.5 px-2 text-[15px]"
                data-active={active}
                onClick={() => onTabClick(id)}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
                <span className="truncate">{windowTitles[id]}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* System tray */}
      <div className="xp-tray flex items-center gap-2 px-3">
        <ShieldCheck className="h-4 w-4 text-white" aria-hidden />
        <Globe className="h-4 w-4 text-white" aria-hidden />
        <Volume2 className="h-4 w-4 text-white" aria-hidden />
        <Clock />
      </div>
    </footer>
  );
}
