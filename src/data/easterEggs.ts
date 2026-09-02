import { Bone, Radar } from "lucide-react";

import type { EasterEggModal } from "@/types/portfolio";

export const easterEggs: EasterEggModal[] = [
  {
    id: "shark-radar",
    desktopIconName: "Shark Radar",
    windowTitle: "Shark Radar.exe",
    icon: Radar,
    description:
      "A sweeping sonar dish that pings for great whites off the Florida coast. Blips are procedurally generated; no marine biologists were consulted.",
    easterEggType: "shark-radar",
  },
  {
    id: "dino-bin",
    desktopIconName: "Dino Fossil Bin",
    windowTitle: "Recycle Bin — Fossils",
    icon: Bone,
    description:
      "The Recycle Bin, but every deleted file fossilized. Click a fossil to excavate a very old dad joke.",
    easterEggType: "dino-bin",
  },
];
