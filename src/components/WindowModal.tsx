"use client";

import type { LucideIcon } from "lucide-react";
import { Maximize2, Minus, Square, X } from "lucide-react";
import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { WindowId } from "@/types/desktop";

interface WindowModalProps {
  id: WindowId;
  title: string;
  icon: LucideIcon;
  isFocused: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  width?: number;
  height?: number;
  /** Content-pane treatment: crisp white or lined parchment. */
  surface?: "white" | "parchment";
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onDrag: (position: { x: number; y: number }) => void;
  children: ReactNode;
}

const TASKBAR_HEIGHT = 40;
/** The full-width XP title bar above the desktop (see app/page.tsx). */
const TOP_BAR_HEIGHT = 34;
const MIN_WIDTH = 280;
const MIN_HEIGHT = 160;

/** Which edges a resize handle moves: n/s/e/w and the four corners. */
type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

const RESIZE_HANDLES: { edge: ResizeEdge; className: string; cursor: string }[] = [
  { edge: "n", className: "-top-1 left-2 right-2 h-2", cursor: "ns-resize" },
  { edge: "s", className: "-bottom-1 left-2 right-2 h-2", cursor: "ns-resize" },
  { edge: "e", className: "-right-1 top-2 bottom-2 w-2", cursor: "ew-resize" },
  { edge: "w", className: "-left-1 top-2 bottom-2 w-2", cursor: "ew-resize" },
  { edge: "ne", className: "-right-1 -top-1 h-3 w-3", cursor: "nesw-resize" },
  { edge: "sw", className: "-bottom-1 -left-1 h-3 w-3", cursor: "nesw-resize" },
  { edge: "nw", className: "-left-1 -top-1 h-3 w-3", cursor: "nwse-resize" },
  { edge: "se", className: "-bottom-1 -right-1 h-3 w-3", cursor: "nwse-resize" },
];

export function WindowModal({
  title,
  icon: Icon,
  isFocused,
  isMinimized,
  isMaximized,
  zIndex,
  position,
  width = 620,
  height = 460,
  surface = "white",
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onDrag,
  children,
}: WindowModalProps) {
  const dragState = useRef<{ pointerId: number; offsetX: number; offsetY: number } | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState(false);
  /** Current size — starts at the configured size, then follows edge drags. */
  const [size, setSize] = useState({ width, height });
  const resizeState = useRef<{
    pointerId: number;
    edge: ResizeEdge;
    startX: number;
    startY: number;
    rect: { x: number; y: number; width: number; height: number };
  } | null>(null);

  const startResize = useCallback(
    (edge: ResizeEdge, event: ReactPointerEvent<HTMLDivElement>) => {
      if (isMaximized) return;
      event.stopPropagation();
      // Measure the rendered box: height may currently be capped by the viewport.
      const frame = event.currentTarget.parentElement!.getBoundingClientRect();
      resizeState.current = {
        pointerId: event.pointerId,
        edge,
        startX: event.clientX,
        startY: event.clientY,
        rect: { x: position.x, y: position.y, width: frame.width, height: frame.height },
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      onFocus();
    },
    [isMaximized, onFocus, position.x, position.y],
  );

  const moveResize = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const state = resizeState.current;
      if (!state || state.pointerId !== event.pointerId) return;
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;
      const { rect, edge } = state;
      let { x, y, width: w, height: h } = rect;

      if (edge.includes("e")) w = rect.width + dx;
      if (edge.includes("s")) h = rect.height + dy;
      if (edge.includes("w")) {
        w = Math.max(MIN_WIDTH, rect.width - dx);
        x = rect.x + rect.width - w;
      }
      if (edge.includes("n")) {
        // Don't let the top edge climb above the desktop.
        h = Math.max(MIN_HEIGHT, Math.min(rect.height - dy, rect.y + rect.height));
        y = rect.y + rect.height - h;
      }

      setSize({ width: Math.max(MIN_WIDTH, w), height: Math.max(MIN_HEIGHT, h) });
      if (x !== rect.x || y !== rect.y) onDrag({ x, y });
    },
    [onDrag],
  );

  const endResize = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (resizeState.current?.pointerId === event.pointerId) resizeState.current = null;
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (isMaximized) return;
      // Ignore drags that start on the control buttons.
      if ((event.target as HTMLElement).closest("button")) return;
      dragState.current = {
        pointerId: event.pointerId,
        offsetX: event.clientX - position.x,
        offsetY: event.clientY - position.y,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
      onFocus();
    },
    [isMaximized, onFocus, position.x, position.y],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const state = dragState.current;
      if (!state || state.pointerId !== event.pointerId) return;
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - TASKBAR_HEIGHT - 24;
      const nextX = Math.min(Math.max(event.clientX - state.offsetX, -size.width + 120), maxX);
      const nextY = Math.min(Math.max(event.clientY - state.offsetY, 0), maxY);
      onDrag({ x: nextX, y: nextY });
    },
    [onDrag, size.width],
  );

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current?.pointerId === event.pointerId) {
      dragState.current = null;
      setIsDragging(false);
    }
  }, []);

  // Close on Escape while focused.
  useEffect(() => {
    if (!isFocused) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFocused, onClose]);

  const frameStyle: React.CSSProperties = isMaximized
    ? { inset: 0, bottom: TASKBAR_HEIGHT, width: "auto", height: "auto", zIndex }
    : {
        left: position.x,
        top: position.y,
        // Never wider than the screen to the right of the window (phones).
        width: `min(${size.width}px, calc(100vw - ${position.x}px - 8px))`,
        // Cap to the room left above the taskbar; the content well scrolls.
        height: `min(${size.height}px, calc(100dvh - ${TOP_BAR_HEIGHT + TASKBAR_HEIGHT + 8}px - ${position.y}px))`,
        minHeight: MIN_HEIGHT,
        zIndex,
      };

  return (
    <div
      role="dialog"
      aria-label={title}
      aria-modal={false}
      className="xp-window absolute flex flex-col"
      style={{
        ...frameStyle,
        display: isMinimized ? "none" : "flex",
        animation: "window-open 120ms ease-out",
      }}
      onPointerDown={onFocus}
    >
      {/* Edge + corner grips for resizing */}
      {isMaximized
        ? null
        : RESIZE_HANDLES.map((handle) => (
            <div
              key={handle.edge}
              aria-hidden
              className={`absolute z-10 touch-none ${handle.className}`}
              style={{ cursor: handle.cursor }}
              onPointerDown={(event) => startResize(handle.edge, event)}
              onPointerMove={moveResize}
              onPointerUp={endResize}
              onPointerCancel={endResize}
            />
          ))}
      {/* Title bar */}
      <div
        className={`xp-titlebar ${
          isFocused ? "" : "xp-titlebar-inactive"
        } flex items-center gap-2 px-1.5 py-1.5 select-none ${
          isMaximized ? "cursor-default" : isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={onMaximize}
      >
        <Icon className="pixelated ml-1 h-4 w-4 shrink-0" aria-hidden />
        <span className="font-pixel truncate text-[11px] leading-none">{title}</span>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className="xp-control-btn"
            aria-label="Minimize"
            onClick={onMinimize}
          >
            <Minus className="h-3 w-3" aria-hidden />
          </button>
          <button
            type="button"
            className="xp-control-btn"
            aria-label={isMaximized ? "Restore" : "Maximize"}
            onClick={onMaximize}
          >
            {isMaximized ? (
              <Square className="h-3 w-3" aria-hidden />
            ) : (
              <Maximize2 className="h-3 w-3" aria-hidden />
            )}
          </button>
          <button
            type="button"
            className="xp-control-btn xp-control-btn--close"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="h-3 w-3" aria-hidden />
          </button>
        </div>
      </div>

      {/* Content well */}
      <div className="flex-1 overflow-hidden p-1">
        <div
          className={`xp-scroll bevel-sunken h-full overflow-y-auto ${
            surface === "parchment" ? "xp-content--parchment" : "xp-content"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
