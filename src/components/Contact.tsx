"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { trackIntent } from "@/lib/intent-tracker";
import { CONVERSION_OFFERS, type Lang } from "@/data/portfolio-data";

const COPY = {
  en: {
    eyebrow: "Contact & Strategic Collaboration",
    title: "Looking for a CTO, Head of R&D, Lead Embedded Architect, or Senior Automation Engineer?",
    body: "Available for CTO / Head of R&D / Lead Architect roles (Open to competitive company offers · B2B / UoP). 6+ years precision engineering domain know-how, robotics CNC, ESP32-C6 wireless mesh, and real-time industrial MES platforms. Immediate turnaround and verified ROI.",
    phone: "+48 791 265 019",
    email: "m.pnikut@gmail.com",
    telegram: "Telegram @NeKoRoM",
    whatsapp: "WhatsApp Direct",
    github: "GitHub",
    linkedin: "LinkedIn",
    callCta: "Call or WhatsApp",
  },
  pl: {
    eyebrow: "Kontakt & Współpraca Strategiczna",
    title: "Szukasz CTO, Head of R&D, Głównego Architekta Embedded lub Senior Inżyniera Automatyki?",
    body: "Dostępny na stanowiska CTO / Head of R&D / Lead Architect (Otwarte na propozycje firm · B2B / UoP). 6+ lat know-how mechaniki precyzyjnej, robotyka CNC, mesh ESP32-C6 oraz przemysłowe platformy MES. Szybki start i natychmiastowy zwrot z inwestycji.",
    phone: "+48 791 265 019",
    email: "m.pnikut@gmail.com",
    telegram: "Telegram @NeKoRoM",
    whatsapp: "WhatsApp Bezpośredni",
    github: "GitHub",
    linkedin: "LinkedIn",
    callCta: "Zadzwoń lub WhatsApp",
  },
} as const;

interface ContactProps {
  lang: Lang;
}

export function Contact({ lang }: ContactProps) {
  const t = COPY[lang];
  const offers = CONVERSION_OFFERS[lang];
  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-28 lg:py-36 overflow-hidden w-full max-w-full">
      <div className="container-custom">
        <div className="grid gap-6 sm:gap-10 lg:grid-cols-12 w-full max-w-full min-w-0">
          <p className="kicker lg:col-span-3">{t.eyebrow}</p>
          <div className="lg:col-span-9">
            <h2 className="display-lg max-w-5xl text-[#eeece5]">{t.title}</h2>
            <p className="editorial-copy mt-6 sm:mt-8 max-w-2xl">{t.body}</p>

            {/* 3 High-Value / Zero-Risk Conversion Offers */}
            <div className="mt-10 sm:mt-12 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#c4a160]">
                <Sparkles size={14} className="shrink-0" />
                <span>
                  {lang === "pl"
                    ? "Wybierz Format Współpracy o Zerowym Ryzyku:"
                    : "Select a Zero-Risk Collaboration Format:"}
                </span>
              </div>
              <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#161513] border border-white/[0.08] hover:border-[#c4a160]/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#a39c91]">
                          {offer.targetAudience}
                        </span>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#c4a160]/10 text-[#c4a160] border border-[#c4a160]/20 font-semibold">
                          {offer.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-[#eeece5] leading-snug">
                        {offer.title}
                      </h3>
                      <p className="text-xs text-[#a39c91] mt-2 leading-relaxed">
                        {offer.description}
                      </p>
                      <ul className="mt-3 space-y-1.5 text-[11px] font-mono text-[#b9b4aa]">
                        {offer.deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 shrink-0">✓</span>
                            <span className="break-words">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-5 pt-3 border-t border-white/[0.06]">
                      <a
                        href={offer.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackIntent(
                            "offer_clicked",
                            `Offer: ${offer.title}`,
                            offer.id
                          )
                        }
                        className="w-full min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#c4a160]/10 hover:bg-[#c4a160]/20 text-[#c4a160] border border-[#c4a160]/30 font-mono text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <span>{offer.actionText}</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-10 sm:mt-12 grid gap-4 sm:gap-6 border-t editorial-rule pt-8 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href="tel:+48791265019"
                onClick={() => trackIntent("contact_click_phone", "Phone Call Click", "+48 791 265 019")}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 transition-all hover:border-[#c4a160]/50 hover:bg-white/[0.04] min-h-[72px] flex flex-col justify-center"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-[#c4a160]">{t.callCta}</span>
                <p className="mt-1 sm:mt-2 font-display text-lg sm:text-xl text-[#eeece5] group-hover:text-[#c4a160] whitespace-nowrap">{t.phone}</p>
              </a>

              <a
                href="https://wa.me/48791265019"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackIntent("contact_click_whatsapp", "WhatsApp Direct Click", "+48 791 265 019")}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 transition-all hover:border-[#25D366]/50 hover:bg-white/[0.04] min-h-[72px] flex flex-col justify-center"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-[#25D366]">WhatsApp</span>
                <p className="mt-1 sm:mt-2 font-display text-lg sm:text-xl text-[#eeece5] group-hover:text-[#25D366]">{t.whatsapp}</p>
              </a>

              <a
                href="mailto:m.pnikut@gmail.com"
                onClick={() => trackIntent("contact_click_email", "Email Contact Click", "m.pnikut@gmail.com")}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 transition-all hover:border-[#c4a160]/50 hover:bg-white/[0.04] min-h-[72px] flex flex-col justify-center sm:col-span-2 lg:col-span-1"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-[#94a3b8]">Email</span>
                <p className="mt-1 sm:mt-2 font-display text-base sm:text-lg text-[#eeece5] group-hover:text-[#c4a160] break-all">{t.email}</p>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-[#b9b4aa]">
              <a
                href="https://t.me/NeKoRoM"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackIntent("contact_click_telegram", "Telegram Contact Click", "@NeKoRoM")}
                className="min-h-[44px] inline-flex items-center gap-1.5 transition-colors hover:text-[#eeece5]"
              >
                {t.telegram}
                <ArrowUpRight size={14} />
              </a>
              <a
                href="https://github.com/NeKoRoM"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackIntent("contact_click_github", "GitHub Profile Click", "https://github.com/NeKoRoM")}
                className="min-h-[44px] inline-flex items-center gap-1.5 transition-colors hover:text-[#eeece5]"
              >
                {t.github}
                <ArrowUpRight size={14} />
              </a>
              <a
                href="https://linkedin.com/in/roman-deyneko"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackIntent("contact_click_linkedin", "LinkedIn Profile Click", "https://linkedin.com/in/roman-deyneko")}
                className="min-h-[44px] inline-flex items-center gap-1.5 transition-colors hover:text-[#eeece5]"
              >
                {t.linkedin}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
