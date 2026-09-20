"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Download, Mail, Phone, ShieldCheck, CheckCircle2, Copy, Check, Send } from "lucide-react";
import { type Lang } from "@/data/portfolio-data";
import { Button } from "@/components/ui/button";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

export function RecruiterModal({ isOpen, onClose, lang }: RecruiterModalProps) {
  const isPl = lang === "pl";
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback
    }
  };

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
            className="fixed inset-0 bg-[#11100e]/85 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
            className="relative w-full max-w-xl sm:max-w-2xl max-h-[90vh] rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-[#161513] border border-[#c4a160]/40 shadow-2xl z-10 overflow-y-auto"
          >
            {/* Top Accent Bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c4a160] via-[#dfc282] to-[#6c88d8]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#11100e] border border-white/[0.1] text-[#a39c91] hover:text-[#eeece5] flex items-center justify-center transition-colors cursor-pointer shrink-0 z-20"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-start sm:items-center gap-3 mb-5 pr-8">
              <div className="w-10 h-10 rounded-xl bg-[#c4a160]/10 border border-[#c4a160]/30 flex items-center justify-center text-[#c4a160] shrink-0">
                <Zap size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-[#eeece5] tracking-tight leading-snug">
                  {isPl ? "Podsumowanie dla Rekruterów (1 Minuta)" : "Recruiter 1-Minute Executive Summary"}
                </h3>
                <p className="text-xs text-[#c4a160] font-mono truncate">
                  Oleh Bachara — Web Developer for Product Platforms & Technical Growth
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-4 sm:space-y-5">
              {/* Highlight Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-[#11100e] border border-white/[0.08] p-3 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#c4a160]">+40%</div>
                  <div className="text-[10px] sm:text-[11px] text-[#a39c91] font-mono mt-0.5">
                    {isPl ? "Ruch Organiczny" : "Organic Growth"}
                  </div>
                </div>
                <div className="bg-[#11100e] border border-white/[0.08] p-3 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-cyan-400">90+</div>
                  <div className="text-[10px] sm:text-[11px] text-[#a39c91] font-mono mt-0.5">
                    {isPl ? "PageSpeed Mobile" : "PageSpeed Mobile"}
                  </div>
                </div>
                <div className="bg-[#11100e] border border-white/[0.08] p-3 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">8+</div>
                  <div className="text-[10px] sm:text-[11px] text-[#a39c91] font-mono mt-0.5">
                    {isPl ? "Stron Korporacji" : "Corporate Sites"}
                  </div>
                </div>
                <div className="bg-[#11100e] border border-white/[0.08] p-3 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-purple-400">30-36%</div>
                  <div className="text-[10px] sm:text-[11px] text-[#a39c91] font-mono mt-0.5">
                    {isPl ? "CTR / Zaangażowanie" : "Engagement Rate"}
                  </div>
                </div>
              </div>

              {/* Education & Legal Status */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#11100e] border border-white/[0.08] space-y-2.5 text-xs">
                <div className="font-mono text-[#c4a160] font-bold uppercase tracking-wider text-[11px] flex flex-wrap items-center justify-between gap-1">
                  <span>{isPl ? "Status Prawny & Wykształcenie:" : "Legal Status & Academic Degrees:"}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck size={14} />
                    {isPl ? "Pełne Prawa Pracy UE (Bez Wizy)" : "Full EU Work Rights (No Visa Needed)"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#eeece5] text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>Magister Zarządzania (PANS 2023–2025)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#c4a160] shrink-0" />
                    <span>Inżynier Informatyki (PANS 2019–2023)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{isPl ? "Podwójne Obywatelstwo PL / UA" : "Dual PL / UA Citizenship"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-purple-400 shrink-0" />
                    <span>{isPl ? "Lokalizacja: Jarosław, PL (Remote UE)" : "Location: Jarosław, PL (Remote EU)"}</span>
                  </div>
                </div>
              </div>

              {/* Core Skill Set */}
              <div>
                <div className="text-xs font-mono text-[#a39c91] uppercase tracking-wider mb-2 font-semibold">
                  {isPl ? "Główny Stos Technologiczny:" : "Primary Technical Stack:"}
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {[
                    "WordPress / Custom PHP",
                    "Gutenberg Blocks",
                    "Core Web Vitals (90+)",
                    "Product Catalogues",
                    "Technical SEO & Schema.org",
                    "GA4 & Search Console",
                    "REST APIs & Webhooks",
                    "Next.js & TypeScript",
                    "MySQL / MariaDB",
                    "cPanel / DNS / SSL",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-[#11100e] border border-white/[0.08] text-[#eeece5]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Quick Contacts & Copy */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <a href="/cv-oleh-bachara.pdf" download="cv-oleh-bachara.pdf" className="w-full">
                  <Button size="sm" className="w-full font-mono text-xs cursor-pointer py-2.5 bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e]">
                    <Download size={14} />
                    {isPl ? "Pobierz CV (PDF)" : "Download ATS CV (PDF)"}
                  </Button>
                </a>

                <button
                  onClick={() => copyToClipboard("olegbachara@gmail.com", "email")}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-white/[0.12] bg-[#11100e] text-[#eeece5] text-xs font-mono hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  {copiedField === "email" ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">{isPl ? "Skopiowano!" : "Copied Email!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="text-[#c4a160]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <a
                  href="https://t.me/olegh_bachara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono hover:bg-cyan-500/20 transition-colors"
                >
                  <Send size={14} />
                  Telegram Direct
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
