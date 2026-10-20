"use client";

import { ExternalLink, Code2, Swords } from "lucide-react";
import { useMemo, useState } from "react";

import { projects } from "@/data/projects";
import type { Project, ProjectCategory, QuestRank } from "@/types/portfolio";

const CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Embedded Systems",
  "Software Engineering",
  "Automation",
  "Web & Design",
];

/** Flavor text for each rank: how hard the quest was and what it paid out. */
const RANK_META: Record<QuestRank, { difficulty: string; xp: number; meter: number }> = {
  S: { difficulty: "Legendary", xp: 250, meter: 100 },
  A: { difficulty: "Hard", xp: 180, meter: 75 },
  B: { difficulty: "Medium", xp: 120, meter: 50 },
  C: { difficulty: "Easy", xp: 60, meter: 25 },
};

function QuestCard({ project }: { project: Project }) {
  const Icon = project.icon;
  const rank = RANK_META[project.questRank];
  return (
    <article className="quest-card p-3">
      <header className="flex items-start gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded border-2 border-[var(--color-quest-ink)] bg-[#c9a35a] text-[var(--color-quest-ink)] shadow-[inset_2px_2px_0_0_#f1d48f]"
          aria-hidden
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-pixel text-[11px] leading-snug text-[var(--color-quest-ink)]">
            {project.title}
          </h3>
          <p className="mt-1 font-terminal text-[16px] leading-tight text-[#5a4a35]">
            {project.tagline}
          </p>
        </div>
        <span className="quest-rank text-[11px]" title={`Rank ${project.questRank}`}>
          {project.questRank}
        </span>
      </header>

      {/* Quest stats — the "Difficulty / XP Reward" rows from the quest log */}
      <dl className="font-terminal mt-3 grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 text-[17px] leading-none">
        <dt className="text-[#5a4a35]">Difficulty:</dt>
        <dd>{rank.difficulty}</dd>
        <dt className="text-[#5a4a35]">XP Reward:</dt>
        <dd>{rank.xp} XP</dd>
        <dt className="text-[#5a4a35]">Class:</dt>
        <dd>{project.category}</dd>
      </dl>
      <div className="xp-bar mt-2" aria-hidden>
        <div className="xp-bar__fill" style={{ width: `${rank.meter}%` }} />
        <span className="xp-bar__label">Rank {project.questRank}</span>
      </div>

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
      {project.githubUrl || project.liveDemoUrl ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.githubUrl ? (
            <a
              className="xp-button inline-flex items-center gap-1.5 no-underline"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              <Code2 className="h-3.5 w-3.5" aria-hidden />
              Source
            </a>
          ) : null}
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
      ) : null}
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
    <div className="font-sans p-3">
      <section className="xp-panel">
        <h2 className="xp-panel__header sticky top-0 z-10 flex items-center gap-2">
          <Swords className="h-4 w-4" aria-hidden />
          Quests (Current Projects)
          <span className="font-terminal ml-auto text-[15px]">
            {visible.length} active
          </span>
        </h2>
        <div className="flex flex-wrap gap-2 border-b-2 border-[#c8bf9f] p-3">
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

        <div className="grid gap-3 p-3 sm:grid-cols-2">
          {visible.map((project) => (
            <QuestCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
