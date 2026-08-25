"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import type { Lang, Perspective } from "@/data/portfolio-data";

const WorkHub = dynamic(() => import("@/components/WorkHub").then((mod) => mod.WorkHub), {
  loading: () => <div className="py-24 min-h-[500px]" />,
});

const TechStack = dynamic(() => import("@/components/TechStack").then((mod) => mod.TechStack), {
  loading: () => <div className="py-20 min-h-[400px]" />,
});

const Education = dynamic(() => import("@/components/Education").then((mod) => mod.Education), {
  loading: () => <div className="py-20 min-h-[300px]" />,
});

const ProjectConfigurator = dynamic(() => import("@/components/ProjectConfigurator").then((mod) => mod.ProjectConfigurator), {
  loading: () => <div className="py-16 min-h-[400px]" />,
});

const Contact = dynamic(() => import("@/components/Contact").then((mod) => mod.Contact), {
  loading: () => <div className="py-20 min-h-[400px]" />,
});

// Modals loaded on-demand
const RecruiterModal = dynamic(() => import("@/components/RecruiterModal").then((mod) => mod.RecruiterModal), {
  ssr: false,
});

const TelegramAuthModal = dynamic(() => import("@/components/TelegramAuthModal").then((mod) => mod.TelegramAuthModal), {
  ssr: false,
});

const CommandPalette = dynamic(() => import("@/components/CommandPalette").then((mod) => mod.CommandPalette), {
  ssr: false,
});

const LiveStatusWidget = dynamic(() => import("@/components/LiveStatusWidget").then((mod) => mod.LiveStatusWidget), {
  ssr: false,
});

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [perspective, setPerspective] = useState<Perspective>("engineer");
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [telegramOpen, setTelegramOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#050811] text-slate-100 overflow-x-hidden">
      {/* Subtle Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0" aria-hidden="true" />

      {/* Static Ambient Radial Mesh Glows (Optimized: 0% CPU overhead) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="mesh-ambient-1 absolute -top-[15%] left-[20%] w-[650px] h-[650px] rounded-full blur-[130px]" />
        <div className="mesh-ambient-2 absolute top-[40%] -left-[10%] w-[650px] h-[650px] rounded-full blur-[130px]" />
        <div className="mesh-ambient-3 absolute top-[70%] right-[-10%] w-[650px] h-[650px] rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} perspective={perspective} setPerspective={setPerspective} />
        <main>
          <Hero lang={lang} perspective={perspective} />
          <WorkHub lang={lang} />
          <TechStack lang={lang} />
          <Education lang={lang} />
          <ProjectConfigurator lang={lang} />
          <Contact lang={lang} />
        </main>
        <Footer />
      </div>

      {/* Global On-Demand Modals */}
      {recruiterOpen && (
        <RecruiterModal
          isOpen={recruiterOpen}
          onClose={() => setRecruiterOpen(false)}
          lang={lang}
        />
      )}
      
      {telegramOpen && (
        <TelegramAuthModal
          isOpen={telegramOpen}
          onClose={() => setTelegramOpen(false)}
        />
      )}

      {/* Floating Status Island Widget */}
      <LiveStatusWidget lang={lang} perspective={perspective} />

      {/* ⌘K Command Palette */}
      <CommandPalette
        lang={lang}
        onOpenRecruiter={() => setRecruiterOpen(true)}
        onOpenTelegram={() => setTelegramOpen(true)}
      />
    </div>
  );
}
