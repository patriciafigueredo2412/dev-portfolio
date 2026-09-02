import {
  Atom,
  Blocks,
  Braces,
  Container,
  Database,
  FileCode,
  Flame,
  GitBranch,
  Hash,
  Hexagon,
  Network,
  Palette,
  Sigma,
  Terminal,
  Wind,
  Zap,
} from "lucide-react";

import type { SkillCategory } from "@/types/portfolio";

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      { name: "HTML", level: "Master", icon: FileCode },
      { name: "CSS", level: "Master", icon: Palette },
      { name: "JavaScript", level: "Master", icon: Braces },
      { name: "TypeScript", level: "Expert", icon: Braces },
      { name: "React", level: "Master", icon: Atom },
      { name: "Tailwind CSS", level: "Expert", icon: Wind },
    ],
  },
  {
    category: "Backend & Languages",
    items: [
      { name: "Python", level: "Master", icon: FileCode },
      { name: "Node.js", level: "Journeyman", icon: Hexagon },
      { name: "FastAPI", level: "Expert", icon: Zap },
      { name: "SQL", level: "Expert", icon: Database },
      { name: "C#", level: "Journeyman", icon: Hash },
    ],
  },
  {
    category: "AI / ML",
    items: [
      { name: "PyTorch", level: "Journeyman", icon: Flame },
      { name: "scikit-learn", level: "Expert", icon: Sigma },
      { name: "Multi-Agent Systems", level: "Journeyman", icon: Network },
      { name: "Qiskit", level: "Apprentice", icon: Atom },
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git", level: "Master", icon: GitBranch },
      { name: "Docker", level: "Journeyman", icon: Container },
      { name: "Linux / Shell", level: "Journeyman", icon: Terminal },
      { name: "PostgreSQL", level: "Journeyman", icon: Database },
      { name: "Next.js", level: "Expert", icon: Blocks },
    ],
  },
];
