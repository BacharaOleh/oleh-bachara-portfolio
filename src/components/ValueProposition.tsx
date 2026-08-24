"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Code2, Zap, BarChart3, Shield } from "lucide-react";
import { VALUE_CARDS, VALUE_CARD_PERSPECTIVES, TRANSLATIONS, type Lang, type Perspective } from "@/data/portfolio-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const ICONS: Record<string, React.ElementType> = { Code2, Zap, BarChart3, Shield };

const accentThemes = {
  indigo: {
    borderHover: "hover:border-indigo-500/40",
    badge: "indigo" as const,
    metricText: "text-indigo-400",
    iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    glowGradient: "from-indigo-600/10 via-transparent to-transparent",
  },
  cyan: {
    borderHover: "hover:border-cyan-500/40",
    badge: "cyan" as const,
    metricText: "text-cyan-400",
    iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    glowGradient: "from-cyan-600/10 via-transparent to-transparent",
  },
  violet: {
    borderHover: "hover:border-violet-500/40",
    badge: "violet" as const,
    metricText: "text-violet-400",
    iconBg: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    glowGradient: "from-violet-600/10 via-transparent to-transparent",
  },
  emerald: {
    borderHover: "hover:border-emerald-500/40",
    badge: "emerald" as const,
    metricText: "text-emerald-400",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    glowGradient: "from-emerald-600/10 via-transparent to-transparent",
  },
};

interface ValuePropositionProps {
  lang: Lang;
  perspective: Perspective;
}

export function ValueProposition({ lang, perspective }: ValuePropositionProps) {
  const t = TRANSLATIONS[lang].impact;
  const cards = VALUE_CARDS[lang];
  const overlayMap = VALUE_CARD_PERSPECTIVES[perspective][lang];

  return (
    <section id="impact" className="py-20 md:py-28 relative">
      <div className="container-custom">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          highlight={t.highlight}
          subtitle={t.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {cards.map((card, i) => {
            const Icon = ICONS[card.icon] || Code2;
            const theme = accentThemes[card.accentColor as keyof typeof accentThemes];
            const isFirst = i === 0;
            const isLast = i === 3;
            const colSpan = isFirst ? "md:col-span-7" : isLast ? "md:col-span-7" : "md:col-span-5";
            const overlay = overlayMap[card.id];

            const currentMetric = overlay ? overlay.metric : card.metric;
            const currentMetricLabel = overlay ? overlay.metricLabel : card.metricLabel;
            const currentDescription = overlay ? overlay.description : card.description;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={colSpan}
              >
                <SpotlightCard
                  className={`glass-card h-full p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between`}
                  spotlightColor={
                    card.accentColor === "indigo" ? "rgba(99,102,241,0.10)" :
                    card.accentColor === "cyan" ? "rgba(56,189,248,0.10)" :
                    card.accentColor === "violet" ? "rgba(168,85,247,0.10)" :
                    "rgba(16,185,129,0.10)"
                  }
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.glowGradient} opacity-50 pointer-events-none`} />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${theme.iconBg}`}>
                        <Icon size={20} />
                      </div>
                      <div className="text-right">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${perspective}-${currentMetric}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.25 }}
                            className={`text-3xl font-extrabold font-mono ${theme.metricText}`}
                          >
                            {currentMetric}
                          </motion.div>
                        </AnimatePresence>
                        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                          {currentMetricLabel}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                      {card.title}
                    </h3>

                    <AnimatePresence mode="wait">
                      <motion.p
                        key={`${perspective}-${card.id}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-slate-300 text-sm leading-relaxed mb-6 font-normal"
                      >
                        {currentDescription}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <div className="relative z-10 pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
                    {card.tags.map((tag) => (
                      <Badge key={tag} variant={theme.badge}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
