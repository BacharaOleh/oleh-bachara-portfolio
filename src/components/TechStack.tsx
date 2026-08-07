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
    <section id="skills" className="py-20 md:py-28 relative">
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
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200 bg-slate-900/50 hover:bg-slate-900 border border-white/[0.06]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 shadow-md shadow-indigo-500/20"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
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
                className="glass-card p-5 rounded-2xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white tracking-tight">
                    {skill.name}
                  </span>
                  <span className="text-xs font-mono font-semibold text-indigo-400">
                    {skill.level}%
                  </span>
                </div>

                <div className="h-1.5 w-full rounded-full bg-slate-950/80 overflow-hidden border border-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: i * 0.04 + 0.1, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
