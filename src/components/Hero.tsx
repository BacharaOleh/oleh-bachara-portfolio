"use client";

import Link from "next/link";
import { ArrowDownRight, Download, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";
import { trackIntent } from "@/lib/intent-tracker";
import type { Lang } from "@/data/portfolio-data";

interface HeroProps {
  lang: Lang;
  onOpenRecruiterModal: () => void;
}

const COPY = {
  en: {
    eyebrow: "⚡ CTO & Lead Hardware, Embedded Systems & Full-Stack Architect",
    title: "Precision Hardware, Distributed Mesh & Real-Time Industrial MES Platforms.",
    leadPart1: "I build complete industrial IoT and robotics systems from hardware to cloud: autonomous ",
    meshLinkText: "wireless mesh networks",
    leadPart2: ", precision automated machinery, and real-time factory dashboards (MES) that cut operating costs and eliminate production downtime.",
    primary: "Explore Case Studies",
    brief: "⚡ Executive Brief (1 min)",
    secondary: "Download CV (PDF)",
    location: "Przechlewo, Poland · Remote EU / Hybrid",
    metrics: [
      { value: "6+ Years", label: "Engineering Heritage", detail: "Mechanics, CNC & Embedded" },
      { value: "Full-Cycle", label: "Hardware to Cloud", detail: "CAD/PCB → Linux → React MES" },
      { value: "<10ms", label: "Mesh Latency", detail: "Sub-10ms P2P ESP-NOW delivery" },
      { value: "+33% OEE", label: "Plant Optimization", detail: "San-Pajda & Goodvalley lines" },
    ],
  },
  pl: {
    eyebrow: "⚡ CTO & Główny Inżynier Hardware, Systemów Wbudowanych i Full-Stack",
    title: "Precyzyjny Hardware, Rozproszony Mesh & Przemysłowe Platformy MES.",
    leadPart1: "Buduję kompletne systemy IoT i robotyki przemysłowej od sprzętu po chmurę: autonomiczne ",
    meshLinkText: "bezprzewodowe sieci kratowe (mesh)",
    leadPart2: ", precyzyjne maszyny automatyczne oraz systemy monitorowania produkcji (MES), które redukują koszty operacyjne i eliminują przestoje.",
    primary: "Zobacz Case Studies",
    brief: "⚡ Executive Brief (1 min)",
    secondary: "Pobierz CV (PDF)",
    location: "Przechlewo, Polska · Zdalnie w UE / Hybryda",
    metrics: [
      { value: "6+ Lat", label: "Zaplecze Inżynieryjne", detail: "Mechanika, CNC i Embedded" },
      { value: "Full-Cycle", label: "Od Sprzętu do Chmury", detail: "CAD/PCB → Linux → React MES" },
      { value: "<10ms", label: "Opóźnienie Mesh", detail: "Transmisja P2P ESP-NOW <10ms" },
      { value: "+33% OEE", label: "Optymalizacja Linii", detail: "Linie San-Pajda & Goodvalley" },
    ],
  },
} as const;

export function Hero({ lang, onOpenRecruiterModal }: HeroProps) {
  const t = COPY[lang];
  const cvFile = lang === "pl" ? "cv-roman-deyneko-pl.pdf" : "cv-roman-deyneko-en.pdf";

  return (
    <section id="top" className="hero-section scroll-mt-20 pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pb-20 overflow-hidden w-full max-w-full">
      <div className="container-custom">
        {/* Top Ornament */}
        <div className="hero-ornament flex-wrap gap-2 mb-3.5 sm:mb-5" aria-hidden="true">
          <BrandMark />
          <span className="break-words sm:break-normal">01 — 04 / HARDWARE, EMBEDDED & INDUSTRIAL MES</span>
        </div>

        {/* Headline & Location */}
        <div className="grid items-end gap-6 sm:gap-8 border-b editorial-rule pb-7 sm:pb-9 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-3.5 reveal reveal--1">
              <a
                href="#vectors"
                className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium bg-[#c4a160]/10 hover:bg-[#c4a160]/15 active:scale-[0.98] text-[#eeece5] border border-[#c4a160]/25 transition-all group cursor-pointer min-h-[36px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#c4a160] animate-pulse shrink-0" />
                <span className="text-[#c4a160] font-semibold shrink-0">
                  {lang === "pl" ? "Wektory Inżynieryjne:" : "Core Vectors:"}
                </span>
                <span className="text-[#b9b4aa]">
                  {lang === "pl"
                    ? "Edge AI · WFM & MES · Cyber-Physical KD · Telemetria"
                    : "Edge AI · WFM & MES · Cyber-Physical KD · Telemetry"}
                </span>
                <span className="text-[#a39c91] group-hover:text-[#c4a160] transition-colors shrink-0">
                  ↓
                </span>
              </a>
            </div>
            <p className="kicker mb-2.5 sm:mb-3 reveal reveal--1 flex items-center gap-2">
              <Zap size={13} className="fill-[#c4a160] text-[#c4a160] shrink-0" />
              <span>{t.eyebrow}</span>
            </p>
            <h1 className="display-xl max-w-5xl text-[#eeece5] reveal reveal--2">
              {t.title}
            </h1>
          </div>
          <div className="border-l editorial-rule pl-4 sm:pl-5 lg:col-span-3 lg:mb-1 reveal reveal--3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[0.7rem] uppercase tracking-[0.1em] mb-1">
              <ShieldCheck size={14} className="shrink-0" />
              <span>Full EU Work Rights</span>
            </div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] leading-relaxed text-[#a39c91]">
              {t.location}
            </p>
          </div>
        </div>

        {/* Subtitle & Key Action Buttons */}
        <div className="grid gap-6 sm:gap-8 pt-6 sm:pt-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8 reveal reveal--3">
            <p className="editorial-copy max-w-3xl leading-relaxed">
              {t.leadPart1}
              <Link
                href="/mesh"
                className="inline-flex items-center gap-1.5 text-[#c4a160] hover:text-[#dfc282] underline underline-offset-4 decoration-[#c4a160]/40 hover:decoration-[#c4a160] font-medium transition-all group/mesh py-0.5"
                title={lang === "pl" ? "Zobacz interaktywną prezentację sieci mesh" : "View interactive mesh network demonstration"}
              >
                <span>{t.meshLinkText}</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#c4a160]/15 text-[#c4a160] border border-[#c4a160]/30 group-hover/mesh:bg-[#c4a160]/25 group-hover/mesh:border-[#c4a160]/60 transition-all">
                  ↗ visual demo
                </span>
              </Link>
              {t.leadPart2}
            </p>

            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              {/* Primary: Direct Engineering Impact */}
              <Button
                size="lg"
                onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto justify-center group bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold cursor-pointer shadow-lg hover:shadow-[#c4a160]/20 min-h-[44px]"
              >
                <span>{t.primary}</span>
                <ArrowDownRight size={16} className="transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
              </Button>

              {/* High-Level Executive Brief */}
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  trackIntent("recruiter_modal_open", "⚡ Executive Brief (Hero)");
                  onOpenRecruiterModal();
                }}
                className="w-full sm:w-auto justify-center group cursor-pointer border border-[#c4a160]/30 bg-[#c4a160]/10 hover:bg-[#c4a160]/20 text-[#c4a160] font-mono text-xs font-semibold min-h-[44px]"
              >
                <Zap size={14} className="fill-[#c4a160]" />
                <span>{t.brief}</span>
              </Button>

              {/* CV Download */}
              <a
                href={`/${cvFile}`}
                download={cvFile}
                onClick={() => trackIntent("cv_download", `CV Download (Hero - ${lang.toUpperCase()})`, cvFile)}
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full sm:w-auto justify-center group cursor-pointer border-white/[0.14] text-[#eeece5] hover:bg-white/[0.05] font-mono text-xs min-h-[44px]">
                  <Download size={14} />
                  <span>{t.secondary}</span>
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end reveal reveal--4">
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#181714] border border-white/[0.08] font-mono text-[0.7rem] uppercase tracking-[0.12em] leading-relaxed text-[#a39c91] space-y-1.5">
              <div className="text-[#c4a160] font-semibold mb-1.5">Core Specialization:</div>
              <p>• Industrial Mesh IoT & Edge Gateways</p>
              <p>• Factory I/O 3D & Virtual Commissioning</p>
              <p>• Real-Time MES Dashboards (60 FPS Canvas)</p>
              <p>• Plant PLC Automation (Siemens S7)</p>
            </div>
          </div>
        </div>

        {/* Proof Metrics Bar (Above the fold - HR First-Glance Impact) */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t editorial-rule grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 reveal reveal--4">
          {t.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-2.5 min-[360px]:p-3 sm:p-4 rounded-xl bg-[#161513] border border-white/[0.08] hover:border-[#c4a160]/40 transition-colors flex flex-col justify-between"
            >
              <div className="font-display text-[1.35rem] min-[360px]:text-2xl sm:text-3xl lg:text-4xl font-bold text-[#eeece5] tracking-tight leading-none">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-[#c4a160] mt-1.5">
                {m.label}
              </div>
              <div className="text-[10px] min-[360px]:text-[10.5px] sm:text-[11px] font-mono text-[#a39c91] mt-0.5 leading-snug">
                {m.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
