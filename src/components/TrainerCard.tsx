import { MapPin } from "lucide-react";

import { Sprite } from "@/components/Sprite";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

/** A fake source file rendered as a syntax-highlighted terminal preview. */
const CODE_LINES: { indent?: number; parts: { t: string; c: string }[] }[] = [
  { parts: [{ t: "// Source_Code.cpp", c: "#6b7a8d" }] },
  {
    parts: [
      { t: "#include ", c: "#c678dd" },
      { t: "<portfolio>", c: "#98c379" },
    ],
  },
  { parts: [{ t: "", c: "" }] },
  {
    parts: [
      { t: "auto", c: "#c678dd" },
      { t: " dev ", c: "#e5e9f0" },
      { t: "=", c: "#56b6c2" },
      { t: " Engineer", c: "#e5c07b" },
      { t: "{", c: "#e5e9f0" },
    ],
  },
  {
    indent: 1,
    parts: [
      { t: ".stack ", c: "#e06c75" },
      { t: "=", c: "#56b6c2" },
      { t: " {", c: "#e5e9f0" },
      { t: '"C"', c: "#98c379" },
      { t: ", ", c: "#e5e9f0" },
      { t: '"C++"', c: "#98c379" },
      { t: ", ", c: "#e5e9f0" },
      { t: '"Java"', c: "#98c379" },
      { t: ", ", c: "#e5e9f0" },
      { t: '"Python"', c: "#98c379" },
      { t: "},", c: "#e5e9f0" },
    ],
  },
  {
    indent: 1,
    parts: [
      { t: ".focus ", c: "#e06c75" },
      { t: "= ", c: "#56b6c2" },
      { t: '"embedded + clean software"', c: "#98c379" },
      { t: ",", c: "#e5e9f0" },
    ],
  },
  {
    parts: [
      { t: "}", c: "#e5e9f0" },
      { t: ";", c: "#56b6c2" },
    ],
  },
  {
    parts: [
      { t: "dev.", c: "#e5e9f0" },
      { t: "shipIt", c: "#61afef" },
      { t: "();", c: "#e5e9f0" },
    ],
  },
];

export function TrainerCard() {
  return (
    <div className="font-sans min-h-full bg-[var(--color-quest-parchment)] text-[13px] leading-relaxed text-[#2b2118]">
      <div className="space-y-5 p-5">
        {/* Header: avatar + Main */}
        <header className="flex items-center gap-4">
          <Sprite
            name="portrait"
            alt={`Pixel portrait of ${profile.name}`}
            className="pixel-shadow h-28 w-28 shrink-0"
          />
          <div>
            <h2 className="font-pixel text-[18px] text-[#1b1b1b]">Main</h2>
            <p className="font-terminal text-[16px] text-[#4a4a4a]">
              {profile.name} — {profile.title}
            </p>
          </div>
        </header>

        {/* Bio */}
        <p>{profile.bioSummary}</p>
        <p className="flex items-center gap-2 text-[#3a3a3a]">
          <MapPin className="h-4 w-4" aria-hidden />
          {profile.location} &nbsp;·&nbsp; {profile.statusBadge}
        </p>

        {/* Projects Summary */}
        <section>
          <h3 className="font-pixel mb-3 text-[13px] text-[#1b1b1b]">
            Projects Summary
          </h3>

          {/* Terminal preview */}
          <div className="pixel-shadow overflow-hidden border border-black bg-[#1c2230]">
            <div className="flex items-center gap-1.5 bg-[#2c3444] px-2 py-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
              <span className="font-mono ml-2 text-[10px] text-[#8b98ab]">
                Source_Code.cpp
              </span>
            </div>
            <pre className="font-mono overflow-x-auto p-3 text-[11px] leading-[1.6]">
              {CODE_LINES.map((line, i) => (
                <div key={i} style={{ paddingLeft: `${(line.indent ?? 0) * 12}px` }}>
                  {line.parts.every((part) => part.t === "") ? (
                    <span>&nbsp;</span>
                  ) : (
                    line.parts.map((part, j) => (
                      <span key={j} style={{ color: part.c || "#e5e9f0" }}>
                        {part.t}
                      </span>
                    ))
                  )}
                </div>
              ))}
            </pre>
          </div>

          {/* Project links */}
          <ul className="mt-3 space-y-2">
            {projects.map((project) => (
              <li key={project.id} className="flex gap-2">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rotate-45 bg-[var(--color-rpg-gold)]"
                  aria-hidden
                />
                <span>
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-[var(--color-rpg-sapphire)] underline"
                    >
                      {project.title}
                    </a>
                  ) : (
                    <b className="font-semibold text-[var(--color-rpg-sapphire)]">
                      {project.title}
                    </b>
                  )}{" "}
                  — {project.tagline}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 border-t-2 border-[#c8c3a8] pt-4">
          <a
            className="xp-button xp-button--primary inline-flex items-center gap-2 no-underline"
            href={profile.resumePdfUrl}
            download
          >
            <Sprite name="floppy" className="h-4 w-4" />
            Resume
          </a>
          <a
            className="xp-button inline-flex items-center gap-2 no-underline"
            href={`mailto:${profile.socials.email}`}
          >
            <Sprite name="gmail" className="h-4 w-4" />
            Email
          </a>
          <a
            className="xp-button inline-flex items-center gap-2 no-underline"
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <Sprite name="github" className="h-4 w-4" />
            GitHub
          </a>
          <a
            className="xp-button inline-flex items-center gap-2 no-underline"
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Sprite name="linkedin" className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
