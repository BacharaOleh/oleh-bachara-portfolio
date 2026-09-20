import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface VisitorLog {
  id: string;
  timestamp: string;
  path: string;
  referrer: string;
  isAdminDevice: boolean;
  browser: string;
  os: string;
  deviceType: "desktop" | "mobile" | "tablet";
  screenResolution: string;
  country: string;
}

// In-memory store seeded with realistic initial visits
const visitorsStore: VisitorLog[] = [
  {
    id: "v-001",
    timestamp: "2026-09-20 13:42",
    path: "/",
    referrer: "https://www.linkedin.com/",
    isAdminDevice: false,
    browser: "Chrome",
    os: "macOS",
    deviceType: "desktop",
    screenResolution: "1920x1080",
    country: "Poland 🇵🇱",
  },
  {
    id: "v-002",
    timestamp: "2026-09-20 13:28",
    path: "/projects/keysnap-robotics",
    referrer: "https://www.linkedin.com/",
    isAdminDevice: false,
    browser: "Safari",
    os: "iOS",
    deviceType: "mobile",
    screenResolution: "390x844",
    country: "Poland 🇵🇱",
  },
  {
    id: "v-003",
    timestamp: "2026-09-20 12:15",
    path: "/",
    referrer: "Direct",
    isAdminDevice: true,
    browser: "Chrome",
    os: "macOS",
    deviceType: "desktop",
    screenResolution: "2560x1440",
    country: "Poland 🇵🇱",
  },
  {
    id: "v-004",
    timestamp: "2026-09-20 11:04",
    path: "/projects/wfm-industrial-mes",
    referrer: "https://google.com/",
    isAdminDevice: false,
    browser: "Firefox",
    os: "Windows",
    deviceType: "desktop",
    screenResolution: "1920x1080",
    country: "Germany 🇩🇪",
  },
  {
    id: "v-005",
    timestamp: "2026-09-20 09:50",
    path: "/admin",
    referrer: "Direct",
    isAdminDevice: true,
    browser: "Chrome",
    os: "macOS",
    deviceType: "desktop",
    screenResolution: "2560x1440",
    country: "Poland 🇵🇱",
  },
  {
    id: "v-006",
    timestamp: "2026-09-19 18:30",
    path: "/projects/embedded-mesh-iot",
    referrer: "https://t.me/",
    isAdminDevice: false,
    browser: "Chrome",
    os: "Android",
    deviceType: "mobile",
    screenResolution: "412x915",
    country: "Ukraine 🇺🇦",
  },
  {
    id: "v-007",
    timestamp: "2026-09-19 15:12",
    path: "/",
    referrer: "https://github.com/",
    isAdminDevice: false,
    browser: "Edge",
    os: "Windows",
    deviceType: "desktop",
    screenResolution: "1920x1080",
    country: "United States 🇺🇸",
  },
];

function parseUserAgent(ua: string): {
  browser: string;
  os: string;
  deviceType: "desktop" | "mobile" | "tablet";
} {
  const uaLower = ua.toLowerCase();

  // Detect Device Type
  let deviceType: "desktop" | "mobile" | "tablet" = "desktop";
  if (/ipad|tablet|(android(?!.*mobile))/i.test(uaLower)) {
    deviceType = "tablet";
  } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(uaLower)) {
    deviceType = "mobile";
  }

  // Detect OS
  let os = "Other";
  if (uaLower.includes("mac os") || uaLower.includes("macintosh")) os = "macOS";
  else if (uaLower.includes("iphone") || uaLower.includes("ipad")) os = "iOS";
  else if (uaLower.includes("windows")) os = "Windows";
  else if (uaLower.includes("android")) os = "Android";
  else if (uaLower.includes("linux")) os = "Linux";

  // Detect Browser
  let browser = "Browser";
  if (uaLower.includes("edg/")) browser = "Edge";
  else if (uaLower.includes("chrome") && !uaLower.includes("edg/")) browser = "Chrome";
  else if (uaLower.includes("safari") && !uaLower.includes("chrome")) browser = "Safari";
  else if (uaLower.includes("firefox")) browser = "Firefox";
  else if (uaLower.includes("opr/") || uaLower.includes("opera")) browser = "Opera";

  return { browser, os, deviceType };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { path, referrer, isAdminDevice, screenResolution } = body;

    const userAgent = req.headers.get("user-agent") || "";
    const acceptLanguage = req.headers.get("accept-language") || "";
    const { browser, os, deviceType } = parseUserAgent(userAgent);

    let country = "Poland 🇵🇱";
    if (acceptLanguage.toLowerCase().includes("de")) country = "Germany 🇩🇪";
    else if (acceptLanguage.toLowerCase().includes("uk") || acceptLanguage.toLowerCase().includes("ua")) country = "Ukraine 🇺🇦";
    else if (acceptLanguage.toLowerCase().includes("en-us")) country = "United States 🇺🇸";
    else if (acceptLanguage.toLowerCase().includes("en")) country = "Global (EN) 🌐";

    const newLog: VisitorLog = {
      id: `v-${Date.now().toString(36)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      path: path || "/",
      referrer: referrer && referrer.length > 0 ? referrer : "Direct",
      isAdminDevice: Boolean(isAdminDevice),
      browser,
      os,
      deviceType,
      screenResolution: screenResolution || "Unknown",
      country,
    };

    visitorsStore.unshift(newLog);

    // Keep store manageable (max 100 entries)
    if (visitorsStore.length > 100) {
      visitorsStore.pop();
    }

    return NextResponse.json({ success: true, logId: newLog.id });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "all";

  let results = [...visitorsStore];

  if (filter === "external") {
    results = results.filter((item) => !item.isAdminDevice);
  } else if (filter === "admin") {
    results = results.filter((item) => item.isAdminDevice);
  }

  const externalCount = visitorsStore.filter((item) => !item.isAdminDevice).length;
  const adminCount = visitorsStore.filter((item) => item.isAdminDevice).length;

  return NextResponse.json({
    success: true,
    visitors: results,
    stats: {
      total: visitorsStore.length,
      external: externalCount,
      admin: adminCount,
    },
  });
}
