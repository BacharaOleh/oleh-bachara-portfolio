"use client";

import { ArrowDownRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lang } from "@/data/portfolio-data";

const COPY = {
  en: {
    eyebrow: "Selected work by Oleh Bachara",
    title: "Web platforms that make complex product information easier to use.",
    body: "I work across WordPress/PHP development, product catalogues, performance and technical measurement — helping teams turn existing websites into clearer, faster and more useful tools.",
    primary: "View selected work",
    secondary: "Download CV",
    location: "Jarosław, Poland · Available for remote work in the EU",
  },
  pl: {
    eyebrow: "Wybrane realizacje — Oleh Bachara",
    title: "Platformy webowe, które ułatwiają pracę ze złożoną informacją produktową.",
    body: "Łączę rozwój WordPress/PHP, katalogi produktów, wydajność i pomiar techniczny, aby istniejące strony były czytelniejsze, szybsze i bardziej użyteczne dla biznesu.",
    primary: "Zobacz realizacje",
    secondary: "Pobierz CV",
    location: "Jarosław, Polska · Dostępny do pracy zdalnej w UE",
  },
} as const;

export function Hero({ lang }: { lang: Lang }) {
  const t = COPY[lang];

  return (
    <section id="top" className="scroll-mt-20 pt-32 pb-20 sm:pt-44 sm:pb-32 lg:pb-40">
      <div className="container-custom">
        <div className="grid items-end gap-12 border-b editorial-rule pb-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-9">
            <p className="kicker mb-8">{t.eyebrow}</p>
            <h1 className="display-xl max-w-6xl text-[#eeece5]">
              {t.title}
            </h1>
          </div>
          <div className="border-l editorial-rule pl-5 lg:col-span-3 lg:mb-2">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] leading-relaxed text-[#a39c91]">
              {t.location}
            </p>
          </div>
        </div>
        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-start-3 lg:col-span-6">
            <p className="editorial-copy max-w-2xl">
              {t.body}
            </p>
          </div>
          <div className="lg:col-span-3 lg:justify-self-end">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] leading-relaxed text-[#777168]">
              <p>WordPress / PHP</p>
              <p>Product platforms</p>
              <p>Performance & measurement</p>
            </div>
          </div>
          <div className="lg:col-start-3 lg:col-span-9">
            <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })} className="group">
              {t.primary}<ArrowDownRight size={17} className="transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
            <a href="/cv-oleh-bachara.pdf" download="cv-oleh-bachara.pdf">
              <Button size="lg" variant="secondary" className="group">
                {t.secondary}<Download size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
