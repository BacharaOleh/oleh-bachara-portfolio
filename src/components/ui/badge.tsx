"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "indigo" | "cyan" | "violet" | "emerald" | "slate" | "yellow";
  className?: string;
}

const variants = {
  indigo: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  violet: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  slate: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  yellow: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
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
