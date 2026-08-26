"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import type { Lang } from "@/data/portfolio-data";

const COPY = {
  en: { work: "Work", about: "About", contact: "Contact" },
  pl: { work: "Realizacje", about: "O mnie", contact: "Kontakt" },
} as const;

export function Navbar({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const t = COPY[lang];
  const links = [{ label: t.work, href: "#work" }, { label: t.about, href: "#about" }, { label: t.contact, href: "#contact" }];
  const navigate = (href: string) => { setOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.09] bg-[#11100e]/82 backdrop-blur-xl">
      <div className="container-custom flex min-h-20 items-center justify-between py-4">
        <button onClick={() => navigate("#top")} className="flex items-center gap-3 text-left">
          <BrandMark />
          <span><span className="block text-[15px] font-semibold tracking-[-0.03em] text-[#eeece5]">Oleh Bachara</span><span className="block mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#c4a160]">Web Developer / Product Platforms</span></span>
        </button>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => <button key={link.href} onClick={() => navigate(link.href)} className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#b9b4aa] transition-colors hover:text-[#eeece5]">{link.label}</button>)}
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex border border-white/[0.14] p-0.5 font-mono text-[10px] tracking-[0.08em]">
            {(["en", "pl"] as Lang[]).map((item) => <button key={item} type="button" onClick={() => setLang(item)} className={`px-2 py-1 uppercase transition-colors ${lang === item ? "bg-[#eeece5] text-[#11100e]" : "text-[#777168] hover:text-[#eeece5]"}`}>{item}</button>)}
          </div>
          <button onClick={() => setOpen((value) => !value)} className="text-[#b9b4aa] md:hidden" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </div>
      {open && <nav className="border-t border-white/[0.09] bg-[#11100e] px-6 py-6 md:hidden" aria-label="Mobile navigation"><div className="container-custom flex flex-col gap-5">{links.map((link) => <button key={link.href} onClick={() => navigate(link.href)} className="text-left font-mono text-[11px] uppercase tracking-[0.13em] text-[#b9b4aa]">{link.label}</button>)}</div></nav>}
    </header>
  );
}
