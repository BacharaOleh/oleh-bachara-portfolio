"use client";

import { ArrowDownRight, Download, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";
import type { Lang } from "@/data/portfolio-data";

interface HeroProps {
  lang: Lang;
  onOpenRecruiterModal: () => void;
}

const COPY = {
  en: {
    eyebrow: "⚡ Recruiter-Ready Portfolio · Web Developer",
    title: "Web platforms engineered for traffic, speed & measurable revenue.",
    body: "I bridge the gap between heavy backend architecture (WordPress/PHP, custom themes, SQL, REST APIs) and commercial business growth — delivering +40% organic traffic, 90+ mobile PageSpeed, and reliable multi-market platforms across the EU.",
    primary: "⚡ Recruiter Fast-Track (30s)",
    secondary: "Download CV (PDF)",
    explore: "View Case Studies",
    location: "Jarosław, Poland · Remote EU / Hybrid",
    metrics: [
      { value: "+40%", label: "Organic Traffic Surge", detail: "Flagship Corporate Platform" },
      { value: "90+", label: "Mobile PageSpeed", detail: "Core Web Vitals Recovery" },
      { value: "8+", label: "Corporate Platforms", detail: "PL / UA / EU Markets" },
      { value: "100%", label: "EU Work Rights", detail: "Dual PL/UA Citizenship · No Visa" },
    ],
  },
  pl: {
    eyebrow: "⚡ Gotowy Profil dla Rekruterów · Web Developer",
    title: "Platformy webowe tworzone dla ruchu, wydajności i wyników biznesowych.",
    body: "Łączę architekturę backendową (WordPress/PHP, autorskie motywy, optymalizację SQL, REST API) z realnym wzrostem biznesu — osiągając +40% wzrostu ruchu organicznego, wynik 90+ PageSpeed na mobile i stabilne platformy na rynkach UE.",
    primary: "⚡ Dla Rekruterów (30s)",
    secondary: "Pobierz CV (PDF)",
    explore: "Zobacz Case Studies",
    location: "Jarosław, Polska · Zdalnie w UE / Hybryda",
    metrics: [
      { value: "+40%", label: "Wzrost Ruchu Organicznego", detail: "Kluczowa Platforma Korporacyjna" },
      { value: "90+", label: "PageSpeed Mobile", detail: "Poprawa Core Web Vitals" },
      { value: "8+", label: "Platform Korporacyjnych", detail: "Rynki PL / UA / UE" },
      { value: "100%", label: "Prawa Pracy w UE", detail: "Podwójne Obywatelstwo PL/UA · Bez Wizy" },
    ],
  },
} as const;

export function Hero({ lang, onOpenRecruiterModal }: HeroProps) {
  const t = COPY[lang];

  return (
    <section id="top" className="hero-section scroll-mt-20 pt-28 pb-16 sm:pt-40 sm:pb-24 lg:pb-32">
      <div className="container-custom">
        {/* Top Ornament */}
        <div className="hero-ornament" aria-hidden="true">
          <BrandMark />
          <span>01 — 04 / COMMERCIAL PLATFORMS & TECHNICAL GROWTH</span>
        </div>

        {/* Headline & Location */}
        <div className="grid items-end gap-10 border-b editorial-rule pb-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-9">
            <p className="kicker mb-6 reveal reveal--1 flex items-center gap-2">
              <Zap size={13} className="fill-[#c4a160] text-[#c4a160]" />
              {t.eyebrow}
            </p>
            <h1 className="display-xl max-w-6xl text-[#eeece5] reveal reveal--2">
              {t.title}
            </h1>
          </div>
          <div className="border-l editorial-rule pl-5 lg:col-span-3 lg:mb-2 reveal reveal--3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[0.7rem] uppercase tracking-[0.1em] mb-1">
              <ShieldCheck size={14} />
              <span>Full EU Work Rights</span>
            </div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] leading-relaxed text-[#a39c91]">
              {t.location}
            </p>
          </div>
        </div>

        {/* Subtitle & Key Action Buttons */}
        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8 reveal reveal--3">
            <p className="editorial-copy max-w-3xl">
              {t.body}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={onOpenRecruiterModal}
                className="group bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold cursor-pointer shadow-lg hover:shadow-[#c4a160]/20"
              >
                <Zap size={16} className="fill-[#11100e]" />
                {t.primary}
              </Button>

              <a href="/cv-oleh-bachara.pdf" download="cv-oleh-bachara.pdf">
                <Button size="lg" variant="secondary" className="group cursor-pointer">
                  {t.secondary}
                  <Download size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              </a>

              <Button
                size="lg"
                variant="outline"
                onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
                className="group cursor-pointer border-white/[0.14] text-[#eeece5] hover:bg-white/[0.05]"
              >
                {t.explore}
                <ArrowDownRight size={16} className="transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end reveal reveal--4">
            <div className="p-4 rounded-xl bg-[#181714] border border-white/[0.08] font-mono text-[0.7rem] uppercase tracking-[0.12em] leading-relaxed text-[#a39c91] space-y-1.5">
              <div className="text-[#c4a160] font-semibold mb-2">Core Specialization:</div>
              <p>• WordPress / Custom PHP</p>
              <p>• Product Catalogues & UX</p>
              <p>• Core Web Vitals (90+)</p>
              <p>• Technical SEO & GA4</p>
            </div>
          </div>
        </div>

        {/* Proof Metrics Bar (Above the fold - HR First-Glance Impact) */}
        <div className="mt-14 pt-10 border-t editorial-rule grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 reveal reveal--4">
          {t.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl bg-[#161513] border border-white/[0.08] hover:border-[#c4a160]/40 transition-colors"
            >
              <div className="font-display text-3xl sm:text-4xl font-bold text-[#eeece5] tracking-tight">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#c4a160] mt-1">
                {m.label}
              </div>
              <div className="text-[11px] font-mono text-[#a39c91] mt-0.5">
                {m.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
