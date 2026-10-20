import {
  Atom,
  Binary,
  Blocks,
  Bluetooth,
  Boxes,
  Braces,
  Bug,
  CalendarClock,
  CircuitBoard,
  Code,
  Coffee,
  Cog,
  Container,
  Cpu,
  Database,
  FileCode,
  FileStack,
  Flame,
  GitBranch,
  Hand,
  Hash,
  Hexagon,
  Languages,
  Laptop,
  ListTree,
  Network,
  Palette,
  Sigma,
  Table2,
  Terminal,
  Wind,
  Workflow,
  Zap,
} from "lucide-react";

import type { SkillCategory } from "@/types/portfolio";

export const skills: SkillCategory[] = [
  {
    category: "Programming Languages",
    items: [
      { name: "C", level: "Expert", icon: Code },
      { name: "C++", level: "Expert", icon: Code },
      { name: "Java", level: "Expert", icon: Coffee },
      { name: "Python", level: "Master", icon: FileCode },
      { name: "C#", level: "Journeyman", icon: Hash },
    ],
  },
  {
    category: "Embedded & Hardware",
    items: [
      { name: "Arduino", level: "Expert", icon: Cpu },
      { name: "Motor Drivers", level: "Journeyman", icon: Cog },
      { name: "Bluetooth Serial", level: "Journeyman", icon: Bluetooth },
      { name: "Digital Logic", level: "Journeyman", icon: CircuitBoard },
    ],
  },
  {
    category: "Software Engineering",
    items: [
      { name: "OOP Design", level: "Expert", icon: Boxes },
      { name: "Debugging", level: "Expert", icon: Bug },
      { name: "Algorithms", level: "Expert", icon: Binary },
      { name: "Data Structures", level: "Expert", icon: ListTree },
      { name: "Git / GitHub", level: "Master", icon: GitBranch },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "HTML", level: "Master", icon: FileCode },
      { name: "CSS", level: "Master", icon: Palette },
      { name: "JavaScript", level: "Master", icon: Braces },
      { name: "TypeScript", level: "Expert", icon: Braces },
      { name: "React", level: "Master", icon: Atom },
      { name: "Tailwind CSS", level: "Expert", icon: Wind },
      { name: "Next.js", level: "Expert", icon: Blocks },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: "Journeyman", icon: Hexagon },
      { name: "FastAPI", level: "Expert", icon: Zap },
      { name: "SQL", level: "Expert", icon: Database },
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
    category: "Databases & Tools",
    items: [
      { name: "Relational Modeling", level: "Journeyman", icon: Table2 },
      { name: "PostgreSQL", level: "Journeyman", icon: Database },
      { name: "JetBrains IDEs", level: "Expert", icon: Laptop },
      { name: "VS Code", level: "Expert", icon: Laptop },
      { name: "Linux / Unix CLI", level: "Journeyman", icon: Terminal },
      { name: "Docker", level: "Journeyman", icon: Container },
    ],
  },
  {
    category: "Workflow & Automation",
    items: [
      { name: "Process Optimization", level: "Expert", icon: Workflow },
      { name: "Automated Scheduling", level: "Expert", icon: CalendarClock },
      { name: "Document Processing", level: "Expert", icon: FileStack },
    ],
  },
  {
    category: "Spoken & Signed Languages",
    items: [
      { name: "Spanish", level: "Master", icon: Languages },
      { name: "English", level: "Master", icon: Languages },
      { name: "ASL", level: "Journeyman", icon: Hand },
    ],
  },
];
