"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Award } from "lucide-react";
import { EDUCATION, LANGUAGES, TRANSLATIONS, type Lang } from "@/data/portfolio-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

interface EducationProps {
  lang: Lang;
}

export function Education({ lang }: EducationProps) {
  const t = TRANSLATIONS[lang].education;
  const educationList = EDUCATION[lang];
  const languageList = LANGUAGES[lang];

  return (
    <section id="education" className="py-20 md:py-28 relative">
      <div className="container-custom">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          highlight={t.highlight}
          subtitle={t.subtitle}
        />

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationList.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <GraduationCap size={20} />
                    </div>
                    <span className="font-mono text-xs font-semibold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                      {edu.years}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-cyan-400 text-xs font-mono font-medium mb-3">
                    {edu.field}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                    <MapPin size={13} className="text-slate-500" />
                    <span>{edu.institution} · {edu.location}</span>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="glass-card p-6 sm:p-8 rounded-3xl"
          >
            <h3 className="text-base font-bold text-white tracking-tight mb-4 flex items-center gap-2">
              <Award size={18} className="text-indigo-400" />
              {lang === "pl" ? "Znajomość Języków & Uprawnienia Pracy" : "Language Proficiency & Work Rights"}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {languageList.map((item) => (
                <div
                  key={item.name}
                  className="bg-slate-950/60 border border-white/[0.08] p-4 rounded-2xl text-center"
                >
                  <div className="text-2xl mb-1">{item.flag}</div>
                  <div className="text-sm font-bold text-white">{item.name}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">{item.level}</div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">
                {lang === "pl" ? "Obywatelstwa i Status Prawny:" : "Citizenships & Legal Status:"}
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge variant="indigo">{lang === "pl" ? "🇵🇱 Obywatelstwo Polskie" : "🇵🇱 Polish Citizenship"}</Badge>
                <Badge variant="yellow">{lang === "pl" ? "🇺🇦 Obywatelstwo Ukraińskie" : "🇺🇦 Ukrainian Citizenship"}</Badge>
                <Badge variant="emerald">{lang === "pl" ? "🇪🇺 Pełne Prawa Pracy w UE" : "🇪🇺 Full EU Work Rights"}</Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
