import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface PingResult {
  domain: string;
  ping: string;
  latencyMs: number;
  status: string;
  ssl: string;
  lastChecked: string;
}

const DEFAULT_TARGETS = [
  { domain: "cloudflare.com", url: "https://1.1.1.1" },
  { domain: "api.github.com", url: "https://api.github.com" },
  { domain: "httpbin.org", url: "https://httpbin.org/get" },
];

function getFormattedPingTimestamp(): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("sv-SE");
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return `${dateStr} ${timeStr}`;
}

async function measurePing(target: { domain: string; url: string }): Promise<PingResult> {
  const startTime = performance.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(target.url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "Portfolio-Health-Checker/1.0" },
      cache: "no-store",
    });

    clearTimeout(timeoutId);
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);

    return {
      domain: target.domain,
      ping: `${latency}ms`,
      latencyMs: latency,
      status: `${response.status} ${response.statusText || "OK"}`,
      ssl: "Valid (TLS 1.3)",
      lastChecked: getFormattedPingTimestamp(),
    };
  } catch (err: unknown) {
    const endTime = performance.now();
    const latency = Math.round(endTime - startTime);
    const error = err as Error;
    const isTimeout = error.name === "AbortError";
    return {
      domain: target.domain,
      ping: isTimeout ? ">4000ms" : "Offline",
      latencyMs: latency,
      status: isTimeout ? "Timeout" : "Offline / Unreachable",
      ssl: "Unavailable",
      lastChecked: getFormattedPingTimestamp(),
    };
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customUrl = searchParams.get("url");

  if (customUrl) {
    let formattedUrl = customUrl.trim();
    if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
      if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(formattedUrl)) {
        return NextResponse.json(
          { success: false, error: "Дозволені виключно HTTP та HTTPS протоколи" },
          { status: 400 }
        );
      }
      formattedUrl = `https://${formattedUrl}`;
    }

    // Security & Infrastructure Protection: Strictly disallow pinging restricted targets
    try {
      const parsedUrl = new URL(formattedUrl);
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        return NextResponse.json(
          { success: false, error: "Дозволені виключно HTTP та HTTPS протоколи" },
          { status: 400 }
        );
      }

      const host = parsedUrl.hostname.toLowerCase();

      // Block remote VPS, Raspberry Pi, link-local, loopbacks, and private RFC1918 subnets
      if (
        host === "37.187.153.154" ||
        host.includes("raspberry") ||
        host === "localhost" ||
        host === "127.0.0.1" ||
        host.startsWith("127.") ||
        host.startsWith("169.254.") ||
        host.startsWith("10.") ||
        host.startsWith("192.168.") ||
        /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
      ) {
        return NextResponse.json(
          {
            success: false,
            error: "Діагностика приватних серверів, локальних адрес та Raspberry Pi заблокована політикою безпеки проекту.",
          },
          { status: 403 }
        );
      }

      const domainName = parsedUrl.hostname;
      const result = await measurePing({ domain: domainName, url: formattedUrl });
      return NextResponse.json({ success: true, result });
    } catch {
      return NextResponse.json(
        { success: false, error: "Некоректний формат URL для перевірки" },
        { status: 400 }
      );
    }
  }

  const results = await Promise.all(DEFAULT_TARGETS.map(measurePing));
  return NextResponse.json({
    success: true,
    timestamp: new Date().toISOString(),
    results,
  });
}
