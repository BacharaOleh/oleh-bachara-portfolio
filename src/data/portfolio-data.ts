// ============================================================
// Portfolio Data — Oleh Bachara
// ============================================================

export type Perspective = "engineer" | "business";

export interface Stat {
  value: string;
  label: string;
  icon: string;
}

// ─── DUAL-PERSPECTIVE STATS ─────────────────────────────────
export const PERSPECTIVE_STATS: Record<Perspective, Record<"en" | "pl", Stat[]>> = {
  engineer: {
    en: [
      { value: "PHP", label: "Custom WordPress & PHP", icon: "Database" },
      { value: "8+", label: "Corporate Websites Managed", icon: "Server" },
      { value: "90+", label: "PageSpeed (Selected Mobile)", icon: "Zap" },
      { value: "GA4", label: "Analytics & Search Console", icon: "Shield" },
    ],
    pl: [
      { value: "PHP", label: "Autorski WordPress & PHP", icon: "Database" },
      { value: "8+", label: "Zarządzanych Stron Korporacyjnych", icon: "Server" },
      { value: "90+", label: "PageSpeed (Wybrane Mobile)", icon: "Zap" },
      { value: "GA4", label: "Analityka & Search Console", icon: "Shield" },
    ],
  },
  business: {
    en: [
      { value: "+40%", label: "Main Site Organic Growth", icon: "TrendingUp" },
      { value: "30-36%", label: "Email Engagement Rate", icon: "Mail" },
      { value: "8+", label: "Corporate Websites Managed", icon: "Globe" },
      { value: "PL/UA/EU", label: "Regional Web Platforms", icon: "Users" },
    ],
    pl: [
      { value: "+40%", label: "Wzrost Ruchu Organicznego", icon: "TrendingUp" },
      { value: "30-36%", label: "Wskaźnik Zaangażowania Mailingu", icon: "Mail" },
      { value: "8+", label: "Zarządzanych Stron Korporacyjnych", icon: "Globe" },
      { value: "PL/UA/UE", label: "Regionalne Platformy Webowe", icon: "Users" },
    ],
  },
};

// ─── DUAL-PERSPECTIVE VALUE CARD OVERLAYS ───────────────────
export interface PerspectiveOverlay {
  metric: string;
  metricLabel: string;
  description: string;
}

export const VALUE_CARD_PERSPECTIVES: Record<Perspective, Record<"en" | "pl", Record<string, PerspectiveOverlay>>> = {
  engineer: {
    en: {
      "web-engineering": {
        metric: "PHP/WP",
        metricLabel: "Custom Development",
        description: "Custom PHP themes with optimized SQL queries, Gutenberg block structure, lazy-loaded WebP assets, and schema.org structured data for corporate web systems.",
      },
      "api-automation": {
        metric: "REST/API",
        metricLabel: "Integration Flow",
        description: "HMAC-SHA256 signature verification, Telegram Bot API webhooks, session management, and bidirectional REST data synchronization pipelines.",
      },
      "technical-marketing": {
        metric: "GA4",
        metricLabel: "Event Tracking",
        description: "Custom dataLayer pushes, conversion tracking, GTM containers, Core Web Vitals optimization, and programmatic GSC API indexing.",
      },
      "infrastructure": {
        metric: "DNS/SSL",
        metricLabel: "Migration & Config",
        description: "Planned server migration workflows, DNS configuration, rsync delta-sync, MariaDB database sync, and SSL management across corporate domains.",
      },
    },
    pl: {
      "web-engineering": {
        metric: "PHP/WP",
        metricLabel: "Autorskie Rozwiązania",
        description: "Autorskie motywy PHP z optymalnymi zapytaniami SQL, struktura bloków Gutenberg, lazy-loading WebP i mikrodane schema.org dla serwisów korporacyjnych.",
      },
      "api-automation": {
        metric: "REST/API",
        metricLabel: "Integracje i Webhooki",
        description: "Weryfikacja podpisu HMAC-SHA256, webhooki Telegram Bot API, obsługa sesji i dwukierunkowa synchronizacja danych REST.",
      },
      "technical-marketing": {
        metric: "GA4",
        metricLabel: "Śledzenie Zdarzeń",
        description: "Własne dataLayer push, śledzenie konwersji, kontenery GTM, optymalizacja Core Web Vitals i programowe indeksowanie GSC API.",
      },
      "infrastructure": {
        metric: "DNS/SSL",
        metricLabel: "Migracje i Konfiguracja",
        description: "Planowane migracje serwerów, konfiguracja DNS, rsync delta-sync, synchronizacja baz MariaDB i rotacja certyfikatów SSL na domenach korporacyjnych.",
      },
    },
  },
  business: {
    en: {
      "web-engineering": {
        metric: "8+",
        metricLabel: "Corporate Sites",
        description: "End-to-end web platform ownership across PL/UA/EU markets — product catalog redesigns, B2B/B2C showcase optimization, and conversion-focused UX decisions.",
      },
      "api-automation": {
        metric: "Telegram",
        metricLabel: "Web Authentication",
        description: "Seamless customer authentication via Telegram, connecting web platforms to messaging workflows for streamlined interaction.",
      },
      "technical-marketing": {
        metric: "+40%",
        metricLabel: "Organic Traffic Growth",
        description: "Data-driven growth strategy: GA4 conversion funnels, targeted email campaigns (30–36% engagement), and technical SEO improvements.",
      },
      "infrastructure": {
        metric: "cPanel",
        metricLabel: "Platform Continuity",
        description: "Carefully planned infrastructure transitions during multi-domain migrations, protecting uptime and maintaining business continuity.",
      },
    },
    pl: {
      "web-engineering": {
        metric: "8+",
        metricLabel: "Serwisów Korporacyjnych",
        description: "Pełna odpowiedzialność za platformy webowe na rynkach PL/UA/EU — redesign katalogów produktów, optymalizacja B2B/B2C i decyzje UX.",
      },
      "api-automation": {
        metric: "Telegram",
        metricLabel: "Autoryzacja Web",
        description: "Bezproblemowa autoryzacja klientów przez Telegram, łącząca platformy webowe z powiadomieniami i przepływem danych.",
      },
      "technical-marketing": {
        metric: "+40%",
        metricLabel: "Wzrostu Ruchu Organicznego",
        description: "Strategia wzrostu oparta na danych: lejki konwersji GA4, dedykowane kampanie mailowe (30–36% zaangażowania) i techniczne SEO.",
      },
      "infrastructure": {
        metric: "cPanel",
        metricLabel: "Ciągłość Działania",
        description: "Starannie zaplanowane przejścia infrastrukturalne podczas migracji domen, chroniące ciągłość procesów biznesowych.",
      },
    },
  },
};

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
  badge: "Core" | "Advanced" | "Proficient";
  experience: string;
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
      metric: "REST",
      metricLabel: "Webhook Sync",
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
      metricLabel: "Organic Traffic Growth",
      tags: ["GA4", "GSC", "Mailchimp", "SEO"],
      accentColor: "violet",
      span: "normal",
    },
    {
      id: "infrastructure",
      icon: "Shield",
      title: "Infrastructure & Server Migrations",
      description:
        "Server & domain migrations, DNS management, SSL hardening, cPanel administration, and database optimization for corporate multi-domain platforms.",
      metric: "cPanel",
      metricLabel: "Planned Migration",
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
      metric: "REST",
      metricLabel: "Synchronizacja Webhook",
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
        "Migracje serwerów i domen, zarządzanie DNS, zabezpieczenia SSL, administracja cPanel oraz optymalizacja baz danych dla domen korporacyjnych.",
      metric: "cPanel",
      metricLabel: "Planowane Migracje",
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
      title: "Reh4mat — Product Catalogue Ecosystem",
      category: "Reh4mat (2023 – 2026 / 3 Years)",
      tags: ["WordPress", "Custom PHP", "Product Catalogs", "UX/UI", "SEO", "Google Analytics"],
      shortDescription:
        "Improved a group of corporate websites and product catalogues across PL, UA and EU markets through WordPress/PHP development, catalogue presentation and technical measurement.",
      fullDescription:
        "From 2023 to 2026, I supported Reh4mat's web presence across corporate sites and product catalogues serving PL, UA and EU markets. My work combined WordPress/PHP development, catalogue and product-page improvements, asset optimisation, structured data and GA4 conversion measurement. During the reported measurement period, the main site recorded +40% organic traffic growth. The published case will add the exact period and evidence behind each metric.",
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
      title: "Platform Migration & Performance Recovery",
      category: "Corporate Infrastructure",
      tags: ["Server Migration", "DNS", "SSL", "Database Sync", "PageSpeed 90+"],
      shortDescription:
        "Planned and supported website migrations while reducing page weight and mobile performance bottlenecks.",
      fullDescription:
        "This work focused on moving web platforms to a stronger hosting setup while reducing performance bottlenecks. I prepared migration steps, supported DNS and SSL configuration, checked database and asset delivery, and worked on image optimisation, lazy loading and page-weight reduction. For selected mobile pages, PageSpeed results improved from approximately 45 to 90+. The case should document the tested pages and migration window rather than make a universal uptime claim.",
      metrics: [
        { label: "PageSpeed Before", value: "45" },
        { label: "PageSpeed After", value: "90+" },
        { label: "Scope", value: "Web platforms" },
        { label: "Focus", value: "Migration" },
      ],
      accentColor: "emerald",
    },
    {
      id: "telegram-auth-bridge",
      title: "Telegram Authentication Integration",
      category: "Freelance & Pet Project (2021 – 2023 / 1.5 Yrs)",
      tags: ["Freelance / Pet Project (2021–2023)", "PHP", "Telegram API", "Webhooks", "REST API"],
      shortDescription:
        "A PHP-based authentication and webhook integration connecting a Telegram flow with a web application.",
      fullDescription:
        "A technical project exploring how a Telegram-based sign-in flow can connect to a web application and database workflow. I implemented the PHP-side integration and worked with signed authentication data, session handling, webhook requests and application/database synchronisation. This case is intended to demonstrate implementation thinking; operational metrics should be included only when their source and measurement period can be shown.",
      metrics: [
        { label: "Focus", value: "Signed payloads" },
        { label: "Integration", value: "Webhooks" },
        { label: "Backend", value: "PHP" },
        { label: "Period", value: "2021–2023" },
      ],
      accentColor: "cyan",
    },
    {
      id: "portfolio-engine",
      title: "Warm Titanium Portfolio & Next.js Architecture",
      category: "Personal Engineering (2026)",
      tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "Turbopack", "Vercel"],
      shortDescription:
        "High-performance, dual-perspective portfolio system engineered with Next.js 16 App Router, custom Warm Titanium design tokens, and spring physics.",
      fullDescription:
        "Designed and built this interactive portfolio application from scratch using Next.js 16, TypeScript, and Framer Motion. Features a dual-perspective toggle system (Systems Engineering vs. Business Growth), custom noise overlay textures, interactive 3D Tilt Cards with cursor spotlights, Telegram SSO integration simulator, and sub-1s static page generation via Turbopack.",
      metrics: [
        { label: "Lighthouse Score", value: "98/100" },
        { label: "Page Load", value: "<0.8s" },
        { label: "Design System", value: "Custom" },
        { label: "Tech Stack", value: "Next.js 16" },
      ],
      accentColor: "indigo",
    },
  ],
  pl: [
    {
      id: "reh4mat-ecosystem",
      title: "Reh4mat — Ekosystem Katalogów Produktów",
      category: "Reh4mat (2023–2026)",
      tags: ["WordPress", "Autorski PHP", "Katalogi Produktów", "UX/UI", "SEO", "Google Analytics"],
      shortDescription:
        "Rozwój grupy serwisów korporacyjnych i katalogów produktów dla rynków PL, UA i UE: WordPress/PHP, prezentacja katalogu i pomiar techniczny.",
      fullDescription:
        "W latach 2023–2026 wspierałem obecność webową Reh4mat w serwisach korporacyjnych i katalogach produktów dla rynków PL, UA i UE. Moja praca łączyła rozwój WordPress/PHP, poprawę katalogu i stron produktów, optymalizację zasobów, dane strukturalne oraz pomiar konwersji w GA4. W opisywanym okresie główna strona odnotowała +40% wzrostu ruchu organicznego. Publikowany case powinien zawierać dokładny okres oraz potwierdzenie każdej metryki.",
      metrics: [
        { label: "Wzrost Ruchu", value: "+40%" },
        { label: "Zaangażowanie Mailingu", value: "30-36%" },
        { label: "Strony Korporacyjne", value: "8" },
        { label: "Okres", value: "3 lata" },
      ],
      accentColor: "indigo",
    },
    {
      id: "tech-infrastructure",
      title: "Migracja Platformy i Poprawa Wydajności",
      category: "Infrastruktura Korporacyjna",
      tags: ["Migracja Serwerów", "DNS", "SSL", "Synchronizacja Baz", "PageSpeed 90+"],
      shortDescription:
        "Planowanie i wsparcie migracji stron wraz z ograniczaniem wagi stron i problemów z wydajnością mobilną.",
      fullDescription:
        "Projekt obejmował przenoszenie platform webowych do lepszego środowiska hostingowego oraz ograniczanie problemów z wydajnością. Przygotowałem etapy migracji, wspierałem konfigurację DNS i SSL, sprawdzałem dostarczanie zasobów oraz pracowałem nad optymalizacją obrazów, lazy loadingiem i wagą stron. Na wybranych stronach mobilnych wynik PageSpeed wzrósł z około 45 do 90+. Case powinien opisać testowane strony i okno migracji, zamiast składać uniwersalną deklarację o uptime.",
      metrics: [
        { label: "PageSpeed Przed", value: "45" },
        { label: "PageSpeed Po", value: "90+" },
        { label: "Zakres", value: "Platformy webowe" },
        { label: "Obszar", value: "Migracja" },
      ],
      accentColor: "emerald",
    },
    {
      id: "telegram-auth-bridge",
      title: "Integracja Uwierzytelniania Telegram",
      category: "Freelance / pet project (2021–2023)",
      tags: ["Freelance / Pet Project (2021–2023)", "PHP", "Telegram API", "Webhooks", "REST API"],
      shortDescription:
        "Integracja oparta na PHP, łącząca proces logowania Telegram z aplikacją webową i webhookami.",
      fullDescription:
        "Projekt techniczny pokazujący, jak połączyć logowanie oparte na Telegramie z aplikacją webową i przepływem danych w bazie. Zaimplementowałem integrację po stronie PHP oraz pracowałem z podpisanymi danymi uwierzytelniającymi, obsługą sesji, żądaniami webhook i synchronizacją aplikacji z bazą. Case ma pokazywać sposób myślenia i implementację; metryki operacyjne należy dodać tylko wtedy, gdy można wskazać ich źródło i okres pomiaru.",
      metrics: [
        { label: "Zakres", value: "Podpisane dane" },
        { label: "Integracja", value: "Webhooki" },
        { label: "Backend", value: "PHP" },
        { label: "Okres", value: "2021–2023" },
      ],
      accentColor: "cyan",
    },
    {
      id: "portfolio-engine",
      title: "Architektura Portfolio Warm Titanium & Next.js 16",
      category: "Inżynieria Własna (2026)",
      tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "Turbopack", "Vercel"],
      shortDescription:
        "Wysokowydajny, dwuperspektywiczny system portfolio stworzony w oparciu o Next.js 16 App Router, кастомные токены Warm Titanium и fizykę пружин.",
      fullDescription:
        "Zaprojektowanie i budowa od podstaw interaktywnego serwisu portfolio w oparciu o Next.js 16, TypeScript oraz Framer Motion. System oferuje przełącznik perspektyw (Inżynieria Systemowa vs Rozwój Biznesu), autorską текстуру шума, интерактивное карточки 3D z подсвечивающимся курсором, симулятор Telegram SSO i czas ładowania poniżej 0.8s.",
      metrics: [
        { label: "Wynik Lighthouse", value: "98/100" },
        { label: "Czas Ładowania", value: "<0.8s" },
        { label: "Design System", value: "Autorski" },
        { label: "Stos Techniczny", value: "Next.js 16" },
      ],
      accentColor: "indigo",
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
        { name: "PHP", badge: "Core", experience: "4.5+ Yrs · Custom Themes & Plugins" },
        { name: "JavaScript / ES6+", badge: "Core", experience: "DOM, Async, Custom Scripts" },
        { name: "HTML5 / Schema.org", badge: "Core", experience: "Semantic Markup & Microdata" },
        { name: "CSS3 / Tailwind", badge: "Core", experience: "Responsive & Custom Tokens" },
        { name: "REST API Design", badge: "Advanced", experience: "Webhooks & Auth Integrations" },
        { name: "MySQL / MariaDB", badge: "Advanced", experience: "Query Tuning & Indexing" },
        { name: "TypeScript", badge: "Proficient", experience: "Next.js App Router & Typing" },
        { name: "React / Next.js", badge: "Proficient", experience: "SSR & Dynamic Routing" },
      ],
    },
    {
      id: "cms-content",
      label: "CMS & Content",
      skills: [
        { name: "WordPress Custom Themes", badge: "Core", experience: "8+ Corporate Sites Managed" },
        { name: "WordPress Custom Plugins", badge: "Core", experience: "Custom Auth & Data Bridges" },
        { name: "Product Catalog Architecture", badge: "Core", experience: "High-Volume B2B Showcase" },
        { name: "Elementor Pro (Advanced)", badge: "Core", experience: "Custom Widgets & Hooks" },
        { name: "Gutenberg / FSE", badge: "Advanced", experience: "Block Theme Customization" },
        { name: "ACF / CPT Architecture", badge: "Core", experience: "Complex Relational Schemas" },
        { name: "WP Multisite", badge: "Advanced", experience: "Multi-Domain Administration" },
      ],
    },
    {
      id: "analytics-marketing",
      label: "Analytics & Marketing",
      skills: [
        { name: "Google Analytics 4", badge: "Core", experience: "Custom Events & Conversion Funnels" },
        { name: "Google Search Console", badge: "Core", experience: "Indexing & Core Web Vitals" },
        { name: "Technical SEO", badge: "Core", experience: "PageSpeed 90+ & Structure" },
        { name: "Mailchimp / SARE", badge: "Core", experience: "30–36% Engagement Campaigns" },
        { name: "Conversion Rate Opt.", badge: "Advanced", experience: "A/B Testing & Funnel Tuning" },
      ],
    },
    {
      id: "design-tools",
      label: "Design & Infrastructure",
      skills: [
        { name: "cPanel / WHM / Linux", badge: "Core", experience: "Zero-Downtime Server Migrations" },
        { name: "DNS & SSL Hardening", badge: "Core", experience: "Multi-Domain Record Config" },
        { name: "Git / GitHub", badge: "Advanced", experience: "Version Control & Workflows" },
        { name: "Adobe Photoshop", badge: "Advanced", experience: "Asset Export & WebP Pipeline" },
        { name: "UI/UX Wireframing", badge: "Advanced", experience: "Showcase & Catalog Redesigns" },
      ],
    },
  ],
  pl: [
    {
      id: "development",
      label: "Programowanie",
      skills: [
        { name: "PHP", badge: "Core", experience: "4.5+ Lat · Autorskie Motywy i Wtyczki" },
        { name: "JavaScript / ES6+", badge: "Core", experience: "DOM, Async, Skrypty Interaktywne" },
        { name: "HTML5 / Schema.org", badge: "Core", experience: "Struktura Semantyczna i Mikrodane" },
        { name: "CSS3 / Tailwind", badge: "Core", experience: "Responsywność i Design System" },
        { name: "Projektowanie REST API", badge: "Advanced", experience: "Webhooki i Integracje Auth" },
        { name: "MySQL / MariaDB", badge: "Advanced", experience: "Optymalizacja Zapytań i Indeksów" },
        { name: "TypeScript", badge: "Proficient", experience: "Next.js App Router i Typowanie" },
        { name: "React / Next.js", badge: "Proficient", experience: "SSR i Dynamiczny Routing" },
      ],
    },
    {
      id: "cms-content",
      label: "CMS & Content",
      skills: [
        { name: "Motywy Autorskie WordPress", badge: "Core", experience: "8+ Zarządzanych Serwisów" },
        { name: "Wtyczki Autorskie WP", badge: "Core", experience: "Moduły Auth i Synchronizacji" },
        { name: "Katalogi Produktów", badge: "Core", experience: "Prezentacja Produktów B2B/B2C" },
        { name: "Elementor Pro (Zaawansowany)", badge: "Core", experience: "Własne Widgety i Haki" },
        { name: "Gutenberg / FSE", badge: "Advanced", experience: "Dostosowywanie Motywów Blokowych" },
        { name: "ACF / CPT Architektura", badge: "Core", experience: "Złożone Schematy Relacyjne" },
      ],
    },
    {
      id: "analytics-marketing",
      label: "Analityka & Marketing",
      skills: [
        { name: "Google Analytics 4", badge: "Core", experience: "Własne Zdarzenia i Lejki Konwersji" },
        { name: "Google Search Console", badge: "Core", experience: "Indeksowanie i Core Web Vitals" },
        { name: "SEO Techniczne", badge: "Core", experience: "Wynik PageSpeed 90+ i Architektura" },
        { name: "Mailchimp / SARE", badge: "Core", experience: "Kampanie Mailowe 30–36% CTR" },
        { name: "Optymalizacja Konwersji", badge: "Advanced", experience: "Testy A/B i Testowanie Lejków" },
      ],
    },
    {
      id: "design-tools",
      label: "Narzędzia & Infrastruktura",
      skills: [
        { name: "cPanel / WHM / Linux", badge: "Core", experience: "Migracje Serwerów Bez Przestojów" },
        { name: "DNS & Zabezpieczenia SSL", badge: "Core", experience: "Konfiguracja Rekordów Domen" },
        { name: "Git / GitHub", badge: "Advanced", experience: "Kontrola Wersji i Repozytoria" },
        { name: "Adobe Photoshop", badge: "Advanced", experience: "Eksport Grafiki i Pipeline WebP" },
        { name: "UI/UX Wireframing", badge: "Advanced", experience: "Projektowanie Prezentacji Produktów" },
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
      years: "2023 – 2025",
      description:
        "Państwowa Akademia Nauk Stosowanych w Jarosławiu. Advanced studies in organizational management, digital marketing strategy, project management methodologies, and business process optimization.",
      accentColor: "cyan",
    },
    {
      degree: "Inżynier Informatyki",
      field: "B.Sc. Computer Science",
      institution: "PANS w Jarosławiu",
      location: "Jarosław, Poland",
      years: "2019 – 2023",
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
      years: "2023 – 2025",
      description:
        "Państwowa Akademia Nauk Stosowanych w Jarosławiu. Studia drugiego stopnia z zakresu zarządzania organizacją, strategii marketingu cyfrowego, metodyk zarządzania projektami oraz optymalizacji procesów biznesowych.",
      accentColor: "cyan",
    },
    {
      degree: "Inżynier Informatyki",
      field: "B.Sc. Computer Science",
      institution: "PANS w Jarosławiu",
      location: "Jarosław, Polska",
      years: "2019 – 2023",
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
