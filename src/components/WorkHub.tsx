"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Globe, 
  Server, 
  Target, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Maximize2 
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { ProjectDrawer, type DrawerData } from "@/components/ui/ProjectDrawer";
import { PROJECTS, TRANSLATIONS, type Lang } from "@/data/portfolio-data";
import { CaseStudies } from "@/components/CaseStudies";
import { LiveShowcases } from "@/components/LiveShowcases";
import { SystemArchitecture } from "@/components/SystemArchitecture";
import { SolutionMatrix } from "@/components/SolutionMatrix";
import { TiltCard } from "@/components/ui/tilt-card";

interface WorkHubProps {
  lang: Lang;
}

type TabType = "cases" | "demos" | "architecture" | "solutions";

export function WorkHub({ lang }: WorkHubProps) {
  const [activeTab, setActiveTab] = useState<TabType>("cases");
  const [drawerData, setDrawerData] = useState<DrawerData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const t = {
    en: {
      eyebrow: "PROVEN IMPACT & ENGINEERING",
      title: "Interactive Work & Solutions",
      highlight: "Hub",
      subtitle: "Explore production systems, architecture diagrams, live showcases, and case studies — structured for progressive exploration.",
      tabs: {
        cases: "Case Studies",
        demos: "Live Showcases & Demos",
        architecture: "System Architecture",
        solutions: "Solution Matrix",
      },
    },
    pl: {
      eyebrow: "DOWIEDZIONY WPŁYW I INŻYNIERIA",
      title: "Interaktywny Hub Pracy i",
      highlight: "Rozwiązań",
      subtitle: "Przeglądaj systemy produkcyjne, diagramy architektury, pokazy na żywo i studia przypadków w przejrzystej formie.",
      tabs: {
        cases: "Studia Przypadków",
        demos: "Systemy Na Żywo",
        architecture: "Architektura Systemowa",
        solutions: "Macierz Rozwiązań",
      },
    },
  }[lang];

  const handleOpenProjectDrawer = (project: typeof PROJECTS["en"][0]) => {
    setDrawerData({
      id: project.id,
      category: project.category,
      title: project.title,
      metrics: project.metrics,
      description: project.fullDescription,
      techStack: project.tags,
      accentColor: project.accentColor as DrawerData["accentColor"],
    });
    setIsDrawerOpen(true);
  };

  const tabsConfig = [
    { id: "cases" as const, label: t.tabs.cases, icon: Briefcase, color: "indigo" },
    { id: "demos" as const, label: t.tabs.demos, icon: Globe, color: "cyan" },
    { id: "architecture" as const, label: t.tabs.architecture, icon: Server, color: "emerald" },
    { id: "solutions" as const, label: t.tabs.solutions, icon: Target, color: "violet" },
  ];

  return (
    <section id="work-hub" className="py-24 md:py-36 relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/[0.02] blur-[160px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          highlight={t.highlight}
          subtitle={t.subtitle}
        />

        {/* Tab Selection Navigation Bar */}
        <div className="flex justify-center mb-12 sm:mb-16">
          <div className="glass-panel p-2 rounded-2xl sm:rounded-3xl border border-white/10 flex flex-wrap sm:flex-nowrap gap-1.5 sm:gap-2 max-w-full overflow-x-auto shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            {tabsConfig.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2.5 px-4 sm:px-6 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-[#f7f8f8] shadow-lg"
                      : "text-[#a8a29e] hover:text-[#f7f8f8] hover:bg-white/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBadge"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl sm:rounded-2xl -z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <Icon size={16} className={isActive ? "text-amber-500" : "text-[#a8a29e]"} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Tab Content with Smooth Animation */}
        <AnimatePresence mode="wait">
          {activeTab === "cases" && (
            <motion.div
              key="cases"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Highlight Featured Cases Bento Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS[lang].map((project) => (
                  <TiltCard
                    key={project.id}
                    spotlightColor="rgba(245, 158, 11, 0.12)"
                    className="glass-card rounded-3xl p-7 border border-white/10 flex flex-col justify-between group hover:border-amber-500/40 relative overflow-hidden transition-all duration-400 h-full"
                  >
                    {/* Corner Accent Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-all" />

                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <Badge variant="slate" className="bg-[#18191c] text-[#a8a29e] border-white/10 px-3 py-1 font-mono text-xs">
                          // {project.category}
                        </Badge>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-[#f7f8f8] mb-2 group-hover:text-amber-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[#a8a29e] text-sm leading-relaxed mb-6">
                        {project.shortDescription}
                      </p>

                      {/* Primary Metrics Pills */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {project.metrics.slice(0, 2).map((res, i) => (
                          <div key={i} className="bg-[#121316] p-3 rounded-2xl border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                            <div className="text-lg font-mono font-bold text-[#f7f8f8]">
                              {res.value}
                            </div>
                            <div className="text-xs text-[#a8a29e]">
                              {res.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[11px] font-mono text-[#a8a29e] bg-[#18191c] px-2.5 py-0.5 rounded-lg border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleOpenProjectDrawer(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-400 group-hover:translate-x-0.5 transition-all cursor-pointer"
                      >
                        Inspect Details <Maximize2 size={13} />
                      </button>
                    </div>
                  </TiltCard>
                ))}
              </div>

              {/* Full Case Studies Accordion Component */}
              <div className="pt-8">
                <CaseStudies lang={lang} />
              </div>
            </motion.div>
          )}

          {activeTab === "demos" && (
            <motion.div
              key="demos"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <LiveShowcases lang={lang} />
            </motion.div>
          )}

          {activeTab === "architecture" && (
            <motion.div
              key="architecture"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <SystemArchitecture lang={lang} />
            </motion.div>
          )}

          {activeTab === "solutions" && (
            <motion.div
              key="solutions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <SolutionMatrix lang={lang} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Slide-Over Drawer for Detailed Project Inspection */}
        <ProjectDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          data={drawerData}
        />
      </div>
    </section>
  );
}
