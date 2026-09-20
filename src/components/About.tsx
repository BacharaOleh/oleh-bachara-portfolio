import type { Lang } from "@/data/portfolio-data";

const COPY = {
  en: {
    eyebrow: "About",
    title: "From microcontrollers and CNC mechanics to high-concurrency cloud and web systems.",
    body: "I hold a Master's degree (Magister) and combine 10+ years of family domain heritage in precision lock & key mechanics with modern IoT and software engineering. I design hardware kiosks, program low-latency ESP-NOW mesh networks on ESP32-C6, build Raspberry Pi industrial edge gateways, and engineer full-stack MES systems with Python/FastAPI and React 19 Canvas.",
    facts: ["ESP32-C6 & ESP-NOW Mesh", "CNC & Robotics (±0.05 mm)", "Industrial MES (FastAPI & React 19)", "10+ Yrs Locksmith Domain Expertise"],
    footnote: "Polish — fluent · Ukrainian — native · English — technical B2",
  },
  pl: {
    eyebrow: "O mnie",
    title: "Od mikrokontrolerów i mechaniki CNC po wysokowydajne systemy chmurowe i webowe.",
    body: "Posiadam wykształcenie wyższe magisterskie oraz ponad 10-letnie rodzinne zaplecze branżowe w mechanice precyzyjnej i systemach zamkowych. Projektuję autonomiczne automaty, programuję sieci mesh ESP-NOW na ESP32-C6, buduję przemysłowe bramki brzegowe Raspberry Pi oraz tworzę systemy MES w oparciu o Python/FastAPI i React 19 Canvas.",
    facts: ["ESP32-C6 & Mesh ESP-NOW", "CNC i Robotyka (±0.05 mm)", "Przemysłowy MES (FastAPI & React 19)", "10+ lat wiedzy domenowej"],
    footnote: "Polski — płynny · Ukraiński — ojczysty · Angielski — techniczny B2",
  },
} as const;

export function About({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="about" className="scroll-mt-20 border-y editorial-rule py-24 sm:py-32 lg:py-40">
      <div className="container-custom grid gap-10 lg:grid-cols-12">
        <p className="kicker lg:col-span-3">{t.eyebrow}</p>
        <div className="lg:col-span-8">
          <h2 className="display-lg max-w-4xl text-[#eeece5]">{t.title}</h2>
          <p className="editorial-copy mt-9 max-w-3xl">{t.body}</p>
          <ul className="mt-12 grid max-w-4xl border-y editorial-rule sm:grid-cols-2">{t.facts.map((fact, index) => <li key={fact} className={`py-4 text-sm text-[#eeece5] ${index % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"} ${index < 2 ? "border-b editorial-rule" : ""}`}><span className="mr-3 font-mono text-xs text-[#c4a160]">0{index + 1}</span>{fact}</li>)}</ul>
          <p className="mt-8 font-mono text-[0.67rem] uppercase tracking-[0.12em] text-[#777168]">{t.footnote}</p>
        </div>
      </div>
    </section>
  );
}
