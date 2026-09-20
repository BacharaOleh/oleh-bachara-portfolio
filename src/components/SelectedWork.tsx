import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/data/portfolio-data";
import { CaseArtwork } from "@/components/CaseArtwork";

const COPY = {
  en: {
    eyebrow: "Selected systems",
    title: "Three engineering systems where architecture, firmware and mechanics meet.",
    read: "Read system case",
    caption: "System abstracts / each mark corresponds to the engineering thinking behind the case.",
    projects: [
      { id: "keysnap-robotics", number: "01", title: "KeySnap AI — autonomous key-cutting kiosk", description: "Precision CNC robotics, automatic blank feeding, cyclone extraction, and Raspberry Pi edge gateway.", result: "FTR ≥ 98.5%, cycle time ≤ 60s, unit CAPEX reduced to ≤ 25k PLN via DFM." },
      { id: "wfm-industrial-mes", number: "02", title: "WFM & Industrial MES Platform", description: "Real-time production dispatching, React 19 Canvas floor plan, and machine telemetry streaming.", result: "End-to-end dispatching with same-day parcel dispatch SLA under 12 hours." },
      { id: "embedded-mesh-iot", number: "03", title: "Distributed Embedded Mesh & Edge IoT", description: "Zero-router P2P wireless mesh on ESP32-C6 via ESP-NOW with RS485 and Wiegand integration.", result: "Sub-10ms packet delivery and ≥ 99.2% uptime across harsh factory environments." },
    ],
  },
  pl: {
    eyebrow: "Wybrane systemy",
    title: "Trzy systemy inżynierskie, w których łączą się architektura, firmware i mechanika.",
    read: "Zobacz studium przypadku",
    caption: "Abstrakty systemowe / każdy znak odpowiada sposobowi myślenia inżynierskiego stojącemu za projektem.",
    projects: [
      { id: "keysnap-robotics", number: "01", title: "KeySnap AI — autonomiczny kiosk CNC", description: "Precyzyjna mechanika CNC, automatyczne podawanie surówek, odciąg wiórów i brzegowe Raspberry Pi.", result: "FTR ≥ 98.5%, czas cyklu ≤ 60s, redukcja CAPEX do ≤ 25k PLN dzięki DFM." },
      { id: "wfm-industrial-mes", number: "02", title: "WFM & Przemysłowa Platforma MES", description: "Zarządzanie produkcją live, plan hali na React 19 Canvas i asynchroniczne kolejkowanie maszyn.", result: "Kompletny конвеєр zleceń z czasem realizacji wysyłki poniżej 12 godzin." },
      { id: "embedded-mesh-iot", number: "03", title: "Rozproszony Mesh Wbudowany & Edge IoT", description: "Bezrouterowa sieć kratowa P2P na ESP32-C6 (ESP-NOW) z magistralą RS485 i protokołem Wiegand.", result: "Opóźnienia pakietów <10ms i dostępność ≥ 99.2% w warunkach przemysłowych." },
    ],
  },
} as const;

export function SelectedWork({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="work" className="scroll-mt-20 py-24 sm:py-32 lg:py-40">
      <div className="container-custom">
        <div className="grid gap-10 border-b editorial-rule pb-12 lg:grid-cols-12">
          <p className="kicker lg:col-span-3">{t.eyebrow}</p>
          <h2 className="display-lg max-w-4xl text-[#eeece5] lg:col-span-8">{t.title}</h2>
        </div>
        <div className="mt-2">
          {t.projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="case-row group">
              <p className="case-row__number">{project.number}</p>
              <div>
                <h3 className="case-row__title">{project.title}</h3>
                <p className="case-row__description">{project.description}</p>
              </div>
              <div className="flex flex-col">
                <p className="case-row__result">{project.result}</p>
                <span className="case-row__link">{t.read}<ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="case-cover mt-6 grid gap-4 md:grid-cols-3">
          {t.projects.map((project) => <CaseArtwork key={project.id} id={project.id} index={project.number} label={project.title} />)}
        </div>
        <p className="case-cover__caption">{t.caption}</p>
      </div>
    </section>
  );
}
