"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Download, Copy, Check, Send, Phone } from "lucide-react";
import { trackIntent } from "@/lib/intent-tracker";
import type { Lang } from "@/data/portfolio-data";

interface StickyRecruiterBarProps {
  lang: Lang;
  onOpenRecruiterModal: () => void;
}

const COPY = {
  en: {
    status: "Available for Remote (EU)",
    fastTrack: "Executive Brief",
    cv: "ATS CV",
    copyEmail: "Copy Email",
    copied: "Email Copied!",
    email: "m.pnikut@gmail.com",
    telegram: "Telegram",
    linkedin: "LinkedIn",
  },
  pl: {
    status: "Dostępny zdalnie (UE)",
    fastTrack: "Executive Brief",
    cv: "CV (PDF)",
    copyEmail: "Kopiuj Email",
    copied: "Skopiowano Email!",
    email: "m.pnikut@gmail.com",
    telegram: "Telegram",
    linkedin: "LinkedIn",
  },
} as const;

export function StickyRecruiterBar({ lang, onOpenRecruiterModal }: StickyRecruiterBarProps) {
  const t = COPY[lang];
  const cvFile = lang === "pl" ? "cv-roman-deyneko-pl.pdf" : "cv-roman-deyneko-en.pdf";
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] inset-x-0 z-40 flex justify-center px-2 sm:px-3 pointer-events-none">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="pointer-events-auto flex items-center justify-between sm:justify-start gap-1 min-[360px]:gap-1.5 sm:gap-3 px-2 py-1.5 sm:px-3.5 sm:py-2.5 rounded-2xl bg-[#11100e]/95 border border-white/[0.14] backdrop-blur-xl shadow-2xl shadow-black/90 w-full max-w-md sm:max-w-4xl"
      >
        {/* Status indicator (Desktop only) */}
        <div className="hidden md:flex items-center gap-2 pr-1 border-r border-white/[0.1] shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] text-[#eeece5] font-medium">
            {t.status}
          </span>
        </div>

        {/* Primary Recruiter Modal Button */}
        <button
          onClick={() => {
            trackIntent("recruiter_modal_open", "⚡ Executive Brief (Sticky Bar)");
            onOpenRecruiterModal();
          }}
          className="flex-1 sm:flex-none flex items-center justify-center gap-1 min-[360px]:gap-1.5 px-2 min-[360px]:px-2.5 min-[380px]:px-3 py-2 sm:py-1.5 rounded-xl bg-gradient-to-r from-[#c4a160] to-[#dfc282] text-[#11100e] text-[10.5px] min-[360px]:text-[11px] min-[380px]:text-xs font-semibold tracking-tight shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer min-h-[44px] sm:min-h-0"
        >
          <Zap size={13} className="fill-[#11100e] shrink-0" />
          <span className="whitespace-nowrap">{t.fastTrack}</span>
        </button>

        {/* CV Download */}
        <a
          href={`/${cvFile}`}
          download={cvFile}
          onClick={() => trackIntent("cv_download", `CV Download (Sticky Bar - ${lang.toUpperCase()})`, cvFile)}
          className="flex items-center justify-center gap-1 min-[360px]:gap-1.5 px-2 min-[360px]:px-2.5 min-[380px]:px-3 py-2 sm:py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 border border-white/[0.08] text-[#eeece5] text-[10.5px] min-[360px]:text-[11px] min-[380px]:text-xs font-mono transition-all shrink-0 min-h-[44px] sm:min-h-0"
          title="Download ATS-Friendly Resume"
        >
          <Download size={12} className="text-[#c4a160] shrink-0" />
          <span className="whitespace-nowrap">{t.cv}</span>
        </a>

        {/* 1-Click Copy Email (Desktop only) */}
        <button
          onClick={() => {
            trackIntent("contact_click_email", "Email Copied (Sticky Bar)", t.email);
            handleCopyEmail();
          }}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-[#eeece5] text-xs font-mono transition-colors cursor-pointer shrink-0 relative"
          title="Click to copy email address"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-300 font-semibold">{t.copied}</span>
            </>
          ) : (
            <>
              <Copy size={13} className="text-[#a39c91]" />
              <span>{t.copyEmail}</span>
            </>
          )}
        </button>

        {/* Quick Channels */}
        <div className="flex items-center gap-0.5 min-[360px]:gap-1 sm:gap-1.5 pl-1 border-l border-white/[0.1] shrink-0">
          <a
            href="tel:+48791265019"
            onClick={() => trackIntent("contact_click_phone", "Phone Call (Sticky Bar)", "+48 791 265 019")}
            className="min-h-[44px] min-w-[38px] min-[360px]:min-w-[40px] sm:min-h-0 sm:min-w-0 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 active:scale-95 transition-all"
            title="Call or WhatsApp (+48 791 265 019)"
            aria-label="Call Roman Deyneko"
          >
            <Phone size={15} />
          </a>
          <a
            href="https://t.me/NeKoRoM"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackIntent("contact_click_telegram", "Telegram Click (Sticky Bar)")}
            className="min-h-[44px] min-w-[38px] min-[360px]:min-w-[40px] sm:min-h-0 sm:min-w-0 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-[#a39c91] hover:text-[#eeece5] hover:bg-white/[0.08] active:scale-95 transition-all"
            title="Chat on Telegram"
            aria-label="Telegram Chat"
          >
            <Send size={14} />
          </a>
          <a
            href="https://linkedin.com/in/roman-deyneko"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackIntent("contact_click_linkedin", "LinkedIn Click (Sticky Bar)")}
            className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-[#a39c91] hover:text-[#eeece5] hover:bg-white/[0.08] transition-colors"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
