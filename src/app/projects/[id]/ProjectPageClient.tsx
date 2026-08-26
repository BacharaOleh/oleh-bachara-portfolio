"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseArtwork } from "@/components/CaseArtwork";
import { CASE_STUDY_CONTENT, FEATURED_PROJECT_IDS, type FeaturedProjectId } from "@/data/case-study-content";
import { PROJECTS, type Project, type Lang } from "@/data/portfolio-data";

interface ProjectPageClientProps {
  projectEn: Project;
  projectPl: Project;
}

const COPY = {
  en: { back: "Back to portfolio", selectedOutcome: "Selected outcome", projectNotes: "Project notes", role: "Role", period: "Period", scope: "Scope", technologies: "Technologies", nextCase: "Next case", overview: "Overview", type: "Project type", record: "Case record", contribution: "Contribution" },
  pl: { back: "Powrót do portfolio", selectedOutcome: "Wybrany rezultat", projectNotes: "Notatki projektowe", role: "Rola", period: "Okres", scope: "Zakres", technologies: "Technologie", nextCase: "Następny case", overview: "Przegląd", type: "Typ projektu", record: "Karta case", contribution: "Wkład" },
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
  const nextProject = featuredProjects.length > 1 && currentIndex >= 0
    ? featuredProjects[(currentIndex + 1) % featuredProjects.length]
    : null;

  return (
    <div className="site-shell min-h-screen overflow-x-hidden">
      <div className="site-grain" aria-hidden="true" />
      <header className="sticky top-0 z-50 border-b border-white/[0.09] bg-[#11100e]/85 backdrop-blur-xl">
        <div className="container-custom flex min-h-20 items-center justify-between py-4">
          <Link href="/" className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#b9b4aa] transition-colors hover:text-[#eeece5]">
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            {t.back}
          </Link>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em]">
            {(["en", "pl"] as Lang[]).map((item) => (
              <button key={item} type="button" onClick={() => setLang(item)}
                className={`px-2 py-1 transition-colors ${lang === item ? "bg-[#eeece5] text-[#11100e]" : "text-[#777168] hover:text-[#eeece5]"}`}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>
      <main className="container-custom relative py-14 sm:py-20 lg:py-28">
        <section className="grid gap-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-2"><p className="kicker">{study?.index ?? "04"} / {study?.type ?? t.type}</p></div>
          <div className="lg:col-span-10">
            <h1 className="display-xl max-w-5xl">{project.title}</h1>
            <div className="mt-8 grid gap-6 border-t border-white/[0.12] pt-6 md:grid-cols-12">
              <p className="editorial-copy text-xl text-[#d4d0c8] md:col-span-8">{project.shortDescription}</p>
              <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.13em] text-[#777168] md:col-span-4 md:text-right">{study?.artLabel ?? "Project record"}</p>
            </div>
          </div>
        </section>
        <section className="mt-14 sm:mt-20">
          {featuredProjectId ? (
            <CaseArtwork id={featuredProjectId} index={study?.index ?? "01"} label={project.title} />
          ) : (
            <div className="case-art case-art--migration flex min-h-[340px] items-end p-6 sm:min-h-[460px] sm:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#eeece5]/70">Independent project / {project.title}</span>
            </div>
          )}
          <div className="case-ledger">
            <div><span>{t.record}</span><strong>{study?.index ?? "04"} / {study?.type ?? t.type}</strong></div>
            <div><span>{t.contribution}</span><strong>{study?.role ?? "Web Developer"}</strong></div>
            <div><span>{t.period}</span><strong>{study?.period ?? "Independent work"}</strong></div>
          </div>
        </section>
        <section className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-2"><p className="kicker">{t.projectNotes}</p></div>
          <div className="space-y-14 lg:col-span-7">
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
          <aside className="lg:col-span-3 lg:pl-4">
            <div className="border-t border-white/[0.14] pt-5 lg:sticky lg:top-28">
              <dl className="metadata-list">
                <div><dt>{t.role}</dt><dd>{study?.role ?? "Web Developer"}</dd></div>
                <div><dt>{t.period}</dt><dd>{study?.period ?? "Independent work"}</dd></div>
                <div><dt>{t.scope}</dt><dd>{study?.scope ?? project.tags.join(", ")}</dd></div>
              </dl>
              <div className="mt-10 border-t border-white/[0.10] pt-5">
                <p className="kicker">{t.technologies}</p>
                <ul className="tag-list mt-4">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </div>
            </div>
          </aside>
        </section>
        {nextProject && (
          <section className="mt-24 border-t border-white/[0.14] pt-8 sm:mt-32 sm:pt-10">
            <Link href={`/projects/${nextProject.id}`} className="group grid gap-4 md:grid-cols-12 md:items-end">
              <span className="kicker md:col-span-2">{t.nextCase}</span>
              <span className="display-lg flex items-center gap-4 md:col-span-9 group-hover:text-[#c4a160]">
                {nextProject.title}
                <ArrowRight size={30} strokeWidth={1.25} className="transition-transform group-hover:translate-x-2" />
              </span>
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
