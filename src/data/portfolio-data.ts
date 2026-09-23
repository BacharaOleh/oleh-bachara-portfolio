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
      { value: "<10ms", label: "Low-Latency Industrial Mesh", icon: "Radio" },
      { value: "Factory I/O", label: "3D Digital Twin Simulation", icon: "Cpu" },
      { value: "100%", label: "Zero Punch Loss Standard", icon: "Shield" },
      { value: "FastAPI", label: "Async MES Architecture", icon: "Database" },
    ],
    pl: [
      { value: "<10ms", label: "Niskolatencyjna Sieć Mesh", icon: "Radio" },
      { value: "Factory I/O", label: "Symulacja Cyfrowego Bliźniaka", icon: "Cpu" },
      { value: "100%", label: "Standard Zero Punch Loss", icon: "Shield" },
      { value: "FastAPI", label: "Architektura Asynchroniczna MES", icon: "Database" },
    ],
  },
  business: {
    en: [
      { value: "+33% OEE", label: "Plant Throughput Increase", icon: "TrendingUp" },
      { value: "71.1k PLN", label: "Annual Gas Fuel Savings", icon: "Zap" },
      { value: "-40%", label: "Unscheduled Downtime Cut", icon: "ShieldCheck" },
      { value: "≥99.2%", label: "Industrial Edge Uptime", icon: "Server" },
    ],
    pl: [
      { value: "+33% OEE", label: "Wzrost Przepustowości Linii", icon: "TrendingUp" },
      { value: "71.1k PLN", label: "Roczne Oszczędności Gazu", icon: "Zap" },
      { value: "-40%", label: "Redukcja Mikroprzestojów", icon: "ShieldCheck" },
      { value: "≥99.2%", label: "Dostępność Bramek Edge", icon: "Server" },
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
        metric: "Factory I/O",
        metricLabel: "Virtual Commissioning",
        description: "Virtual commissioning in Factory I/O via Siemens PLCSIM & Modbus TCP, CAD/CAM mechanical modeling (AutoCAD, Fusion 360, SolidWorks, EPLAN), CNC laser cutting, and UR-5 robotic sorting.",
      },
      "embedded-mesh": {
        metric: "C/C++ & FreeRTOS",
        metricLabel: "Industrial IoT Mesh",
        description: "Embedded C/C++ firmware, zero-router P2P mesh architecture (ESP-NOW), Linux industrial edge gateways, and sub-10ms packet delivery in harsh RF environments.",
      },
      "industrial-mes": {
        metric: "MES/Web",
        metricLabel: "Real-time Telemetry",
        description: "Python FastAPI async queues, React 19 Canvas floor plan rendering, spindle RPM & tool wear monitoring, and automated production dispatch pipelines.",
      },
      "system-reliability": {
        metric: "Zero-Defect",
        metricLabel: "Plant Commissioning",
        description: "Control cabinet prefabrication (ZUT Kunzek), Android POS fiscal protocols (MostCentrService, RS-232/Bluetooth), and transactional Zero Punch Loss edge storage.",
      },
    },
    pl: {
      "hardware-robotics": {
        metric: "Factory I/O",
        metricLabel: "Wirtualne Uruchomienia",
        description: "Wirtualne uruchomienia w Factory I/O (Siemens PLCSIM, Modbus TCP, OPC UA), projektowanie CAD/CAM (AutoCAD, Fusion 360, SolidWorks, EPLAN), cięcie laserowe CNC oraz robotyka UR-5.",
      },
      "embedded-mesh": {
        metric: "C/C++ & FreeRTOS",
        metricLabel: "Przemysłowy Mesh IoT",
        description: "Oprogramowanie wbudowane C/C++, sieć kratowa P2P (ESP-NOW), przemysłowe bramki Linux Edge oraz czas dostarczania pakietów <10ms w trudnych warunkach zakłóceń.",
      },
      "industrial-mes": {
        metric: "MES/Web",
        metricLabel: "Telemetria Live",
        description: "Asynchroniczne kolejki Python FastAPI, wizualizacja planu hali na React 19 Canvas, telemetria wrzeciona i zużycia frezów oraz kolejkowanie zleceń.",
      },
      "system-reliability": {
        metric: "Zero Usterek",
        metricLabel: "Uruchomienia Obiektowe",
        description: "Prefabrykacja szaf sterowniczych (ZUT Kunzek), protokoły kas fiskalnych Android POS (MostCentrService, RS-232/Bluetooth) oraz standard bezstratnej rejestracji zdarzeń Zero Punch Loss.",
      },
    },
  },
  business: {
    en: {
      "hardware-robotics": {
        metric: "+33% OEE",
        metricLabel: "Line Throughput",
        description: "Industrial machine and PLC logic optimization (San-Pajda, Goodvalley) eliminating bottlenecks and delivering 71,124 PLN/year verified energy savings.",
      },
      "embedded-mesh": {
        metric: "99.2%+",
        metricLabel: "Network Uptime",
        description: "Zero external Wi-Fi router dependency ensures continuous operation and edge telemetry even in harsh factory conditions.",
      },
      "industrial-mes": {
        metric: "≤12h",
        metricLabel: "Order Fulfillment SLA",
        description: "Automated end-to-end pipeline from customer order to CNC machine queue enabling same-day parcel dispatch across courier networks.",
      },
      "system-reliability": {
        metric: "-40%",
        metricLabel: "Downtime Cut",
        description: "PLC algorithm refactoring, sensor debounce filters, and electrical interlocks eliminating micro-downtime across Goodvalley and San-Pajda production lines.",
      },
    },
    pl: {
      "hardware-robotics": {
        metric: "+33% OEE",
        metricLabel: "Przepustowość Linii",
        description: "Optymalizacja maszyn i logiki PLC (Siemens S7) w San-Pajda i Goodvalley, eliminująca wąskie gardła i generująca 71 124 PLN/rok potwierdzonych oszczędności gazu.",
      },
      "embedded-mesh": {
        metric: "99.2%+",
        metricLabel: "Dostępność Sieci",
        description: "Brak zależności od zewnętrznego routera Wi-Fi gwarantuje nieprzerwaną pracę i telemetrię węzłów w trudnych warunkach przemysłowych.",
      },
      "industrial-mes": {
        metric: "≤12h",
        metricLabel: "SLA Realizacji Zleceń",
        description: "Automatyczny przepływ od zamówienia klienta do kolejki obrabiarki CNC, umożliwiający wysyłkę tego samego dnia przez sieć paczkomatów.",
      },
      "system-reliability": {
        metric: "-40%",
        metricLabel: "Redukcja Przestojów",
        description: "Refaktoring algorytmów PLC, filtry zakłóceń czujników i blokady elektryczne eliminujące mikroprzestoje na liniach produkcyjnych Goodvalley i San-Pajda.",
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

export type ExpoAlignmentId =
  | "automation-plc"
  | "embedded-mesh"
  | "wfm-operations"
  | "hardware-mobile"
  | "world-of-ai"
  | "hr-tech"
  | "cyber-security"
  | "data-center";

export interface ExpoAlignment {
  id: ExpoAlignmentId;
  expoName: string;
  badge: string;
  vector: string;
  challenge: string;
  solution: string;
  metric: string;
  metricLabel: string;
  stack: string[];
  proofSystems: string[];
  ctaText: string;
  ctaTargetId: string;
}

export interface ConversionOffer {
  id: "industrial" | "startup" | "recruiter";
  targetAudience: string;
  title: string;
  description: string;
  deliverables: string[];
  badge: string;
  actionText: string;
  actionUrl: string;
}

// ─── CONTACT INFORMATION & SOCIAL LINKS ─────────────────────
export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/roman-deyneko",
  github: "https://github.com/NeKoRoM",
  email: "mailto:m.pnikut@gmail.com",
  telegram: "https://t.me/NeKoRoM",
  phone: "+48 791 265 019",
  tel: "tel:+48791265019",
  whatsapp: "https://wa.me/48791265019",
};

// ─── STATS ──────────────────────────────────────────────────
export const STATS: Record<"en" | "pl", Stat[]> = {
  en: [
    { value: "+33%", label: "Throughput Increase", icon: "TrendingUp" },
    { value: "71.1k PLN", label: "Annual Gas Fuel Savings", icon: "Zap" },
    { value: "-40%", label: "Unscheduled Downtime Cut", icon: "ShieldCheck" },
    { value: "Factory I/O", label: "3D Virtual Commissioning", icon: "Cpu" },
  ],
  pl: [
    { value: "+33%", label: "Wzrost Wydajności Linii", icon: "TrendingUp" },
    { value: "71.1k PLN", label: "Roczne Oszczędności Gazu", icon: "Zap" },
    { value: "-40%", label: "Redukcja Mikroprzestojów", icon: "ShieldCheck" },
    { value: "Factory I/O", label: "Wirtualne Uruchomienia 3D", icon: "Cpu" },
  ],
};

// ─── VALUE PROPOSITION CARDS ────────────────────────────────
export const VALUE_CARDS: Record<"en" | "pl", ValueCard[]> = {
  en: [
    {
      id: "hardware-robotics",
      icon: "Crosshair",
      title: "Industrial Automation, CAD/CAM & Factory I/O",
      description:
        "Virtual commissioning in Factory I/O via Siemens PLCSIM and Modbus TCP, mechanical CAD/CAM (AutoCAD, Fusion 360, SolidWorks, EPLAN), CNC laser cutting nesting, and UR-5 robotic sorting.",
      metric: "Factory I/O",
      metricLabel: "Virtual Commissioning",
      tags: ["Factory I/O", "Siemens PLCSIM", "CAD/CAM", "CNC Laser", "UR-5 / Sick"],
      accentColor: "indigo",
      span: "wide",
    },
    {
      id: "embedded-mesh",
      icon: "Radio",
      title: "Embedded C/C++, FreeRTOS & Industrial Mesh",
      description:
        "Production firmware on 32-bit MCUs (ESP32/STM32) and FreeRTOS: zero-router P2P wireless mesh architecture, industrial Linux edge gateways, RS485 fieldbuses, and sub-10ms packet delivery in harsh RF environments.",
      metric: "<10ms",
      metricLabel: "Packet Latency",
      tags: ["Embedded C/C++", "FreeRTOS", "Industrial Wireless Mesh", "Edge Computing"],
      accentColor: "cyan",
      span: "normal",
    },
    {
      id: "industrial-mes",
      icon: "Database",
      title: "Real-Time Industrial MES & Digital Twin",
      description:
        "Python FastAPI async queues, React 19 Canvas floor plan rendering at 60 FPS, spindle RPM and tool wear telemetry streaming, and automated production dispatch pipelines.",
      metric: "60 FPS",
      metricLabel: "Canvas Digital Twin",
      tags: ["Python FastAPI", "React 19 Canvas", "MES Dispatching", "Telemetry"],
      accentColor: "violet",
      span: "normal",
    },
    {
      id: "system-reliability",
      icon: "Shield",
      title: "System Reliability & Industrial Commissioning",
      description:
        "Control cabinet prefabrication (ZUT Kunzek), line commissioning & PLC optimization (Goodvalley, San-Pajda), Android POS fiscal protocols (MostCentrService), and Zero Punch Loss standard.",
      metric: "-40%",
      metricLabel: "Downtime Cut",
      tags: ["Siemens S7", "Control Cabinets", "Android POS", "Zero Punch Loss"],
      accentColor: "emerald",
      span: "wide",
    },
  ],
  pl: [
    {
      id: "hardware-robotics",
      icon: "Crosshair",
      title: "Automatyka Przemysłowa, CAD/CAM & Factory I/O",
      description:
        "Wirtualne uruchomienia w Factory I/O (Siemens PLCSIM, Modbus TCP, OPC UA), projektowanie CAD/CAM (AutoCAD, Fusion 360, SolidWorks, EPLAN), cięcie laserowe CNC oraz robotyka UR-5.",
      metric: "Factory I/O",
      metricLabel: "Wirtualne Uruchomienia",
      tags: ["Factory I/O", "Siemens PLCSIM", "CAD/CAM", "Cięcie Laserowe", "UR-5 / Sick"],
      accentColor: "indigo",
      span: "wide",
    },
    {
      id: "embedded-mesh",
      icon: "Radio",
      title: "Systemy Wbudowane C/C++, FreeRTOS & Mesh Przemysłowy",
      description:
        "Oprogramowanie układowe na mikrokontrolery 32-bit (ESP32/STM32) i FreeRTOS: bezrouterowa sieć kratowa P2P (ESP-NOW), przemysłowe bramki Linux Edge, magistrale RS-485 i latencja <10ms w trudnych warunkach zakłóceń.",
      metric: "<10ms",
      metricLabel: "Opóźnienie Pakietu",
      tags: ["Embedded C/C++", "FreeRTOS", "Mesh Przemysłowy", "Edge Computing"],
      accentColor: "cyan",
      span: "normal",
    },
    {
      id: "industrial-mes",
      icon: "Database",
      title: "Przemysłowy MES & Cyfrowy Bliźniak (Digital Twin)",
      description:
        "Asynchroniczne kolejki Python FastAPI, wizualizacja planu hali na React 19 Canvas w 60 FPS, telemetria wrzeciona i zużycia frezów oraz kolejkowanie zleceń.",
      metric: "60 FPS",
      metricLabel: "Canvas Digital Twin",
      tags: ["Python FastAPI", "React 19 Canvas", "Kolejkowanie MES", "Telemetria"],
      accentColor: "violet",
      span: "normal",
    },
    {
      id: "system-reliability",
      icon: "Shield",
      title: "Niezawodność Systemowa & Uruchomienia Przemysłowe",
      description:
        "Prefabrykacja szaf sterowniczych (ZUT Kunzek), uruchomienia obiektowe i optymalizacja PLC (Goodvalley, San-Pajda), protokoły kas fiskalnych Android POS (MostCentrService) oraz standard Zero Punch Loss.",
      metric: "-40%",
      metricLabel: "Redukcja Przestojów",
      tags: ["Siemens S7", "Szafy Sterownicze", "Android POS", "Zero Punch Loss"],
      accentColor: "emerald",
      span: "wide",
    },
  ],
};

// ─── CASE STUDIES ───────────────────────────────────────────
export const PROJECTS: Record<"en" | "pl", Project[]> = {
  en: [
    {
      id: "san-pajda-automation",
      title: "San-Pajda: Turbomixer SCADA & Oven Energy Optimization",
      category: "Lead Industrial Automation Engineer (Fabryka Ciastek San-Pajda)",
      tags: ["Siemens S7", "Turbomixer SCADA", "Oven Optimization", "Throughput +33%", "71.1k PLN/yr Savings", "Gantt 57d"],
      shortDescription:
        "Engineered Turbomixer control architecture (57-day deployment, 25.4k PLN CAPEX) and optimized meringue gas oven baking lines, achieving +33% throughput and 71,124 PLN/yr gas savings.",
      fullDescription:
        "As Lead Industrial Automation Engineer at Fabryka Ciastek San-Pajda Sp. z o.o. in Jarosław, architected and executed the end-to-end Turbomixer continuous aeration integration and gas baking oven modernization. Deployed Siemens S7 PLC controls and upper-level SCADA supervision on a strict 57-day Gantt timeline under 25,400 PLN direct CAPEX. Refactored gas burner PID curves and conveyor baking speed for meringue production, achieving a +33% oven capacity increase and 71,124 PLN/year verified gas fuel savings.",
      metrics: [
        { label: "Throughput", value: "+33%" },
        { label: "Gas Savings", value: "71.1k PLN/yr" },
        { label: "Turbomixer CAPEX", value: "25.4k PLN" },
        { label: "Timeline", value: "57 Days" },
      ],
      accentColor: "amber",
    },
    {
      id: "goodvalley-automation",
      title: "Goodvalley: Food Processing Lines, MES & Mesh Automation",
      category: "Industrial Automation & Commissioning Engineer (Goodvalley)",
      tags: ["Siemens S7", "Plant MES", "workTime WFM", "ESP-NOW Mesh", "Energy Telemetry", "Warehouse WMS"],
      shortDescription:
        "Commissioned processing lines (Siemens S7, -40% downtime), deployed plant MES & workTime WFM, engineered ESP-NOW mesh telemetry, energy meters readout, and warehouse picking software.",
      fullDescription:
        "Conducted industrial automation commissioning, electrical diagnostics, and Siemens S7 PLC software refactoring across meat processing and multi-stage packaging lines at Goodvalley Agro-Industrial Complex in Przechlewo (-40% micro-downtime, 99.4% stability). Architected and deployed the plant MES platform and workTime WFM shift dispatching, engineered low-latency ESP-NOW wireless mesh telemetry, automated industrial energy meter data acquisition, and developed custom warehouse management software for spare parts and tool picking.",
      metrics: [
        { label: "Downtime", value: "-40%" },
        { label: "Architecture", value: "MES & Mesh" },
        { label: "Facility", value: "Przechlewo" },
        { label: "Line Stability", value: "99.4%" },
      ],
      accentColor: "indigo",
    },
    {
      id: "wfm-industrial-mes",
      title: "WFM & Industrial MES Platform",
      category: "Industrial Software & Dispatching",
      tags: ["Python FastAPI", "React 19", "HTML5 Canvas", "Raspberry Pi", "Realtime Queues", "MES"],
      shortDescription:
        "End-to-end manufacturing execution system connecting factory floor telemetry, interactive Canvas floor plans, and production queues.",
      fullDescription:
        "Architected an industrial Manufacturing Execution System (MES) designed to coordinate workshop machinery, operator workflows, and real-time order dispatching. Features a responsive React 19 Canvas floor plan displaying live station states and spindle RPM telemetry. The asynchronous Python FastAPI backend orchestrates production jobs from intake to machine execution, enabling same-day parcel dispatch SLAs under 12 hours.",
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
  ],
  pl: [
    {
      id: "san-pajda-automation",
      title: "San-Pajda: SCADA Turbomikser & Optymalizacja Energetyczna Pieca",
      category: "Główny Inżynier Automatyk (Fabryka Ciastek San-Pajda)",
      tags: ["Siemens S7", "SCADA Turbomikser", "Optymalizacja Pieca", "Wydajność +33%", "71.1k PLN/rok", "Gantt 57d"],
      shortDescription:
        "Zaprojektowałem architekturę sterowania turbomikserem (wdrożenie w 57 dni, 25.4k PLN CAPEX) oraz zoptymalizowałem linię pieca gazowego bezów (+33% wydajności, 71 124 PLN/rok oszczędności).",
      fullDescription:
        "Jako Główny Inżynier Automatyk w Fabryce Ciastek San-Pajda Sp. z o.o. w Jarosławiu zaprojektowałem i wdrożyłem układ napowietrzania ciasta Turbomixer oraz zoptymalizowałem proces wypieku w piecu gazowym. Zrealizowałem integrację sterowników Siemens S7 PLC i nadrzędnego systemu SCADA w rygorystycznym harmonogramie 57 dni (CAPEX: 25 400 PLN). Optymalizacja krzywych PID palników i prędkości pieca przyniosła wzrost wydajności o +33% oraz 71 124 PLN/rok udokumentowanych oszczędności gazu.",
      metrics: [
        { label: "Wydajność Linii", value: "+33%" },
        { label: "Oszczędność Gazu", value: "71.1k PLN/rok" },
        { label: "CAPEX Turbomiksera", value: "25.4k PLN" },
        { label: "Czas Realizacji", value: "57 Dni" },
      ],
      accentColor: "amber",
    },
    {
      id: "goodvalley-automation",
      title: "Goodvalley: Linie Przetwórstwa, MES & Automatyzacja Mesh",
      category: "Inżynier ds. Automatyzacji i Uruchomień Przemysłowych (Goodvalley)",
      tags: ["Siemens S7", "Platforma MES", "workTime WFM", "ESP-NOW Mesh", "Telemetria Energii", "System Magazynowy"],
      shortDescription:
        "Uruchomienia linii (Siemens S7, -40% przestojów), wdrożenie platformy MES i workTime WFM, telemetria mesh ESP-NOW, odczyt liczników energii i program magazynu części.",
      fullDescription:
        "Prowadzenie uruchomień automatyki przemysłowej, diagnostyki elektrycznej i refaktoringu programów PLC Siemens S7 na liniach przetwórstwa mięsnego i stacjach pakowania w kompleksie Goodvalley w Przechlewie (-40% mikroprzestojów, 99.4% stabilności). Zaprojektowałem i wdrożyłem zakładową platformę MES oraz dyspozytornię workTime WFM, rozwinąłem bezprzewodową sieć telemetryczną mesh ESP-NOW (<10ms), zautomatyzowałem zczytywanie przemysłowych liczników energii oraz stworzyłem dedykowany program magazynowy do ewidencji i pobierania części zamiennych/narzędzi.",
      metrics: [
        { label: "Przestoje", value: "-40%" },
        { label: "Architektura", value: "MES & Mesh" },
        { label: "Zakład", value: "Przechlewo" },
        { label: "Stabilność Linii", value: "99.4%" },
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
  ],
};

// ─── DOMAIN & INDUSTRY ALIGNMENTS (ENGINEERING VECTORS) ────────
export const EXPO_ALIGNMENTS: Record<"en" | "pl", ExpoAlignment[]> = {
  en: [
    {
      id: "automation-plc",
      expoName: "Industrial Automation & PLC",
      badge: "Siemens S7 & Factory I/O",
      vector: "PLC Logic Refactoring, 3D Virtual Commissioning & OEE Optimization",
      challenge:
        "Unoptimized machine cyclograms, sensor bounce causing micro-stoppages, and costly production downtime during on-site commissioning on active plant floors.",
      solution:
        "3D virtual commissioning in Factory I/O (Siemens PLCSIM / Modbus TCP / OPC UA) before physical deployment; PLC algorithm refactoring (Siemens S7-1200/1500 in TIA Portal) delivering -40% micro-stoppages at Goodvalley and +33% throughput with 71,124 PLN/yr gas savings at San-Pajda; EPLAN schematics and CNC laser cutting.",
      metric: "-40% / +33%",
      metricLabel: "Downtime Cut & Throughput Gain",
      stack: ["Siemens S7 (TIA Portal)", "Factory I/O (3D Twin)", "PLCSIM / OPC UA", "EPLAN Electric P8", "UR-5 & OpenCV"],
      proofSystems: ["San-Pajda Turbomixer", "Goodvalley Packaging Lines", "Colorland Virtual Twin"],
      ctaText: "Explore Industrial Automation & PLC",
      ctaTargetId: "turbomixer-scada",
    },
    {
      id: "embedded-mesh",
      expoName: "Distributed Embedded Mesh & Edge IoT",
      badge: "Sub-10ms P2P Mesh",
      vector: "Zero-Router ESP-NOW Mesh, FreeRTOS Firmware & Industrial Gateways",
      challenge:
        "Unreliable corporate Wi-Fi in harsh factory RF environments, micro-SD / flash storage corruption from abrupt industrial power cuts, and lack of deterministic edge communication.",
      solution:
        "Decentralized peer-to-peer (P2P) wireless mesh on ESP32-C6 (ESP-NOW protocol) delivering sub-10ms packet latency without external routers; hardened Raspberry Pi edge gateway with Read-Only Rootfs (overlayfs) and hardware watchdog (/dev/watchdog); custom hardware interface modules and reverse-engineered machine protocols.",
      metric: "<10ms",
      metricLabel: "P2P Mesh Delivery Latency",
      stack: ["ESP32-C6 (RISC-V)", "ESP-NOW Protocol", "FreeRTOS / PlatformIO", "Raspberry Pi (Linux Edge)", "Read-Only Rootfs"],
      proofSystems: ["c6 / espProg Nodes", "espNow Multi-Hop", "rpi2 IoT Gateway"],
      ctaText: "Explore Embedded Mesh & Edge IoT",
      ctaTargetId: "embedded-mesh-iot",
    },
    {
      id: "wfm-operations",
      expoName: "Industrial WFM & Plant Operations",
      badge: "Zero Punch Loss (100%)",
      vector: "Workforce Management, Dead-Letter Queue & Plant Telemetry",
      challenge:
        "Unrecorded employee punches during factory network outages causing payroll disputes and compliance fines, untracked spare parts for machine maintenance, and manual energy monitoring.",
      solution:
        "Industrial WFM platform (workTime) with transactional offline Dead-Letter Queue on Raspberry Pi (rpi2), guaranteeing 100% Zero Physical Punch Loss for RFID and PIN events; automated Shift Leader Incident Portal and official blank generator (doc); WMS parts dispensing module and automated industrial energy meter telemetry.",
      metric: "100%",
      metricLabel: "Zero Physical Punch Loss Standard",
      stack: ["workTime (FastAPI + React 19)", "Dead-Letter Queue (rpi2)", "RFID (Wiegand/SPI)", "WMS Parts Dispensing", "Energy Meter Telemetry"],
      proofSystems: ["workTime WFM", "rpi2 Gateway", "Goodvalley Production Ops"],
      ctaText: "Explore WFM & MES Operations",
      ctaTargetId: "wfm-industrial-mes",
    },
    {
      id: "hardware-mobile",
      expoName: "Hardware Integration & Mobile POS",
      badge: "RS-232, BLE & Modbus",
      vector: "Android Hardware Drivers, Serial Industrial Buses & Digital Twin Canvas",
      challenge:
        "Incompatibility of legacy peripheral equipment (fiscal cash registers, industrial scales, barcode scanners, access control readers) with mobile systems, and high UI latency when monitoring machine states.",
      solution:
        "Commercial mobile POS architecture (Android / Kotlin, Jetpack Compose) with low-level protocol drivers for RS-232 serial buses and Bluetooth SPP/BLE integrating fiscal printers (Posnet, Novitus, Elzab, Datex) and scales; hardware Wiegand/Clock-Data decoders; real-time 60 FPS factory floor visualization on React 19 Canvas.",
      metric: "60 FPS / <10ms",
      metricLabel: "Canvas Render & Serial Protocol Response",
      stack: ["Android (Kotlin / Compose)", "RS-232 / USB Serial", "Bluetooth SPP / BLE", "Modbus RTU/TCP", "HTML5 Canvas (React 19)"],
      proofSystems: ["MostCentrService / KasaMobile POS", "wiegandReader & rs485", "factory 2D Canvas Twin"],
      ctaText: "Explore Hardware & Digital Twin",
      ctaTargetId: "wfm-industrial-mes",
    },
  ],
  pl: [
    {
      id: "automation-plc",
      expoName: "Automatyka Przemysłowa & PLC",
      badge: "Siemens S7 & Factory I/O",
      vector: "Refaktoring Logiki PLC, Wirtualne Uruchomienia 3D & Optymalizacja OEE",
      challenge:
        "Niezoptymalizowane cyklogramy maszyn, zakłócenia sygnałów czujników powodujące mikroprzestoje oraz kosztowne postoje linii podczas uruchomień bezpośrednio na obiekcie.",
      solution:
        "Wirtualne uruchomienia 3D w Factory I/O (Siemens PLCSIM / Modbus TCP / OPC UA) przed wdrożeniem na obiekcie; refaktoring logiki PLC (Siemens S7-1200/1500 w TIA Portal) redukujący mikroprzestoje o -40% w Goodvalley oraz zwiększający przepustowość o +33% z 71 124 PLN/rok oszczędności gazu w San-Pajda; schematy EPLAN i cięcie laserowe CNC.",
      metric: "-40% / +33%",
      metricLabel: "Redukcja Przestojów & Wzrost Wydajności",
      stack: ["Siemens S7 (TIA Portal)", "Factory I/O (3D Twin)", "PLCSIM / OPC UA", "EPLAN Electric P8", "UR-5 & OpenCV"],
      proofSystems: ["Turbomikser San-Pajda", "Linie Pakujące Goodvalley", "Wirtualny Bliźniak Colorland"],
      ctaText: "Zobacz Automatykę Przemysłową & PLC",
      ctaTargetId: "turbomixer-scada",
    },
    {
      id: "embedded-mesh",
      expoName: "Rozproszony Mesh Wbudowany & Edge IoT",
      badge: "Mesh P2P Poniżej 10ms",
      vector: "Bezrouterowa Sieć ESP-NOW, Firmware FreeRTOS & Bramki Przemysłowe",
      challenge:
        "Niestabilne zakładowe Wi-Fi w warunkach silnych zakłóceń elektromagnetycznych hal, uszkodzenia pamięci flash po nagłych zanikach zasilania oraz brak determinizmu komunikacji brzegowej.",
      solution:
        "Zdecentralizowana sieć kratowa P2P na ESP32-C6 (protokół ESP-NOW) zapewniająca opóźnienia pakietów <10ms bez zewnętrznego routera; wzmocniona bramka brzegowa Raspberry Pi z partycją Read-Only Rootfs (overlayfs) i sprzętowym watchdogiem; autorskie moduły sprzętowe i analiza protokołów maszyn.",
      metric: "<10ms",
      metricLabel: "Opóźnienie Dostarczania Pakietów Mesh",
      stack: ["ESP32-C6 (RISC-V)", "Protokół ESP-NOW", "FreeRTOS / PlatformIO", "Raspberry Pi (Linux Edge)", "Read-Only Rootfs"],
      proofSystems: ["Węzły c6 / espProg", "Mesh Multi-Hop espNow", "Bramka IoT rpi2"],
      ctaText: "Zobacz Mesh Wbudowany & Edge IoT",
      ctaTargetId: "embedded-mesh-iot",
    },
    {
      id: "wfm-operations",
      expoName: "Przemysłowe WFM & Operacje Zakładowe",
      badge: "Zero Punch Loss (100%)",
      vector: "System RCP workTime, Kolejkowanie Offline & Telemetria Zakładowa",
      challenge:
        "Utrata odbić kart pracowników przy awariach sieci zakładowej (spory płacowe, kary inspekcji), brak ewidencji części zamiennych do serwisu maszyn oraz ręczny odczyt zużycia energii.",
      solution:
        "Przemysłowa platforma WFM (workTime) z lokalną transakcyjną kolejką Dead-Letter Queue na Raspberry Pi (rpi2) gwarantująca 100% Zero Physical Punch Loss dla zdarzeń RFID i PIN; panel lidera zmiany z obsługą incydentów i generatorem druków (doc); moduł magazynowy WMS pobierania części oraz automatyczna telemetria liczników energii.",
      metric: "100%",
      metricLabel: "Gwarancja Zerowej Utraty Odbić",
      stack: ["workTime (FastAPI + React 19)", "Kolejka Dead-Letter (rpi2)", "RFID (Wiegand/SPI)", "Magazyn Części WMS", "Telemetria Liczników Energii"],
      proofSystems: ["workTime WFM", "Bramka rpi2", "Operacje Produkcyjne Goodvalley"],
      ctaText: "Zobacz WFM & Operacje MES",
      ctaTargetId: "wfm-industrial-mes",
    },
    {
      id: "hardware-mobile",
      expoName: "Integracja Sprzętowa & Mobile POS",
      badge: "RS-232, BLE & Modbus",
      vector: "Sterowniki Sprzętowe Android, Magistrale Szeregowe & Cyfrowy Bliźniak",
      challenge:
        "Niekompatybilność urządzeń peryferyjnych (drukarki fiskalne, wagi przemysłowe, skanery, czytniki KD) z nowoczesnymi systemami mobilnymi oraz opóźnienia interfejsu przy wizualizacji stanu maszyn.",
      solution:
        "Komercyjne aplikacje Android POS (Kotlin, Jetpack Compose) z niskopoziomowymi sterownikami magistral RS-232 i Bluetooth SPP/BLE do obsługi drukarek fiskalnych (Posnet, Novitus, Elzab, Datex) i wag; dekodery sprzętowe Wiegand/Clock-Data; wizualizacja planu hali w 60 FPS na React 19 Canvas.",
      metric: "60 FPS / <10ms",
      metricLabel: "Render Canvas & Czas Odpowiedzi Magistrali",
      stack: ["Android (Kotlin / Compose)", "RS-232 / USB Serial", "Bluetooth SPP / BLE", "Modbus RTU/TCP", "HTML5 Canvas (React 19)"],
      proofSystems: ["MostCentrService / KasaMobile POS", "Mosty wiegandReader & rs485", "Cyfrowy Bliźniak 2D factory"],
      ctaText: "Zobacz Integrację Sprzętową & Bliźniaka",
      ctaTargetId: "wfm-industrial-mes",
    },
  ],
};

// ─── CONVERSION OFFERS (THE IRRESISTIBLE OFFER) ─────────────
export const CONVERSION_OFFERS: Record<"en" | "pl", ConversionOffer[]> = {
  en: [
    {
      id: "industrial",
      targetAudience: "Industrial Plants & Manufacturing",
      badge: "Zero-Risk Express Audit",
      title: "45-Minute Line & PLC Bottleneck Audit",
      description:
        "During a focused technical session, we will review your current machine cycle diagram, PLC logic, and line interlocks to identify 2–3 immediate micro-stoppages or speed leaks without halting production.",
      deliverables: [
        "Identification of 2–3 micro-downtime causes",
        "Actionable PLC & sensor timing optimization plan",
        "Estimated line throughput gain and energy savings",
      ],
      actionText: "Request 45-Min Technical Audit",
      actionUrl: "https://t.me/NeKoRoM?text=Hello%20Roman,%20I%20would%20like%20to%20request%20the%2045-Minute%20Industrial%20Line%20Audit.",
    },
    {
      id: "startup",
      targetAudience: "Industrial IoT & Automation Startups",
      badge: "Architecture & IIoT",
      title: "Architecture Review & IIoT Feasibility Call",
      description:
        "Transition from concept to industrial rollout: evaluate 3D virtual commissioning (Factory I/O), MCU selection (ESP32-C6 vs STM32), Android POS fiscal integration, and zero-router wireless mesh network architecture.",
      deliverables: [
        "Industrial firmware & wireless mesh topology feasibility",
        "Virtual commissioning & CAD/CAM integration roadmap",
        "Edge gateway & transactional offline storage architecture",
      ],
      actionText: "Book Architecture Feasibility Call",
      actionUrl: "https://t.me/NeKoRoM?text=Hello%20Roman,%20I%20would%20like%20to%20book%20an%20Architecture%20Feasibility%20Call.",
    },
    {
      id: "recruiter",
      targetAudience: "HR & Fast-Track Hiring",
      badge: "1-Click Direct Access",
      title: "Executive Instant Screening & Dossier",
      description:
        "Download the verified 1-page ATS profile, review academic diplomas (493 ECTS), verify EU legal work status, and book a direct 15-minute screening call with no intermediary delays.",
      deliverables: [
        "1-Page ATS PDF Resume (EN or PL with RODO)",
        "Triple competence verification (M.Sc. + 2x B.Sc. Eng.)",
        "Direct chat in Telegram / WhatsApp (+48 791 265 019)",
      ],
      actionText: "Open Telegram @NeKoRoM",
      actionUrl: "https://t.me/NeKoRoM",
    },
  ],
  pl: [
    {
      id: "industrial",
      targetAudience: "Zakłady Produkcyjne & Przemysł",
      badge: "Bezpłatny Audyt Express",
      title: "45-Minutowy Audyt Wąskich Gardeł Linii & PLC",
      description:
        "Podczas zwięzłej sesji technicznej przeanalizujemy aktualne cyklogramy maszyn, program sterownika PLC oraz blokady międzyoperacyjne, aby wskazać 2–3 źródła mikroprzestojów bez zatrzymywania produkcji.",
      deliverables: [
        "Identyfikacja 2–3 przyczyn mikroprzestojów linii",
        "Konkretny plan optymalizacji czasów PLC i czujników",
        "Szacunek wzrostu wydajności i oszczędności energii",
      ],
      actionText: "Zamów 45-Min Audyt Techniczny",
      actionUrl: "https://t.me/NeKoRoM?text=Cześć%20Roman,%20chciałbym%20umówić%2045-minutowy%20audyt%20techniczny%20linii%20i%20PLC.",
    },
    {
      id: "startup",
      targetAudience: "Startupy IIoT & Automatyki Przemysłowej",
      badge: "Architektura & IIoT",
      title: "Przegląd Architektury & Konsultacja IIoT",
      description:
        "Przejście od koncepcji do wdrożenia przemysłowego: weryfikacja wirtualnych uruchomień (Factory I/O), dobór MCU (ESP32-C6 vs STM32), integracje Android POS z drukarkami fiskalnymi oraz bezprzewodowa sieć kratowa mesh.",
      deliverables: [
        "Weryfikacja topologii firmware i sieci bezprzewodowej mesh",
        "Plan wirtualnych uruchomień i integracji CAD/CAM",
        "Architektura bramek brzegowych i bezstratnej bazy offline",
      ],
      actionText: "Umów Konsultację Architektury",
      actionUrl: "https://t.me/NeKoRoM?text=Cześć%20Roman,%20chciałbym%20umówić%20konsultację%20architektury%20i%20IIoT.",
    },
    {
      id: "recruiter",
      targetAudience: "HR & Rekruterzy Techniczni",
      badge: "Szybki Kontakt w 1 Klik",
      title: "Executive Instant Screening & Dossier",
      description:
        "Pobierz 1-stronicowy profil ATS, zweryfikuj potrójne wykształcenie (493 ECTS), potwierdź pełne prawa pracy w UE i porozmawiaj bezpośrednio w 15-minutowej rozmowie bez pośredników.",
      deliverables: [
        "1-stronicowe CV PDF w formacie ATS (PL z RODO lub EN)",
        "Potwierdzenie 3 dyplomów (Mgr + 2x Inż. PANS)",
        "Bezpośredni kontakt w Telegram / WhatsApp (+48 791 265 019)",
      ],
      actionText: "Napisz na Telegram @NeKoRoM",
      actionUrl: "https://t.me/NeKoRoM",
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
        { name: "ESP-NOW Wireless Mesh", badge: "Core", experience: "P2P Low-Latency Protocol (<10ms)" },
        { name: "Factory I/O 3D Simulation", badge: "Core", experience: "Virtual Commissioning & Siemens PLCSIM" },
        { name: "CAD/CAM (AutoCAD/Fusion/SolidWorks)", badge: "Core", experience: "Mechanical Modeling & EPLAN Schematics" },
        { name: "CNC Laser Cutting (Trumpf/Bystronic)", badge: "Core", experience: "Nesting, DXF/G-code & Laser Cutting" },
        { name: "Control Cabinets (Szafy Sterownicze)", badge: "Core", experience: "Prefabrication, Wiring & I/O Testing" },
        { name: "Raspberry Pi Edge Gateway", badge: "Core", experience: "Linux Edge Daemon & Telemetry" },
        { name: "RS485 & Modbus RTU/TCP", badge: "Advanced", experience: "Industrial Field Buses & Field Instruments" },
        { name: "C / C++ (PlatformIO)", badge: "Core", experience: "Embedded Firmware Architecture" },
        { name: "Industrial Robotics (UR-5)", badge: "Advanced", experience: "Robotic Arm Sorting & Sick Vision" },
        { name: "3D Prototyping (FDM/SLA)", badge: "Core", experience: "Rapid Iterative Hardware R&D" },
        { name: "Electronics & Diagnostics", badge: "Advanced", experience: "Oscilloscopes & Logic Analyzers" },
      ],
    },
    {
      id: "fullstack-software",
      label: "Full-Stack & Software",
      skills: [
        { name: "Python (FastAPI)", badge: "Core", experience: "Async Queues, WebSockets & APIs" },
        { name: "Android SDK & Kotlin", badge: "Core", experience: "Jetpack Compose, Clean Architecture, Hilt & Room" },
        { name: "Fiscal Protocols & POS (RS-232)", badge: "Core", experience: "Posnet, Novitus, Elzab, Datex & Bluetooth SPP/BLE" },
        { name: "React 19 & TypeScript", badge: "Core", experience: "Modern Components & Hooks" },
        { name: "HTML5 Canvas", badge: "Advanced", experience: "Real-time Factory Floor Plan" },
        { name: "OpenCV Computer Vision", badge: "Advanced", experience: "Industrial Geometry & Defect Inspection" },
        { name: "Next.js 16 (App Router)", badge: "Advanced", experience: "SSR, Turbopack & Web Vitals" },
        { name: "Tailwind CSS v4", badge: "Core", experience: "Design Tokens & Responsive UI" },
        { name: "SQLite / PostgreSQL", badge: "Advanced", experience: "MES Schema & Transactional Edge Storage" },
        { name: "Embedded Grafana & InfluxDB", badge: "Advanced", experience: "OEE Telemetry, ECharts & Kiosk Dashboards" },
        { name: "Docker, Compose & Hub", badge: "Core", experience: "Multi-arch ARM64/x86, Registries, Edge Stacks" },
        { name: "Git & GitHub CI/CD", badge: "Core", experience: "GitHub Actions, Multi-stage Builds & Releases" },
      ],
    },
    {
      id: "industrial-management",
      label: "Engineering Leadership, Agile & R&D",
      skills: [
        { name: "Agile & Scrum Delivery", badge: "Core", experience: "Sprint Planning, Backlog & Velocity" },
        { name: "Jira, Confluence & Git", badge: "Core", experience: "Epics, Issues, ADRs & Release Cycles" },
        { name: "Lean Manufacturing & OEE", badge: "Core", experience: "Bottleneck Elimination & Cycle Time (-40%)" },
        { name: "Turbomixer Commissioning (57d)", badge: "Core", experience: "Full Cycle Deployment (25.4k PLN direct CAPEX)" },
        { name: "Plant Energy Optimization", badge: "Core", experience: "+33% Oven Throughput & 71.1k PLN/yr Gas Savings" },
        { name: "Cross-Functional Leadership", badge: "Core", experience: "Bridging Software, Firmware & Plant Ops" },
        { name: "Industrial Commissioning", badge: "Core", experience: "Goodvalley, San-Pajda, Siemens S7 & SCADA" },
        { name: "Quality Audit & CE Compliance", badge: "Advanced", experience: "ISO 9001, Zero Punch Loss & Machinery Safety" },
      ],
    },
  ],
  pl: [
    {
      id: "embedded-hardware",
      label: "Systemy Wbudowane & Hardware",
      skills: [
        { name: "ESP32-C6 / ESP-IDF", badge: "Core", experience: "Firmware PlatformIO i FreeRTOS" },
        { name: "Sieć Mesh ESP-NOW", badge: "Core", experience: "Niskolatencyjny Protokół P2P (<10ms)" },
        { name: "Symulacja 3D Factory I/O", badge: "Core", experience: "Wirtualne Uruchomienia & Siemens PLCSIM" },
        { name: "CAD/CAM (AutoCAD/Fusion/SolidWorks)", badge: "Core", experience: "Modelowanie 3D i Schematy EPLAN" },
        { name: "Cięcie Laserowe CNC (Trumpf/Bystronic)", badge: "Core", experience: "Nesting, DXF/G-code i Obróbka Laserowa" },
        { name: "Szafy Sterownicze & Prefabrykacja", badge: "Core", experience: "Montaż Szaf, Okablowanie i Pomiary I/O" },
        { name: "Bramka Edge Raspberry Pi", badge: "Core", experience: "Demony Linux Edge i Telemetria" },
        { name: "RS485 & Modbus RTU/TCP", badge: "Advanced", experience: "Magistrale Przemysłowe i Aparatura Obiektowa" },
        { name: "C / C++ (PlatformIO)", badge: "Core", experience: "Architektura Oprogramowania Wbudowanego" },
        { name: "Robotyka Przemysłowa (UR-5)", badge: "Advanced", experience: "Sortowanie Ramieniem Robotycznym i Wizja Sick" },
        { name: "Druk 3D (FDM/SLA)", badge: "Core", experience: "Szybkie Prototypowanie R&D" },
        { name: "Elektronika i Diagnostyka", badge: "Advanced", experience: "Oscyloskopy i Analizatory Logiczne" },
      ],
    },
    {
      id: "fullstack-software",
      label: "Full-Stack & Oprogramowanie",
      skills: [
        { name: "Python (FastAPI)", badge: "Core", experience: "Kolejki Asynchroniczne, API i Sockets" },
        { name: "Android SDK & Kotlin", badge: "Core", experience: "Jetpack Compose, Clean Architecture, Hilt & Room" },
        { name: "Protokoły Fiskalne & POS (RS-232)", badge: "Core", experience: "Posnet, Novitus, Elzab, Datex & Bluetooth SPP/BLE" },
        { name: "React 19 & TypeScript", badge: "Core", experience: "Nowoczesne Komponenty i Hooki" },
        { name: "HTML5 Canvas", badge: "Advanced", experience: "Plan Hali Produkcyjnej w Czasie Rzeczywistym" },
        { name: "Wizja Maszynowa OpenCV", badge: "Advanced", experience: "Detekcja Wad i Geometrii Części" },
        { name: "Next.js 16 (App Router)", badge: "Advanced", experience: "SSR, Turbopack i Wydajność" },
        { name: "Tailwind CSS v4", badge: "Core", experience: "Tokeny Wizualne i Responsywność" },
        { name: "SQLite / PostgreSQL", badge: "Advanced", experience: "Schematy MES i Bezstratny Zapis Offline" },
        { name: "Embedded Grafana & InfluxDB", badge: "Advanced", experience: "Telemetria OEE, ECharts i Panele Kiosk" },
        { name: "Docker, Compose & Hub", badge: "Core", experience: "Multi-arch ARM64/x86, Rejestry, Stosy Edge" },
        { name: "Git & GitHub CI/CD", badge: "Core", experience: "GitHub Actions, Multi-stage Builds & Automatyzacja" },
      ],
    },
    {
      id: "industrial-management",
      label: "Zarządzanie Inżynierskie, Agile & R&D",
      skills: [
        { name: "Zarządzanie Agile & Scrum", badge: "Core", experience: "Planowanie Sprintów, Backlog i Velocity" },
        { name: "Jira, Confluence & Git", badge: "Core", experience: "Epiki, Taski, ADR-y i Cykle Wydawnicze" },
        { name: "Lean Manufacturing & OEE", badge: "Core", experience: "Eliminacja Wąskich Gardeł i Czas Cyklu (-40%)" },
        { name: "Wdrożenie Turbomixera (57d)", badge: "Core", experience: "Pełny Cykl Wdrożenia (CAPEX: 25.4k PLN)" },
        { name: "Optymalizacja Energetyczna", badge: "Core", experience: "+33% Wydajności Pieca & 71.1k PLN/rok Gazu" },
        { name: "Przywództwo Międzydyscyplinarne", badge: "Core", experience: "Łączenie Zespołów Software, Hardware i UR" },
        { name: "Uruchomienia Przemysłowe", badge: "Core", experience: "Goodvalley, San-Pajda, Siemens S7 i SCADA" },
        { name: "Audyt Jakości & Zgodność CE", badge: "Advanced", experience: "ISO 9001, Standard Zero Punch Loss i Bezpieczeństwo" },
      ],
    },
  ],
};

// ─── EDUCATION & EXPERIENCE ─────────────────────────────────
export const EDUCATION: Record<"en" | "pl", EducationItem[]> = {
  en: [
    {
      degree: "Magister (M.Sc.)",
      field: "Zarządzanie (Management & Production Systems)",
      institution: "Państwowa Akademia Nauk Stosowanych w Jarosławiu",
      location: "Jarosław, Poland",
      years: "2023 – 2025 (120 ECTS · 360h Practicum)",
      description:
        "Second-cycle Master's program. Advanced coursework in integrated management systems auditing (ISO 9001/14001/27001), operations research, quality engineering, strategic CAPEX investment planning, and R&D product lifecycle management.",
      accentColor: "cyan",
    },
    {
      degree: "Inżynier (B.Sc. Eng.)",
      field: "Informatyka (Computer Science)",
      institution: "Państwowa Akademia Nauk Stosowanych w Jarosławiu",
      location: "Jarosław, Poland",
      years: "2019 – 2023 (213 ECTS · 800h Industrial Internships)",
      description:
        "First-cycle 7-semester engineering degree. Rigorous curriculum in embedded systems, microprocessor architecture, operating systems, networking (TCP/IP, mesh routing), data structures, Python, and C/C++.",
      accentColor: "indigo",
    },
    {
      degree: "Inżynier (B.Sc. Eng.)",
      field: "Automatyka i Elektronika Praktyczna (Automatic Control & Practical Electronics)",
      institution: "Państwowa Akademia Nauk Stosowanych w Jarosławiu",
      location: "Jarosław, Poland",
      years: "2022 – 2026 (160 ECTS · 720h Industrial Practicum)",
      description:
        "First-cycle engineering program. PLC automation (Siemens S7-1200/1500, TIA Portal), SCADA systems, industrial robotics, electrical drive control, sensorics, and hardware circuit & control cabinet engineering.",
      accentColor: "amber",
    },
  ],
  pl: [
    {
      degree: "Magister",
      field: "Zarządzanie (Systemy Zarządzania i Produkcji)",
      institution: "Państwowa Akademia Nauk Stosowanych w Jarosławiu",
      location: "Jarosław, Polska",
      years: "2023 – 2025 (120 ECTS · 360h Praktyk)",
      description:
        "Studia II stopnia magisterskie. Zaawansowane audytowanie zintegrowanych systemów zarządzania (ISO 9001/14001/27001), badania operacyjne, zarządzanie projektami i procesami produkcyjnymi, planowanie inwestycji CAPEX oraz projektowanie innowacyjnych produktów.",
      accentColor: "cyan",
    },
    {
      degree: "Inżynier",
      field: "Informatyka",
      institution: "Państwowa Akademia Nauk Stosowanych w Jarosławiu",
      location: "Jarosław, Polska",
      years: "2019 – 2023 (213 ECTS · 800h Praktyk Przemysłowych)",
      description:
        "Studia I stopnia inżynierskie, 7 semestrów. Specjalistyczny program obejmujący systemy wbudowane, architekturę mikroprocesorową, sieci komputerowe, struktury danych, C/C++, Python oraz inżynierię oprogramowania.",
      accentColor: "indigo",
    },
    {
      degree: "Inżynier",
      field: "Automatyka i Elektronika Praktyczna",
      institution: "Państwowa Akademia Nauk Stosowanych w Jarosławiu",
      location: "Jarosław, Polska",
      years: "2022 – 2026 (160 ECTS · 720h Praktyk Przemysłowych)",
      description:
        "Studia I stopnia inżynierskie. Programowanie sterowników PLC (Siemens S7, TIA Portal), systemy SCADA, robotyka przemysłowa, napędy elektryczne, sensoryka oraz projektowanie szaf sterowniczych i układów elektronicznych.",
      accentColor: "amber",
    },
  ],
};

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
}

export const EXPERIENCE: Record<"en" | "pl", ExperienceItem[]> = {
  en: [
    {
      company: "Goodvalley Agro-Industrial Complex",
      role: "Industrial Automation & Commissioning Engineer",
      period: "2025 – Present",
      location: "Przechlewo, Poland",
      description:
        "Commissioned processing and multi-stage packaging lines (Siemens S7, TIA Portal, -40% micro-downtime). Architected and deployed the plant MES platform and workTime WFM system for shift scheduling and station tracking. Engineered distributed low-latency ESP-NOW wireless mesh telemetry nodes, automated telemetry data acquisition from industrial energy meters, and developed custom warehouse management software for spare parts and tool picking.",
      tags: ["Industrial MES", "workTime WFM", "ESP-NOW Mesh", "Energy Telemetry", "Warehouse WMS", "Siemens S7", "TIA Portal"],
    },
    {
      company: "Colorland Sp. z o.o.",
      role: "Industrial Automation Specialist",
      period: "07.2024 – 07.2025",
      location: "Rzeszów, Poland",
      description:
        "Factory I/O 3D virtual commissioning (Siemens PLCSIM, Modbus TCP, OPC UA). Developed OpenCV computer vision pipelines for industrial image analysis and vision inspection. Designed custom hardware interface modules for machine integration and reverse-engineered internal machine communication protocols. CNC laser cutting optimization (nesting) and UR-5 robotic sorting with Sick vision.",
      tags: ["OpenCV", "Machine Protocols", "Custom Modules", "Factory I/O", "Siemens PLCSIM", "CNC Laser", "UR-5"],
    },
    {
      company: "Fabryka Ciastek San-Pajda Sp. z o.o.",
      role: "Lead Industrial Automation Engineer",
      period: "02.2023 – 07.2024",
      location: "Jarosław, Poland",
      description:
        "Architected Turbomixer continuous aeration control and upper-level SCADA on a strict 57-day Gantt timeline (25.4k PLN CAPEX). Refactored gas oven PID burner curves and conveyor speeds for meringue production, boosting throughput by +33% and delivering 71,124 PLN/year verified gas fuel savings.",
      tags: ["Siemens S7", "SCADA", "Turbomixer", "Gas Oven", "+33% Throughput", "71.1k PLN/yr"],
    },
    {
      company: "MostCentrService / KasaMobile",
      role: "Android Developer & Embedded Integrator",
      period: "05.2021 – 08.2023",
      location: "Remote / Hybrid",
      description:
        "Developed commercial Android POS applications in Kotlin and Jetpack Compose (Clean Architecture, Hilt, Room). Integrated fiscal printers (Posnet, Novitus, Elzab, Datex), scales, and barcode scanners via RS-232 serial buses and Bluetooth SPP/BLE.",
      tags: ["Kotlin", "Jetpack Compose", "Android SDK", "RS-232", "Fiscal POS", "Bluetooth SPP"],
    },
    {
      company: "ZUT Kunzek",
      role: "Control Cabinet Assembler (Elektromonter Szaf Sterowniczych)",
      period: "07.2021 – 09.2021",
      location: "Jarosław, Poland",
      description:
        "Prefabrication and assembly of industrial control cabinets (szafy sterownicze). Read and executed EPLAN electrical wiring diagrams, mounted PLCs, VFDs, safety relays, terminal blocks, Festo/SMC pneumatics, and conducted I/O loop testing.",
      tags: ["Control Cabinets", "EPLAN", "Wiring", "PLCs & VFDs", "Pneumatics", "I/O Testing"],
    },
  ],
  pl: [
    {
      company: "Kompleks Agroprzemysłowy Goodvalley",
      role: "Inżynier ds. Automatyzacji i Uruchomień Przemysłowych",
      period: "2025 – Obecnie",
      location: "Przechlewo, Polska",
      description:
        "Uruchomienia linii przetwórstwa i stacji pakowania (Siemens S7, TIA Portal, -40% mikroprzestojów). Wdrożenie zakładowej platformy MES oraz systemu workTime WFM do harmonogramowania pracy i dyspozytorni. Rozbudowa rozproszonej bezprzewodowej sieci telemetrycznej mesh ESP-NOW, automatyzacja zczytywania danych z przemysłowych liczników energii oraz autorskie oprogramowanie magazynowe do ewidencji i pobierania części/narzędzi.",
      tags: ["Platforma MES", "workTime WFM", "Sieć Mesh ESP-NOW", "Telemetria Energii", "System Magazynowy", "Siemens S7", "TIA Portal"],
    },
    {
      company: "Colorland Sp. z o.o.",
      role: "Specjalista ds. Automatyki Przemysłowej",
      period: "07.2024 – 07.2025",
      location: "Rzeszów, Polska",
      description:
        "Wirtualne uruchomienia 3D w Factory I/O (Siemens PLCSIM, Modbus TCP, OPC UA). Zastosowanie OpenCV do analizy obrazu i inspekcji wizyjnej. Projektowanie autorskich modułów sprzętowych do integracji z maszynami przemysłowymi oraz analiza wewnętrznych protokołów transmisji danych w maszynach. Optymalizacja cięcia laserowego CNC (nesting) i robotyka sortująca UR-5 z kamerą Sick.",
      tags: ["OpenCV", "Protokoły Maszyn", "Moduły Integracyjne", "Factory I/O", "Siemens PLCSIM", "Cięcie Laserowe", "UR-5"],
    },
    {
      company: "Fabryka Ciastek San-Pajda Sp. z o.o.",
      role: "Główny Inżynier Automatyk",
      period: "02.2023 – 07.2024",
      location: "Jarosław, Polska",
      description:
        "Zaprojektowanie układu napowietrzania ciasta Turbomixer i nadrzędnej SCADA w 57 dni (CAPEX: 25 400 PLN). Optymalizacja krzywych PID palników pieca gazowego bezów (+33% wydajności, 71 124 PLN/rok udokumentowanych oszczędności gazu).",
      tags: ["Siemens S7", "SCADA", "Turbomikser", "Piec Gazowy", "Wydajność +33%", "71.1k PLN/rok"],
    },
    {
      company: "MostCentrService / KasaMobile",
      role: "Programista Android & Integrator Embedded",
      period: "05.2021 – 08.2023",
      location: "Zdalnie / Hybrydowo",
      description:
        "Rozwój komercyjnych aplikacji kasowych POS na Androida w Kotlin i Jetpack Compose (Clean Architecture, Hilt, Room). Integracja drukarek fiskalnych (Posnet, Novitus, Elzab, Datex), wag i skanerów przez RS-232 i Bluetooth SPP/BLE.",
      tags: ["Kotlin", "Jetpack Compose", "Android SDK", "RS-232", "Kasy Fiskalne", "Bluetooth SPP"],
    },
    {
      company: "ZUT Kunzek",
      role: "Elektromonter Szaf Sterowniczych",
      period: "07.2021 – 09.2021",
      location: "Jarosław, Polska",
      description:
        "Montaż i prefabrykacja szaf sterowniczych. Czytanie schematów EPLAN, montaż aparatury modułowej (PLC, falowniki, przekaźniki bezpieczeństwa), pneumatyka Festo/SMC, zaciskanie złączy i pomiary pętli I/O.",
      tags: ["Szafy Sterownicze", "EPLAN", "Okablowanie", "PLC i Falowniki", "Pneumatyka", "Testy I/O"],
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
      expos: "Vectors",
      projects: "Projects",
      demos: "Live Demos",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      headline: "Industrial Automation, Embedded Mesh &",
      headline2: "Real-Time Industrial MES Platforms",
      subtitle:
        "CTO & Lead Industrial Automation, Embedded Systems & Android / MES Architect. Combining Siemens S7 PLC automation, Factory I/O 3D simulation, ESP32-C6 wireless mesh networks, Raspberry Pi edge gateways, and React 19 Canvas MES systems.",
      cta_primary: "Explore Case Studies",
      cta_secondary: "Download CV (PDF)",
      cta_demo: "View Case Studies",
      available: "Available for Remote EU & Hybrid Roles (Przechlewo / Warsaw / EU)",
    },
    expos: {
      eyebrow: "Applied Engineering Vectors",
      title: "Architected for Critical Industrial Domains",
      subtitle: "Direct alignment of Roman Deyneko's verified hardware, firmware, and software systems with complex real-world challenges across OT, embedded edge, and high-availability operations.",
    },
    impact: {
      eyebrow: "The Engineering ROI of Roman Deyneko",
      title: "Commercial Value &",
      highlight: "Industrial Impact",
      subtitle: "Delivering measurable engineering and business outcomes: +33% line throughput, 71.1k PLN/yr gas fuel savings, -40% downtime reduction, sub-10ms mesh latency, and zero punch loss reliability.",
    },
    projects: {
      eyebrow: "Selected Industrial Case Studies",
      title: "Engineered for",
      highlight: "Precision, Scale & Zero Failure",
      subtitle: "A deeper look into industrial automation & Turbomixer SCADA, plant line PLC optimization, distributed ESP-NOW wireless mesh, and real-time React 19 Canvas MES platforms.",
    },
    demos: {
      eyebrow: "Interactive Architecture",
      title: "Direct System",
      highlight: "Demonstrations",
      subtitle: "Explore interactive views of ESP-NOW mesh telemetry, digital twin Canvas floor plans, and Raspberry Pi edge gateways.",
    },
    skills: {
      eyebrow: "Technical Competencies",
      title: "Tech Stack &",
      highlight: "Specializations",
      subtitle: "Battle-tested tools across Siemens S7 PLC, Factory I/O, Android POS (Kotlin), ESP32-C6 firmware, Python FastAPI, React 19 Canvas, and industrial fieldbuses.",
    },
    education: {
      eyebrow: "Academic Credentials",
      title: "Degrees &",
      highlight: "Qualifications",
      subtitle: "Magister (M.Sc.) & Inżynier Mechatroniki / Informatyki from PANS w Jarosławiu.",
    },
    contact: {
      title: "Let's Engineer Something Exceptional",
      subtitle: "Have an industrial automation, PLC, embedded mesh, Android POS, or industrial MES project in mind? Let's connect.",
      name: "Full Name",
      email: "Email Address",
      projectType: "Project / Role Type",
      message: "Your Message",
      send: "Send Message",
      rodo: "I consent to the processing of my personal data for the purpose of responding to this inquiry, in accordance with RODO (GDPR) regulations.",
      projectTypes: [
        "Industrial Automation & PLC Optimization",
        "Embedded Systems & ESP-NOW Mesh",
        "Industrial MES & Digital Twin Canvas",
        "Factory I/O & CAD/CAM Virtual Commissioning",
        "San-Pajda & Goodvalley PLC Optimization",
        "Android POS & Fiscal Peripheral Integration",
        "Raspberry Pi Industrial Edge Gateway",
        "Other Engineering Project",
      ],
    },
  },
  pl: {
    nav: {
      impact: "Wyniki & ROI",
      expos: "Wektory",
      projects: "Realizacje",
      demos: "Architektura",
      skills: "Umiejętności",
      education: "Edukacja",
      contact: "Kontakt",
    },
    hero: {
      headline: "Automatyka Przemysłowa, Rozproszony Mesh &",
      headline2: "Przemysłowe Platformy MES Real-Time",
      subtitle:
        "CTO & Główny Architekt Automatyki Przemysłowej, Systemów Wbudowanych, Androida i MES. Łączy sterowniki Siemens S7 PLC, wirtualne uruchomienia w Factory I/O, sieci mesh ESP32-C6, bramki Raspberry Pi i platformy MES w React 19 Canvas.",
      cta_primary: "Zobacz Case Studies",
      cta_secondary: "Pobierz CV (PDF)",
      cta_demo: "Zobacz Case Studies",
      available: "Dostępny do pracy zdalnej w UE i hybrydowej (Przechlewo / Warszawa / UE)",
    },
    expos: {
      eyebrow: "Wektory Inżynierii Stosowanej",
      title: "Architektura dla Kluczowych Obszarów Przemysłu",
      subtitle: "Rozwiązania sprzętowe, układowe i chmurowe Romana Дейнека dla wyzwań przemysłowych w obszarach OT, edge computing oraz ciągłości operacyjnej.",
    },
    impact: {
      eyebrow: "Wartość Inżynierska & ROI",
      title: "Wpływ Inżynieryjny &",
      highlight: "Wymierne Wyniki Biznesowe",
      subtitle: "Dostarczanie mierzalnych rezultatów: +33% wydajności linii, 71.1k PLN/rok oszczędności gazu, redukcja mikroprzestojów o 40%, opóźnienia mesh <10ms oraz standard zerowej utraty danych.",
    },
    projects: {
      eyebrow: "Wybrane Studia Przypadków",
      title: "Zaprojektowane dla",
      highlight: "Precyzji, Skali i Niezawodności",
      subtitle: "Szczegółowy wgląd w automatyzację przemysłową i SCADA Turbomixera, optymalizację linii produkcyjnych PLC, rozproszone sieci ESP-NOW mesh oraz systemy MES w React 19 Canvas.",
    },
    demos: {
      eyebrow: "Interaktywna Architektura",
      title: "Demonstracje",
      highlight: "Systemowe",
      subtitle: "Sprawdź architekturę sieci mesh ESP-NOW, cyfrowego bliźniaka hali produkcyjnej w Canvas oraz przemysłowe bramki Raspberry Pi.",
    },
    skills: {
      eyebrow: "Kompetencje Techniczne",
      title: "Stos Technologiczny &",
      highlight: "Narzędzia Inżynierskie",
      subtitle: "Sprawdzone narzędzia: sterowniki Siemens S7 PLC, Factory I/O, aplikacje Android POS (Kotlin), firmware ESP32-C6, Python FastAPI, React 19 Canvas i magistrale przemysłowe.",
    },
    education: {
      eyebrow: "Wykształcenie",
      title: "Dyplomy i",
      highlight: "Kwalifikacje",
      subtitle: "Tytuł magistra oraz inżyniera mechatroniki / informatyki (PANS w Jarosławiu).",
    },
    contact: {
      title: "Zaprojektujmy coś wyjątkowego",
      subtitle: "Masz projekt automatyki przemysłowej, PLC, sieci mesh, Android POS lub MES? Porozmawiajmy.",
      name: "Imię i Nazwisko",
      email: "Adres E-mail",
      projectType: "Typ Projektu",
      message: "Twoja Wiadomość",
      send: "Wyślij Wiadomość",
      rodo: "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na niniejsze zapytanie, zgodnie z przepisami RODO.",
      projectTypes: [
        "Automatyzacja Przemysłowa & Optymalizacja PLC",
        "Systemy Wbudowane ESP32-C6 & Mesh",
        "Architektura Przemysłowa MES & Canvas",
        "Wirtualne Uruchomienia Factory I/O & CAD/CAM",
        "Optymalizacja Linii PLC (San-Pajda & Goodvalley)",
        "Integracja Kas Fiskalnych & Android POS",
        "Przemysłowe Bramki Raspberry Pi",
        "Inne Projekty Inżynierskie",
      ],
    },
  },
} as const;

export type Lang = keyof typeof TRANSLATIONS;
