"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Download, Mail, Phone, ShieldCheck, CheckCircle2 } from "lucide-react";
import { type Lang } from "@/data/portfolio-data";
import { Button } from "@/components/ui/button";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

export function RecruiterModal({ isOpen, onClose, lang }: RecruiterModalProps) {
  const isPl = lang === "pl";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          {/* Modal Box with Mobile Scroll Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
            className="relative w-full max-w-xl sm:max-w-2xl max-h-[88vh] glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-7 bg-[#090d16]/95 border border-indigo-500/40 shadow-2xl z-10 overflow-y-auto"
          >
            {/* Top Accent Bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 z-20"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-start sm:items-center gap-3 mb-5 pr-8">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5 sm:mt-0">
                <Zap size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">
                  {isPl ? "Podsumowanie dla Rekruterów (1 Minut)" : "Recruiter 1-Minute Executive Summary"}
                </h3>
                <p className="text-[11px] sm:text-xs text-indigo-300 font-mono truncate">
                  Oleh Bachara — Web Developer & Technical Marketing
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-4 sm:space-y-5">
              {/* Highlight Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-slate-950/80 border border-white/[0.08] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-indigo-400">4.5+ Yrs</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">{isPl ? "Doświadczenia" : "Experience"}</div>
                </div>
                <div className="bg-slate-950/80 border border-white/[0.08] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-cyan-400">+40%</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">{isPl ? "Ruchu Organicznego" : "Traffic Surge"}</div>
                </div>
                <div className="bg-slate-950/80 border border-white/[0.08] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">8+</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">{isPl ? "Stron Korporacji" : "Corporate Sites"}</div>
                </div>
                <div className="bg-slate-950/80 border border-white/[0.08] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl text-center">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-purple-400">0%</div>
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono mt-0.5">{isPl ? "Przestoju Migracji" : "Downtime"}</div>
                </div>
              </div>

              {/* Education & Legal Status */}
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/60 border border-white/[0.06] space-y-2 text-xs">
                <div className="font-mono text-indigo-300 font-bold uppercase tracking-wider text-[10px] sm:text-xs flex flex-wrap items-center justify-between gap-1">
                  <span>{isPl ? "Wykształcenie & Status Prawny:" : "Academic Degrees & Legal Status:"}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck size={13} />
                    {isPl ? "Pełne Prawa Pracy UE" : "Full EU Work Rights"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-slate-300 text-[11px] sm:text-xs">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                    <span>Magister Zarządzania (PANS 2023–2025)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-indigo-400 shrink-0" />
                    <span>Inżynier Informatyki (PANS 2019–2023)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span>{isPl ? "Obywatelstwo PL / UA (Dual)" : "Dual PL / UA Citizenship"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-purple-400 shrink-0" />
                    <span>{isPl ? "Lokalizacja: Jarosław, Polska" : "Location: Jarosław, Poland"}</span>
                  </div>
                </div>
              </div>

              {/* Core Skill Set */}
              <div>
                <div className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-semibold">
                  {isPl ? "Główny Stos Technologiczny:" : "Primary Technical Stack:"}
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-1.5 font-mono text-[10px] sm:text-[11px]">
                  {["PHP / Custom Modules", "WordPress Custom Themes", "Product Catalog Management", "REST API & Webhooks", "GA4 & GSC", "Technical SEO", "cPanel / DNS", "MySQL / MariaDB", "JavaScript / ES6+", "Tailwind CSS"].map((skill) => (
                    <span key={skill} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a href="/cv-oleh-bachara.pdf" download="cv-oleh-bachara.pdf" className="w-full">
                  <Button size="sm" className="w-full font-mono text-xs cursor-pointer py-2.5 sm:py-2">
                    <Download size={14} />
                    {isPl ? "Pobierz CV (PDF)" : "Download CV (PDF)"}
                  </Button>
                </a>

                <a href="tel:+48453315500" className="w-full">
                  <Button size="sm" variant="secondary" className="w-full font-mono text-xs cursor-pointer border border-emerald-500/30 text-emerald-300 py-2.5 sm:py-2">
                    <Phone size={14} />
                    +48 453 315 500
                  </Button>
                </a>

                <a href="mailto:olegbachara@gmail.com" className="w-full">
                  <Button size="sm" variant="secondary" className="w-full font-mono text-xs cursor-pointer py-2.5 sm:py-2">
                    <Mail size={14} />
                    Email Direct
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
