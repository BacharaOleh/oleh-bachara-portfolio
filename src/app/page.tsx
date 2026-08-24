"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SolutionMatrix } from "@/components/SolutionMatrix";
import { SystemArchitecture } from "@/components/SystemArchitecture";
import { CaseStudies } from "@/components/CaseStudies";
import { LiveShowcases } from "@/components/LiveShowcases";
import { TechStack } from "@/components/TechStack";
import { Education } from "@/components/Education";
import { ProjectConfigurator } from "@/components/ProjectConfigurator";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";
import { RecruiterModal } from "@/components/RecruiterModal";
import { TelegramAuthModal } from "@/components/TelegramAuthModal";
import { LiveStatusWidget } from "@/components/LiveStatusWidget";
import type { Lang, Perspective } from "@/data/portfolio-data";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [perspective, setPerspective] = useState<Perspective>("engineer");
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [telegramOpen, setTelegramOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#080c14] text-slate-100 overflow-x-hidden">
      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Stripe / Vercel Animated Gradient Mesh Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="mesh-blob-1 absolute -top-[20%] left-[15%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="mesh-blob-2 absolute top-[35%] -left-[10%] w-[700px] h-[700px] rounded-full bg-cyan-500/12 blur-[160px]" />
        <div className="mesh-blob-3 absolute top-[60%] right-[-10%] w-[650px] h-[650px] rounded-full bg-purple-600/12 blur-[150px]" />
      </div>

      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} perspective={perspective} setPerspective={setPerspective} />
        <main>
          <Hero lang={lang} perspective={perspective} />
          <SolutionMatrix lang={lang} />
          <SystemArchitecture lang={lang} />
          <CaseStudies lang={lang} />
          <LiveShowcases lang={lang} />
          <TechStack lang={lang} />
          <Education lang={lang} />
          <ProjectConfigurator lang={lang} />
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

      {/* Live Status Floating Widget */}
      <LiveStatusWidget lang={lang} perspective={perspective} />

      {/* ⌘K Command Palette — floats over everything */}
      <CommandPalette
        lang={lang}
        onOpenRecruiter={() => setRecruiterOpen(true)}
        onOpenTelegram={() => setTelegramOpen(true)}
      />
    </div>
  );
}
