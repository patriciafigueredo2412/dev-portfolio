"use client";

import { Code2, Contact as ContactIcon, Mail, Send } from "lucide-react";
import { useState } from "react";

import { profile } from "@/data/profile";

export function ContactCard() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const send = () => {
    const subject = encodeURIComponent(
      name ? `Portfolio message from ${name}` : "Portfolio message",
    );
    const body = encodeURIComponent(message || "Hi Patricia,\n\n");
    window.location.href = `mailto:${profile.socials.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="font-sans p-5 text-[13px] text-[#2b2118]">
      <div className="rpg-frame mb-5">
        <div className="rpg-frame__inner font-terminal text-[16px]">
          &gt; Leave a message and I&apos;ll send a raven back.
        </div>
      </div>

      <div className="space-y-3">
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
            MESSAGE
          </span>
          <textarea
            className="bevel-sunken h-24 w-full resize-none bg-white px-2 py-1.5 text-[13px] outline-none"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Say hello, pitch a quest…"
          />
        </label>
        <button
          type="button"
          className="xp-button xp-button--primary inline-flex items-center gap-2"
          onClick={send}
        >
          <Send className="h-4 w-4" aria-hidden />
          Send Message
        </button>
      </div>

      <ul className="mt-5 space-y-2 border-t-2 border-[#c8c3a8] pt-4">
        <li>
          <a
            className="flex items-center gap-2 text-[var(--color-rpg-sapphire)] underline"
            href={`mailto:${profile.socials.email}`}
          >
            <Mail className="h-4 w-4" aria-hidden />
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
            <Code2 className="h-4 w-4" aria-hidden />
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
            <ContactIcon className="h-4 w-4" aria-hidden />
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}
