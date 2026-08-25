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
      { value: "48ms", label: "Avg Database Query Latency", icon: "Database" },
      { value: "8+", label: "Production Web Systems Built", icon: "Server" },
      { value: "0%", label: "Migration Downtime Achieved", icon: "Shield" },
      { value: "90+", label: "PageSpeed Lighthouse Score", icon: "Zap" },
    ],
    pl: [
      { value: "48ms", label: "Śr. Opóźnienie Zapytań do Bazy", icon: "Database" },
      { value: "8+", label: "Systemów Webowych w Produkcji", icon: "Server" },
      { value: "0%", label: "Przestojów Podczas Migracji", icon: "Shield" },
      { value: "90+", label: "Wynik PageSpeed Lighthouse", icon: "Zap" },
    ],
  },
  business: {
    en: [
      { value: "+40%", label: "Organic Traffic Surge", icon: "TrendingUp" },
      { value: "30-36%", label: "Email Campaign CTR", icon: "Mail" },
      { value: "8+", label: "Corporate Websites Managed", icon: "Globe" },
      { value: "0%", label: "Client Loss During Migrations", icon: "Users" },
    ],
    pl: [
      { value: "+40%", label: "Wzrost Ruchu Organicznego", icon: "TrendingUp" },
      { value: "30-36%", label: "CTR Kampanii Mailowych", icon: "Mail" },
      { value: "8+", label: "Zarządzanych Stron Korporacyjnych", icon: "Globe" },
      { value: "0%", label: "Utraty Klientów Przy Migracji", icon: "Users" },
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
        metric: "sub-2s",
        metricLabel: "Page Load Time",
        description: "Custom PHP themes with optimized SQL queries, Gutenberg block architecture, lazy-loaded WebP assets, and schema.org structured data for 8+ production web systems.",
      },
      "api-automation": {
        metric: "<200ms",
        metricLabel: "Auth Latency",
        description: "HMAC-SHA256 signature verification, Telegram Bot API webhooks, stateless JWT session management, and bidirectional REST data synchronization pipelines.",
      },
      "technical-marketing": {
        metric: "GA4",
        metricLabel: "Event Architecture",
        description: "Custom dataLayer pushes, enhanced ecommerce tracking, server-side GTM containers, Core Web Vitals optimization, and programmatic GSC API indexing.",
      },
      "infrastructure": {
        metric: "0%",
        metricLabel: "Downtime Achieved",
        description: "Blue-green deployment strategy with DNS failover, rsync delta-sync, MariaDB replication streams, and automated SSL certificate rotation across 8+ domains.",
      },
    },
    pl: {
      "web-engineering": {
        metric: "<2s",
        metricLabel: "Czas Ładowania",
        description: "Autorskie motywy PHP z optymalnymi zapytaniami SQL, architektura bloków Gutenberg, lazy-loading WebP i mikrodane schema.org dla 8+ systemów produkcyjnych.",
      },
      "api-automation": {
        metric: "<200ms",
        metricLabel: "Opóźnienie Auth",
        description: "Weryfikacja podpisu HMAC-SHA256, webhooki Telegram Bot API, bezstanowe sesje JWT i dwukierunkowa synchronizacja danych REST.",
      },
      "technical-marketing": {
        metric: "GA4",
        metricLabel: "Architektura Zdarzeń",
        description: "Własne dataLayer push, śledzenie e-commerce, kontenery GTM server-side, optymalizacja Core Web Vitals i programowe indeksowanie GSC API.",
      },
      "infrastructure": {
        metric: "0%",
        metricLabel: "Osiągnięty Przestoj",
        description: "Strategia blue-green z DNS failover, rsync delta-sync, replikacja MariaDB i automatyczna rotacja certyfikatów SSL na 8+ domenach.",
      },
    },
  },
  business: {
    en: {
      "web-engineering": {
        metric: "8+",
        metricLabel: "Corporate Sites",
        description: "End-to-end web platform ownership across PL/UA/EU markets — product catalog redesigns, B2B/B2C showcase optimization, and conversion-focused UX decisions driving measurable growth.",
      },
      "api-automation": {
        metric: "100%",
        metricLabel: "Bot Uptime",
        description: "Seamless customer authentication via Telegram, reducing friction in user onboarding. Real-time data bridges connecting web platforms to messaging ecosystems for instant engagement.",
      },
      "technical-marketing": {
        metric: "+40%",
        metricLabel: "Organic Traffic Surge",
        description: "Data-driven growth strategy: GA4 conversion funnels, high-CTR email campaigns (30–36% engagement), A/B tested CTAs, and technical SEO that moves traffic needles.",
      },
      "infrastructure": {
        metric: "0%",
        metricLabel: "Client Disruption",
        description: "Invisible infrastructure transitions — zero client complaints during complex multi-domain migrations. Guaranteed business continuity while upgrading performance by 2x.",
      },
    },
    pl: {
      "web-engineering": {
        metric: "8+",
        metricLabel: "Serwisów Korporacyjnych",
        description: "Pełna odpowiedzialność za platformy webowe na rynkach PL/UA/EU — redesign katalogów produktów, optymalizacja B2B/B2C i decyzje UX napędzające mierzalny wzrost.",
      },
      "api-automation": {
        metric: "100%",
        metricLabel: "Uptime Botów",
        description: "Bezproblemowa autoryzacja klientów przez Telegram, redukcja tarcia w onboardingu. Synchronizacja w czasie rzeczywistym łącząca platformy z komunikatorem.",
      },
      "technical-marketing": {
        metric: "+40%",
        metricLabel: "Wzrostu Ruchu Organicznego",
        description: "Strategia wzrostu oparta na danych: lejki konwersji GA4, kampanie mailowe o CTR 30–36%, testy A/B i SEO techniczne napędzające ruch.",
      },
      "infrastructure": {
        metric: "0%",
        metricLabel: "Przestoju dla Klientów",
        description: "Niewidoczne przejścia infrastrukturalne — zero skarg klientów podczas złożonych migracji. Gwarantowana ciągłość biznesu przy 2x wzroście wydajności.",
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
      title: "Telegram API Auth & Realtime Data Integration",
      category: "Freelance & Pet Project (2021 – 2023 / 1.5 Yrs)",
      tags: ["Freelance / Pet Project (2021–2023)", "PHP", "Telegram API", "Webhooks", "REST API"],
      shortDescription:
        "Implementation of Telegram authentication with server-side HMAC validation and real-time database synchronization via webhooks.",
      fullDescription:
        "Engineered and integrated a passwordless user authentication module using Telegram's Login Widget and Bot API (2021–2023). The server-side module validates Telegram cryptographic signatures via HMAC-SHA256, manages secure sessions, and synchronizes user actions between messaging bots and web databases using REST webhooks.",
      metrics: [
        { label: "Active Users", value: "500+" },
        { label: "Auth Latency", value: "<200ms" },
        { label: "Uptime", value: "99.9%" },
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
      title: "Integracja Autoryzacji Telegram API & Synchronizacja Danych Live",
      category: "Freelance & Pet Project (2021 – 2023 / 1.5 Roku)",
      tags: ["Freelance / Pet Project (2021–2023)", "PHP", "Telegram API", "Webhooks", "REST API"],
      shortDescription:
        "Wdrożenie bezpiecznej autoryzacji z wykorzystaniem Telegram API oraz synchronizacji danych w czasie rzeczywistym z serwisami WWW.",
      fullDescription:
        "Zaprojektowanie i wdrożenie bezhasłowej autoryzacji użytkowników w oparciu o Telegram Login Widget oraz Telegram Bot API (2021–2023). Moduł serwerowy weryfikuje podpis kryptograficzny HMAC-SHA256, generuje bezpieczne tokeny sesji i realizuje dwukierunkową synchronizację danych poprzez webhooki REST.",
      metrics: [
        { label: "Użytkownicy Live", value: "500+" },
        { label: "Opóźnienie Auth", value: "<200ms" },
        { label: "Uptime", value: "99.9%" },
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
