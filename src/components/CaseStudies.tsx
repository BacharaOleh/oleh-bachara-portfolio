"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PROJECTS, TRANSLATIONS, type Lang } from "@/data/portfolio-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

const accentThemes = {
  indigo: {
    borderHover: "hover:border-amber-500/40",
    badge: "slate" as const,
    metricText: "text-amber-500",
    number: "text-white/5",
    bg: "from-amber-500/5",
  },
  cyan: {
    borderHover: "hover:border-white/20",
    badge: "slate" as const,
    metricText: "text-[#f7f8f8]",
    number: "text-white/5",
    bg: "from-white/5",
  },
  emerald: {
    borderHover: "hover:border-amber-500/40",
    badge: "slate" as const,
    metricText: "text-amber-500",
    number: "text-white/5",
    bg: "from-amber-500/5",
  },
};

interface CaseStudiesProps {
  lang: Lang;
}

export function CaseStudies({ lang }: CaseStudiesProps) {
  const t = TRANSLATIONS[lang].projects;
  const projectList = PROJECTS[lang];
  const [openId, setOpenId] = useState<string | null>(projectList[0].id);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="container-custom">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          highlight={t.highlight}
          subtitle={t.subtitle}
        />

        <div className="space-y-6">
          {projectList.map((project, i) => {
            const theme = accentThemes[project.accentColor as keyof typeof accentThemes];
            const isOpen = openId === project.id;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-card rounded-3xl overflow-hidden relative transition-all duration-300 ${theme.borderHover} ${
                  isOpen ? "border-indigo-500/30 bg-slate-900/80" : ""
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : project.id)}
                  className="w-full text-left p-6 sm:p-8 flex items-start gap-6 cursor-pointer group"
                >
                  <div className={`text-4xl sm:text-5xl font-mono font-extrabold ${theme.number} hidden sm:block shrink-0`}>
                    0{i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <span className="text-[11px] font-mono font-medium tracking-wider uppercase text-indigo-400 mb-1 block">
                          // {project.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                          {project.title}
                        </h3>
                      </div>

                      <div className="w-9 h-9 rounded-full bg-slate-900 border border-white/[0.08] flex items-center justify-center text-slate-400 group-hover:text-white shrink-0 mt-1">
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown size={18} />
                        </motion.div>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-3xl">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant={theme.badge}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/[0.06]">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                          {project.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="bg-slate-950/60 border border-white/[0.08] p-4 rounded-2xl text-center"
                            >
                              <div className={`text-2xl font-extrabold font-mono ${theme.metricText}`}>
                                {m.value}
                              </div>
                              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-1">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="bg-slate-950/40 border border-white/[0.06] p-5 sm:p-6 rounded-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
                          <p>{project.fullDescription}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
