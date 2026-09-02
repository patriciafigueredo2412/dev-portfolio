import { Bone, Guitar, Mountain, Radar } from "lucide-react";

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
  {
    id: "guitar-player",
    desktopIconName: "Guitar Chords",
    windowTitle: "Chord Player 2000",
    icon: Guitar,
    description:
      "A tiny fretboard that plays chord voicings with the Web Audio API. Strum with your keyboard's number row.",
    easterEggType: "guitar-player",
  },
  {
    id: "climbing-log",
    desktopIconName: "Climbing Beta Log",
    windowTitle: "Beta Log.txt",
    icon: Mountain,
    description:
      "A field notebook of bouldering projects, grades, and the exact move that keeps spitting me off.",
    easterEggType: "climbing-log",
  },
];
