"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckSquare,
  Square,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Filter,
  RotateCcw,
  Copy,
  Check,
  Radio,
  Cpu,
  Shield,
  Layers,
  Eye,
  Wrench,
  Lock,
  Smartphone,
  Database,
  Activity,
  Users,
  Building2,
} from "lucide-react";
import type { Lang } from "@/data/portfolio-data";
import { trackIntent } from "@/lib/intent-tracker";

interface RecruiterFitMatcherProps {
  lang: Lang;
  onOpenRecruiterModal: () => void;
}

export type DomainCategory = "all" | "embedded" | "automation" | "software" | "management";

export type IconKey =
  | "Radio"
  | "Cpu"
  | "Shield"
  | "Layers"
  | "Eye"
  | "Wrench"
  | "Lock"
  | "Smartphone"
  | "Database"
  | "Activity"
  | "Users";

interface Requirement {
  id: string;
  category: "embedded" | "automation" | "software" | "management";
  label: string;
  proof: string;
  metric: string;
  company: string;
  iconKey: IconKey;
}

interface RolePreset {
  id: string;
  label: string;
  badge: string;
  itemIds: string[];
}

const ICON_MAP: Record<IconKey, React.ComponentType<{ size?: number; className?: string }>> = {
  Radio,
  Cpu,
  Shield,
  Layers,
  Eye,
  Wrench,
  Lock,
  Smartphone,
  Database,
  Activity,
  Users,
};

const REQUIREMENTS: Record<Lang, Requirement[]> = {
  en: [
    {
      id: "embedded-iot",
      category: "embedded",
      label: "Embedded C/C++, FreeRTOS & Wireless IoT",
      proof:
        "Production firmware on 32-bit MCUs (ESP32-C6 / STM32) with FreeRTOS: robust zero-router wireless mesh delivering <10ms packet latency in harsh RF industrial workshops.",
      metric: "<10ms Mesh P2P",
      company: "Goodvalley & R&D Lab",
      iconKey: "Radio",
    },
    {
      id: "industrial-plc",
      category: "automation",
      label: "Industrial Automation, PLC & SCADA (Siemens S7)",
      proof:
        "Commissioning, ladder logic & TIA Portal refactoring across San-Pajda & Goodvalley: eliminated micro-stoppages (-40%), boosted oven throughput by +33% and generated 71.1k PLN/yr verified energy savings.",
      metric: "+33% Output / 71k PLN",
      company: "San-Pajda & Goodvalley",
      iconKey: "Cpu",
    },
    {
      id: "edge-gateway",
      category: "embedded",
      label: "Embedded Linux & Industrial Edge Gateways",
      proof:
        "Resilient Linux edge gateways (Raspberry Pi 5 / IPC) with Read-Only rootfs and transactional offline SQLite persistence: 100% zero punch loss and seamless factory MES synchronization during network blackouts.",
      metric: "100% Zero Data Loss",
      company: "rpi2 Edge Gateway",
      iconKey: "Shield",
    },
    {
      id: "virtual-commissioning",
      category: "automation",
      label: "3D Virtual Commissioning & Simulation (Factory I/O)",
      proof:
        "Virtual commissioning in Factory I/O (Siemens PLCSIM, Modbus TCP, OPC UA) before physical deployment, eliminating costly machine downtime during on-site commissioning.",
      metric: "Factory I/O + PLCSIM",
      company: "Colorland & PANS Lab",
      iconKey: "Layers",
    },
    {
      id: "robotics-vision",
      category: "automation",
      label: "Industrial Robotics & Computer Vision (UR-5 & OpenCV)",
      proof:
        "Computer vision optical inspection pipelines (OpenCV) for defect detection and integration with Universal Robots UR-5 robotic arms (+35% sort pace) and Sick vision sensors.",
      metric: "UR-5 + OpenCV / Sick",
      company: "Colorland & Univ. of Ljubljana",
      iconKey: "Eye",
    },
    {
      id: "cad-eplan",
      category: "automation",
      label: "CAD/CAM Modeling, EPLAN Schematics & CNC Laser Nesting",
      proof:
        "AutoCAD, Fusion 360, SolidWorks mechanical modeling, EPLAN Electric P8 schematics revision, and CNC laser cutting nesting optimization for minimal sheet material waste (O2/N2).",
      metric: "EPLAN + CNC Nesting",
      company: "Colorland & ZUT Kunzek",
      iconKey: "Layers",
    },
    {
      id: "control-cabinets",
      category: "automation",
      label: "Control Cabinet Prefabrication & Safety Interlocks",
      proof:
        "Prefabrication and wiring of industrial control cabinets (Siemens/Mitsubishi PLCs, VFD inverters, Festo/SMC pneumatics), Category 3/4 E-Stop safety relays, and comprehensive I/O verification.",
      metric: "Kat. 3/4 Safety & VFD",
      company: "ZUT Kunzek (Monter & Automatyk)",
      iconKey: "Wrench",
    },
    {
      id: "hardware-fieldbus",
      category: "embedded",
      label: "Physical Security, Access Control (KD) & Fieldbuses",
      proof:
        "Physical access systems & industrial telemetry: Wiegand RFID readers, encrypted keypad controllers, and noise-tolerant RS-485 / Modbus RTU/TCP serial fieldbus communication.",
      metric: "RS485 / Modbus / Wiegand",
      company: "wiegandReader / Access Control",
      iconKey: "Lock",
    },
    {
      id: "mobile-pos",
      category: "software",
      label: "Mobile Hardware Integration & Industrial POS (Android / Kotlin)",
      proof:
        "Commercial Android POS systems (Kotlin, Jetpack Compose, Coroutines) with serial COM RS-232 and Bluetooth SPP/BLE drivers for fiscal cash registers (Posnet, Novitus, Elzab) and ML Kit barcode scanning.",
      metric: "Kotlin + RS-232 / BLE",
      company: "MostCentrService & KasaMobile",
      iconKey: "Smartphone",
    },
    {
      id: "mes-canvas",
      category: "software",
      label: "Full-Stack IIoT & Real-Time MES Platforms",
      proof:
        "High-throughput telemetry and dispatching: Python FastAPI asynchronous queues, WebSockets, and 60 FPS React 19 Canvas digital twin floor plans with live machine tool wear tracking.",
      metric: "FastAPI + React 19 Canvas",
      company: "factory MES Platform",
      iconKey: "Database",
    },
    {
      id: "wfm-energy",
      category: "software",
      label: "Industrial WFM, Energy Telemetry & WMS Parts Dispensing",
      proof:
        "Ceiling-to-floor plant operations: workTime WFM shift scheduling, automated industrial power meter reading for energy audits, and WMS tool/parts dispensing for line maintenance.",
      metric: "WFM + Energy Telemetry",
      company: "Goodvalley Agro-Industrial Complex",
      iconKey: "Activity",
    },
    {
      id: "agile-management",
      category: "management",
      label: "Engineering Leadership, Agile (Scrum/Kanban) & Lean Operations",
      proof:
        "Master of Science in Management (PANS, 120 ECTS): cross-functional delivery orchestration, Agile/Scrum sprint cycles, Jira issue tracking, Stage-Gate R&D milestones, and Lean process optimization (+33% OEE).",
      metric: "Scrum + Lean (120 ECTS)",
      company: "PANS Master in Management",
      iconKey: "Users",
    },
  ],
  pl: [
    {
      id: "embedded-iot",
      category: "embedded",
      label: "Systemy Wbudowane C/C++, FreeRTOS & Wireless IoT",
      proof:
        "Produkcyjne oprogramowanie układowe w C/C++ na mikrokontrolery 32-bit (ESP32-C6 / STM32) i FreeRTOS: niezawodna bezrouterowa sieć kratowa P2P z latencją <10ms w trudnych warunkach zakłóceń EM.",
      metric: "<10ms Mesh P2P",
      company: "Goodvalley & Własne R&D",
      iconKey: "Radio",
    },
    {
      id: "industrial-plc",
      category: "automation",
      label: "Automatyka Przemysłowa, PLC & SCADA (Siemens S7)",
      proof:
        "Uruchomienia i refaktoring logiki PLC (Siemens S7 / TIA Portal) w San-Pajda i Goodvalley: eliminacja mikroprzestojów (-40%), +33% wydajności linii wypieku i 71.1k PLN oszczędności gazu rocznie.",
      metric: "+33% Wydajności / 71k PLN",
      company: "San-Pajda & Goodvalley",
      iconKey: "Cpu",
    },
    {
      id: "edge-gateway",
      category: "embedded",
      label: "Embedded Linux & Przemysłowe Bramki Edge (Raspberry Pi)",
      proof:
        "Bramki brzegowe Linux (Raspberry Pi 5 / IPC) z systemem Read-Only rootfs i transakcyjną bazą SQLite: 100% zerowa utrata zdarzeń (Zero Punch Loss) i synchronizacja z MES.",
      metric: "100% Zero Data Loss",
      company: "Bramka Edge rpi2",
      iconKey: "Shield",
    },
    {
      id: "virtual-commissioning",
      category: "automation",
      label: "Wirtualne Uruchomienia 3D & Symulacja (Factory I/O)",
      proof:
        "Wirtualne uruchomienia w Factory I/O (Siemens PLCSIM, Modbus TCP, OPC UA) przed wdrożeniem fizycznym, eliminujące kosztowne przestoje maszyn podczas prac na obiekcie.",
      metric: "Factory I/O + PLCSIM",
      company: "Colorland & Laboratorium PANS",
      iconKey: "Layers",
    },
    {
      id: "robotics-vision",
      category: "automation",
      label: "Robotyka Przemysłowa & Wizja Maszynowa (UR-5 & OpenCV)",
      proof:
        "Potoki wizyjne (OpenCV) do optycznej detekcji wad i pozycjonowania detali oraz integracja ramion robotycznych UR-5 z kamerami Sick (+35% do tempa sortowania).",
      metric: "UR-5 + OpenCV / Sick",
      company: "Colorland & Univ. of Ljubljana",
      iconKey: "Eye",
    },
    {
      id: "cad-eplan",
      category: "automation",
      label: "Modelowanie CAD/CAM, Schematy EPLAN & Nesting CNC",
      proof:
        "Projektowanie CAD w AutoCAD, Fusion 360, SolidWorks, rewizje schematów w EPLAN Electric P8 oraz optymalizacja rozkroju (nesting) pod wycinarki laserowe CNC (O2/N2).",
      metric: "EPLAN + Nesting CNC",
      company: "Colorland & ZUT Kunzek",
      iconKey: "Layers",
    },
    {
      id: "control-cabinets",
      category: "automation",
      label: "Prefabrykacja Szaf Sterowniczych & Bezpieczeństwo Maszyn",
      proof:
        "Prefabrykacja i okablowanie szaf automatyki (PLC Siemens/Mitsubishi, falowniki VFD, wyspy zaworowe Festo/SMC, przekaźniki E-Stop Kat. 3/4) oraz kompleksowy I/O check.",
      metric: "Kat. 3/4 Safety & Falowniki",
      company: "ZUT Kunzek (Monter & Automatyk)",
      iconKey: "Wrench",
    },
    {
      id: "hardware-fieldbus",
      category: "embedded",
      label: "Kontrola Dostępu (KD), Bezpieczeństwo & Magistrale Obiektowe",
      proof:
        "Systemy KD i telemetria przemysłowa: czytniki RFID Wiegand, szyfrowane klawiatury oraz odporne na zakłócenia magistrale szeregowe RS-485 i Modbus RTU/TCP.",
      metric: "RS485 / Modbus / Wiegand",
      company: "wiegandReader / Systemy KD",
      iconKey: "Lock",
    },
    {
      id: "mobile-pos",
      category: "software",
      label: "Integracja Sprzętowa Mobile POS (Android / Kotlin)",
      proof:
        "Komercyjne systemy kasowe Android POS (Kotlin, Jetpack Compose, Coroutines) ze sterownikami RS-232 COM i Bluetooth SPP/BLE dla drukarek fiskalnych (Posnet, Novitus, Elzab) i skanera ML Kit.",
      metric: "Kotlin + RS-232 / BLE",
      company: "MostCentrService & KasaMobile",
      iconKey: "Smartphone",
    },
    {
      id: "mes-canvas",
      category: "software",
      label: "Full-Stack IIoT & Platformy MES Czasu Rzeczywistego",
      proof:
        "Wysokowydajny dispatching i telemetria: asynchroniczny Python FastAPI, WebSockets i interaktywny cyfrowy bliźniak hali na React 19 Canvas w 60 FPS ze śledzeniem zużycia narzędzi.",
      metric: "FastAPI + React 19 Canvas",
      company: "Silnik factory MES",
      iconKey: "Database",
    },
    {
      id: "wfm-energy",
      category: "software",
      label: "Przemysłowe WFM, Telemetria Energii & Wydawanie Części (WMS)",
      proof:
        "Kompleksowa obsługa hali: system workTime do harmonogramowania zmian, automatyczny odczyt przemysłowych liczników energii do audytów oraz moduł magazynowy pobierania części WMS.",
      metric: "WFM + Telemetria Mocy",
      company: "Kompleks Goodvalley",
      iconKey: "Activity",
    },
    {
      id: "agile-management",
      category: "management",
      label: "Zarządzanie Inżynierskie, Agile (Scrum/Kanban) & Lean Operations",
      proof:
        "Magister Zarządzania (PANS, 120 ECTS): koordynacja dostaw międzydyscyplinarnych, zwinne sprinty Scrum, Jira/Confluence, kamienie milowe Stage-Gate i optymalizacja procesów Lean (+33% OEE).",
      metric: "Scrum + Lean (120 ECTS)",
      company: "PANS Magister Zarządzania",
      iconKey: "Users",
    },
  ],
};

const PRESETS: Record<Lang, RolePreset[]> = {
  en: [
    {
      id: "cto-lead",
      label: "🚀 CTO / Engineering Lead",
      badge: "6 Skills",
      itemIds: ["agile-management", "embedded-iot", "industrial-plc", "mes-canvas", "edge-gateway", "wfm-energy"],
    },
    {
      id: "automation-plc",
      label: "🏭 Industrial Automation & PLC Lead",
      badge: "4 Skills",
      itemIds: ["industrial-plc", "virtual-commissioning", "control-cabinets", "cad-eplan"],
    },
    {
      id: "embedded-mesh",
      label: "📡 Embedded Firmware & Mesh IoT",
      badge: "3 Skills",
      itemIds: ["embedded-iot", "edge-gateway", "hardware-fieldbus"],
    },
    {
      id: "robotics-vision",
      label: "🤖 Robotics & Computer Vision",
      badge: "3 Skills",
      itemIds: ["robotics-vision", "virtual-commissioning", "cad-eplan"],
    },
    {
      id: "hardware-mobile",
      label: "📱 Android Hardware & Mobile POS",
      badge: "3 Skills",
      itemIds: ["mobile-pos", "hardware-fieldbus", "edge-gateway"],
    },
    {
      id: "fullstack-mes",
      label: "💻 Full-Stack IIoT & MES Architect",
      badge: "4 Skills",
      itemIds: ["mes-canvas", "wfm-energy", "edge-gateway", "embedded-iot"],
    },
    {
      id: "plant-maintenance",
      label: "⚡ Plant Maintenance & Safety (UR)",
      badge: "3 Skills",
      itemIds: ["control-cabinets", "industrial-plc", "wfm-energy"],
    },
  ],
  pl: [
    {
      id: "cto-lead",
      label: "🚀 CTO / Lead Inżynierii",
      badge: "6 Umiejętności",
      itemIds: ["agile-management", "embedded-iot", "industrial-plc", "mes-canvas", "edge-gateway", "wfm-energy"],
    },
    {
      id: "automation-plc",
      label: "🏭 Lider Automatyki & PLC",
      badge: "4 Umiejętności",
      itemIds: ["industrial-plc", "virtual-commissioning", "control-cabinets", "cad-eplan"],
    },
    {
      id: "embedded-mesh",
      label: "📡 Embedded Firmware & Mesh IoT",
      badge: "3 Umiejętności",
      itemIds: ["embedded-iot", "edge-gateway", "hardware-fieldbus"],
    },
    {
      id: "robotics-vision",
      label: "🤖 Robotyka & Wizja Maszynowa",
      badge: "3 Umiejętności",
      itemIds: ["robotics-vision", "virtual-commissioning", "cad-eplan"],
    },
    {
      id: "hardware-mobile",
      label: "📱 Integracja Sprzętowa Mobile POS",
      badge: "3 Umiejętności",
      itemIds: ["mobile-pos", "hardware-fieldbus", "edge-gateway"],
    },
    {
      id: "fullstack-mes",
      label: "💻 Architekt Full-Stack IIoT & MES",
      badge: "4 Umiejętności",
      itemIds: ["mes-canvas", "wfm-energy", "edge-gateway", "embedded-iot"],
    },
    {
      id: "plant-maintenance",
      label: "⚡ Utrzymanie Ruchu (UR) & Bezpieczeństwo",
      badge: "3 Umiejętności",
      itemIds: ["control-cabinets", "industrial-plc", "wfm-energy"],
    },
  ],
};

const DOMAIN_TABS: Record<Lang, { id: DomainCategory; label: string; count: number }[]> = {
  en: [
    { id: "all", label: "All Skills", count: 12 },
    { id: "embedded", label: "Embedded & IoT", count: 3 },
    { id: "automation", label: "PLC & Robotics", count: 5 },
    { id: "software", label: "Software & MES", count: 3 },
    { id: "management", label: "Leadership", count: 1 },
  ],
  pl: [
    { id: "all", label: "Wszystkie", count: 12 },
    { id: "embedded", label: "Embedded & IoT", count: 3 },
    { id: "automation", label: "Automatyka & Robotyka", count: 5 },
    { id: "software", label: "Software & MES", count: 3 },
    { id: "management", label: "Zarządzanie", count: 1 },
  ],
};

const DOMAIN_LABELS: Record<Lang, Record<"embedded" | "automation" | "software" | "management", string>> = {
  en: {
    embedded: "Embedded & Wireless IoT",
    automation: "Industrial Automation & Robotics",
    software: "Full-Stack Software, MES & POS",
    management: "Engineering Leadership (M.Sc.)",
  },
  pl: {
    embedded: "Systemy Wbudowane & Wireless IoT",
    automation: "Automatyka Przemysłowa & Robotyka",
    software: "Full-Stack Software, MES & POS",
    management: "Zarządzanie Inżynierskie (Mgr)",
  },
};

const COPY = {
  en: {
    eyebrow: "Skills & Requirements Alignment",
    title: "Engineering Stack & Expo Fit Matrix",
    subtitle:
      "Select project requirements or pick a 1-click expo preset below to calculate stack alignment, review verified commercial evidence and copy an ATS-ready candidate briefing.",
    presetLabel: "1-Click Expo & Role Presets",
    selectAll: "Select All (12 Core Skills)",
    clearAll: "Clear",
    allMatch: "100% Full-Spectrum Match! Complete verified coverage of robotics, firmware, edge Linux, PLC, and industrial MES.",
    highMatch: "Strong Senior Alignment! Direct commercial track record and production deployment in your core stack.",
    singleMatch: "Key Core Competence Verified! Proven industrial delivery and verified ROI for this requirement.",
    baseMatch: "Select your vacancy or project requirements above to calculate Roman's stack match.",
    emptyTitle: "No requirements selected",
    emptyText: "Click requirements on the left or select a 1-click role preset above to inspect verified commercial evidence and candidate fit.",
    selectAllBtn: "Select All 12 Core Skills",
    ctaWithSelection: (count: number) => `View Executive Dossier (${count} Skills Matched) →`,
    ctaEmpty: "View Executive Brief →",
    evidenceTitle: "Verified Commercial Evidence",
    selectPrompt: "Filter & click requirements to test fit:",
    matchLabel: "Calculated Candidate Fit",
    verifiedBadge: "Verified Commercial Experience",
    domainCoverageTitle: "Domain Breakdown Coverage",
    copySummaryBtn: "Copy Fit Summary",
    copiedToast: "Fit Summary Copied to Clipboard!",
  },
  pl: {
    eyebrow: "Matryca Kompetencji & Dopasowania",
    title: "Dopasowanie Stosu Technologicznego & Wymagań Targowych",
    subtitle:
      "Zaznacz wymagania projektu lub wybierz gotowy profil targowy powyżej, aby sprawdzić dopasowanie stosu, udokumentowane dowody wdrożeniowe oraz skopiować gotowe podsumowanie dla rekruterów.",
    presetLabel: "Szybkie Profile Targowe & Ról",
    selectAll: "Wszystkie (12 Kompetencji)",
    clearAll: "Wyczyść",
    allMatch: "100% Pełne Pokrycie! Kompletne udokumentowane doświadczenie w robotyce, firmware, bramkach edge, PLC i systemach MES.",
    highMatch: "Silne Dopasowanie Seniora! Bezpośrednie doświadczenie komercyjne i wdrożenia produkcyjne w wybranym stosie.",
    singleMatch: "Główna Kompetencja Potwierdzona! Praktyczne wdrożenie przemysłowe i udokumentowane ROI.",
    baseMatch: "Zaznacz wymagania stanowiska powyżej, aby obliczyć dopasowanie stosu technologicznego Romana.",
    emptyTitle: "Brak zaznaczonych wymagań",
    emptyText: "Zaznacz wymagania po lewej stronie lub wybierz gotowy profil powyżej, aby zobaczyć zweryfikowane dowody przemysłowe.",
    selectAllBtn: "Zaznacz Wszystkie 12 Kompetencji",
    ctaWithSelection: (count: number) => `Zobacz Dossier (${count} Potwierdzone Umiejętności) →`,
    ctaEmpty: "Zobacz Executive Brief →",
    evidenceTitle: "Zweryfikowane Doświadczenie Komercyjne",
    selectPrompt: "Filtruj i klikaj wymagania stanowiska:",
    matchLabel: "Obliczone Dopasowanie Kandydata",
    verifiedBadge: "Zweryfikowane Doświadczenie",
    domainCoverageTitle: "Pokrycie Głównych Domen",
    copySummaryBtn: "Kopiuj Podsumowanie Dopasowania",
    copiedToast: "Skopiowano Podsumowanie do Schowka!",
  },
} as const;

export function RecruiterFitMatcher({ lang, onOpenRecruiterModal }: RecruiterFitMatcherProps) {
  const t = COPY[lang];
  const items = REQUIREMENTS[lang];
  const presets = PRESETS[lang];
  const domainTabs = DOMAIN_TABS[lang];
  const domainLabels = DOMAIN_LABELS[lang];

  // Default select first 4 core competencies (Embedded IoT, PLC, Edge, Virtual Commissioning)
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "embedded-iot",
    "industrial-plc",
    "edge-gateway",
    "virtual-commissioning",
  ]);
  const [activeCategory, setActiveCategory] = useState<DomainCategory>("all");
  const [copied, setCopied] = useState<boolean>(false);

  const toggleItem = (id: string) => {
    trackIntent("fit_matcher_used", "Fit Matcher Toggled", id);
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const applyPreset = (preset: RolePreset) => {
    trackIntent("fit_matcher_used", `Preset: ${preset.label}`, preset.id);
    setSelectedIds(preset.itemIds);
  };

  const visibleItems = activeCategory === "all"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const selectedItems = items.filter((item) => selectedIds.includes(item.id));

  // Dynamic calibrated scoring curve
  const calculateMatchScore = (count: number): number => {
    if (count === 0) return 0;
    if (count === 1) return 25;
    if (count === 2) return 45;
    if (count === 3) return 65;
    if (count === 4) return 78;
    if (count === 5) return 88;
    if (count === 6) return 94;
    return 100;
  };

  const matchPercentage = calculateMatchScore(selectedIds.length);

  // Domain breakdown calculations
  const domainBreakdown = {
    embedded: {
      selected: selectedItems.filter((i) => i.category === "embedded").length,
      total: items.filter((i) => i.category === "embedded").length,
    },
    automation: {
      selected: selectedItems.filter((i) => i.category === "automation").length,
      total: items.filter((i) => i.category === "automation").length,
    },
    software: {
      selected: selectedItems.filter((i) => i.category === "software").length,
      total: items.filter((i) => i.category === "software").length,
    },
    management: {
      selected: selectedItems.filter((i) => i.category === "management").length,
      total: items.filter((i) => i.category === "management").length,
    },
  };

  const handleCopySummary = async () => {
    trackIntent("fit_matcher_used", "Copy Fit Summary", `${selectedIds.length} skills`);
    const summaryLines = [
      `Roman Deyneko — Candidate Fit Briefing: ${matchPercentage}% Match (${selectedIds.length}/${items.length} Skills Selected)`,
      `Role: CTO / Lead Hardware, Embedded Systems & Full-Stack Architect`,
      `Location: Przechlewo, Pomorskie, Poland (EU Work Authorization, Remote / Hybrid)`,
      `Key Matched Capabilities:`,
      ...selectedItems.map((item) => `• ${item.label} [${item.metric}] — ${item.company}`),
      `Verified Track Record: San-Pajda (+33% throughput, 71.1k PLN/yr), Goodvalley (-40% downtime), Colorland (UR-5 & Factory I/O), MostCentrService (Android POS RS-232), ZUT Kunzek (Control Cabinets).`,
      `Academic: 493 ECTS (M.Sc. Management + B.Sc. Eng. Computer Science + B.Sc. Eng. Automation & Practical Electronics).`,
      `Contact: m.pnikut@gmail.com | +48 791 265 019 | https://linkedin.com/in/roman-deyneko`,
    ];

    try {
      await navigator.clipboard.writeText(summaryLines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="fit-matcher" className="py-16 sm:py-28 lg:py-32 border-b editorial-rule scroll-mt-20 overflow-hidden w-full max-w-full">
      <div className="container-custom">
        {/* Header */}
        <div className="grid gap-6 border-b editorial-rule pb-8 sm:pb-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="kicker mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-[#c4a160] shrink-0" />
              <span>{t.eyebrow}</span>
            </p>
            <h2 className="display-md text-[#eeece5] leading-tight">{t.title}</h2>
          </div>
          <div className="lg:col-span-7 flex flex-col justify-end">
            <p className="editorial-copy max-w-2xl text-sm sm:text-base">{t.subtitle}</p>
          </div>
        </div>

        {/* 1-Click Role Presets */}
        <div className="mt-6 sm:mt-8 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#141311] border border-white/[0.08] w-full max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full min-w-0">
            <div className="flex items-center justify-between sm:justify-start gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#a39c91] uppercase tracking-wider mr-1">
                <Filter size={13} className="text-[#c4a160] shrink-0" />
                <span>{t.presetLabel}:</span>
              </div>
              {selectedIds.length > 0 && (
                <button
                  onClick={() => {
                    trackIntent("fit_matcher_used", "Fit Matcher: Clear Selection", "clear");
                    setSelectedIds([]);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono text-[#a39c91] hover:text-rose-300 transition-colors cursor-pointer flex items-center gap-1 sm:hidden ml-auto min-h-[36px]"
                  title={t.clearAll}
                >
                  <RotateCcw size={12} />
                  <span>{t.clearAll}</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full min-w-0 max-w-full sm:flex-wrap sm:overflow-visible flex-1">
              {presets.map((preset) => {
                const isActive =
                  preset.itemIds.length > 0 &&
                  preset.itemIds.length === selectedIds.length &&
                  preset.itemIds.every((id) => selectedIds.includes(id));

                return (
                  <button
                    key={preset.id}
                    onClick={() => applyPreset(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border shrink-0 min-h-[38px] flex items-center gap-1.5 whitespace-nowrap ${
                      isActive
                        ? "bg-[#c4a160] text-[#11100e] border-[#c4a160] font-bold shadow-md shadow-[#c4a160]/10"
                        : "bg-[#181714] text-[#eeece5] border-white/[0.1] hover:border-[#c4a160]/50 hover:text-[#c4a160]"
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                        isActive
                          ? "bg-[#11100e]/20 text-[#11100e]"
                          : "bg-white/[0.08] text-[#a39c91]"
                      }`}
                    >
                      {preset.badge}
                    </span>
                  </button>
                );
              })}

              <button
                onClick={() => {
                  trackIntent("fit_matcher_used", "Fit Matcher: Select All", "all");
                  setSelectedIds(items.map((i) => i.id));
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer border shrink-0 min-h-[38px] flex items-center whitespace-nowrap ${
                  selectedIds.length === items.length
                    ? "bg-[#c4a160] text-[#11100e] border-[#c4a160] font-bold"
                    : "bg-white/[0.05] text-[#a39c91] border-white/[0.1] hover:text-[#eeece5] hover:border-white/20"
                }`}
              >
                {t.selectAll}
              </button>

              {selectedIds.length > 0 && (
                <button
                  onClick={() => {
                    trackIntent("fit_matcher_used", "Fit Matcher: Clear Selection", "clear");
                    setSelectedIds([]);
                  }}
                  className="hidden sm:flex px-2.5 py-1.5 rounded-lg text-xs font-mono text-[#a39c91] hover:text-rose-300 transition-colors cursor-pointer items-center gap-1.5 ml-auto shrink-0 min-h-[38px]"
                  title={t.clearAll}
                >
                  <RotateCcw size={13} />
                  <span>{t.clearAll}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 lg:grid-cols-12 items-start w-full min-w-0 max-w-full">
          {/* Left Column: Category Tabs + Requirements List */}
          <div className="lg:col-span-6 space-y-3.5 w-full min-w-0 max-w-full">
            {/* Header with prompt and match counter */}
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-[#a39c91]">
                {t.selectPrompt}
              </p>
              <div className="hidden lg:flex items-center gap-2">
                <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded bg-[#c4a160]/10 text-[#c4a160] border border-[#c4a160]/20">
                  {matchPercentage}% Match
                </span>
                <span className="font-mono text-[11px] text-[#a39c91]">
                  ({selectedIds.length}/{items.length})
                </span>
              </div>
            </div>

            {/* Mobile Sticky Live Match Score Pill */}
            <div className="lg:hidden p-3 rounded-xl bg-[#181714] border border-[#c4a160]/40 flex items-center justify-between gap-2 shadow-lg w-full min-w-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="font-display text-2xl font-bold text-[#eeece5] shrink-0">
                  {matchPercentage}%
                </div>
                <div className="font-mono text-[10px] text-[#a39c91] leading-tight min-w-0">
                  <span className="text-[#c4a160] font-semibold block truncate">{t.matchLabel}</span>
                  <span className="truncate block">{selectedIds.length} / {items.length} skills</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {selectedItems.length > 0 && (
                  <button
                    onClick={handleCopySummary}
                    className="px-2.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-mono text-[#eeece5] active:scale-95 transition-all flex items-center gap-1 min-h-[36px]"
                    title={t.copySummaryBtn}
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-[#c4a160]" />}
                    <span className="text-[10px]">{copied ? "Copied" : "Copy"}</span>
                  </button>
                )}
                {onOpenRecruiterModal && (
                  <button
                    onClick={onOpenRecruiterModal}
                    className="px-3 py-1.5 rounded-lg bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] text-xs font-mono font-bold active:scale-95 transition-all flex items-center gap-1 min-h-[36px]"
                  >
                    <span>Brief</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full min-w-0 max-w-full">
              {domainTabs.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer shrink-0 min-h-[36px] flex items-center gap-1.5 border ${
                      isActive
                        ? "bg-[#c4a160]/15 text-[#c4a160] border-[#c4a160]/50 font-semibold"
                        : "bg-[#141311] text-[#a39c91] border-white/[0.06] hover:text-[#eeece5] hover:border-white/15"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-70">({tab.count})</span>
                  </button>
                );
              })}
            </div>

            {/* Requirements Checkboxes List */}
            <div className="space-y-2.5 w-full min-w-0">
              {visibleItems.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const IconComponent = ICON_MAP[item.iconKey] || Cpu;

                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`w-full min-w-0 max-w-full flex items-start sm:items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer min-h-[52px] group active:scale-[0.99] ${
                      isSelected
                        ? "bg-[#181714] border-[#c4a160]/60 text-[#eeece5] shadow-[0_0_15px_rgba(196,161,96,0.08)]"
                        : "bg-[#11100e]/40 border-white/[0.08] text-[#a39c91] hover:border-white/20 hover:text-[#eeece5]"
                    }`}
                  >
                    <div className="min-w-0 pr-2 flex-1">
                      <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                        {isSelected ? (
                          <CheckSquare size={18} className="text-[#c4a160] shrink-0 mt-0.5 sm:mt-0" />
                        ) : (
                          <Square size={18} className="text-white/20 group-hover:text-white/40 shrink-0 mt-0.5 sm:mt-0 transition-colors" />
                        )}
                        <div className="flex items-center gap-2 flex-wrap min-w-0">
                          <IconComponent size={14} className={isSelected ? "text-[#c4a160]" : "text-[#706a5f] shrink-0"} />
                          <span className="text-xs sm:text-sm font-medium tracking-tight break-words">
                            {item.label}
                          </span>
                        </div>
                      </div>

                      <div className="pl-7 mt-1.5 flex items-center gap-2 flex-wrap text-[11px] font-mono min-w-0">
                        <span className="text-[#c4a160] sm:hidden break-words">
                          ⚡ {item.metric}
                        </span>
                        <span className="text-[#706a5f] flex items-center gap-1 min-w-0">
                          <Building2 size={11} className="shrink-0" />
                          <span className="break-words">{item.company}</span>
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-[11px] text-[#c4a160] px-2.5 py-1 rounded bg-[#c4a160]/10 border border-[#c4a160]/20 shrink-0 hidden sm:inline whitespace-nowrap ml-2">
                      {item.metric}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Calculated Candidate Fit, Domain Coverage & Verified Evidence */}
          <div className="lg:col-span-6 w-full min-w-0 max-w-full">
            <div className="p-4 min-[360px]:p-5 sm:p-8 rounded-xl sm:rounded-2xl bg-[#181714] border border-[#c4a160]/30 relative overflow-hidden shadow-xl w-full min-w-0 max-w-full">
              {/* Header Match Score */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b editorial-rule pb-5 sm:pb-6 mb-5 sm:mb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#a39c91] block">
                    {t.matchLabel}
                  </span>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-display text-4xl sm:text-6xl font-bold text-[#eeece5] tracking-tight">
                      {matchPercentage}%
                    </span>
                    <span className="font-mono text-xs text-[#a39c91]">
                      ({selectedIds.length}/{items.length} skills)
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-2.5 min-[360px]:px-3 py-1.5 rounded-full text-[11px] min-[360px]:text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <ShieldCheck size={14} className="shrink-0" />
                    <span>{t.verifiedBadge}</span>
                  </span>
                </div>
              </div>

              {/* Match Verdict Message */}
              <p className="text-xs sm:text-sm text-[#c4a160] font-medium mb-5 sm:mb-6 leading-relaxed">
                {selectedIds.length === items.length
                  ? t.allMatch
                  : selectedIds.length >= 4
                  ? t.highMatch
                  : selectedIds.length > 0
                  ? t.singleMatch
                  : t.baseMatch}
              </p>

              {/* Domain Coverage Breakdown Progress Bars */}
              <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-xl bg-[#11100e] border border-white/[0.08]">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#a39c91] mb-3 flex items-center justify-between">
                  <span>{t.domainCoverageTitle}</span>
                  <span className="text-[#c4a160] font-bold">
                    {selectedIds.length} / {items.length}
                  </span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Embedded */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#eeece5] mb-1">
                      <span className="truncate pr-1">{domainLabels.embedded}</span>
                      <span className="text-[#c4a160] shrink-0 font-semibold">
                        {domainBreakdown.embedded.selected}/{domainBreakdown.embedded.total}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c4a160] rounded-full transition-all duration-300"
                        style={{
                          width: `${(domainBreakdown.embedded.selected / domainBreakdown.embedded.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Automation & Robotics */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#eeece5] mb-1">
                      <span className="truncate pr-1">{domainLabels.automation}</span>
                      <span className="text-[#c4a160] shrink-0 font-semibold">
                        {domainBreakdown.automation.selected}/{domainBreakdown.automation.total}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c4a160] rounded-full transition-all duration-300"
                        style={{
                          width: `${(domainBreakdown.automation.selected / domainBreakdown.automation.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Software & MES */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#eeece5] mb-1">
                      <span className="truncate pr-1">{domainLabels.software}</span>
                      <span className="text-[#c4a160] shrink-0 font-semibold">
                        {domainBreakdown.software.selected}/{domainBreakdown.software.total}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c4a160] rounded-full transition-all duration-300"
                        style={{
                          width: `${(domainBreakdown.software.selected / domainBreakdown.software.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Management & Leadership */}
                  <div>
                    <div className="flex justify-between text-[11px] font-mono text-[#eeece5] mb-1">
                      <span className="truncate pr-1">{domainLabels.management}</span>
                      <span className="text-[#c4a160] shrink-0 font-semibold">
                        {domainBreakdown.management.selected}/{domainBreakdown.management.total}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/[0.08] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#c4a160] rounded-full transition-all duration-300"
                        style={{
                          width: `${(domainBreakdown.management.selected / domainBreakdown.management.total) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Proofs Cards List */}
              <div className="space-y-3 mb-6 sm:mb-8 w-full min-w-0 max-w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-[#a39c91]">
                    {t.evidenceTitle}:
                  </p>
                  {selectedItems.length > 0 && (
                    <button
                      onClick={handleCopySummary}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-[#c4a160]/10 border border-white/[0.1] hover:border-[#c4a160]/30 text-[#eeece5] hover:text-[#c4a160] font-mono text-[11px] transition-colors cursor-pointer inline-flex items-center gap-1.5 min-h-[30px] max-w-full"
                      title={t.copySummaryBtn}
                    >
                      {copied ? (
                        <>
                          <Check size={12} className="text-emerald-400 shrink-0" />
                          <span className="text-emerald-400 font-semibold">{t.copiedToast}</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} className="shrink-0" />
                          <span className="truncate">{t.copySummaryBtn}</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {selectedItems.length === 0 ? (
                  <div className="p-6 sm:p-8 rounded-xl bg-[#11100e] border border-dashed border-white/[0.12] text-center space-y-3">
                    <p className="text-sm font-semibold text-[#eeece5]">{t.emptyTitle}</p>
                    <p className="text-xs text-[#a39c91] leading-relaxed max-w-sm mx-auto">
                      {t.emptyText}
                    </p>
                    <button
                      onClick={() => setSelectedIds(items.map((i) => i.id))}
                      className="px-4 py-2 rounded-lg bg-[#c4a160]/10 hover:bg-[#c4a160]/20 border border-[#c4a160]/30 text-[#c4a160] font-mono text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-2 min-h-[38px]"
                    >
                      <CheckSquare size={14} />
                      <span>{t.selectAllBtn}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-80 sm:max-h-96 overflow-y-auto overscroll-contain pr-1 scrollbar-thin scrollbar-thumb-white/10 w-full min-w-0">
                    <AnimatePresence>
                      {selectedItems.map((item) => {
                        const IconComponent = ICON_MAP[item.iconKey] || Cpu;
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.18 }}
                            className="p-3.5 rounded-xl bg-[#11100e] border border-white/[0.08] text-xs leading-relaxed hover:border-white/15 transition-colors w-full min-w-0"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <IconComponent size={14} className="text-[#c4a160] shrink-0" />
                                <span className="font-semibold text-[#eeece5] break-words">{item.label}</span>
                              </div>
                              <span className="font-mono text-[10px] text-[#c4a160] bg-[#c4a160]/10 px-2 py-0.5 rounded border border-[#c4a160]/20 whitespace-nowrap shrink-0">
                                {item.metric}
                              </span>
                            </div>

                            <p className="text-[#a39c91] text-[11px] leading-relaxed mb-2 break-words">
                              {item.proof}
                            </p>

                            <div className="flex flex-wrap items-center justify-between gap-1 pt-1.5 border-t border-white/[0.04] text-[10px] font-mono text-[#706a5f]">
                              <span className="flex items-center gap-1 min-w-0">
                                <Building2 size={11} className="text-[#c4a160]/70 shrink-0" />
                                <span className="truncate">{item.company}</span>
                              </span>
                              <span className="text-emerald-400/80 flex items-center gap-1 shrink-0">
                                <ShieldCheck size={11} />
                                <span>Verified Commercial</span>
                              </span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Actions Button */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    trackIntent(
                      "recruiter_modal_open",
                      "⚡ Recruiter Mode (Fit Matcher CTA)",
                      `${selectedIds.length} skills matched`
                    );
                    onOpenRecruiterModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 min-h-[48px] py-3.5 px-4 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold text-sm transition-all cursor-pointer shadow-lg hover:shadow-[#c4a160]/20 active:scale-[0.98]"
                >
                  <span>
                    {selectedIds.length > 0
                      ? t.ctaWithSelection(selectedIds.length)
                      : t.ctaEmpty}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
