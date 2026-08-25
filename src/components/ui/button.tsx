"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-[#1a1b20] text-[#f7f8f8] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_4px_15px_rgba(0,0,0,0.6)] hover:border-amber-500/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_8px_25px_-5px_rgba(245,158,11,0.2)] hover:bg-[#22242a] hover:scale-[1.02] active:scale-[0.98]",
      secondary:
        "bg-white/[0.03] backdrop-blur-md border border-white/10 text-[#d6d3d1] hover:bg-white/[0.06] hover:border-white/25 hover:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]",
      ghost: "text-[#a8a29e] hover:text-white hover:bg-white/5",
      outline:
        "border border-white/15 text-[#d6d3d1] hover:bg-white/5 hover:border-white/30 hover:text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
