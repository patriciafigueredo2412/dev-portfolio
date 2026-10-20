import type { FC } from "react";

import type { WindowId } from "@/types/desktop";

/**
 * Tiny 16-bit sprite engine: each icon is authored as a grid of characters,
 * one char per pixel, mapped to a color through a shared palette. Rows may be
 * ragged — anything shorter than the widest row is treated as transparent.
 */
const PALETTE: Record<string, string> = {
  ".": "transparent",
  k: "#241c12", // outline / shadow
  W: "#ffffff",
  A: "#d7dde2", // light grey / snow / shark belly
  a: "#8a97a2", // grey (bone, stone, shark)
  z: "#5f6b76", // dark grey
  R: "#e23b32", // red
  r: "#9c2020", // dark red
  g: "#f5c531", // gold
  o: "#c1871d", // dark gold / bronze / belt
  c: "#f3e4b6", // parchment / cream
  y: "#d8c48a", // parchment shadow
  n: "#22357a", // navy (legs / trousers)
  b: "#3f8ae6", // blue
  d: "#2f6fd6", // tunic blue
  w: "#5cc4f5", // wave / water
  s: "#f1c78e", // skin
  h: "#e8873a", // hero hair (orange)
  B: "#8a5a2b", // brown
  D: "#5a3a1c", // dark brown
  G: "#5bbf3c", // dino green
  E: "#317d22", // dark green
  L: "#8fe064", // light green
  F: "#c9e6f5", // pale flag / mail
};

const SPRITES: Record<WindowId, string[]> = {
  // About Me — a little RPG hero, front facing
  "trainer-card": [
    "................",
    ".....kkkkkk.....",
    "....khhhhhhk....",
    "...khhhhhhhhk...",
    "...khhssssshk...",
    "...khsWssWshk...",
    "...khsssssshk...",
    "...khsskssshk...",
    "....khssssk.....",
    "...kddddddddk...",
    "..kdddddddddk...",
    "..kdddooooddk...",
    "..kdddddddddk...",
    "..knnnnkknnnnk..",
    "..kBBnnkknnBBk..",
    "...kk......kk...",
  ],
  // My Projects — treasure chest with gold bands + lock
  "quest-log": [
    "................",
    "................",
    ".kkkkkkkkkkkkkk.",
    ".kooooooooooook.",
    ".kBBBBBBBBBBBBk.",
    ".kBggBBBBBBggBk.",
    ".kkkkkkkkkkkkkk.",
    ".kBBBBBggBBBBBk.",
    ".kBggBBggBBggBk.",
    ".kBBBBgkkgBBBBk.",
    ".kBBBBgkkgBBBBk.",
    ".kBggBBBBBBggBk.",
    ".kBBBBBBBBBBBBk.",
    ".kooooooooooook.",
    ".kkkkkkkkkkkkkk.",
    "................",
  ],
  // Resume — rolled parchment scroll
  "overworld-map": [
    "................",
    "...kkkkkkkkkk...",
    "..kooooooooook..",
    "..kkkkkkkkkkkk..",
    ".kyccccccccccyk.",
    ".kycckcccccccyk.",
    ".kycccccckcccyk.",
    ".kyckccccccccyk.",
    ".kyccccccckccyk.",
    ".kyccckccccccyk.",
    ".kyccccccccccyk.",
    ".kyccccccccccyk.",
    "..kkkkkkkkkkkk..",
    "..kooooooooook..",
    "...kkkkkkkkkk...",
    "................",
  ],
  // Skills — RPG backpack / item pouch
  "item-inventory": [
    "................",
    "....DDD..DDD....",
    "...kDDDDDDDDk...",
    "...kBBBBBBBBk...",
    "...kBooooooBk...",
    "...kBooooooBk...",
    "...kBooooooBk...",
    "...kBooggooBk...",
    "...kBooggooBk...",
    "...kBooooooBk...",
    "...kBBBBBBBBk...",
    "...kBBBBBBBBk...",
    "...kBDDDDDDBk...",
    "...kBDDDDDDBk...",
    "...kkkkkkkkkk...",
    "................",
  ],
  // Contact — pixel mailbox with raised flag
  contact: [
    "................",
    "............RR..",
    "............RR..",
    "...kkkkkkk..RR..",
    "..kAAAAAAAkkRR..",
    ".kAAAAAAAAAkR...",
    ".kAWWWWWWWAk....",
    ".kAWkkkkkWAk....",
    ".kAWWWWWWWAk....",
    ".kAAAAAAAAAk....",
    ".kkkkkkkkkkk....",
    "....kDDk.......",
    "....kDDk.......",
    "....kDDk.......",
    "..kkkkkkkk.....",
    "................",
  ],
  // Shark fin cutting through waves
  "shark-radar": [
    "................",
    "................",
    "................",
    ".......kk.......",
    "......kAak......",
    ".....kAaaak.....",
    ".....kAaaaak....",
    "....kAaaaaaak...",
    "....kAaaaaaaak..",
    "...kAaaaaaaaak..",
    "...kAaaaaaaaaak.",
    "..wwwwwwwwwwwwww",
    ".wdwwwwdwwwwdwww",
    ".wwwdwwwwdwwwwdw",
    "..ddddddddddddd.",
    "................",
  ],
  // Recycle bin — T-Rex skull fossil (side profile, facing left)
  "dino-bin": [
    "................",
    ".....kkkkkk.....",
    "...kkaaaaaakk...",
    "..kaaaaaaaaaak..",
    ".kaaaaaaaaaaaak.",
    ".kaakkaaaaaaaak.",
    "kaaakkaaaaaaaak.",
    "kaaaaaaaaaaaaak.",
    "kkaaaaaaaaaaaak.",
    "..kaaaaaaaaaaak.",
    "..kWkWkWkWaaaak.",
    "...kaaaaaaaaak..",
    "...kWkWkWaaak...",
    "....kaaaaaak....",
    ".....kkkkkk.....",
    "................",
  ],
};

interface PixelIconProps {
  className?: string;
}

function makeSprite(rows: string[]): FC<PixelIconProps> {
  const width = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const height = rows.length;
  const cells: { x: number; y: number; fill: string }[] = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const fill = PALETTE[ch];
      if (fill && fill !== "transparent") cells.push({ x, y, fill });
    });
  });

  const Sprite: FC<PixelIconProps> = ({ className }) => (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
      role="presentation"
    >
      {cells.map((cell) => (
        <rect
          key={`${cell.x}-${cell.y}`}
          x={cell.x}
          y={cell.y}
          width={1.02}
          height={1.02}
          fill={cell.fill}
        />
      ))}
    </svg>
  );
  Sprite.displayName = "PixelSprite";
  return Sprite;
}

export const PIXEL_ICONS: Record<WindowId, FC<PixelIconProps>> = Object.fromEntries(
  (Object.keys(SPRITES) as WindowId[]).map((id) => [id, makeSprite(SPRITES[id])]),
) as Record<WindowId, FC<PixelIconProps>>;
