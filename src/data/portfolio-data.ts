// ============================================================
// Portfolio Data — Roman Deyneko (Hardware, Embedded & Full-Stack)
// ============================================================

export type Perspective = "engineer" | "business";

export interface Stat {
  value: string;
  label: string;
  icon: string;
}

// ─── DUAL-PERSPECTIVE STATS ─────────────────────────────────
export const PERSPECTIVE_STATS: Record<Perspective, Record<"en" | "pl", Stat[]>> = {
  engineer: {
    en: [
      { value: "ESP-NOW", label: "Zero-Router Wireless Mesh", icon: "Radio" },
      { value: "±0.05 mm", label: "CNC Cutting Precision", icon: "Crosshair" },
      { value: "98.5%+", label: "First-Time-Right (FTR)", icon: "Shield" },
      { value: "FastAPI", label: "Async MES Architecture", icon: "Database" },
    ],
    pl: [
      { value: "ESP-NOW", label: "Bezrouterowa Sieć Mesh", icon: "Radio" },
      { value: "±0.05 mm", label: "Precyzja Frezowania CNC", icon: "Crosshair" },
      { value: "98.5%+", label: "First-Time-Right (FTR)", icon: "Shield" },
      { value: "FastAPI", label: "Architektura Asynchroniczna MES", icon: "Database" },
    ],
  },
  business: {
    en: [
      { value: "≤25k PLN", label: "Unit CAPEX via DFM", icon: "TrendingDown" },
      { value: "≤60 s", label: "Cycle Time per Unit", icon: "Clock" },
      { value: "99.2%+", label: "Autonomous Kiosk Uptime", icon: "Server" },
      { value: "10+ Yrs", label: "Locksmith Domain Know-how", icon: "Award" },
    ],
    pl: [
      { value: "≤25k PLN", label: "CAPEX Urządzenia (DFM)", icon: "TrendingDown" },
      { value: "≤60 s", label: "Czas Cyklu na Jednostkę", icon: "Clock" },
      { value: "99.2%+", label: "Dostępność Kiosków (Uptime)", icon: "Server" },
      { value: "10+ Lat", label: "Rodzinnego Know-how Branży", icon: "Award" },
    ],
  },
};

// ─── DUAL-PERSPECTIVE VALUE CARD OVERLAYS ───────────────────
export interface PerspectiveOverlay {
  metric: string;
  metricLabel: string;
  description: string;
}

export const VALUE_CARD_PERSPECTIVES: Record<Perspective, Record<"en" | "pl", Record<string, PerspectiveOverlay>>> = {
  engineer: {
    en: {
      "hardware-robotics": {
        metric: "CNC/ЧПК",
        metricLabel: "Precision Robotics",
        description: "Custom automated key-cutting kinematics, vacuum and mechanical clamp modules, cyclone chip evacuation, and precision CNC milling (±0.05 mm).",
      },
      "embedded-mesh": {
        metric: "ESP32-C6",
        metricLabel: "Low-Latency Mesh",
        description: "ESP-NOW P2P mesh network architecture, Raspberry Pi industrial edge gateway, RS485 bus, and Wiegand protocol readers with sub-10ms packet delivery.",
      },
      "industrial-mes": {
        metric: "MES/Web",
        metricLabel: "Real-time Telemetry",
        description: "Python FastAPI async queues, React 19 Canvas floor plan rendering, spindle RPM & tool wear monitoring, and automated cutting dispatch pipelines.",
      },
      "system-reliability": {
        metric: "FTR 98.5%",
        metricLabel: "Zero-Failure Standard",
        description: "Stage-Gate R&D milestones from TRL 3 to TRL 8, statistical quality assurance, predictive tool wear analytics, and CE Machinery Directive compliance.",
      },
    },
    pl: {
      "hardware-robotics": {
        metric: "CNC/Robotyka",
        metricLabel: "Mechanika Precyzyjna",
        description: "Autorska kinematyka automatów do dorabiania kluczy, moduły zacisków próżniowych i mechanicznych, odciąg wiórów oraz precyzyjne frezowanie CNC (±0.05 mm).",
      },
      "embedded-mesh": {
        metric: "ESP32-C6",
        metricLabel: "Niskolatencyjny Mesh",
        description: "Architektura sieci kratowej ESP-NOW P2P, przemysłowa bramka brzegowa Raspberry Pi, magistrala RS485 i czytniki Wiegand z czasem pakietu <10ms.",
      },
      "industrial-mes": {
        metric: "MES/Web",
        metricLabel: "Telemetria Live",
        description: "Asynchroniczne kolejki Python FastAPI, wizualizacja planu hali na React 19 Canvas, telemetria wrzeciona i zużycia frezów oraz kolejkowanie zleceń.",
      },
      "system-reliability": {
        metric: "FTR 98.5%",
        metricLabel: "Niezawodność Systemowa",
        description: "Realizacja kamieni milowych Stage-Gate od TRL 3 do TRL 8, statystyczna kontrola jakości, predykcja zużycia narzędzi i zgodność z Dyrektywą Maszynową CE.",
      },
    },
  },
  business: {
    en: {
      "hardware-robotics": {
        metric: "≤25k PLN",
        metricLabel: "Unit CAPEX",
        description: "Design for Manufacturing (DFM) methodology replacing expensive machined blocks with adaptive 3D printing, cutting production costs by 45%.",
      },
      "embedded-mesh": {
        metric: "99.2%+",
        metricLabel: "Network Uptime",
        description: "Zero external Wi-Fi router dependency ensures continuous operation and kiosk telemetry even in degraded network conditions.",
      },
      "industrial-mes": {
        metric: "≤12h",
        metricLabel: "Order Fulfillment SLA",
        description: "Automated end-to-end pipeline from customer order to CNC machine queue enabling same-day parcel dispatch across courier networks.",
      },
      "system-reliability": {
        metric: "10+ Yrs",
        metricLabel: "Domain Heritage",
        description: "10+ years of family locksmith mastery providing immediate access to key blank catalogs (Silca, JMA, Gerda), wear physics, and test locks.",
      },
    },
    pl: {
      "hardware-robotics": {
        metric: "≤25k PLN",
        metricLabel: "CAPEX Urządzenia",
        description: "Metodologia DFM (Design for Manufacturing) zastępująca kosztowne bloki frezowane drukiem 3D, redukująca koszt budowy automatu o 45%.",
      },
      "embedded-mesh": {
        metric: "99.2%+",
        metricLabel: "Dostępność Sieci",
        description: "Brak zależności od zewnętrznego routera Wi-Fi gwarantuje nieprzerwaną pracę i telemetrię kiosków w trudnych warunkach obiektowych.",
      },
      "industrial-mes": {
        metric: "≤12h",
        metricLabel: "SLA Realizacji Zleceń",
        description: "Automatyczny przepływ od zamówienia klienta do kolejki obrabiarki CNC, umożliwiający wysyłkę tego samego dnia przez sieć paczkomatów.",
      },
      "system-reliability": {
        metric: "10+ Lat",
        metricLabel: "Zaplecze Branżowe",
        description: "Ponad dekada rodzinnego doświadczenia ślusarskiego: dostęp do bazy surówek (Silca, JMA, Gerda), fizyki zużycia zamków i bazy testowej.",
      },
    },
  },
};

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  shortDescription: string;
  fullDescription: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
}

export interface SkillItem {
  name: string;
  badge: "Core" | "Advanced" | "Proficient";
  experience: string;
  icon?: string;
}

export interface SkillTab {
  id: string;
  label: string;
  skills: SkillItem[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  years: string;
  description: string;
  accentColor: string;
}

export interface Language {
  name: string;
  level: string;
  flag: string;
  color: string;
}

export interface ValueCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  accentColor: string;
  span?: "wide" | "tall" | "normal";
}

// ─── CONTACT INFORMATION & SOCIAL LINKS ─────────────────────
export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/roman-deyneko",
  github: "https://github.com/NeKoRoM",
  email: "mailto:m.pnikut@gmail.com",
  telegram: "https://t.me/NeKoRoM",
  phone: "+48 000 000 000",
};

// ─── STATS ──────────────────────────────────────────────────
export const STATS: Record<"en" | "pl", Stat[]> = {
  en: [
    { value: "98.5%+", label: "First-Time-Right (FTR)", icon: "Shield" },
    { value: "≤60 s", label: "Cycle Time per Key", icon: "Clock" },
    { value: "≤25k PLN", label: "Unit CAPEX via DFM", icon: "TrendingDown" },
    { value: "10+ Yrs", label: "Domain Heritage & Know-how", icon: "Award" },
  ],
  pl: [
    { value: "98.5%+", label: "First-Time-Right (FTR)", icon: "Shield" },
    { value: "≤60 s", label: "Czas Cyklu na Klucz", icon: "Clock" },
    { value: "≤25k PLN", label: "CAPEX Urządzenia (DFM)", icon: "TrendingDown" },
    { value: "10+ Lat", label: "Wiedzy i Doświadczenia Branżowego", icon: "Award" },
  ],
};

// ─── VALUE PROPOSITION CARDS ────────────────────────────────
export const VALUE_CARDS: Record<"en" | "pl", ValueCard[]> = {
  en: [
    {
      id: "web-engineering",
      icon: "Code2",
      title: "Web Platform Engineering & Custom PHP",
      description:
        "Custom PHP themes and Gutenberg architecture with optimized SQL queries, lazy-loaded WebP assets, and schema.org structured data across 8+ corporate platforms.",
      metric: "8+",
      metricLabel: "Corporate Platforms",
      tags: ["WordPress / PHP", "Custom Themes", "SQL Optimization", "Schema.org"],
      accentColor: "indigo",
      span: "wide",
    },
    {
      id: "performance-speed",
      icon: "Zap",
      title: "Core Web Vitals & Radical PageSpeed",
      description:
        "Solving mobile performance bottlenecks and heavy payload issues, recovering low PageSpeed scores up to 90+ to protect conversion funnels from drop-offs.",
      metric: "90+",
      metricLabel: "PageSpeed Mobile",
      tags: ["Core Web Vitals", "Asset Compression", "WebP / Lazy Loading", "Clean Code"],
      accentColor: "cyan",
      span: "normal",
    },
    {
      id: "technical-marketing",
      icon: "BarChart3",
      title: "Technical SEO & Data-Driven Growth",
      description:
        "Architecting clean semantic structures, automated GSC indexing, and GA4 custom event tracking that drove +40% organic traffic growth on flagship corporate platforms.",
      metric: "+40%",
      metricLabel: "Organic Traffic Surge",
      tags: ["Technical SEO", "GA4 / GTM", "Search Console", "Funnel Analytics"],
      accentColor: "violet",
      span: "normal",
    },
    {
      id: "infrastructure-reliability",
      icon: "Shield",
      title: "Zero-Downtime Migrations & Integrations",
      description:
        "Seamless server and multi-domain migrations, DNS/SSL management, and secure webhook integrations (Telegram Bot API with HMAC-SHA256 signatures).",
      metric: "0%",
      metricLabel: "Unplanned Downtime",
      tags: ["Domain Migrations", "REST APIs", "Telegram Webhooks", "HMAC Security"],
      accentColor: "emerald",
      span: "wide",
    },
  ],
  pl: [
    {
      id: "web-engineering",
      icon: "Code2",
      title: "Inżynieria Platform Webowych & PHP",
      description:
        "Autorskie motywy PHP i architektura Gutenberg ze zoptymalizowanymi zapytaniami SQL, lazy-loadingiem WebP i mikrodanymi schema.org dla ponad 8 serwisów korporacyjnych.",
      metric: "8+",
      metricLabel: "Serwisów Korporacyjnych",
      tags: ["WordPress / PHP", "Autorskie Motywy", "Optymalizacja SQL", "Schema.org"],
      accentColor: "indigo",
      span: "wide",
    },
    {
      id: "performance-speed",
      icon: "Zap",
      title: "Core Web Vitals & Maksymalna Szybkość",
      description:
        "Eliminacja wąskich gardeł wydajności mobilnej i redukcja wagi stron — podnoszenie wyników PageSpeed z 45 do 90+, chroniące lejki konwersji przed stratami.",
      metric: "90+",
      metricLabel: "PageSpeed Mobile",
      tags: ["Core Web Vitals", "Kompresja Zasobów", "WebP / Lazy Loading", "Czysty Kod"],
      accentColor: "cyan",
      span: "normal",
    },
    {
      id: "technical-marketing",
      icon: "BarChart3",
      title: "Techniczne SEO & Wzrost Oparty na Danych",
      description:
        "Budowa czystej struktury semantycznej, automatyczne indeksowanie GSC i śledzenie zdarzeń GA4, które przyniosły +40% wzrostu ruchu organicznego na kluczowej platformie.",
      metric: "+40%",
      metricLabel: "Wzrost Ruchu Organicznego",
      tags: ["Techniczne SEO", "GA4 / GTM", "Search Console", "Analityka Lejków"],
      accentColor: "violet",
      span: "normal",
    },
    {
      id: "infrastructure-reliability",
      icon: "Shield",
      title: "Migracje Bez Przestojów & Integracje API",
      description:
        "Bezproblemowe migracje serwerów i domen, konfiguracja DNS/SSL oraz bezpieczne integracje webhooków (Telegram Bot API z podpisem HMAC-SHA256).",
      metric: "0%",
      metricLabel: "Nieplanowanych Przestojów",
      tags: ["Migracje Domen", "REST API", "Webhooki Telegram", "Bezpieczeństwo HMAC"],
      accentColor: "emerald",
      span: "wide",
    },
  ],
};

// ─── CASE STUDIES ───────────────────────────────────────────
export const PROJECTS: Record<"en" | "pl", Project[]> = {
  en: [
    {
      id: "keysnap-robotics",
      title: "KeySnap AI / KeyCraft Robotics",
      category: "Hardware & Robotics (CTO & Co-Founder)",
      tags: ["CNC Milling", "ESP32-C6", "Raspberry Pi", "ESP-NOW Mesh", "DFM", "Stage-Gate R&D"],
      shortDescription:
        "Autonomous key-cutting kiosk and edge robotics platform with sub-millimeter precision, DFM optimization, and distributed mesh telemetry.",
      fullDescription:
        "As CTO and Head of Hardware, I engineered the physical and embedded architecture for the KeySnap AI autonomous key duplication kiosk. Designed precision CNC mechanical axes, automated blank feeder mechanisms, and cyclone chip evacuation. Applied Design for Manufacturing (DFM) to reduce unit CAPEX from 45,000 PLN to under 25,000 PLN while sustaining First-Time-Right cutting accuracy >= 98.5% and cycle times under 60 seconds. Integrated industrial Raspberry Pi edge gateways and ESP-NOW mesh controllers for resilient zero-downtime operation.",
      metrics: [
        { label: "Accuracy (FTR)", value: "98.5%+" },
        { label: "Cycle Time", value: "≤60s" },
        { label: "Unit CAPEX", value: "≤25k PLN" },
        { label: "Precision", value: "±0.05 mm" },
      ],
      accentColor: "indigo",
    },
    {
      id: "wfm-industrial-mes",
      title: "WFM & Industrial MES Platform",
      category: "Industrial Software & Dispatching",
      tags: ["Python FastAPI", "React 19", "HTML5 Canvas", "Raspberry Pi", "Realtime Queues", "MES"],
      shortDescription:
        "End-to-end manufacturing execution system connecting factory floor telemetry, interactive Canvas floor plans, and cutting queues.",
      fullDescription:
        "Architected an industrial Manufacturing Execution System (MES) designed to coordinate workshop machinery, operator workflows, and real-time order dispatching. Features a responsive React 19 Canvas floor plan displaying live station states and spindle RPM telemetry. The asynchronous Python FastAPI backend orchestrates cutting jobs from intake to machine execution, enabling same-day parcel dispatch SLAs under 12 hours.",
      metrics: [
        { label: "Order SLA", value: "≤12h" },
        { label: "Floor Plan", value: "React 19 Canvas" },
        { label: "Backend", value: "FastAPI Async" },
        { label: "Architecture", value: "MES Dispatch" },
      ],
      accentColor: "emerald",
    },
    {
      id: "embedded-mesh-iot",
      title: "Distributed Embedded Mesh & Edge IoT",
      category: "Embedded Firmware & Protocols",
      tags: ["ESP32-C6", "PlatformIO", "ESP-NOW", "RS485", "Wiegand", "FreeRTOS"],
      shortDescription:
        "Zero-router low-latency wireless mesh and access control controllers for resilient industrial environments.",
      fullDescription:
        "Engineered ultra-low-latency peer-to-peer (P2P) mesh networks on ESP32-C6 microcontrollers utilizing the ESP-NOW protocol. Eliminates reliance on external Wi-Fi access points and routers, guaranteeing uninterrupted communication and sensor telemetry across industrial workshops. Integrated RS485 industrial buses and Wiegand access readers with sub-10ms packet delivery.",
      metrics: [
        { label: "Protocol", value: "ESP-NOW P2P" },
        { label: "MCU", value: "ESP32-C6" },
        { label: "System Uptime", value: "≥99.2%" },
        { label: "Packet Latency", value: "<10ms" },
      ],
      accentColor: "cyan",
    },
    {
      id: "portfolio-engine",
      title: "Warm Titanium Portfolio & Next.js Architecture",
      category: "Personal Engineering (2026)",
      tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "Turbopack", "Vercel"],
      shortDescription:
        "High-performance, dual-perspective portfolio system engineered with Next.js 16 App Router, custom Warm Titanium design tokens, and spring physics.",
      fullDescription:
        "Designed and built this interactive portfolio application from scratch using Next.js 16, TypeScript, and Framer Motion. Features a dual-perspective toggle system (Systems Engineering vs. Business Growth), custom noise overlay textures, interactive 3D Tilt Cards with cursor spotlights, and sub-1s static page generation via Turbopack.",
      metrics: [
        { label: "Lighthouse Score", value: "98/100" },
        { label: "Page Load", value: "<0.8s" },
        { label: "Design System", value: "Custom" },
        { label: "Tech Stack", value: "Next.js 16" },
      ],
      accentColor: "indigo",
    },
  ],
  pl: [
    {
      id: "keysnap-robotics",
      title: "KeySnap AI / KeyCraft Robotics",
      category: "Hardware & Robotyka (CTO & Współzałożyciel)",
      tags: ["Frezowanie CNC", "ESP32-C6", "Raspberry Pi", "Mesh ESP-NOW", "DFM", "Stage-Gate R&D"],
      shortDescription:
        "Autonomiczny automat do dorabiania kluczy oraz brzegowa platforma robotyczna z submilimetrową precyzją i optymalizacją DFM.",
      fullDescription:
        "Jako CTO i szef działu Hardware zaprojektowałem architekturę mechaniczną oraz wbudowaną dla autonomicznego kiosku KeySnap AI. Opracowałem precyzyjne osie mechaniczne CNC, automatyczne podajniki surówek i cyklonowy system odciągu wiórów. Dzięki metodologii DFM (Design for Manufacturing) obniżyłem koszt budowy urządzenia (CAPEX) z 45 000 PLN do poniżej 25 000 PLN, utrzymując precyzję First-Time-Right >= 98.5% i czas cyklu <60 s. Zintegrowałem przemysłowe bramki brzegowe Raspberry Pi oraz kontrolery ESP-NOW mesh dla maksymalnej stabilności.",
      metrics: [
        { label: "Dokładność (FTR)", value: "98.5%+" },
        { label: "Czas Cyklu", value: "≤60s" },
        { label: "CAPEX Kiosku", value: "≤25k PLN" },
        { label: "Tolerancja", value: "±0.05 mm" },
      ],
      accentColor: "indigo",
    },
    {
      id: "wfm-industrial-mes",
      title: "WFM & Przemysłowa Platforma MES",
      category: "Oprogramowanie Przemysłowe & Dyspozytornia",
      tags: ["Python FastAPI", "React 19", "HTML5 Canvas", "Raspberry Pi", "Kolejki Zleceń", "MES"],
      shortDescription:
        "Kompleksowy system realizacji produkcji łączący telemetrię parku maszynowego, interaktywny plan hali na Canvas i kolejki zleceń.",
      fullDescription:
        "Zaprojektowałem i wdrożyłem przemysłowy system klasy MES koordynujący pracę maszyn CNC, operatorów i automatyczne kolejkowanie zleceń. System oferuje interaktywny plan hali w React 19 Canvas z odświeżaniem statusów maszyn i telemetrii obrotów wrzeciona w czasie rzeczywistym. Asynchroniczny backend w Python FastAPI zarządza zleceniami od wpłynięcia do fizycznego wykonania na maszynie, zapewniając realizację wysyłki w czasie poniżej 12 godzin.",
      metrics: [
        { label: "SLA Wysyłki", value: "≤12h" },
        { label: "Plan Hali", value: "React 19 Canvas" },
        { label: "Backend", value: "FastAPI Async" },
        { label: "Architektura", value: "Kolejkowanie MES" },
      ],
      accentColor: "emerald",
    },
    {
      id: "embedded-mesh-iot",
      title: "Rozproszony Mesh Wbudowany & Edge IoT",
      category: "Firmware Wbudowany & Protokoły",
      tags: ["ESP32-C6", "PlatformIO", "ESP-NOW", "RS485", "Wiegand", "FreeRTOS"],
      shortDescription:
        "Bezrouterowa, niskolatencyjna sieć kratowa i kontrolery kontroli dostępu dla wymagających środowisk przemysłowych.",
      fullDescription:
        "Opracowałem niskolatencyjne sieci kratowe P2P na mikrokontrolerach ESP32-C6 z wykorzystaniem protokołu ESP-NOW. Rozwiązanie eliminuje zależność od zewnętrznych routerów Wi-Fi, gwarantując niezawodną łączność i telemetrię czujników w trudnych warunkach zakłóceń elektromagnetycznych. Zintegrowano magistrale przemysłowe RS485 i protokoły Wiegand z czasem dostarczania pakietów poniżej 10 ms.",
      metrics: [
        { label: "Protokół", value: "ESP-NOW P2P" },
        { label: "MCU", value: "ESP32-C6" },
        { label: "Dostępność", value: "≥99.2%" },
        { label: "Opóźnienie", value: "<10ms" },
      ],
      accentColor: "cyan",
    },
    {
      id: "portfolio-engine",
      title: "Architektura Portfolio Warm Titanium & Next.js 16",
      category: "Inżynieria Własna (2026)",
      tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "Turbopack", "Vercel"],
      shortDescription:
        "Wysokowydajny, dwuperspektywiczny system portfolio stworzony w oparciu o Next.js 16 App Router, własne tokeny Warm Titanium i fizykę płynnych przejść.",
      fullDescription:
        "Zaprojektowanie i budowa od podstaw interaktywnego serwisu portfolio w oparciu o Next.js 16, TypeScript oraz Framer Motion. System oferuje przełącznik perspektyw (Inżynieria Systemowa vs Wymiar Biznesowy), autorską teksturę szumu, interaktywne karty 3D z podświetleniem kursora i czas ładowania poniżej 0.8s.",
      metrics: [
        { label: "Wynik Lighthouse", value: "98/100" },
        { label: "Czas Ładowania", value: "<0.8s" },
        { label: "Design System", value: "Autorski" },
        { label: "Stos Techniczny", value: "Next.js 16" },
      ],
      accentColor: "indigo",
    },
  ],
};

// ─── TECH STACK TABS ────────────────────────────────────────
export const SKILL_TABS: Record<"en" | "pl", SkillTab[]> = {
  en: [
    {
      id: "embedded-hardware",
      label: "Embedded & Hardware",
      skills: [
        { name: "ESP32-C6 / ESP-IDF", badge: "Core", experience: "PlatformIO & FreeRTOS Firmware" },
        { name: "ESP-NOW Wireless Mesh", badge: "Core", experience: "P2P Low-Latency Protocol" },
        { name: "CNC Machining & G-Code", badge: "Core", experience: "±0.05 mm Precision Cutting" },
        { name: "Raspberry Pi Edge Gateway", badge: "Core", experience: "Linux Edge Daemon & Telemetry" },
        { name: "3D Prototyping (FDM/SLA)", badge: "Core", experience: "Rapid Iterative Hardware R&D" },
        { name: "RS485 & Wiegand", badge: "Advanced", experience: "Industrial Field Buses & RFID" },
        { name: "C / C++ (PlatformIO)", badge: "Core", experience: "Embedded Firmware Architecture" },
        { name: "Electronics & Diagnostics", badge: "Advanced", experience: "Oscilloscopes & Logic Analyzers" },
      ],
    },
    {
      id: "fullstack-software",
      label: "Full-Stack & Software",
      skills: [
        { name: "Python (FastAPI)", badge: "Core", experience: "Async Queues, WebSockets & APIs" },
        { name: "React 19 & TypeScript", badge: "Core", experience: "Modern Components & Hooks" },
        { name: "HTML5 Canvas", badge: "Advanced", experience: "Real-time Factory Floor Plan" },
        { name: "Next.js 16 (App Router)", badge: "Advanced", experience: "SSR, Turbopack & Web Vitals" },
        { name: "Tailwind CSS v4", badge: "Core", experience: "Design Tokens & Responsive UI" },
        { name: "SQLite / PostgreSQL", badge: "Advanced", experience: "MES Schema & Query Tuning" },
        { name: "Redis & WebSockets", badge: "Advanced", experience: "Real-time Telemetry Caching" },
        { name: "Docker & Linux CLI", badge: "Advanced", experience: "Edge & Cloud Containerization" },
      ],
    },
    {
      id: "industrial-management",
      label: "Industrial & R&D",
      skills: [
        { name: "10+ Yrs Locksmith Know-how", badge: "Core", experience: "Silca, JMA, Gerda & Bitting Cards" },
        { name: "DFM / BOM Optimization", badge: "Core", experience: "CAPEX Reduction to ≤25k PLN" },
        { name: "MES System Architecture", badge: "Core", experience: "End-to-End Factory Dispatching" },
        { name: "Stage-Gate R&D Process", badge: "Core", experience: "Milestone Management (TRL 3 to 8)" },
        { name: "First-Time-Right (FTR) QA", badge: "Core", experience: "Statistical Precision & QA (≥98.5%)" },
        { name: "CE Machinery Directive", badge: "Advanced", experience: "Safety Compliance & Tech Files" },
      ],
    },
  ],
  pl: [
    {
      id: "embedded-hardware",
      label: "Systemy Wbudowane & Hardware",
      skills: [
        { name: "ESP32-C6 / ESP-IDF", badge: "Core", experience: "Firmware PlatformIO i FreeRTOS" },
        { name: "Sieć Mesh ESP-NOW", badge: "Core", experience: "Niskolatencyjny Protokół P2P" },
        { name: "Obróbka CNC i G-Code", badge: "Core", experience: "Precyzja Frezowania ±0.05 mm" },
        { name: "Bramka Edge Raspberry Pi", badge: "Core", experience: "Demony Linux Edge i Telemetria" },
        { name: "Druk 3D (FDM/SLA)", badge: "Core", experience: "Szybkie Prototypowanie R&D" },
        { name: "RS485 & Wiegand", badge: "Advanced", experience: "Magistrale Przemysłowe i RFID" },
        { name: "C / C++ (PlatformIO)", badge: "Core", experience: "Architektura Oprogramowania Wbudowanego" },
        { name: "Elektronika i Diagnostyka", badge: "Advanced", experience: "Oscyloskopy i Analizatory Logiczne" },
      ],
    },
    {
      id: "fullstack-software",
      label: "Full-Stack & Oprogramowanie",
      skills: [
        { name: "Python (FastAPI)", badge: "Core", experience: "Kolejki Asynchroniczne, API i Sockets" },
        { name: "React 19 & TypeScript", badge: "Core", experience: "Nowoczesne Komponenty i Hooki" },
        { name: "HTML5 Canvas", badge: "Advanced", experience: "Plan Hali Produkcyjnej w Czasie Rzeczywistym" },
        { name: "Next.js 16 (App Router)", badge: "Advanced", experience: "SSR, Turbopack i Wydajność" },
        { name: "Tailwind CSS v4", badge: "Core", experience: "Tokeny Wizualne i Responsywność" },
        { name: "SQLite / PostgreSQL", badge: "Advanced", experience: "Schematy MES i Optymalizacja Zapytań" },
        { name: "Redis & WebSockets", badge: "Advanced", experience: "Buforowanie Telemetrii Live" },
        { name: "Docker & Linux CLI", badge: "Advanced", experience: "Konteneryzacja Edge i Chmurowa" },
      ],
    },
    {
      id: "industrial-management",
      label: "Zarządzanie Przemysłowe & R&D",
      skills: [
        { name: "10+ Lat Wiedzy Branżowej", badge: "Core", experience: "Silca, JMA, Gerda i Karty Nacięć" },
        { name: "Optymalizacja DFM / BOM", badge: "Core", experience: "Redukcja CAPEX do ≤25k PLN" },
        { name: "Architektura Systemów MES", badge: "Core", experience: "Dyspozytornia Hali Produkcyjnej" },
        { name: "Metodyka Stage-Gate R&D", badge: "Core", experience: "Zarządzanie Kamieniami Milowymi (TRL 3-8)" },
        { name: "Kontrola Jakości FTR", badge: "Core", experience: "Statystyczna Kontrola Jakości (≥98.5%)" },
        { name: "Dyrektywa Maszynowa CE", badge: "Advanced", experience: "Zgodność z Normami Bezpieczeństwa" },
      ],
    },
  ],
};

// ─── EDUCATION & EXPERIENCE ─────────────────────────────────
export const EDUCATION: Record<"en" | "pl", EducationItem[]> = {
  en: [
    {
      degree: "Magister (M.Sc.)",
      field: "Technical & Industrial Engineering",
      institution: "Higher Education Institution",
      location: "Poland",
      years: "Completed",
      description:
        "Master's degree education emphasizing engineering systems, R&D project leadership, industrial automation principles (Industry 4.0), and systematic technical problem solving.",
      accentColor: "cyan",
    },
  ],
  pl: [
    {
      degree: "Magister",
      field: "Inżynieria Techniczna i Przemysłowa",
      institution: "Uczelnia Wyższa",
      location: "Polska",
      years: "Ukończone",
      description:
        "Wykształcenie wyższe magisterskie ze szczególnym naciskiem na systemy inżynierskie, kierowanie projektami R&D, automatyzację przemysłową (Przemysł 4.0) oraz systemowe rozwiązywanie problemów technicznych.",
      accentColor: "cyan",
    },
  ],
};

export const LANGUAGES: Record<"en" | "pl", Language[]> = {
  en: [
    { name: "Polish", level: "Fluent / Working Proficiency", flag: "🇵🇱", color: "indigo" },
    { name: "Ukrainian", level: "Native", flag: "🇺🇦", color: "yellow" },
    { name: "English", level: "Technical B2", flag: "🇬🇧", color: "cyan" },
  ],
  pl: [
    { name: "Polski", level: "Płynny (Biegle w mowie i piśmie)", flag: "🇵🇱", color: "indigo" },
    { name: "Ukraiński", level: "Ojczysty (Native)", flag: "🇺🇦", color: "yellow" },
    { name: "Angielski", level: "Techniczny B2", flag: "🇬🇧", color: "cyan" },
  ],
};

// ─── TRANSLATIONS ────────────────────────────────────────────
export const TRANSLATIONS = {
  en: {
    nav: {
      impact: "Impact",
      projects: "Projects",
      demos: "Live Demos",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      headline: "Web Platforms Engineered for",
      headline2: "Traffic, Speed & Revenue",
      subtitle:
        "Web Developer for Product Platforms & Technical Growth. Combines Computer Science engineering with an M.Sc. in Management. Specializing in WordPress/PHP, product catalogues, technical SEO, and Core Web Vitals.",
      cta_primary: "Recruiter Fast-Track (30s)",
      cta_secondary: "Download CV (PDF)",
      cta_demo: "View Case Studies",
      available: "Available for EU remote & hybrid roles",
    },
    impact: {
      eyebrow: "The ROI of Hiring Oleh",
      title: "Commercial Value &",
      highlight: "Engineering Impact",
      subtitle: "Delivering measurable business outcomes: organic traffic growth, Core Web Vitals recovery, and zero-downtime multi-market platform continuity.",
    },
    projects: {
      eyebrow: "Commercial Case Studies",
      title: "Engineered for",
      highlight: "Performance & Scale",
      subtitle: "A deeper look into corporate product catalogues, technical platform migrations, and secure webhook integrations.",
    },
    demos: {
      eyebrow: "Interactive Architecture",
      title: "Direct System",
      highlight: "Demonstrations",
      subtitle: "Explore interactive views of product catalogue architecture, Core Web Vitals audits, and API webhook integrations.",
    },
    skills: {
      eyebrow: "Technical Competencies",
      title: "Tech Stack &",
      highlight: "Specializations",
      subtitle: "Battle-tested tools across WordPress/PHP development, modern Next.js/TypeScript, technical SEO, and data analytics.",
    },
    education: {
      eyebrow: "Academic Foundation",
      title: "Degrees &",
      highlight: "Credentials",
      subtitle: "B.Eng. in Computer Science combined with an M.Sc. in Management from PANS in Jarosław.",
    },
    contact: {
      title: "Let's Build Something",
      subtitle: "Have a web platform, catalogue or technical performance project in mind? Let's connect.",
      name: "Full Name",
      email: "Email Address",
      projectType: "Project / Role Type",
      message: "Your Message",
      send: "Send Message",
      rodo: "I consent to the processing of my personal data for the purpose of responding to this inquiry, in accordance with RODO (GDPR) regulations.",
      projectTypes: [
        "Web Platform Development",
        "WordPress & Custom PHP",
        "Product Catalogue Management",
        "Technical SEO & Core Web Vitals",
        "API & Webhook Integrations",
        "Other",
      ],
    },
  },
  pl: {
    nav: {
      impact: "Wyniki & ROI",
      projects: "Realizacje",
      demos: "Architektura",
      skills: "Umiejętności",
      education: "Edukacja",
      contact: "Kontakt",
    },
    hero: {
      headline: "Platformy Webowe Tworzone dla",
      headline2: "Ruchu, Wydajności i Wyników",
      subtitle:
        "Web Developer — platformy produktowe i rozwój techniczny. Łączy inżynierię informatyki z magistrem zarządzania. Specjalizuje się w WordPress/PHP, katalogach produktów, technicznym SEO i Core Web Vitals.",
      cta_primary: "Dla Rekruterów (30s)",
      cta_secondary: "Pobierz CV (PDF)",
      cta_demo: "Zobacz Case Studies",
      available: "Dostępny do pracy zdalnej w UE i hybrydowej",
    },
    impact: {
      eyebrow: "Wartość dla Biznesu",
      title: "Wpływ Inżynieryjny &",
      highlight: "Wymierne Wyniki",
      subtitle: "Dostarczanie mierzalnych rezultatów biznesowych: wzrost ruchu organicznego, poprawa Core Web Vitals i ciągłość działania platform na wielu rynkach.",
    },
    projects: {
      eyebrow: "Studia Przypadków",
      title: "Zaprojektowane dla",
      highlight: "Wydajności i Skali",
      subtitle: "Szczegółowy wgląd w ekosystem katalogów produktów, migracje platform i bezpieczne integracje webhooków.",
    },
    demos: {
      eyebrow: "Interaktywna Architektura",
      title: "Demonstracje",
      highlight: "Systemowe",
      subtitle: "Sprawdź architekturę katalogów produktów, audyty Core Web Vitals oraz integracje API webhooków.",
    },
    skills: {
      eyebrow: "Kompetencje Techniczne",
      title: "Stos Technologiczny &",
      highlight: "Narzędzia",
      subtitle: "Sprawdzone narzędzia w rozwoju WordPress/PHP, nowoczesnym Next.js/TypeScript, technicznym SEO i analityce.",
    },
    education: {
      eyebrow: "Wykształcenie",
      title: "Dyplomy i",
      highlight: "Kwalifikacje",
      subtitle: "Tytuł inżyniera informatyki połączony z magistrem zarządzania (PANS w Jarosławiu).",
    },
    contact: {
      title: "Zbudujmy coś razem",
      subtitle: "Masz projekt hardware, systemów wbudowanych lub MES? Porozmawiajmy.",
      name: "Imię i Nazwisko",
      email: "Adres E-mail",
      projectType: "Typ Projektu",
      message: "Twoja Wiadomość",
      send: "Wyślij Wiadomość",
      rodo: "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na niniejsze zapytanie, zgodnie z przepisami RODO.",
      projectTypes: [
        "Robotyka i Kioski Vendingowe",
        "Systemy Wbudowane ESP32-C6 & Mesh",
        "Architektura Przemysłowa MES",
        "Frezowanie CNC i Mechanika Precyzyjna",
        "Przemysłowe Bramki Raspberry Pi",
        "Inne",
      ],
    },
  },
} as const;

export type Lang = keyof typeof TRANSLATIONS;
