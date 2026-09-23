"use client";

import { useState, useEffect } from "react";
import {
  Server,
  Gauge,
  Clock,
  Layers,
  Send,
} from "lucide-react";
import type { Lang } from "@/data/portfolio-data";

interface MesCanvasVisualizerProps {
  lang: Lang;
}

type MachineState = "RUNNING" | "IDLE" | "MAINTENANCE" | "SETUP";

interface Station {
  id: string;
  name: string;
  type: string;
  x: number; // percentage
  y: number; // percentage
  status: MachineState;
  spindleRpm: number;
  tempC: number;
  toolWear: number; // 0-100%
  vibration: number; // mm/s
  currentJob: string;
  operator: string;
}

const INITIAL_STATIONS: Station[] = [
  {
    id: "cnc-01",
    name: "CNC 5-Axis Milling Station 01",
    type: "Milling Cell",
    x: 18,
    y: 32,
    status: "RUNNING",
    spindleRpm: 12000,
    tempC: 48.5,
    toolWear: 18,
    vibration: 0.24,
    currentJob: "JOB-4891 // Titanium Flange",
    operator: "M. Kowalski (OP-28)",
  },
  {
    id: "cnc-02",
    name: "CNC 3-Axis Heavy Mill 02",
    type: "Milling Cell",
    x: 50,
    y: 32,
    status: "RUNNING",
    spindleRpm: 8400,
    tempC: 52.1,
    toolWear: 42,
    vibration: 0.38,
    currentJob: "JOB-4893 // Steel Gearbox Housing",
    operator: "A. Nowak (OP-14)",
  },
  {
    id: "laser-01",
    name: "Fiber Laser Cutting Station",
    type: "Sheet Metal Cell",
    x: 82,
    y: 32,
    status: "RUNNING",
    spindleRpm: 0,
    tempC: 34.2,
    toolWear: 8,
    vibration: 0.12,
    currentJob: "JOB-4895 // 3mm Aluminum Enclosures",
    operator: "P. Wiśniewski (OP-09)",
  },
  {
    id: "assembly-01",
    name: "Precision Assembly & Wiring Bench",
    type: "Manual Workstation",
    x: 30,
    y: 72,
    status: "RUNNING",
    spindleRpm: 0,
    tempC: 22.4,
    toolWear: 0,
    vibration: 0.05,
    currentJob: "JOB-4889 // Wire Harness Integration",
    operator: "K. Lewandowska (OP-31)",
  },
  {
    id: "qc-01",
    name: "Optical & CMM Inspection Station",
    type: "Quality Control",
    x: 70,
    y: 72,
    status: "IDLE",
    spindleRpm: 0,
    tempC: 21.0,
    toolWear: 0,
    vibration: 0.02,
    currentJob: "QUEUE // Ready for Flange Batch",
    operator: "J. Kamiński (QC-04)",
  },
];

const TEXTS = {
  en: {
    kicker: "Live MES Digital Twin & Dispatch Engine",
    title: "Real-Time 2D Shopfloor Canvas & Machine Telemetry",
    subtitle:
      "Interactive 2D digital twin modeled after Roman's factory & workTime MES platform: React 19 Canvas frontend + FastAPI async order dispatching.",
    tabCanvas: "2D Digital Twin Canvas",
    tabOrderSla: "Order Stream & SLA Dispatch",
    tabArchitecture: "FastAPI & Edge Architecture",
    dispatchBtn: "Dispatch New Production Job ⚡",
    dispatchSuccess: "Order dispatched to CNC Cell 01. SLA timer started (<12h).",
    slaTitle: "Same-Day Parcel Dispatch SLA (<12 Hours)",
    slaStatus: "94.8% on schedule (Avg Dispatch: 6.4h)",
    clickPrompt: "Click any machine on the shopfloor map to view real-time telemetry HUD",
    telemetryTitle: "Station Telemetry HUD",
    spindleSpeed: "Spindle Speed",
    temperature: "Spindle / Tool Temp",
    toolWear: "Tool Wear Margin",
    vibration: "Vibration / Jitter",
    activeJob: "Current Job Queue",
    operator: "Operator",
    telemetryStream: "Telemetry Streaming: 100ms WebSockets via Raspberry Pi Edge Gateway",
    architectureTitle: "MES Platform Architectural Layers",
    layer1Title: "React 19 Canvas Engine",
    layer1Desc: "Zero-dependency custom 2D canvas engine with smooth 60fps pan & zoom.",
    layer2Title: "FastAPI Async Dispatch",
    layer2Desc: "Non-blocking order queues, job routing, and machine load balancing.",
    layer3Title: "Edge Telemetry Daemon",
    layer3Desc: "Raspberry Pi RS485 & Modbus TCP telemetry bridges streaming live states.",
    layer4Title: "workTime WFM & SLA",
    layer4Desc: "Worker shifts, RFID gate punches, and courier dispatch handovers.",
  },
  pl: {
    kicker: "Cyfrowy Bliźniak MES & Silnik Dyspozytorski Live",
    title: "Interaktywny Plan Hali 2D Canvas & Telemetria Maszyn",
    subtitle:
      "Interaktywny cyfrowy bliźniak oparty na autorskiej architekturze factory oraz platformie MES workTime: silnik React 19 Canvas + asynchroniczny backend FastAPI.",
    tabCanvas: "Cyfrowy Bliźniak 2D Canvas",
    tabOrderSla: "Strumień Zleceń & SLA Wysyłki",
    tabArchitecture: "Architektura FastAPI & Edge",
    dispatchBtn: "Zleć Nowe Zadanie Produkcyjne ⚡",
    dispatchSuccess: "Zlecenie przekazane do gniazda CNC 01. Timer SLA uruchomiony (<12h).",
    slaTitle: "SLA Realizacji i Wysyłki Paczki w Ten Sam Dzień (<12 Godzin)",
    slaStatus: "94.8% zamówień w terminie (Średni czas: 6.4h)",
    clickPrompt: "Kliknij dowolną maszynę na planie hali, aby wyświetlić telemetrię na żywo",
    telemetryTitle: "Panel Telemetrii Stanowiska (HUD)",
    spindleSpeed: "Prędkość wrzeciona",
    temperature: "Temperatura narzędzia/wrzeciona",
    toolWear: "Zużycie narzędzia",
    vibration: "Wibracje i stabilność",
    activeJob: "Bieżące zlecenie",
    operator: "Operator stanowiska",
    telemetryStream: "Strumieniowanie telemetrii: WebSockets (100ms) przez Raspberry Pi Edge",
    architectureTitle: "Warstwy Architektury Platformy MES",
    layer1Title: "Silnik React 19 Canvas",
    layer1Desc: "Autorski silnik 2D Canvas bez zewnętrznych bibliotek, 60fps na urządzeniach mobilnych.",
    layer2Title: "Asynchroniczny FastAPI",
    layer2Desc: "Nieblokujące kolejki zleceń, routing zadań i równoważenie obciążeń maszyn.",
    layer3Title: "Demon Edge Telemetrii",
    layer3Desc: "Bramka Raspberry Pi z magistralami RS485 i Modbus TCP przesyłająca stany live.",
    layer4Title: "workTime WFM & SLA",
    layer4Desc: "Dyspozytornia zmian, rejestracja RFID oraz odprawa przesyłek kurierskich.",
  },
} as const;

export function MesCanvasVisualizer({ lang }: MesCanvasVisualizerProps) {
  const t = TEXTS[lang];
  const [activeTab, setActiveTab] = useState<"canvas" | "orders" | "arch">("canvas");
  const [selectedStation, setSelectedStation] = useState<Station>(INITIAL_STATIONS[0]);
  const [stations, setStations] = useState<Station[]>(INITIAL_STATIONS);
  const [dispatchNotice, setDispatchNotice] = useState<string | null>(null);
  const [activeJobStep, setActiveJobStep] = useState<number>(0);

  // Oscillate live numbers
  useEffect(() => {
    const timer = setInterval(() => {
      setStations((prev) =>
        prev.map((st) => {
          if (st.status !== "RUNNING") return st;
          const rpmDelta = (Math.random() - 0.5) * 70;
          const tempDelta = (Math.random() - 0.5) * 0.4;
          const vibDelta = (Math.random() - 0.5) * 0.02;
          return {
            ...st,
            spindleRpm: Math.max(0, Math.round(st.spindleRpm + rpmDelta)),
            tempC: Number((st.tempC + tempDelta).toFixed(1)),
            vibration: Number(Math.max(0.01, st.vibration + vibDelta).toFixed(2)),
          };
        })
      );
    }, 900);

    return () => clearInterval(timer);
  }, []);

  // Dispatch new job action
  const handleDispatchJob = () => {
    const jobNum = Math.floor(1000 + Math.random() * 9000);
    setDispatchNotice(`JOB-${jobNum} // Urgent Flange Batch`);
    setActiveJobStep(1);

    setTimeout(() => setActiveJobStep(2), 1200);
    setTimeout(() => setActiveJobStep(3), 2400);
    setTimeout(() => setActiveJobStep(4), 3600);
    setTimeout(() => {
      setActiveJobStep(0);
      setDispatchNotice(null);
    }, 5200);
  };

  const currentStation = stations.find((s) => s.id === selectedStation.id) || selectedStation;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#161513] p-4 sm:p-7 shadow-2xl space-y-8 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
        <div className="space-y-2.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-[11px] text-emerald-300 uppercase tracking-wider whitespace-nowrap w-fit">
            <Server size={13} className="animate-pulse shrink-0" />
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
            onClick={() => setActiveTab("canvas")}
            className={`cursor-pointer px-3.5 py-2 rounded-lg font-mono text-xs transition-colors min-h-[44px] flex items-center gap-2 whitespace-nowrap ${
              activeTab === "canvas"
                ? "bg-[#c4a160] text-[#11100e] font-bold"
                : "text-[#a39c91] hover:text-[#eeece5]"
            }`}
          >
            <Gauge size={14} />
            <span>{t.tabCanvas}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`cursor-pointer px-3.5 py-2 rounded-lg font-mono text-xs transition-colors min-h-[44px] flex items-center gap-2 whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-[#c4a160] text-[#11100e] font-bold"
                : "text-[#a39c91] hover:text-[#eeece5]"
            }`}
          >
            <Clock size={14} />
            <span>{t.tabOrderSla}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("arch")}
            className={`cursor-pointer px-3.5 py-2 rounded-lg font-mono text-xs transition-colors min-h-[44px] flex items-center gap-2 whitespace-nowrap ${
              activeTab === "arch"
                ? "bg-[#c4a160] text-[#11100e] font-bold"
                : "text-[#a39c91] hover:text-[#eeece5]"
            }`}
          >
            <Layers size={14} />
            <span>{t.tabArchitecture}</span>
          </button>
        </div>
      </div>

      {/* ── TAB 1: 2D DIGITAL TWIN CANVAS ── */}
      {activeTab === "canvas" && (
        <div className="space-y-8">
          {/* Dispatch Trigger Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-white/[0.08] bg-black/30">
            <div>
              <div className="text-xs font-mono uppercase text-[#c4a160] tracking-wider">
                Production Queue Dispatcher
              </div>
              <div className="text-xs text-[#a39c91] mt-0.5">
                {dispatchNotice ? (
                  <span className="text-emerald-400 font-bold animate-pulse">
                    ⚡ {t.dispatchSuccess} [{dispatchNotice}]
                  </span>
                ) : (
                  "Test automated order ingestion through machine tool queues"
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleDispatchJob}
              className="cursor-pointer min-h-[44px] px-4 py-2 rounded-xl border border-[#c4a160] bg-[#c4a160]/20 hover:bg-[#c4a160]/30 font-mono text-xs font-bold text-[#c4a160] transition-all shadow-[0_0_15px_rgba(196,161,96,0.2)] flex items-center gap-2 shrink-0"
            >
              <Send size={14} />
              <span>{t.dispatchBtn}</span>
            </button>
          </div>

          {/* Shopfloor Canvas Split Grid */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* 2D Canvas Map (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#0d0c0a] p-4 sm:p-5">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs font-mono text-[#a39c91]">
                <span className="uppercase text-[#eeece5] font-semibold">
                  SHOPFLOOR 2D DIGITAL TWIN MAP
                </span>
                <span className="text-[11px] text-emerald-400">ENGINE: 60 FPS CANVAS</span>
              </div>

              <p className="mt-2 text-[11px] font-mono text-[#777168]">
                {t.clickPrompt}
              </p>

              {/* Interactive Shopfloor Visualizer */}
              <div className="relative mt-4 h-64 sm:h-72 w-full overflow-hidden rounded-lg bg-black/80 border border-white/[0.06] p-4">
                {/* Grid */}
                <svg
                  className="absolute inset-0 h-full w-full opacity-15 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="mes-grid-canvas" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#eab308" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mes-grid-canvas)" />
                </svg>

                {/* Animated Order Transit Pulse */}
                {activeJobStep > 0 && (
                  <div
                    className="absolute z-30 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full bg-emerald-400 shadow-[0_0_15px_#34d399] transition-all duration-1000 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
                    style={{
                      left:
                        activeJobStep === 1
                          ? "82%"
                          : activeJobStep === 2
                          ? "18%"
                          : activeJobStep === 3
                          ? "30%"
                          : "70%",
                      top:
                        activeJobStep === 1
                          ? "32%"
                          : activeJobStep === 2
                          ? "32%"
                          : activeJobStep === 3
                          ? "72%"
                          : "72%",
                    }}
                  >
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white animate-ping" />
                  </div>
                )}

                {/* Aisle pathway */}
                <div className="absolute top-[52%] left-4 right-4 h-6 border-y border-dashed border-white/10 flex items-center justify-center pointer-events-none">
                  <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-[#777168]/40 truncate">
                    AGV & OPERATOR LOGISTICS AISLE 01
                  </span>
                </div>

                {/* Interactive Stations */}
                {stations.map((st) => {
                  const isSelected = st.id === currentStation.id;
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSelectedStation(st)}
                      style={{
                        left: `${st.x}%`,
                        top: `${st.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className={`cursor-pointer absolute p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border transition-all text-left group min-w-[85px] sm:min-w-[140px] max-w-[105px] sm:max-w-none shadow-md ${
                        isSelected
                          ? "border-[#c4a160] bg-[#c4a160]/20 shadow-[0_0_20px_rgba(196,161,96,0.3)] z-20 scale-105"
                          : "border-white/10 bg-[#161513]/95 hover:border-white/30 z-10"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-0.5 sm:mb-1">
                        <span
                          className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full shrink-0 ${
                            st.status === "RUNNING"
                              ? "bg-emerald-400 animate-pulse"
                              : "bg-amber-400"
                          }`}
                        />
                        <span className="text-[8px] sm:text-[9px] font-mono text-[#777168] hidden sm:inline">{st.type}</span>
                      </div>
                      <div className="font-mono text-[9.5px] sm:text-xs font-bold text-[#eeece5] truncate group-hover:text-[#c4a160] transition-colors">
                        {st.name.split(" ")[0]} {st.name.split(" ")[1]}
                      </div>
                      <div className="mt-0.5 sm:mt-1 text-[8.5px] sm:text-[10px] font-mono text-[#a39c91] flex items-center justify-between">
                        <span className="truncate">{st.spindleRpm > 0 ? `${st.spindleRpm} RPM` : st.status}</span>
                        <span className="text-[8px] sm:text-[9px] text-[#777168] hidden min-[360px]:inline ml-1">{st.tempC}°C</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Status footer */}
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#777168]">
                <span>STATIONS ONLINE: 5 / 5</span>
                <span className="text-emerald-400">FASTAPI WEBSOCKET: 100ms SYNC</span>
              </div>
            </div>

            {/* Real-Time Machine Telemetry HUD (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#1a1815] p-5">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="font-mono text-xs uppercase tracking-wider text-[#c4a160]">
                    {t.telemetryTitle}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      currentStation.status === "RUNNING"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}
                  >
                    {currentStation.status}
                  </span>
                </div>

                <h4 className="mt-3 font-display text-xl text-[#eeece5] font-semibold">
                  {currentStation.name}
                </h4>
                <div className="text-xs font-mono text-[#777168]">{currentStation.type}</div>

                {/* Gauges & Telemetry Data */}
                <div className="mt-5 space-y-4">
                  {/* Spindle RPM Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-mono text-[#b9b4aa] mb-1.5">
                      <span>{t.spindleSpeed}</span>
                      <span className="font-bold text-[#eeece5]">
                        {currentStation.spindleRpm.toLocaleString()} RPM
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-black/40 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-[#c4a160] transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (currentStation.spindleRpm / 14000) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Temperature & Vibration Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg border border-white/[0.06] bg-black/20">
                      <span className="text-[10px] font-mono uppercase text-[#777168] block">
                        {t.temperature}
                      </span>
                      <span className="mt-1 font-display text-2xl font-bold text-amber-400 block">
                        {currentStation.tempC}°C
                      </span>
                    </div>
                    <div className="p-3 rounded-lg border border-white/[0.06] bg-black/20">
                      <span className="text-[10px] font-mono uppercase text-[#777168] block">
                        {t.vibration}
                      </span>
                      <span className="mt-1 font-display text-2xl font-bold text-emerald-400 block">
                        {currentStation.vibration} <span className="text-xs font-mono">mm/s</span>
                      </span>
                    </div>
                  </div>

                  {/* Active Job & Operator */}
                  <div className="p-3.5 rounded-lg border border-white/[0.06] bg-black/30 space-y-2 text-xs font-mono">
                    <div>
                      <span className="text-[10px] uppercase text-[#777168] block">{t.activeJob}</span>
                      <span className="text-[#eeece5] font-medium">{currentStation.currentJob}</span>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06]">
                      <span className="text-[10px] uppercase text-[#777168] block">{t.operator}</span>
                      <span className="text-[#c4a160]">{currentStation.operator}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] font-mono text-[#777168]">
                {t.telemetryStream}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: ORDER STREAM & SLA DISPATCH ── */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl border border-white/[0.08] bg-[#0d0c0a] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div>
                <h4 className="font-display text-lg text-[#eeece5]">{t.slaTitle}</h4>
                <p className="text-xs text-[#a39c91]">{t.slaStatus}</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs">
                SLA TARGET: &lt; 12.0 HOURS
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="p-4 rounded-lg border border-white/[0.06] bg-black/30">
                <span className="text-[10px] font-mono uppercase text-[#777168] block">Today Orders Dispatched</span>
                <span className="mt-1 font-display text-2xl font-bold text-[#eeece5] block">128 Orders</span>
                <span className="text-[10px] font-mono text-emerald-400">100% Same-Day Delivery</span>
              </div>
              <div className="p-4 rounded-lg border border-white/[0.06] bg-black/30">
                <span className="text-[10px] font-mono uppercase text-[#777168] block">Average Turnaround</span>
                <span className="mt-1 font-display text-2xl font-bold text-[#c4a160] block">6h 24m</span>
                <span className="text-[10px] font-mono text-[#a39c91]">Intake to Courier Pickup</span>
              </div>
              <div className="p-4 rounded-lg border border-white/[0.06] bg-black/30">
                <span className="text-[10px] font-mono uppercase text-[#777168] block">Zero Punch Loss</span>
                <span className="mt-1 font-display text-2xl font-bold text-cyan-300 block">100.0% Traceability</span>
                <span className="text-[10px] font-mono text-[#a39c91]">Edge Buffered Database</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: FASTAPI & EDGE ARCHITECTURE ── */}
      {activeTab === "arch" && (
        <div className="space-y-6">
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#1a1815]">
              <div className="text-xs text-amber-400 font-mono mb-1">FRONTEND CANVAS</div>
              <h5 className="font-display text-base text-[#eeece5] font-medium">{t.layer1Title}</h5>
              <p className="mt-1.5 text-xs text-[#a39c91] leading-relaxed">{t.layer1Desc}</p>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#1a1815]">
              <div className="text-xs text-cyan-400 font-mono mb-1">DISPATCH BACKEND</div>
              <h5 className="font-display text-base text-[#eeece5] font-medium">{t.layer2Title}</h5>
              <p className="mt-1.5 text-xs text-[#a39c91] leading-relaxed">{t.layer2Desc}</p>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#1a1815]">
              <div className="text-xs text-emerald-400 font-mono mb-1">HARDWARE EDGE</div>
              <h5 className="font-display text-base text-[#eeece5] font-medium">{t.layer3Title}</h5>
              <p className="mt-1.5 text-xs text-[#a39c91] leading-relaxed">{t.layer3Desc}</p>
            </div>

            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#1a1815]">
              <div className="text-xs text-purple-400 font-mono mb-1">WFM & SLA OPS</div>
              <h5 className="font-display text-base text-[#eeece5] font-medium">{t.layer4Title}</h5>
              <p className="mt-1.5 text-xs text-[#a39c91] leading-relaxed">{t.layer4Desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
