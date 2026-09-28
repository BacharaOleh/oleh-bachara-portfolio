import { NextResponse } from "next/server";
import { readJsonData, writeJsonData } from "@/lib/server-storage";
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

// Initial store - empty for clean production start
const SEED_JOURNEYS: VisitorJourney[] = [];

const STORAGE_FILE = "visitors-journeys.json";

function getStoredJourneys(): VisitorJourney[] {
  const journeys = readJsonData<VisitorJourney[]>(STORAGE_FILE, SEED_JOURNEYS);
  let hasRepairs = false;

  for (const j of journeys) {
    if (j.startedAt && !j.startedAt.includes("-") && !j.startedAt.includes(".")) {
      let datePart = "";
      if (j.id && j.id.startsWith("sess-")) {
        const parts = j.id.split("-");
        const ts = parseInt(parts[1], 36);
        if (!isNaN(ts) && ts > 1500000000000 && ts < 3000000000000) {
          datePart = new Date(ts).toLocaleDateString("sv-SE");
        }
      }
      if (!datePart) {
        datePart = new Date().toLocaleDateString("sv-SE");
      }
      j.startedAt = `${datePart} ${j.startedAt}`;
      hasRepairs = true;
    }

    if (j.lastActiveAt && !j.lastActiveAt.includes("-") && !j.lastActiveAt.includes(".")) {
      const datePart = (j.startedAt ? j.startedAt.split(" ")[0] : "") || new Date().toLocaleDateString("sv-SE");
      j.lastActiveAt = `${datePart} ${j.lastActiveAt}`;
      hasRepairs = true;
    }

    if (Array.isArray(j.steps)) {
      const fallbackDate = (j.startedAt ? j.startedAt.split(" ")[0] : "") || new Date().toLocaleDateString("sv-SE");
      for (const step of j.steps) {
        if (step.timestamp && !step.timestamp.includes("-") && !step.timestamp.includes(".")) {
          step.timestamp = `${fallbackDate} ${step.timestamp}`;
          hasRepairs = true;
        }
      }
    }
  }

  if (hasRepairs) {
    saveStoredJourneys(journeys);
  }

  return journeys;
}

function saveStoredJourneys(journeys: VisitorJourney[]): void {
  writeJsonData(STORAGE_FILE, journeys);
}

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

    // 1. Delete single journey action
    if (body.action === "delete_journey") {
      if (!body.id || typeof body.id !== "string") {
        return NextResponse.json({ success: false, error: "ID сесії обов'язковий" }, { status: 400 });
      }
      const journeys = getStoredJourneys();
      const filtered = journeys.filter((j) => j.id !== body.id);
      saveStoredJourneys(filtered);
      return NextResponse.json({ success: true, journeys: filtered });
    }

    // 2. Toggle admin status for specific journey
    if (body.action === "toggle_admin_session") {
      if (!body.id || typeof body.id !== "string") {
        return NextResponse.json({ success: false, error: "ID сесії обов'язковий" }, { status: 400 });
      }
      const journeys = getStoredJourneys();
      const existing = journeys.find((j) => j.id === body.id);
      if (existing) {
        existing.isAdminDevice = !existing.isAdminDevice;
        saveStoredJourneys(journeys);
      }
      return NextResponse.json({ success: true, journeys });
    }

    // 3. Set session admin status directly
    if (body.action === "set_session_admin") {
      if (!body.sessionId || typeof body.sessionId !== "string") {
        return NextResponse.json({ success: false, error: "sessionId обов'язковий" }, { status: 400 });
      }
      const journeys = getStoredJourneys();
      const existing = journeys.find((j) => j.id === body.sessionId);
      if (existing) {
        existing.isAdminDevice = Boolean(body.isAdmin);
        saveStoredJourneys(journeys);
      }
      return NextResponse.json({ success: true, updated: Boolean(existing) });
    }

    // 4. Clear all stored journeys
    if (body.action === "clear_all") {
      saveStoredJourneys([]);
      return NextResponse.json({ success: true, journeys: [] });
    }

    // 5. Restore journeys from backup
    if (body.action === "restore") {
      if (!Array.isArray(body.journeys)) {
        return NextResponse.json({ success: false, error: "journeys must be an array" }, { status: 400 });
      }
      saveStoredJourneys(body.journeys);
      return NextResponse.json({ success: true, journeys: body.journeys });
    }

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

    const now = new Date();
    const dateStr = now.toLocaleDateString("sv-SE"); // YYYY-MM-DD
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const fullDateTime = `${dateStr} ${timeStr}`;
    const stepDuration = Number(durationSec) || 5;

    // Look for existing session in persistent storage
    const journeys = getStoredJourneys();
    const existingIndex = journeys.findIndex((j) => j.id === sessionId);

    if (existingIndex !== -1) {
      const existing = journeys[existingIndex];

      existing.lastActiveAt = fullDateTime;
      existing.currentPath = path || existing.currentPath;
      existing.totalDurationSec += stepDuration;

      // Auto-heal startedAt if it was saved without calendar date
      if (existing.startedAt && !existing.startedAt.includes("-") && !existing.startedAt.includes(".")) {
        let datePart = "";
        if (existing.id && existing.id.startsWith("sess-")) {
          const parts = existing.id.split("-");
          const ts = parseInt(parts[1], 36);
          if (!isNaN(ts) && ts > 1500000000000 && ts < 3000000000000) {
            datePart = new Date(ts).toLocaleDateString("sv-SE");
          }
        }
        if (!datePart) datePart = dateStr;
        existing.startedAt = `${datePart} ${existing.startedAt}`;
      }

      // Ensure isAdminDevice synchronizes bidirectionally
      if (typeof isAdminDevice === "boolean") {
        existing.isAdminDevice = isAdminDevice;
      }

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
        timestamp: fullDateTime,
        durationSec: stepDuration,
        action: action || "Перегляд сторінки",
      });

      if (existing.steps.length > 100) {
        existing.steps.shift();
      }

      saveStoredJourneys(journeys);

      return NextResponse.json({ success: true, updated: true, sessionId });
    }

    // Safely and accurately determine device type
    const ua = (system?.userAgent || "").toLowerCase();
    let deviceType: "desktop" | "mobile" | "tablet" = "desktop";
    if (/ipad|tablet|(android(?!.*mobile))/i.test(ua)) {
      deviceType = "tablet";
    } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
      deviceType = "mobile";
    } else if (hardware?.touchSupport && (hardware?.maxTouchPoints || 0) > 0) {
      const viewportWidth = hardware?.viewport ? parseInt(hardware.viewport.split("x")[0], 10) : NaN;
      deviceType = !isNaN(viewportWidth) && viewportWidth < 640 ? "mobile" : "tablet";
    }

    // New visitor session journey
    const newJourney: VisitorJourney = {
      id: sessionId || `sess-${Date.now().toString(36)}`,
      visitorId: visitorId || `vis-${Date.now().toString(36)}`,
      visitCount: Number(visitCount) || 1,
      startedAt: fullDateTime,
      lastActiveAt: fullDateTime,
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
          timestamp: fullDateTime,
          durationSec: stepDuration,
          action: action || "Вхід на сайт",
        },
      ],
    };

    journeys.unshift(newJourney);

    if (journeys.length > 250) {
      journeys.pop();
    }

    saveStoredJourneys(journeys);

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

  const allJourneys = getStoredJourneys();
  let results = [...allJourneys];

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
  } else if (filter === "bots") {
    results = results.filter((item) => Boolean(item.system?.isBotOrHeadless));
  }

  // Keyword search
  if (search) {
    results = results.filter((j) => {
      const matchSessionId = (j.id || "").toLowerCase().includes(search);
      const matchVisitorId = (j.visitorId || "").toLowerCase().includes(search);
      const matchIp = (j.ip || "").toLowerCase().includes(search);
      const matchCountry = (j.country || "").toLowerCase().includes(search);
      const matchCity = (j.city || "").toLowerCase().includes(search);
      const matchPath = (j.currentPath || j.entryPath || "").toLowerCase().includes(search);
      const matchOs = (j.system?.os || j.os || "").toLowerCase().includes(search);
      const matchBrowser = (j.system?.browser || j.browser || "").toLowerCase().includes(search);
      const matchGpu = (j.hardware?.gpuRenderer || "").toLowerCase().includes(search);
      const matchReferrer = (j.marketing?.referrerDomain || j.referrer || "").toLowerCase().includes(search);
      const matchUtm = (j.marketing?.utmCampaign || "").toLowerCase().includes(search);
      const matchStartedAt = (j.startedAt || "").toLowerCase().includes(search);
      const matchLastActiveAt = (j.lastActiveAt || "").toLowerCase().includes(search);

      return (
        matchSessionId ||
        matchVisitorId ||
        matchIp ||
        matchCountry ||
        matchCity ||
        matchPath ||
        matchOs ||
        matchBrowser ||
        matchGpu ||
        matchReferrer ||
        matchUtm ||
        matchStartedAt ||
        matchLastActiveAt
      );
    });
  }

  // Statistics calculation on all stored journeys
  const externalCount = allJourneys.filter((item) => !item.isAdminDevice).length;
  const adminCount = allJourneys.filter((item) => item.isAdminDevice).length;
  const redirectedCount = allJourneys.filter((item) => Boolean(item.redirectTriggered)).length;
  const convertedCount = allJourneys.filter((item) => item.converted).length;
  const mobileCount = allJourneys.filter((item) => item.deviceType === "mobile" || item.deviceType === "tablet").length;
  const desktopCount = allJourneys.filter((item) => item.deviceType === "desktop").length;
  const botsCount = allJourneys.filter((item) => Boolean(item.system?.isBotOrHeadless)).length;

  // Breakdown aggregations
  const countryCounts: Record<string, number> = {};
  const browserCounts: Record<string, number> = {};
  const osCounts: Record<string, number> = {};

  for (const item of allJourneys) {
    const c = item.country || "Unknown";
    countryCounts[c] = (countryCounts[c] || 0) + 1;
    const b = item.system?.browser || item.browser || "Other";
    browserCounts[b] = (browserCounts[b] || 0) + 1;
    const o = item.system?.os || item.os || "Other";
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
      total: allJourneys.length,
      external: externalCount,
      admin: adminCount,
      redirected: redirectedCount,
      converted: convertedCount,
      mobile: mobileCount,
      desktop: desktopCount,
      bots: botsCount,
      topCountries,
      topBrowsers,
      topOs,
    },
  });
}
