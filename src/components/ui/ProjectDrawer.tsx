"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight, CheckCircle2, ShieldCheck, Zap, Server, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface DrawerData {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  metrics?: { label: string; value: string }[];
  description: string;
  highlights?: string[];
  architectureNotes?: string[];
  techStack?: string[];
  liveUrl?: string;
  accentColor?: "indigo" | "cyan" | "emerald" | "violet";
}

interface ProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: DrawerData | null;
}

export function ProjectDrawer({ isOpen, onClose, data }: ProjectDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!data) return null;

  const accentGlow = {
    indigo: "from-indigo-500/20 via-indigo-500/5 to-transparent text-indigo-400 border-indigo-500/30",
    cyan: "from-cyan-500/20 via-cyan-500/5 to-transparent text-cyan-400 border-cyan-500/30",
    emerald: "from-emerald-500/20 via-emerald-500/5 to-transparent text-emerald-400 border-emerald-500/30",
    violet: "from-violet-500/20 via-violet-500/5 to-transparent text-violet-400 border-violet-500/30",
  }[data.accentColor || "indigo"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md cursor-pointer"
          />

          {/* Drawer Content Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-2xl h-full bg-[#0a0f1b] border-l border-white/10 shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Ambient Accent Line */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${accentGlow}`} />

            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/[0.08] flex items-start justify-between gap-4 bg-slate-900/40">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-indigo-400 mb-1.5 block">
                  // {data.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {data.title}
                </h2>
                {data.subtitle && (
                  <p className="text-slate-400 text-sm mt-1">{data.subtitle}</p>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Metrics Grid */}
              {data.metrics && data.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {data.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="glass-panel p-4 rounded-2xl border border-white/[0.06] bg-slate-900/50"
                    >
                      <div className="text-2xl font-mono font-extrabold text-white mb-0.5">
                        {metric.value}
                      </div>
                      <div className="text-xs font-medium text-slate-400">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Core Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Sparkles size={15} className="text-indigo-400" /> Executive Overview
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed bg-slate-900/40 p-4 rounded-2xl border border-white/5">
                  {data.description}
                </p>
              </div>

              {/* Key Highlights */}
              {data.highlights && data.highlights.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400" /> Delivered Innovations
                  </h3>
                  <ul className="space-y-2.5">
                    {data.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-slate-300 bg-slate-900/30 p-3 rounded-xl border border-white/[0.04]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Architecture & Engineering Details */}
              {data.architectureNotes && data.architectureNotes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Server size={15} className="text-cyan-400" /> Architectural Breakdown
                  </h3>
                  <div className="space-y-2">
                    {data.architectureNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="text-xs font-mono text-cyan-200/90 bg-cyan-950/20 border border-cyan-500/20 p-3.5 rounded-xl flex items-start gap-2.5"
                      >
                        <span className="text-cyan-400 font-bold">$</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Tags */}
              {data.techStack && data.techStack.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Code2 size={15} className="text-violet-400" /> Applied Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.techStack.map((tech, idx) => (
                      <Badge key={idx} variant="slate" className="bg-slate-900/60 text-slate-300 border-white/10 px-3 py-1 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/[0.08] bg-slate-900/80 flex items-center justify-between gap-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                Close Inspection
              </Button>

              {data.liveUrl ? (
                <a
                  href={data.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25"
                >
                  Visit System Live <ExternalLink size={15} />
                </a>
              ) : (
                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25"
                >
                  Discuss Custom Solution <ArrowRight size={15} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
