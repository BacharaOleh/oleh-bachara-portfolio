import type { Lang } from "@/data/portfolio-data";

export type FeaturedProjectId = "reh4mat-ecosystem" | "tech-infrastructure" | "telegram-auth-bridge";

type CaseSection = { title: string; body: string };

export type CaseStudyContent = {
  index: string;
  type: string;
  period: string;
  role: string;
  scope: string;
  outcome: string;
  artLabel: string;
  sections: CaseSection[];
};

export const FEATURED_PROJECT_IDS: FeaturedProjectId[] = [
  "reh4mat-ecosystem",
  "tech-infrastructure",
  "telegram-auth-bridge",
];

export const CASE_STUDY_CONTENT: Record<Lang, Record<FeaturedProjectId, CaseStudyContent>> = {
  en: {
    "reh4mat-ecosystem": {
      index: "01",
      type: "Corporate web ecosystem",
      period: "2023-2026",
      role: "IT & Web Marketing Specialist / Web Developer",
      scope: "WordPress/PHP, catalogue UX, technical SEO, GA4",
      outcome: "+40% organic traffic reported for the main site during the relevant measurement period.",
      artLabel: "Catalogue field",
      sections: [
        { title: "Context", body: "Reh4mat operates across a group of corporate websites and product catalogues serving PL, UA and EU markets. The web estate had to make a broad and technical product range understandable for several audiences, while still supporting search visibility and day-to-day content work." },
        { title: "Challenge", body: "Catalogue structure, product-page presentation, asset weight and measurement were connected problems rather than separate tasks. Improvements had to respect an existing platform while making individual pages easier to use, easier to maintain and easier to measure." },
        { title: "Approach", body: "My work combined WordPress/PHP development with catalogue and product-page improvements, asset optimisation, structured data and GA4 conversion measurement. The process was iterative: identify a bottleneck, make one focused change and use the available measurement to inform the next decision." },
      ],
    },
    "tech-infrastructure": {
      index: "02",
      type: "Platform migration & performance",
      period: "Corporate infrastructure",
      role: "Web platform migration support",
      scope: "Hosting, DNS, SSL, assets, mobile performance",
      outcome: "Selected mobile pages improved from approximately 45 to 90+ in PageSpeed testing.",
      artLabel: "Migration path",
      sections: [
        { title: "Context", body: "This work concerned web platforms being moved to a stronger hosting setup while performance bottlenecks were addressed at the same time. Migration and optimisation had to be approached as one coordinated process, not as independent technical tasks." },
        { title: "Challenge", body: "Existing domains, database content, assets and public pages needed careful handling throughout the change. Slow mobile pages also required improvements that could be prioritised by user impact instead of by technical novelty." },
        { title: "Approach", body: "I prepared migration steps, supported DNS and SSL configuration, checked database and asset delivery, and worked on image optimisation, lazy loading and page-weight reduction. Performance checks helped focus the work on pages where improvements were meaningful for mobile visitors." },
      ],
    },
    "telegram-auth-bridge": {
      index: "03",
      type: "Authentication & webhook integration",
      period: "Freelance / pet project, 2021-2023",
      role: "PHP implementation",
      scope: "Signed payloads, sessions, webhooks, data synchronisation",
      outcome: "A focused PHP integration for signed authentication data, sessions and application/database synchronisation.",
      artLabel: "Signed signal",
      sections: [
        { title: "Context", body: "The project explored how a Telegram-based sign-in flow could connect to a web application and its database workflow. It was an opportunity to solve an identity and data-flow problem with a compact, maintainable implementation." },
        { title: "Challenge", body: "An external authentication flow is only useful when incoming data is validated, sessions are explicit and the application state remains predictable. The integration needed to keep those concerns visible rather than hiding them behind an opaque login flow." },
        { title: "Approach", body: "I implemented the PHP-side integration and worked with signed authentication data, session handling, webhook requests and application/database synchronisation. The case is intended to show implementation thinking and system boundaries, rather than claim unsupported operational metrics." },
      ],
    },
  },
  pl: {
    "reh4mat-ecosystem": {
      index: "01",
      type: "Ekosystem stron korporacyjnych",
      period: "2023-2026",
      role: "IT & Web Marketing Specialist / Web Developer",
      scope: "WordPress/PHP, UX katalogu, techniczne SEO, GA4",
      outcome: "+40% ruchu organicznego na głównej stronie w opisywanym okresie pomiarowym.",
      artLabel: "Pole katalogowe",
      sections: [
        { title: "Kontekst", body: "Reh4mat działa w ramach grupy serwisów korporacyjnych i katalogów produktów dla rynków PL, UA i UE. Platformy musiały ułatwiać odbiorcom zrozumienie szerokiej oraz technicznej oferty, jednocześnie wspierając widoczność w wyszukiwarce i codzienną pracę z treścią." },
        { title: "Wyzwanie", body: "Struktura katalogu, prezentacja stron produktów, waga zasobów i pomiar były powiązanymi problemami, a nie niezależnymi zadaniami. Usprawnienia musiały szanować istniejącą platformę, jednocześnie czyniąc strony czytelniejszymi, łatwiejszymi w utrzymaniu i mierzeniu." },
        { title: "Podejście", body: "Moja praca łączyła rozwój WordPress/PHP z usprawnieniami katalogu i stron produktów, optymalizacją zasobów, danymi strukturalnymi oraz pomiarem konwersji w GA4. Działaliśmy iteracyjnie: identyfikacja wąskiego gardła, jedna konkretna zmiana i wykorzystanie dostępnego pomiaru do kolejnej decyzji." },
      ],
    },
    "tech-infrastructure": {
      index: "02",
      type: "Migracja platformy i wydajność",
      period: "Infrastruktura korporacyjna",
      role: "Wsparcie migracji platform webowych",
      scope: "Hosting, DNS, SSL, zasoby, wydajność mobilna",
      outcome: "Na wybranych stronach mobilnych wynik PageSpeed wzrósł z około 45 do 90+.",
      artLabel: "Ścieżka migracji",
      sections: [
        { title: "Kontekst", body: "Projekt dotyczył przenoszenia platform webowych do lepszego środowiska hostingowego oraz jednoczesnego ograniczania problemów z wydajnością. Migracja i optymalizacja musiały być traktowane jako jeden skoordynowany proces, a nie niezależne zadania techniczne." },
        { title: "Wyzwanie", body: "Istniejące domeny, treści w bazie danych, zasoby i publiczne strony wymagały ostrożnego prowadzenia zmian. Wolne strony mobilne potrzebowały również popraw, które można było priorytetyzować według wpływu na użytkownika, a nie technicznej nowości." },
        { title: "Podejście", body: "Przygotowałem etapy migracji, wspierałem konfigurację DNS i SSL, sprawdzałem dostarczanie zasobów oraz pracowałem nad optymalizacją obrazów, lazy loadingiem i wagą stron. Kontrole wydajności pomogły skupić pracę na stronach, gdzie poprawa była ważna dla użytkowników mobilnych." },
      ],
    },
    "telegram-auth-bridge": {
      index: "03",
      type: "Uwierzytelnianie i integracja webhook",
      period: "Freelance / pet project, 2021-2023",
      role: "Implementacja PHP",
      scope: "Podpisane dane, sesje, webhooki, synchronizacja danych",
      outcome: "Skupiona integracja PHP dla podpisanych danych uwierzytelniających, sesji i synchronizacji aplikacji z bazą.",
      artLabel: "Podpisany sygnał",
      sections: [
        { title: "Kontekst", body: "Projekt sprawdzał, jak proces logowania oparty na Telegramie może łączyć się z aplikacją webową i przepływem danych w bazie. Była to okazja, aby rozwiązać problem tożsamości i przepływu danych przez kompaktową, łatwą w utrzymaniu implementację." },
        { title: "Wyzwanie", body: "Zewnętrzny proces uwierzytelniania jest wartościowy tylko wtedy, gdy dane wejściowe są walidowane, sesje są jawne, a stan aplikacji pozostaje przewidywalny. Integracja musiała wyraźnie pokazywać te elementy zamiast ukrywać je za nieprzejrzystym procesem logowania." },
        { title: "Podejście", body: "Zaimplementowałem integrację po stronie PHP i pracowałem z podpisanymi danymi uwierzytelniającymi, obsługą sesji, żądaniami webhook oraz synchronizacją aplikacji z bazą. Case ma pokazywać sposób myślenia i granice systemu, a nie deklarować niepotwierdzone metryki operacyjne." },
      ],
    },
  },
};
