"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Desktop } from "@/components/Desktop";
import { EasterEggContent } from "@/components/EasterEggModals";
import { ItemInventory } from "@/components/ItemInventory";
import { OverworldMap } from "@/components/OverworldMap";
import { QuestLog } from "@/components/QuestLog";
import { Taskbar } from "@/components/Taskbar";
import { TrainerCard } from "@/components/TrainerCard";
import { WindowModal } from "@/components/WindowModal";
import { useWindowManager } from "@/components/useWindowManager";
import { desktopIcons, windowTitles } from "@/data/desktopIcons";
import { easterEggs } from "@/data/easterEggs";
import type { WindowId } from "@/types/desktop";

interface WindowConfig {
  id: WindowId;
  icon: LucideIcon;
  width: number;
  height: number;
  surface: "white" | "parchment";
  content: ReactNode;
}

const iconById = new Map(desktopIcons.map((icon) => [icon.id, icon.icon] as const));
const eggById = new Map(easterEggs.map((egg) => [egg.id, egg] as const));

const WINDOW_CONFIG: WindowConfig[] = [
  {
    id: "trainer-card",
    icon: iconById.get("trainer-card")!,
    width: 460,
    height: 620,
    surface: "white",
    content: <TrainerCard />,
  },
  {
    id: "quest-log",
    icon: iconById.get("quest-log")!,
    width: 740,
    height: 600,
    surface: "white",
    content: <QuestLog />,
  },
  {
    id: "overworld-map",
    icon: iconById.get("overworld-map")!,
    width: 620,
    height: 600,
    surface: "white",
    content: <OverworldMap />,
  },
  {
    id: "item-inventory",
    icon: iconById.get("item-inventory")!,
    width: 580,
    height: 600,
    surface: "white",
    content: <ItemInventory />,
  },
  ...easterEggs.map<WindowConfig>((egg) => ({
    id: egg.id as WindowId,
    icon: egg.icon,
    width: 440,
    height: 460,
    surface: "white",
    content: <EasterEggContent egg={eggById.get(egg.id)!} />,
  })),
];

export default function Home() {
  const wm = useWindowManager();

  return (
    <>
      <Desktop onOpen={wm.open}>
        {WINDOW_CONFIG.map((config) => {
          const state = wm.windows[config.id];
          if (!state.isOpen) return null;
          return (
            <WindowModal
              key={config.id}
              id={config.id}
              title={windowTitles[config.id]}
              icon={config.icon}
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
