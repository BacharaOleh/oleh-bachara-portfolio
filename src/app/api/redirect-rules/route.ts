import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export type RedirectMode =
  | "default"
  | "hardware_focus"
  | "mes_focus"
  | "recruiter_fasttrack"
  | "geo_smart"
  | "custom_url";

export interface RedirectConfig {
  mode: RedirectMode;
  customUrl?: string;
  enabled: boolean;
  updatedAt: string;
  stats: {
    totalRedirected: number;
    byMode: Record<RedirectMode, number>;
  };
}

// In-memory store for guest redirection rules
const redirectConfig: RedirectConfig = {
  mode: "default",
  customUrl: "",
  enabled: false,
  updatedAt: new Date().toISOString(),
  stats: {
    totalRedirected: 14,
    byMode: {
      default: 0,
      hardware_focus: 8,
      mes_focus: 3,
      recruiter_fasttrack: 2,
      geo_smart: 1,
      custom_url: 0,
    },
  },
};

export async function GET() {
  return NextResponse.json({
    success: true,
    config: redirectConfig,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. If this is a hit tracking call (guest was redirected)
    if (body.action === "increment_hit") {
      const mode = (body.mode as RedirectMode) || redirectConfig.mode;
      redirectConfig.stats.totalRedirected += 1;
      if (redirectConfig.stats.byMode[mode] !== undefined) {
        redirectConfig.stats.byMode[mode] += 1;
      } else {
        redirectConfig.stats.byMode[mode] = 1;
      }
      return NextResponse.json({ success: true, stats: redirectConfig.stats });
    }

    // 2. Otherwise, this is an update to redirection configuration from the admin panel
    const { mode, customUrl, enabled } = body;

    if (mode) {
      redirectConfig.mode = mode as RedirectMode;
    }
    if (typeof customUrl === "string") {
      redirectConfig.customUrl = customUrl.trim();
    }
    if (typeof enabled === "boolean") {
      redirectConfig.enabled = enabled;
    }
    redirectConfig.updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: "Redirection rules updated successfully",
      config: redirectConfig,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update redirect rules" },
      { status: 500 }
    );
  }
}
