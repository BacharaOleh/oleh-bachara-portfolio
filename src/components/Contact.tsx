import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/data/portfolio-data";

const COPY = {
  en: {
    eyebrow: "Contact",
    title: "Have an engineering or hardware project that needs architectural direction?",
    body: "Email me to discuss robotics, embedded firmware on ESP32-C6, industrial edge gateways, or MES software.",
    email: "m.pnikut@gmail.com",
    github: "GitHub",
  },
  pl: {
    eyebrow: "Kontakt",
    title: "Masz projekt inżynierski lub hardware potrzebujący kierunku architektonicznego?",
    body: "Napisz do mnie, aby porozmawiać o robotyce, firmware ESP32-C6, przemysłowych bramkach edge lub oprogramowaniu MES.",
    email: "m.pnikut@gmail.com",
    github: "GitHub",
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
              href="mailto:m.pnikut@gmail.com"
              className="inline-flex items-center gap-2 font-display text-2xl tracking-[-0.035em] text-[#eeece5] transition-colors hover:text-[#c4a160]"
            >
              {t.email}
              <ArrowUpRight size={16} />
            </a>
            <a
              href="https://github.com/NeKoRoM"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#b9b4aa] transition-colors hover:text-[#eeece5]"
            >
              {t.github}
              <ArrowUpRight size={16} />
            </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
