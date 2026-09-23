"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Download, Phone, ShieldCheck, CheckCircle2, Copy, Check, Send, FileText } from "lucide-react";
import { type Lang } from "@/data/portfolio-data";
import { Button } from "@/components/ui/button";
import { trackIntent } from "@/lib/intent-tracker";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Lang;
}

export function RecruiterModal({ isOpen, onClose, lang }: RecruiterModalProps) {
  const isPl = lang === "pl";
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#11100e]/85 backdrop-blur-md"
          />

          {/* Modal Box / Bottom Sheet on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", bounce: 0.12, duration: 0.35 }}
            className="relative w-full max-w-xl sm:max-w-2xl max-h-[88dvh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 bg-[#161513] border-t sm:border border-[#c4a160]/40 shadow-2xl z-10 overflow-y-auto overscroll-contain pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
          >
            {/* Mobile Sheet Handle */}
            <div className="sm:hidden flex justify-center -mt-1 mb-3">
              <div className="w-10 h-1 rounded-full bg-white/25" />
            </div>

            {/* Top Accent Bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c4a160] via-[#dfc282] to-[#6c88d8]" />

            {/* Close Button (44x44 touch target) */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-11 h-11 rounded-full bg-[#11100e] border border-white/[0.12] text-[#a39c91] hover:text-[#eeece5] flex items-center justify-center transition-colors cursor-pointer shrink-0 z-20"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="flex items-start sm:items-center gap-3 mb-5 pr-10">
              <div className="w-10 h-10 rounded-xl bg-[#c4a160]/10 border border-[#c4a160]/30 flex items-center justify-center text-[#c4a160] shrink-0">
                <Zap size={20} />
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-xl font-bold text-[#eeece5] tracking-tight leading-snug">
                  {isPl ? "Executive Brief & Status Inżynierski" : "Executive Brief & Engineering Profile"}
                </h3>
                <p className="text-xs text-[#c4a160] font-mono truncate mt-0.5">
                  Roman Deyneko — CTO / Lead Hardware & Full-Stack
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-4 sm:space-y-5">
              {/* Highlight Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="bg-[#11100e] border border-white/[0.08] p-2.5 sm:p-3 rounded-xl text-center">
                  <div className="text-lg sm:text-2xl font-extrabold font-mono text-[#c4a160]">6+ Yrs</div>
                  <div className="text-[10px] sm:text-[11px] text-[#a39c91] font-mono mt-0.5">
                    {isPl ? "Doświadczenie" : "Engineering Exp"}
                  </div>
                </div>
                <div className="bg-[#11100e] border border-white/[0.08] p-2.5 sm:p-3 rounded-xl text-center">
                  <div className="text-lg sm:text-2xl font-extrabold font-mono text-cyan-400">Full-Cycle</div>
                  <div className="text-[10px] sm:text-[11px] text-[#a39c91] font-mono mt-0.5">
                    {isPl ? "Hardware do MES" : "Hardware to MES"}
                  </div>
                </div>
                <div className="bg-[#11100e] border border-white/[0.08] p-2.5 sm:p-3 rounded-xl text-center">
                  <div className="text-lg sm:text-2xl font-extrabold font-mono text-emerald-400">-40%</div>
                  <div className="text-[10px] sm:text-[11px] text-[#a39c91] font-mono mt-0.5">
                    {isPl ? "Przestoje Linii" : "Downtime Cut"}
                  </div>
                </div>
                <div className="bg-[#11100e] border border-white/[0.08] p-2.5 sm:p-3 rounded-xl text-center">
                  <div className="text-lg sm:text-2xl font-extrabold font-mono text-purple-400">+33%</div>
                  <div className="text-[10px] sm:text-[11px] text-[#a39c91] font-mono mt-0.5">
                    {isPl ? "Wydajność Linii" : "Plant Throughput"}
                  </div>
                </div>
              </div>

              {/* Education & Legal Status */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#11100e] border border-white/[0.08] space-y-2.5 text-xs">
                <div className="font-mono text-[#c4a160] font-bold uppercase tracking-wider text-[10.5px] sm:text-[11px] flex flex-wrap items-center justify-between gap-1">
                  <span>{isPl ? "Status Prawny & 3 Dyplomy (493 ECTS):" : "Legal Status & 3 Academic Degrees (493 ECTS):"}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck size={14} />
                    {isPl ? "Prawa Pracy UE (Bez Wizy)" : "Full EU Work Rights (No Visa)"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#eeece5] text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-cyan-400 shrink-0" />
                    <span>{isPl ? "Magister Zarządzania (120 ECTS · PANS)" : "M.Sc. Management (120 ECTS · PANS)"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#c4a160] shrink-0" />
                    <span>{isPl ? "Inż. Informatyki (213 ECTS · PANS)" : "B.Sc. Computer Science (213 ECTS · PANS)"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-amber-400 shrink-0" />
                    <span>{isPl ? "Inż. Automatyki i Elektroniki (160 ECTS · PANS)" : "B.Sc. Automation & Electronics (160 ECTS · PANS)"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{isPl ? "Podwójne Obywatelstwo PL / UA · Przechlewo, PL" : "Dual PL / UA Citizen · Przechlewo, PL (Remote EU)"}</span>
                  </div>
                </div>
              </div>

              {/* Target Role, Availability & Compensation */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-[#c4a160]/10 via-transparent to-emerald-500/10 border border-[#c4a160]/30 space-y-1.5 text-xs font-mono">
                <div className="flex flex-wrap items-center justify-between gap-1.5">
                  <span className="text-[#a39c91] uppercase text-[10px] tracking-wider font-semibold">
                    {isPl ? "Docelowe Role & Warunki:" : "Target Roles & Terms:"}
                  </span>
                  <span className="text-emerald-400 font-bold text-[11px] sm:text-xs bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/30">
                    {isPl ? "Do uzgodnienia / Oferta firmy (B2B / UoP)" : "Negotiable / Open to Offers (B2B / UoP)"}
                  </span>
                </div>
                <div className="text-[#eeece5] text-[11px] leading-relaxed">
                  <strong>{isPl ? "Stanowiska:" : "Roles:"}</strong>{" "}
                  {isPl
                    ? "CTO / Tech Lead · Head of R&D · Główny Architekt Embedded & IIoT · Architekt Systemów MES (OT/IT) · Senior Inżynier Automatyki (PLC)"
                    : "CTO / Tech Lead · Head of R&D · Lead Embedded & IIoT Architect · Industrial MES Architect (OT/IT) · Senior Automation (PLC) Engineer"}
                </div>
                <div className="text-[#94a3b8] text-[10px] flex flex-wrap gap-x-3 gap-y-1 pt-0.5">
                  <span>⚡ {isPl ? "Dostępność: Natychmiast / 2 tyg." : "Availability: Immediate / 2 Weeks"}</span>
                  <span>📍 {isPl ? "Tryb: Zdalnie / Hybrydowo / Delegacje UE" : "Mode: Remote / Hybrid / EU Travel"}</span>
                </div>
              </div>

              {/* Core Skill Set & Programming Languages */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono text-[#a39c91] uppercase tracking-wider font-semibold">
                  {isPl ? "Stos Technologiczny & Języki Programowania:" : "Tech Stack & Programming Languages:"}
                </div>

                {/* Languages & PLC (IEC 61131-3) */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono text-[#c4a160] uppercase tracking-wider font-semibold">
                    {isPl ? "Języki Programowania & PLC (IEC 61131-3):" : "Programming Languages & PLC (IEC 61131-3):"}
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px] sm:text-[10.5px]">
                    {[
                      "C / C++ (C++17/20)",
                      "Kotlin (Android SDK)",
                      "ST / SCL (Structured Text)",
                      "LAD (Ladder Diagram)",
                      "FBD (Function Block)",
                      "SFC (Sequential Function Chart)",
                      "IL / AWL (Instruction List)",
                      "Python (FastAPI & Asyncio)",
                      "TypeScript",
                      "JavaScript",
                      "SQL (PostgreSQL / SQLite)",
                      "InfluxQL (Time-Series OEE)",
                      "Bash / Shell (Linux Edge)",
                    ].map((langItem) => (
                      <span
                        key={langItem}
                        className="px-2 py-0.5 rounded-md bg-[#11100e] border border-[#c4a160]/30 text-[#dfc282]"
                      >
                        {langItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Industrial Hardware, Edge & Automation */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                    {isPl ? "Systemy Wbudowane, Automatyka & Platformy:" : "Embedded Systems, Automation & Platforms:"}
                  </div>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px] sm:text-[10.5px]">
                    {[
                      "FreeRTOS & ESP-IDF",
                      "Siemens S7 (TIA Portal)",
                      "Factory I/O (3D Digital Twin)",
                      "CAD/CAM (AutoCAD/Fusion/SolidWorks)",
                      "CNC Laser Cutting (Trumpf/Bystronic)",
                      "Control Cabinets (Szafy Sterownicze)",
                      "Android POS & Fiscal RS-232",
                      "ESP32-C6 / STM32 / ARM",
                      "Industrial Wireless Mesh (<10ms)",
                      "Embedded Linux (RPi/IPC)",
                      "React 19 & Next.js",
                      "HTML5 Canvas Digital Twins",
                      "OpenCV Computer Vision",
                      "RS-485 / Modbus / CAN",
                      "Robotics (UR-5 / Sick Vision)",
                      "Lean & Process Optimization",
                      "Agile / Scrum / Jira",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-[#11100e] border border-white/[0.08] text-[#eeece5]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CV Downloads (Dual Language Choice) */}
              <div className="pt-1">
                <div className="text-[11px] font-mono text-[#a39c91] uppercase tracking-wider mb-2 font-semibold flex items-center justify-between">
                  <span>{isPl ? "Pobierz CV (Format ATS):" : "Download Resume (ATS Format):"}</span>
                  <span className="text-emerald-400 text-[10px] font-mono lowercase">1-page executive pdf</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <a
                    href="/cv-roman-deyneko-en.pdf"
                    download="cv-roman-deyneko-en.pdf"
                    onClick={() => trackIntent("cv_download", "CV Download (Modal - EN)", "cv-roman-deyneko-en.pdf")}
                    className="w-full"
                  >
                    <Button size="sm" className="w-full min-h-[44px] font-mono text-xs cursor-pointer py-2.5 bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold flex items-center justify-center gap-1.5">
                      <Download size={14} />
                      <span>🇬🇧 Download CV (English)</span>
                    </Button>
                  </a>

                  <a
                    href="/cv-roman-deyneko-pl.pdf"
                    download="cv-roman-deyneko-pl.pdf"
                    onClick={() => trackIntent("cv_download", "CV Download (Modal - PL)", "cv-roman-deyneko-pl.pdf")}
                    className="w-full"
                  >
                    <Button size="sm" variant="secondary" className="w-full min-h-[44px] font-mono text-xs cursor-pointer py-2.5 bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.14] text-[#eeece5] font-semibold flex items-center justify-center gap-1.5">
                      <FileText size={14} className="text-[#c4a160]" />
                      <span>🇵🇱 Pobierz CV + RODO (Polski)</span>
                    </Button>
                  </a>
                </div>
              </div>

              {/* Direct Quick Channels */}
              <div className="pt-2 grid grid-cols-1 min-[420px]:grid-cols-3 gap-2">
                <a
                  href="tel:+48791265019"
                  onClick={() => trackIntent("contact_click_phone", "Phone Call (Recruiter Modal)", "+48 791 265 019")}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono hover:bg-emerald-500/20 transition-colors"
                >
                  <Phone size={13} />
                  <span>+48 791 265 019</span>
                </a>

                <a
                  href="https://t.me/NeKoRoM"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackIntent("contact_click_telegram", "Telegram (Recruiter Modal)", "@NeKoRoM")}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono hover:bg-cyan-500/20 transition-colors"
                >
                  <Send size={13} />
                  <span>Telegram @NeKoRoM</span>
                </a>

                <button
                  onClick={() => {
                    trackIntent("contact_click_email", "Email Copied (Recruiter Modal)", "m.pnikut@gmail.com");
                    copyToClipboard("m.pnikut@gmail.com", "email");
                  }}
                  className="min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl border border-white/[0.12] bg-[#11100e] text-[#eeece5] text-xs font-mono hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  {copiedField === "email" ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-300 font-semibold">{isPl ? "Skopiowano!" : "Copied!"}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} className="text-[#c4a160]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
