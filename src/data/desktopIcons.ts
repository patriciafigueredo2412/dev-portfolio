import type { LucideIcon } from "lucide-react";
import {
  Backpack,
  Fish,
  Mailbox,
  MapIcon,
  ScrollText,
  Trash2,
  UserSquare,
} from "lucide-react";

import type { DesktopIcon, WindowId } from "@/types/desktop";

/**
 * The four desktop shortcuts down the left edge, matching the mockup:
 * Treasure Chest → Projects, Parchment → Resume, Mailbox → Contact,
 * Trainer sprite → About Me, Backpack → Skills. (The dino + shark easter
 * eggs live on the terrain.)
 */
export const desktopIcons: DesktopIcon[] = [
  { id: "quest-log", label: "My Projects", icon: ScrollText, group: "app" },
  { id: "overworld-map", label: "Resume", icon: MapIcon, group: "app" },
  { id: "contact", label: "Contact", icon: Mailbox, group: "app" },
  { id: "trainer-card", label: "About Me", icon: UserSquare, group: "app" },
  { id: "item-inventory", label: "Skills", icon: Backpack, group: "app" },
];

/** Small monochrome icon per window — used in title bars, taskbar tabs, Start menu. */
export const windowIcons: Record<WindowId, LucideIcon> = {
  "trainer-card": UserSquare,
  "quest-log": ScrollText,
  "overworld-map": MapIcon,
  "item-inventory": Backpack,
  contact: Mailbox,
  "shark-radar": Fish,
  "dino-bin": Trash2,
};

/** Human-readable window titles, reused by the taskbar tabs and window headers. */
export const windowTitles: Record<WindowId, string> = {
  "trainer-card": "DEVELOPER PORTFOLIO - v1.0",
  "quest-log": "My Projects — Quest Log",
  "overworld-map": "Resume — Overworld Map",
  "item-inventory": "SKILLS INVENTORY",
  contact: "Contact — Send a Raven",
  "shark-radar": "Shark Radar.exe",
  "dino-bin": "Recycle Bin — Fossils",
};
