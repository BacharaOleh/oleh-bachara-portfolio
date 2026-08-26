import type { Lang } from "@/data/portfolio-data";

const COPY = {
  en: { eyebrow: "About", title: "Development, product content and measurement — treated as one system.", body: "I am a Computer Science Engineer (2023) and M.Sc. in Management (2025), both from PANS in Jarosław. Since 2021, I have worked across web development and technical marketing: building with WordPress/PHP, structuring product content, improving performance and using analytics to make better decisions.", facts: ["WordPress / PHP", "Product catalogues", "Performance & migrations", "GA4 / Search Console"], footnote: "Polish, Ukrainian and Russian — native · English — working proficiency" },
  pl: { eyebrow: "O mnie", title: "Rozwój, treść produktowa i pomiar — traktowane jako jeden system.", body: "Jestem inżynierem informatyki (2023) oraz magistrem zarządzania (2025), PANS w Jarosławiu. Od 2021 roku pracuję na styku rozwoju webowego i marketingu technicznego: tworzę w WordPress/PHP, porządkuję treść produktową, poprawiam wydajność i wykorzystuję analitykę do podejmowania lepszych decyzji.", facts: ["WordPress / PHP", "Katalogi produktów", "Wydajność i migracje", "GA4 / Search Console"], footnote: "Polski, ukraiński i rosyjski — języki ojczyste · angielski — poziom roboczy" },
} as const;

export function About({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="about" className="scroll-mt-20 border-y editorial-rule py-24 sm:py-32 lg:py-40">
      <div className="container-custom grid gap-10 lg:grid-cols-12">
        <p className="kicker lg:col-span-3">{t.eyebrow}</p>
        <div className="lg:col-span-8">
          <h2 className="display-lg max-w-4xl text-[#eeece5]">{t.title}</h2>
          <p className="editorial-copy mt-9 max-w-3xl">{t.body}</p>
          <ul className="mt-12 grid max-w-4xl border-y editorial-rule sm:grid-cols-2">{t.facts.map((fact, index) => <li key={fact} className={`py-4 text-sm text-[#eeece5] ${index % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"} ${index < 2 ? "border-b editorial-rule" : ""}`}><span className="mr-3 font-mono text-xs text-[#c4a160]">0{index + 1}</span>{fact}</li>)}</ul>
          <p className="mt-8 font-mono text-[0.67rem] uppercase tracking-[0.12em] text-[#777168]">{t.footnote}</p>
        </div>
      </div>
    </section>
  );
}
