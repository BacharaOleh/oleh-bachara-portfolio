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
    indigo: "hover:border-amber-500/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)]",
    cyan: "hover:border-white/20 hover:shadow-[0_8px_30px_rgba(255,255,255,0.05)]",
    violet: "hover:border-amber-500/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)]",
    emerald: "hover:border-amber-500/40 hover:shadow-[0_8px_30px_rgba(245,158,11,0.1)]",
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
