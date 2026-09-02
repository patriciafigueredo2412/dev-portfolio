"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import type { WindowId, WindowInstance, WindowManager } from "@/types/desktop";

const WINDOW_IDS: WindowId[] = [
  "trainer-card",
  "quest-log",
  "overworld-map",
  "item-inventory",
  "contact",
  "shark-radar",
  "dino-bin",
];

/** Slightly offset each newly opened window so stacks stay visible. */
const SPAWN_ORIGIN = { x: 96, y: 64 };
const SPAWN_STEP = 28;

function createInitialWindows(): Record<WindowId, WindowInstance> {
  return WINDOW_IDS.reduce(
    (acc, id, index) => {
      acc[id] = {
        id,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 0,
        position: {
          x: SPAWN_ORIGIN.x + (index % 4) * SPAWN_STEP,
          y: SPAWN_ORIGIN.y + (index % 4) * SPAWN_STEP,
        },
      };
      return acc;
    },
    {} as Record<WindowId, WindowInstance>,
  );
}

/**
 * Central state for the desktop: which windows exist, their stacking order,
 * and every open/close/focus/minimize/maximize transition.
 *
 * Kept as a hook (not context) because only `page.tsx` needs to own it — it
 * threads the pieces down to `Desktop`, `Taskbar`, and each `WindowModal`.
 */
export function useWindowManager(): WindowManager {
  const [windows, setWindows] = useState<Record<WindowId, WindowInstance>>(
    createInitialWindows,
  );
  const [order, setOrder] = useState<WindowId[]>([]);
  const [focusedId, setFocusedId] = useState<WindowId | null>(null);
  const topZ = useRef(1);

  const bringToFront = useCallback((id: WindowId) => {
    topZ.current += 1;
    const nextZ = topZ.current;
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZ, isMinimized: false },
    }));
    setFocusedId(id);
  }, []);

  const open = useCallback(
    (id: WindowId) => {
      setOrder((prev) => (prev.includes(id) ? prev : [...prev, id]));
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isOpen: true, isMinimized: false },
      }));
      bringToFront(id);
    },
    [bringToFront],
  );

  const close = useCallback((id: WindowId) => {
    setOrder((prev) => prev.filter((openId) => openId !== id));
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }));
    setFocusedId((prev) => (prev === id ? null : prev));
  }, []);

  const focus = useCallback(
    (id: WindowId) => {
      if (!windows[id]?.isOpen) return;
      bringToFront(id);
    },
    [bringToFront, windows],
  );

  const toggleMinimize = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const next = { ...prev[id], isMinimized: !prev[id].isMinimized };
        return { ...prev, [id]: next };
      });
      setFocusedId((prev) => (prev === id ? null : prev));
    },
    [],
  );

  const toggleMaximize = useCallback(
    (id: WindowId) => {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
      }));
      bringToFront(id);
    },
    [bringToFront],
  );

  const taskbarToggle = useCallback(
    (id: WindowId) => {
      const win = windows[id];
      if (!win?.isOpen) {
        open(id);
        return;
      }
      if (win.isMinimized) {
        bringToFront(id);
        return;
      }
      if (focusedId === id) {
        toggleMinimize(id);
        return;
      }
      bringToFront(id);
    },
    [bringToFront, focusedId, open, toggleMinimize, windows],
  );

  const setPosition = useCallback(
    (id: WindowId, position: { x: number; y: number }) => {
      setWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], position },
      }));
    },
    [],
  );

  return useMemo(
    () => ({
      windows,
      order,
      focusedId,
      open,
      close,
      focus,
      toggleMinimize,
      toggleMaximize,
      taskbarToggle,
      setPosition,
    }),
    [
      windows,
      order,
      focusedId,
      open,
      close,
      focus,
      toggleMinimize,
      toggleMaximize,
      taskbarToggle,
      setPosition,
    ],
  );
}
