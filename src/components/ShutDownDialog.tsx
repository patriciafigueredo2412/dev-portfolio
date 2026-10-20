"use client";

import { Power, Send } from "lucide-react";
import { useEffect, useState } from "react";

import { Sprite } from "@/components/Sprite";

interface ShutDownDialogProps {
  onCancel: () => void;
  /** Open the Contact window instead of leaving. */
  onLeaveRaven: () => void;
}

/**
 * Start → Shut Down. A farewell from the rider; OK tries to close the tab.
 * Browsers only let scripts close tabs they opened, so when that's refused we
 * fall back to the classic "It's now safe to turn off your computer" screen.
 */
export function ShutDownDialog({ onCancel, onLeaveRaven }: ShutDownDialogProps) {
  const [poweredOff, setPoweredOff] = useState(false);

  useEffect(() => {
    if (poweredOff) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel, poweredOff]);

  const shutDown = () => {
    window.close();
    // Still here? The browser refused — power off the "computer" instead.
    setPoweredOff(true);
  };

  if (poweredOff) {
    return (
      <div className="fixed inset-0 z-[10001] grid place-items-center bg-black p-6 text-center">
        <div>
          <p className="font-pixel text-[14px] leading-loose text-[#f2a33a] sm:text-[18px]">
            It&apos;s now safe to turn off
            <br />
            your computer.
          </p>
          <p className="font-terminal mt-6 text-[18px] text-[#8a8a8a]">
            (You can close this tab whenever you like.)
          </p>
          <button
            type="button"
            className="xp-button mt-8 inline-flex items-center gap-2"
            onClick={() => window.location.reload()}
          >
            <Power className="h-4 w-4" aria-hidden />
            Power on
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[10000] grid place-items-center bg-[rgba(10,30,80,0.55)] p-4"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        role="alertdialog"
        aria-modal
        aria-labelledby="shutdown-title"
        aria-describedby="shutdown-text"
        className="xp-window w-full max-w-[420px]"
        style={{ animation: "window-open 120ms ease-out" }}
      >
        <div className="xp-titlebar flex items-center gap-2 px-2 py-1.5">
          <Power className="h-4 w-4" aria-hidden />
          <h2 id="shutdown-title" className="font-pixel text-[11px]">
            Shut Down Portfolio
          </h2>
        </div>

        <div className="space-y-4 p-4">
          <div className="flex justify-center">
            <Sprite
              name="rider"
              alt="Patricia in a feathered hat, waving beside her horse with a raven on her shoulder"
              className="critter-idle h-auto w-48"
            />
          </div>
          <div className="rpg-frame">
            <p id="shutdown-text" className="rpg-frame__inner font-terminal text-[18px] leading-snug">
              &quot;Safe travels, traveler! Remember to leave a raven in case you wish for our
              paths to meet again.&quot;
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              className="xp-button inline-flex items-center gap-1.5"
              onClick={onLeaveRaven}
            >
              <Send className="h-3.5 w-3.5" aria-hidden />
              Leave a Raven
            </button>
            <button type="button" className="xp-button" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="button"
              autoFocus
              className="xp-button xp-button--primary min-w-[72px]"
              onClick={shutDown}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
