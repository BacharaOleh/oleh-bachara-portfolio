import type { Lang } from "@/data/portfolio-data";

export type FeaturedProjectId = "keysnap-robotics" | "wfm-industrial-mes" | "embedded-mesh-iot";

type CaseSection = { title: string; body: string };

export type CaseStudyContent = {
  index: string;
  type: string;
  period: string;
  role: string;
  scope: string;
  outcome: string;
  artLabel: string;
  sections: CaseSection[];
};

export const FEATURED_PROJECT_IDS: FeaturedProjectId[] = [
  "keysnap-robotics",
  "wfm-industrial-mes",
  "embedded-mesh-iot",
];

export const CASE_STUDY_CONTENT: Record<Lang, Record<FeaturedProjectId, CaseStudyContent>> = {
  en: {
    "keysnap-robotics": {
      index: "01",
      type: "Autonomous Key-Cutting Kiosk & Robotics",
      period: "KeySnap AI (Co-Founder & CTO)",
      role: "CTO / Head of Hardware & Robotics",
      scope: "CNC Mechanics, ESP32-C6, Raspberry Pi Edge, DFM, Cyclone Chip Extraction",
      outcome: "First-Time-Right ≥ 98.5%, cycle time ≤ 60s, unit CAPEX reduced to ≤ 25k PLN via DFM.",
      artLabel: "Robotics & CNC Kinematics",
      sections: [
        {
          title: "Context",
          body: "KeySnap AI developed an autonomous kiosk platform for precision key duplication in commercial locations (malls, transit hubs). The device had to automate key blank feeding, precision cutting, and chip extraction without requiring on-site human operators.",
        },
        {
          title: "Challenge",
          body: "Reconciling industrial CNC precision (±0.05 mm) with compact kiosk dimensions, strict European safety regulations (CE Machinery Directive), and a low bill of materials (BOM) cost that allows rapid scaling.",
        },
        {
          title: "Approach",
          body: "I designed the mechanical axis kinematics, blank feed mechanisms, and cyclone chip evacuation. Applied Design for Manufacturing (DFM) principles to replace expensive machined components with optimized 3D-printed and laser-cut parts, dropping unit CAPEX from 45,000 PLN to under 25,000 PLN. Deployed Raspberry Pi edge gateways and ESP-NOW mesh controllers to ensure high availability (≥99.2% uptime) and sub-60s cutting cycles.",
        },
      ],
    },
    "wfm-industrial-mes": {
      index: "02",
      type: "Industrial MES & Factory Telemetry",
      period: "Industrial Automation Platform",
      role: "Lead Full-Stack Architect",
      scope: "Python FastAPI, React 19 Canvas, Real-time Queues, Raspberry Pi Edge",
      outcome: "Automated machine dispatching and floor telemetry achieving same-day parcel dispatch SLA under 12 hours.",
      artLabel: "MES Telemetry & Dispatch",
      sections: [
        {
          title: "Context",
          body: "Production workshop operations required an integrated Manufacturing Execution System (MES) capable of connecting customer order streams with CNC machine queues, tool telemetry, and floor operator tracking.",
        },
        {
          title: "Challenge",
          body: "Factory environments require deterministic, low-latency state synchronization. The architecture needed to prevent order congestion and provide operators with instant visual feedback of machine states without crashing during peak volume shifts.",
        },
        {
          title: "Approach",
          body: "Engineered an asynchronous Python FastAPI backend coordinating order queues and machine telemetry (spindle RPM, tool wear, blank levels). Built a high-performance React 19 Canvas interactive floor plan that renders real-time machine statuses and worker flows with zero lag, ensuring order fulfillment under 12 hours.",
        },
      ],
    },
    "embedded-mesh-iot": {
      index: "03",
      type: "Distributed Embedded Mesh & Edge IoT",
      period: "Embedded Systems R&D",
      role: "Embedded Systems Engineer",
      scope: "ESP32-C6, PlatformIO, ESP-NOW Protocol, RS485, Wiegand, FreeRTOS",
      outcome: "Sub-10ms packet delivery and ≥ 99.2% uptime across harsh industrial environments without external routers.",
      artLabel: "ESP-NOW Mesh Network",
      sections: [
        {
          title: "Context",
          body: "Industrial manufacturing facilities experience heavy RF interference and frequent Wi-Fi drops, making conventional router-dependent IoT infrastructure unreliable for telemetry and control signals.",
        },
        {
          title: "Challenge",
          body: "Creating a robust peer-to-peer (P2P) wireless network capable of millisecond response times, low power consumption, and zero dependency on central commercial routers or internet availability.",
        },
        {
          title: "Approach",
          body: "Architected P2P mesh network topology on ESP32-C6 microcontrollers utilizing the ESP-NOW protocol in PlatformIO. Integrated RS485 industrial buses and Wiegand RFID protocols, achieving sub-10ms packet transmission, automated failover routing, and ≥99.2% telemetry uptime.",
        },
      ],
    },
  },
  pl: {
    "keysnap-robotics": {
      index: "01",
      type: "Autonomiczny Automat CNC & Robotyka",
      period: "KeySnap AI (Współzałożyciel & CTO)",
      role: "CTO / Główny Inżynier Hardware i Robotyki",
      scope: "Mechanika CNC, ESP32-C6, Raspberry Pi Edge, DFM, Odciąg Cyklonowy",
      outcome: "First-Time-Right ≥ 98.5%, czas cyklu ≤ 60s, obniżenie CAPEX do ≤ 25k PLN dzięki DFM.",
      artLabel: "Kinematyka CNC i Robotyka",
      sections: [
        {
          title: "Kontekst",
          body: "Projekt KeySnap AI wymagał stworzenia autonomicznego automatu do precyzyjnego dorabiania kluczy w lokalizacjach komercyjnych (centra handlowe, dworce). Urządzenie musiało w pełni automatycznie pobierać surówki, precyzyjnie je frezować i usuwać wióry bez obecności operatora.",
        },
        {
          title: "Wyzwanie",
          body: "Połączenie przemysłowej precyzji obróbki CNC (±0.05 mm) ze zwartą konstrukcją urządzenia, rygorystycznymi normami bezpieczeństwa CE (Dyrektywa Maszynowa) oraz niskim kosztem produkcji (BOM) umożliwiającym szybkie skalowanie.",
        },
        {
          title: "Podejście",
          body: "Zaprojektowałem kinematykę osi mechanicznych, mechanizmy podawania surówek oraz cyklonowy system odciągu wiórów. Dzięki wdrożeniu metodyki DFM (Design for Manufacturing) zredukowałem jednostkowy koszt urządzenia z 45 000 PLN do poniżej 25 000 PLN. Zastosowałem przemysłowe bramki brzegowe Raspberry Pi i kontrolery mesh ESP-NOW, gwarantując niezawodność ≥99.2% i czas cyklu <60 s.",
        },
      ],
    },
    "wfm-industrial-mes": {
      index: "02",
      type: "Przemysłowy MES & Telemetria Hali",
      period: "Platforma Automatyzacji Przemysłowej",
      role: "Główny Architekt Full-Stack",
      scope: "Python FastAPI, React 19 Canvas, Kolejki Zleceń Live, Raspberry Pi Edge",
      outcome: "Automatyczny dispatch maszyn i telemetria hali z czasem realizacji wysyłki poniżej 12 godzin.",
      artLabel: "Telemetria MES i Dispatching",
      sections: [
        {
          title: "Kontekst",
          body: "Operacje na hali produkcyjnej wymagały zintegrowanego systemu klasy MES łączącego napływające zlecenia klientów z kolejkami obrabiarek CNC, telemetrią narzędzi i pracą operatorów.",
        },
        {
          title: "Wyzwanie",
          body: "Środowisko produkcyjne wymaga deterministycznej, niskolatencyjnej synchronizacji stanów maszyn. Architektura musiała zapobiegać zatorom zleceń i zapewniać operatorom natychmiastowy wgląd w plan hali bez ryzyka awarii.",
        },
        {
          title: "Podejście",
          body: "Zbudowałem asynchroniczny backend w Python FastAPI koordynujący kolejki zleceń oraz telemetrię maszyn (obroty wrzeciona, zużycie frezów, zapasy surówek). Zaprojektowałem wydajny interaktywny plan hali w React 19 Canvas odświeżający stany stanowisk w czasie rzeczywistym, co umożliwiło realizację wysyłek w czasie poniżej 12 godzin.",
        },
      ],
    },
    "embedded-mesh-iot": {
      index: "03",
      type: "Rozproszony Mesh Wbudowany & Edge IoT",
      period: "R&D Systemów Wbudowanych",
      role: "Inżynier Systemów Wbudowanych",
      scope: "ESP32-C6, PlatformIO, Protokół ESP-NOW, RS485, Wiegand, FreeRTOS",
      outcome: "Dostarczanie pakietów poniżej 10 ms i dostępność ≥ 99.2% w warunkach przemysłowych bez routera.",
      artLabel: "Sieć Kratowa ESP-NOW",
      sections: [
        {
          title: "Kontekst",
          body: "Hale produkcyjne charakteryzują się silnymi zakłóceniami elektromagnetycznymi i częstymi przerwami w działaniu Wi-Fi, przez co tradycyjna infrastruktura routerowa jest zawodna dla krytycznej telemetrii.",
        },
        {
          title: "Wyzwanie",
          body: "Stworzenie bezprzewodowej sieci P2P o milisekundowym czasie reakcji, minimalnym poborze prądu i całkowitym braku zależności od komercyjnych routerów Wi-Fi czy dostępu do Internetu.",
        },
        {
          title: "Podejście",
          body: "Zaprojektowałem topologię sieci kratowej na mikrokontrolerach ESP32-C6 z wykorzystaniem protokołu ESP-NOW w PlatformIO. Zintegrowałem przemysłowe magistrale RS485 i czytniki RFID Wiegand, uzyskując czas transmisji pakietu poniżej 10 ms, automatyczny routing awaryjny i dostępność telemetrii ≥99.2%.",
        },
      ],
    },
  },
};
