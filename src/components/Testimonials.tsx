"use client";

import { motion } from "framer-motion";
import { Quote, Star, Building2, Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { type Lang } from "@/data/portfolio-data";

interface Testimonial {
  id: string;
  quote: { en: string; pl: string };
  author: string;
  role: { en: string; pl: string };
  company: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: {
      en: "Oleh completely revamped our product catalog architecture. Pages that used to take 5 seconds now load in under one. The organic traffic growth of 40% speaks for itself.",
      pl: "Oleh całkowicie przebudował architekturę naszego katalogu produktów. Strony, które ładowały się 5 sekund, teraz otwierają się w poniżej sekundy. Wzrost ruchu organicznego o 40% mówi sam za siebie.",
    },
    author: "Marketing Department",
    role: { en: "Reh4mat Group", pl: "Reh4mat Group" },
    company: "Reh4mat",
    rating: 5,
  },
  {
    id: "t2",
    quote: {
      en: "Zero downtime during our multi-domain server migration was critical for our business. Oleh planned and executed everything flawlessly — our clients didn't even notice.",
      pl: "Zero przestojów przy migracji wielu domen było kluczowe dla naszego biznesu. Oleh zaplanował i przeprowadził wszystko bezbłędnie — klienci nawet nie zauważyli.",
    },
    author: "IT Operations",
    role: { en: "Corporate Infrastructure", pl: "Infrastruktura Korporacyjna" },
    company: "Reh4mat",
    rating: 5,
  },
  {
    id: "t3",
    quote: {
      en: "The Telegram authentication bridge he built was elegant and reliable. HMAC-SHA256 validation, webhook sync — it all just works. Professional-grade engineering from day one.",
      pl: "Moduł autoryzacji Telegram, który zbudował, był elegancki i niezawodny. Walidacja HMAC-SHA256, synchronizacja webhooków — wszystko po prostu działa. Profesjonalna inżynieria od pierwszego dnia.",
    },
    author: "Development Team",
    role: { en: "API & Integration Stakeholders", pl: "Interesariusze API i Integracji" },
    company: "Project Stakeholders",
    rating: 5,
  },
];

const HEADING = {
  en: {
    eyebrow: "Professional References",
    title: "What Teams",
    highlight: "Say",
    subtitle: "Feedback from colleagues and departments I've collaborated with across corporate web engineering and technical marketing projects.",
  },
  pl: {
    eyebrow: "Referencje Zawodowe",
    title: "Co Mówią",
    highlight: "Zespoły",
    subtitle: "Opinie kolegów i działów, z którymi współpracowałem w projektach inżynierii webowej i marketingu technicznego.",
  },
};

interface TestimonialsProps {
  lang: Lang;
}

export function Testimonials({ lang }: TestimonialsProps) {
  const t = HEADING[lang];

  return (
    <section id="testimonials" className="py-20 md:py-28 relative">
      <div className="container-custom">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          highlight={t.highlight}
          subtitle={t.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard
                className="glass-card h-full p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between"
                spotlightColor="rgba(245, 158, 11, 0.08)"
              >
                {/* Quote Icon */}
                <div className="absolute top-5 right-5 text-amber-500/15">
                  <Quote size={48} strokeWidth={1} />
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-5">
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <Star key={s} size={14} className="fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-[#d6d3d1] text-sm leading-relaxed mb-8 flex-1 relative z-10">
                  &ldquo;{item.quote[lang]}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="relative z-10 pt-5 border-t border-white/[0.06] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1c1917] border border-white/10 flex items-center justify-center text-amber-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                    {item.company === "Reh4mat" ? <Building2 size={18} /> : <Briefcase size={18} />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#f7f8f8]">{item.author}</div>
                    <div className="text-[11px] font-mono text-[#a8a29e]">{item.role[lang]}</div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
