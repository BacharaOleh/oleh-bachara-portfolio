"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { collectClientTelemetry } from "@/lib/visitor-telemetry";

export function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const stepStartTime = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fullPath = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    const now = Date.now();
    const durationSec =
      stepStartTime.current !== null
        ? Math.max(Math.round((now - stepStartTime.current) / 1000), 2)
        : 2;
    stepStartTime.current = now;

    // Execute non-critically when the browser is idle to guarantee 60fps animations and zero lag
    const runTracking = () => {
      // 1. Smart Traffic Redirection Check for External Guests on Root Path
      const checkAndExecuteRedirection = async (isAdminDevice: boolean) => {
        if (isAdminDevice || pathname !== "/") return null;
        try {
          if (sessionStorage.getItem("guest_redirect_done") === "true") return null;

          const res = await fetch("/api/redirect-rules");
          if (!res.ok) return null;
          const data = await res.json();
          const config = data.config;

          if (!config || !config.enabled || config.mode === "default") return null;

          let targetUrl = "";
          if (config.mode === "hardware_focus") {
            targetUrl = "/projects/goodvalley-automation";
          } else if (config.mode === "mes_focus") {
            targetUrl = "/projects/wfm-industrial-mes";
          } else if (config.mode === "recruiter_fasttrack") {
            targetUrl = "/?recruiter=open";
          } else if (config.mode === "geo_smart") {
            const userLang = navigator.language.toLowerCase();
            targetUrl = userLang.startsWith("pl") ? "/?lang=pl" : "/?lang=en";
          } else if (config.mode === "custom_url" && config.customUrl) {
            targetUrl = config.customUrl;
          }

          if (!targetUrl || targetUrl === fullPath) return null;

          sessionStorage.setItem("guest_redirect_done", "true");

          // Non-blocking fire-and-forget
          fetch("/api/redirect-rules", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "increment_hit", mode: config.mode }),
            keepalive: true,
          }).catch(() => {});

          const redirectRecord = {
            from: fullPath,
            to: targetUrl,
            rule: config.mode,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          };

          if (targetUrl.startsWith("http://") || targetUrl.startsWith("https://")) {
            window.location.href = targetUrl;
          } else {
            router.replace(targetUrl);
          }

          return redirectRecord;
        } catch {
          return null;
        }
      };

      // 2. Collect full client-side telemetry silently and send to backend
      collectClientTelemetry(fullPath)
        .then(async (telemetry) => {
          const redirectTriggered = await checkAndExecuteRedirection(telemetry.isAdminDevice);

          const payload = {
            sessionId: telemetry.sessionId,
            visitorId: telemetry.visitorId,
            visitCount: telemetry.visitCount,
            firstSeenAt: telemetry.firstSeenAt,
            path: fullPath,
            referrer: telemetry.marketing.referrer,
            isAdminDevice: telemetry.isAdminDevice,
            durationSec,
            action: redirectTriggered
              ? `⚡ Перенаправлено [${redirectTriggered.rule}]`
              : "Перегляд сторінки",
            redirectTriggered: redirectTriggered || undefined,
            hardware: telemetry.hardware,
            network: telemetry.network,
            system: telemetry.system,
            marketing: telemetry.marketing,
          };

          // Non-intrusive background dispatch with keepalive
          fetch("/api/visitors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            keepalive: true,
          }).catch(() => {});
        })
        .catch(() => {
          // Zero-prompt, silent fallback
        });
    };

    // Run in idle callback or deferred timeout
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(runTracking, { timeout: 1500 });
    } else {
      setTimeout(runTracking, 200);
    }
  }, [pathname, searchParams, router]);

  return null;
}
