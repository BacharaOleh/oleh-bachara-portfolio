import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/data/portfolio-data";

const COPY = {
  en: { eyebrow: "Contact", title: "Have a platform that needs a clearer technical direction?", body: "Email me to discuss an existing product catalogue, website performance or a technical improvement project.", email: "Email Oleh", linkedin: "LinkedIn" },
  pl: { eyebrow: "Kontakt", title: "Masz platformę, która potrzebuje lepszego kierunku technicznego?", body: "Napisz do mnie, aby porozmawiać o istniejącym katalogu produktów, wydajności strony lub projekcie technicznego rozwoju.", email: "Napisz do Oleha", linkedin: "LinkedIn" },
} as const;

export function ContactLite({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="contact" className="border-t border-white/[0.06] py-24 sm:py-32"><div className="container-custom"><div className="max-w-4xl"><p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-400">{t.eyebrow}</p><h2 className="mt-7 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl leading-[1.08]">{t.title}</h2><p className="mt-7 max-w-2xl text-base leading-relaxed text-[#b6b1ab] sm:text-lg">{t.body}</p><div className="mt-10 flex flex-wrap gap-x-8 gap-y-4"><a href="mailto:olegbachara@gmail.com" className="inline-flex items-center gap-1.5 text-base text-white transition-colors hover:text-amber-300">{t.email}<ArrowUpRight size={16} /></a><a href="https://linkedin.com/in/olegh-bachara" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-base text-white transition-colors hover:text-amber-300">{t.linkedin}<ArrowUpRight size={16} /></a></div></div></div></section>
  );
}
