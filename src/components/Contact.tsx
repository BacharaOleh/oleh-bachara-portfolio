import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/data/portfolio-data";

const COPY = {
  en: {
    eyebrow: "Contact",
    title: "Have a platform that needs a clearer technical direction?",
    body: "Email me to discuss an existing product catalogue, website performance or a technical improvement project.",
    email: "olegbachara@gmail.com",
    linkedin: "LinkedIn",
  },
  pl: {
    eyebrow: "Kontakt",
    title: "Masz platformę, która potrzebuje lepszego kierunku technicznego?",
    body: "Napisz do mnie, aby porozmawiać o istniejącym katalogu produktów, wydajności strony lub projekcie technicznego rozwoju.",
    email: "olegbachara@gmail.com",
    linkedin: "LinkedIn",
  },
} as const;

interface ContactProps {
  lang: Lang;
}

export function Contact({ lang }: ContactProps) {
  const t = COPY[lang];
  return (
    <section id="contact" className="scroll-mt-20 py-24 sm:py-32 lg:py-40">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="kicker lg:col-span-3">{t.eyebrow}</p>
          <div className="lg:col-span-9">
            <h2 className="display-lg max-w-5xl text-[#eeece5]">{t.title}</h2>
            <p className="editorial-copy mt-8 max-w-2xl">{t.body}</p>
            <div className="mt-12 flex flex-col gap-5 border-t editorial-rule pt-6 sm:flex-row sm:items-center sm:gap-10">
            <a
              href="mailto:olegbachara@gmail.com"
              className="inline-flex items-center gap-2 font-display text-2xl tracking-[-0.035em] text-[#eeece5] transition-colors hover:text-[#c4a160]"
            >
              {t.email}
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://linkedin.com/in/olegh-bachara"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#b9b4aa] transition-colors hover:text-[#eeece5]"
            >
              {t.linkedin}
              <ArrowUpRight size={16} />
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
