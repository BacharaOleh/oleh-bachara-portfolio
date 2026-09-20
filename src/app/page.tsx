"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { RecruiterFitMatcher } from "@/components/RecruiterFitMatcher";
import { SelectedWork } from "@/components/SelectedWork";
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
    <div className="site-shell min-h-screen overflow-x-hidden">
      <div className="site-grain" aria-hidden="true" />
      <div className="relative pb-16">
        <Navbar
          lang={lang}
          setLang={setLang}
          onOpenRecruiterModal={openRecruiterModal}
        />
        <main>
          <Hero
            lang={lang}
            onOpenRecruiterModal={openRecruiterModal}
          />
          <RecruiterFitMatcher
            lang={lang}
            onOpenRecruiterModal={openRecruiterModal}
          />
          <SelectedWork
            lang={lang}
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
