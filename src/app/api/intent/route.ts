import { NextResponse } from "next/server";
import { readJsonData, writeJsonData } from "@/lib/server-storage";
import type { IntentEventType, IntentEventPayload } from "@/lib/intent-tracker";

export const dynamic = "force-dynamic";

export interface IntentRecord {
  id: string;
  timestamp: string;
  type: IntentEventType;
  label: string;
  details?: string;
  path: string;
  referrer: string;
  isAdminDevice: boolean;
  country: string;
}

// Initial store - empty for clean production start
const SEED_INTENT_EVENTS: IntentRecord[] = [];

const STORAGE_FILE = "recruiter-intent.json";

function getStoredIntent(): IntentRecord[] {
  const records = readJsonData<IntentRecord[]>(STORAGE_FILE, SEED_INTENT_EVENTS);
  let hasRepairs = false;

  for (const r of records) {
    if (r.timestamp && !r.timestamp.includes("-") && !r.timestamp.includes(".")) {
      let datePart = "";
      if (r.id && r.id.startsWith("int-")) {
        const parts = r.id.split("-");
        const ts = parseInt(parts[1], 36);
        if (!isNaN(ts) && ts > 1500000000000 && ts < 3000000000000) {
          datePart = new Date(ts).toLocaleDateString("sv-SE");
        }
      }
      if (!datePart) {
        datePart = new Date().toLocaleDateString("sv-SE");
      }
      r.timestamp = `${datePart} ${r.timestamp}`;
      hasRepairs = true;
    }
  }

  if (hasRepairs) {
    saveStoredIntent(records);
  }

  return records;
}

function saveStoredIntent(records: IntentRecord[]): void {
  writeJsonData(STORAGE_FILE, records);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Delete intent event
    if (body.action === "delete_event") {
      if (!body.id || typeof body.id !== "string") {
        return NextResponse.json({ success: false, error: "ID події обов'язковий" }, { status: 400 });
      }
      const records = getStoredIntent();
      const filtered = records.filter((r) => r.id !== body.id);
      saveStoredIntent(filtered);
      return NextResponse.json({ success: true, events: filtered });
    }

    // 2. Toggle admin device for intent event
    if (body.action === "toggle_admin_device") {
      if (!body.id || typeof body.id !== "string") {
        return NextResponse.json({ success: false, error: "ID події обов'язковий" }, { status: 400 });
      }
      const records = getStoredIntent();
      const existing = records.find((r) => r.id === body.id);
      if (existing) {
        existing.isAdminDevice = !existing.isAdminDevice;
        saveStoredIntent(records);
      }
      return NextResponse.json({ success: true, events: records });
    }

    // 3. Clear all intent events
    if (body.action === "clear_all") {
      saveStoredIntent([]);
      return NextResponse.json({ success: true, events: [] });
    }

    // 4. Restore intent events from backup
    if (body.action === "restore") {
      if (!Array.isArray(body.events)) {
        return NextResponse.json({ success: false, error: "events must be an array" }, { status: 400 });
      }
      saveStoredIntent(body.events);
      return NextResponse.json({ success: true, events: body.events });
    }

    const payload = body as IntentEventPayload;
    const acceptLanguage = req.headers.get("accept-language") || "";

    let country = "Poland 🇵🇱";
    if (acceptLanguage.toLowerCase().includes("de")) country = "Germany 🇩🇪";
    else if (acceptLanguage.toLowerCase().includes("uk") || acceptLanguage.toLowerCase().includes("ua")) country = "Ukraine 🇺🇦";
    else if (acceptLanguage.toLowerCase().includes("en-us")) country = "United States 🇺🇸";
    else if (acceptLanguage.toLowerCase().includes("en")) country = "Global (EN) 🌐";

    const now = new Date();
    const dateStr = now.toLocaleDateString("sv-SE");
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newRecord: IntentRecord = {
      id: `int-${Date.now().toString(36)}`,
      timestamp: `${dateStr} ${timeStr}`,
      type: payload.type,
      label: payload.label,
      details: payload.details,
      path: payload.path || "/",
      referrer: payload.referrer && payload.referrer.length > 0 ? payload.referrer : "Direct",
      isAdminDevice: Boolean(payload.isAdminDevice),
      country,
    };

    const records = getStoredIntent();
    records.unshift(newRecord);

    if (records.length > 250) {
      records.pop();
    }

    saveStoredIntent(records);

    return NextResponse.json({ success: true, recordId: newRecord.id });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "all";
  const search = (searchParams.get("q") || "").toLowerCase().trim();

  const allRecords = getStoredIntent();

  // Baseline store counts before filtering
  const totalCount = allRecords.length;
  const externalCount = allRecords.filter((r) => !r.isAdminDevice).length;
  const adminCount = allRecords.filter((r) => r.isAdminDevice).length;
  const cvCount = allRecords.filter((r) => r.type === "cv_download").length;

  let records = [...allRecords];

  if (filter === "external") {
    records = records.filter((r) => !r.isAdminDevice);
  } else if (filter === "admin") {
    records = records.filter((r) => r.isAdminDevice);
  } else if (filter === "cv") {
    records = records.filter((r) => r.type === "cv_download");
  }

  // Keyword search
  if (search) {
    records = records.filter((r) => {
      const matchId = (r.id || "").toLowerCase().includes(search);
      const matchType = (r.type || "").toLowerCase().includes(search);
      const matchLabel = (r.label || "").toLowerCase().includes(search);
      const matchDetails = (r.details || "").toLowerCase().includes(search);
      const matchCountry = (r.country || "").toLowerCase().includes(search);
      const matchReferrer = (r.referrer || "").toLowerCase().includes(search);
      const matchPath = (r.path || "").toLowerCase().includes(search);
      const matchTimestamp = (r.timestamp || "").toLowerCase().includes(search);
      return matchId || matchType || matchLabel || matchDetails || matchCountry || matchReferrer || matchPath || matchTimestamp;
    });
  }

  // Calculate High-Intent Metrics on baseline store (allRecords)
  const cvDownloads = allRecords.filter((r) => r.type === "cv_download").length;
  const recruiterModeOpens = allRecords.filter((r) => r.type === "recruiter_modal_open").length;
  const contactClicks = allRecords.filter((r) =>
    r.type.startsWith("contact_click_")
  ).length;
  const formSubmits = allRecords.filter((r) => r.type === "contact_form_submit").length;
  const fitMatcherUses = allRecords.filter((r) => r.type === "fit_matcher_used").length;

  // Funnel calculations linked to real stored sessions
  const storedJourneys = readJsonData<unknown[]>("visitors-journeys.json", []);
  const journeysCount = Array.isArray(storedJourneys) ? storedJourneys.length : 0;
  const totalIntentActions = allRecords.length;
  const impressions = Math.max(journeysCount, totalIntentActions);
  const engagedVisitors = totalIntentActions > 0
    ? Math.min(Math.max(recruiterModeOpens + fitMatcherUses, 1), impressions || totalIntentActions)
    : 0;
  const highIntentActions = cvDownloads + contactClicks + formSubmits;
  const directLeads = formSubmits + Math.round(contactClicks * 0.7);

  const conversionRate = impressions > 0
    ? `${((highIntentActions / impressions) * 100).toFixed(1)}%`
    : "0.0%";

  return NextResponse.json({
    success: true,
    events: records,
    stats: {
      total: totalCount,
      external: externalCount,
      admin: adminCount,
      cv: cvCount,
    },
    counts: {
      cvDownloads,
      recruiterModeOpens,
      contactClicks,
      formSubmits,
      fitMatcherUses,
      totalActions: totalIntentActions,
      external: externalCount,
      admin: adminCount,
      total: totalCount,
      conversionRate,
    },
    funnel: {
      impressions,
      engaged: engagedVisitors,
      highIntent: highIntentActions,
      conversions: directLeads,
    },
  });
}
