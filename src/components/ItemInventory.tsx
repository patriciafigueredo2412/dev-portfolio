import { Backpack } from "lucide-react";

import { skills } from "@/data/skills";
import type { SkillLevel } from "@/types/portfolio";

/** Loot rarity coloring, low → high. */
const LEVEL_STYLES: Record<SkillLevel, { ring: string; label: string }> = {
  Novice: { ring: "#8a8a8a", label: "COMMON" },
  Apprentice: { ring: "#4a9a4a", label: "UNCOMMON" },
  Journeyman: { ring: "#3f7fd6", label: "RARE" },
  Expert: { ring: "#9a4fd0", label: "EPIC" },
  Master: { ring: "#e8b23a", label: "LEGENDARY" },
};

export function ItemInventory() {
  const total = skills.reduce((sum, category) => sum + category.items.length, 0);

  return (
    <div className="font-sans bg-[#2a2418] text-[#f4ecd8]">
      <div className="flex items-center justify-between border-b-2 border-[#6b5a3c] bg-[#3b3324] p-3">
        <h2 className="font-pixel flex items-center gap-2 text-[11px] text-[var(--color-rpg-gold)]">
          <Backpack className="h-4 w-4" aria-hidden />
          ITEM BAG
        </h2>
        <span className="font-terminal text-[16px] text-[#c9bd9a]">
          {total} / {total} slots
        </span>
      </div>

      <div className="space-y-4 p-3">
        {skills.map((category) => (
          <section key={category.category}>
            <h3 className="font-pixel mb-2 text-[9px] text-[var(--color-rpg-gold)]">
              &gt; {category.category}
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {category.items.map((item) => {
                const Icon = item.icon;
                const style = LEVEL_STYLES[item.level];
                return (
                  <div
                    key={item.name}
                    className="inv-slot flex items-center gap-2 p-2"
                    style={{ borderColor: style.ring }}
                    title={`${item.name} — ${item.level}`}
                  >
                    <span
                      className="pixelated grid h-9 w-9 shrink-0 place-items-center bg-[#1f1a12]"
                      style={{ boxShadow: `inset 0 0 0 2px ${style.ring}` }}
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" style={{ color: style.ring }} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[12px] font-semibold">
                        {item.name}
                      </span>
                      <span
                        className="font-pixel block text-[7px]"
                        style={{ color: style.ring }}
                      >
                        {style.label}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <p className="font-terminal border-t-2 border-[#6b5a3c] pt-2 text-[15px] text-[#c9bd9a]">
          Tip: rarer loot (EPIC / LEGENDARY) marks the tools I reach for first.
        </p>
      </div>
    </div>
  );
}
