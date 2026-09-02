"use client";

import { Minus, Square, X } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

import { ContactCard } from "@/components/ContactCard";
import { Desktop } from "@/components/Desktop";
import { DialogueBox } from "@/components/DialogueBox";
import { EasterEggContent } from "@/components/EasterEggModals";
import { ItemInventory } from "@/components/ItemInventory";
import { OverworldMap } from "@/components/OverworldMap";
import { QuestLog } from "@/components/QuestLog";
import { Taskbar } from "@/components/Taskbar";
import { TrainerCard } from "@/components/TrainerCard";
import { WindowModal } from "@/components/WindowModal";
import { useWindowManager } from "@/components/useWindowManager";
import { easterEggs } from "@/data/easterEggs";
import { windowIcons, windowTitles } from "@/data/desktopIcons";
import type { WindowId } from "@/types/desktop";

interface WindowConfig {
  id: WindowId;
  width: number;
  height: number;
  surface: "white" | "parchment";
  content: ReactNode;
}

const eggById = new Map(easterEggs.map((egg) => [egg.id, egg] as const));

const WINDOW_CONFIG: WindowConfig[] = [
  { id: "trainer-card", width: 500, height: 540, surface: "white", content: <TrainerCard /> },
  { id: "quest-log", width: 740, height: 560, surface: "white", content: <QuestLog /> },
  { id: "overworld-map", width: 620, height: 560, surface: "white", content: <OverworldMap /> },
  { id: "item-inventory", width: 540, height: 470, surface: "white", content: <ItemInventory /> },
  { id: "contact", width: 440, height: 540, surface: "parchment", content: <ContactCard /> },
  ...easterEggs.map<WindowConfig>((egg) => ({
    id: egg.id as WindowId,
    width: 440,
    height: 460,
    surface: "white" as const,
    content: <EasterEggContent egg={eggById.get(egg.id)!} />,
  })),
];

const configById = new Map(WINDOW_CONFIG.map((entry) => [entry.id, entry] as const));

export default function Home() {
  const wm = useWindowManager();
  const didAutoOpen = useRef(false);

  useEffect(() => {
    if (didAutoOpen.current) return;
    didAutoOpen.current = true;

    const left = configById.get("trainer-card")!;
    const right = configById.get("item-inventory")!;
    const gap = 40;
    const totalW = left.width + right.width + gap;
    const startX = Math.max(16, Math.round((window.innerWidth - totalW) / 2));
    // Sit the pair near the top so the hills, dino and pond stay visible below.
    const topY = 48;

    wm.setPosition("trainer-card", { x: startX, y: topY });
    wm.setPosition("item-inventory", { x: startX + left.width + gap, y: topY });
    // Open right first so the left window ends up focused / on top.
    wm.open("item-inventory");
    wm.open("trainer-card");
  }, [wm]);

  return (
    <>
      {/* Full-screen outer XP window chrome */}
      <div className="xp-titlebar fixed inset-x-0 top-0 z-[9998] flex h-[34px] items-center gap-2 px-3">
        <span className="grid h-4 w-4 place-items-center bg-white/90 text-[9px] text-[#1c50c8]" aria-hidden>
          ▧
        </span>
        <span className="font-pixel truncate text-[11px]">
          PIXEL DEVELOPER PORTFOLIO — WELCOME ADVENTURER!
        </span>
        <div className="ml-auto flex items-center gap-1">
          <span className="xp-control-btn" aria-hidden>
            <Minus className="h-3 w-3" />
          </span>
          <span className="xp-control-btn" aria-hidden>
            <Square className="h-3 w-3" />
          </span>
          <span className="xp-control-btn xp-control-btn--close" aria-hidden>
            <X className="h-3 w-3" />
          </span>
        </div>
      </div>

      <Desktop onOpen={wm.open}>
        {WINDOW_CONFIG.map((config) => {
          const state = wm.windows[config.id];
          if (!state.isOpen) return null;
          return (
            <WindowModal
              key={config.id}
              id={config.id}
              title={windowTitles[config.id]}
              icon={windowIcons[config.id]}
              width={config.width}
              height={config.height}
              surface={config.surface}
              isFocused={wm.focusedId === config.id}
              isMinimized={state.isMinimized}
              isMaximized={state.isMaximized}
              zIndex={state.zIndex}
              position={state.position}
              onFocus={() => wm.focus(config.id)}
              onClose={() => wm.close(config.id)}
              onMinimize={() => wm.toggleMinimize(config.id)}
              onMaximize={() => wm.toggleMaximize(config.id)}
              onDrag={(next) => wm.setPosition(config.id, next)}
            >
              {config.content}
            </WindowModal>
          );
        })}
      </Desktop>

      <DialogueBox />

      <Taskbar
        order={wm.order}
        windows={wm.windows}
        focusedId={wm.focusedId}
        onTabClick={wm.taskbarToggle}
        onStartItemClick={wm.open}
      />
    </>
  );
}
