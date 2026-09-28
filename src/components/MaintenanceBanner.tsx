"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export function MaintenanceBanner() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("maintenance_banner_dismissed") === "true";
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("maintenance_banner_dismissed") === "true") {
      return;
    }

    async function checkMaintenance() {
      try {
        const res = await fetch("/api/redirect-rules");
        if (!res.ok) return;
        const data = await res.json();
        if (data.config?.maintenanceMode) {
          setIsActive(true);
        }
      } catch {
        // silent fail
      }
    }

    checkMaintenance();
  }, []);

  if (!isActive || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem("maintenance_banner_dismissed", "true");
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full bg-[#1c1917] border-b border-amber-500/30 text-amber-200 px-4 py-2 text-xs font-mono flex items-center justify-between gap-3 shadow-md relative z-50">
      <div className="flex items-center gap-2 max-w-5xl mx-auto flex-1 justify-center text-center">
        <AlertTriangle size={14} className="text-amber-400 shrink-0" />
        <span className="text-[#eeece5]">
          <strong className="text-amber-400 uppercase tracking-wider font-semibold">
            Планове Обслуговування:
          </strong>{" "}
          На платформі проводяться технічні роботи. Всі інженерні системи, контакти та завантаження CV працюють штатно.
        </span>
      </div>

      <button
        onClick={handleDismiss}
        className="text-[#a39c91] hover:text-[#eeece5] p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer shrink-0"
        title="Приховати повідомлення"
        aria-label="Закрити банер"
      >
        <X size={14} />
      </button>
    </div>
  );
}
