import { Flag, MapPin } from "lucide-react";

import { experience } from "@/data/experience";

export function OverworldMap() {
  return (
    <div className="scanlines font-sans">
      <div className="border-b-2 border-[#b8b49a] bg-[var(--color-xp-face)] p-3">
        <h2 className="font-pixel flex items-center gap-2 text-[11px] text-[var(--color-rpg-emerald)]">
          <MapPin className="h-4 w-4" aria-hidden />
          OVERWORLD MAP
        </h2>
        <p className="mt-1 font-terminal text-[15px] text-[#4a4a4a]">
          Follow the path — each node is a party you traveled with.
        </p>
      </div>

      <ol className="relative p-4">
        {/* The road */}
        <span
          className="absolute bottom-6 left-[27px] top-6 w-1 bg-[repeating-linear-gradient(180deg,var(--color-rpg-gold)_0_8px,transparent_8px_16px)]"
          aria-hidden
        />

        {experience.map((role, index) => (
          <li key={role.id} className="relative mb-5 pl-12 last:mb-0">
            {/* Node marker */}
            <span
              className="pixelated absolute left-0 top-0 grid h-11 w-11 place-items-center border-2 border-[var(--color-rpg-shadow)] bg-[var(--color-rpg-emerald)] text-white"
              aria-hidden
            >
              {index === 0 ? (
                <Flag className="h-5 w-5" />
              ) : (
                <span className="font-pixel text-[12px]">{index + 1}</span>
              )}
            </span>

            <div className="bevel-raised pixel-shadow bg-[#f7f7f0] p-3">
              <p className="font-pixel text-[9px] text-[var(--color-rpg-sapphire)]">
                &gt; {role.mapLocationName}
              </p>
              <h3 className="mt-1.5 font-pixel text-[11px] leading-snug text-[var(--color-rpg-ink)]">
                {role.roleTitle}
              </h3>
              <p className="mt-1 text-[12px] font-semibold text-[#3a3a3a]">
                {role.organization}
              </p>
              <p className="font-terminal text-[15px] text-[#6a6a6a]">
                {role.timeline} · {role.location}
              </p>

              <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-[#2b2118]">
                {role.impactBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--color-rpg-crimson)]"
                      aria-hidden
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {role.technologiesUsed.map((tech) => (
                  <span key={tech} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
