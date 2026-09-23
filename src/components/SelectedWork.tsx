import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import type { Lang } from "@/data/portfolio-data";
import { CaseArtwork, type ArtworkId } from "@/components/CaseArtwork";

const COPY = {
  en: {
    eyebrow: "Selected systems",
    title: "Four flagship engineering systems where architecture, firmware, Android and industrial automation meet.",
    read: "Read system case",
    caption: "Technical blueprints / click any system card to explore interactive schematics, simulators and verified dossiers.",
    projects: [
      {
        id: "san-pajda-automation",
        number: "01",
        title: "San-Pajda: Turbomixer SCADA & Oven Energy Optimization",
        description:
          "Turnkey Turbomixer SCADA integration (57-day schedule) and gas oven recipe optimization.",
        result: "+33% throughput, 71,124 PLN/yr gas savings, 25.4k PLN CAPEX.",
        visualProof: "🔍 5 Engineering Blueprints & CAD Dossier",
        tags: ["Siemens S7-1200", "WinCC SCADA", "PID Loops", "57d Gantt"],
      },
      {
        id: "goodvalley-automation",
        number: "02",
        title: "Goodvalley: Food Processing Lines & PLC Automation",
        description:
          "Food processing line commissioning, Siemens S7 PLC logic refactoring, and sensor de-jitter.",
        result: "-40% unscheduled micro-downtime, 99.4% line stability.",
        visualProof: "⚡ Interactive Sensor De-Jitter & PLC Lab",
        tags: ["Siemens S7-1500", "Sensor De-Jitter", "workTime WFM", "Energy Meters"],
      },
      {
        id: "wfm-industrial-mes",
        number: "03",
        title: "WFM & Industrial MES Platform",
        description:
          "Real-time production dispatching, React 19 Canvas floor plan, and machine telemetry streaming.",
        result: "End-to-end dispatching with same-day parcel dispatch SLA under 12 hours.",
        visualProof: "🖥️ Live 2D Shopfloor Canvas Digital Twin",
        tags: ["React 19 Canvas", "FastAPI Async", "Raspberry Pi", "SLA <12h"],
      },
      {
        id: "embedded-mesh-iot",
        number: "04",
        title: "Distributed Embedded Mesh & Edge IoT",
        description:
          "Zero-router P2P wireless mesh on ESP32-C6 via ESP-NOW with RS485 and Wiegand integration.",
        result: "Sub-10ms packet delivery and ≥ 99.2% uptime across harsh factory environments.",
        visualProof: "📡 Live Mesh Topology & Failover Simulator",
        tags: ["ESP32-C6", "ESP-NOW P2P", "FreeRTOS", "RS485 + Wiegand"],
      },
    ],
  },
  pl: {
    eyebrow: "Wybrane systemy",
    title: "Cztery flagowe systemy inżynierskie, w których łączą się architektura, firmware, Android i automatyzacja przemysłowa.",
    read: "Zobacz studium przypadku",
    caption: "Kreslenia techniczne / kliknij dowolną kartę, aby otworzyć interaktywne schematy, symulatory i dośrodkowe dossier.",
    projects: [
      {
        id: "san-pajda-automation",
        number: "01",
        title: "San-Pajda: SCADA Turbomikser & Optymalizacja Energetyczna Pieca",
        description:
          "Wdrożenie sterowania turbomikserem (57 dni) oraz optymalizacja pieca gazowego bezów.",
        result: "+33% wydajności pieca, 71 124 PLN/rok oszczędności gazu, 25.4k PLN CAPEX.",
        visualProof: "🔍 5 Schematów Procesowych & Kreslenia CAD",
        tags: ["Siemens S7-1200", "WinCC SCADA", "PID Palników", "Gantt 57 dni"],
      },
      {
        id: "goodvalley-automation",
        number: "02",
        title: "Goodvalley: Linie Przetwórstwa & Automatyzacja PLC",
        description:
          "Uruchomienia linii przetwórczych, refaktoring programów Siemens S7 PLC i eliminacja drgań czujników.",
        result: "-40% redukcji mikroprzestojów, 99.4% stabilności linii.",
        visualProof: "⚡ Interaktywny Oscyloskop De-Jitter & PLC",
        tags: ["Siemens S7-1500", "Filtracja Sygnałów", "workTime WFM", "Liczniki Energii"],
      },
      {
        id: "wfm-industrial-mes",
        number: "03",
        title: "WFM & Przemysłowa Platforma MES",
        description:
          "Zarządzanie produkcją live, plan hali na React 19 Canvas i asynchroniczne kolejkowanie maszyn.",
        result: "Kompletny przepływ zleceń z czasem realizacji wysyłki poniżej 12 godzin.",
        visualProof: "🖥️ Cyfrowy Bliźniak 2D Canvas Hali Live",
        tags: ["React 19 Canvas", "FastAPI Async", "Raspberry Pi", "SLA <12h"],
      },
      {
        id: "embedded-mesh-iot",
        number: "04",
        title: "Rozproszony Mesh Wbudowany & Edge IoT",
        description:
          "Bezrouterowa sieć kratowa P2P na ESP32-C6 (ESP-NOW) z magistralą RS485 i protokołem Wiegand.",
        result: "Opóźnienia pakietów <10ms i dostępność ≥ 99.2% w warunkach przemysłowych.",
        visualProof: "📡 Interaktywny Symulator Sieci Mesh",
        tags: ["ESP32-C6", "ESP-NOW P2P", "FreeRTOS", "RS485 + Wiegand"],
      },
    ],
  },
} as const;

export function SelectedWork({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="work" className="scroll-mt-20 py-16 sm:py-28 lg:py-36 overflow-hidden w-full max-w-full">
      <div className="container-custom">
        <div className="grid gap-6 sm:gap-10 border-b editorial-rule pb-8 sm:pb-12 lg:grid-cols-12">
          <p className="kicker lg:col-span-3">{t.eyebrow}</p>
          <h2 className="display-lg max-w-4xl text-[#eeece5] lg:col-span-8">{t.title}</h2>
        </div>
        <div className="mt-2">
          {t.projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="case-row group cursor-pointer hover:bg-white/[0.02] active:bg-white/[0.04] rounded-xl px-2 sm:px-0 transition-colors"
            >
              <p className="case-row__number">{project.number}</p>
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="case-row__title">{project.title}</h3>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[#c4a160]/30 bg-[#c4a160]/10 font-mono text-[10px] text-[#c4a160]">
                  <Sparkles size={11} />
                  <span>{project.visualProof}</span>
                </div>

                <p className="case-row__description">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded border border-white/5 bg-white/[0.03] font-mono text-[10px] text-[#8a857b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <p className="case-row__result">{project.result}</p>
                <span className="case-row__link min-h-[36px] flex items-center">
                  <span>{t.read}</span>
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Technical Blueprint Artwork Gallery */}
        <div className="case-cover mt-8 flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3.5 pb-2 w-full max-w-full min-w-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {t.projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group block w-[82vw] max-w-[320px] shrink-0 snap-center sm:w-auto sm:max-w-none transition-transform duration-300 hover:scale-[1.02]"
              title={`${project.title} · ${t.read}`}
            >
              <CaseArtwork
                id={project.id as ArtworkId}
                index={project.number}
                label={project.title}
              />
            </Link>
          ))}
        </div>
        <p className="case-cover__caption">{t.caption}</p>
      </div>
    </section>
  );
}
