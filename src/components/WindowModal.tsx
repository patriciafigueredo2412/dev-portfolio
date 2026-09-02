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
      const nextX = Math.min(Math.max(event.clientX - state.offsetX, -width + 120), maxX);
      const nextY = Math.min(Math.max(event.clientY - state.offsetY, 0), maxY);
      onDrag({ x: nextX, y: nextY });
    },
    [onDrag, width],
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
        width,
        height,
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
      <div className="flex-1 overflow-hidden p-[3px] pt-0">
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
