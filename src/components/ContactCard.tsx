"use client";

import { Send } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Sprite } from "@/components/Sprite";
import { profile } from "@/data/profile";

/**
 * Web3Forms public access key (https://web3forms.com, free tier). Messages
 * submitted with it are emailed to the inbox the key was created for, with no
 * server of our own. The key is designed to be public. Without it, the form
 * falls back to opening the visitor's mail app with a pre-filled draft.
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; detail: string };

export function ContactCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  /** Honeypot — hidden from people, irresistible to bots. */
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const subject = name ? `Portfolio message from ${name}` : "Portfolio message";

  const openMailApp = () => {
    const body = encodeURIComponent(`${message}\n\nReply to: ${email}`);
    window.location.href = `mailto:${profile.socials.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!WEB3FORMS_KEY) {
      openMailApp();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      // Bots fill the hidden field; quietly "succeed" without sending.
      if (!website) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject,
            from_name: "Pixel Portfolio",
            name: name || "Adventurer",
            email,
            replyto: email,
            message,
          }),
        });
        const result: { success?: boolean; message?: string } = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message ?? `HTTP ${response.status}`);
        }
      }
      setStatus({ kind: "sent" });
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setStatus({
        kind: "error",
        detail: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  const frameText =
    status.kind === "sending"
      ? "> Releasing the raven..."
      : status.kind === "sent"
        ? "> Raven delivered! I'll write back soon."
        : status.kind === "error"
          ? `> The raven got lost (${status.detail}). Try again, or email me directly below.`
          : "> Leave a message and I'll send a raven back.";

  return (
    <div className="font-sans p-5 text-[13px] text-[#2b2118]">
      <div className="rpg-frame mb-5">
        <div className="rpg-frame__inner font-terminal text-[16px]" role="status" aria-live="polite">
          {frameText}
        </div>
      </div>

      <form className="space-y-3" onSubmit={send}>
        <label className="block">
          <span className="font-pixel mb-1 block text-[9px] text-[#5a5a5a]">
            YOUR NAME
          </span>
          <input
            className="bevel-sunken w-full bg-white px-2 py-1.5 text-[13px] outline-none"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Adventurer"
          />
        </label>
        <label className="block">
          <span className="font-pixel mb-1 block text-[9px] text-[#5a5a5a]">
            YOUR EMAIL
          </span>
          <input
            type="email"
            required
            className="bevel-sunken w-full bg-white px-2 py-1.5 text-[13px] outline-none"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@guild.com"
          />
        </label>
        <label className="block">
          <span className="font-pixel mb-1 block text-[9px] text-[#5a5a5a]">
            MESSAGE
          </span>
          <textarea
            required
            className="bevel-sunken h-24 w-full resize-none bg-white px-2 py-1.5 text-[13px] outline-none"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Say hello, pitch a quest…"
          />
        </label>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
        <button
          type="submit"
          className="xp-button xp-button--primary inline-flex items-center gap-2 disabled:opacity-60"
          disabled={status.kind === "sending"}
        >
          <Send className="h-4 w-4" aria-hidden />
          {status.kind === "sending" ? "Sending…" : "Send Message"}
        </button>
      </form>

      <ul className="mt-5 space-y-2 border-t-2 border-[#c8c3a8] pt-4">
        <li>
          <a
            className="flex items-center gap-2 text-[var(--color-rpg-sapphire)] underline"
            href={`mailto:${profile.socials.email}`}
          >
            <Sprite name="gmail" className="h-8 w-8" />
            {profile.socials.email}
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-2 text-[var(--color-rpg-sapphire)] underline"
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
          >
            <Sprite name="github" className="h-8 w-8" />
            GitHub
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-2 text-[var(--color-rpg-sapphire)] underline"
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Sprite name="linkedin" className="h-8 w-8" />
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}
