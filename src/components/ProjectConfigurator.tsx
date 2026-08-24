"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Zap, MessageSquare, Shield, BarChart3,
  Send, ArrowRight, CheckCircle2, Clock, Globe
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SOCIAL_LINKS, type Lang } from "@/data/portfolio-data";

interface ProjectConfiguratorProps {
  lang: Lang;
}

interface Service {
  id: string;
  icon: React.ElementType;
  labelEn: string;
  labelPl: string;
  color: string;
}

const SERVICES: Service[] = [
  { id: "catalog", icon: ShoppingBag, labelEn: "Product Catalog Management", labelPl: "Zarządzanie Katalogiem Produktów", color: "indigo" },
  { id: "pagespeed", icon: Zap, labelEn: "Speed Optimization (90+)", labelPl: "Optymalizacja Prędkości (90+)", color: "emerald" },
  { id: "telegram", icon: MessageSquare, labelEn: "Telegram API / Bot Integration", labelPl: "Integracja Telegram API / Bot", color: "cyan" },
  { id: "migration", icon: Shield, labelEn: "Server & Domain Migration", labelPl: "Migracja Serwerów i Domen", color: "purple" },
  { id: "analytics", icon: BarChart3, labelEn: "GA4 Analytics & SEO", labelPl: "Analityka GA4 & SEO", color: "amber" },
  { id: "fullstack", icon: Globe, labelEn: "Full Web Support & Maintenance", labelPl: "Pełna Opieka i Utrzymanie WWW", color: "rose" },
];

const COLOR_MAP: Record<string, { selected: string; unselected: string }> = {
  indigo: { selected: "bg-indigo-600 text-white border-indigo-400 shadow-indigo-500/20", unselected: "border-white/[0.08] hover:border-indigo-500/30" },
  emerald: { selected: "bg-emerald-600 text-white border-emerald-400 shadow-emerald-500/20", unselected: "border-white/[0.08] hover:border-emerald-500/30" },
  cyan: { selected: "bg-cyan-600 text-white border-cyan-400 shadow-cyan-500/20", unselected: "border-white/[0.08] hover:border-cyan-500/30" },
  purple: { selected: "bg-purple-600 text-white border-purple-400 shadow-purple-500/20", unselected: "border-white/[0.08] hover:border-purple-500/30" },
  amber: { selected: "bg-amber-600 text-white border-amber-400 shadow-amber-500/20", unselected: "border-white/[0.08] hover:border-amber-500/30" },
  rose: { selected: "bg-rose-600 text-white border-rose-400 shadow-rose-500/20", unselected: "border-white/[0.08] hover:border-rose-500/30" },
};

export function ProjectConfigurator({ lang }: ProjectConfiguratorProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [projectStage, setProjectStage] = useState<"existing" | "new">("existing");
  const [timeline, setTimeline] = useState<"urgent" | "month" | "flexible">("month");
  const [showSummary, setShowSummary] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const selectedLabels = selectedServices
    .map((id) => SERVICES.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => lang === "pl" ? s!.labelPl : s!.labelEn);

  const stageLabel = projectStage === "existing"
    ? (lang === "pl" ? "Modernizacja istniejącej strony" : "Existing website overhaul")
    : (lang === "pl" ? "Budowa od zera" : "New build from scratch");

  const timelineLabel = timeline === "urgent"
    ? (lang === "pl" ? "Pilne (1–2 tygodnie)" : "Urgent (1–2 weeks)")
    : timeline === "month"
    ? (lang === "pl" ? "Standardowo (1 miesiąc)" : "Standard (1 month)")
    : (lang === "pl" ? "Elastycznie" : "Flexible");

  const telegramMessage = encodeURIComponent(
    `Dzień dobry! Jestem zainteresowany współpracą.\n\n` +
    `Potrzebne usługi: ${selectedLabels.join(", ") || "Nie wybrano"}\n` +
    `Etap projektu: ${stageLabel}\n` +
    `Harmonogram: ${timelineLabel}\n\n` +
    `Proszę o kontakt!`
  );

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container-custom">
        <SectionHeading
          eyebrow={lang === "pl" ? "Konfigurator Projektu" : "Project Scope Builder"}
          title={lang === "pl" ? "Wybierz Potrzebne" : "Configure Your"}
          highlight={lang === "pl" ? "Usługi w 3 Kliki" : "Project in 3 Clicks"}
          subtitle={
            lang === "pl"
              ? "Zaznacz potrzebne usługi, określ etap projektu i wyślij gotową strukturyzowaną zapytanie bezpośrednio na Telegram lub e-mail."
              : "Select the services you need, define your project stage, and send a pre-structured inquiry directly via Telegram or email."
          }
        />

        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden">
          {/* Step 1: Select Services */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">1</span>
              <span className="text-sm font-bold text-white">
                {lang === "pl" ? "Czego potrzebujesz?" : "What do you need?"}
              </span>
              <span className="text-[10px] font-mono text-slate-500 ml-auto">
                {selectedServices.length} {lang === "pl" ? "wybrano" : "selected"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {SERVICES.map((service) => {
                const Icon = service.icon;
                const isSelected = selectedServices.includes(service.id);
                const colors = COLOR_MAP[service.color];
                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? `${colors.selected} shadow-md`
                        : `bg-slate-950/60 text-slate-300 ${colors.unselected}`
                    }`}
                  >
                    <Icon size={16} className={isSelected ? "" : "text-slate-400"} />
                    <span className="text-[12px] font-semibold leading-tight">
                      {lang === "pl" ? service.labelPl : service.labelEn}
                    </span>
                    {isSelected && <CheckCircle2 size={14} className="ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Project Stage */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">2</span>
              <span className="text-sm font-bold text-white">
                {lang === "pl" ? "Etap projektu?" : "Project stage?"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setProjectStage("existing")}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  projectStage === "existing"
                    ? "bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-500/20"
                    : "bg-slate-950/60 text-slate-300 border-white/[0.08] hover:border-cyan-500/30"
                }`}
              >
                <Globe size={18} className={projectStage === "existing" ? "" : "text-slate-400"} />
                <div className="text-xs font-bold mt-2">{lang === "pl" ? "Modernizacja istniejącej strony" : "Overhaul Existing Site"}</div>
                <div className="text-[10px] mt-0.5 opacity-80">{lang === "pl" ? "Mam działający serwis, potrzebuję zmian" : "I have a running site that needs upgrades"}</div>
              </button>

              <button
                onClick={() => setProjectStage("new")}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  projectStage === "new"
                    ? "bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/20"
                    : "bg-slate-950/60 text-slate-300 border-white/[0.08] hover:border-violet-500/30"
                }`}
              >
                <Zap size={18} className={projectStage === "new" ? "" : "text-slate-400"} />
                <div className="text-xs font-bold mt-2">{lang === "pl" ? "Budowa od zera" : "Build From Scratch"}</div>
                <div className="text-[10px] mt-0.5 opacity-80">{lang === "pl" ? "Potrzebuję nowego serwisu / katalogu" : "I need a new website / catalog"}</div>
              </button>
            </div>
          </div>

          {/* Step 3: Timeline */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">3</span>
              <span className="text-sm font-bold text-white">
                {lang === "pl" ? "Harmonogram?" : "Timeline?"}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {(["urgent", "month", "flexible"] as const).map((t) => {
                const labels = {
                  urgent: { en: "1–2 Weeks", pl: "1–2 Tygodnie", icon: Zap },
                  month: { en: "~1 Month", pl: "~1 Miesiąc", icon: Clock },
                  flexible: { en: "Flexible", pl: "Elastycznie", icon: ArrowRight },
                };
                const l = labels[t];
                const Icon = l.icon;
                return (
                  <button
                    key={t}
                    onClick={() => setTimeline(t)}
                    className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                      timeline === t
                        ? "bg-emerald-600 text-white border-emerald-400 shadow-md"
                        : "bg-slate-950/60 text-slate-300 border-white/[0.08] hover:border-emerald-500/30"
                    }`}
                  >
                    <Icon size={16} className={`mx-auto mb-1.5 ${timeline === t ? "" : "text-slate-400"}`} />
                    <span className="text-xs font-bold">{lang === "pl" ? l.pl : l.en}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Summary & Send Actions */}
          <div className="pt-6 border-t border-white/[0.08]">
            {selectedServices.length > 0 && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 mb-5"
                >
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block mb-2">
                    {lang === "pl" ? "Podsumowanie zapytania:" : "Inquiry Summary:"}
                  </span>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div><strong className="text-white">{lang === "pl" ? "Usługi:" : "Services:"}</strong> {selectedLabels.join(", ")}</div>
                    <div><strong className="text-white">{lang === "pl" ? "Etap:" : "Stage:"}</strong> {stageLabel}</div>
                    <div><strong className="text-white">{lang === "pl" ? "Termin:" : "Timeline:"}</strong> {timelineLabel}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`https://t.me/olegh_bachara?text=${telegramMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Send size={15} />
                {lang === "pl" ? "Wyślij na Telegram" : "Send via Telegram"}
              </a>

              <a
                href={`mailto:olegbachara@gmail.com?subject=${encodeURIComponent("Project Inquiry")}&body=${telegramMessage}`}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 border border-white/[0.12] text-white font-semibold text-sm hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all cursor-pointer"
              >
                <ArrowRight size={15} />
                {lang === "pl" ? "Wyślij na E-mail" : "Send via Email"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
