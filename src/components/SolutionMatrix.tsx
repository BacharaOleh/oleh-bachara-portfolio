"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Zap, MessageSquare, Shield, BarChart3,
  ArrowRight, RefreshCw, Globe, Lock, Send, CheckCircle2,
  TrendingUp, Mail, MousePointerClick, Users
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { CatalogPreviewCard } from "@/components/ui/catalog-preview-card";
import { TelegramAuthModal } from "@/components/TelegramAuthModal";
import { type Lang } from "@/data/portfolio-data";

/* ─── Solution Content ─────────────────────────────────────── */
interface Solution {
  id: string;
  icon: React.ElementType;
  accentClass: string;
  iconBg: string;
  glowColor: string;
  number: string;
  titleEn: string;
  titlePl: string;
  problemEn: string;
  problemPl: string;
  solutionEn: string[];
  solutionPl: string[];
  proofLabelEn: string;
  proofLabelPl: string;
  resultBadgeEn: string;
  resultBadgePl: string;
}

const SOLUTIONS: Solution[] = [
  {
    id: "catalog",
    icon: ShoppingBag,
    accentClass: "indigo",
    iconBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
    glowColor: "rgba(99, 102, 241, 0.08)",
    number: "01",
    titleEn: "Brand Product Catalog & Showcase Engine",
    titlePl: "Katalog Produktów Marki & Silnik Prezentacji",
    problemEn: "Your product catalog is cluttered, slow to update, and invisible to Google. Mobile layout is broken, and adding new products takes hours instead of minutes.",
    problemPl: "Katalog produktów jest chaotyczny, wolno się aktualizuje i niewidoczny w Google. Layout mobilny jest zepsuty, a dodanie nowego produktu zajmuje godziny zamiast minut.",
    solutionEn: [
      "Custom WordPress/PHP catalog architecture with intuitive admin panel",
      "Automated WebP image pipeline & Retina-ready responsive thumbnails",
      "Product filtering with custom taxonomies, sizes, and color swatches",
      "Schema.org Product structured data for Google Rich Snippets",
    ],
    solutionPl: [
      "Autorska architektura katalogu WordPress/PHP z intuicyjnym panelem administracyjnym",
      "Automatyczny pipeline obrazów WebP & responsywne miniatury Retina-ready",
      "Filtrowanie produktów z własnymi taksonomiami, rozmiarami i próbkami kolorów",
      "Mikrodane Schema.org Product dla Google Rich Snippets",
    ],
    proofLabelEn: "Interactive Product Card Demo",
    proofLabelPl: "Interaktywna Karta Produktu Demo",
    resultBadgeEn: "8+ Corporate Catalogs Managed",
    resultBadgePl: "8+ Katalogów Korporacyjnych",
  },
  {
    id: "pagespeed",
    icon: Zap,
    accentClass: "emerald",
    iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    glowColor: "rgba(16, 185, 129, 0.08)",
    number: "02",
    titleEn: "PageSpeed 90+ & Core Web Vitals Optimizer",
    titlePl: "PageSpeed 90+ & Optymalizacja Core Web Vitals",
    problemEn: "Your website loads in 4–5+ seconds, Lighthouse scores are stuck at 30–45, mobile visitors bounce immediately, and Google rankings are dropping fast.",
    problemPl: "Twoja strona ładuje się 4–5+ sekund, wynik Lighthouse utknął na 30–45, odwiedzający z mobile'a natychmiast wychodzą, a pozycje w Google spadają.",
    solutionEn: [
      "Full-stack speed audit: asset compression, deferred JS, critical CSS inlining",
      "Server-level Nginx tuning, HTTP/2 multiplexing, and PHP OPcache optimization",
      "Database query caching & MariaDB index tuning (420ms → 48ms)",
      "WebP auto-conversion, lazy loading, and CDN edge caching via Cloudflare",
    ],
    solutionPl: [
      "Pełny audyt prędkości: kompresja zasobów, odłożony JS, inline critical CSS",
      "Tuning Nginx na poziomie serwera, HTTP/2 multiplexing i optymalizacja PHP OPcache",
      "Cache zapytań do bazy danych & tuning indeksów MariaDB (420ms → 48ms)",
      "Auto-konwersja WebP, lazy loading i cache na edge CDN przez Cloudflare",
    ],
    proofLabelEn: "Drag the Slider — Before vs After",
    proofLabelPl: "Przeciągnij Suwak — Przed vs Po",
    resultBadgeEn: "45 → 96 Lighthouse Score",
    resultBadgePl: "45 → 96 Wynik Lighthouse",
  },
  {
    id: "telegram",
    icon: MessageSquare,
    accentClass: "cyan",
    iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
    glowColor: "rgba(56, 189, 248, 0.08)",
    number: "03",
    titleEn: "Telegram Auth, Bots & Webhook Bridges",
    titlePl: "Autoryzacja Telegram, Boty & Mosty Webhook",
    problemEn: "Complex registration forms drive users away. You need 1-click login via Telegram, instant order notifications in your team chat, and real-time data sync between your website and Telegram bots.",
    problemPl: "Skomplikowane formularze rejestracji odstraszają użytkowników. Potrzebujesz logowania 1 klikiem przez Telegram, natychmiastowych powiadomień o zamówieniach i synchronizacji danych w czasie rzeczywistym.",
    solutionEn: [
      "Telegram OpenID Connect / OAuth 2.0 passwordless login integration",
      "Server-side HMAC-SHA256 cryptographic signature verification",
      "Real-time webhook bridge: website events → Telegram bot notifications",
      "Bidirectional REST API data synchronization pipeline",
    ],
    solutionPl: [
      "Integracja bezhasłowego logowania Telegram OpenID Connect / OAuth 2.0",
      "Serwerowa weryfikacja kryptograficzna podpisu HMAC-SHA256",
      "Most webhook w czasie rzeczywistym: zdarzenia na stronie → powiadomienia bota Telegram",
      "Dwukierunkowa synchronizacja danych przez pipeline REST API",
    ],
    proofLabelEn: "Test Real Telegram Login",
    proofLabelPl: "Przetestuj Logowanie Telegram",
    resultBadgeEn: "<200ms Auth Latency · 99.9% Uptime",
    resultBadgePl: "<200ms Opóźnienie Auth · 99.9% Uptime",
  },
  {
    id: "migration",
    icon: Shield,
    accentClass: "purple",
    iconBg: "bg-purple-500/10 text-purple-400 border-purple-500/25",
    glowColor: "rgba(168, 85, 247, 0.08)",
    number: "04",
    titleEn: "Zero-Downtime Server & Domain Migrations",
    titlePl: "Migracje Serwerów i Domen Bez Przestoju",
    problemEn: "You're afraid of losing customer data, breaking email deliverability, and experiencing hours of downtime during a server or hosting switch.",
    problemPl: "Boisz się utraty danych klientów, zepsucia dostarczalności maili i godzin przestoju podczas zmiany serwera lub hostingu.",
    solutionEn: [
      "Blue-green migration protocol with rsync delta file synchronization",
      "Cloudflare DNS instant cutover with TTL optimization (0% downtime)",
      "MariaDB/MySQL database replication and integrity verification",
      "Automated SSL certificate rotation and email MX/SPF/DKIM migration",
    ],
    solutionPl: [
      "Protokół migracji blue-green z synchronizacją plików rsync delta",
      "Natychmiastowe przełączenie DNS Cloudflare z optymalizacją TTL (0% przestoju)",
      "Replikacja bazy MariaDB/MySQL i weryfikacja integralności danych",
      "Automatyczna rotacja certyfikatów SSL i migracja rekordów MX/SPF/DKIM",
    ],
    proofLabelEn: "Live Server Health Monitor",
    proofLabelPl: "Monitor Zdrowia Serwerów Live",
    resultBadgeEn: "0% Downtime · 8+ Domains Migrated",
    resultBadgePl: "0% Przestoju · 8+ Domen Zmigrowanych",
  },
  {
    id: "analytics",
    icon: BarChart3,
    accentClass: "amber",
    iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    glowColor: "rgba(245, 158, 11, 0.08)",
    number: "05",
    titleEn: "GA4 Analytics, Technical SEO & Email Growth",
    titlePl: "Analityka GA4, SEO Techniczne & Wzrost Mailingowy",
    problemEn: "You're spending on marketing but can't tell which channels drive revenue. Email campaigns get ignored, product pages aren't indexed, and you have zero conversion tracking.",
    problemPl: "Wydajesz na marketing, ale nie wiesz, które kanały przynoszą dochód. Kampanie mailowe są ignorowane, strony produktów nie są zaindeksowane, a śledzenie konwersji nie istnieje.",
    solutionEn: [
      "Custom GA4 dataLayer events: form submissions, clicks, scroll depth, purchases",
      "Technical SEO audit: Core Web Vitals, sitemap optimization, GSC indexing pipeline",
      "High-converting email automation with 30–36% CTR (Mailchimp / SARE)",
      "A/B tested CTAs and conversion funnel architecture with measurable ROI",
    ],
    solutionPl: [
      "Własne zdarzenia dataLayer GA4: formularze, kliknięcia, głębokość scrollowania, zakupy",
      "Audyt SEO technicznego: Core Web Vitals, optymalizacja sitemap, pipeline indeksowania GSC",
      "Automatyzacja e-mail o wysokim CTR 30–36% (Mailchimp / SARE)",
      "Testy A/B przycisków CTA i architektura lejka konwersji z mierzalnym ROI",
    ],
    proofLabelEn: "Interactive Growth Funnel",
    proofLabelPl: "Interaktywna Lejka Wzrostu",
    resultBadgeEn: "+40% Organic Traffic · 36% Email CTR",
    resultBadgePl: "+40% Ruchu Organicznego · 36% CTR Mailingu",
  },
];

/* ─── Ping Monitor Sub-Component ───────────────────────────── */
function ServerPingMonitor() {
  interface PingSite { domain: string; ping: string; latencyMs: number; status: string; ssl: string; }
  const [sites, setSites] = useState<PingSite[]>([
    { domain: "reh4mat.com", ping: "14ms", latencyMs: 14, status: "200 OK", ssl: "TLS 1.3" },
    { domain: "reh4mat.pl", ping: "18ms", latencyMs: 18, status: "200 OK", ssl: "TLS 1.3" },
    { domain: "api.github.com", ping: "22ms", latencyMs: 22, status: "200 OK", ssl: "TLS 1.3" },
  ]);
  const [isPinging, setIsPinging] = useState(false);

  const fetchPing = async () => {
    setIsPinging(true);
    try {
      const res = await fetch("/api/ping");
      const data = await res.json();
      if (data.success && Array.isArray(data.results)) {
        setSites(data.results.slice(0, 3));
      }
    } catch { /* fallback */ }
    finally { setIsPinging(false); }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Live Monitoring</span>
        </div>
        <button
          onClick={fetchPing}
          disabled={isPinging}
          className="text-[10px] font-mono text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer disabled:opacity-50"
        >
          <RefreshCw size={10} className={isPinging ? "animate-spin" : ""} />
          Re-ping
        </button>
      </div>
      {sites.map((site) => (
        <div key={site.domain} className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono font-bold text-white flex items-center gap-1.5">
              <Globe size={11} className="text-purple-400" />
              {site.domain}
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{site.status}</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
            <span>Latency: <span className="text-cyan-400 font-bold">{site.ping}</span></span>
            <span>SSL: <span className="text-slate-300">{site.ssl}</span></span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Funnel Visualizer Sub-Component ──────────────────────── */
function FunnelVisualizer({ lang }: { lang: Lang }) {
  const steps = [
    { icon: TrendingUp, label: lang === "pl" ? "Ruch Organiczny" : "Organic Traffic", value: "+40%", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/25", barWidth: "w-full" },
    { icon: Mail, label: lang === "pl" ? "Otwarcia Mailingu" : "Email Open Rate", value: "52%", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/25", barWidth: "w-[78%]" },
    { icon: MousePointerClick, label: lang === "pl" ? "CTR Kliknięć" : "Click-Through Rate", value: "34%", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/25", barWidth: "w-[55%]" },
    { icon: Users, label: lang === "pl" ? "Nowe Zapytania" : "New Inquiries", value: "+25%", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/25", barWidth: "w-[35%]" },
  ];

  return (
    <div className="space-y-3">
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-1.5">
              <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${step.bg} ${step.color} shrink-0`}>
                <Icon size={13} />
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-300">{step.label}</span>
                <span className={`text-sm font-extrabold font-mono ${step.color}`}>{step.value}</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden ml-10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className={`h-full rounded-full bg-gradient-to-r ${
                  i === 0 ? "from-emerald-500 to-emerald-400" :
                  i === 1 ? "from-cyan-500 to-cyan-400" :
                  i === 2 ? "from-indigo-500 to-indigo-400" :
                  "from-amber-500 to-amber-400"
                } ${step.barWidth}`}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Main Solution Matrix Component ───────────────────────── */
interface SolutionMatrixProps {
  lang: Lang;
}

export function SolutionMatrix({ lang }: SolutionMatrixProps) {
  const [telegramModalOpen, setTelegramModalOpen] = useState(false);

  const scrollToContact = (preselect?: string) => {
    const el = document.getElementById("contact");
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section id="solutions" className="py-20 md:py-28 relative">
      <TelegramAuthModal isOpen={telegramModalOpen} onClose={() => setTelegramModalOpen(false)} />

      <div className="container-custom">
        <SectionHeading
          eyebrow={lang === "pl" ? "Gotowe Rozwiązania" : "Ready-Made Solutions"}
          title={lang === "pl" ? "Twój Problem →" : "Your Problem →"}
          highlight={lang === "pl" ? "Moje Rozwiązanie" : "My Solution"}
          subtitle={
            lang === "pl"
              ? "Każda karta rozwiązuje konkretny problem biznesowy z interaktywnym dowodem działania. Wybierz swoją potrzebę."
              : "Each card solves a specific business problem with a live interactive proof. Pick your need."
          }
        />

        <div className="space-y-6">
          {SOLUTIONS.map((sol, index) => {
            const Icon = sol.icon;
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                <SpotlightCard
                  className="glass-card rounded-3xl overflow-hidden"
                  spotlightColor={sol.glowColor}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${isReversed ? "lg:[direction:rtl]" : ""}`}>
                    {/* ── LEFT: Problem & Solution ────────────── */}
                    <div className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${isReversed ? "lg:[direction:ltr]" : ""}`}>
                      {/* Top Header */}
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${sol.iconBg}`}>
                              <Icon size={20} />
                            </div>
                            <span className="text-[11px] font-mono text-slate-500 font-bold">{sol.number}</span>
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 border border-white/[0.08] text-emerald-400 font-bold">
                            {lang === "pl" ? sol.resultBadgePl : sol.resultBadgeEn}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 leading-snug">
                          {lang === "pl" ? sol.titlePl : sol.titleEn}
                        </h3>

                        {/* Problem Statement */}
                        <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/15 mb-5">
                          <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider block mb-1.5">
                            {lang === "pl" ? "Problem:" : "The Problem:"}
                          </span>
                          <p className="text-sm text-slate-300 leading-relaxed">
                            {lang === "pl" ? sol.problemPl : sol.problemEn}
                          </p>
                        </div>

                        {/* Solution Steps */}
                        <div className="space-y-2.5 mb-6">
                          {(lang === "pl" ? sol.solutionPl : sol.solutionEn).map((step, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span className="text-sm text-slate-300 leading-relaxed">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom CTA */}
                      <button
                        onClick={() => scrollToContact(sol.id)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 border border-white/[0.12] text-white text-sm font-semibold hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all cursor-pointer group"
                      >
                        {lang === "pl" ? "Omówić tę potrzebę" : "Discuss This Need"}
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* ── RIGHT: Interactive Proof Demo ───────── */}
                    <div className={`bg-slate-950/50 border-t lg:border-t-0 ${isReversed ? "lg:border-r lg:[direction:ltr]" : "lg:border-l"} border-white/[0.06] p-5 sm:p-6 flex flex-col`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                          {lang === "pl" ? "Interaktywny Dowód" : "Interactive Proof"}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                          LIVE DEMO
                        </span>
                      </div>

                      <span className="text-xs font-semibold text-slate-300 mb-3 block">
                        {lang === "pl" ? sol.proofLabelPl : sol.proofLabelEn}
                      </span>

                      {/* Dynamic Interactive Proof Content */}
                      <div className="flex-1">
                        {sol.id === "catalog" && (
                          <CatalogPreviewCard className="border border-white/[0.06] bg-slate-950/60" />
                        )}

                        {sol.id === "pagespeed" && (
                          <BeforeAfterSlider className="border border-white/[0.06]" />
                        )}

                        {sol.id === "telegram" && (
                          <div className="space-y-4">
                            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-slate-950 to-indigo-500/10 border border-cyan-500/25">
                              <div className="flex items-center gap-2 mb-3">
                                <Lock size={14} className="text-cyan-400" />
                                <span className="text-xs font-bold text-white">Telegram OAuth 2.0 / OpenID Connect</span>
                              </div>
                              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                                {lang === "pl"
                                  ? "Kliknij przycisk poniżej, aby przetestować prawdziwy proces logowania Telegram na żywo — bez hasła, w 1 klik."
                                  : "Click the button below to test the real Telegram login flow live — passwordless, 1-click authentication."}
                              </p>
                              <button
                                onClick={() => setTelegramModalOpen(true)}
                                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                              >
                                <Send size={14} />
                                {lang === "pl" ? "Testuj Autoryzację Telegram Live" : "Test Live Telegram Auth"}
                              </button>
                            </div>
                            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] text-[10px] font-mono text-slate-400 space-y-1">
                              <div className="flex justify-between"><span>Protocol:</span><span className="text-cyan-300">OpenID Connect (OIDC)</span></div>
                              <div className="flex justify-between"><span>Signature:</span><span className="text-emerald-300">HMAC-SHA256 Verified</span></div>
                              <div className="flex justify-between"><span>Session:</span><span className="text-slate-300">Stateless JWT Token</span></div>
                            </div>
                          </div>
                        )}

                        {sol.id === "migration" && (
                          <ServerPingMonitor />
                        )}

                        {sol.id === "analytics" && (
                          <FunnelVisualizer lang={lang} />
                        )}
                      </div>
                    </div>
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
