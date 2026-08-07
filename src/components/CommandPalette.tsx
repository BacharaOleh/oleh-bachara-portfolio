"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Mail, Phone, Download, User, Code2, BookOpen,
  Zap, Activity, MessageSquare, Globe, ExternalLink, ChevronRight
} from "lucide-react";
import type { Lang } from "@/data/portfolio-data";
import { SOCIAL_LINKS } from "@/data/portfolio-data";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  lang: Lang;
  onOpenRecruiter: () => void;
  onOpenTelegram: () => void;
}

export function CommandPalette({ lang, onOpenRecruiter, onOpenTelegram }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPl = lang === "pl";

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 150);
  };

  const COMMANDS: CommandItem[] = [
    {
      id: "recruiter-brief",
      label: isPl ? "Otwórz Brief dla Rekrutera" : "Open Recruiter 1-Min Brief",
      description: isPl ? "+40% Ruchu, 8 Stron Korporacyjnych, EU Work Rights" : "+40% Traffic, 8 Corporate Sites, Full EU Work Rights",
      icon: Zap,
      accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      action: () => { setIsOpen(false); onOpenRecruiter(); },
      category: isPl ? "Akcje" : "Actions",
    },
    {
      id: "telegram-auth",
      label: isPl ? "Demo Telegram OAuth Live" : "Test Live Telegram OAuth",
      description: "HMAC SHA-256 Server Route Integration",
      icon: MessageSquare,
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      action: () => { setIsOpen(false); onOpenTelegram(); },
      category: isPl ? "Akcje" : "Actions",
    },
    {
      id: "nav-impact",
      label: isPl ? "Wyniki — Metryki Wydajności" : "Impact — Performance Metrics",
      description: isPl ? "Udowodnione wyniki i metryki" : "Proven achievements across 4.5+ years",
      icon: Activity,
      accent: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      action: () => scrollToSection("impact"),
      category: isPl ? "Nawigacja" : "Navigate",
    },
    {
      id: "nav-projects",
      label: isPl ? "Projekty — Studia Przypadków" : "Projects — Case Studies",
      description: isPl ? "Reh4mat, Infrastruktura, Telegram API" : "Reh4mat, Infrastructure, Telegram API Bridge",
      icon: Code2,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      action: () => scrollToSection("projects"),
      category: isPl ? "Nawigacja" : "Navigate",
    },
    {
      id: "nav-demos",
      label: isPl ? "Demo — Laboratorium Live" : "Live Demos — Interactive Lab",
      description: isPl ? "Symulacje Telegram API, prędkości i serwerów" : "Telegram Auth, Speed Engine, Server Health Monitor",
      icon: Zap,
      accent: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      action: () => scrollToSection("demos"),
      category: isPl ? "Nawigacja" : "Navigate",
    },
    {
      id: "nav-skills",
      label: isPl ? "Umiejętności — Stos Technologiczny" : "Skills — Technology Stack",
      description: "PHP, WordPress, REST API, GA4, SEO, cPanel",
      icon: Code2,
      accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      action: () => scrollToSection("skills"),
      category: isPl ? "Nawigacja" : "Navigate",
    },
    {
      id: "nav-education",
      label: isPl ? "Edukacja — Dyplomy i Kwalifikacje" : "Education — Academic Credentials",
      description: isPl ? "Magister Zarządzania & Inżynier Informatyki" : "M.Sc. Management & B.Sc. Computer Science",
      icon: BookOpen,
      accent: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      action: () => scrollToSection("education"),
      category: isPl ? "Nawigacja" : "Navigate",
    },
    {
      id: "nav-contact",
      label: isPl ? "Kontakt — Skontaktuj się" : "Contact — Get In Touch",
      description: "olegbachara@gmail.com · +48 453 315 500",
      icon: Mail,
      accent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      action: () => scrollToSection("contact"),
      category: isPl ? "Nawigacja" : "Navigate",
    },
    {
      id: "email",
      label: "Email — olegbachara@gmail.com",
      description: isPl ? "Napisz wiadomość bezpośrednio" : "Send a direct email",
      icon: Mail,
      accent: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      action: () => { setIsOpen(false); window.open(SOCIAL_LINKS.email); },
      category: isPl ? "Kontakt" : "Contact",
    },
    {
      id: "phone",
      label: "Phone — +48 453 315 500",
      description: isPl ? "Zadzwoń lub napisz na WhatsApp" : "Call or WhatsApp directly",
      icon: Phone,
      accent: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      action: () => { setIsOpen(false); window.open("tel:+48453315500"); },
      category: isPl ? "Kontakt" : "Contact",
    },
    {
      id: "linkedin",
      label: "LinkedIn — /in/olegh-bachara",
      description: isPl ? "Otwórz profil LinkedIn" : "Open LinkedIn Profile",
      icon: User,
      accent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      action: () => { setIsOpen(false); window.open(SOCIAL_LINKS.linkedin, "_blank"); },
      category: isPl ? "Kontakt" : "Contact",
    },
    {
      id: "github",
      label: "GitHub — /olegb",
      description: isPl ? "Otwórz profil GitHub" : "Open GitHub Profile",
      icon: Globe,
      accent: "text-slate-400 bg-slate-500/10 border-slate-500/20",
      action: () => { setIsOpen(false); window.open(SOCIAL_LINKS.github, "_blank"); },
      category: isPl ? "Kontakt" : "Contact",
    },
    {
      id: "cv",
      label: isPl ? "Pobierz CV (PDF)" : "Download CV (PDF)",
      description: isPl ? "Pobierz aktualną wersję CV" : "Download latest resume",
      icon: Download,
      accent: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      action: () => { setIsOpen(false); window.open("/cv-oleh-bachara.pdf"); },
      category: isPl ? "Akcje" : "Actions",
    },
  ];

  const filtered = query.trim()
    ? COMMANDS.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  // Group by category
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
        setQuery("");
        setSelectedIdx(0);
      }
      if (!isOpen) return;
      if (e.key === "Escape") { setIsOpen(false); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIdx((i) => Math.max(i - 1, 0)); }
      if (e.key === "Enter") { e.preventDefault(); filtered[selectedIdx]?.action(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, filtered, selectedIdx]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIdx(0);
    }
  }, [isOpen]);

  useEffect(() => { setSelectedIdx(0); }, [query]);

  // Flatten for selectedIdx tracking
  const flatFiltered = Object.values(grouped).flat();

  return (
    <>
      {/* Trigger button in bottom-right corner */}
      <button
        onClick={() => { setIsOpen(true); setQuery(""); }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-slate-900/90 border border-white/[0.12] text-slate-300 hover:text-white hover:border-indigo-500/40 transition-all duration-200 shadow-xl shadow-black/30 backdrop-blur-md text-xs font-mono group cursor-pointer"
        aria-label="Open Command Palette"
      >
        <Search size={14} className="text-indigo-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:block">Command</span>
        <span className="flex items-center gap-0.5">
          <kbd className="px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] border border-white/[0.08]">
            ⌘K
          </kbd>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Command Palette Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ type: "spring", damping: 28, stiffness: 380, duration: 0.2 }}
              className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg"
            >
              <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0b0f1a]/95 backdrop-blur-xl shadow-2xl shadow-black/60">
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
                  <Search size={16} className="text-indigo-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={isPl ? "Szukaj polecenia..." : "Type a command or search..."}
                    className="flex-1 bg-transparent text-white text-sm font-mono placeholder-slate-500 outline-none"
                  />
                  <kbd className="hidden sm:flex px-2 py-0.5 rounded-md bg-slate-900 text-slate-500 text-[10px] border border-white/[0.06] shrink-0">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div className="max-h-[55vh] overflow-y-auto py-2 overscroll-contain">
                  {flatFiltered.length === 0 ? (
                    <div className="px-4 py-8 text-center text-slate-500 text-sm font-mono">
                      {isPl ? "Nie znaleziono wyników" : "No results found"}
                    </div>
                  ) : (
                    Object.entries(grouped).map(([category, items]) => (
                      <div key={category}>
                        <div className="px-4 py-1.5 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                          {category}
                        </div>
                        {items.map((item) => {
                          const flatIdx = flatFiltered.findIndex((f) => f.id === item.id);
                          const isSelected = flatIdx === selectedIdx;
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.id}
                              onMouseEnter={() => setSelectedIdx(flatIdx)}
                              onClick={item.action}
                              className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-100 ${
                                isSelected
                                  ? "bg-indigo-600/20 border border-indigo-500/30"
                                  : "hover:bg-white/[0.03] border border-transparent"
                              }`}
                            >
                              <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${item.accent}`}>
                                <Icon size={14} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm text-white font-medium truncate">{item.label}</div>
                                <div className="text-[11px] font-mono text-slate-500 truncate">{item.description}</div>
                              </div>
                              {isSelected && (
                                <ChevronRight size={14} className="text-indigo-400 shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-white/[0.06] flex items-center gap-4 text-[10px] font-mono text-slate-600">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/[0.06] text-slate-500">↑↓</kbd>
                    {isPl ? "nawigacja" : "navigate"}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/[0.06] text-slate-500">↵</kbd>
                    {isPl ? "wybierz" : "select"}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/[0.06] text-slate-500">ESC</kbd>
                    {isPl ? "zamknij" : "close"}
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
