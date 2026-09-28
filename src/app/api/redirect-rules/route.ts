import { NextResponse } from "next/server";
import { readJsonData, writeJsonData } from "@/lib/server-storage";

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
  maintenanceMode?: boolean;
  updatedAt: string;
  stats: {
    totalRedirected: number;
    byMode: Record<RedirectMode, number>;
  };
}

const DEFAULT_REDIRECT_CONFIG: RedirectConfig = {
  mode: "default",
  customUrl: "",
  enabled: false,
  maintenanceMode: false,
  updatedAt: new Date().toISOString(),
  stats: {
    totalRedirected: 0,
    byMode: {
      default: 0,
      hardware_focus: 0,
      mes_focus: 0,
      recruiter_fasttrack: 0,
      geo_smart: 0,
      custom_url: 0,
    },
  },
};

const STORAGE_FILE = "redirect-config.json";

function getStoredRedirectConfig(): RedirectConfig {
  return readJsonData<RedirectConfig>(STORAGE_FILE, DEFAULT_REDIRECT_CONFIG);
}

function saveStoredRedirectConfig(config: RedirectConfig): void {
  writeJsonData(STORAGE_FILE, config);
}

export async function GET() {
  const config = getStoredRedirectConfig();
  return NextResponse.json({
    success: true,
    config,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const config = getStoredRedirectConfig();

    if (!config.stats) {
      config.stats = {
        totalRedirected: 0,
        byMode: {
          default: 0,
          hardware_focus: 0,
          mes_focus: 0,
          recruiter_fasttrack: 0,
          geo_smart: 0,
          custom_url: 0,
        },
      };
    }
    if (!config.stats.byMode) {
      config.stats.byMode = {
        default: 0,
        hardware_focus: 0,
        mes_focus: 0,
        recruiter_fasttrack: 0,
        geo_smart: 0,
        custom_url: 0,
      };
    }

    // Restore full configuration from backup
    if (body.action === "restore") {
      if (!body.config || typeof body.config !== "object") {
        return NextResponse.json({ success: false, error: "config object is required for restore" }, { status: 400 });
      }
      const restored: RedirectConfig = {
        ...DEFAULT_REDIRECT_CONFIG,
        ...body.config,
        updatedAt: new Date().toISOString(),
      };
      saveStoredRedirectConfig(restored);
      return NextResponse.json({ success: true, config: restored });
    }

    // 1. If this is a hit tracking call (guest was redirected)
    if (body.action === "increment_hit") {
      const mode = (body.mode as RedirectMode) || config.mode;
      config.stats.totalRedirected += 1;
      if (config.stats.byMode[mode] !== undefined) {
        config.stats.byMode[mode] += 1;
      } else {
        config.stats.byMode[mode] = 1;
      }
      saveStoredRedirectConfig(config);
      return NextResponse.json({ success: true, stats: config.stats });
    }

    // 2. Reset redirection statistics
    if (body.action === "reset_stats") {
      config.stats = {
        totalRedirected: 0,
        byMode: {
          default: 0,
          hardware_focus: 0,
          mes_focus: 0,
          recruiter_fasttrack: 0,
          geo_smart: 0,
          custom_url: 0,
        },
      };
      saveStoredRedirectConfig(config);
      return NextResponse.json({ success: true, stats: config.stats, config });
    }

    // 3. Otherwise, this is an update to redirection configuration from the admin panel
    const { mode, customUrl, enabled } = body;

    const VALID_MODES: RedirectMode[] = [
      "default",
      "hardware_focus",
      "mes_focus",
      "recruiter_fasttrack",
      "geo_smart",
      "custom_url",
    ];

    if (mode) {
      if (!VALID_MODES.includes(mode as RedirectMode)) {
        return NextResponse.json(
          { success: false, error: "Невідомий режим маршрутизатора" },
          { status: 400 }
        );
      }
      config.mode = mode as RedirectMode;
    }
    if (typeof customUrl === "string") {
      const sanitized = customUrl.trim();
      if (/^(javascript|data|vbscript):/i.test(sanitized)) {
        return NextResponse.json(
          { success: false, error: "Неприпустима схема протоколу в customUrl" },
          { status: 400 }
        );
      }
      if (
        sanitized.includes("37.187.153.154") ||
        sanitized.toLowerCase().includes("raspberry")
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Маршрутизація на приватний VPS сервер або Raspberry Pi заборонена політикою безпеки.",
          },
          { status: 403 }
        );
      }
      config.customUrl = sanitized;
    }
    if (typeof enabled === "boolean") {
      config.enabled = enabled;
    }
    if (typeof body.maintenanceMode === "boolean") {
      config.maintenanceMode = body.maintenanceMode;
    }
    config.updatedAt = new Date().toISOString();

    saveStoredRedirectConfig(config);

    return NextResponse.json({
      success: true,
      message: "Redirection rules updated successfully",
      config,
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update redirect rules" },
      { status: 500 }
    );
  }
}
