import { MapIcon, ScrollText, Swords, UserSquare } from "lucide-react";

import { easterEggs } from "@/data/easterEggs";
import type { DesktopIcon } from "@/types/desktop";

/** Primary "apps" — the four resume sections. */
const appIcons: DesktopIcon[] = [
  { id: "trainer-card", label: "Trainer Card", icon: UserSquare, group: "app" },
  { id: "quest-log", label: "Quest Log", icon: ScrollText, group: "app" },
  { id: "overworld-map", label: "Overworld Map", icon: MapIcon, group: "app" },
  { id: "item-inventory", label: "Item Bag", icon: Swords, group: "app" },
];

const easterEggIcons: DesktopIcon[] = easterEggs.map((egg) => ({
  id: egg.id as DesktopIcon["id"],
  label: egg.desktopIconName,
  icon: egg.icon,
  group: "easter-egg",
}));

export const desktopIcons: DesktopIcon[] = [...appIcons, ...easterEggIcons];

/** Human-readable window titles, reused by the taskbar tabs and window headers. */
export const windowTitles: Record<DesktopIcon["id"], string> = {
  "trainer-card": "Trainer Card",
  "quest-log": "Quest Log — Projects",
  "overworld-map": "Overworld Map — Experience",
  "item-inventory": "Item Bag — Skills",
  "shark-radar": "Shark Radar.exe",
  "dino-bin": "Recycle Bin — Fossils",
  "guitar-player": "Chord Player 2000",
  "climbing-log": "Beta Log.txt",
};
