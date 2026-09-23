"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Radio } from "lucide-react";
import { CaseArtwork } from "@/components/CaseArtwork";
import { SanPajdaVisualizer } from "@/components/SanPajdaVisualizer";
import { GoodvalleyVisualizer } from "@/components/GoodvalleyVisualizer";
import { MesCanvasVisualizer } from "@/components/MesCanvasVisualizer";
import { MeshVisualizer } from "@/components/MeshVisualizer";
import {
  CASE_STUDY_CONTENT,
  FEATURED_PROJECT_IDS,
  type FeaturedProjectId,
} from "@/data/case-study-content";
import { PROJECTS, type Project, type Lang } from "@/data/portfolio-data";

interface ProjectPageClientProps {
  projectEn: Project;
  projectPl: Project;
}

const COPY = {
  en: {
    back: "Back to portfolio",
    selectedOutcome: "Selected outcome",
    projectNotes: "Project notes",
    role: "Role",
    period: "Period",
    scope: "Scope",
    technologies: "Technologies",
    nextCase: "Next case",
    overview: "Overview",
    type: "Project type",
    record: "Case record",
    contribution: "Contribution",
    labKicker: "02 // Interactive Engineering Lab & Schematics",
  },
  pl: {
    back: "Powrót do portfolio",
    selectedOutcome: "Wybrany rezultat",
    projectNotes: "Notatki projektowe",
    role: "Rola",
    period: "Okres",
    scope: "Zakres",
    technologies: "Technologie",
    nextCase: "Następny case",
    overview: "Przegląd",
    type: "Typ projektu",
    record: "Karta case",
    contribution: "Wkład",
    labKicker: "02 // Interaktywne Laboratorium Inżynierskie & Schematy",
  },
} as const;

function isFeaturedProject(id: string): id is FeaturedProjectId {
  return FEATURED_PROJECT_IDS.includes(id as FeaturedProjectId);
}

export function ProjectPageClient({ projectEn, projectPl }: ProjectPageClientProps) {
  const [lang, setLang] = useState<Lang>("en");
  const project = lang === "en" ? projectEn : projectPl;
  const t = COPY[lang];
  const featuredProjectId = isFeaturedProject(project.id) ? project.id : null;
  const study = featuredProjectId ? CASE_STUDY_CONTENT[lang][featuredProjectId] : null;
  const sections = study?.sections ?? [{ title: t.overview, body: project.fullDescription }];

  const featuredProjects = PROJECTS[lang].filter((item) => isFeaturedProject(item.id));
  const currentIndex = featuredProjects.findIndex((item) => item.id === project.id);
  const nextProject =
    featuredProjects.length > 1 && currentIndex >= 0
      ? featuredProjects[(currentIndex + 1) % featuredProjects.length]
      : null;

  return (
    <div className="site-shell min-h-screen overflow-x-hidden">
      <div className="site-grain" aria-hidden="true" />
      <header className="sticky top-0 z-50 border-b border-white/[0.09] bg-[#11100e]/85 backdrop-blur-xl">
        <div className="container-custom flex min-h-16 sm:min-h-20 items-center justify-between py-3 sm:py-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 min-h-[44px] font-mono text-[10px] uppercase tracking-[0.15em] text-[#b9b4aa] transition-colors hover:text-[#eeece5]"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            {t.back}
          </Link>
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em]">
            {(["en", "pl"] as Lang[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLang(item)}
                className={`min-h-[44px] min-w-[44px] sm:min-h-[36px] sm:min-w-[36px] px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center justify-center ${
                  lang === item
                    ? "bg-[#eeece5] text-[#11100e] font-bold"
                    : "text-[#777168] hover:text-[#eeece5]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container-custom relative w-full max-w-full min-w-0 overflow-x-hidden overflow-x-clip py-14 sm:py-20 lg:py-28 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))]">
        {/* Project Header */}
        <section className="grid gap-10 lg:grid-cols-12 lg:gap-x-8 w-full max-w-full min-w-0">
          <div className="lg:col-span-2">
            <p className="kicker">
              {study?.index ?? "04"} / {study?.type ?? t.type}
            </p>
          </div>
          <div className="lg:col-span-10">
            <h1 className="display-xl max-w-5xl">{project.title}</h1>
            <div className="mt-8 grid gap-6 border-t border-white/[0.12] pt-6 md:grid-cols-12">
              <p className="editorial-copy text-xl text-[#d4d0c8] md:col-span-8">
                {project.shortDescription}
              </p>
              <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.13em] text-[#777168] md:col-span-4 md:text-right">
                {study?.artLabel ?? "Project record"}
              </p>
            </div>
          </div>
        </section>

        {/* Hero Banner Case Artwork */}
        <section className="mt-14 sm:mt-20 w-full max-w-full min-w-0 overflow-hidden">
          {featuredProjectId ? (
            <CaseArtwork id={featuredProjectId} index={study?.index ?? "01"} label={project.title} />
          ) : (
            <div className="case-art case-art--migration flex min-h-[340px] items-end p-6 sm:min-h-[460px] sm:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#eeece5]/70">
                Independent project / {project.title}
              </span>
            </div>
          )}
          <div className="case-ledger">
            <div>
              <span>{t.record}</span>
              <strong>
                {study?.index ?? "04"} / {study?.type ?? t.type}
              </strong>
            </div>
            <div>
              <span>{t.contribution}</span>
              <strong>{study?.role ?? "Lead Systems & Automation Engineer"}</strong>
            </div>
            <div>
              <span>{t.period}</span>
              <strong>{study?.period ?? "Engineering Project"}</strong>
            </div>
          </div>
        </section>

        {/* Core Case Content & Metadata (2 + 7 + 3 Layout) */}
        <section className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 w-full max-w-full min-w-0">
          <div className="lg:col-span-2">
            <p className="kicker">{t.projectNotes}</p>
          </div>
          <div className="space-y-14 lg:col-span-7 min-w-0">
            {sections.map((section) => (
              <article key={section.title} className="case-section">
                <h2 className="display-md">{section.title}</h2>
                <p className="editorial-copy mt-5 text-lg sm:text-xl">{section.body}</p>
              </article>
            ))}

            <div className="border-l border-[#c4a160] pl-5 sm:pl-7">
              <p className="kicker text-[#c4a160]">{t.selectedOutcome}</p>
              <p className="case-outcome mt-4">{study?.outcome ?? project.metrics[0]?.value}</p>
            </div>
          </div>

          {/* Right Sidebar Metadata */}
          <aside className="lg:col-span-3 lg:pl-4 min-w-0">
            <div className="border-t border-white/[0.14] pt-5 lg:sticky lg:top-28">
              <dl className="metadata-list">
                <div>
                  <dt>{t.role}</dt>
                  <dd>{study?.role ?? "Lead Systems & Automation Engineer"}</dd>
                </div>
                <div>
                  <dt>{t.period}</dt>
                  <dd>{study?.period ?? "Engineering Project"}</dd>
                </div>
                <div>
                  <dt>{t.scope}</dt>
                  <dd>{study?.scope ?? project.tags.join(", ")}</dd>
                </div>
              </dl>
              <div className="mt-10 border-t border-white/[0.10] pt-5">
                <p className="kicker">{t.technologies}</p>
                <ul className="tag-list mt-4">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </section>

        {/* ── FULL-WIDTH DEDICATED INTERACTIVE ENGINEERING LAB & SHOWCASE ── */}
        <section className="mt-20 sm:mt-28 border-t border-white/[0.12] pt-12 sm:pt-16 w-full max-w-full min-w-0 overflow-hidden">
          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <p className="kicker">{t.labKicker}</p>
            <span className="font-mono text-[10px] uppercase text-[#777168] tracking-widest hidden sm:inline-block">
              {project.title}
            </span>
          </div>

          {/* 01. San-Pajda Turbomixer SCADA & Oven PID Console */}
          {project.id === "san-pajda-automation" && <SanPajdaVisualizer lang={lang} />}

          {/* 02. Goodvalley Food Processing & Sensor De-Jitter Lab */}
          {project.id === "goodvalley-automation" && <GoodvalleyVisualizer lang={lang} />}

          {/* 03. WFM & Industrial MES 2D Digital Twin Canvas */}
          {project.id === "wfm-industrial-mes" && <MesCanvasVisualizer lang={lang} />}

          {/* 04. Embedded Mesh & IoT Simulator */}
          {project.id === "embedded-mesh-iot" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl text-[#eeece5] sm:text-3xl">
                    {lang === "pl"
                      ? "Interaktywny Symulator Sieci Kratowej (Mesh)"
                      : "Interactive Mesh Network Simulator"}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#b9b4aa] leading-relaxed">
                    {lang === "pl"
                      ? "Przetestuj na żywo samonaprawę (self-healing) oraz porównaj topologię z zawodnym Wi-Fi."
                      : "Live test dynamic self-healing failover and compare topology against fragile factory Wi-Fi."}
                  </p>
                </div>
                <Link
                  href="/mesh"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[#c4a160]/40 bg-[#c4a160]/10 hover:bg-[#c4a160]/20 font-mono text-xs text-[#c4a160] transition-colors shrink-0 min-h-[44px]"
                >
                  <span>{lang === "pl" ? "Pełny Przewodnik Wizualny ↗" : "Full Visual Guide ↗"}</span>
                </Link>
              </div>

              <MeshVisualizer lang={lang} />

              {/* Embedded Node Hardware Architecture Info */}
              <div className="rounded-xl border border-white/10 bg-[#161513] p-5 sm:p-6">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#c4a160] mb-3">
                  <Radio size={14} />
                  <span>
                    {lang === "pl"
                      ? "Specyfikacja Węzła Sprzętowego (Hardware Specs)"
                      : "Hardware Node Specification"}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 min-[360px]:gap-3 font-mono text-xs">
                  <div className="p-2.5 min-[360px]:p-3.5 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-[10px] text-[#777168] block">MCU Core</span>
                    <span className="text-[#eeece5] font-bold text-[11px] min-[360px]:text-xs">ESP32-C6 (RISC-V)</span>
                  </div>
                  <div className="p-2.5 min-[360px]:p-3.5 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-[10px] text-[#777168] block">RF Protocol</span>
                    <span className="text-emerald-400 font-bold text-[11px] min-[360px]:text-xs">ESP-NOW (2.4 GHz)</span>
                  </div>
                  <div className="p-2.5 min-[360px]:p-3.5 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-[10px] text-[#777168] block">Latency</span>
                    <span className="text-amber-400 font-bold text-[11px] min-[360px]:text-xs">&lt; 10 ms (P2P)</span>
                  </div>
                  <div className="p-2.5 min-[360px]:p-3.5 rounded-lg bg-black/30 border border-white/5">
                    <span className="text-[10px] text-[#777168] block">Industrial Bus</span>
                    <span className="text-cyan-400 font-bold text-[11px] min-[360px]:text-xs">RS485 + Wiegand</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Next Case Navigation */}
        {nextProject && (
          <section className="mt-20 border-t border-white/[0.14] pt-8 sm:mt-32 sm:pt-10">
            <Link
              href={`/projects/${nextProject.id}`}
              className="group grid gap-3 sm:gap-4 md:grid-cols-12 md:items-end min-h-[44px]"
            >
              <span className="kicker md:col-span-2">{t.nextCase}</span>
              <span className="display-lg flex items-center justify-between sm:justify-start gap-4 md:col-span-9 group-hover:text-[#c4a160] transition-colors">
                <span>{nextProject.title}</span>
                <ArrowRight
                  size={24}
                  strokeWidth={1.5}
                  className="shrink-0 transition-transform group-hover:translate-x-2"
                />
              </span>
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
