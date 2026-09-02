"use client";

import { ExternalLink, Code2, Swords } from "lucide-react";
import { useMemo, useState } from "react";

import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/portfolio";

const CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Full-Stack & Agentic",
  "Machine Learning",
  "Personalized ML",
  "Quantum Computing",
];

function QuestCard({ project }: { project: Project }) {
  const Icon = project.icon;
  return (
    <article className="bevel-raised pixel-shadow bg-[#f7f7f0] p-3">
      <header className="flex items-start gap-3">
        <span className="quest-rank text-[11px]" title={`Rank ${project.questRank}`}>
          {project.questRank}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-pixel text-[11px] leading-snug text-[var(--color-rpg-sapphire)]">
            {project.title}
          </h3>
          <p className="mt-1 font-terminal text-[15px] leading-tight text-[#4a4a4a]">
            {project.tagline}
          </p>
        </div>
        <Icon
          className="pixelated h-6 w-6 shrink-0 text-[var(--color-rpg-crimson)]"
          aria-hidden
        />
      </header>

      <p className="font-pixel mt-3 text-[8px] text-[#7a6a20]">
        &gt; {project.category}
      </p>

      {/* Architecture "battle log" */}
      <ul className="mt-2 space-y-1.5 border-l-2 border-[var(--color-rpg-gold)] pl-3 text-[12px] leading-relaxed text-[#2b2118]">
        {project.architectureSummary.map((line) => (
          <li key={line} className="relative">
            <span
              className="absolute -left-[15px] top-1.5 h-1.5 w-1.5 bg-[var(--color-rpg-crimson)]"
              aria-hidden
            />
            {line}
          </li>
        ))}
      </ul>

      {/* Tech stack */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span key={tech} className="tech-badge">
            {tech}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          className="xp-button inline-flex items-center gap-1.5 no-underline"
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Code2 className="h-3.5 w-3.5" aria-hidden />
          Source
        </a>
        {project.liveDemoUrl ? (
          <a
            className="xp-button xp-button--primary inline-flex items-center gap-1.5 no-underline"
            href={project.liveDemoUrl}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            Live Demo
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function QuestLog() {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [active],
  );

  return (
    <div className="font-sans">
      <div className="sticky top-0 z-10 border-b-2 border-[#b8b49a] bg-[var(--color-xp-face)] p-3">
        <h2 className="font-pixel mb-2 flex items-center gap-2 text-[11px] text-[var(--color-rpg-crimson)]">
          <Swords className="h-4 w-4" aria-hidden />
          QUEST LOG
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className="rpg-button"
              data-active={active === category}
              onClick={() => setActive(category)}
            >
              {category === "All" ? "ALL QUESTS" : category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 p-3 sm:grid-cols-2">
        {visible.map((project) => (
          <QuestCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
