import { CalendarClock, Database, Gamepad2, LockKeyhole } from "lucide-react";

import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    id: "safe-box-system",
    title: "Safe Box System",
    category: "Embedded Systems",
    questRank: "S",
    tagline:
      "An automated, secure digital safe controlled wirelessly via Bluetooth from a mobile app.",
    architectureSummary: [
      "Dual-motor actuation: one motor drives a mechanical shelf-retrieval drawer while the second actuates the locking bolt.",
      "Password-authenticated Bluetooth handshake protocol to prevent unauthorized access.",
      "Modular C firmware on Arduino managing real-time motor limits and state transitions.",
    ],
    techStack: ["C", "Arduino", "Bluetooth HC-05/06", "Dual Motor Actuators", "Mobile Interface"],
    icon: LockKeyhole,
  },
  {
    id: "automated-scheduling-engine",
    title: "Automated Scheduling & Document Processing Engine",
    category: "Automation",
    questRank: "A",
    tagline:
      "Streamlined high-volume clinical front-desk operations at Estrella Medical Center through custom process automation.",
    architectureSummary: [
      "Automated patient appointment verification pipelines, improving confirmation efficiency by 50%.",
      "Automated intake and document routing workflows that reduced client wait times by 75%.",
      "Replaced manual paper logging with structured digital tracking systems.",
    ],
    techStack: ["Python", "Scripting", "Office Automation Workflows"],
    icon: CalendarClock,
  },
  {
    id: "student-database-system",
    title: "Student Database Management System",
    category: "Software Engineering",
    questRank: "B",
    tagline:
      "A terminal-based record system for structured academic profiles and performance tracking.",
    architectureSummary: [
      "Dynamic profile structures tracking student demographics, course enrollments, test scores, and GPA metrics.",
      "Full CRUD operations with input validation and search indexing for rapid record retrieval.",
      "Console menu architecture with clean separation of data processing and display logic.",
    ],
    techStack: ["C++", "File I/O", "Data Structures"],
    icon: Database,
  },
  {
    id: "rpg-developer-portfolio",
    title: "Interactive RPG Developer Portfolio (\"Projects.exe\")",
    category: "Web & Design",
    questRank: "A",
    tagline:
      "A Stardew Valley-inspired, gamified developer portfolio with an interactive quest log and inventory system.",
    architectureSummary: [
      "Handcrafted custom 16-bit pixel art avatars, badges, and dialogue banners.",
      "Project showcases structured as completed \"quests\" and skills as an RPG \"inventory\" for an engaging visitor experience.",
    ],
    techStack: ["Front-End Web Development", "Pixel Art", "UI Design"],
    icon: Gamepad2,
  },
];
