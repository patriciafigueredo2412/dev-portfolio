import type { LucideIcon } from "lucide-react";

/** Stable identifier for every window that can live on the desktop. */
export type WindowId =
  | "trainer-card"
  | "quest-log"
  | "overworld-map"
  | "item-inventory"
  | "shark-radar"
  | "dino-bin"
  | "guitar-player"
  | "climbing-log";

/** Groups desktop shortcuts so the primary apps sort above the easter eggs. */
export type DesktopIconGroup = "app" | "easter-egg";

export interface DesktopIcon {
  id: WindowId;
  label: string;
  icon: LucideIcon;
  group: DesktopIconGroup;
}

export interface WindowInstance {
  id: WindowId;
  /** Present in the window stack (rendered) — may still be minimized. */
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  /** Stacking order; the focused window always holds the highest value. */
  zIndex: number;
  position: { x: number; y: number };
}

export interface WindowManager {
  windows: Record<WindowId, WindowInstance>;
  /** Open windows in the order they should appear as taskbar tabs. */
  order: WindowId[];
  focusedId: WindowId | null;
  open: (id: WindowId) => void;
  close: (id: WindowId) => void;
  focus: (id: WindowId) => void;
  toggleMinimize: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  /** Taskbar-tab behavior: restore + focus, or minimize if already focused. */
  taskbarToggle: (id: WindowId) => void;
  setPosition: (id: WindowId, position: { x: number; y: number }) => void;
}
