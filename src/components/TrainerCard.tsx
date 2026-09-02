import { Contact, Download, Mail, MapPin, Code2, Sparkles } from "lucide-react";

import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { experience } from "@/data/experience";

/** Derived "stats" so the card feels like an RPG character sheet. */
const stats = [
  { label: "LVL", value: "SR. UNDERGRAD" },
  { label: "QUESTS", value: String(projects.length).padStart(2, "0") },
  { label: "PARTIES JOINED", value: String(experience.length).padStart(2, "0") },
  {
    label: "SKILLS",
    value: String(skills.reduce((sum, cat) => sum + cat.items.length, 0)).padStart(2, "0"),
  },
];

export function TrainerCard() {
  return (
    <div className="font-sans text-[13px]">
      {/* Banner */}
      <div className="xp-titlebar flex items-center gap-3 px-4 py-3">
        <div
          className="pixelated grid h-16 w-16 shrink-0 place-items-center border-2 border-white bg-[#1b2a52] text-3xl"
          aria-hidden
        >
          {/* Pixel avatar */}
          <span className="font-pixel text-[var(--color-rpg-gold)]">PF</span>
        </div>
        <div className="min-w-0">
          <h2 className="font-pixel text-[13px] leading-tight">{profile.name}</h2>
          <p className="mt-1 text-[12px] opacity-90">{profile.title}</p>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {/* Status badge */}
        <div className="rpg-frame">
          <div className="rpg-frame__inner flex items-center gap-2 font-terminal text-[16px]">
            <Sparkles className="h-4 w-4 text-[var(--color-rpg-gold)]" aria-hidden />
            <span>{profile.statusBadge}</span>
          </div>
        </div>

        {/* Stat grid */}
        <dl className="grid grid-cols-2 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="bevel-sunken bg-[#f7f7f0] px-3 py-2">
              <dt className="font-pixel text-[8px] text-[#5a5a5a]">{stat.label}</dt>
              <dd className="font-terminal text-[18px] leading-tight text-[var(--color-rpg-sapphire)]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Bio */}
        <section>
          <h3 className="font-pixel mb-2 text-[10px] text-[var(--color-rpg-crimson)]">
            &gt; BIO
          </h3>
          <p className="leading-relaxed text-[#2b2118]">{profile.bioSummary}</p>
        </section>

        {/* Location */}
        <p className="flex items-center gap-2 text-[#3a3a3a]">
          <MapPin className="h-4 w-4" aria-hidden />
          {profile.location}
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            className="xp-button xp-button--primary inline-flex items-center gap-2 no-underline"
            href={profile.resumePdfUrl}
            download
          >
            <Download className="h-4 w-4" aria-hidden />
            Download Resume
          </a>
          <a
            className="xp-button inline-flex items-center gap-2 no-underline"
            href={`mailto:${profile.socials.email}`}
          >
            <Mail className="h-4 w-4" aria-hidden />
            Email
          </a>
          <a
            className="xp-button inline-flex items-center gap-2 no-underline"
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <Code2 className="h-4 w-4" aria-hidden />
            GitHub
          </a>
          <a
            className="xp-button inline-flex items-center gap-2 no-underline"
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Contact className="h-4 w-4" aria-hidden />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
