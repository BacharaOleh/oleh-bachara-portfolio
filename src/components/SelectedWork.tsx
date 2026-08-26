import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/data/portfolio-data";
import { CaseArtwork } from "@/components/CaseArtwork";

const COPY = {
  en: {
    eyebrow: "Selected work",
    title: "Three examples of work where technical decisions changed the usefulness of a platform.",
    read: "Read case study",
    projects: [
      { id: "reh4mat-ecosystem", number: "01", title: "Reh4mat — product catalogue ecosystem", description: "Improving a group of corporate websites and product catalogues across PL, UA and EU markets.", result: "+40% organic traffic reported for the main site during the relevant measurement period." },
      { id: "tech-infrastructure", number: "02", title: "Platform migration & performance recovery", description: "Planning and supporting platform migrations while reducing page weight and mobile performance bottlenecks.", result: "Selected mobile pages improved from approximately 45 to 90+ in PageSpeed testing." },
      { id: "telegram-auth-bridge", number: "03", title: "Telegram authentication integration", description: "A PHP-based authentication and webhook integration connecting a Telegram flow with a web application.", result: "Signed payload validation, session handling and database synchronization." },
    ],
  },
  pl: {
    eyebrow: "Wybrane realizacje",
    title: "Trzy projekty, w których decyzje techniczne wpłynęły na użyteczność platformy.",
    read: "Zobacz case study",
    projects: [
      { id: "reh4mat-ecosystem", number: "01", title: "Reh4mat — ekosystem katalogów produktów", description: "Rozwój grupy serwisów korporacyjnych i katalogów produktów dla rynków PL, UA i UE.", result: "+40% ruchu organicznego na głównej stronie w opisywanym okresie pomiarowym." },
      { id: "tech-infrastructure", number: "02", title: "Migracja platformy i poprawa wydajności", description: "Planowanie i wsparcie migracji platform wraz z ograniczaniem wagi stron i problemów mobilnych.", result: "Na wybranych stronach mobilnych wynik PageSpeed wzrósł z około 45 do 90+." },
      { id: "telegram-auth-bridge", number: "03", title: "Integracja uwierzytelniania Telegram", description: "Integracja oparta na PHP, łącząca proces logowania Telegram z aplikacją webową i webhookami.", result: "Walidacja podpisanych danych, obsługa sesji i synchronizacja bazy danych." },
    ],
  },
} as const;

export function SelectedWork({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  return (
    <section id="work" className="scroll-mt-20 py-24 sm:py-32 lg:py-40">
      <div className="container-custom">
        <div className="grid gap-10 border-b editorial-rule pb-12 lg:grid-cols-12">
          <p className="kicker lg:col-span-3">{t.eyebrow}</p>
          <h2 className="display-lg max-w-4xl text-[#eeece5] lg:col-span-8">{t.title}</h2>
        </div>
        <div className="mt-2">
          {t.projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="case-row group">
              <p className="case-row__number">{project.number}</p>
              <div>
                <h3 className="case-row__title">{project.title}</h3>
                <p className="case-row__description">{project.description}</p>
              </div>
              <div className="flex flex-col">
                <p className="case-row__result">{project.result}</p>
                <span className="case-row__link">{t.read}<ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
              </div>
            </Link>
          ))}
        </div>
        <div className="case-cover grid gap-4 md:grid-cols-3">
          {t.projects.map((project) => <CaseArtwork key={project.id} id={project.id} index={project.number} label={project.title} />)}
        </div>
      </div>
    </section>
  );
}
