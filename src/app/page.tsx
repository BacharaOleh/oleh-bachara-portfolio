"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ExpoFocusNavigator } from "@/components/ExpoFocusNavigator";
import { SelectedWork } from "@/components/SelectedWork";
import { RecruiterFitMatcher } from "@/components/RecruiterFitMatcher";
import { ValueProposition } from "@/components/ValueProposition";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { StickyRecruiterBar } from "@/components/StickyRecruiterBar";
import { RecruiterModal } from "@/components/RecruiterModal";
import type { Lang } from "@/data/portfolio-data";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);

  const openRecruiterModal = () => setIsRecruiterModalOpen(true);
  const closeRecruiterModal = () => setIsRecruiterModalOpen(false);

  return (
    <div className="site-shell min-h-screen w-full max-w-full overflow-x-hidden overflow-x-clip">
      <div className="site-grain" aria-hidden="true" />
      <div className="relative w-full max-w-full overflow-x-hidden overflow-x-clip">
        <Navbar
          lang={lang}
          setLang={setLang}
          onOpenRecruiterModal={openRecruiterModal}
        />
        <main className="w-full max-w-full overflow-x-hidden overflow-x-clip">
          <Hero
            lang={lang}
            onOpenRecruiterModal={openRecruiterModal}
          />
          <ExpoFocusNavigator
            lang={lang}
            onOpenRecruiterModal={openRecruiterModal}
          />
          <SelectedWork
            lang={lang}
          />
          <RecruiterFitMatcher
            lang={lang}
            onOpenRecruiterModal={openRecruiterModal}
          />
          <ValueProposition
            lang={lang}
            perspective="business"
          />
          <About
            lang={lang}
          />
          <Contact
            lang={lang}
          />
        </main>
        <Footer />

        {/* Floating Quick Action Bar for Recruiters */}
        <StickyRecruiterBar
          lang={lang}
          onOpenRecruiterModal={openRecruiterModal}
        />

        {/* 1-Minute Executive Summary Modal */}
        <RecruiterModal
          isOpen={isRecruiterModalOpen}
          onClose={closeRecruiterModal}
          lang={lang}
        />
      </div>
    </div>
  );
}
