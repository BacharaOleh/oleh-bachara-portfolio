import { NextResponse } from "next/server";
import type {
  HardwareTelemetry,
  NetworkTelemetry,
  SystemTelemetry,
  MarketingTelemetry,
} from "@/lib/visitor-telemetry";

export const dynamic = "force-dynamic";

export interface JourneyStep {
  path: string;
  timestamp: string;
  durationSec: number;
  action?: string;
}

export interface VisitorJourney {
  id: string; // Session ID
  visitorId: string;
  visitCount: number;
  startedAt: string;
  lastActiveAt: string;
  totalDurationSec: number;
  entryPath: string;
  currentPath: string;
  referrer: string;
  isAdminDevice: boolean;
  ip: string;
  country: string;
  countryCode?: string;
  city?: string;
  region?: string;
  timezone?: string;
  timezoneOffset?: string;
  deviceType: "desktop" | "mobile" | "tablet";
  browser?: string;
  os?: string;
  screenResolution?: string;
  hardware?: HardwareTelemetry;
  network?: NetworkTelemetry;
  system?: SystemTelemetry;
  marketing?: MarketingTelemetry;
  redirectTriggered?: {
    from: string;
    to: string;
    rule: string;
    timestamp: string;
  };
  steps: JourneyStep[];
  converted: boolean;
}

const COUNTRY_NAMES: Record<string, string> = {
  PL: "Poland 🇵🇱",
  UA: "Ukraine 🇺🇦",
  DE: "Germany 🇩🇪",
  US: "United States 🇺🇸",
  GB: "United Kingdom 🇬🇧",
  NL: "Netherlands 🇳🇱",
  FR: "France 🇫🇷",
  CZ: "Czech Republic 🇨🇿",
  SE: "Sweden 🇸🇪",
  CH: "Switzerland 🇨🇭",
  CA: "Canada 🇨🇦",
  ES: "Spain 🇪🇸",
  IT: "Italy 🇮🇹",
  AT: "Austria 🇦🇹",
  NO: "Norway 🇳🇴",
  DK: "Denmark 🇩🇰",
  FI: "Finland 🇫🇮",
  IE: "Ireland 🇮🇪",
  BE: "Belgium 🇧🇪",
  IL: "Israel 🇮🇱",
  JP: "Japan 🇯🇵",
  KR: "South Korea 🇰🇷",
  SG: "Singapore 🇸🇬",
  EE: "Estonia 🇪🇪",
  LV: "Latvia 🇱🇻",
  LT: "Lithuania 🇱🇹",
  RO: "Romania 🇷🇴",
  SK: "Slovakia 🇸🇰",
};

// Seeded store with realistic, comprehensive telemetry samples
const journeysStore: VisitorJourney[] = [
  {
    id: "sess-tech-recruiter-pl",
    visitorId: "vis-pl-992",
    visitCount: 2,
    startedAt: "2026-09-20 15:02",
    lastActiveAt: "2026-09-20 15:05",
    totalDurationSec: 185,
    entryPath: "/",
    currentPath: "/projects/goodvalley-automation",
    referrer: "https://www.linkedin.com/feed/",
    isAdminDevice: false,
    ip: "185.152.65.12",
    country: "Poland 🇵🇱",
    countryCode: "PL",
    city: "Gdańsk",
    region: "Pomerania",
    timezone: "Europe/Warsaw",
    timezoneOffset: "UTC+2",
    deviceType: "desktop",
    hardware: {
      cpuCores: 10,
      memoryGb: 16,
      gpuVendor: "Apple Inc.",
      gpuRenderer: "Apple M2 Pro (16-core GPU)",
      screenResolution: "2560x1440",
      availableResolution: "2560x1415",
      viewport: "1440x880",
      pixelRatio: 2,
      colorDepth: 30,
      orientation: "landscape-primary",
      touchSupport: false,
      maxTouchPoints: 0,
      batteryLevel: 92,
      batteryCharging: true,
    },
    network: {
      effectiveType: "4g",
      downlink: "35 Mbps",
      rtt: "22 ms",
      saveData: false,
      isOnline: true,
    },
    system: {
      os: "macOS",
      osVersion: "15.1 (Sequoia)",
      browser: "Chrome",
      browserVersion: "133.0",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
      language: "pl-PL",
      languages: ["pl-PL", "pl", "en-US", "en"],
      timezone: "Europe/Warsaw",
      timezoneOffset: "UTC+2",
      colorScheme: "dark",
      reducedMotion: false,
      cookiesEnabled: true,
      pdfViewerEnabled: true,
      doNotTrack: false,
      isBotOrHeadless: false,
    },
    marketing: {
      referrer: "https://www.linkedin.com/feed/",
      referrerDomain: "linkedin.com",
      utmSource: "linkedin",
      utmMedium: "profile_link",
      utmCampaign: "recruiter_outreach",
      utmTerm: "hardware_architect",
      utmContent: "lead_embed",
      landingPage: "/",
      navigationType: "navigate",
      pageLoadTimeMs: 420,
    },
    redirectTriggered: {
      from: "/",
      to: "/projects/goodvalley-automation",
      rule: "hardware_focus",
      timestamp: "15:02:03",
    },
    converted: true,
    steps: [
      { path: "/", timestamp: "15:02:01", durationSec: 2, action: "Початковий візит на сайт (LinkedIn)" },
      { path: "/projects/goodvalley-automation", timestamp: "15:02:03", durationSec: 62, action: "⚡ Перенаправлено [hardware_focus]" },
      { path: "/projects/goodvalley-automation", timestamp: "15:03:05", durationSec: 45, action: "Ознайомлення з лініями Goodvalley (+33%)" },
      { path: "/#fit-matcher", timestamp: "15:03:50", durationSec: 35, action: "Взаємодія з Fit Matcher" },
      { path: "/cv-roman-deyneko.pdf", timestamp: "15:04:25", durationSec: 40, action: "📄 Завантаження резюме (CV Download)" },
    ],
  },
  {
    id: "sess-engineering-lead-de",
    visitorId: "vis-de-412",
    visitCount: 1,
    startedAt: "2026-09-20 14:15",
    lastActiveAt: "2026-09-20 14:18",
    totalDurationSec: 190,
    entryPath: "/",
    currentPath: "/#contact",
    referrer: "https://www.google.com/search?q=embedded+freertos+architect+poland",
    isAdminDevice: false,
    ip: "91.198.174.192",
    country: "Germany 🇩🇪",
    countryCode: "DE",
    city: "Munich",
    region: "Bavaria",
    timezone: "Europe/Berlin",
    timezoneOffset: "UTC+2",
    deviceType: "desktop",
    hardware: {
      cpuCores: 16,
      memoryGb: 32,
      gpuVendor: "NVIDIA Corporation",
      gpuRenderer: "NVIDIA GeForce RTX 4080 Laptop GPU/PCIe/SSE2",
      screenResolution: "3840x2160",
      availableResolution: "3840x2112",
      viewport: "1920x1040",
      pixelRatio: 1.5,
      colorDepth: 24,
      orientation: "landscape-primary",
      touchSupport: false,
      maxTouchPoints: 0,
      batteryLevel: 100,
      batteryCharging: true,
    },
    network: {
      effectiveType: "4g",
      downlink: "50 Mbps",
      rtt: "18 ms",
      saveData: false,
      isOnline: true,
    },
    system: {
      os: "Windows",
      osVersion: "11",
      browser: "Firefox",
      browserVersion: "135.0",
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
      language: "de-DE",
      languages: ["de-DE", "de", "en-US", "en"],
      timezone: "Europe/Berlin",
      timezoneOffset: "UTC+2",
      colorScheme: "dark",
      reducedMotion: false,
      cookiesEnabled: true,
      pdfViewerEnabled: true,
      doNotTrack: true,
      isBotOrHeadless: false,
    },
    marketing: {
      referrer: "https://www.google.com/",
      referrerDomain: "google.com",
      utmSource: "organic_search",
      utmMedium: "serp",
      utmCampaign: null,
      utmTerm: "embedded freertos architect",
      utmContent: null,
      landingPage: "/",
      navigationType: "navigate",
      pageLoadTimeMs: 380,
    },
    redirectTriggered: {
      from: "/",
      to: "/?recruiter=open",
      rule: "recruiter_fasttrack",
      timestamp: "14:15:04",
    },
    converted: true,
    steps: [
      { path: "/", timestamp: "14:15:02", durationSec: 2, action: "Вхід через Google Search" },
      { path: "/?recruiter=open", timestamp: "14:15:04", durationSec: 75, action: "⚡ Активовано Recruiter Mode [recruiter_fasttrack]" },
      { path: "/projects/wfm-industrial-mes", timestamp: "14:16:19", durationSec: 65, action: "Перегляд кейсу Industrial MES" },
      { path: "/#contact", timestamp: "14:17:24", durationSec: 48, action: "💬 Клік на Telegram (@neko)" },
    ],
  },
  {
    id: "sess-mobile-guest-ua",
    visitorId: "vis-ua-771",
    visitCount: 3,
    startedAt: "2026-09-20 11:20",
    lastActiveAt: "2026-09-20 11:22",
    totalDurationSec: 110,
    entryPath: "/",
    currentPath: "/projects/embedded-mesh-iot",
    referrer: "https://t.me/c/embedded_ukraine/4820",
    isAdminDevice: false,
    ip: "178.62.204.88",
    country: "Ukraine 🇺🇦",
    countryCode: "UA",
    city: "Kyiv",
    region: "Kyiv City",
    timezone: "Europe/Kyiv",
    timezoneOffset: "UTC+3",
    deviceType: "mobile",
    hardware: {
      cpuCores: 6,
      memoryGb: 8,
      gpuVendor: "Apple Inc.",
      gpuRenderer: "Apple A18 Pro GPU",
      screenResolution: "393x852",
      availableResolution: "393x852",
      viewport: "393x740",
      pixelRatio: 3,
      colorDepth: 30,
      orientation: "portrait-primary",
      touchSupport: true,
      maxTouchPoints: 5,
      batteryLevel: 68,
      batteryCharging: false,
    },
    network: {
      effectiveType: "4g",
      downlink: "18 Mbps",
      rtt: "45 ms",
      saveData: false,
      isOnline: true,
    },
    system: {
      os: "iOS",
      osVersion: "18.2",
      browser: "Safari",
      browserVersion: "18.2",
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Mobile/15E148 Safari/604.1",
      language: "uk-UA",
      languages: ["uk-UA", "uk", "en-US", "en"],
      timezone: "Europe/Kyiv",
      timezoneOffset: "UTC+3",
      colorScheme: "dark",
      reducedMotion: false,
      cookiesEnabled: true,
      pdfViewerEnabled: false,
      doNotTrack: false,
      isBotOrHeadless: false,
    },
    marketing: {
      referrer: "https://t.me/",
      referrerDomain: "t.me",
      utmSource: "telegram",
      utmMedium: "community_chat",
      utmCampaign: "esp32_mesh",
      utmTerm: null,
      utmContent: null,
      landingPage: "/",
      navigationType: "navigate",
      pageLoadTimeMs: 510,
    },
    converted: false,
    steps: [
      { path: "/", timestamp: "11:20:05", durationSec: 30, action: "Перегляд Hero та метрик" },
      { path: "/projects/embedded-mesh-iot", timestamp: "11:20:35", durationSec: 80, action: "Ознайомлення з ESP32-C6 Mesh" },
    ],
  },
  {
    id: "sess-admin-dev",
    visitorId: "vis-adm-001",
    visitCount: 15,
    startedAt: "2026-09-20 13:40",
    lastActiveAt: "2026-09-20 13:45",
    totalDurationSec: 320,
    entryPath: "/admin",
    currentPath: "/admin",
    referrer: "Direct",
    isAdminDevice: true,
    ip: "127.0.0.1",
    country: "Poland 🇵🇱",
    countryCode: "PL",
    city: "Przechlewo",
    region: "Pomerania",
    timezone: "Europe/Warsaw",
    timezoneOffset: "UTC+2",
    deviceType: "desktop",
    hardware: {
      cpuCores: 12,
      memoryGb: 32,
      gpuVendor: "Apple Inc.",
      gpuRenderer: "Apple M3 Max (30-core GPU)",
      screenResolution: "3456x2234",
      availableResolution: "3456x2192",
      viewport: "1728x1050",
      pixelRatio: 2,
      colorDepth: 30,
      orientation: "landscape-primary",
      touchSupport: false,
      maxTouchPoints: 0,
      batteryLevel: 98,
      batteryCharging: true,
    },
    network: {
      effectiveType: "4g",
      downlink: "120 Mbps",
      rtt: "12 ms",
      saveData: false,
      isOnline: true,
    },
    system: {
      os: "macOS",
      osVersion: "15.3 (Sequoia)",
      browser: "Chrome",
      browserVersion: "133.0",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
      language: "uk-UA",
      languages: ["uk-UA", "uk", "pl-PL", "pl", "en-US", "en"],
      timezone: "Europe/Warsaw",
      timezoneOffset: "UTC+2",
      colorScheme: "dark",
      reducedMotion: false,
      cookiesEnabled: true,
      pdfViewerEnabled: true,
      doNotTrack: false,
      isBotOrHeadless: false,
    },
    marketing: {
      referrer: "Direct",
      referrerDomain: "Direct",
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmTerm: null,
      utmContent: null,
      landingPage: "/admin",
      navigationType: "navigate",
      pageLoadTimeMs: 190,
    },
    converted: false,
    steps: [
      { path: "/admin", timestamp: "13:40:10", durationSec: 120, action: "Вхід у Кабінет Адміністратора" },
      { path: "/admin#intent", timestamp: "13:42:10", durationSec: 100, action: "Перегляд ATS-воронки конверсій" },
      { path: "/admin#telemetry", timestamp: "13:43:50", durationSec: 100, action: "Запуск пінг-діагностики" },
    ],
  },
];

function resolveClientLocation(
  req: Request,
  systemTimezone?: string,
  acceptLanguage?: string
): {
  ip: string;
  country: string;
  countryCode: string;
  city: string;
  region: string;
} {
  // 1. IP Extraction
  const cfIp = req.headers.get("cf-connecting-ip");
  const realIp = req.headers.get("x-real-ip");
  const forwarded = req.headers.get("x-forwarded-for");
  const vercelForwarded = req.headers.get("x-vercel-forwarded-for");

  const ip =
    cfIp ||
    (forwarded ? forwarded.split(",")[0].trim() : vercelForwarded?.split(",")[0].trim()) ||
    realIp ||
    "127.0.0.1";

  // 2. Vercel & Cloudflare Edge Headers
  const headerCountry = (
    req.headers.get("x-vercel-ip-country") ||
    req.headers.get("cf-ipcountry") ||
    ""
  ).toUpperCase();
  const headerCity =
    req.headers.get("x-vercel-ip-city") || req.headers.get("cf-ipcity") || "";
  const headerRegion =
    req.headers.get("x-vercel-ip-country-region") || req.headers.get("cf-region") || "";

  if (headerCountry && COUNTRY_NAMES[headerCountry]) {
    return {
      ip,
      country: COUNTRY_NAMES[headerCountry],
      countryCode: headerCountry,
      city: headerCity ? decodeURIComponent(headerCity) : "Unknown City",
      region: headerRegion ? decodeURIComponent(headerRegion) : "",
    };
  }

  // 3. Heuristics fallback (Timezone & Language)
  const tz = (systemTimezone || "").toLowerCase();
  const lang = (acceptLanguage || "").toLowerCase();

  if (tz.includes("warsaw") || lang.startsWith("pl")) {
    return { ip, country: "Poland 🇵🇱", countryCode: "PL", city: "Warsaw / Poland", region: "Mazovia" };
  }
  if (tz.includes("kyiv") || lang.startsWith("uk")) {
    return { ip, country: "Ukraine 🇺🇦", countryCode: "UA", city: "Kyiv", region: "Kyiv City" };
  }
  if (tz.includes("berlin") || lang.startsWith("de")) {
    return { ip, country: "Germany 🇩🇪", countryCode: "DE", city: "Berlin / Germany", region: "Berlin" };
  }
  if (tz.includes("london") || lang.includes("en-gb")) {
    return { ip, country: "United Kingdom 🇬🇧", countryCode: "GB", city: "London", region: "England" };
  }
  if (tz.includes("new_york") || tz.includes("los_angeles") || lang.includes("en-us")) {
    return { ip, country: "United States 🇺🇸", countryCode: "US", city: "United States", region: "" };
  }

  return { ip, country: "Global (EN) 🌐", countryCode: "GLOBAL", city: "Unknown City", region: "" };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      sessionId,
      visitorId,
      visitCount,
      path,
      referrer,
      isAdminDevice,
      durationSec,
      action,
      redirectTriggered,
      hardware,
      network,
      system,
      marketing,
    } = body;

    const acceptLanguage = req.headers.get("accept-language") || "";
    const location = resolveClientLocation(req, system?.timezone, acceptLanguage);

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const stepDuration = Number(durationSec) || 5;

    // Look for existing session in memory
    const existingIndex = journeysStore.findIndex((j) => j.id === sessionId);

    if (existingIndex !== -1) {
      const existing = journeysStore[existingIndex];

      existing.lastActiveAt = currentTime;
      existing.currentPath = path || existing.currentPath;
      existing.totalDurationSec += stepDuration;

      // Update telemetry if newer data received
      if (hardware) existing.hardware = hardware;
      if (network) existing.network = network;
      if (system) existing.system = system;
      if (marketing) existing.marketing = marketing;

      if (redirectTriggered) {
        existing.redirectTriggered = redirectTriggered;
      }

      if (
        action &&
        (action.includes("CV") ||
          action.includes("Contact") ||
          action.includes("Telegram") ||
          action.includes("Form") ||
          action.includes("Fit Matcher"))
      ) {
        existing.converted = true;
      }

      existing.steps.push({
        path: path || existing.currentPath,
        timestamp: currentTime,
        durationSec: stepDuration,
        action: action || "Перегляд сторінки",
      });

      return NextResponse.json({ success: true, updated: true, sessionId });
    }

    // Determine device type
    const deviceType: "desktop" | "mobile" | "tablet" =
      hardware?.touchSupport && hardware?.maxTouchPoints > 0
        ? parseInt(hardware.screenResolution.split("x")[0], 10) > 768
          ? "tablet"
          : "mobile"
        : "desktop";

    // New visitor session journey
    const newJourney: VisitorJourney = {
      id: sessionId || `sess-${Date.now().toString(36)}`,
      visitorId: visitorId || `vis-${Date.now().toString(36)}`,
      visitCount: Number(visitCount) || 1,
      startedAt: currentTime,
      lastActiveAt: currentTime,
      totalDurationSec: stepDuration,
      entryPath: path || "/",
      currentPath: path || "/",
      referrer: referrer && referrer.length > 0 ? referrer : "Direct",
      isAdminDevice: Boolean(isAdminDevice),
      ip: location.ip,
      country: location.country,
      countryCode: location.countryCode,
      city: location.city,
      region: location.region,
      timezone: system?.timezone || "UTC",
      timezoneOffset: system?.timezoneOffset || "UTC+0",
      deviceType,
      browser: system?.browser || "Browser",
      os: system?.os || "Other",
      screenResolution: hardware?.screenResolution || "Unknown",
      hardware,
      network,
      system,
      marketing,
      redirectTriggered: redirectTriggered || undefined,
      converted: Boolean(
        action &&
          (action.includes("CV") || action.includes("Contact") || action.includes("Telegram"))
      ),
      steps: [
        {
          path: path || "/",
          timestamp: currentTime,
          durationSec: stepDuration,
          action: action || "Вхід на сайт",
        },
      ],
    };

    journeysStore.unshift(newJourney);

    if (journeysStore.length > 150) {
      journeysStore.pop();
    }

    return NextResponse.json({ success: true, created: true, sessionId: newJourney.id });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "all";
  const search = (searchParams.get("q") || "").toLowerCase().trim();

  let results = [...journeysStore];

  // Filtering
  if (filter === "external") {
    results = results.filter((item) => !item.isAdminDevice);
  } else if (filter === "admin") {
    results = results.filter((item) => item.isAdminDevice);
  } else if (filter === "redirected") {
    results = results.filter((item) => Boolean(item.redirectTriggered));
  } else if (filter === "converted") {
    results = results.filter((item) => item.converted);
  } else if (filter === "mobile") {
    results = results.filter((item) => item.deviceType === "mobile" || item.deviceType === "tablet");
  } else if (filter === "desktop") {
    results = results.filter((item) => item.deviceType === "desktop");
  }

  // Keyword search
  if (search) {
    results = results.filter((j) => {
      const matchIp = j.ip.toLowerCase().includes(search);
      const matchCountry = j.country.toLowerCase().includes(search);
      const matchCity = (j.city || "").toLowerCase().includes(search);
      const matchVisitorId = j.visitorId.toLowerCase().includes(search);
      const matchOs = (j.system?.os || "").toLowerCase().includes(search);
      const matchBrowser = (j.system?.browser || "").toLowerCase().includes(search);
      const matchGpu = (j.hardware?.gpuRenderer || "").toLowerCase().includes(search);
      const matchReferrer = j.referrer.toLowerCase().includes(search);
      const matchUtm = (j.marketing?.utmCampaign || "").toLowerCase().includes(search);

      return (
        matchIp ||
        matchCountry ||
        matchCity ||
        matchVisitorId ||
        matchOs ||
        matchBrowser ||
        matchGpu ||
        matchReferrer ||
        matchUtm
      );
    });
  }

  // Statistics calculation
  const externalCount = journeysStore.filter((item) => !item.isAdminDevice).length;
  const adminCount = journeysStore.filter((item) => item.isAdminDevice).length;
  const redirectedCount = journeysStore.filter((item) => Boolean(item.redirectTriggered)).length;
  const convertedCount = journeysStore.filter((item) => item.converted).length;
  const mobileCount = journeysStore.filter((item) => item.deviceType === "mobile" || item.deviceType === "tablet").length;
  const desktopCount = journeysStore.filter((item) => item.deviceType === "desktop").length;

  // Breakdown aggregations
  const countryCounts: Record<string, number> = {};
  const browserCounts: Record<string, number> = {};
  const osCounts: Record<string, number> = {};

  for (const item of journeysStore) {
    countryCounts[item.country] = (countryCounts[item.country] || 0) + 1;
    const b = item.system?.browser || "Other";
    browserCounts[b] = (browserCounts[b] || 0) + 1;
    const o = item.system?.os || "Other";
    osCounts[o] = (osCounts[o] || 0) + 1;
  }

  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([country, count]) => ({ country, count }));

  const topBrowsers = Object.entries(browserCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([browser, count]) => ({ browser, count }));

  const topOs = Object.entries(osCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([os, count]) => ({ os, count }));

  return NextResponse.json({
    success: true,
    journeys: results,
    stats: {
      total: journeysStore.length,
      external: externalCount,
      admin: adminCount,
      redirected: redirectedCount,
      converted: convertedCount,
      mobile: mobileCount,
      desktop: desktopCount,
      topCountries,
      topBrowsers,
      topOs,
    },
  });
}
