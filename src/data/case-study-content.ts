import type { Lang } from "@/data/portfolio-data";

export type FeaturedProjectId =
  | "san-pajda-automation"
  | "goodvalley-automation"
  | "wfm-industrial-mes"
  | "embedded-mesh-iot";

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
  "san-pajda-automation",
  "goodvalley-automation",
  "wfm-industrial-mes",
  "embedded-mesh-iot",
];

export const CASE_STUDY_CONTENT: Record<Lang, Record<FeaturedProjectId, CaseStudyContent>> = {
  en: {
    "san-pajda-automation": {
      index: "01",
      type: "Industrial Automation, Turbomixer SCADA & Oven Optimization",
      period: "Fabryka Ciastek San-Pajda Sp. z o.o. (Jarosław)",
      role: "Lead Industrial Automation Engineer",
      scope: "Siemens S7 PLC, SCADA, Turbomixer Aeration, Gas Oven Trajectory, Gantt 57d",
      outcome: "+33% baking throughput, 71,124 PLN/year gas savings, 57-day full cycle commissioning (25.4k PLN direct CAPEX).",
      artLabel: "Turbomixer SCADA & Oven Lines",
      sections: [
        {
          title: "Context",
          body: "Fabryka Ciastek San-Pajda Sp. z o.o. in Jarosław required modernizing continuous dough aeration for sponge cake and biscuit lines, as well as energy optimization of its continuous gas tunnel baking oven.",
        },
        {
          title: "Challenge",
          body: "Manual batch transitions caused inconsistent dough aeration and density shifts, while unbalanced gas burner firing resulted in thermal bottlenecks and excessive natural gas fuel consumption.",
        },
        {
          title: "Approach",
          body: "Designed and deployed Siemens S7 PLC controls and upper-level SCADA supervision for the Turbomixer continuous aeration system on a strict 57-day timeline (25,400 PLN direct CAPEX). Re-engineered burner PID firing curves and baking conveyor speed for meringue lines, achieving +33% oven capacity and 71,124 PLN/year in verified fuel savings.",
        },
      ],
    },
    "goodvalley-automation": {
      index: "02",
      type: "Industrial Processing, Line PLC Optimization, MES & Mesh Telemetry",
      period: "Goodvalley Agro-Industrial Complex (Przechlewo)",
      role: "Industrial Automation & Commissioning Engineer",
      scope: "Siemens S7, TIA Portal, Plant MES, workTime WFM, ESP-NOW Mesh, Energy Telemetry, Warehouse WMS",
      outcome: "-40% reduction in micro-downtime, plant-wide MES & mesh telemetry, automated energy meter audits, shopfloor warehouse picking system.",
      artLabel: "Goodvalley Plant Automation",
      sections: [
        {
          title: "Context",
          body: "Goodvalley Agro-Industrial Complex in Przechlewo operates high-speed automated meat processing and multi-stage packaging lines running 24/7 continuous production shifts.",
        },
        {
          title: "Challenge",
          body: "Optical and inductive sensor timing jitter on high-speed conveyor transfers triggered false interlock trips, leading to frequent micro-stoppages. Additionally, the plant required unified shift dispatching, real-time machine telemetry without heavy cabling, automated energy consumption tracking, and structured tool/parts picking from the maintenance warehouse.",
        },
        {
          title: "Approach",
          body: "Refactored Siemens S7 / TIA Portal PLC algorithms and software debounce filters, cutting micro-downtime by 40% (99.4% stability). Architected and deployed the plant MES platform and workTime WFM system for worker and shift tracking. Implemented distributed ESP-NOW wireless mesh telemetry nodes, automated telemetry acquisition from industrial energy meters, and developed custom warehouse management software for spare parts and tool picking.",
        },
      ],
    },
    "wfm-industrial-mes": {
      index: "03",
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
          body: "Engineered an asynchronous Python FastAPI backend coordinating order queues and machine telemetry (spindle RPM, tool wear, inventory levels). Built a high-performance React 19 Canvas interactive floor plan that renders real-time machine statuses and worker flows with zero lag, ensuring order fulfillment under 12 hours.",
        },
      ],
    },
    "embedded-mesh-iot": {
      index: "04",
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
    "san-pajda-automation": {
      index: "01",
      type: "Automatyzacja SCADA & Efektywność Energetyczna Pieca",
      period: "Fabryka Ciastek San-Pajda (Jarosław)",
      role: "Główny Inżynier Automatyk",
      scope: "Siemens S7-1200, WinCC SCADA, Algorytmy PID Palników Gazowych, TIA Portal",
      outcome: "Wdrożenie integracji SCADA w 57 dni (CAPEX: 25.4k PLN); +33% wydajności pieca i 71 124 PLN/rok oszczędności gazu.",
      artLabel: "SCADA Turbomikser & Piec Gazowy",
      sections: [
        {
          title: "Kontekst",
          body: "Fabryka ciastek San-Pajda Sp. z o.o. w Jarosławiu wymagała pilnej modernizacji linii produkcyjnej bezów: synchronizacji turbomiksera napowietrzającego z linią formującą oraz optymalizacji zużycia gazu w przelotowym piecu tunelowym.",
        },
        {
          title: "Wyzwanie",
          body: "Rygorystyczny harmonogram wdrożenia (57 dni roboczych wg wykresu Gantta) oraz ograniczony budżet inwestycyjny CAPEX (25 400 PLN). Konieczność wyeliminowania strat ciasta i ograniczenia zużycia gazu przy zachowaniu ciągłości produkcji.",
        },
        {
          title: "Podejście",
          body: "Zaprojektowałem i wdrożyłem układ sterowania Siemens S7 PLC i nadrzędną SCADA dla turbomiksera. Zoptymalizowałem krzywe regulacji PID palników pieca i prędkość przenośnika pod gęste dozowanie bezów (+33% pojemności blachy), przynosząc 71 124 PLN/rok zweryfikowanych oszczędności paliwa gazowego.",
        },
      ],
    },
    "goodvalley-automation": {
      index: "02",
      type: "Optymalizacja Linii PLC, Platforma MES & Telemetria Mesh",
      period: "Kompleks Agroprzemysłowy Goodvalley (Przechlewo)",
      role: "Inżynier ds. Automatyzacji i Uruchomień Przemysłowych",
      scope: "Siemens S7, TIA Portal, Platforma MES, workTime WFM, ESP-NOW Mesh, Telemetria Energii, WMS Magazynu",
      outcome: "-40% mikroprzestojów, wdrożenie MES i sieci mesh, telemetria liczników energii, oprogramowanie magazynu części.",
      artLabel: "Automatyzacja Zakładu Goodvalley",
      sections: [
        {
          title: "Kontekst",
          body: "Kompleks agroprzemysłowy Goodvalley w Przechlewie prowadzi ciągłą produkcję 24/7 na liniach przetwórstwa mięsnego i wieloetapowych stacjach pakowania.",
        },
        {
          title: "Wyzwanie",
          body: "Zakłócenia czujników na szybkich przenośnikach powodowały mikroprzestoje maszyn. Dodatkowo zakład potrzebował zintegrowanej dyspozytorni zmianowej, telemetrii maszyn bez prowadzenia okablowania, ciągłego monitoringu zużycia energii oraz zorganizowanego pobierania części zamiennych i narzędzi z magazynu technicznego.",
        },
        {
          title: "Podejście",
          body: "Zrefaktoryzowałem programy Siemens S7 PLC w TIA Portal z cyfrową filtracją sygnałów (-40% przestojów, 99.4% stabilności). Zaprojektowałem i wdrożyłem platformę MES oraz dyspozytornię workTime WFM. Rozwinąłem bezprzewodową sieć telemetryczną mesh ESP-NOW (<10ms), zautomatyzowałem zczytywanie przemysłowych liczników energii oraz stworzyłem dedykowany program magazynowy do ewidencji i pobierania części zamiennych/narzędzi.",
        },
      ],
    },
    "wfm-industrial-mes": {
      index: "03",
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
          body: "Zbudowałem asynchroniczny backend w Python FastAPI koordynujący kolejki zleceń oraz telemetrię maszyn (obroty wrzeciona, zużycie frezów, stany magazynowe materiałów). Zaprojektowałem wydajny interaktywny plan hali w React 19 Canvas odświeżający stany stanowisk w czasie rzeczywistym, co umożliwiło realizację wysyłek w czasie poniżej 12 godzin.",
        },
      ],
    },
    "embedded-mesh-iot": {
      index: "04",
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
