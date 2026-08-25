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
    indigo: "from-amber-500/20 via-amber-500/5 to-transparent text-amber-500 border-amber-500/30",
    cyan: "from-white/10 via-white/5 to-transparent text-[#d6d3d1] border-white/20",
    emerald: "from-white/10 via-white/5 to-transparent text-[#d6d3d1] border-white/20",
    violet: "from-amber-600/20 via-amber-600/5 to-transparent text-amber-600 border-amber-600/30",
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
            className="fixed inset-0 bg-[#08090a]/80 backdrop-blur-2xl cursor-pointer"
          />

          {/* Drawer Content Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative w-full max-w-2xl h-full bg-[#08090a] border-l border-white/10 shadow-2xl flex flex-col z-10 overflow-hidden"
          >
            {/* Ambient Accent Line */}
            <div className={`h-[2px] w-full bg-gradient-to-r ${accentGlow}`} />

            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-white/[0.04] flex items-start justify-between gap-4 bg-[#121316]">
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#a8a29e] mb-1.5 block">
                  // {data.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f7f8f8] tracking-tight">
                  {data.title}
                </h2>
                {data.subtitle && (
                  <p className="text-[#d6d3d1] text-sm mt-1">{data.subtitle}</p>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-[#1c1917] border border-white/10 flex items-center justify-center text-[#a8a29e] hover:text-[#f7f8f8] hover:bg-white/10 transition-colors shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
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
                      className="p-4 rounded-2xl border border-white/[0.06] bg-[#121316] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                    >
                      <div className="text-2xl font-mono font-extrabold text-[#f7f8f8] mb-0.5">
                        {metric.value}
                      </div>
                      <div className="text-xs font-medium text-[#a8a29e]">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Core Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-[#d6d3d1] flex items-center gap-2">
                  <Sparkles size={15} className="text-amber-500" /> Executive Overview
                </h3>
                <p className="text-[#a8a29e] text-sm leading-relaxed bg-[#121316] p-4 rounded-2xl border border-white/[0.04]">
                  {data.description}
                </p>
              </div>

              {/* Key Highlights */}
              {data.highlights && data.highlights.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-[#d6d3d1] flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-[#d6d3d1]" /> Delivered Innovations
                  </h3>
                  <ul className="space-y-2.5">
                    {data.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-sm text-[#a8a29e] bg-[#121316] p-3 rounded-xl border border-white/[0.04]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Architecture & Engineering Details */}
              {data.architectureNotes && data.architectureNotes.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-[#d6d3d1] flex items-center gap-2">
                    <Server size={15} className="text-[#d6d3d1]" /> Architectural Breakdown
                  </h3>
                  <div className="space-y-2">
                    {data.architectureNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="text-xs font-mono text-[#a8a29e] bg-[#121316] border border-white/[0.06] p-3.5 rounded-xl flex items-start gap-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                      >
                        <span className="text-amber-500 font-bold">$</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Tags */}
              {data.techStack && data.techStack.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-[#d6d3d1] flex items-center gap-2">
                    <Code2 size={15} className="text-[#d6d3d1]" /> Applied Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.techStack.map((tech, idx) => (
                      <Badge key={idx} variant="slate" className="bg-[#1c1917] text-[#a8a29e] border-white/10 px-3 py-1 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-white/[0.04] bg-[#121316] flex flex-wrap items-center justify-between gap-4">
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-[#a8a29e] hover:text-[#f7f8f8]"
              >
                Close Inspection
              </Button>

              <div className="flex items-center gap-3">
                <a
                  href={`/projects/${data.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-[#f7f8f8] border border-white/10 font-semibold text-xs transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                >
                  Dedicated Case Study Page <ArrowRight size={14} />
                </a>

                {data.liveUrl ? (
                  <a
                    href={data.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.4),_0_4px_15px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Visit System Live <ExternalLink size={15} />
                  </a>
                ) : (
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.4),_0_4px_15px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Discuss Custom Solution <ArrowRight size={15} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
