"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ValueProposition } from "@/components/ValueProposition";
import { SystemArchitecture } from "@/components/SystemArchitecture";
import { CaseStudies } from "@/components/CaseStudies";
import { LiveShowcases } from "@/components/LiveShowcases";
import { TechStack } from "@/components/TechStack";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { RecruiterModal } from "@/components/RecruiterModal";
import { TelegramAuthModal } from "@/components/TelegramAuthModal";
import type { Lang } from "@/data/portfolio-data";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [telegramOpen, setTelegramOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#080c14] text-slate-100 overflow-x-hidden">
      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Ambient Spotlight Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 10% 40%, rgba(56, 189, 248, 0.07) 0%, transparent 40%),
            radial-gradient(circle at 90% 70%, rgba(168, 85, 247, 0.06) 0%, transparent 40%)
          `,
        }}
      />

      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} />
        <main>
          <Hero lang={lang} />
          <ValueProposition lang={lang} />
          <SystemArchitecture lang={lang} />
          <CaseStudies lang={lang} />
          <LiveShowcases lang={lang} />
          <TechStack lang={lang} />
          <Education lang={lang} />
          <Contact lang={lang} />
        </main>
        <Footer />
      </div>

      {/* Global Modals */}
      <RecruiterModal
        isOpen={recruiterOpen}
        onClose={() => setRecruiterOpen(false)}
        lang={lang}
      />
      <TelegramAuthModal
        isOpen={telegramOpen}
        onClose={() => setTelegramOpen(false)}
      />

      {/* ⌘K Command Palette — floats over everything */}
      <CommandPalette
        lang={lang}
        onOpenRecruiter={() => setRecruiterOpen(true)}
        onOpenTelegram={() => setTelegramOpen(true)}
      />
    </div>
  );
}
