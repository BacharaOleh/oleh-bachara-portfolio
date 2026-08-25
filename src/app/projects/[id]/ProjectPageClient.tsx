"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Tag,
  BarChart3,
  ChevronRight,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { PROJECTS, type Project, type Lang } from "@/data/portfolio-data";

interface ProjectPageClientProps {
  projectEn: Project;
  projectPl: Project;
}

export function ProjectPageClient({ projectEn, projectPl }: ProjectPageClientProps) {
  const [lang, setLang] = useState<Lang>("en");
  const project = lang === "en" ? projectEn : projectPl;

  // Find related projects (other projects)
  const allProjects = PROJECTS[lang];
  const relatedProjects = allProjects.filter((p) => p.id !== project.id);

  return (
    <div className="relative min-h-screen bg-[#08090a] text-[#f7f8f8] overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-[15%] left-[20%] w-[650px] h-[650px] rounded-full blur-[130px] bg-amber-500/[0.02]" />
        <div className="absolute top-[50%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[130px] bg-amber-500/[0.015]" />
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#08090a]/80 backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-mono text-[#a8a29e] hover:text-[#f7f8f8] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {lang === "pl" ? "Powrót do Portfolio" : "Back to Portfolio"}
          </Link>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-[#121316] border border-white/10 rounded-full p-0.5">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-white/10 text-[#f7f8f8] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "text-[#a8a29e] hover:text-[#f7f8f8]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("pl")}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                lang === "pl"
                  ? "bg-white/10 text-[#f7f8f8] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                  : "text-[#a8a29e] hover:text-[#f7f8f8]"
              }`}
            >
              PL
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-24">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-1.5 text-xs font-mono text-[#78716c] mb-8"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-[#a8a29e] transition-colors">
            {lang === "pl" ? "Portfolio" : "Portfolio"}
          </Link>
          <ChevronRight size={12} />
          <span className="text-[#a8a29e]">{lang === "pl" ? "Projekty" : "Projects"}</span>
          <ChevronRight size={12} />
          <span className="text-[#f7f8f8] font-semibold truncate max-w-[200px]">{project.title}</span>
        </motion.nav>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#121316] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#a8a29e]">
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f8f8] tracking-tight leading-[1.15] mb-6">
            {project.title}
          </h1>

          {/* Short Description */}
          <p className="text-lg text-[#a8a29e] leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {project.metrics.map((metric, i) => (
            <TiltCard
              key={metric.label}
              className="glass-card p-5 sm:p-6 rounded-2xl text-center relative overflow-hidden border border-white/10 hover:border-amber-500/40 shadow-xl"
              spotlightColor="rgba(245, 158, 11, 0.1)"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-gradient-accent tracking-tight font-mono">
                {metric.value}
              </div>
              <div className="text-xs text-[#a8a29e] font-medium mt-1.5 font-sans">
                {metric.label}
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Full Description Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12"
        >
          <SpotlightCard
            className="glass-card p-8 sm:p-10 rounded-3xl relative overflow-hidden"
            spotlightColor="rgba(245, 158, 11, 0.06)"
          >
            <h2 className="text-xl font-bold text-[#f7f8f8] tracking-tight mb-5 flex items-center gap-2">
              <BarChart3 size={20} className="text-amber-500" />
              {lang === "pl" ? "Szczegółowy Opis Projektu" : "Detailed Project Overview"}
            </h2>
            <p className="text-[#d6d3d1] text-base leading-[1.8] font-normal">
              {project.fullDescription}
            </p>
          </SpotlightCard>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-sm font-bold text-[#f7f8f8] mb-4 flex items-center gap-2">
            <Tag size={14} className="text-amber-500" />
            {lang === "pl" ? "Technologie i Umiejętności" : "Technologies & Skills"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="slate">{tag}</Badge>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] mb-12" />

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <h3 className="text-lg font-bold text-[#f7f8f8] mb-6 flex items-center gap-2">
              <Globe size={18} className="text-amber-500" />
              {lang === "pl" ? "Inne Projekty" : "Other Projects"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProjects.map((rp) => (
                <Link key={rp.id} href={`/projects/${rp.id}`}>
                  <SpotlightCard
                    className="glass-card p-6 rounded-2xl h-full relative overflow-hidden group hover:border-amber-500/30 transition-all"
                    spotlightColor="rgba(245, 158, 11, 0.06)"
                  >
                    <div className="mb-3">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#78716c]">
                        {rp.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#f7f8f8] tracking-tight mb-2 group-hover:text-amber-400 transition-colors leading-snug">
                      {rp.title}
                    </h4>
                    <p className="text-xs text-[#a8a29e] line-clamp-2 leading-relaxed">
                      {rp.shortDescription}
                    </p>

                    <div className="mt-4 flex items-center gap-1 text-xs font-mono text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {lang === "pl" ? "Zobacz projekt" : "View project"}
                      <ChevronRight size={12} />
                    </div>
                  </SpotlightCard>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Portfolio CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link href="/">
            <Button variant="outline" size="lg" className="cursor-pointer">
              <ArrowLeft size={16} />
              {lang === "pl" ? "Powrót do Portfolio" : "Back to Portfolio"}
            </Button>
          </Link>
        </motion.div>
      </main>

      {/* Footer Attribution */}
      <footer className="border-t border-white/[0.06] bg-[#08090a] py-8 relative z-10">
        <div className="max-w-5xl mx-auto px-6 text-center text-xs text-[#78716c] font-mono">
          © {new Date().getFullYear()} Oleh Bachara · Jarosław, Poland 🇵🇱
        </div>
      </footer>
    </div>
  );
}
