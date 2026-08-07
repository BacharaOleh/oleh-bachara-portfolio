"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "indigo" | "cyan" | "violet" | "emerald" | "none";
  onClick?: () => void;
}

export function Card({ children, className, hover = true, glow = "none", onClick }: CardProps) {
  const glowColors = {
    indigo: "hover:shadow-indigo-500/20 hover:border-indigo-500/40",
    cyan: "hover:shadow-cyan-500/20 hover:border-cyan-500/40",
    violet: "hover:shadow-violet-500/20 hover:border-violet-500/40",
    emerald: "hover:shadow-emerald-500/20 hover:border-emerald-500/40",
    none: "hover:border-white/20",
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden",
        "shadow-xl transition-all duration-300",
        hover && "cursor-pointer hover:shadow-2xl",
        hover && glowColors[glow],
        className
      )}
    >
      {/* Subtle inner glow top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </motion.div>
  );
}
