"use client";

import { useState } from "react";
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
    work: "Work",
    matcher: "Fit Matcher",
    roi: "ROI & Impact",
    about: "About",
    contact: "Contact",
    recruiter: "⚡ Recruiter Mode",
  },
  pl: {
    work: "Realizacje",
    matcher: "Dopasowanie",
    roi: "Wartość & ROI",
    about: "O mnie",
    contact: "Kontakt",
    recruiter: "⚡ Dla Rekrutera",
  },
} as const;

export function Navbar({ lang, setLang, onOpenRecruiterModal }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const t = COPY[lang];
  const links = [
    { label: t.work, href: "#work" },
    { label: t.matcher, href: "#fit-matcher" },
    { label: t.roi, href: "#impact" },
    { label: t.about, href: "#about" },
    { label: t.contact, href: "#contact" },
  ];

  const navigate = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.09] bg-[#11100e]/85 backdrop-blur-xl">
      <div className="container-custom flex min-h-20 items-center justify-between py-4">
        {/* Brand identity */}
        <button onClick={() => navigate("#top")} className="flex items-center gap-3 text-left cursor-pointer">
          <BrandMark />
          <span>
            <span className="block text-[15px] font-semibold tracking-[-0.03em] text-[#eeece5]">
              Oleh Bachara
            </span>
            <span className="block mt-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#c4a160]">
              Web Developer / Product Platforms
            </span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#b9b4aa] transition-colors hover:text-[#eeece5] cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions: Recruiter Mode + Lang + Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Recruiter Mode Trigger */}
          <button
            onClick={onOpenRecruiterModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c4a160]/10 border border-[#c4a160]/30 hover:bg-[#c4a160]/20 text-[#c4a160] text-xs font-mono font-medium transition-colors cursor-pointer"
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
                className={`px-2 py-1 uppercase transition-colors cursor-pointer rounded-sm ${
                  lang === item ? "bg-[#eeece5] text-[#11100e] font-semibold" : "text-[#777168] hover:text-[#eeece5]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen((value) => !value)}
            className="text-[#b9b4aa] lg:hidden p-1"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="border-t border-white/[0.09] bg-[#11100e] px-6 py-6 lg:hidden" aria-label="Mobile navigation">
          <div className="container-custom flex flex-col gap-4">
            <button
              onClick={() => {
                setOpen(false);
                onOpenRecruiterModal();
              }}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#c4a160] text-[#11100e] font-semibold text-xs font-mono"
            >
              <Zap size={14} className="fill-[#11100e]" />
              <span>{t.recruiter}</span>
            </button>

            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className="text-left font-mono text-xs uppercase tracking-[0.13em] text-[#b9b4aa] hover:text-[#eeece5] py-1"
              >
                {link.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
