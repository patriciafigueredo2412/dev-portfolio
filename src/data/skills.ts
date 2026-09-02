import {
  Atom,
  Braces,
  Cloud,
  Coffee,
  Container,
  Database,
  FileJson,
  Flame,
  GitBranch,
  Hash,
  Hexagon,
  MessageSquareCode,
  Network,
  Sigma,
  Table,
  Terminal,
  Triangle,
  Webhook,
  Wind,
  Zap,
} from "lucide-react";

import type { SkillCategory } from "@/types/portfolio";

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      { name: "Python", level: "Master", icon: FileJson },
      { name: "TypeScript", level: "Expert", icon: Braces },
      { name: "JavaScript", level: "Expert", icon: Braces },
      { name: "C#", level: "Journeyman", icon: Hash },
      { name: "SQL", level: "Expert", icon: Database },
      { name: "Java", level: "Apprentice", icon: Coffee },
    ],
  },
  {
    category: "Frameworks & Web",
    items: [
      { name: "React", level: "Expert", icon: Atom },
      { name: "Next.js", level: "Expert", icon: Triangle },
      { name: "Node.js", level: "Journeyman", icon: Hexagon },
      { name: "FastAPI", level: "Expert", icon: Zap },
      { name: "Tailwind CSS", level: "Expert", icon: Wind },
      { name: "REST & SSE APIs", level: "Journeyman", icon: Webhook },
    ],
  },
  {
    category: "AI/ML & Specialized",
    items: [
      { name: "PyTorch", level: "Journeyman", icon: Flame },
      { name: "scikit-learn", level: "Expert", icon: Sigma },
      { name: "Multi-Agent Orchestration", level: "Journeyman", icon: Network },
      { name: "LLM Prompt Engineering", level: "Expert", icon: MessageSquareCode },
      { name: "NumPy / Pandas", level: "Expert", icon: Table },
      { name: "Qiskit", level: "Apprentice", icon: Atom },
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git", level: "Expert", icon: GitBranch },
      { name: "Docker", level: "Journeyman", icon: Container },
      { name: "Linux / Shell", level: "Journeyman", icon: Terminal },
      { name: "PostgreSQL", level: "Journeyman", icon: Database },
      { name: "CI/CD Pipelines", level: "Apprentice", icon: Webhook },
      { name: "Azure", level: "Apprentice", icon: Cloud },
    ],
  },
];
