// Client-side telemetry collector for Roman Deyneko Portfolio Admin Panel
// Strictly typed, 100% non-intrusive, zero-prompt, privacy-respecting diagnostics
// Runs purely passively without requesting permissions or disturbing the user

export interface HardwareTelemetry {
  cpuCores: number;
  memoryGb: number | null;
  gpuVendor: string;
  gpuRenderer: string;
  screenResolution: string;
  availableResolution: string;
  viewport: string;
  pixelRatio: number;
  colorDepth: number;
  orientation: string;
  touchSupport: boolean;
  maxTouchPoints: number;
  batteryLevel: number | null;
  batteryCharging: boolean | null;
}

export interface NetworkTelemetry {
  effectiveType: string;
  downlink: string | null;
  rtt: string | null;
  saveData: boolean;
  isOnline: boolean;
}

export interface SystemTelemetry {
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  userAgent: string;
  language: string;
  languages: string[];
  timezone: string;
  timezoneOffset: string;
  colorScheme: "dark" | "light";
  reducedMotion: boolean;
  cookiesEnabled: boolean;
  pdfViewerEnabled: boolean;
  doNotTrack: boolean;
  isBotOrHeadless: boolean;
}

export interface MarketingTelemetry {
  referrer: string;
  referrerDomain: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  landingPage: string;
  navigationType: string;
  pageLoadTimeMs: number | null;
}

export interface ClientTelemetryPayload {
  visitorId: string;
  sessionId: string;
  visitCount: number;
  firstSeenAt: string;
  isAdminDevice: boolean;
  hardware: HardwareTelemetry;
  network: NetworkTelemetry;
  system: SystemTelemetry;
  marketing: MarketingTelemetry;
}

// In-memory fallback if cookies or Web Storage are blocked by private mode or strict security policies
const storageMemoryFallback: Record<string, string> = {};

function safeGetStorage(type: "local" | "session", key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
    return storage.getItem(key);
  } catch {
    return storageMemoryFallback[`${type}_${key}`] || null;
  }
}

function safeSetStorage(type: "local" | "session", key: string, value: string): void {
  try {
    if (typeof window === "undefined") return;
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
    storage.setItem(key, value);
  } catch {
    storageMemoryFallback[`${type}_${key}`] = value;
  }
}

/**
 * Extracts GPU vendor and unmasked renderer string via WebGL debug info silently.
 * Never displays anything on screen and does not request any permission.
 */
function getGpuInfo(): { gpuVendor: string; gpuRenderer: string } {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { gpuVendor: "Unknown", gpuRenderer: "Unknown" };
  }

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) {
      return { gpuVendor: "Unavailable", gpuRenderer: "Unavailable" };
    }

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) {
      return {
        gpuVendor: gl.getParameter(gl.VENDOR) || "Generic Vendor",
        gpuRenderer: gl.getParameter(gl.RENDERER) || "Generic WebGL",
      };
    }

    const vendor = (gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) as string) || "Unknown";
    const renderer = (gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string) || "Unknown";

    return { gpuVendor: vendor, gpuRenderer: renderer };
  } catch {
    return { gpuVendor: "Unknown", gpuRenderer: "Unknown" };
  }
}

/**
 * Parses operating system and browser with versions from user-agent string.
 */
function parseClientSystem(ua: string): {
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  deviceType: "desktop" | "mobile" | "tablet";
} {
  const uaLower = ua.toLowerCase();

  // Device Type
  let deviceType: "desktop" | "mobile" | "tablet" = "desktop";
  if (/ipad|tablet|(android(?!.*mobile))/i.test(uaLower)) {
    deviceType = "tablet";
  } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(uaLower)) {
    deviceType = "mobile";
  }

  // OS & Version
  let os = "Other";
  let osVersion = "";

  if (uaLower.includes("mac os x") || uaLower.includes("macintosh")) {
    os = "macOS";
    const match = ua.match(/Mac OS X (\d+[._]\d+([._]\d+)?)/);
    if (match) {
      const v = match[1].replace(/_/g, ".");
      if (v.startsWith("15.")) osVersion = `${v} (Sequoia)`;
      else if (v.startsWith("14.")) osVersion = `${v} (Sonoma)`;
      else if (v.startsWith("13.")) osVersion = `${v} (Ventura)`;
      else if (v.startsWith("12.")) osVersion = `${v} (Monterey)`;
      else osVersion = v;
    }
  } else if (uaLower.includes("iphone") || uaLower.includes("ipad")) {
    os = uaLower.includes("ipad") ? "iPadOS" : "iOS";
    const match = ua.match(/OS (\d+[._]\d+)/);
    if (match) osVersion = match[1].replace(/_/g, ".");
  } else if (uaLower.includes("windows")) {
    os = "Windows";
    if (uaLower.includes("windows nt 10.0")) osVersion = "10 / 11";
    else if (uaLower.includes("windows nt 6.3")) osVersion = "8.1";
    else if (uaLower.includes("windows nt 6.1")) osVersion = "7";
  } else if (uaLower.includes("android")) {
    os = "Android";
    const match = ua.match(/Android (\d+(\.\d+)?)/);
    if (match) osVersion = match[1];
  } else if (uaLower.includes("linux")) {
    os = "Linux";
    if (uaLower.includes("ubuntu")) osVersion = "Ubuntu";
    else if (uaLower.includes("fedora")) osVersion = "Fedora";
  }

  // Browser & Version
  let browser = "Browser";
  let browserVersion = "";

  if (uaLower.includes("edg/")) {
    browser = "Edge";
    const m = ua.match(/Edg\/(\d+(\.\d+)?)/);
    if (m) browserVersion = m[1];
  } else if (uaLower.includes("arc/")) {
    browser = "Arc";
    const m = ua.match(/Arc\/(\d+(\.\d+)?)/);
    if (m) browserVersion = m[1];
  } else if (uaLower.includes("chrome") && !uaLower.includes("edg/")) {
    browser = "Chrome";
    const m = ua.match(/Chrome\/(\d+(\.\d+)?)/);
    if (m) browserVersion = m[1];
  } else if (uaLower.includes("safari") && !uaLower.includes("chrome")) {
    browser = "Safari";
    const m = ua.match(/Version\/(\d+(\.\d+)?)/);
    if (m) browserVersion = m[1];
  } else if (uaLower.includes("firefox")) {
    browser = "Firefox";
    const m = ua.match(/Firefox\/(\d+(\.\d+)?)/);
    if (m) browserVersion = m[1];
  } else if (uaLower.includes("opr/") || uaLower.includes("opera")) {
    browser = "Opera";
    const m = ua.match(/(OPR|Opera)\/(\d+(\.\d+)?)/);
    if (m) browserVersion = m[2];
  }

  return { os, osVersion, browser, browserVersion, deviceType };
}

/**
 * Extracts clean domain name from referrer URL.
 */
function cleanReferrerDomain(referrer: string): string {
  if (!referrer || referrer === "Direct") return "Direct";
  try {
    const url = new URL(referrer);
    return url.hostname.replace(/^www\./, "");
  } catch {
    return referrer;
  }
}

/**
 * Gathers complete, rich client telemetry safely and non-intrusively.
 * Zero user prompts, zero modal popups, zero UI lag.
 */
export async function collectClientTelemetry(currentPath: string): Promise<ClientTelemetryPayload> {
  if (typeof window === "undefined") {
    throw new Error("collectClientTelemetry must run in client browser context");
  }

  // 1. Visitor Identity & Session Tracking (Safe storage)
  let visitorId = safeGetStorage("local", "visitor_uuid");
  if (!visitorId) {
    visitorId = `vis-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    safeSetStorage("local", "visitor_uuid", visitorId);
  }

  let sessionId = safeGetStorage("session", "session_uuid");
  if (!sessionId) {
    sessionId = `sess-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    safeSetStorage("session", "session_uuid", sessionId);
  }

  let firstSeenAt = safeGetStorage("local", "visitor_first_seen");
  if (!firstSeenAt) {
    firstSeenAt = new Date().toISOString();
    safeSetStorage("local", "visitor_first_seen", firstSeenAt);
  }

  let visitCount = 1;
  const storedCount = safeGetStorage("local", "visitor_visit_count");
  if (storedCount) {
    visitCount = parseInt(storedCount, 10) || 1;
  }
  if (!safeGetStorage("session", "session_counted")) {
    if (storedCount) {
      visitCount += 1;
      safeSetStorage("local", "visitor_visit_count", visitCount.toString());
    } else {
      safeSetStorage("local", "visitor_visit_count", "1");
    }
    safeSetStorage("session", "session_counted", "true");
  }

  const isAdminDevice =
    safeGetStorage("local", "is_admin_device") === "true" ||
    (typeof document !== "undefined" && document.cookie.includes("admin_device=1"));

  // 2. Hardware & Display
  const { gpuVendor, gpuRenderer } = getGpuInfo();

  // Battery status check with 150ms safety timeout to prevent any slow async hang
  let batteryLevel: number | null = null;
  let batteryCharging: boolean | null = null;
  try {
    const nav = navigator as unknown as {
      getBattery?: () => Promise<{ level: number; charging: boolean }>;
    };
    if (typeof nav.getBattery === "function") {
      const batteryPromise = nav.getBattery();
      const timeoutPromise = new Promise<{ level: number; charging: boolean } | null>((resolve) =>
        setTimeout(() => resolve(null), 150)
      );
      const battery = await Promise.race([batteryPromise, timeoutPromise]);
      if (battery) {
        batteryLevel = Math.round(battery.level * 100);
        batteryCharging = battery.charging;
      }
    }
  } catch {
    // Battery API silently ignored if restricted or unsupported
  }

  const hardware: HardwareTelemetry = {
    cpuCores: navigator.hardwareConcurrency || 0,
    memoryGb: (navigator as unknown as { deviceMemory?: number }).deviceMemory || null,
    gpuVendor,
    gpuRenderer,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    availableResolution: `${window.screen.availWidth}x${window.screen.availHeight}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    pixelRatio: window.devicePixelRatio || 1,
    colorDepth: window.screen.colorDepth || 24,
    orientation:
      window.screen.orientation?.type ||
      (window.innerWidth > window.innerHeight ? "landscape" : "portrait"),
    touchSupport: Boolean(navigator.maxTouchPoints && navigator.maxTouchPoints > 0),
    maxTouchPoints: navigator.maxTouchPoints || 0,
    batteryLevel,
    batteryCharging,
  };

  // 3. Network Quality (Passive Network Information API, no permissions required)
  const navConn = (
    navigator as unknown as {
      connection?: {
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
        saveData?: boolean;
      };
    }
  ).connection;

  const network: NetworkTelemetry = {
    effectiveType: navConn?.effectiveType || "unknown",
    downlink: navConn?.downlink !== undefined ? `${navConn.downlink} Mbps` : null,
    rtt: navConn?.rtt !== undefined ? `${navConn.rtt} ms` : null,
    saveData: Boolean(navConn?.saveData),
    isOnline: navigator.onLine,
  };

  // 4. System & Software
  const ua = navigator.userAgent || "";
  const { os, osVersion, browser, browserVersion } = parseClientSystem(ua);

  let tz = "UTC";
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    // fallback
  }

  const offsetMin = -new Date().getTimezoneOffset();
  const offsetHours = offsetMin / 60;
  const tzOffsetStr = `UTC${offsetHours >= 0 ? `+${offsetHours}` : offsetHours}`;

  const isBotOrHeadless = Boolean(
    navigator.webdriver ||
      (window as unknown as { __nightmare?: unknown }).__nightmare ||
      (window as unknown as { _phantom?: unknown })._phantom ||
      (window as unknown as { callPhantom?: unknown }).callPhantom
  );

  const system: SystemTelemetry = {
    os,
    osVersion,
    browser,
    browserVersion,
    userAgent: ua,
    language: navigator.language || "en",
    languages: Array.from(navigator.languages || [navigator.language || "en"]),
    timezone: tz,
    timezoneOffset: tzOffsetStr,
    colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    cookiesEnabled: navigator.cookieEnabled,
    pdfViewerEnabled: Boolean((navigator as unknown as { pdfViewerEnabled?: boolean }).pdfViewerEnabled),
    doNotTrack:
      navigator.doNotTrack === "1" ||
      (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true,
    isBotOrHeadless,
  };

  // 5. Marketing, Campaign & Navigation
  let landingPage = safeGetStorage("session", "initial_landing_page");
  if (!landingPage) {
    landingPage = currentPath;
    safeSetStorage("session", "initial_landing_page", landingPage);
  }

  const rawReferrer = document.referrer || "Direct";
  let searchParams: URLSearchParams;
  try {
    searchParams = new URLSearchParams(window.location.search);
  } catch {
    searchParams = new URLSearchParams();
  }

  let navigationType = "navigate";
  let pageLoadTimeMs: number | null = null;
  try {
    const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (navEntries && navEntries.length > 0) {
      navigationType = navEntries[0].type || "navigate";
      if (navEntries[0].duration > 0) {
        pageLoadTimeMs = Math.round(navEntries[0].duration);
      }
    }
  } catch {
    // Silent fallback
  }

  const marketing: MarketingTelemetry = {
    referrer: rawReferrer,
    referrerDomain: cleanReferrerDomain(rawReferrer),
    utmSource: searchParams.get("utm_source"),
    utmMedium: searchParams.get("utm_medium"),
    utmCampaign: searchParams.get("utm_campaign"),
    utmTerm: searchParams.get("utm_term"),
    utmContent: searchParams.get("utm_content"),
    landingPage,
    navigationType,
    pageLoadTimeMs,
  };

  return {
    visitorId,
    sessionId,
    visitCount,
    firstSeenAt,
    isAdminDevice,
    hardware,
    network,
    system,
    marketing,
  };
}
