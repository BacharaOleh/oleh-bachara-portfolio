"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import type { Lang } from "@/data/portfolio-data";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <div className="site-shell min-h-screen overflow-x-hidden">
      <div className="site-grain" aria-hidden="true" />
      <div className="relative">
        <Navbar lang={lang} setLang={setLang} />
        <main>
          <Hero lang={lang} />
          <SelectedWork lang={lang} />
          <About lang={lang} />
          <Contact lang={lang} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
