"use client";

import { Mail, Send, Code2, ArrowUp, Phone } from "lucide-react";
import { SOCIAL_LINKS } from "@/data/portfolio-data";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export function Footer() {
  const year = new Date().getFullYear();
  const social = [
    { href: SOCIAL_LINKS.linkedin, Icon: LinkedinIcon, label: "LinkedIn" },
    { href: SOCIAL_LINKS.github, Icon: GithubIcon, label: "GitHub" },
    { href: SOCIAL_LINKS.email, Icon: () => <Mail size={16} />, label: "Email" },
    { href: `tel:${SOCIAL_LINKS.phone.replace(/\s+/g, '')}`, Icon: () => <Phone size={16} />, label: "Phone" },
    { href: SOCIAL_LINKS.telegram, Icon: TelegramIcon, label: "Telegram" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.06] bg-[#08090a] py-12 relative z-10">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#1c1917] border border-white/10 flex items-center justify-center text-[#f7f8f8] font-extrabold text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
              OB
            </div>
            <div>
              <div className="font-bold text-[#f7f8f8] text-sm">Oleh Bachara</div>
              <div className="text-[11px] font-mono text-[#a8a29e]">
                Web Developer & Technical Marketing Specialist · +48 453 315 500
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {social.map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-[#121316] border border-white/10 flex items-center justify-center text-[#a8a29e] hover:text-[#f7f8f8] hover:border-amber-500/40 hover:bg-white/5 transition-colors"
              >
                <Icon />
              </a>
            ))}

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-[#121316] border border-white/10 flex items-center justify-center text-[#a8a29e] hover:text-[#f7f8f8] hover:border-amber-500/40 hover:bg-white/5 transition-colors ml-2 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a8a29e] font-mono">
          <div>&copy; {year} Oleh Bachara. Jarosław, Podkarpackie, Poland 🇵🇱</div>
          <div className="flex items-center gap-1.5">
            <Code2 size={13} className="text-amber-500" />
            Next.js 16 · Tailwind CSS · Framer Motion
          </div>
        </div>
      </div>
    </footer>
  );
}
