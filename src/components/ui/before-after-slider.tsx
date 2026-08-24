"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  className?: string;
}

interface MetricRow {
  label: string;
  before: string;
  after: string;
  beforeColor: string;
  afterColor: string;
  beforeBarWidth: string;
  afterBarWidth: string;
}

const METRICS: MetricRow[] = [
  { label: "Lighthouse Score", before: "45", after: "96", beforeColor: "text-rose-400", afterColor: "text-emerald-400", beforeBarWidth: "45%", afterBarWidth: "96%" },
  { label: "Largest Contentful Paint", before: "4.2s", after: "0.8s", beforeColor: "text-rose-400", afterColor: "text-emerald-400", beforeBarWidth: "84%", afterBarWidth: "16%" },
  { label: "Total Page Weight", before: "3.8 MB", after: "420 KB", beforeColor: "text-rose-400", afterColor: "text-cyan-400", beforeBarWidth: "95%", afterBarWidth: "11%" },
  { label: "First Contentful Paint", before: "2.4s", after: "0.4s", beforeColor: "text-amber-400", afterColor: "text-emerald-400", beforeBarWidth: "60%", afterBarWidth: "10%" },
  { label: "DB Query Latency", before: "420ms", after: "48ms", beforeColor: "text-rose-400", afterColor: "text-emerald-400", beforeBarWidth: "84%", afterBarWidth: "10%" },
];

export function BeforeAfterSlider({ className = "" }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPercent, setSplitPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = Math.max(8, Math.min(92, (x / rect.width) * 100));
      setSplitPercent(percent);
    },
    [isDragging]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      return () => {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none touch-none rounded-2xl overflow-hidden ${className}`}
      style={{ userSelect: "none" }}
    >
      {/* Split Container */}
      <div className="relative w-full">
        {/* ── BEFORE (Left Side - Legacy) ──────────────────────── */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${splitPercent}%` }}
        >
          <div className="w-full min-w-[280px] p-5 sm:p-6 bg-gradient-to-br from-rose-950/40 via-slate-950 to-slate-950 h-full">
            {/* Header */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-widest">Before — Legacy Platform</span>
            </div>

            {/* Large Score */}
            <div className="mb-5 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold font-mono text-rose-400">45</span>
              <span className="text-sm font-mono text-rose-400/70">/100</span>
            </div>

            {/* Metrics */}
            <div className="space-y-3.5">
              {METRICS.map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-[11px] font-mono mb-1">
                    <span className="text-slate-400">{m.label}</span>
                    <span className={m.beforeColor + " font-bold"}>{m.before}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full transition-all duration-700"
                      style={{ width: m.beforeBarWidth }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── AFTER (Full Background - Optimized) ─────────────── */}
        <div className="relative w-full p-5 sm:p-6 bg-gradient-to-br from-emerald-950/20 via-slate-950 to-cyan-950/10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-widest">After — Optimized Architecture</span>
          </div>

          {/* Large Score */}
          <div className="mb-5 flex items-baseline gap-2">
            <span className="text-5xl font-extrabold font-mono text-emerald-400">96</span>
            <span className="text-sm font-mono text-emerald-400/70">/100</span>
          </div>

          {/* Metrics */}
          <div className="space-y-3.5">
            {METRICS.map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-slate-400">{m.label}</span>
                  <span className={m.afterColor + " font-bold"}>{m.after}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-700"
                    style={{ width: m.afterBarWidth }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Drag Handle ─────────────────────────────────────── */}
        <div
          className="absolute top-0 bottom-0 z-20 flex items-center justify-center"
          style={{ left: `${splitPercent}%`, transform: "translateX(-50%)" }}
        >
          {/* Vertical Line */}
          <div className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-indigo-400 via-cyan-400 to-indigo-400 shadow-lg shadow-cyan-500/50" />

          {/* Handle Button */}
          <div
            onPointerDown={handlePointerDown}
            className="relative z-10 w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center cursor-ew-resize shadow-xl shadow-cyan-500/30 hover:scale-110 transition-transform active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-cyan-300">
              <path d="M4 8L1 5M4 8L1 11M4 8H1M12 8L15 5M12 8L15 11M12 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
