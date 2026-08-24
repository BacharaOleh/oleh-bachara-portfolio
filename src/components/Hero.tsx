"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Mail, MapPin, Send, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STATS, SOCIAL_LINKS, TRANSLATIONS, type Lang, type Stat } from "@/data/portfolio-data";
import { TelegramAuthModal } from "@/components/TelegramAuthModal";
import { TypewriterRoles } from "@/components/ui/typewriter-roles";
import { TiltCard } from "@/components/ui/tilt-card";

interface HeroProps {
  lang: Lang;
}

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

function CountUp({ target, duration = 1800 }: { target: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const numMatch = target.match(/[\d.]+/);
    if (!numMatch) { setDisplay(target); return; }
    const num = parseFloat(numMatch[0]);
    const prefix = target.startsWith("+") ? "+" : "";
    const suffix = target.replace(/[+\d.]/g, "");
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current++;
      const val = Math.min((current / steps) * num, num);
      const formatted = Number.isInteger(num) ? Math.round(val).toString() : val.toFixed(1);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (current >= steps) clearInterval(timer);
    }, stepDuration);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{display}</span>;
}

export function Hero({ lang }: HeroProps) {
  const t = TRANSLATIONS[lang].hero;
  const statsList = STATS[lang];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const socialLinks = [
    { href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
    { href: SOCIAL_LINKS.github, Icon: GithubIcon, label: "GitHub" },
    { href: SOCIAL_LINKS.email, Icon: () => <Mail size={16} />, label: "Email" },
    { href: SOCIAL_LINKS.telegram, Icon: TelegramIcon, label: "Telegram" },
  ];

  return (
    <section
      id="hero"
      className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden min-h-[92vh] flex flex-col justify-center"
    >
      <TelegramAuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          
          {/* Status Badge with Sparkles */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-lg shadow-emerald-500/5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{t.available}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 flex items-center gap-1">
              <ShieldCheck size={13} className="text-emerald-400" />
              Full EU Work Rights
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] text-white"
          >
            {t.headline}{" "}
            <span className="text-gradient-accent block sm:inline">
              {t.headline2}
            </span>
          </motion.h1>

          {/* Dynamic Typewriter Roles Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-2 my-1"
          >
            <Sparkles size={16} className="text-amber-400 animate-pulse" />
            <TypewriterRoles lang={lang} />
          </motion.div>

          {/* Subtitle / Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-xl leading-relaxed max-w-2xl font-normal"
          >
            {t.subtitle}
          </motion.p>

          {/* Credentials Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/60 border border-white/[0.08] px-4 py-2 rounded-xl"
          >
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin size={13} className="text-indigo-400" />
              Jarosław, Poland
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-indigo-300 font-semibold">Magister Zarządzania (2023–2025)</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-300 font-semibold">Inżynier Informatyki (2019–2023)</span>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-2"
          >
            <Button
              size="lg"
              onClick={() => {
                const el = document.querySelector("#projects");
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
              className="group cursor-pointer shadow-lg shadow-indigo-500/20"
            >
              {t.cta_primary}
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 font-mono text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Send size={15} />
              {t.cta_demo}
            </button>

            <a href="/cv-oleh-bachara.pdf" download="cv-oleh-bachara.pdf" className="cursor-pointer">
              <Button size="lg" variant="secondary">
                {t.cta_secondary}
                <Download size={16} />
              </Button>
            </a>
          </motion.div>

          {/* Social Icons Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex items-center gap-2.5 mt-1"
          >
            {socialLinks.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-slate-900/80 border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200"
              >
                <Icon />
              </a>
            ))}
          </motion.div>

          {/* Animated Stats Bar with 3D Tilt Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full max-w-4xl mt-8 pt-8 border-t border-white/[0.08]"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsList.map((stat: Stat) => (
                <TiltCard
                  key={stat.label}
                  className="glass-card p-4 sm:p-5 rounded-2xl text-center relative overflow-hidden group border border-white/[0.08] hover:border-indigo-500/40 shadow-xl"
                  spotlightColor="rgba(99, 102, 241, 0.15)"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-gradient-accent tracking-tight font-mono">
                    <CountUp target={stat.value} />
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-1 font-sans">
                    {stat.label}
                  </div>
                </TiltCard>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
