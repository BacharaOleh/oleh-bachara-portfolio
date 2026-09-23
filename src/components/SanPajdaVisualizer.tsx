"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Flame,
  Layers,
  Maximize2,
  ExternalLink,
  Sliders,
  Calendar,
  DollarSign,
  TrendingUp,
  X,
} from "lucide-react";
import type { Lang } from "@/data/portfolio-data";

interface SanPajdaVisualizerProps {
  lang: Lang;
}

interface BlueprintArtifact {
  id: string;
  titleEn: string;
  titlePl: string;
  src: string;
  badgeEn: string;
  badgePl: string;
  descEn: string;
  descPl: string;
}

const SAN_PAJDA_ARTIFACTS: BlueprintArtifact[] = [
  {
    id: "flowchart",
    titleEn: "01. Turbomixer Process & SCADA Flowchart",
    titlePl: "01. Schemat Procesu & Integracji Turbomixer",
    src: "/images/cases/turbomixer-flowchart.png",
    badgeEn: "System Architecture",
    badgePl: "Architektura Systemu",
    descEn:
      "Detailed P&ID process flow coordinating continuous dough aeration, pressure regulation, and oven feed conveyor synchronization.",
    descPl:
      "Szczegółowy schemat P&ID koordynujący napowietrzanie ciasta, regulację ciśnienia oraz synchronizację z przenośnikiem pieca.",
  },
  {
    id: "layout",
    titleEn: "02. Meringue Baking Grid CAD Layout (+33%)",
    titlePl: "02. Kreslenie Rozkładu Blachy Bezów (+33%)",
    src: "/images/cases/meringue-layout-drawing.png",
    badgeEn: "CAD Optimization",
    badgePl: "Optymalizacja CAD",
    descEn:
      "Geometric dense nesting recalculation increasing per-tray payload from 48 to 64 units (+33% throughput) without merge defects.",
    descPl:
      "Geometryczne przeliczenie gęstego upakowania zwiększające wsad blachy z 48 do 64 sztuk (+33% wydajności) bez zlewów.",
  },
  {
    id: "savings",
    titleEn: "03. Thermodynamic Gas Savings Curve (71.1k PLN/yr)",
    titlePl: "03. Krzywe Termodynamiczne Oszczędności Gazu (71.1k PLN)",
    src: "/images/cases/meringue-gas-savings.png",
    badgeEn: "Energy Audit",
    badgePl: "Audyt Energetyczny",
    descEn:
      "Combustion thermal efficiency calculations and PID firing zone modulation delivering 71,124 PLN/year natural gas reduction.",
    descPl:
      "Obliczenia sprawności cieplnej spalania i modulacji stref PID palników przynoszące 71 124 PLN/rok redukcji zużycia gazu.",
  },
  {
    id: "gantt",
    titleEn: "04. Fast-Track 57-Day Commissioning Gantt",
    titlePl: "04. Harmonogram Wdrożenia Gantta (57 Dni)",
    src: "/images/cases/turbomixer-gantt.png",
    badgeEn: "Project Schedule",
    badgePl: "Harmonogram Projektu",
    descEn:
      "Turnkey timeline from electrical cabinet assembly, PLCSIM testing, site wiring to production sign-off in 57 business days.",
    descPl:
      "Ścisły harmonogram od montażu szafy, testów PLCSIM, okablowania po odbiór produkcyjny w 57 dni roboczych.",
  },
  {
    id: "costs",
    titleEn: "05. CAPEX & Component Investment Breakdown (25.4k PLN)",
    titlePl: "05. Zestawienie Kosztów & CAPEX (25.4k PLN)",
    src: "/images/cases/turbomixer-costs.png",
    badgeEn: "CAPEX Budget",
    badgePl: "Budżet Inwestycyjny",
    descEn:
      "Itemized hardware expenditure: Siemens S7 PLC, drives, pressure transducers, and installation under 25,400 PLN direct budget.",
    descPl:
      "Szczegółowy wykaz kosztów sprzętu: sterownik Siemens S7, napędy, przetworniki i montaż w budżecie 25 400 PLN.",
  },
];

const TEXTS = {
  en: {
    kicker: "SCADA & Thermodynamic Optimization Lab",
    title: "Turbomixer Aeration & 3-Zone Gas Oven PID Console",
    subtitle:
      "Interactive supervisory console demonstrating continuous dough aeration control, 3-zone burner PID tuning, and +33% tray geometry optimization.",
    tabScada: "SCADA & PID Console",
    tabDossier: "Verified Blueprints Dossier (5 Artifacts)",
    tabRoi: "Executive ROI & CAPEX Breakdown",
    turbomixerSection: "Turbomixer Continuous Aeration Stage",
    aerationPressure: "Aeration Pressure Setpoint",
    foamDensity: "Resulting Foam Density",
    impellerSpeed: "Mixing Impeller RPM",
    ovenSection: "Continuous Gas Tunnel Oven (3 Zones)",
    zone1: "Zone 1 (Rise & Browning)",
    zone2: "Zone 2 (Core Baking)",
    zone3: "Zone 3 (Dehydration & Crisp)",
    trayGeometry: "Conveyor Tray Packing Geometry",
    legacyTray: "Legacy Layout: 48 units/tray",
    optimizedTray: "Optimized Offset Layout: 64 units/tray (+33%)",
    annualSavings: "Annual Fuel Savings",
    directCapex: "Direct Project CAPEX",
    scheduleDays: "Full Turnkey Schedule",
    pidAutoTune: "PID Flame Modulation: AUTO",
    pidManual: "PID Flame Modulation: MANUAL",
    savingsCounter: "71,124 PLN / year verified gas fuel reduction",
    viewFullSize: "Full size ↗",
    zoomHint: "Click blueprint to expand high-resolution viewer",
    closeModal: "Close viewer",
  },
  pl: {
    kicker: "Laboratorium SCADA & Optymalizacji Termodynamicznej",
    title: "Konsola SCADA Turbomiksera & Regulacji PID Pieca Gazowego",
    subtitle:
      "Interaktywna konsola dyspozytorska demonstrująca ciągłe napowietrzanie ciasta, 3-strefowe strojenie PID palników oraz optymalizację geometryczną blachy (+33%).",
    tabScada: "Konsola SCADA & PID",
    tabDossier: "Zweryfikowane Dossier Kresleń (5 Dokumentów)",
    tabRoi: "Wskaźniki Biznesowe ROI & CAPEX",
    turbomixerSection: "Sekcja Ciągłego Napowietrzania Turbomixer",
    aerationPressure: "Zadane Ciśnienie Napowietrzania",
    foamDensity: "Uzyskana Gęstość Piany",
    impellerSpeed: "Prędkość Obrotowa Mieszadła",
    ovenSection: "Przelotowy Tunelowy Piec Gazowy (3 Strefy)",
    zone1: "Strefa 1 (Wzrost & Zarumienienie)",
    zone2: "Strefa 2 (Wypiek Rdzenia)",
    zone3: "Strefa 3 (Dosuszanie & Kruchość)",
    trayGeometry: "Geometria Rozkładu Bezów na Blasze",
    legacyTray: "Układ Standardowy: 48 szt/blacha",
    optimizedTray: "Układ Przesunięty (Offset): 64 szt/blacha (+33%)",
    annualSavings: "Roczne Oszczędności Gazu",
    directCapex: "Bezpośredni CAPEX Projektu",
    scheduleDays: "Harmonogram «Pod Klucz»",
    pidAutoTune: "Modulacja Palników PID: AUTOMATYCZNA",
    pidManual: "Modulacja Palników PID: RĘCZNA",
    savingsCounter: "71 124 PLN / rok potwierdzonych oszczędności gazu",
    viewFullSize: "Pełny rozmiar ↗",
    zoomHint: "Kliknij rysunek, aby otworzyć powiększenie",
    closeModal: "Zamknij podgląd",
  },
} as const;

export function SanPajdaVisualizer({ lang }: SanPajdaVisualizerProps) {
  const t = TEXTS[lang];
  const [activeTab, setActiveTab] = useState<"scada" | "dossier" | "roi">("scada");
  const [activeArtifactIndex, setActiveArtifactIndex] = useState<number>(0);
  const [lightboxArtifact, setLightboxArtifact] = useState<BlueprintArtifact | null>(null);

  // SCADA parameters
  const [pressureBar, setPressureBar] = useState<number>(3.2);
  const [isOptimizedLayout, setIsOptimizedLayout] = useState<boolean>(true);
  const [isPidAuto, setIsPidAuto] = useState<boolean>(true);

  // Calculated values
  const density = Math.round(520 - pressureBar * 31);
  const throughputBonus = isOptimizedLayout ? 33.3 : 0;
  const gasSavings = isOptimizedLayout && isPidAuto ? 71124 : isOptimizedLayout ? 48500 : 18200;

  // Temperature zones live oscillation
  const [temps, setTemps] = useState({ z1: 160.2, z2: 125.1, z3: 95.3 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTemps({
        z1: Number((160 + (Math.random() - 0.5) * 0.8).toFixed(1)),
        z2: Number((125 + (Math.random() - 0.5) * 0.6).toFixed(1)),
        z3: Number((95 + (Math.random() - 0.5) * 0.4).toFixed(1)),
      });
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const currentArtifact = SAN_PAJDA_ARTIFACTS[activeArtifactIndex];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#161513] p-4 sm:p-7 shadow-2xl space-y-8 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="space-y-2.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 font-mono text-[11px] text-amber-300 uppercase tracking-wider whitespace-nowrap w-fit">
            <Flame size={13} className="animate-pulse shrink-0" />
            <span>{t.kicker}</span>
          </div>
          <h3 className="font-display text-2xl text-[#eeece5] sm:text-3xl font-medium tracking-tight">
            {t.title}
          </h3>
          <p className="text-sm leading-relaxed text-[#b9b4aa]">
            {t.subtitle}
          </p>
        </div>

        {/* Top 3 Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 shrink-0 w-full sm:w-auto min-w-0 max-w-full overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("scada")}
            className={`cursor-pointer px-3.5 py-2 rounded-lg font-mono text-xs transition-colors min-h-[44px] flex items-center gap-2 whitespace-nowrap ${
              activeTab === "scada"
                ? "bg-[#c4a160] text-[#11100e] font-bold"
                : "text-[#a39c91] hover:text-[#eeece5]"
            }`}
          >
            <Sliders size={14} />
            <span>{t.tabScada}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dossier")}
            className={`cursor-pointer px-3.5 py-2 rounded-lg font-mono text-xs transition-colors min-h-[44px] flex items-center gap-2 whitespace-nowrap ${
              activeTab === "dossier"
                ? "bg-[#c4a160] text-[#11100e] font-bold"
                : "text-[#a39c91] hover:text-[#eeece5]"
            }`}
          >
            <Layers size={14} />
            <span>{t.tabDossier}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("roi")}
            className={`cursor-pointer px-3.5 py-2 rounded-lg font-mono text-xs transition-colors min-h-[44px] flex items-center gap-2 whitespace-nowrap ${
              activeTab === "roi"
                ? "bg-[#c4a160] text-[#11100e] font-bold"
                : "text-[#a39c91] hover:text-[#eeece5]"
            }`}
          >
            <TrendingUp size={14} />
            <span>{t.tabRoi}</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: SCADA & PID CONSOLE ── */}
      {activeTab === "scada" && (
        <div className="space-y-8">
          {/* Key Production Stats HUD */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl border border-white/[0.06] bg-black/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#777168] block">
                Line Throughput
              </span>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#c4a160]">
                  +{throughputBonus.toFixed(1)}%
                </span>
                <span className="font-mono text-xs text-[#a39c91]">
                  {isOptimizedLayout ? "64 / tray" : "48 / tray"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.06] bg-black/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#777168] block">
                {t.annualSavings}
              </span>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-400">
                  {gasSavings.toLocaleString()}
                </span>
                <span className="font-mono text-xs text-[#a39c91]">PLN / yr</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.06] bg-black/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#777168] block">
                {t.directCapex}
              </span>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#eeece5]">25,400</span>
                <span className="font-mono text-xs text-[#a39c91]">PLN</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.06] bg-black/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#777168] block">
                {t.scheduleDays}
              </span>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-bold text-cyan-400">57</span>
                <span className="font-mono text-xs text-[#a39c91]">Days</span>
              </div>
            </div>
          </div>

          {/* Interactive SCADA Controls Grid */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Col: Turbomixer Aeration Control (6 cols) */}
            <div className="lg:col-span-6 p-5 rounded-xl border border-white/[0.08] bg-[#0d0c0a] space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 font-mono text-xs">
                <span className="text-[#eeece5] font-semibold uppercase">
                  {t.turbomixerSection}
                </span>
                <span className="text-emerald-400">SIEMENS S7-1200 // RUN</span>
              </div>

              {/* Pressure Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#b9b4aa]">{t.aerationPressure}</span>
                  <span className="text-[#c4a160] font-bold text-sm">{pressureBar.toFixed(1)} bar</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="4.5"
                  step="0.1"
                  value={pressureBar}
                  onChange={(e) => setPressureBar(parseFloat(e.target.value))}
                  className="w-full h-2 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#c4a160]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#777168]">
                  <span>1.5 bar (Loose)</span>
                  <span>3.2 bar (Nominal Meringue)</span>
                  <span>4.5 bar (Dense Sponge)</span>
                </div>
              </div>

              {/* Gauge & Readout */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-lg border border-white/[0.06] bg-black/30">
                  <span className="text-[10px] font-mono uppercase text-[#777168] block">
                    {t.foamDensity}
                  </span>
                  <span className="mt-1 font-display text-2xl font-bold text-cyan-300 block">
                    {density} <span className="text-xs font-mono">g / l</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">Target: 420 g/l ±2%</span>
                </div>

                <div className="p-3.5 rounded-lg border border-white/[0.06] bg-black/30">
                  <span className="text-[10px] font-mono uppercase text-[#777168] block">
                    {t.impellerSpeed}
                  </span>
                  <span className="mt-1 font-display text-2xl font-bold text-amber-400 block">
                    450 <span className="text-xs font-mono">RPM</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#777168]">VFD Inverter 50 Hz</span>
                </div>
              </div>

              {/* PID Flame Modulation Switch */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsPidAuto(!isPidAuto)}
                  className={`cursor-pointer w-full p-3 rounded-lg border text-xs font-mono flex items-center justify-between transition-colors min-h-[44px] ${
                    isPidAuto
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                      : "border-amber-500/40 bg-amber-500/10 text-amber-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Flame size={16} />
                    <span>{isPidAuto ? t.pidAutoTune : t.pidManual}</span>
                  </div>
                  <span className="font-bold">{isPidAuto ? "OPTIMAL STOICHIOMETRIC" : "MANUAL TRIMS"}</span>
                </button>
              </div>
            </div>

            {/* Right Col: 3-Zone Oven & Tray Density Optimizer (6 cols) */}
            <div className="lg:col-span-6 p-5 rounded-xl border border-white/[0.08] bg-[#0d0c0a] space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 font-mono text-xs">
                <span className="text-[#eeece5] font-semibold uppercase">
                  {t.ovenSection}
                </span>
                <span className="text-amber-400">GAS TUNNEL OVEN</span>
              </div>

              {/* 3 Temperature Zones */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                <div className="p-2 sm:p-3 rounded-lg border border-white/[0.06] bg-black/30 text-center">
                  <span className="text-[8.5px] sm:text-[9px] font-mono uppercase text-[#777168] block">ZONE 1</span>
                  <span className="mt-1 font-display text-lg sm:text-xl font-bold text-red-400 block truncate">
                    {temps.z1}°C
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-[#a39c91] truncate block">Rise & Form</span>
                </div>
                <div className="p-2 sm:p-3 rounded-lg border border-white/[0.06] bg-black/30 text-center">
                  <span className="text-[8.5px] sm:text-[9px] font-mono uppercase text-[#777168] block">ZONE 2</span>
                  <span className="mt-1 font-display text-lg sm:text-xl font-bold text-amber-400 block truncate">
                    {temps.z2}°C
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-[#a39c91] truncate block">Core Bake</span>
                </div>
                <div className="p-2 sm:p-3 rounded-lg border border-white/[0.06] bg-black/30 text-center">
                  <span className="text-[8.5px] sm:text-[9px] font-mono uppercase text-[#777168] block">ZONE 3</span>
                  <span className="mt-1 font-display text-lg sm:text-xl font-bold text-[#c4a160] block truncate">
                    {temps.z3}°C
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-mono text-[#a39c91] truncate block">Crisp & Dry</span>
                </div>
              </div>

              {/* Tray Packing Geometry Toggle (+33% Meringues) */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#eeece5] font-semibold">{t.trayGeometry}</span>
                  <span className="text-[#c4a160] font-bold">
                    {isOptimizedLayout ? "+33% CAPACITY" : "BASELINE"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOptimizedLayout(false)}
                    className={`cursor-pointer p-2.5 rounded-lg border text-xs font-mono text-left transition-colors min-h-[44px] ${
                      !isOptimizedLayout
                        ? "border-[#c4a160] bg-[#c4a160]/20 text-[#eeece5] font-bold"
                        : "border-white/10 bg-black/30 text-[#777168] hover:text-[#eeece5]"
                    }`}
                  >
                    <div>{t.legacyTray}</div>
                    <div className="text-[10px] opacity-70">Grid 6 x 8 · Baseline</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsOptimizedLayout(true)}
                    className={`cursor-pointer p-2.5 rounded-lg border text-xs font-mono text-left transition-colors min-h-[44px] ${
                      isOptimizedLayout
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold"
                        : "border-white/10 bg-black/30 text-[#777168] hover:text-[#eeece5]"
                    }`}
                  >
                    <div>{t.optimizedTray}</div>
                    <div className="text-[10px] text-emerald-400">Dense Nesting · +33%</div>
                  </button>
                </div>

                {/* Visual Meringue Tray preview */}
                <div className="relative h-20 w-full rounded-lg bg-black/50 border border-white/5 p-2 overflow-hidden flex items-center justify-center">
                  <div
                    className={`grid gap-1 transition-all duration-300 ${
                      isOptimizedLayout
                        ? "grid-cols-8 scale-95"
                        : "grid-cols-6 scale-90"
                    }`}
                  >
                    {Array.from({ length: isOptimizedLayout ? 32 : 24 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2.5 w-2.5 rounded-full transition-colors ${
                          isOptimizedLayout ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]" : "bg-stone-500"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="absolute bottom-1 right-2 text-[9px] font-mono text-[#777168]">
                    {isOptimizedLayout ? "64 PIECES PER TRAY" : "48 PIECES PER TRAY"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: VERIFIED BLUEPRINTS DOSSIER (5 ARTIFACTS) ── */}
      {activeTab === "dossier" && (
        <div className="space-y-6">
          {/* Micro-Tab Selector for 5 Artifacts */}
          <div className="flex flex-wrap gap-2">
            {SAN_PAJDA_ARTIFACTS.map((artifact, idx) => {
              const isActive = idx === activeArtifactIndex;
              return (
                <button
                  key={artifact.id}
                  type="button"
                  onClick={() => setActiveArtifactIndex(idx)}
                  className={`cursor-pointer px-3.5 py-2 rounded-xl font-mono text-xs transition-all min-h-[44px] flex items-center gap-2 ${
                    isActive
                      ? "bg-[#c4a160]/20 border border-[#c4a160] text-[#c4a160] shadow-[0_0_15px_rgba(196,161,96,0.2)] font-bold"
                      : "bg-[#161513] border border-white/10 text-[#a39c91] hover:text-[#eeece5] hover:border-white/20"
                  }`}
                >
                  <span className="text-[10px] opacity-70">0{idx + 1}.</span>
                  <span>{lang === "pl" ? artifact.badgePl : artifact.badgeEn}</span>
                </button>
              );
            })}
          </div>

          {/* Active Blueprint Preview Card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#161513] p-5 sm:p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#c4a160] block">
                  {lang === "pl" ? currentArtifact.titlePl : currentArtifact.titleEn}
                </span>
                <p className="mt-1 text-xs text-[#b9b4aa] max-w-xl">
                  {lang === "pl" ? currentArtifact.descPl : currentArtifact.descEn}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setLightboxArtifact(currentArtifact)}
                  className="cursor-pointer min-h-[40px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#c4a160]/40 bg-[#c4a160]/10 hover:bg-[#c4a160]/20 font-mono text-xs text-[#c4a160] transition-colors"
                  title={t.zoomHint}
                >
                  <Maximize2 size={13} />
                  <span>{lang === "pl" ? "Powiększ (Zoom)" : "Expand / Zoom"}</span>
                </button>
                <a
                  href={currentArtifact.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.05] hover:bg-white/[0.1] font-mono text-xs text-[#a39c91] hover:text-[#eeece5] transition-colors"
                >
                  <ExternalLink size={12} />
                  <span>{t.viewFullSize}</span>
                </a>
              </div>
            </div>

            {/* Image Viewport */}
            <div
              onClick={() => setLightboxArtifact(currentArtifact)}
              className="group relative mt-4 cursor-zoom-in overflow-hidden rounded-xl border border-white/5 bg-black/40 p-2"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={currentArtifact.src}
                  alt={lang === "pl" ? currentArtifact.titlePl : currentArtifact.titleEn}
                  fill
                  sizes="(max-width: 1024px) 100vw, 750px"
                  priority
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </div>
              <div className="absolute bottom-3 right-3 rounded-lg border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[10px] text-[#b9b4aa] backdrop-blur-md">
                {t.zoomHint}
              </div>
            </div>
          </div>

          {/* Quick Thumbnail Strip */}
          <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-2 sm:gap-3 pt-2 pb-1 w-full max-w-full min-w-0 sm:grid sm:grid-cols-5">
            {SAN_PAJDA_ARTIFACTS.map((art, idx) => (
              <button
                key={art.id}
                type="button"
                onClick={() => setActiveArtifactIndex(idx)}
                className={`cursor-pointer group relative w-[24vw] min-w-[72px] max-w-[120px] sm:w-auto sm:max-w-none shrink-0 snap-center aspect-video overflow-hidden rounded-lg border transition-all min-h-[44px] ${
                  idx === activeArtifactIndex
                    ? "border-[#c4a160] ring-1 ring-[#c4a160]"
                    : "border-white/10 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={art.src} alt={art.titleEn} fill sizes="160px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: EXECUTIVE ROI & CAPEX BREAKDOWN ── */}
      {activeTab === "roi" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#1a1815]">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase mb-2">
                <TrendingUp size={16} />
                <span>ROI Timeline</span>
              </div>
              <div className="font-display text-3xl font-bold text-[#eeece5]">4.3 Months</div>
              <p className="mt-2 text-xs text-[#a39c91] leading-relaxed">
                Full payback of the 25,400 PLN direct CAPEX achieved within 130 calendar days purely through gas burner PID savings.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#1a1815]">
              <div className="flex items-center gap-2 text-[#c4a160] font-mono text-xs uppercase mb-2">
                <DollarSign size={16} />
                <span>Verified Fuel Savings</span>
              </div>
              <div className="font-display text-3xl font-bold text-[#c4a160]">71,124 PLN / yr</div>
              <p className="mt-2 text-xs text-[#a39c91] leading-relaxed">
                Confirmed via industrial gas meter telemetry: -18.4% gas consumption per kg of baked goods under continuous production.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#1a1815]">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-2">
                <Calendar size={16} />
                <span>Strict Delivery Schedule</span>
              </div>
              <div className="font-display text-3xl font-bold text-cyan-400">57 Days Total</div>
              <p className="mt-2 text-xs text-[#a39c91] leading-relaxed">
                Turnkey delivery strictly adhering to the Gantt chart: electrical design, TIA Portal programming, virtual commissioning, and live factory sign-off.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxArtifact && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md"
        >
          <div className="relative flex max-h-[94vh] w-full max-w-6xl flex-col rounded-2xl border border-white/20 bg-[#161513] shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5 bg-black/40">
              <div>
                <h4 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#eeece5]">
                  {lang === "pl" ? lightboxArtifact.titlePl : lightboxArtifact.titleEn}
                </h4>
                <p className="text-[11px] text-[#a39c91] hidden sm:block">
                  {lang === "pl" ? lightboxArtifact.descPl : lightboxArtifact.descEn}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxArtifact.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 font-mono text-xs text-[#eeece5] transition-colors"
                >
                  <ExternalLink size={13} />
                  <span>{t.viewFullSize}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxArtifact(null)}
                  className="cursor-pointer min-h-[36px] min-w-[36px] p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-[#eeece5] transition-colors"
                  aria-label={t.closeModal}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-auto p-4 bg-[#0a0a08] flex items-center justify-center min-h-[300px]">
              <div className="relative w-full h-[68vh]">
                <Image
                  src={lightboxArtifact.src}
                  alt={lightboxArtifact.titleEn}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
