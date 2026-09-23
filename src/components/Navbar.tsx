"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import type { Lang } from "@/data/portfolio-data";

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  onOpenRecruiterModal: () => void;
}

const COPY = {
  en: {
    expos: "Vectors",
    work: "Work",
    matcher: "Fit Matcher",
    roi: "ROI & Impact",
    about: "About",
    contact: "Contact",
    recruiter: "⚡ Executive Brief",
  },
  pl: {
    expos: "Wektory",
    work: "Realizacje",
    matcher: "Dopasowanie",
    roi: "Wartość & ROI",
    about: "O mnie",
    contact: "Kontakt",
    recruiter: "⚡ Executive Brief",
  },
} as const;

export function Navbar({ lang, setLang, onOpenRecruiterModal }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const t = COPY[lang];
  const links = [
    { label: t.expos, href: "#vectors" },
    { label: t.work, href: "#work" },
    { label: t.matcher, href: "#fit-matcher" },
    { label: t.roi, href: "#impact" },
    { label: t.about, href: "#about" },
    { label: t.contact, href: "#contact" },
  ];

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navigate = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.09] bg-[#11100e]/90 backdrop-blur-xl pt-[env(safe-area-inset-top,0px)]">
      <div className="container-custom flex min-h-18 sm:min-h-20 items-center justify-between py-3.5 sm:py-4">
        {/* Brand identity */}
        <button onClick={() => navigate("#top")} className="flex items-center gap-2.5 sm:gap-3 text-left cursor-pointer min-h-[44px]">
          <BrandMark />
          <span>
            <span className="block text-[14px] sm:text-[15px] font-semibold tracking-[-0.03em] text-[#eeece5]">
              Roman Deyneko
            </span>
            <span className="block mt-0.5 font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.14em] text-[#c4a160] max-w-[130px] min-[380px]:max-w-none truncate min-[380px]:whitespace-normal">
              {lang === "pl" ? "Główny Inżynier Hardware & Full-Stack" : "Lead Hardware & Full-Stack Architect"}
            </span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#b9b4aa] transition-colors hover:text-[#eeece5] cursor-pointer min-h-[36px] flex items-center"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Recruiter Mode + Lang + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Direct CV Link */}
          <Link
            href="/cv"
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-white/[0.1] hover:border-white/[0.25] hover:bg-white/[0.04] text-[#eeece5] text-xs font-mono transition-colors min-h-[36px]"
            title="View & Download CV"
          >
            <span>CV</span>
          </Link>

          {/* Quick Recruiter Mode Trigger */}
          <button
            onClick={onOpenRecruiterModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c4a160]/10 border border-[#c4a160]/30 hover:bg-[#c4a160]/20 text-[#c4a160] text-xs font-mono font-medium transition-colors cursor-pointer min-h-[36px]"
          >
            <Zap size={13} className="fill-[#c4a160]" />
            <span>{t.recruiter}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex border border-white/[0.14] p-0.5 font-mono text-[10px] tracking-[0.08em] rounded">
            {(["en", "pl"] as Lang[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLang(item)}
                className={`px-2.5 py-1 uppercase transition-colors cursor-pointer rounded-sm min-h-[32px] flex items-center ${
                  lang === item ? "bg-[#eeece5] text-[#11100e] font-semibold" : "text-[#777168] hover:text-[#eeece5]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle (44x44px Touch Target) */}
          <button
            onClick={() => setOpen((value) => !value)}
            className="text-[#b9b4aa] hover:text-[#eeece5] lg:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer shrink-0"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Backdrop */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-[calc(65px+env(safe-area-inset-top,0px))] sm:top-[calc(73px+env(safe-area-inset-top,0px))] bg-black/75 backdrop-blur-sm z-30 lg:hidden"
            />
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="relative z-40 border-t border-white/[0.09] bg-[#11100e] px-4 py-5 lg:hidden max-h-[calc(100dvh-70px)] overflow-y-auto overscroll-contain pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]"
              aria-label="Mobile navigation"
            >
              <div className="container-custom flex flex-col gap-3">
                <button
                  onClick={() => {
                    setOpen(false);
                    onOpenRecruiterModal();
                  }}
                  className="flex items-center justify-center gap-2 min-h-[46px] py-2.5 px-4 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold text-xs font-mono transition-colors shadow-md cursor-pointer"
                >
                  <Zap size={14} className="fill-[#11100e]" />
                  <span>{t.recruiter}</span>
                </button>

                <Link
                  href="/cv"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 min-h-[44px] py-2 px-4 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[#eeece5] font-semibold text-xs font-mono hover:bg-white/[0.08] transition-colors"
                >
                  <span>📄 {lang === "pl" ? "Zobacz CV (PDF)" : "View CV (PDF)"}</span>
                </Link>

                <div className="pt-2 border-t border-white/[0.06] flex flex-col gap-1">
                  {links.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => navigate(link.href)}
                      className="text-left font-mono text-xs uppercase tracking-[0.13em] text-[#b9b4aa] hover:text-[#eeece5] min-h-[44px] flex items-center px-3 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
