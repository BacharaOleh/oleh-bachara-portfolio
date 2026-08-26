"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "indigo" | "cyan" | "violet" | "emerald" | "slate" | "yellow";
  className?: string;
}

const variants = {
  indigo: "bg-[#18191c] text-[#f7f8f8] border-amber-500/20 shadow-[inset_0_1px_0_rgba(245,158,11,0.05)]",
  cyan: "bg-[#18191c] text-[#f7f8f8] border-cyan-500/20 shadow-[inset_0_1px_0_rgba(6,182,212,0.05)]",
  violet: "bg-[#18191c] text-[#f7f8f8] border-violet-500/20 shadow-[inset_0_1px_0_rgba(139,92,246,0.05)]",
  emerald: "bg-[#18191c] text-[#f7f8f8] border-emerald-500/20 shadow-[inset_0_1px_0_rgba(16,185,129,0.05)]",
  slate: "bg-[#18191c] text-[#d6d3d1] border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
  yellow: "bg-[#18191c] text-[#f7f8f8] border-yellow-500/20 shadow-[inset_0_1px_0_rgba(234,179,8,0.05)]",
};

export function Badge({ children, variant = "indigo", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
