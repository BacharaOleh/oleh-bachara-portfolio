"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Radio,
  Users,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Server,
} from "lucide-react";
import {
  EXPO_ALIGNMENTS,
  TRANSLATIONS,
  type Lang,
  type ExpoAlignment,
} from "@/data/portfolio-data";
import { trackIntent } from "@/lib/intent-tracker";

interface ExpoFocusNavigatorProps {
  lang: Lang;
  onOpenRecruiterModal?: () => void;
}

const EXPO_ICONS: Record<string, React.ElementType> = {
  "automation-plc": Cpu,
  "embedded-mesh": Radio,
  "wfm-operations": Users,
  "hardware-mobile": Layers,
  "world-of-ai": Cpu,
  "hr-tech": Users,
  "cyber-security": ShieldCheck,
  "data-center": Server,
};

const EXPO_THEMES: Record<
  string,
  {
    borderActive: string;
    badgeBg: string;
    badgeText: string;
    metricText: string;
    accentGlow: string;
    tagBorder: string;
  }
> = {
  "automation-plc": {
    borderActive: "border-amber-500/70",
    badgeBg: "bg-amber-500/10 border-amber-500/30",
    badgeText: "text-amber-300",
    metricText: "text-amber-400",
    accentGlow: "from-amber-500/10 via-transparent to-transparent",
    tagBorder: "border-amber-500/20 text-amber-200",
  },
  "embedded-mesh": {
    borderActive: "border-cyan-500/70",
    badgeBg: "bg-cyan-500/10 border-cyan-500/30",
    badgeText: "text-cyan-300",
    metricText: "text-cyan-400",
    accentGlow: "from-cyan-500/10 via-transparent to-transparent",
    tagBorder: "border-cyan-500/20 text-cyan-200",
  },
  "wfm-operations": {
    borderActive: "border-emerald-500/70",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30",
    badgeText: "text-emerald-300",
    metricText: "text-emerald-400",
    accentGlow: "from-emerald-500/10 via-transparent to-transparent",
    tagBorder: "border-emerald-500/20 text-emerald-200",
  },
  "hardware-mobile": {
    borderActive: "border-purple-500/70",
    badgeBg: "bg-purple-500/10 border-purple-500/30",
    badgeText: "text-purple-300",
    metricText: "text-purple-400",
    accentGlow: "from-purple-500/10 via-transparent to-transparent",
    tagBorder: "border-purple-500/20 text-purple-200",
  },
  "world-of-ai": {
    borderActive: "border-amber-500/70",
    badgeBg: "bg-amber-500/10 border-amber-500/30",
    badgeText: "text-amber-300",
    metricText: "text-amber-400",
    accentGlow: "from-amber-500/10 via-transparent to-transparent",
    tagBorder: "border-amber-500/20 text-amber-200",
  },
  "hr-tech": {
    borderActive: "border-emerald-500/70",
    badgeBg: "bg-emerald-500/10 border-emerald-500/30",
    badgeText: "text-emerald-300",
    metricText: "text-emerald-400",
    accentGlow: "from-emerald-500/10 via-transparent to-transparent",
    tagBorder: "border-emerald-500/20 text-emerald-200",
  },
  "cyber-security": {
    borderActive: "border-cyan-500/70",
    badgeBg: "bg-cyan-500/10 border-cyan-500/30",
    badgeText: "text-cyan-300",
    metricText: "text-cyan-400",
    accentGlow: "from-cyan-500/10 via-transparent to-transparent",
    tagBorder: "border-cyan-500/20 text-cyan-200",
  },
  "data-center": {
    borderActive: "border-purple-500/70",
    badgeBg: "bg-purple-500/10 border-purple-500/30",
    badgeText: "text-purple-300",
    metricText: "text-purple-400",
    accentGlow: "from-purple-500/10 via-transparent to-transparent",
    tagBorder: "border-purple-500/20 text-purple-200",
  },
};

export function ExpoFocusNavigator({
  lang,
  onOpenRecruiterModal,
}: ExpoFocusNavigatorProps) {
  const expos = EXPO_ALIGNMENTS[lang];
  const [activeId, setActiveId] = useState<ExpoAlignment["id"]>("automation-plc");
  const t = TRANSLATIONS[lang].expos;

  const currentExpo = expos.find((e) => e.id === activeId) || expos[0];
  const theme = EXPO_THEMES[currentExpo.id] || EXPO_THEMES["automation-plc"];

  const handleTabClick = (id: ExpoAlignment["id"], name: string) => {
    trackIntent("expo_tab_switched", `Expo Tab: ${name}`, id);
    setActiveId(id);
  };

  return (
    <section
      id="vectors"
      className="scroll-mt-20 py-16 sm:py-28 lg:py-36 border-b editorial-rule relative overflow-hidden w-full max-w-full"
    >
      <span id="expos" className="sr-only" aria-hidden="true" />
      <div className="container-custom">
        {/* Header */}
        <div className="grid gap-6 border-b editorial-rule pb-8 sm:pb-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-[#c4a160] shrink-0" />
              <span>{t.eyebrow}</span>
            </p>
            <h2 className="display-md text-[#eeece5] leading-tight">{t.title}</h2>
          </div>
          <div className="lg:col-span-8 flex flex-col justify-end">
            <p className="editorial-copy max-w-2xl">{t.subtitle}</p>
          </div>
        </div>

        {/* 4 Interactive Expo Tabs */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {expos.map((expo) => {
            const Icon = EXPO_ICONS[expo.id] || Cpu;
            const isActive = expo.id === activeId;
            const itemTheme = EXPO_THEMES[expo.id] || EXPO_THEMES["automation-plc"];

            return (
              <button
                key={expo.id}
                onClick={() => handleTabClick(expo.id, expo.expoName)}
                className={`p-2.5 min-[360px]:p-3 sm:p-5 rounded-xl sm:rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[100px] sm:min-h-[120px] active:scale-[0.98] ${
                  isActive
                    ? `bg-[#181714] ${itemTheme.borderActive} shadow-[0_0_25px_rgba(0,0,0,0.4)]`
                    : "bg-[#141311]/60 border-white/[0.08] hover:border-white/20 hover:bg-[#181714]/80 text-[#a39c91]"
                }`}
              >
                <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-3">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border flex items-center justify-center shrink-0 ${
                      isActive
                        ? `${itemTheme.badgeBg} ${itemTheme.badgeText}`
                        : "bg-white/[0.04] border-white/10 text-[#a39c91]"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <span
                    className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded border shrink-0 ${
                      isActive
                        ? `${itemTheme.badgeBg} ${itemTheme.badgeText}`
                        : "bg-white/[0.03] border-white/5 text-[#777168]"
                    }`}
                  >
                    {expo.badge}
                  </span>
                </div>

                <div>
                  <h3
                    className={`text-xs sm:text-base font-bold tracking-tight leading-snug ${
                      isActive ? "text-[#eeece5]" : "text-[#b9b4aa]"
                    }`}
                  >
                    {expo.expoName}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-mono text-[#a39c91] mt-0.5 sm:mt-1 line-clamp-1">
                    {expo.vector}
                  </p>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="active-expo-indicator"
                    className="absolute inset-x-0 bottom-0 h-1 bg-[#c4a160]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Expo Deep-Dive Content Panel */}
        <div className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-[#161513] border border-white/10 p-4 sm:p-8 lg:p-10 relative overflow-hidden">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${theme.accentGlow} pointer-events-none`}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentExpo.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-12 items-start"
            >
              {/* Left Column: Problem, Solution & Verified Systems */}
              <div className="lg:col-span-8 space-y-5 sm:space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className={`font-mono text-xs px-2.5 py-0.5 rounded-full border ${theme.badgeBg} ${theme.badgeText} font-semibold`}
                    >
                      {currentExpo.expoName}
                    </span>
                    <span className="font-mono text-xs text-[#a39c91]">
                      · {lang === "pl" ? "Zastosowanie Przemysłowe" : "Mission-Critical Application"}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-display font-bold text-[#eeece5] tracking-tight">
                    {currentExpo.vector}
                  </h3>
                </div>

                {/* Mobile Metric Highlight (Visible on < lg screens) */}
                <div className="flex lg:hidden items-center justify-between p-3.5 rounded-xl bg-[#11100e] border border-white/[0.08]">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#a39c91] block">
                      {currentExpo.metricLabel}
                    </span>
                    <div className={`font-display text-2xl sm:text-3xl font-extrabold ${theme.metricText} tracking-tight mt-0.5`}>
                      {currentExpo.metric}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded shrink-0">
                    ✓ Verified Production
                  </span>
                </div>

                {/* Challenge & Solution Grid */}
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <div className="p-3.5 min-[360px]:p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#11100e] border border-white/[0.08] space-y-1.5 sm:space-y-2">
                    <div className="font-mono text-xs uppercase tracking-wider text-rose-400 font-semibold flex items-center gap-1.5">
                      <span>⚠️</span>
                      <span>
                        {lang === "pl"
                          ? "Wyzwanie Przemysłowe:"
                          : "Industry Bottleneck:"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#b9b4aa] leading-relaxed">
                      {currentExpo.challenge}
                    </p>
                  </div>

                  <div className="p-3.5 min-[360px]:p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#11100e] border border-white/[0.08] space-y-1.5 sm:space-y-2">
                    <div className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="shrink-0" />
                      <span>
                        {lang === "pl"
                          ? "Zweryfikowane Rozwiązanie:"
                          : "Engineered Solution:"}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#eeece5] leading-relaxed">
                      {currentExpo.solution}
                    </p>
                  </div>
                </div>

                {/* Proof Systems & Tech Stack */}
                <div className="space-y-3 pt-1 sm:pt-2">
                  <div className="flex items-center gap-2 font-mono text-xs text-[#a39c91] uppercase tracking-wider">
                    <Layers size={13} className="text-[#c4a160] shrink-0" />
                    <span>
                      {lang === "pl"
                        ? "Działające Systemy z Ekosystemu:"
                        : "Active Production Systems in Ecosystem:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {currentExpo.proofSystems.map((sys) => (
                      <span
                        key={sys}
                        className="px-2.5 sm:px-3 py-1 rounded-xl bg-white/[0.04] border border-white/[0.1] text-[11px] sm:text-xs font-mono text-[#eeece5]"
                      >
                        ⚡ {sys}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1 sm:pt-2">
                    {currentExpo.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-0.5 rounded-lg bg-[#11100e] border border-white/[0.06] text-[11px] font-mono text-[#a39c91]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Metric (Desktop) & Action CTAs */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 sm:space-y-6 lg:border-l lg:border-white/[0.1] lg:pl-8">
                <div className="hidden lg:block p-6 rounded-2xl bg-[#11100e] border border-white/[0.08] text-center space-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#a39c91] block">
                    {currentExpo.metricLabel}
                  </span>
                  <div
                    className={`font-display text-4xl sm:text-5xl font-extrabold ${theme.metricText} tracking-tight`}
                  >
                    {currentExpo.metric}
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 block pt-1">
                    ✓ Verified Production Standard
                  </span>
                </div>

                <div className="space-y-2.5 w-full">
                  <Link
                    href={`/projects/${currentExpo.ctaTargetId}`}
                    onClick={() =>
                      trackIntent(
                        "expo_cta_clicked",
                        `Explore Case: ${currentExpo.ctaTargetId}`,
                        currentExpo.id
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 min-h-[46px] py-3 px-4 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold text-sm transition-all cursor-pointer shadow-lg hover:shadow-[#c4a160]/20"
                  >
                    <span>{currentExpo.ctaText}</span>
                    <ArrowRight size={16} />
                  </Link>

                  {onOpenRecruiterModal && (
                    <button
                      onClick={() => {
                        trackIntent(
                          "recruiter_modal_open",
                          `⚡ Executive Brief (Expo: ${currentExpo.id})`
                        );
                        onOpenRecruiterModal();
                      }}
                      className="w-full flex items-center justify-center gap-1.5 min-h-[44px] py-2.5 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-[#eeece5] font-mono text-xs font-semibold border border-white/[0.1] transition-colors cursor-pointer"
                    >
                      <Sparkles size={13} className="text-[#c4a160]" />
                      <span>
                        {lang === "pl"
                          ? "Pobierz 1-Stronicowy Raport ATS"
                          : "Download 1-Page ATS Dossier"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
