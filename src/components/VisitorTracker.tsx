"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    // Avoid multiple logs for the exact same path in the current tab session within 30 seconds
    const sessionKey = `last_visit_${pathname}`;
    const lastVisit = sessionStorage.getItem(sessionKey);
    const now = Date.now();
    if (lastVisit && now - parseInt(lastVisit, 10) < 30000) {
      return;
    }
    sessionStorage.setItem(sessionKey, now.toString());

    // Check if this device has ever logged into the admin cabinet
    const isAdminDevice = localStorage.getItem("is_admin_device") === "true";

    const payload = {
      path: pathname,
      referrer: document.referrer || "Direct",
      isAdminDevice,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    };

    fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Non-critical tracking error, ignore silently
    });
  }, [pathname]);

  return null;
}
