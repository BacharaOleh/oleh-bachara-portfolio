"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, ArrowLeft, Phone, Send, Copy, Check, ShieldCheck, Zap, FileText } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { trackIntent } from "@/lib/intent-tracker";

export default function CvPage() {
  const [lang, setLang] = useState<"en" | "pl">("en");
  const [copied, setCopied] = useState(false);

  const cvFile = lang === "pl" ? "cv-roman-deyneko-pl.pdf" : "cv-roman-deyneko-en.pdf";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("m.pnikut@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden overflow-x-clip bg-[#0d0c0b] text-[#eeece5] selection:bg-[#c4a160] selection:text-[#11100e]">
      {/* Top Bar */}
      <header className="border-b border-white/[0.08] bg-[#11100e]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 min-h-[44px] text-xs font-mono text-[#a39c91] hover:text-[#eeece5] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Lang toggle */}
            <div className="flex border border-white/[0.14] p-0.5 font-mono text-[11px] rounded">
              <button
                type="button"
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 uppercase rounded-sm transition-colors cursor-pointer min-h-[36px] ${
                  lang === "en" ? "bg-[#c4a160] text-[#11100e] font-bold" : "text-[#a39c91] hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("pl")}
                className={`px-3 py-1.5 uppercase rounded-sm transition-colors cursor-pointer min-h-[36px] ${
                  lang === "pl" ? "bg-[#c4a160] text-[#11100e] font-bold" : "text-[#a39c91] hover:text-white"
                }`}
              >
                PL
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-6 sm:space-y-8 pb-16 w-full max-w-full min-w-0 overflow-x-hidden overflow-x-clip">
        {/* Candidate Identity Card */}
        <div className="p-5 sm:p-8 rounded-2xl bg-[#161513] border border-white/[0.1] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#c4a160] via-[#dfc282] to-[#0284c7]" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <BrandMark />
                <span className="font-mono text-xs uppercase tracking-wider text-[#c4a160] flex items-center gap-1">
                  <Zap size={13} className="fill-[#c4a160]" />
                  Verified Engineering Profile
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <ShieldCheck size={12} />
                  Full EU Work Rights
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Roman Deyneko
              </h1>
              <p className="text-sm sm:text-base font-medium text-[#c4a160] mt-1">
                {lang === "pl"
                  ? "Główny Inżynier Hardware, Systemów Wbudowanych i Full-Stack (CTO)"
                  : "CTO | Lead Hardware, Embedded Systems & Full-Stack Architect"}
              </p>
              <p className="text-xs font-mono text-[#a39c91] mt-2">
                Przechlewo, Poland · Remote (EU) / Hybrid / Travel · Dual PL/UA Citizen
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-stretch lg:items-center gap-2.5 shrink-0 w-full lg:w-auto">
              <a
                href={`/${cvFile}`}
                download={cvFile}
                onClick={() => trackIntent("cv_download", `CV Page Download (${lang.toUpperCase()})`, cvFile)}
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full sm:w-auto min-h-[44px] bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold cursor-pointer shadow-lg shadow-[#c4a160]/20 font-mono text-xs flex items-center justify-center gap-2">
                  <Download size={15} />
                  <span>{lang === "pl" ? "Pobierz CV (PDF + RODO)" : "Download CV (PDF)"}</span>
                </Button>
              </a>

              <a
                href="https://t.me/NeKoRoM"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackIntent("contact_click_telegram", "Telegram (CV Page)")}
                className="min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs transition-colors"
              >
                <Send size={14} />
                <span>Telegram</span>
              </a>

              <a
                href="tel:+48791265019"
                onClick={() => trackIntent("contact_click_phone", "Phone (CV Page)", "+48 791 265 019")}
                className="min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-mono text-xs transition-colors"
              >
                <Phone size={14} />
                <span>+48 791 265 019</span>
              </a>

              <button
                onClick={() => {
                  trackIntent("contact_click_email", "Email Copied (CV Page)", "m.pnikut@gmail.com");
                  handleCopyEmail();
                }}
                className="min-h-[44px] flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-white/[0.12] bg-[#11100e] hover:bg-white/[0.06] text-[#eeece5] font-mono text-xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-[#c4a160]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Master Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mt-6 pt-6 border-t border-white/[0.08]">
            <div className="bg-[#11100e] p-3 rounded-xl border border-white/[0.06] text-center">
              <div className="font-mono text-lg sm:text-xl font-bold text-[#c4a160]">-40%</div>
              <div className="font-mono text-[10px] text-[#a39c91] mt-0.5">Downtime Cut</div>
            </div>
            <div className="bg-[#11100e] p-3 rounded-xl border border-white/[0.06] text-center">
              <div className="font-mono text-lg sm:text-xl font-bold text-cyan-400">Factory I/O</div>
              <div className="font-mono text-[10px] text-[#a39c91] mt-0.5">3D Digital Twin</div>
            </div>
            <div className="bg-[#11100e] p-3 rounded-xl border border-white/[0.06] text-center">
              <div className="font-mono text-lg sm:text-xl font-bold text-emerald-400">71.1k PLN</div>
              <div className="font-mono text-[10px] text-[#a39c91] mt-0.5">Annual Gas Saved</div>
            </div>
            <div className="bg-[#11100e] p-3 rounded-xl border border-white/[0.06] text-center">
              <div className="font-mono text-lg sm:text-xl font-bold text-amber-400">+33%</div>
              <div className="font-mono text-[10px] text-[#a39c91] mt-0.5">Throughput (+33%)</div>
            </div>
            <div className="bg-[#11100e] p-3 rounded-xl border border-white/[0.06] text-center">
              <div className="font-mono text-lg sm:text-xl font-bold text-purple-400">&lt;10ms</div>
              <div className="font-mono text-[10px] text-[#a39c91] mt-0.5">ESP-NOW Mesh</div>
            </div>
            <div className="bg-[#11100e] p-3 rounded-xl border border-white/[0.06] text-center">
              <div className="font-mono text-lg sm:text-xl font-bold text-blue-400">100%</div>
              <div className="font-mono text-[10px] text-[#a39c91] mt-0.5">Zero Punch Loss</div>
            </div>
          </div>
        </div>

        {/* Document Viewer Header & Controls */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-[#c4a160]" />
              <span className="font-bold text-white uppercase tracking-wider">
                {lang === "pl" ? "Podgląd Dokumentu (A4):" : "Document Preview (A4):"}
              </span>
              <span className="text-[#a39c91] text-[11px] truncate max-w-[180px] sm:max-w-none">
                {cvFile}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`/${cvFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-[#c4a160] hover:text-[#dfc282] transition-colors"
              >
                <span>{lang === "pl" ? "Otwórz na pełnym ekranie ↗" : "Open in Full Tab ↗"}</span>
              </a>
            </div>
          </div>

          {/* Mobile Fallback Card (< md screens) - Resolves iOS Safari iframe rendering limitation */}
          <div className="block md:hidden p-5 rounded-2xl border border-white/[0.12] bg-[#161513] space-y-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#c4a160]/10 border border-[#c4a160]/20 text-[#c4a160] shrink-0 mt-0.5">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">
                  {lang === "pl" ? "Oficjalny Dokument CV (ATS-Friendly)" : "Official ATS-Friendly CV"}
                </h3>
                <p className="text-xs text-[#a39c91] mt-1 leading-relaxed">
                  {lang === "pl"
                    ? "Na smartfonach i Safari podgląd wbudowanego PDF jest zoptymalizowany pod bezpośrednie otwarcie lub pobranie."
                    : "On mobile and iOS Safari, the multi-page PDF renders best when opened directly in full-screen or downloaded."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              <a
                href={`/${cvFile}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackIntent("cv_download", `Mobile Tab Open (${lang.toUpperCase()})`, cvFile)}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-bold text-xs font-mono transition-colors shadow-md"
              >
                <FileText size={15} />
                <span>{lang === "pl" ? "Otwórz Pełny PDF (Nowa Karta)" : "Open Full PDF in New Tab"}</span>
              </a>

              <a
                href={`/${cvFile}`}
                download={cvFile}
                onClick={() => trackIntent("cv_download", `Mobile Download (${lang.toUpperCase()})`, cvFile)}
                className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 text-[#eeece5] font-semibold text-xs font-mono transition-colors"
              >
                <Download size={15} />
                <span>{lang === "pl" ? "Pobierz plik PDF" : "Download PDF File"}</span>
              </a>
            </div>

            {/* Quick Mobile Resume Highlights */}
            <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-2 text-xs font-mono text-[#a39c91]">
              <div className="text-[11px] uppercase tracking-wider text-[#c4a160] font-bold">
                {lang === "pl" ? "Kluczowe kwalifikacje:" : "Key Highlights:"}
              </div>
              <ul className="space-y-1.5 list-disc list-inside text-[11px] text-[#eeece5]">
                <li>{lang === "pl" ? "493 ECTS: 2x Inżynier (CS & Automatyka) + Magister Zarządzania" : "493 ECTS: Dual B.Sc. Eng. (CS & Automation) + M.Sc. Management"}</li>
                <li>{lang === "pl" ? "Praktyka przemysłowa: San-Pajda, Goodvalley, Siemens S7, Factory I/O, Android POS" : "Industrial track record: San-Pajda, Goodvalley, Siemens S7, Factory I/O, Android POS"}</li>
                <li>{lang === "pl" ? "ESP-NOW Mesh (<10ms), Raspberry Pi Edge, FastAPI + React 19" : "ESP-NOW Mesh (<10ms), Raspberry Pi Edge, FastAPI + React 19"}</li>
              </ul>
            </div>
          </div>

          {/* Desktop Embedded Viewer (md+ screens) */}
          <div className="hidden md:block w-full rounded-2xl overflow-hidden border border-white/[0.12] bg-[#161513] shadow-2xl">
            <iframe
              src={`/${cvFile}#view=FitH`}
              title="Roman Deyneko CV Preview"
              className="w-full h-[750px] sm:h-[950px] bg-white"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
