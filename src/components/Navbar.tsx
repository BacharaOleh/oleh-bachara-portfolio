"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Zap, Code2, BarChart3 } from "lucide-react";
import { TRANSLATIONS, type Lang, type Perspective } from "@/data/portfolio-data";
import { cn } from "@/lib/utils";
import { RecruiterModal } from "@/components/RecruiterModal";

const NAV_ITEMS = [
  { label: "impact", href: "#impact" },
  { label: "projects", href: "#projects" },
  { label: "demos", href: "#demos" },
  { label: "skills", href: "#skills" },
  { label: "education", href: "#education" },
  { label: "contact", href: "#contact" },
];

interface NavbarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  perspective: Perspective;
  setPerspective: (p: Perspective) => void;
}

export function Navbar({ lang, setLang, perspective, setPerspective }: NavbarProps) {
  const t = TRANSLATIONS[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);

  // Top Page Reading Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -50% 0px" }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.slice(1));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const isEngineer = perspective === "engineer";

  return (
    <>
      {/* Recruiter Summary Modal */}
      <RecruiterModal
        isOpen={recruiterModalOpen}
        onClose={() => setRecruiterModalOpen(false)}
        lang={lang}
      />

      {/* Top Page Scroll Reading Progress Bar Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 z-50 origin-left shadow-sm shadow-cyan-500/50"
        style={{ scaleX }}
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full",
          scrolled
            ? "bg-[#080c14]/90 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-lg shadow-black/20"
            : "bg-transparent py-5"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#hero")}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-extrabold text-sm tracking-tighter">OB</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base tracking-tight leading-none">
                  Oleh Bachara
                </span>
                <span className="text-[11px] font-mono text-indigo-400 leading-tight mt-0.5">
                  Systems & Web Tech
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={cn(
                      "relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer",
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                    )}
                  >
                    {t[item.label as keyof typeof t]}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavTab"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/80 to-cyan-600/80 -z-10 shadow-sm shadow-indigo-500/30"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2.5">
              {/* ⚡ Perspective Switcher — Dual Mind Toggle */}
              <div className="hidden sm:flex items-center bg-slate-900/80 rounded-full p-1 border border-white/[0.08] backdrop-blur-md">
                <button
                  onClick={() => setPerspective("engineer")}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold transition-all duration-300 cursor-pointer",
                    isEngineer
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  <Code2 size={12} />
                  <span className="hidden lg:inline">Engineer</span>
                  {isEngineer && (
                    <motion.div
                      layoutId="perspectivePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-600 -z-10 shadow-md shadow-indigo-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => setPerspective("business")}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold transition-all duration-300 cursor-pointer",
                    !isEngineer
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  <BarChart3 size={12} />
                  <span className="hidden lg:inline">Business</span>
                  {!isEngineer && (
                    <motion.div
                      layoutId="perspectivePill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-amber-500 -z-10 shadow-md shadow-violet-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              </div>

              {/* Recruiter Quick View Button */}
              <button
                type="button"
                aria-label="Open Recruiter 1-Minute Executive Summary modal"
                onClick={() => setRecruiterModalOpen(true)}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Zap size={13} className="text-indigo-400 animate-pulse" />
                {lang === "pl" ? "Dla Rekrutera" : "Recruiter 1-Min"}
              </button>

              {/* Language switcher */}
              <div className="flex items-center bg-slate-900/80 rounded-lg p-0.5 border border-white/[0.08]" role="group" aria-label="Language selection">
                {(["en", "pl"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    aria-label={`Switch language to ${l === "pl" ? "Polish" : "English"}`}
                    onClick={() => setLang(l)}
                    className={cn(
                      "px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold uppercase transition-all duration-200 cursor-pointer",
                      lang === l
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
                aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#080c14]/95 border-b border-white/[0.08] backdrop-blur-xl px-6 py-6 md:hidden shadow-2xl space-y-3"
          >
            {/* Mobile Perspective Switcher */}
            <div className="flex items-center bg-slate-900/80 rounded-full p-1 border border-white/[0.08] mb-3">
              <button
                onClick={() => setPerspective("engineer")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 cursor-pointer",
                  isEngineer
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md"
                    : "text-slate-400"
                )}
              >
                <Code2 size={13} />
                Engineer
              </button>
              <button
                onClick={() => setPerspective("business")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 cursor-pointer",
                  !isEngineer
                    ? "bg-gradient-to-r from-violet-600 to-amber-500 text-white shadow-md"
                    : "text-slate-400"
                )}
              >
                <BarChart3 size={13} />
                Business
              </button>
            </div>

            <button
              onClick={() => {
                setMobileOpen(false);
                setRecruiterModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold flex items-center justify-center gap-2"
            >
              <Zap size={14} className="text-indigo-400" />
              {lang === "pl" ? "Podsumowanie dla Rekruterów (1 Minut)" : "Recruiter 1-Minute Executive Summary"}
            </button>

            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] font-medium text-sm transition-all"
                >
                  {t[item.label as keyof typeof t]}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
