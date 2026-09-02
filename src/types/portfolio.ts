import type { LucideIcon } from "lucide-react";

/**
 * Domain types for the "Retro Windows XP x 16-Bit Pixel RPG" portfolio.
 *
 * Every icon field is a `lucide-react` component so data files stay declarative
 * and rendering components just do `<project.icon />`.
 */

export type ProjectCategory =
  | "Full-Stack & Agentic"
  | "Machine Learning"
  | "Personalized ML"
  | "Quantum Computing";

/** RPG-style difficulty badge shown on each quest (project) card. */
export type QuestRank = "S" | "A" | "B" | "C";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  questRank: QuestRank;
  tagline: string;
  /** Bullet list of architecture highlights, rendered as a "battle log". */
  architectureSummary: string[];
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  icon: LucideIcon;
}

export interface Experience {
  id: string;
  roleTitle: string;
  organization: string;
  timeline: string;
  location: string;
  /** Flavor name for the location node on the Overworld Map. */
  mapLocationName: string;
  impactBullets: string[];
  technologiesUsed: string[];
}

/** Collectible-item rarity used to tint skill "loot" in the inventory bag. */
export type SkillLevel =
  | "Novice"
  | "Apprentice"
  | "Journeyman"
  | "Expert"
  | "Master";

export interface SkillItem {
  name: string;
  level: SkillLevel;
  icon: LucideIcon;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

/** Discriminates which mini-widget renders inside an easter-egg window. */
export type EasterEggType = "shark-radar" | "dino-bin";

export interface EasterEggModal {
  id: string;
  desktopIconName: string;
  windowTitle: string;
  icon: LucideIcon;
  description: string;
  easterEggType: EasterEggType;
}

export interface ProfileMetadata {
  name: string;
  title: string;
  statusBadge: string;
  bioSummary: string;
  location: string;
  resumePdfUrl: string;
  /** Short MSN-style away message shown in the taskbar ticker. */
  statusMessage: string;
  socials: {
    email: string;
    github: string;
    linkedin: string;
  };
}
