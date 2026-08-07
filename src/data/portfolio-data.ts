// ============================================================
// Portfolio Data — Oleh Bachara
// ============================================================

export interface Stat {
  value: string;
  label: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  shortDescription: string;
  fullDescription: string;
  metrics: { label: string; value: string }[];
  accentColor: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface SkillTab {
  id: string;
  label: string;
  skills: SkillItem[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  years: string;
  description: string;
  accentColor: string;
}

export interface Language {
  name: string;
  level: string;
  flag: string;
  color: string;
}

export interface ValueCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  accentColor: string;
  span?: "wide" | "tall" | "normal";
}

// ─── CONTACT INFORMATION & SOCIAL LINKS ─────────────────────
export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/olegh-bachara",
  github: "https://github.com/olegb",
  email: "mailto:olegbachara@gmail.com",
  telegram: "https://t.me/olegh_bachara",
  phone: "+48 453 315 500",
};

// ─── STATS ──────────────────────────────────────────────────
export const STATS: Record<"en" | "pl", Stat[]> = {
  en: [
    { value: "+40%", label: "Main Site Traffic Growth", icon: "TrendingUp" },
    { value: "8+", label: "Managed Corporate Websites", icon: "Globe" },
    { value: "30-36%", label: "E-mail Engagement Rate", icon: "Mail" },
    { value: "4.5 Yrs", label: "Full-Stack Experience", icon: "Code2" },
  ],
  pl: [
    { value: "+40%", label: "Wzrost Ruchu Organicznego", icon: "TrendingUp" },
    { value: "8+", label: "Zarządzanych Stron Korporacyjnych", icon: "Globe" },
    { value: "30-36%", label: "Wskaźnik Zaangażowania Mailingu", icon: "Mail" },
    { value: "4.5 Lat", label: "Doświadczenia Web Dev & Marketing", icon: "Code2" },
  ],
};

// ─── VALUE PROPOSITION CARDS ────────────────────────────────
export const VALUE_CARDS: Record<"en" | "pl", ValueCard[]> = {
  en: [
    {
      id: "web-engineering",
      icon: "Code2",
      title: "Web Engineering & Product Showcases",
      description:
        "Custom PHP solutions, WordPress custom themes & plugins, product catalog management, and B2B/B2C product showcase platforms engineered for performance.",
      metric: "8+",
      metricLabel: "Corporate Sites",
      tags: ["PHP", "WordPress", "Product Catalogs", "JavaScript"],
      accentColor: "indigo",
      span: "wide",
    },
    {
      id: "api-automation",
      icon: "Zap",
      title: "API & Automation",
      description:
        "Telegram Bot API auth systems, REST webhooks, real-time database sync, and custom OAuth-like flows connecting web platforms to messaging ecosystems.",
      metric: "100%",
      metricLabel: "Uptime on Bots",
      tags: ["Telegram API", "PHP", "Webhooks", "REST"],
      accentColor: "cyan",
      span: "normal",
    },
    {
      id: "technical-marketing",
      icon: "BarChart3",
      title: "Technical Marketing & Analytics",
      description:
        "GA4 tracking architecture, GSC optimization, high-CTR email campaigns (30–36% engagement), and data-driven UX decisions that move traffic needles.",
      metric: "+40%",
      metricLabel: "Organic Traffic Surge",
      tags: ["GA4", "GSC", "Mailchimp", "SEO"],
      accentColor: "violet",
      span: "normal",
    },
    {
      id: "infrastructure",
      icon: "Shield",
      title: "Infrastructure & Server Migrations",
      description:
        "Zero-downtime server & domain migrations, DNS management, SSL hardening, cPanel administration, and database optimization for corporate multi-domain platforms.",
      metric: "0%",
      metricLabel: "Migration Downtime",
      tags: ["cPanel", "DNS", "SSL", "MySQL"],
      accentColor: "emerald",
      span: "wide",
    },
  ],
  pl: [
    {
      id: "web-engineering",
      icon: "Code2",
      title: "Inżynieria Web & Prezentacja Produktów",
      description:
        "Własne rozwiązania PHP, autorskie motywy i wtyczki WordPress, zarządzanie katalogami produktów oraz serwisy B2B/B2C zaprojektowane dla najwyższej wydajności.",
      metric: "8+",
      metricLabel: "Serwisów Korporacyjnych",
      tags: ["PHP", "WordPress", "Katalogi Produktów", "JavaScript"],
      accentColor: "indigo",
      span: "wide",
    },
    {
      id: "api-automation",
      icon: "Zap",
      title: "API & Automatyzacja",
      description:
        "Systemy autoryzacji Telegram Bot API, webhooki REST, synchronizacja baz danych w czasie rzeczywistym oraz własne przepływy OAuth łączące strony z komunikatorem.",
      metric: "100%",
      metricLabel: "Uptime Botów",
      tags: ["Telegram API", "PHP", "Webhooks", "REST"],
      accentColor: "cyan",
      span: "normal",
    },
    {
      id: "technical-marketing",
      icon: "BarChart3",
      title: "Marketing Techniczny & Analityka",
      description:
        "Architektura śledzenia GA4, optymalizacja Google Search Console, kampanie mailowe o wysokim CTR (30–36%) oraz decyzje UX oparte na danych.",
      metric: "+40%",
      metricLabel: "Wzrostu Ruchu Organicznego",
      tags: ["GA4", "GSC", "Mailchimp", "SEO"],
      accentColor: "violet",
      span: "normal",
    },
    {
      id: "infrastructure",
      icon: "Shield",
      title: "Infrastruktura & Migracje Serwerów",
      description:
        "Migracje serwerów i domen bez przestojów, zarządzanie DNS, zabezpieczenia SSL, administracja cPanel oraz optymalizacja baz danych dla domen korporacyjnych.",
      metric: "0%",
      metricLabel: "Przestoju podczas migracji",
      tags: ["cPanel", "DNS", "SSL", "MySQL"],
      accentColor: "emerald",
      span: "wide",
    },
  ],
};

// ─── CASE STUDIES ───────────────────────────────────────────
export const PROJECTS: Record<"en" | "pl", Project[]> = {
  en: [
    {
      id: "reh4mat-ecosystem",
      title: "Corporate Web Ecosystem & Product Catalog (+40% Traffic Surge)",
      category: "Reh4mat (2023 – 2026 / 3 Years)",
      tags: ["WordPress", "Custom PHP", "Product Catalogs", "UX/UI", "SEO", "Google Analytics"],
      shortDescription:
        "Overhauled 8 corporate websites and product catalog platforms, optimized database/assets, redesigned product showcase pages, leading to a 40% organic traffic surge.",
      fullDescription:
        "As IT & Web Marketing Specialist at Reh4mat (2023–2026), I owned the full lifecycle of 8 corporate web platforms and large product catalogs across PL/UA/EU markets. Redesigned B2B/B2C product showcase pages, optimized database structures, implemented schema markup, refactored legacy PHP, compressed assets for sub-2s load times, and established GA4 conversion funnels. Regular A/B testing of CTAs combined with email marketing automation drove email engagement to 30–36%.",
      metrics: [
        { label: "Traffic Growth", value: "+40%" },
        { label: "Email Engagement", value: "30-36%" },
        { label: "Managed Sites", value: "8" },
        { label: "Tenure", value: "3 Yrs" },
      ],
      accentColor: "indigo",
    },
    {
      id: "tech-infrastructure",
      title: "Zero-Downtime Domain & Server Migration Engine",
      category: "Corporate Infrastructure",
      tags: ["Server Migration", "DNS", "SSL", "Database Sync", "PageSpeed 90+"],
      shortDescription:
        "Executed seamless migrations of web platforms and domains to new high-performance hosts with 0% downtime for clients.",
      fullDescription:
        "Planned and executed zero-downtime server migrations for complex corporate web platforms and product catalogs. The process included pre-migration cloning, DNS cutover with propagation monitoring, database index tuning, WebP conversion, and lazy loading implementation. Post-migration PageSpeed Insights scores jumped from 45 to 90+ on mobile with zero customer-facing downtime.",
      metrics: [
        { label: "PageSpeed Before", value: "45" },
        { label: "PageSpeed After", value: "90+" },
        { label: "Downtime", value: "0%" },
        { label: "Domains Migrated", value: "8+" },
      ],
      accentColor: "emerald",
    },
    {
      id: "telegram-auth-bridge",
      title: "Telegram API Custom Auth & Realtime Data Bridge",
      category: "Freelance & Pet Project (2021 – 2023 / 1.5 Yrs)",
      tags: ["Freelance / Pet Project (2021–2023)", "PHP", "Telegram API", "Webhooks", "REST API"],
      shortDescription:
        "Developed a custom OAuth-like Telegram authentication system for web platforms with real-time database sync.",
      fullDescription:
        "Designed and implemented a custom authentication layer leveraging Telegram's Login Widget and Bot API during my freelance/pet project period (2021–2023). The system validates cryptographic hashes server-side (PHP), issues session tokens, and maintains a live sync between user actions in Telegram bots and web databases via webhooks. Includes rate limiting, replay-attack prevention, and user-state management.",
      metrics: [
        { label: "Active Users", value: "500+" },
        { label: "Auth Latency", value: "<200ms" },
        { label: "Uptime", value: "99.9%" },
        { label: "Period", value: "2021–2023" },
      ],
      accentColor: "cyan",
    },
  ],
  pl: [
    {
      id: "reh4mat-ecosystem",
      title: "Ekosystem Stron Korporacyjnych i Katalog Produktów (+40% Ruchu)",
      category: "Reh4mat (2023 – 2026 / 3 Leta)",
      tags: ["WordPress", "Autorski PHP", "Katalogi Produktów", "UX/UI", "SEO", "Google Analytics"],
      shortDescription:
        "Modernizacja 8 serwisów korporacyjnych i platform katalogowych, optymalizacja baz danych, przebudowa stron produktów, co doprowadziło do 40% wzrostu ruchu organicznego.",
      fullDescription:
        "Jako IT & Web Marketing Specialist w Reh4mat (2023–2026) odpowiadałem za pełny cykl 8 serwisów korporacyjnych i rozbudowanych katalogów produktów na rynkach PL/UA/EU. Przebudowałem prezentację produktów B2B/B2C, zoptymalizowałem struktury baz danych, wdrożyłem mikrodane schema, zrefaktoryzowałem kod PHP oraz skróciłem czas ładowania poniżej 2s. Regularne testy A/B i automatyzacja mailingu podniosły zaangażowanie do 30–36%.",
      metrics: [
        { label: "Wzrost Ruchu", value: "+40%" },
        { label: "Zaangażowanie Mailingu", value: "30-36%" },
        { label: "Strony Korporacyjne", value: "8" },
        { label: "Staż Pracy", value: "3 Leta" },
      ],
      accentColor: "indigo",
    },
    {
      id: "tech-infrastructure",
      title: "Silnik Migracji Serwerów i Domen Bez Przestojów",
      category: "Infrastruktura Korporacyjna",
      tags: ["Migracja Serwerów", "DNS", "SSL", "Synchronizacja Baz", "PageSpeed 90+"],
      shortDescription:
        "Bezproblemowe migracje serwisów internetowych i domen na nowe, wydajne serwery z 0% przestoju dla klientów.",
      fullDescription:
        "Zaplanowanie i przeprowadzenie migracji serwerowych dla złożonych platform korporacyjnych i katalogów produktów. Proces obejmował klonowanie, przełączenie DNS z monitorowaniem propagacji, optymalizację indeksów baz danych, konwersję WebP i lazy loading. Wyniki PageSpeed Insights wzrosły z 45 do 90+ na urządzeniach mobilnych.",
      metrics: [
        { label: "PageSpeed Przed", value: "45" },
        { label: "PageSpeed Po", value: "90+" },
        { label: "Czas Przestoju", value: "0%" },
        { label: "Zmigrowane Domeny", value: "8+" },
      ],
      accentColor: "emerald",
    },
    {
      id: "telegram-auth-bridge",
      title: "Autorska Autoryzacja Telegram API & Most Danych Live",
      category: "Freelance & Pet Project (2021 – 2023 / 1.5 Roku)",
      tags: ["Freelance / Pet Project (2021–2023)", "PHP", "Telegram API", "Webhooks", "REST API"],
      shortDescription:
        "Stworzenie autorskiego systemu autoryzacji Telegram typu OAuth dla serwisów www z synchronizacją bazy danych w czasie rzeczywistym.",
      fullDescription:
        "Zaprojektowanie i wdrożenie autorskiej warstwy uwierzytelniania opartej na Telegram Login Widget i Bot API w okresie freelance/pet project (2021–2023). System weryfikuje kryptograficzne хеши na serwerze (PHP), wydaje tokeny sesji i utrzymuje na żywo synchronizację akcji użytkowników Telegram z bazą danych przez webhooki.",
      metrics: [
        { label: "Użytkownicy Live", value: "500+" },
        { label: "Opóźnienie Auth", value: "<200ms" },
        { label: "Uptime", value: "99.9%" },
        { label: "Okres", value: "2021–2023" },
      ],
      accentColor: "cyan",
    },
  ],
};

// ─── TECH STACK TABS ────────────────────────────────────────
export const SKILL_TABS: Record<"en" | "pl", SkillTab[]> = {
  en: [
    {
      id: "development",
      label: "Development",
      skills: [
        { name: "PHP", level: 85 },
        { name: "JavaScript / ES6+", level: 80 },
        { name: "HTML5", level: 95 },
        { name: "CSS3 / Tailwind", level: 90 },
        { name: "REST API Design", level: 80 },
        { name: "MySQL / MariaDB", level: 75 },
        { name: "TypeScript", level: 65 },
        { name: "React / Next.js", level: 60 },
      ],
    },
    {
      id: "cms-content",
      label: "CMS & Content",
      skills: [
        { name: "WordPress Custom Themes", level: 92 },
        { name: "WordPress Custom Plugins", level: 85 },
        { name: "Product Catalog Management", level: 90 },
        { name: "Elementor (Advanced)", level: 90 },
        { name: "Gutenberg / FSE", level: 80 },
        { name: "ACF / CPT", level: 85 },
        { name: "WP Multisite", level: 75 },
      ],
    },
    {
      id: "analytics-marketing",
      label: "Analytics & Marketing",
      skills: [
        { name: "Google Analytics 4", level: 88 },
        { name: "Google Search Console", level: 85 },
        { name: "Technical SEO", level: 82 },
        { name: "Yandex Metrika", level: 75 },
        { name: "Mailchimp / SARE", level: 80 },
        { name: "Conversion Rate Optimization", level: 78 },
        { name: "A/B Testing", level: 72 },
      ],
    },
    {
      id: "design-tools",
      label: "Design & Tools",
      skills: [
        { name: "Adobe Photoshop", level: 80 },
        { name: "UI/UX Wireframing", level: 75 },
        { name: "Figma (Basics)", level: 65 },
        { name: "Git / GitHub", level: 78 },
        { name: "cPanel / WHM", level: 88 },
        { name: "DNS Management", level: 85 },
        { name: "Linux CLI", level: 72 },
      ],
    },
  ],
  pl: [
    {
      id: "development",
      label: "Programowanie",
      skills: [
        { name: "PHP", level: 85 },
        { name: "JavaScript / ES6+", level: 80 },
        { name: "HTML5", level: 95 },
        { name: "CSS3 / Tailwind", level: 90 },
        { name: "REST API Design", level: 80 },
        { name: "MySQL / MariaDB", level: 75 },
        { name: "TypeScript", level: 65 },
        { name: "React / Next.js", level: 60 },
      ],
    },
    {
      id: "cms-content",
      label: "CMS & Treść",
      skills: [
        { name: "Autorskie Motywy WordPress", level: 92 },
        { name: "Autorskie Wtyczki WordPress", level: 85 },
        { name: "Zarządzanie Katalogami Produktów", level: 90 },
        { name: "Elementor (Zaawansowany)", level: 90 },
        { name: "Gutenberg / FSE", level: 80 },
        { name: "ACF / CPT", level: 85 },
        { name: "WP Multisite", level: 75 },
      ],
    },
    {
      id: "analytics-marketing",
      label: "Analityka & Marketing",
      skills: [
        { name: "Google Analytics 4", level: 88 },
        { name: "Google Search Console", level: 85 },
        { name: "SEO Techniczne", level: 82 },
        { name: "Yandex Metrika", level: 75 },
        { name: "Mailchimp / SARE", level: 80 },
        { name: "Optymalizacja Konwersji (CRO)", level: 78 },
        { name: "Testy A/B", level: 72 },
      ],
    },
    {
      id: "design-tools",
      label: "Design & Narzędzia",
      skills: [
        { name: "Adobe Photoshop", level: 80 },
        { name: "Makiety UI/UX", level: 75 },
        { name: "Figma (Podstawy)", level: 65 },
        { name: "Git / GitHub", level: 78 },
        { name: "cPanel / WHM", level: 88 },
        { name: "Zarządzanie DNS", level: 85 },
        { name: "Linux CLI", level: 72 },
      ],
    },
  ],
};

// ─── EDUCATION & EXPERIENCE ─────────────────────────────────
export const EDUCATION: Record<"en" | "pl", EducationItem[]> = {
  en: [
    {
      degree: "Magister Zarządzania",
      field: "M.Sc. Management",
      institution: "PANS w Jarosławiu",
      location: "Jarosław, Poland",
      years: "2025 – Present",
      description:
        "Państwowa Akademia Nauk Stosowanych w Jarosławiu. Advanced studies in organizational management, digital marketing strategy, project management methodologies, and business process optimization.",
      accentColor: "cyan",
    },
    {
      degree: "Inżynier Informatyki",
      field: "B.Sc. Computer Science",
      institution: "PANS w Jarosławiu",
      location: "Jarosław, Poland",
      years: "2019 – 2025",
      description:
        "Państwowa Akademia Nauk Stosowanych w Jarosławiu. Core engineering coursework: algorithms & data structures, web technologies, database systems, software engineering, and computer networks.",
      accentColor: "indigo",
    },
  ],
  pl: [
    {
      degree: "Magister Zarządzania",
      field: "M.Sc. Management",
      institution: "PANS w Jarosławiu",
      location: "Jarosław, Polska",
      years: "2025 – Obecnie",
      description:
        "Państwowa Akademia Nauk Stosowanych w Jarosławiu. Studia drugiego stopnia z zakresu zarządzania organizacją, strategii marketingu cyfrowego, metodyk zarządzania projektami oraz optymalizacji procesów biznesowych.",
      accentColor: "cyan",
    },
    {
      degree: "Inżynier Informatyki",
      field: "B.Sc. Computer Science",
      institution: "PANS w Jarosławiu",
      location: "Jarosław, Polska",
      years: "2019 – 2025",
      description:
        "Państwowa Akademia Nauk Stosowanych w Jarosławiu. Studia inżynierskie: algorytmy i struktury danych, technologie webowe, systemy bazodanowe, inżynieria oprogramowania oraz sieci komputerowe.",
      accentColor: "indigo",
    },
  ],
};

export const LANGUAGES: Record<"en" | "pl", Language[]> = {
  en: [
    { name: "Polish", level: "Native", flag: "🇵🇱", color: "indigo" },
    { name: "Ukrainian", level: "Native", flag: "🇺🇦", color: "yellow" },
    { name: "Russian", level: "Native", flag: "🇷🇺", color: "slate" },
    { name: "English", level: "B1 — Professional Growth", flag: "🇬🇧", color: "cyan" },
  ],
  pl: [
    { name: "Polski", level: "Ojczysty (Native)", flag: "🇵🇱", color: "indigo" },
    { name: "Ukraiński", level: "Ojczysty (Native)", flag: "🇺🇦", color: "yellow" },
    { name: "Rosyjski", level: "Ojczysty (Native)", flag: "🇷🇺", color: "slate" },
    { name: "Angielski", level: "B1 — Rozwój Zawodowy", flag: "🇬🇧", color: "cyan" },
  ],
};

// ─── TRANSLATIONS ────────────────────────────────────────────
export const TRANSLATIONS = {
  en: {
    nav: {
      impact: "Impact",
      projects: "Projects",
      demos: "Live Demos",
      skills: "Skills",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      headline: "Bridging Code,",
      headline2: "Design & Business Growth",
      subtitle:
        "Inżynier Informatyki & Magister Zarządzania. 4.5+ years of building high-performance corporate web systems, product catalogs, custom API integrations, and driving traffic growth.",
      cta_primary: "Explore Case Studies",
      cta_secondary: "Download CV (PDF)",
      cta_demo: "Test Live Telegram Auth Demo",
      available: "Available for new projects",
    },
    impact: {
      eyebrow: "Proven Impact",
      title: "Engineering & Marketing",
      highlight: "Excellence",
      subtitle: "Combining CS engineering rigor with management insights to deliver corporate web systems and product catalogs that perform and scale.",
    },
    projects: {
      eyebrow: "Production Case Studies",
      title: "Engineered for",
      highlight: "Performance & Scale",
      subtitle: "A deeper dive into corporate web ecosystems, product catalog platforms, custom API bridges, and zero-downtime server migrations.",
    },
    demos: {
      eyebrow: "Interactive Lab & Live Demos",
      title: "Direct System",
      highlight: "Demonstrations",
      subtitle: "Test live interactive simulations of Telegram API auth bridges, corporate site speed engines, and multi-domain infrastructure health.",
    },
    skills: {
      eyebrow: "Core Competencies",
      title: "Tech Stack &",
      highlight: "Tooling",
      subtitle: "Battle-tested tools and frameworks utilized across 4.5+ years of commercial web development, product catalog platforms, and marketing automation.",
    },
    education: {
      eyebrow: "Academic Foundation",
      title: "Degrees &",
      highlight: "Credentials",
      subtitle: "Dual university degrees from PANS w Jarosławiu bridging software engineering with strategic management.",
    },
    contact: {
      title: "Let's Build Something",
      subtitle: "Have a project in mind? Let's talk about how I can help drive your growth.",
      name: "Full Name",
      email: "Email Address",
      projectType: "Project Type",
      message: "Your Message",
      send: "Send Message",
      rodo: "I consent to the processing of my personal data for the purpose of responding to this inquiry, in accordance with the Polish RODO (GDPR) regulations.",
      projectTypes: [
        "Corporate Web Platforms",
        "Product Catalog Systems",
        "Custom PHP Development",
        "Telegram API Integration",
        "Technical SEO & Analytics",
        "Server Migration",
        "Other",
      ],
    },
  },
  pl: {
    nav: {
      impact: "Wyniki",
      projects: "Projekty",
      demos: "Demo Live",
      skills: "Umiejętności",
      education: "Edukacja",
      contact: "Kontakt",
    },
    hero: {
      headline: "Łączę Kod,",
      headline2: "Design i Rozwój Biznesu",
      subtitle:
        "Inżynier Informatyki & Magister Zarządzania. 4,5+ lat budowania wydajnych systemów webowych, katalogów produktów, integracji API i zwiększania ruchu organicznego.",
      cta_primary: "Zobacz projekty",
      cta_secondary: "Pobierz CV (PDF)",
      cta_demo: "Testuj Auth Telegram Live",
      available: "Dostępny dla nowych projektów",
    },
    impact: {
      eyebrow: "Mierzalne Wyniki",
      title: "Inżynieria Web &",
      highlight: "Marketing Techniczny",
      subtitle: "Połączenie wiedzy informatycznej i zarządzania biznesowego dla tworzenia wydajnych serwisów korporacyjnych i katalogów produktów.",
    },
    projects: {
      eyebrow: "Studia Przypadków",
      title: "Zaprojektowane dla",
      highlight: "Wydajności i Skali",
      subtitle: "Szczegółowy wgląd w ekosystemy korporacyjne, katalogi produktów, integracje API Telegram oraz migracje serwerów bez przestojów.",
    },
    demos: {
      eyebrow: "Laboratorium Live",
      title: "Demonstracje",
      highlight: "Systemowe Live",
      subtitle: "Przetestuj interaktywne symulacje autoryzacji Telegram API, optymalizacji prędkości stron oraz statusu serwerów.",
    },
    skills: {
      eyebrow: "Kluczowe Kompetencje",
      title: "Stos Technologiczny &",
      highlight: "Narzędzia",
      subtitle: "Sprawdzone technologie wykorzystywane w ciągu 4.5+ lat komercyjnego tworzenia stron webowych, katalogów produktów i automatyzacji.",
    },
    education: {
      eyebrow: "Wykształcenie",
      title: "Dyplomy i",
      highlight: "Kwalifikacje",
      subtitle: "Dwa dyplomy PANS w Jarosławiu łączące inżynierię oprogramowania ze strategicznym zarządzaniem.",
    },
    contact: {
      title: "Zbudujmy coś razem",
      subtitle: "Masz projekt? Porozmawiajmy o tym, jak mogę pomóc w Twoim rozwoju.",
      name: "Imię i Nazwisko",
      email: "Adres E-mail",
      projectType: "Typ Projektu",
      message: "Twoja Wiadomość",
      send: "Wyślij Wiadomość",
      rodo: "Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na niniejsze zapytanie, zgodnie z przepisami RODO.",
      projectTypes: [
        "Serwisy Korporacyjne",
        "Katalogi Produktów",
        "Własne rozwiązanie PHP",
        "Integracja API Telegram",
        "SEO Techniczne i Analityka",
        "Migracja serwera",
        "Inne",
      ],
    },
  },
} as const;

export type Lang = keyof typeof TRANSLATIONS;
