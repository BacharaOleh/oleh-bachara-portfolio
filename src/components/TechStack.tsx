"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_TABS, TRANSLATIONS, type Lang } from "@/data/portfolio-data";
import { SectionHeading } from "@/components/ui/section-heading";

interface TechStackProps {
  lang: Lang;
}

export function TechStack({ lang }: TechStackProps) {
  const t = TRANSLATIONS[lang].skills;
  const tabs = SKILL_TABS[lang];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  // Ensure activeData falls back to first tab if ID changes on lang switch
  const activeData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section id="skills" className="py-24 md:py-36 relative">
      <div className="container-custom">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          highlight={t.highlight}
          subtitle={t.subtitle}
        />

        {/* Tab Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {tabs.map((tab) => {
            const isActive = activeData.id === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#f7f8f8]"
                    : "text-[#a8a29e] hover:text-[#f7f8f8] bg-[#121316]/50 hover:bg-[#121316] border border-white/[0.06]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {activeData.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="glass-card p-5 rounded-2xl flex flex-col justify-between hover:border-amber-500/30 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[#f7f8f8] tracking-tight">
                      {skill.name}
                    </span>
                    <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                      skill.badge === "Core"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : skill.badge === "Advanced"
                        ? "bg-white/10 text-[#d6d3d1] border-white/15"
                        : "bg-[#121316] text-[#a8a29e] border-white/10"
                    }`}>
                      {skill.badge}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-[#a8a29e] leading-relaxed">
                    {skill.experience}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
