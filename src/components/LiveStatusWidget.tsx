"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Send, Download, ChevronUp, ChevronDown, ShieldCheck } from "lucide-react";
import { type Lang, type Perspective, SOCIAL_LINKS } from "@/data/portfolio-data";

interface LiveStatusWidgetProps {
  lang: Lang;
  perspective: Perspective;
}

export function LiveStatusWidget({ lang, perspective }: LiveStatusWidgetProps) {
  const [time, setTime] = useState<string>("21:00:00");
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Warsaw",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <motion.div
        layout
        className="glass-card rounded-2xl border border-white/[0.12] bg-[#080c14]/95 backdrop-blur-xl shadow-2xl overflow-hidden shadow-indigo-500/10 text-xs font-mono"
      >
        {/* Main Status Header Pill */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label="Toggle Live Status and Poland Local Time widget"
          aria-expanded={isExpanded}
          className="flex items-center gap-3 px-3.5 py-2.5 cursor-pointer hover:bg-white/[0.04] transition-colors select-none text-left w-full"
        >
          {/* Pulsing Status Dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>

          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight">🇵🇱 Jarosław, PL</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-300 font-semibold flex items-center gap-1">
              <Clock size={12} className="text-cyan-400 shrink-0" />
              {mounted ? time : "21:00:00"} CET
            </span>
          </div>

          <span className="text-slate-400 hover:text-white transition-colors ml-1 p-0.5">
            {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </span>
        </button>

        {/* Expandable Details Tray */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-3.5 pb-3.5 pt-1 border-t border-white/[0.06] space-y-3"
            >
              <div className="text-[11px] text-slate-200 flex items-center gap-1.5 font-sans pt-1">
                <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
                <span>
                  {lang === "pl"
                    ? "Dostępny do projektów webowych i współpracy B2B."
                    : "Available for Senior Web & Tech Marketing Roles."}
                </span>
              </div>

              <div className="text-[10px] text-slate-300 font-mono">
                Focus:{" "}
                <span className="text-indigo-300 font-semibold">
                  {perspective === "engineer" ? "PHP / Systems / Webhooks" : "GA4 / Organic Growth / Conversions"}
                </span>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct Telegram contact with Oleh Bachara"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-[11px] font-semibold transition-colors"
                >
                  <Send size={11} />
                  Telegram
                </a>
                <a
                  href="/cv-oleh-bachara.pdf"
                  download="cv-oleh-bachara.pdf"
                  aria-label="Download CV PDF of Oleh Bachara"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 text-[11px] font-semibold transition-colors"
                >
                  <Download size={11} />
                  CV (PDF)
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
