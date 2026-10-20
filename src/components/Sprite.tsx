import Image from "next/image";

/** Hand-cut pixel-art sprites living in /public/sprites (transparent PNGs). */
const SPRITES = {
  dino: { src: "/sprites/dino.png", width: 214, height: 256 },
  fossil: { src: "/sprites/fossil.png", width: 242, height: 256 },
  shark: { src: "/sprites/shark.png", width: 256, height: 136 },
  "shark-fin": { src: "/icons/shark-fin.png", width: 32, height: 32 },
  /* Patricia: framed portrait and small bust sprite */
  portrait: { src: "/sprites/portrait.png", width: 384, height: 384 },
  avatar: { src: "/sprites/avatar.png", width: 147, height: 160 },
  /* Patricia with her horse and raven — the Shut Down farewell */
  rider: { src: "/sprites/rider.png", width: 256, height: 191 },
  /* 32×32 pixel icons (public/icons) — render at 16/32/64px to stay crisp */
  chest: { src: "/icons/chest.png", width: 32, height: 32 },
  resume: { src: "/icons/resume.png", width: 32, height: 32 },
  backpack: { src: "/icons/backpack.png", width: 32, height: 32 },
  floppy: { src: "/icons/floppy.png", width: 32, height: 32 },
  linkedin: { src: "/icons/linkedin.png", width: 32, height: 32 },
  github: { src: "/icons/github.png", width: 32, height: 32 },
  gmail: { src: "/icons/gmail.png", width: 32, height: 32 },
  r2d2: { src: "/icons/r2d2.png", width: 32, height: 32 },
  "dino-icon": { src: "/icons/dino.png", width: 32, height: 32 },
} as const;

export type SpriteName = keyof typeof SPRITES;

interface SpriteProps {
  name: SpriteName;
  /** Decorative by default; pass alt text when the sprite carries meaning. */
  alt?: string;
  className?: string;
}

export function Sprite({ name, alt = "", className = "" }: SpriteProps) {
  const sprite = SPRITES[name];
  return (
    <Image
      src={sprite.src}
      width={sprite.width}
      height={sprite.height}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      draggable={false}
      unoptimized
      className={`pixelated select-none ${className}`}
    />
  );
}
