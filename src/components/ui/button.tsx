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
      "inline-flex items-center justify-center gap-2 font-sans font-medium transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:opacity-50 disabled:pointer-events-none rounded-none";

    const variants = {
      primary:
        "bg-[#eeece5] text-[#11100e] border border-[#eeece5] hover:bg-[#c4a160] hover:text-[#11100e] hover:border-[#c4a160]",
      secondary:
        "bg-transparent border border-white/20 text-[#b9b4aa] hover:border-[#c4a160] hover:text-[#eeece5]",
      ghost: "text-[#b9b4aa] hover:text-[#eeece5]",
      outline:
        "border border-white/20 text-[#eeece5] hover:bg-[#eeece5] hover:text-[#11100e]",
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
