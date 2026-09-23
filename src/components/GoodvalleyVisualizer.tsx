"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  Radio,
  Layers,
  Zap,
  PackageCheck,
  RotateCw,
  Users,
  Warehouse,
} from "lucide-react";
import type { Lang } from "@/data/portfolio-data";

interface GoodvalleyVisualizerProps {
  lang: Lang;
}

const TEXTS = {
  en: {
    kicker: "Industrial Automation & OEE Optimization Lab",
    title: "Conveyor Sensor De-Jitter & High-Speed Packaging Lab",
    subtitle:
      "Interactive simulation of food processing & packaging lines: testing Siemens S7-1500 PLC software debounce filter vs raw electrical contact chatter.",
    tabConveyor: "Conveyor & De-Jitter Lab",
    tabMesWfm: "Plant MES & workTime WFM",
    tabEnergyWms: "Energy Telemetry & Warehouse WMS",
    filterState: "PLC Debounce Filter Mode",
    modeRaw: "Raw Sensor Signal (Before: Jitter & False Stops)",
    modeFiltered: "Filtered S7-1500 Signal (After: 99.4% Stability)",
    injectNoise: "Inject Electrical Noise / Bounce Glitch",
    jitterLabel: "False-Trip Micro-Downtime",
    stabilityLabel: "Conveyor Line OEE Stability",
    signalStatus: "Optical Sensor %I0.3 Real-Time Oscilloscope",
    rawWarning: "Emergency interlock tripped! Micro-stoppage recorded. Line halted.",
    filteredSuccess: "Digital de-jitter filter absorbed 12ms noise glitch. Line running at 140 pkgs/min.",
    lineThroughput: "140 pkgs / min",
    plcScan: "1.8 ms",
    conveyorSpeed: "Conveyor Belt: 0.85 m/s",
    architectureTitle: "Plant-Wide Automation & Dispatching Infrastructure",
    conveyorStep: "01. High-Speed Conveyors",
    conveyorDesc: "Optical & inductive sensor inputs for packaging transfers.",
    plcStep: "02. Siemens S7 PLC & Filter",
    plcDesc: "Software debounce algorithm & interlock coordination.",
    meshStep: "03. Wireless ESP-NOW Mesh",
    meshDesc: "Zero-cabling machine telemetry & energy meter readout.",
    mesStep: "04. MES & workTime WFM",
    mesDesc: "Shift dispatching, spare parts picking & OEE analytics.",
    wfmTitle: "workTime WFM & Shift Dispatching",
    wfmSubtitle: "Shopfloor operator shifts, RFID gate attendance, and leader incident resolution.",
    energyTitle: "Continuous Industrial Energy Telemetry",
    energySubtitle: "Automated digital readouts from high-voltage substation power meters.",
    wmsTitle: "Warehouse WMS & Tool Dispensing",
    wmsSubtitle: "Automated inventory management for line maintenance parts and tooling.",
  },
  pl: {
    kicker: "Laboratorium Automatyzacji & Optymalizacji OEE",
    title: "Filtracja Zakłóceń Czujników (De-Jitter) & Linie Pakowania",
    subtitle:
      "Interaktywna symulacja linii przetwórstwa i pakowania: testowanie cyfrowego filtru programowego Siemens S7-1500 PLC przeciwko drganiom styków i zakłóceniom.",
    tabConveyor: "Laboratorium De-Jitter & Linii",
    tabMesWfm: "Zakładowy MES & workTime WFM",
    tabEnergyWms: "Telemetria Energii & Magazyn WMS",
    filterState: "Tryb Filtru Programowego PLC",
    modeRaw: "Sygnał Surowy (Przed: Drgania & Zatrzymania)",
    modeFiltered: "Sygnał Przefiltrowany S7-1500 (Po: 99.4% stabilności)",
    injectNoise: "Wstrzyknij Zakłócenie Elektryczne (Noise)",
    jitterLabel: "Mikroprzestoje z fałszywych alarmów",
    stabilityLabel: "Stabilność linii produkcyjnej OEE",
    signalStatus: "Oscyloskop Czujnika Optycznego %I0.3 w Czasie Rzeczywistym",
    rawWarning: "Zadziałanie blokady bezpieczeństwa! Zarejestrowano mikroprzestój. Linia zatrzymana.",
    filteredSuccess: "Filtr cyfrowy wytłumił zakłócenie 12ms. Linia pracuje z prędkością 140 op/min.",
    lineThroughput: "140 op / min",
    plcScan: "1.8 ms",
    conveyorSpeed: "Prędkość Taśmy: 0.85 m/s",
    architectureTitle: "Architektura Automatyzacji i Dyspozytorni Zakładu",
    conveyorStep: "01. Szybkie Linie Przenośników",
    conveyorDesc: "Czujniki optyczne i indukcyjne stacji pakowania.",
    plcStep: "02. Siemens S7 PLC i Filtr",
    plcDesc: "Algorytm de-bounce i koordynacja blokad bezpieczeństwa.",
    meshStep: "03. Bezprzewodowy Mesh ESP-NOW",
    meshDesc: "Telemetria bez kabli i zczytywanie liczników energii.",
    mesStep: "04. MES i workTime WFM",
    mesDesc: "Dyspozytornia zmianowa, magazyn części i analityka OEE.",
    wfmTitle: "workTime WFM & Dyspozytornia Zmianowa",
    wfmSubtitle: "Ewidencja czasu pracy operatorów, bramki RFID i obsługa incydentów lidera.",
    energyTitle: "Ciągła Telemetria Liczników Energii",
    energySubtitle: "Automatyczny odczyt cyfrowy z głównych stacji transformatorowych i rozdzielnic.",
    wmsTitle: "Magazyn Części WMS & Pobieranie Narzędzi",
    wmsSubtitle: "Cyfrowa ewidencja i szybkie pobieranie części zamiennych do serwisu linii.",
  },
} as const;

export function GoodvalleyVisualizer({ lang }: GoodvalleyVisualizerProps) {
  const t = TEXTS[lang];
  const [activeTab, setActiveTab] = useState<"conveyor" | "mes" | "energy">("conveyor");
  const [isFilterActive, setIsFilterActive] = useState<boolean>(true);
  const [isLineHalted, setIsLineHalted] = useState<boolean>(false);
  const [wavePoints, setWavePoints] = useState<number[]>([]);
  const [noiseBurst, setNoiseBurst] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(0);

  // Trigger simulated electrical spike / noise
  const handleInjectNoise = () => {
    setNoiseBurst(true);
    if (!isFilterActive) {
      setIsLineHalted(true);
    }
    setTimeout(() => {
      setNoiseBurst(false);
    }, 1200);
  };

  // Reset line if halted
  const handleResetLine = () => {
    setIsLineHalted(false);
  };

  // Oscilloscope generator
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePoints((prev) => {
        const next = [...prev];
        if (next.length > 30) next.shift();

        if (isLineHalted) {
          return [...next, 10]; // Flatline if stopped
        }

        const isPulse = Date.now() % 2200 < 900;
        let val = isPulse ? 80 : 20;

        if (noiseBurst || !isFilterActive) {
          const noise = (Math.random() - 0.5) * (noiseBurst ? 70 : 40);
          val = Math.max(5, Math.min(95, val + noise));
        } else {
          const hum = (Math.random() - 0.5) * 4;
          val = Math.max(5, Math.min(95, val + hum));
        }

        return [...next, Math.round(val)];
      });

      setPulseCount((c) => (c + 1) % 1000);
    }, 110);

    return () => clearInterval(interval);
  }, [isFilterActive, isLineHalted, noiseBurst]);

  const pathD = wavePoints
    .map((pt, i) => {
      const x = (i / 29) * 400;
      const y = 100 - pt;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border border-white/10 bg-[#161513] p-4 sm:p-7 shadow-2xl space-y-8 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="space-y-2.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 font-mono text-[11px] text-amber-300 uppercase tracking-wider whitespace-nowrap w-fit">
            <Activity size={13} className="animate-pulse shrink-0" />
            <span>{t.kicker}</span>
          </div>
          <h3 className="font-display text-2xl text-[#eeece5] sm:text-3xl font-medium tracking-tight">
            {t.title}
          </h3>
          <p className="text-sm leading-relaxed text-[#b9b4aa]">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 shrink-0 w-full sm:w-auto min-w-0 max-w-full overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("conveyor")}
            className={`cursor-pointer px-3.5 py-2 rounded-lg font-mono text-xs transition-colors min-h-[44px] flex items-center gap-2 whitespace-nowrap ${
              activeTab === "conveyor"
                ? "bg-[#c4a160] text-[#11100e] font-bold"
                : "text-[#a39c91] hover:text-[#eeece5]"
            }`}
          >
            <PackageCheck size={14} />
            <span>{t.tabConveyor}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mes")}
            className={`cursor-pointer px-3.5 py-2 rounded-lg font-mono text-xs transition-colors min-h-[44px] flex items-center gap-2 whitespace-nowrap ${
              activeTab === "mes"
                ? "bg-[#c4a160] text-[#11100e] font-bold"
                : "text-[#a39c91] hover:text-[#eeece5]"
            }`}
          >
            <Users size={14} />
            <span>{t.tabMesWfm}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("energy")}
            className={`cursor-pointer px-3.5 py-2 rounded-lg font-mono text-xs transition-colors min-h-[44px] flex items-center gap-2 whitespace-nowrap ${
              activeTab === "energy"
                ? "bg-[#c4a160] text-[#11100e] font-bold"
                : "text-[#a39c91] hover:text-[#eeece5]"
            }`}
          >
            <Zap size={14} />
            <span>{t.tabEnergyWms}</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: CONVEYOR & SENSOR DE-JITTER LAB ── */}
      {activeTab === "conveyor" && (
        <div className="space-y-8">
          {/* Top Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl border border-white/[0.06] bg-black/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#777168] block">
                {t.jitterLabel}
              </span>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span
                  className={`font-display text-2xl sm:text-3xl font-bold transition-colors ${
                    isFilterActive && !isLineHalted ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {isFilterActive ? "-40%" : "+350%"}
                </span>
                <span className="font-mono text-xs text-[#a39c91]">
                  {isFilterActive ? "ELIMINATED" : "CRITICAL"}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.06] bg-black/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#777168] block">
                {t.stabilityLabel}
              </span>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span
                  className={`font-display text-2xl sm:text-3xl font-bold transition-colors ${
                    isFilterActive && !isLineHalted ? "text-[#c4a160]" : "text-red-400"
                  }`}
                >
                  {isFilterActive && !isLineHalted ? "99.4%" : "72.5%"}
                </span>
                <span className="font-mono text-xs text-[#a39c91]">OEE target</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.06] bg-black/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#777168] block">
                Throughput & Cadence
              </span>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-bold text-[#eeece5]">
                  {isLineHalted ? "0" : "140"}
                </span>
                <span className="font-mono text-xs text-[#a39c91]">pkgs / min</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.06] bg-black/20">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#777168] block">
                Siemens S7 Scan Cycle
              </span>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="font-display text-2xl sm:text-3xl font-bold text-amber-400">1.8</span>
                <span className="font-mono text-xs text-[#a39c91]">ms</span>
              </div>
            </div>
          </div>

          {/* Interactive Conveyor Line Visualizer */}
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0d0c0a] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#eeece5] font-semibold uppercase">
                <PackageCheck size={16} className="text-amber-400 shrink-0" />
                <span>HIGH-SPEED PACKAGING LINE CONVEYOR</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleInjectNoise}
                  className="cursor-pointer flex-1 sm:flex-none justify-center min-h-[44px] px-3.5 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 font-mono text-xs text-amber-300 transition-all flex items-center gap-1.5"
                >
                  <Zap size={13} className="shrink-0" />
                  <span>{t.injectNoise}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsFilterActive(!isFilterActive);
                    setIsLineHalted(false);
                  }}
                  className={`cursor-pointer flex-1 sm:flex-none justify-center min-h-[44px] px-3.5 py-1.5 rounded-lg border font-mono text-xs transition-all active:scale-95 flex items-center gap-2 ${
                    isFilterActive
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                      : "border-red-500/50 bg-red-500/10 text-red-300"
                  }`}
                >
                  <RotateCw size={13} className="shrink-0" />
                  <span>{isFilterActive ? "FILTER: ON" : "FILTER: OFF"}</span>
                </button>

                {isLineHalted && (
                  <button
                    type="button"
                    onClick={handleResetLine}
                    className="cursor-pointer w-full sm:w-auto justify-center min-h-[44px] px-3.5 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/20 font-mono text-xs text-cyan-300 transition-all animate-pulse"
                  >
                    RESET INTERLOCK
                  </button>
                )}
              </div>
            </div>

            {/* Conveyor Canvas Simulation */}
            <div className="relative h-32 w-full overflow-hidden rounded-lg bg-black/60 border border-white/[0.05] p-3 flex flex-col justify-between">
              {/* Conveyor track */}
              <div className="relative h-12 w-full mt-4 flex items-center border-y-2 border-stone-600 bg-stone-900/60 overflow-hidden">
                {/* Rollers */}
                <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="h-full w-1 border-r border-white/40" />
                  ))}
                </div>

                {/* Moving Packages */}
                {!isLineHalted && (
                  <div className="absolute inset-0 flex items-center gap-16 animate-[marquee_4s_linear_infinite]">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-12 rounded bg-amber-600/80 border border-amber-400 flex items-center justify-center shrink-0 shadow-md text-[9px] font-mono text-white font-bold"
                      >
                        BOX
                      </div>
                    ))}
                  </div>
                )}

                {isLineHalted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-950/80 backdrop-blur-xs border border-red-500">
                    <span className="font-mono text-xs font-bold text-red-400 flex items-center gap-2">
                      <AlertTriangle size={15} />
                      EMERGENCY INTERLOCK STOPPED LINE // SENSOR BOUNCE TRIPPED
                    </span>
                  </div>
                )}

                {/* Photo-eye optical sensor gate beam */}
                <div className="absolute left-[45%] top-0 bottom-0 w-1 bg-cyan-400/80 shadow-[0_0_12px_#38bdf8] pointer-events-none z-10" />
                <div className="absolute left-[45%] -top-2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 border border-cyan-400/50 text-[9px] font-mono text-cyan-300 z-20">
                  %I0.3 SENSOR
                </div>
              </div>

              {/* Status bar under conveyor */}
              <div className="flex items-center justify-between text-[10px] font-mono text-[#777168]">
                <span>{t.conveyorSpeed}</span>
                <span className={isFilterActive ? "text-emerald-400" : "text-amber-400"}>
                  {isFilterActive
                    ? "DIGITAL FILTER: ACTIVE (<15ms BUFFER)"
                    : "UNFILTERED RAW SENSOR INPUT"}
                </span>
                <span>CADENCE: 140 PKGS/MIN</span>
              </div>
            </div>

            {/* Oscilloscope Viewport */}
            <div className="rounded-lg border border-white/[0.06] bg-black/70 p-4 space-y-3">
              <div className="flex justify-between items-center text-xs font-mono text-[#a39c91]">
                <div className="flex items-center gap-2">
                  <Activity size={14} className={isFilterActive ? "text-emerald-400" : "text-red-400"} />
                  <span className="text-[#eeece5] font-semibold">{t.signalStatus}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="text-emerald-400">CH-1 DIGITAL</span>
                  <span className="text-[#777168]">CYCLE #{pulseCount}</span>
                </div>
              </div>

              <div className="relative h-36 w-full overflow-hidden rounded bg-black/90 border border-white/[0.04]">
                {/* Grid */}
                <svg className="absolute inset-0 h-full w-full opacity-15 pointer-events-none">
                  <defs>
                    <pattern id="gv-grid" width="30" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 20" fill="none" stroke="#4ade80" strokeWidth="0.5" strokeDasharray="1,3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#gv-grid)" />
                </svg>

                {/* Oscilloscope Beam */}
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isFilterActive ? "#10b981" : "#ef4444"}
                    strokeWidth="3"
                    opacity="0.3"
                  />
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isFilterActive ? "#34d399" : "#f87171"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Status callout */}
              <div
                className={`p-3 rounded-lg border text-xs leading-relaxed flex items-start gap-2.5 transition-colors ${
                  isFilterActive && !isLineHalted
                    ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-200"
                    : "border-red-500/30 bg-red-500/[0.08] text-red-200"
                }`}
              >
                {isFilterActive && !isLineHalted ? (
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                )}
                <span>{isFilterActive && !isLineHalted ? t.filteredSuccess : t.rawWarning}</span>
              </div>
            </div>
          </div>

          {/* 4 Infrastructure Steps */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#c4a160] mb-4 flex items-center gap-2">
              <Layers size={14} />
              <span>{t.architectureTitle}</span>
            </h4>

            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#1a1815] hover:border-[#c4a160]/40 transition-colors">
                <div className="flex items-center justify-between text-xs text-[#777168] font-mono mb-2">
                  <PackageCheck size={16} className="text-amber-400" />
                  <span>STEP 01</span>
                </div>
                <h5 className="font-display text-base text-[#eeece5] font-medium">{t.conveyorStep}</h5>
                <p className="mt-1.5 text-xs text-[#a39c91] leading-relaxed">{t.conveyorDesc}</p>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#1a1815] hover:border-[#c4a160]/40 transition-colors">
                <div className="flex items-center justify-between text-xs text-[#777168] font-mono mb-2">
                  <Cpu size={16} className="text-cyan-400" />
                  <span>STEP 02</span>
                </div>
                <h5 className="font-display text-base text-[#eeece5] font-medium">{t.plcStep}</h5>
                <p className="mt-1.5 text-xs text-[#a39c91] leading-relaxed">{t.plcDesc}</p>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#1a1815] hover:border-[#c4a160]/40 transition-colors">
                <div className="flex items-center justify-between text-xs text-[#777168] font-mono mb-2">
                  <Radio size={16} className="text-emerald-400" />
                  <span>STEP 03</span>
                </div>
                <h5 className="font-display text-base text-[#eeece5] font-medium">{t.meshStep}</h5>
                <p className="mt-1.5 text-xs text-[#a39c91] leading-relaxed">{t.meshDesc}</p>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#1a1815] hover:border-[#c4a160]/40 transition-colors">
                <div className="flex items-center justify-between text-xs text-[#777168] font-mono mb-2">
                  <Zap size={16} className="text-purple-400" />
                  <span>STEP 04</span>
                </div>
                <h5 className="font-display text-base text-[#eeece5] font-medium">{t.mesStep}</h5>
                <p className="mt-1.5 text-xs text-[#a39c91] leading-relaxed">{t.mesDesc}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: PLANT MES & WORKTIME WFM ── */}
      {activeTab === "mes" && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0d0c0a] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h4 className="font-display text-lg text-[#eeece5]">{t.wfmTitle}</h4>
                <p className="text-xs text-[#a39c91]">{t.wfmSubtitle}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
                SHIFT: ACTIVE (24/7 ROTATION)
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-lg border border-white/[0.06] bg-black/30">
                <span className="text-[10px] font-mono uppercase text-[#777168] block">Operators on Shift</span>
                <span className="mt-1 font-display text-2xl font-bold text-[#eeece5] block">42 Active</span>
                <span className="text-[10px] font-mono text-emerald-400">Zero Punch Loss Standard</span>
              </div>
              <div className="p-4 rounded-lg border border-white/[0.06] bg-black/30">
                <span className="text-[10px] font-mono uppercase text-[#777168] block">Packaging Lines Synced</span>
                <span className="mt-1 font-display text-2xl font-bold text-amber-400 block">6 Continuous Lines</span>
                <span className="text-[10px] font-mono text-[#a39c91]">Przechlewo Complex</span>
              </div>
              <div className="p-4 rounded-lg border border-white/[0.06] bg-black/30">
                <span className="text-[10px] font-mono uppercase text-[#777168] block">Line Micro-Stoppages</span>
                <span className="mt-1 font-display text-2xl font-bold text-emerald-400 block">-40% Verified</span>
                <span className="text-[10px] font-mono text-[#a39c91]">99.4% Line Stability</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: ENERGY TELEMETRY & WAREHOUSE WMS ── */}
      {activeTab === "energy" && (
        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0d0c0a] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#c4a160] uppercase">
                <Zap size={15} />
                <span>{t.energyTitle}</span>
              </div>
              <p className="text-xs text-[#a39c91] leading-relaxed">{t.energySubtitle}</p>
              <div className="p-4 rounded-lg border border-white/[0.06] bg-black/40 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#777168]">Transformer Cell A:</span>
                  <span className="text-[#eeece5] font-bold">412.4 kW (Active)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777168]">Packaging Zone Power:</span>
                  <span className="text-emerald-400 font-bold">148.6 kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777168]">Power Factor (cos φ):</span>
                  <span className="text-cyan-300 font-bold">0.96 (Optimal)</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0d0c0a] space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-purple-400 uppercase">
                <Warehouse size={15} />
                <span>{t.wmsTitle}</span>
              </div>
              <p className="text-xs text-[#a39c91] leading-relaxed">{t.wmsSubtitle}</p>
              <div className="p-4 rounded-lg border border-white/[0.06] bg-black/40 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#777168]">Spare Parts Tracked:</span>
                  <span className="text-[#eeece5] font-bold">1,840 Items</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777168]">Maintenance Tooling:</span>
                  <span className="text-purple-300 font-bold">Digital Barcode Scan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#777168]">Picking Time / Tech:</span>
                  <span className="text-emerald-400 font-bold">&lt; 90 Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
