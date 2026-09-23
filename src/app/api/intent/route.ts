import { NextResponse } from "next/server";
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

// In-memory store seeded with realistic recruiter intent events
const intentStore: IntentRecord[] = [
  {
    id: "int-101",
    timestamp: "2026-09-20 13:30",
    type: "cv_download",
    label: "CV Download (Hero)",
    details: "cv-roman-deyneko.pdf",
    path: "/",
    referrer: "https://www.linkedin.com/",
    isAdminDevice: false,
    country: "Poland 🇵🇱",
  },
  {
    id: "int-102",
    timestamp: "2026-09-20 13:28",
    type: "recruiter_modal_open",
    label: "⚡ Recruiter Mode Activated",
    details: "1-Minute ATS Snapshot Viewed",
    path: "/",
    referrer: "https://www.linkedin.com/",
    isAdminDevice: false,
    country: "Poland 🇵🇱",
  },
  {
    id: "int-103",
    timestamp: "2026-09-20 12:45",
    type: "contact_click_telegram",
    label: "Telegram Contact Click",
    details: "@neko / @roman",
    path: "/",
    referrer: "Direct",
    isAdminDevice: false,
    country: "Poland 🇵🇱",
  },
  {
    id: "int-104",
    timestamp: "2026-09-20 11:15",
    type: "fit_matcher_used",
    label: "Fit Matcher Interacted",
    details: "Role: Lead Hardware / Embedded",
    path: "/#fit-matcher",
    referrer: "https://google.com/",
    isAdminDevice: false,
    country: "Germany 🇩🇪",
  },
  {
    id: "int-105",
    timestamp: "2026-09-20 10:20",
    type: "cv_download",
    label: "CV Download (Recruiter Modal)",
    details: "cv-roman-deyneko.pdf",
    path: "/",
    referrer: "https://www.linkedin.com/",
    isAdminDevice: false,
    country: "Germany 🇩🇪",
  },
  {
    id: "int-106",
    timestamp: "2026-09-19 18:40",
    type: "contact_click_linkedin",
    label: "LinkedIn Profile Click",
    details: "Roman Deyneko LinkedIn",
    path: "/#contact",
    referrer: "https://t.me/",
    isAdminDevice: false,
    country: "Ukraine 🇺🇦",
  },
  {
    id: "int-107",
    timestamp: "2026-09-19 14:25",
    type: "contact_form_submit",
    label: "Contact Form Submission",
    details: "Recruiter / Lead Embedded Systems Architect",
    path: "/#contact",
    referrer: "https://www.linkedin.com/",
    isAdminDevice: false,
    country: "Poland 🇵🇱",
  },
  {
    id: "int-108",
    timestamp: "2026-09-19 11:00",
    type: "cv_download",
    label: "CV Download (Sticky Bar)",
    details: "cv-roman-deyneko.pdf",
    path: "/",
    referrer: "Direct",
    isAdminDevice: true,
    country: "Poland 🇵🇱",
  },
];

export async function POST(req: Request) {
  try {
    const body: IntentEventPayload = await req.json();
    const acceptLanguage = req.headers.get("accept-language") || "";

    let country = "Poland 🇵🇱";
    if (acceptLanguage.toLowerCase().includes("de")) country = "Germany 🇩🇪";
    else if (acceptLanguage.toLowerCase().includes("uk") || acceptLanguage.toLowerCase().includes("ua")) country = "Ukraine 🇺🇦";
    else if (acceptLanguage.toLowerCase().includes("en-us")) country = "United States 🇺🇸";
    else if (acceptLanguage.toLowerCase().includes("en")) country = "Global (EN) 🌐";

    const newRecord: IntentRecord = {
      id: `int-${Date.now().toString(36)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: body.type,
      label: body.label,
      details: body.details,
      path: body.path || "/",
      referrer: body.referrer && body.referrer.length > 0 ? body.referrer : "Direct",
      isAdminDevice: Boolean(body.isAdminDevice),
      country,
    };

    intentStore.unshift(newRecord);

    if (intentStore.length > 150) {
      intentStore.pop();
    }

    return NextResponse.json({ success: true, recordId: newRecord.id });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") || "all";

  let records = [...intentStore];

  if (filter === "external") {
    records = records.filter((r) => !r.isAdminDevice);
  } else if (filter === "admin") {
    records = records.filter((r) => r.isAdminDevice);
  }

  // Calculate High-Intent Metrics
  const cvDownloads = records.filter((r) => r.type === "cv_download").length;
  const recruiterModeOpens = records.filter((r) => r.type === "recruiter_modal_open").length;
  const contactClicks = records.filter((r) =>
    r.type.startsWith("contact_click_")
  ).length;
  const formSubmits = records.filter((r) => r.type === "contact_form_submit").length;
  const fitMatcherUses = records.filter((r) => r.type === "fit_matcher_used").length;

  // Funnel calculations (assuming baseline impressions ~ 3x intent interactions)
  const totalIntentActions = records.length;
  const estimatedImpressions = Math.max(totalIntentActions * 3, 25);
  const engagedVisitors = Math.max(recruiterModeOpens + fitMatcherUses + 8, totalIntentActions);
  const highIntentActions = cvDownloads + contactClicks + formSubmits;
  const directLeads = formSubmits + Math.round(contactClicks * 0.7);

  const conversionRate = estimatedImpressions > 0
    ? `${((highIntentActions / estimatedImpressions) * 100).toFixed(1)}%`
    : "0.0%";

  return NextResponse.json({
    success: true,
    events: records,
    counts: {
      cvDownloads,
      recruiterModeOpens,
      contactClicks,
      formSubmits,
      fitMatcherUses,
      totalActions: totalIntentActions,
      conversionRate,
    },
    funnel: {
      impressions: estimatedImpressions,
      engaged: engagedVisitors,
      highIntent: highIntentActions,
      conversions: directLeads,
    },
  });
}
