import type { Lang } from "@/data/portfolio-data";
import { GraduationCap, CheckCircle2 } from "lucide-react";

const COPY = {
  en: {
    eyebrow: "About & Academic Credentials",
    title: "Triple Academic Qualification: Management, Computer Science & Automation.",
    body: "I combine a Master's degree (M.Sc.) in Management with double engineering degrees in Computer Science and Automatic Control & Electronics (493 total ECTS, 1,880+ hours of accredited industrial practicums). This unique synergy bridges boardroom CAPEX economics, industrial hardware and automation (Siemens S7, Factory I/O, Android SDK, ESP32-C6 mesh), and real-time distributed software (Python/FastAPI, React 19 Canvas).",
    degrees: [
      {
        title: "Magister (M.Sc.) — Management",
        institution: "PANS w Jarosławiu · 2023–2025",
        badge: "120 ECTS · 360h Practicum",
        focus: "Integrated ISO systems auditing (9001/14001/27001), operations research, strategic CAPEX investment planning & R&D product lifecycle.",
      },
      {
        title: "Inżynier (B.Sc. Eng.) — Computer Science",
        institution: "PANS w Jarosławiu · 2019–2023",
        badge: "213 ECTS · 800h Internships",
        focus: "Embedded systems, microprocessor architecture, operating systems, mesh routing protocols, Python & C/C++.",
      },
      {
        title: "Inżynier (B.Sc. Eng.) — Automatic Control & Practical Electronics",
        institution: "PANS w Jarosławiu · 2022–2026",
        badge: "160 ECTS · 720h Practicum",
        focus: "Siemens S7 PLC automation (TIA Portal), SCADA systems, industrial robotics (UR-5), control cabinets, and sensorics.",
      },
    ],
    facts: [
      "Triple Competence: Management + CS + Automation",
      "493 Total ECTS · 1,880h+ Industrial Practicums",
      "Full-Cycle Hardware, PLC & MES Architecture",
      "100% Verified Production ROI & Energy Optimization",
    ],
    footnote: "Polish — fluent · Ukrainian — native · English — technical B2 · Full EU Work Rights (No Visa Needed)",
  },
  pl: {
    eyebrow: "O mnie & Wykształcenie",
    title: "Potrójna Kwalifikacja Akademicka: Zarządzanie, Informatyka i Automatyka.",
    body: "Łączę wykształcenie wyższe magisterskie z zarządzania z dwoma dyplomami inżynierskimi — z informatyki oraz automatyki i elektroniki praktycznej (łącznie 493 ECTS i ponad 1880h praktyk przemysłowych). Ten unikalny profil łączy optymalizację procesów produkcyjnych, automatykę przemysłową i hardware (Siemens S7, Factory I/O, Android SDK, mesh ESP32-C6) z wysokowydajnym oprogramowaniem (Python/FastAPI, React 19 Canvas).",
    degrees: [
      {
        title: "Magister — Zarządzanie",
        institution: "PANS w Jarosławiu · 2023–2025",
        badge: "120 ECTS · 360h Praktyk",
        focus: "Audyt zintegrowanych systemów ISO (9001/14001/27001), badania operacyjne, planowanie inwestycji CAPEX i cykl życia produktów innowacyjnych.",
      },
      {
        title: "Inżynier — Informatyka",
        institution: "PANS w Jarosławiu · 2019–2023",
        badge: "213 ECTS · 800h Praktyk",
        focus: "Systemy wbudowane, architektura mikroprocesorowa, sieci komputerowe, struktury danych, C/C++ i Python.",
      },
      {
        title: "Inżynier — Automatyka i Elektronika Praktyczna",
        institution: "PANS w Jarosławiu · 2022–2026",
        badge: "160 ECTS · 720h Praktyk",
        focus: "PLC Siemens S7 (TIA Portal), systemy SCADA, roboty UR-5, napędy elektryczne, sensoryka i projektowanie szaf sterowniczych.",
      },
    ],
    facts: [
      "Potrójna Kwalifikacja: Zarządzanie + Informatyka + Automatyka",
      "Łącznie 493 ECTS · 1880h+ Praktyk Przemysłowych",
      "Pełny Cykl: Hardware, PLC, Firmware & Platformy MES",
      "Udokumentowane ROI Wdrożeń & Optymalizacja Energetyczna",
    ],
    footnote: "Polski — płynny · Ukraiński — ojczysty · Angielski — techniczny B2 · Pełne Prawa Pracy UE (Bez Wizy)",
  },
} as const;

export function About({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="about" className="scroll-mt-20 border-y editorial-rule py-16 sm:py-28 lg:py-36 overflow-hidden w-full max-w-full">
      <div className="container-custom grid gap-8 sm:gap-10 lg:grid-cols-12 w-full max-w-full min-w-0">
        <p className="kicker lg:col-span-3">{t.eyebrow}</p>
        <div className="lg:col-span-8 space-y-8 sm:space-y-10">
          <div>
            <h2 className="display-lg max-w-4xl text-[#eeece5]">{t.title}</h2>
            <p className="editorial-copy mt-6 sm:mt-8 max-w-3xl">{t.body}</p>
          </div>

          {/* Academic Degrees Grid */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#c4a160] uppercase tracking-wider font-semibold">
              <GraduationCap size={16} />
              <span>{lang === "pl" ? "Stopnie Naukowe & Praktyki Przemysłowe:" : "Academic Degrees & Industrial Practicums:"}</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {t.degrees.map((deg, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#161513] border border-white/[0.08] hover:border-[#c4a160]/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-2">
                    <div>
                      <h4 className="font-bold text-[#eeece5] text-sm sm:text-base flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-[#c4a160] shrink-0" />
                        <span>{deg.title}</span>
                      </h4>
                      <p className="text-xs text-[#a39c91] font-mono mt-0.5">{deg.institution}</p>
                    </div>
                    <span className="self-start font-mono text-[10.5px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-[#c4a160]/10 border border-[#c4a160]/30 text-[#c4a160] font-semibold shrink-0">
                      {deg.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#c5beb3] mt-2.5 leading-relaxed font-mono">
                    {deg.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <ul className="grid max-w-4xl border-y editorial-rule grid-cols-1 sm:grid-cols-2">
            {t.facts.map((fact, index) => (
              <li
                key={fact}
                className={`py-3.5 sm:py-4 text-xs sm:text-sm text-[#eeece5] ${
                  index % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"
                } ${index < 3 ? "border-b editorial-rule sm:border-b-0 sm:[&:nth-child(-n+2)]:border-b" : ""}`}
              >
                <span className="mr-3 font-mono text-xs text-[#c4a160]">0{index + 1}</span>
                {fact}
              </li>
            ))}
          </ul>

          <p className="font-mono text-[0.67rem] uppercase tracking-[0.12em] text-[#777168] leading-relaxed">
            {t.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
