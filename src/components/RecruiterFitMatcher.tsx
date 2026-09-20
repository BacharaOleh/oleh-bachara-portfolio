"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Square, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import type { Lang } from "@/data/portfolio-data";

interface RecruiterFitMatcherProps {
  lang: Lang;
  onOpenRecruiterModal: () => void;
}

interface Requirement {
  id: string;
  label: string;
  proof: string;
  metric: string;
}

const REQUIREMENTS: Record<Lang, Requirement[]> = {
  en: [
    {
      id: "php-wp",
      label: "WordPress & Custom PHP Architecture",
      proof: "Developed custom PHP themes and Gutenberg blocks with optimized SQL queries across 8+ corporate platforms.",
      metric: "8+ Platforms",
    },
    {
      id: "seo-growth",
      label: "Technical SEO & Schema.org",
      proof: "Structured data, GSC indexing, and GA4 funnel tracking that drove +40% organic traffic growth on flagship sites.",
      metric: "+40% Organic",
    },
    {
      id: "performance",
      label: "Core Web Vitals & PageSpeed 90+",
      proof: "Resolved mobile bottlenecks and heavy payloads, boosting PageSpeed scores from ~45 to 90+.",
      metric: "90+ PageSpeed",
    },
    {
      id: "catalogues",
      label: "Product Catalogues & Multi-Market UX",
      proof: "Maintained corporate catalogues serving PL, UA, and EU markets with responsive B2B/B2C layouts.",
      metric: "PL / UA / EU",
    },
    {
      id: "modern-web",
      label: "Modern Web (Next.js / React / TypeScript)",
      proof: "Engineering clean, component-driven interfaces with strict typing and modern CSS architectures.",
      metric: "Next.js & TS",
    },
    {
      id: "apis-webhooks",
      label: "REST APIs & Webhook Integrations",
      proof: "Implemented Telegram Bot API webhooks, HMAC-SHA256 signature verification, and automated database sync.",
      metric: "HMAC Security",
    },
  ],
  pl: [
    {
      id: "php-wp",
      label: "Architektura WordPress & Autorski PHP",
      proof: "Tworzenie autorskich motywów PHP i bloków Gutenberg ze zoptymalizowanymi zapytaniami SQL dla ponad 8 platform.",
      metric: "8+ Platform",
    },
    {
      id: "seo-growth",
      label: "Techniczne SEO & Schema.org",
      proof: "Dane strukturalne, indeksowanie GSC i analityka GA4, które przyniosły +40% wzrostu ruchu organicznego.",
      metric: "+40% Organiki",
    },
    {
      id: "performance",
      label: "Core Web Vitals & PageSpeed 90+",
      proof: "Eliminacja problemów wydajności mobilnej i redukcja wagi stron — wzrost wyniku PageSpeed z ok. 45 do 90+.",
      metric: "90+ PageSpeed",
    },
    {
      id: "catalogues",
      label: "Katalogi Produktów & Rynki Międzynarodowe",
      proof: "Prowadzenie katalogów produktów dla rynków PL, UA i UE zoptymalizowanych pod kątem B2B i B2C.",
      metric: "PL / UA / UE",
    },
    {
      id: "modern-web",
      label: "Nowoczesny Web (Next.js / React / TypeScript)",
      proof: "Tworzenie czystych interfejsów komponentowych ze ścisłym typowaniem i nowoczesnym CSS.",
      metric: "Next.js & TS",
    },
    {
      id: "apis-webhooks",
      label: "REST API & Integracje Webhooków",
      proof: "Implementacja webhooków Telegram Bot API, weryfikacja podpisów HMAC-SHA256 i synchronizacja baz.",
      metric: "Podpis HMAC",
    },
  ],
};

const COPY = {
  en: {
    eyebrow: "Interactive Recruiter Tool",
    title: "Does Oleh Fit Your Open Vacancy?",
    subtitle: "Select the requirements of your job description to calculate candidate match and view verified production evidence.",
    allMatch: "100% Match! Ideal candidate for your technical requirements.",
    highMatch: "High Match! Strong commercial fit for your tech stack.",
    baseMatch: "Select your vacancy requirements above to see how Oleh matches them.",
    cta: "View Full Recruiter Summary",
    evidenceTitle: "Verified Commercial Evidence",
    selectPrompt: "Click requirements to test fit:",
  },
  pl: {
    eyebrow: "Narzędzie dla Rekruterów",
    title: "Czy Oleh Pasuje do Twojej Vacancy?",
    subtitle: "Zaznacz wymagania ze swojego ogłoszenia, aby obliczyć dopasowanie kandydata i zobaczyć zweryfikowane dowody.",
    allMatch: "100% Dopasowania! Idealny profil do Twoich wymagań technicznych.",
    highMatch: "Wysokie Dopasowanie! Silne dopasowanie komercyjne do Twojego stosu.",
    baseMatch: "Zaznacz wymagania powyżej, aby sprawdzić dopasowanie kandydata.",
    cta: "Zobacz Podsumowanie Rekrutera",
    evidenceTitle: "Zweryfikowane Doświadczenie",
    selectPrompt: "Kliknij wymagania stanowiska:",
  },
} as const;

export function RecruiterFitMatcher({ lang, onOpenRecruiterModal }: RecruiterFitMatcherProps) {
  const t = COPY[lang];
  const items = REQUIREMENTS[lang];

  // Default select first 3 items
  const [selectedIds, setSelectedIds] = useState<string[]>([items[0].id, items[1].id, items[2].id]);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedItems = items.filter((item) => selectedIds.includes(item.id));
  const matchPercentage =
    items.length > 0
      ? Math.round((selectedIds.length / items.length) * 100)
      : 0;

  return (
    <section id="fit-matcher" className="py-20 md:py-32 border-b editorial-rule scroll-mt-20">
      <div className="container-custom">
        <div className="grid gap-6 border-b editorial-rule pb-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="kicker mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-[#c4a160]" />
              {t.eyebrow}
            </p>
            <h2 className="display-md text-[#eeece5] leading-tight">{t.title}</h2>
          </div>
          <div className="lg:col-span-8 flex flex-col justify-end">
            <p className="editorial-copy max-w-2xl">{t.subtitle}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 items-start">
          {/* Checkboxes List */}
          <div className="lg:col-span-6 space-y-2.5">
            <p className="font-mono text-xs uppercase tracking-widest text-[#a39c91] mb-4">
              {t.selectPrompt}
            </p>
            {items.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#181714] border-[#c4a160]/60 text-[#eeece5] shadow-[0_0_15px_rgba(196,161,96,0.08)]"
                      : "bg-[#11100e]/40 border-white/[0.08] text-[#a39c91] hover:border-white/20 hover:text-[#eeece5]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isSelected ? (
                      <CheckSquare size={18} className="text-[#c4a160] shrink-0" />
                    ) : (
                      <Square size={18} className="text-white/20 shrink-0" />
                    )}
                    <span className="text-sm font-medium tracking-tight">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#c4a160] px-2 py-0.5 rounded bg-[#c4a160]/10 border border-[#c4a160]/20 shrink-0 hidden sm:inline">
                    {item.metric}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Match Score & Proof Card */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#181714] border border-[#c4a160]/30 relative overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b editorial-rule pb-6 mb-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#a39c91] block">
                    Calculated Job Match
                  </span>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#eeece5] tracking-tight">
                    {selectedIds.length === 0 ? "0%" : `${Math.max(matchPercentage, 75)}%`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <ShieldCheck size={14} />
                    Verified Experience
                  </span>
                </div>
              </div>

              <p className="text-sm text-[#c4a160] font-medium mb-6">
                {selectedIds.length === items.length
                  ? t.allMatch
                  : selectedIds.length > 0
                  ? t.highMatch
                  : t.baseMatch}
              </p>

              {/* Verified Proofs for Selected Items */}
              <div className="space-y-3 mb-8">
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#a39c91]">
                  {t.evidenceTitle}:
                </p>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  <AnimatePresence>
                    {selectedItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="p-3 rounded-lg bg-[#11100e] border border-white/[0.08] text-xs leading-relaxed"
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-medium text-[#eeece5]">{item.label}</span>
                          <span className="font-mono text-[10px] text-[#c4a160]">{item.metric}</span>
                        </div>
                        <p className="text-[#a39c91] text-[11px]">{item.proof}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={onOpenRecruiterModal}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold text-sm transition-all cursor-pointer shadow-lg hover:shadow-[#c4a160]/20 active:scale-[0.98]"
              >
                <span>{t.cta}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
