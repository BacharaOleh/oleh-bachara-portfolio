"use client";

import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";

const emptySubscribe = () => () => {};
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
import {
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  Send,
  Radio,
  Server,
  Activity,
  Layers,
  Inbox,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  LogOut,
  Sliders,
  Cpu,
  Terminal,
  Zap,
  Mail,
  User,
  Search,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload,
  Users,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Target,
  TrendingUp,
  FileDown,
  MousePointerClick,
  Split,
  Compass,
  ChevronDown,
  ChevronRight,
  Route,
  Battery,
  BatteryCharging,
  Wifi,
  MapPin,
  Maximize2,
  Sun,
  Moon,
  Clock,
} from "lucide-react";
import { PROJECTS, SOCIAL_LINKS, type Project } from "@/data/portfolio-data";
import { TelegramAuthModal } from "@/components/TelegramAuthModal";
import type { IntentEventType } from "@/lib/intent-tracker";
import type { RedirectMode, RedirectConfig } from "@/app/api/redirect-rules/route";
import type { VisitorJourney } from "@/app/api/visitors/route";

type AdminTab = "overview" | "intent" | "visitors" | "routing" | "projects" | "inquiries" | "telemetry" | "settings";

interface NavItem {
  id: AdminTab;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: number;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  status: "new" | "in_progress" | "archived";
  date: string;
}

interface IntentRecord {
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

interface IntentCounts {
  cvDownloads: number;
  recruiterModeOpens: number;
  contactClicks: number;
  formSubmits: number;
  fitMatcherUses: number;
  totalActions: number;
  conversionRate: string;
  external?: number;
  admin?: number;
  total?: number;
}

interface IntentStats {
  total: number;
  external: number;
  admin: number;
  cv?: number;
}

interface IntentFunnel {
  impressions: number;
  engaged: number;
  highIntent: number;
  conversions: number;
}

interface PingTargetResult {
  domain: string;
  ping: string;
  latencyMs: number;
  status: string;
  ssl: string;
  lastChecked: string;
}

const DEFAULT_INQUIRIES: Inquiry[] = [];

function setAdminCookie(value: boolean): void {
  if (typeof document === "undefined") return;
  if (value) {
    document.cookie = "admin_device=1; path=/; max-age=31536000; SameSite=Lax";
  } else {
    document.cookie = "admin_device=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function formatTelemetryTimestamp(rawTimestamp?: string, fallbackId?: string): string {
  if (!rawTimestamp || rawTimestamp === "—") return "—";

  const trimmed = rawTimestamp.trim();

  // Handle ISO string format (e.g. 2026-09-28T14:15:30.000Z)
  if (trimmed.includes("T")) {
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      return `${parsed.toLocaleDateString("sv-SE")} ${parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }
  }

  // If already formatted with year/month/day separator (e.g. "2026-09-28", "28.09.2026")
  if (trimmed.includes("-") || trimmed.includes(".")) {
    return trimmed;
  }

  // If it only contains time (e.g. "10:16 AM", "10:16")
  let datePart = "";
  if (fallbackId && fallbackId.includes("-")) {
    const parts = fallbackId.split("-");
    if (parts[1]) {
      const ts = parseInt(parts[1], 36);
      if (!isNaN(ts) && ts > 1500000000000 && ts < 3000000000000) {
        datePart = new Date(ts).toLocaleDateString("sv-SE");
      }
    }
  }

  if (!datePart) {
    datePart = new Date().toLocaleDateString("sv-SE");
  }

  return `${datePart} ${trimmed}`;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(false);
  const isHydrated = useIsHydrated();
  const [showPin, setShowPin] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState<boolean>(false);

  // Settings State - PIN Change
  const [currentPinInput, setCurrentPinInput] = useState<string>("");
  const [newPinInput, setNewPinInput] = useState<string>("");
  const [confirmPinInput, setConfirmPinInput] = useState<string>("");
  const [pinChangeError, setPinChangeError] = useState<string>("");
  const [pinChangeSuccess, setPinChangeSuccess] = useState<boolean>(false);
  const [isChangingPin, setIsChangingPin] = useState<boolean>(false);
  const [showNewPin, setShowNewPin] = useState<boolean>(false);
  const [showCurrentPin, setShowCurrentPin] = useState<boolean>(false);
  const [isAutoRefreshEnabled, setIsAutoRefreshEnabled] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_auto_refresh") !== "false";
    }
    return true;
  });
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);
  const [isRestoringBackup, setIsRestoringBackup] = useState<boolean>(false);
  const [backupRestoreMessage, setBackupRestoreMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "new" | "in_progress" | "archived">("all");
  const [inquirySearch, setInquirySearch] = useState<string>("");
  const [isLoadingInquiries, setIsLoadingInquiries] = useState<boolean>(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [isCreatingInquiry, setIsCreatingInquiry] = useState<boolean>(false);
  const [showCreateInquiryModal, setShowCreateInquiryModal] = useState<boolean>(false);
  const [newInquiryForm, setNewInquiryForm] = useState<{
    name: string;
    email: string;
    projectType: string;
    message: string;
    status: "new" | "in_progress" | "archived";
  }>({
    name: "",
    email: "",
    projectType: "Industrial Automation & SCADA",
    message: "",
    status: "new",
  });

  // Visitors & Journeys State
  const [journeys, setJourneys] = useState<VisitorJourney[]>([]);
  const [journeyFilter, setJourneyFilter] = useState<
    "all" | "external" | "redirected" | "converted" | "admin" | "mobile" | "desktop" | "bots"
  >("external");
  const [journeySearch, setJourneySearch] = useState<string>("");
  const [journeyStats, setJourneyStats] = useState<{
    total: number;
    external: number;
    admin: number;
    redirected: number;
    converted: number;
    mobile?: number;
    desktop?: number;
    bots?: number;
    topCountries?: Array<{ country: string; count: number }>;
    topBrowsers?: Array<{ browser: string; count: number }>;
    topOs?: Array<{ os: string; count: number }>;
  }>({
    total: 0,
    external: 0,
    admin: 0,
    redirected: 0,
    converted: 0,
    mobile: 0,
    desktop: 0,
    bots: 0,
    topCountries: [],
    topBrowsers: [],
    topOs: [],
  });
  const [expandedJourneys, setExpandedJourneys] = useState<Record<string, boolean>>({});
  const [isLoadingJourneys, setIsLoadingJourneys] = useState<boolean>(false);
  const [isCurrentDeviceAdmin, setIsCurrentDeviceAdmin] = useState<boolean>(false);
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [copiedUa, setCopiedUa] = useState<string | null>(null);
  const [visibleJourneysCount, setVisibleJourneysCount] = useState<number>(25);

  // Traffic Routing State
  const [redirectConfig, setRedirectConfig] = useState<RedirectConfig>({
    mode: "default",
    customUrl: "",
    enabled: false,
    updatedAt: "",
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
  });
  const [selectedRedirectMode, setSelectedRedirectMode] = useState<RedirectMode>("default");
  const [customRedirectUrl, setCustomRedirectUrl] = useState<string>("");
  const [isRedirectEnabled, setIsRedirectEnabled] = useState<boolean>(false);
  const [redirectSaveSuccess, setRedirectSaveSuccess] = useState<boolean>(false);
  const [isSavingRedirect, setIsSavingRedirect] = useState<boolean>(false);

  // Intent & Conversions State
  const [intentEvents, setIntentEvents] = useState<IntentRecord[]>([]);
  const [intentFilter, setIntentFilter] = useState<"all" | "external" | "admin" | "cv">("external");
  const [intentSearch, setIntentSearch] = useState<string>("");
  const [intentStats, setIntentStats] = useState<IntentStats>({
    total: 0,
    external: 0,
    admin: 0,
    cv: 0,
  });
  const [intentCounts, setIntentCounts] = useState<IntentCounts>({
    cvDownloads: 0,
    recruiterModeOpens: 0,
    contactClicks: 0,
    formSubmits: 0,
    fitMatcherUses: 0,
    totalActions: 0,
    conversionRate: "0.0%",
  });
  const [intentFunnel, setIntentFunnel] = useState<IntentFunnel>({
    impressions: 0,
    engaged: 0,
    highIntent: 0,
    conversions: 0,
  });
  const [isLoadingIntent, setIsLoadingIntent] = useState<boolean>(false);
  const [visibleIntentCount, setVisibleIntentCount] = useState<number>(25);

  // Projects State
  const [projectSearch, setProjectSearch] = useState<string>("");
  const [projectCategory, setProjectCategory] = useState<string>("all");
  const [featuredOverride, setFeaturedOverride] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem("admin_featured_projects");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const journeySearchTimer = useRef<NodeJS.Timeout | null>(null);
  const intentSearchTimer = useRef<NodeJS.Timeout | null>(null);

  const latestJourneyFilter = useRef(journeyFilter);
  const latestJourneySearch = useRef(journeySearch);
  const latestIntentFilter = useRef(intentFilter);
  const latestIntentSearch = useRef(intentSearch);

  useEffect(() => {
    latestJourneyFilter.current = journeyFilter;
  }, [journeyFilter]);
  useEffect(() => {
    latestJourneySearch.current = journeySearch;
  }, [journeySearch]);
  useEffect(() => {
    latestIntentFilter.current = intentFilter;
  }, [intentFilter]);
  useEffect(() => {
    latestIntentSearch.current = intentSearch;
  }, [intentSearch]);

  useEffect(() => {
    return () => {
      if (journeySearchTimer.current) clearTimeout(journeySearchTimer.current);
      if (intentSearchTimer.current) clearTimeout(intentSearchTimer.current);
    };
  }, []);

  const handleToggleFeatured = (projId: string, currentVal: boolean) => {
    setFeaturedOverride((prev) => {
      const next = { ...prev, [projId]: !currentVal };
      try {
        localStorage.setItem("admin_featured_projects", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Telemetry & Ping State
  const [pingData, setPingData] = useState<PingTargetResult[]>([]);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [lastPingTimestamp, setLastPingTimestamp] = useState<string>("");
  const [customPingInput, setCustomPingInput] = useState<string>("");
  const [isCustomPinging, setIsCustomPinging] = useState<boolean>(false);
  const [customPingResult, setCustomPingResult] = useState<PingTargetResult | null>(null);
  const [customPingError, setCustomPingError] = useState<string>("");

  const projectsList: Project[] = PROJECTS.en;

  const markDeviceAsAdmin = () => {
    try {
      localStorage.setItem("is_admin_device", "true");
      localStorage.setItem("admin_device_registered_at", new Date().toISOString());
      setAdminCookie(true);
      setIsCurrentDeviceAdmin(true);

      const currentSessionId = sessionStorage.getItem("visitor_session_id");
      if (currentSessionId) {
        fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "set_session_admin", sessionId: currentSessionId, isAdmin: true }),
        }).catch(() => {});
      }
    } catch {
      // ignore
    }
  };

  // Check existing session and device identity
  useEffect(() => {
    async function verifyExistingAuth() {
      try {
        const urlParams =
          typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
        const queryToken = urlParams?.get("token");

        if (queryToken) {
          sessionStorage.setItem("admin_session_token", queryToken);
          localStorage.setItem("admin_session_token", queryToken);
          sessionStorage.setItem("admin_session_active", "true");
          localStorage.setItem("admin_session_active", "true");
          if (typeof window !== "undefined" && window.history?.replaceState) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
          }
        }

        const storedToken =
          queryToken ||
          sessionStorage.getItem("admin_session_token") ||
          localStorage.getItem("admin_session_token");

        if (storedToken) {
          setAuthChecking(true);
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);

          try {
            const res = await fetch("/api/admin-auth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ action: "verify_session", token: storedToken }),
              signal: controller.signal,
            });
            clearTimeout(timeoutId);
            const data = await res.json();
            if (data.valid) {
              setIsAuthenticated(true);
              if (queryToken) {
                markDeviceAsAdmin();
              }
            } else {
              // Session invalidated (e.g., password changed on server!)
              setIsAuthenticated(false);
              sessionStorage.removeItem("admin_session_active");
              sessionStorage.removeItem("admin_session_token");
              localStorage.removeItem("admin_session_active");
              localStorage.removeItem("admin_session_token");
            }
          } catch {
            setIsAuthenticated(false);
          } finally {
            setAuthChecking(false);
          }
        } else {
          setIsAuthenticated(false);
        }

        const isAdmin =
          localStorage.getItem("is_admin_device") === "true" ||
          document.cookie.includes("admin_device=1");
        setIsCurrentDeviceAdmin(isAdmin);

        const savedInquiries = localStorage.getItem("admin_inquiries");
        if (savedInquiries) {
          try {
            const parsed: Inquiry[] = JSON.parse(savedInquiries);
            const filtered = Array.isArray(parsed)
              ? parsed.filter((i) => !["inq-101", "inq-102", "inq-103"].includes(i.id))
              : [];
            setInquiries(filtered);
            localStorage.setItem("admin_inquiries", JSON.stringify(filtered));
          } catch {
            setInquiries([]);
            localStorage.removeItem("admin_inquiries");
          }
        } else {
          setInquiries([]);
        }

        const savedMaintenance = localStorage.getItem("admin_maintenance_mode");
        if (savedMaintenance === "true") {
          setMaintenanceMode(true);
        }
      } catch {
        setInquiries(DEFAULT_INQUIRIES);
      } finally {
        setAuthChecking(false);
      }
    }

    verifyExistingAuth();
  }, []);

  const handleLoginWithPin = async (
    e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent
  ) => {
    if (e) e.preventDefault();
    if (isLoggingIn) return;
    const targetEl = (e?.currentTarget || e?.target) as HTMLElement | undefined;
    const form =
      targetEl?.closest?.("form") ||
      (typeof document !== "undefined" ? document.querySelector("form") : null);
    const inputFromForm = form?.querySelector<HTMLInputElement>("input[name='pin'], input[placeholder*='2026']")?.value;
    const effectivePin = (pinInput || inputFromForm || "").trim();

    if (!effectivePin) {
      setAuthError("Введіть PIN-код доступу");
      return;
    }

    setAuthError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", pin: effectivePin }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_session_active", "true");
        sessionStorage.setItem("admin_session_token", data.token);
        localStorage.setItem("admin_session_active", "true");
        localStorage.setItem("admin_session_token", data.token);
        markDeviceAsAdmin();
        setPinInput("");
      } else {
        setAuthError(data.error || "Невірний PIN-код або пароль доступу.");
      }
    } catch {
      setAuthError("Помилка зв'язку з сервером авторизації.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_session_active");
    sessionStorage.removeItem("admin_session_token");
    localStorage.removeItem("admin_session_active");
    localStorage.removeItem("admin_session_token");
    localStorage.removeItem("admin_inquiries");
    setSelectedInquiry(null);
    setActiveTab("overview");
    setInquiries([]);
    setJourneys([]);
    setJourneyStats({
      total: 0,
      external: 0,
      admin: 0,
      redirected: 0,
      converted: 0,
      mobile: 0,
      desktop: 0,
      bots: 0,
      topCountries: [],
      topBrowsers: [],
      topOs: [],
    });
    setJourneySearch("");
    setIntentEvents([]);
    setIntentStats({ total: 0, external: 0, admin: 0, cv: 0 });
    setIntentCounts({
      cvDownloads: 0,
      recruiterModeOpens: 0,
      contactClicks: 0,
      formSubmits: 0,
      fitMatcherUses: 0,
      totalActions: 0,
      conversionRate: "0.0%",
    });
    setIntentFunnel({ impressions: 0, engaged: 0, highIntent: 0, conversions: 0 });
    setIntentSearch("");
    setPingData([]);
    setCustomPingResult(null);
    setCustomPingInput("");
    setCustomPingError("");
    setPinInput("");
    setAuthError("");
    setBackupRestoreMessage(null);
    setVisibleJourneysCount(25);
    setSelectedInquiry(null);
    setExpandedJourneys({});
    setProjectSearch("");
    setInquirySearch("");
  };

  const handleTelegramSuccess = (user?: { username: string; firstName?: string }, msg?: string, token?: string) => {
    setIsAuthenticated(true);
    sessionStorage.setItem("admin_session_active", "true");
    localStorage.setItem("admin_session_active", "true");
    if (token) {
      sessionStorage.setItem("admin_session_token", token);
      localStorage.setItem("admin_session_token", token);
    }
    markDeviceAsAdmin();
    setIsTelegramModalOpen(false);
  };

  const handleToggleAdminDevice = () => {
    const current =
      localStorage.getItem("is_admin_device") === "true" ||
      document.cookie.includes("admin_device=1");

    const newAdminState = !current;
    if (current) {
      localStorage.removeItem("is_admin_device");
      setAdminCookie(false);
      setIsCurrentDeviceAdmin(false);
      try {
        sessionStorage.removeItem("guest_redirect_done");
      } catch {
        // ignore
      }
    } else {
      localStorage.setItem("is_admin_device", "true");
      setAdminCookie(true);
      setIsCurrentDeviceAdmin(true);
    }

    const currentSessionId = sessionStorage.getItem("visitor_session_id");
    if (currentSessionId) {
      fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "set_session_admin", sessionId: currentSessionId, isAdmin: newAdminState }),
      })
        .finally(() => {
          handleFetchJourneys();
          handleFetchIntent();
        });
    } else {
      handleFetchJourneys();
      handleFetchIntent();
    }
  };

  const handleDeleteJourney = async (id: string) => {
    if (!window.confirm("Ви дійсно бажаєте видалити цю сесію відвідувача з журналу?")) return;
    setJourneys((prev) => prev.filter((j) => j.id !== id));
    setExpandedJourneys((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
    try {
      await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_journey", id }),
      });
      handleFetchJourneys();
    } catch {
      // offline fallback
    }
  };

  const handleToggleSessionAdmin = async (id: string) => {
    setJourneys((prev) =>
      prev.map((j) => (j.id === id ? { ...j, isAdminDevice: !j.isAdminDevice } : j))
    );
    try {
      await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_admin_session", id }),
      });
      handleFetchJourneys();
    } catch {
      // offline fallback
    }
  };

  const handleFetchJourneys = async (filterParam?: string, searchParam?: string) => {
    setIsLoadingJourneys(true);
    if (filterParam !== undefined || searchParam !== undefined) {
      setVisibleJourneysCount(25);
    }
    try {
      const activeFilter = filterParam !== undefined ? filterParam : latestJourneyFilter.current;
      const activeSearch = searchParam !== undefined ? searchParam : latestJourneySearch.current;
      const q = encodeURIComponent(activeSearch.trim());
      const res = await fetch(`/api/visitors?filter=${activeFilter}${q ? `&q=${q}` : ""}`);
      if (!res.ok) throw new Error("Failed to fetch visitor journeys");
      const data = await res.json();
      if (data.journeys) {
        setJourneys(data.journeys);
        if (data.stats) setJourneyStats(data.stats);
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsLoadingJourneys(false);
    }
  };

  const copyTextSafely = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallback below
    }
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "-9999px";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      return successful;
    } catch {
      return false;
    }
  };

  const handleCopyIp = async (ip: string) => {
    await copyTextSafely(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  const handleCopyUa = async (ua: string) => {
    await copyTextSafely(ua);
    setCopiedUa(ua);
    setTimeout(() => setCopiedUa(null), 2000);
  };

  const handleExportVisitorsJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      stats: journeyStats,
      visitorsCount: journeys.length,
      journeys,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visitors-telemetry-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportVisitorsCsv = () => {
    if (journeys.length === 0) {
      alert("Немає записів телеметрії для експорту в CSV.");
      return;
    }
    const headers = [
      "Session ID",
      "Visitor ID",
      "Started At",
      "Last Active At",
      "Duration (s)",
      "Role",
      "Country",
      "City",
      "IP",
      "Device",
      "OS",
      "Browser",
      "GPU",
      "Network",
      "Referrer",
      "Steps Count",
      "Converted",
    ];
    const rows = journeys.map((j) => [
      `"${(j.id || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(j.visitorId || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(formatTelemetryTimestamp(j.startedAt, j.id) || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(formatTelemetryTimestamp(j.lastActiveAt, j.id) || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      j.totalDurationSec,
      j.isAdminDevice ? "Admin" : "Guest",
      `"${(j.country || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(j.city || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(j.ip || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(j.deviceType || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(j.system?.os || j.os || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(j.system?.browser || j.browser || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(j.hardware?.gpuRenderer || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(j.network?.effectiveType || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(j.marketing?.referrerDomain || j.referrer || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      j.steps?.length || 0,
      j.converted ? "Yes" : "No",
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `visitors-telemetry-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAllJourneys = async () => {
    if (!window.confirm("Ви дійсно бажаєте очистити всю телеметрію та історію сесій відвідувачів?")) return;
    setJourneys([]);
    setExpandedJourneys({});
    setJourneyStats({
      total: 0,
      external: 0,
      admin: 0,
      redirected: 0,
      converted: 0,
      mobile: 0,
      desktop: 0,
      bots: 0,
      topCountries: [],
      topBrowsers: [],
      topOs: [],
    });
    try {
      await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear_all" }),
      });
      handleFetchJourneys();
    } catch {
      // offline fallback
    }
  };

  const handleExportIntentJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      counts: intentCounts,
      stats: intentStats,
      funnel: intentFunnel,
      eventsCount: intentEvents.length,
      events: intentEvents,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recruiter-intent-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportIntentCsv = () => {
    if (intentEvents.length === 0) {
      alert("Немає подій намірів для експорту в CSV.");
      return;
    }
    const headers = [
      "Event ID",
      "Timestamp",
      "Type",
      "Label",
      "Details",
      "Path",
      "Referrer",
      "Role",
      "Country",
    ];
    const rows = intentEvents.map((r) => [
      `"${(r.id || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(formatTelemetryTimestamp(r.timestamp, r.id) || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(r.type || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(r.label || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(r.details || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(r.path || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(r.referrer || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      r.isAdminDevice ? "Admin" : "Recruiter",
      `"${(r.country || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recruiter-intent-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteIntentEvent = async (id: string) => {
    if (!window.confirm("Ви дійсно бажаєте видалити цю подію аналітики?")) return;
    setIntentEvents((prev) => prev.filter((r) => r.id !== id));
    try {
      await fetch("/api/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_event", id }),
      });
      handleFetchIntent();
    } catch {
      // offline fallback
    }
  };

  const handleToggleIntentAdmin = async (id: string) => {
    setIntentEvents((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isAdminDevice: !r.isAdminDevice } : r))
    );
    try {
      await fetch("/api/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_admin_device", id }),
      });
      handleFetchIntent();
    } catch {
      // offline fallback
    }
  };

  const handleClearAllIntent = async () => {
    if (!window.confirm("Ви дійсно бажаєте очистити всі події аналітики намірів рекрутерів?")) return;
    setIntentEvents([]);
    setIntentStats({ total: 0, external: 0, admin: 0, cv: 0 });
    setIntentCounts({
      cvDownloads: 0,
      recruiterModeOpens: 0,
      contactClicks: 0,
      formSubmits: 0,
      fitMatcherUses: 0,
      totalActions: 0,
      conversionRate: "0.0%",
    });
    setIntentFunnel({ impressions: 0, engaged: 0, highIntent: 0, conversions: 0 });
    try {
      await fetch("/api/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear_all" }),
      });
      handleFetchIntent();
    } catch {
      // offline fallback
    }
  };

  const handleResetRedirectStats = async () => {
    if (!window.confirm("Скинути статистику перенаправлень гостей до нуля?")) return;
    setRedirectConfig((prev) => ({
      ...prev,
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
    }));
    try {
      const res = await fetch("/api/redirect-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_stats" }),
      });
      const data = await res.json();
      if (data.config) {
        setRedirectConfig(data.config);
      }
    } catch {
      // offline fallback
    }
  };

  const handleFetchRedirectConfig = async () => {
    try {
      const res = await fetch("/api/redirect-rules");
      if (!res.ok) throw new Error("Failed to fetch redirect rules");
      const data = await res.json();
      if (data.config) {
        setRedirectConfig(data.config);
        setSelectedRedirectMode(data.config.mode);
        setCustomRedirectUrl(data.config.customUrl || "");
        setIsRedirectEnabled(data.config.enabled);
        if (typeof data.config.maintenanceMode === "boolean") {
          setMaintenanceMode(data.config.maintenanceMode);
          localStorage.setItem("admin_maintenance_mode", data.config.maintenanceMode ? "true" : "false");
        }
      }
    } catch {
      // ignore
    }
  };

  const handleToggleRedirectMaster = async () => {
    const newEnabled = !isRedirectEnabled;
    setIsRedirectEnabled(newEnabled);
    setRedirectConfig((prev) => ({ ...prev, enabled: newEnabled }));
    try {
      const res = await fetch("/api/redirect-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: selectedRedirectMode,
          customUrl: customRedirectUrl.trim(),
          enabled: newEnabled,
        }),
      });
      const data = await res.json();
      if (data.success && data.config) {
        setRedirectConfig(data.config);
      }
    } catch {
      // offline fallback
    }
  };

  const handleSaveRedirectConfig = async () => {
    if (isSavingRedirect) return;
    let targetUrl = customRedirectUrl.trim();
    if (selectedRedirectMode === "custom_url") {
      if (!targetUrl) {
        alert("Будь ласка, вкажіть цільовий URL для сценарію перенаправлення.");
        return;
      }
      if (/^(javascript|data|vbscript):/i.test(targetUrl)) {
        alert("Неприпустимий протокол URL. Будь ласка, введіть дійсний https:// або відносний шлях.");
        return;
      }
      if (!targetUrl.startsWith("/") && !targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
        if (targetUrl.includes(".") && !targetUrl.startsWith(".")) {
          targetUrl = `https://${targetUrl}`;
        } else {
          targetUrl = `/${targetUrl}`;
        }
      }
      setCustomRedirectUrl(targetUrl);
    }

    setIsSavingRedirect(true);
    try {
      const res = await fetch("/api/redirect-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: selectedRedirectMode,
          customUrl: targetUrl,
          enabled: isRedirectEnabled,
        }),
      });
      const data = await res.json();
      if (data.success && data.config) {
        setRedirectConfig(data.config);
        setRedirectSaveSuccess(true);
        setTimeout(() => setRedirectSaveSuccess(false), 3000);
      } else {
        alert(data.error || "Не вдалося зберегти налаштування маршрутизатора.");
      }
    } catch {
      alert("Помилка зв'язку з сервером при збереженні конфігурації маршрутизатора.");
    } finally {
      setIsSavingRedirect(false);
    }
  };

  const handleFetchIntent = async (filterParam?: string, searchParam?: string) => {
    setIsLoadingIntent(true);
    if (filterParam !== undefined || searchParam !== undefined) {
      setVisibleIntentCount(25);
    }
    try {
      const activeFilter = filterParam !== undefined ? filterParam : latestIntentFilter.current;
      const activeSearch = searchParam !== undefined ? searchParam : latestIntentSearch.current;
      const q = encodeURIComponent(activeSearch.trim());
      const res = await fetch(`/api/intent?filter=${activeFilter}${q ? `&q=${q}` : ""}`);
      if (!res.ok) throw new Error("Failed to fetch intent analytics");
      const data = await res.json();
      if (data.events) {
        setIntentEvents(data.events);
        if (data.counts) setIntentCounts(data.counts);
        if (data.funnel) setIntentFunnel(data.funnel);
        if (data.stats) setIntentStats(data.stats);
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsLoadingIntent(false);
    }
  };

  const handleRunPingDiagnostic = async () => {
    if (isPinging) return;
    setIsPinging(true);
    try {
      const res = await fetch("/api/ping");
      if (!res.ok) throw new Error("Ping failed");
      const data = await res.json();
      if (data.results) {
        setPingData(data.results);
        const now = new Date();
        const dateStr = now.toLocaleDateString("sv-SE");
        const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        setLastPingTimestamp(`${dateStr} ${timeStr}`);
      }
    } catch {
      const now = new Date();
      const dateStr = now.toLocaleDateString("sv-SE");
      const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const currentStamp = `${dateStr} ${timeStr}`;
      setPingData([
        { domain: "cloudflare.com", ping: "Помилка", latencyMs: 9999, status: "503 Network Error", ssl: "Unavailable", lastChecked: currentStamp },
        { domain: "api.github.com", ping: "Помилка", latencyMs: 9999, status: "503 Network Error", ssl: "Unavailable", lastChecked: currentStamp },
        { domain: "httpbin.org", ping: "Помилка", latencyMs: 9999, status: "503 Network Error", ssl: "Unavailable", lastChecked: currentStamp },
        { domain: "edge-gateway.local (RS485)", ping: "Offline", latencyMs: 9999, status: "Host Unreachable", ssl: "Internal P2P", lastChecked: currentStamp },
      ]);
      setLastPingTimestamp(currentStamp);
    } finally {
      setIsPinging(false);
    }
  };

  const handleRunCustomPing = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isCustomPinging) return;
    const targetUrl = customPingInput.trim();
    if (!targetUrl) return;

    setIsCustomPinging(true);
    setCustomPingError("");
    setCustomPingResult(null);

    try {
      const res = await fetch(`/api/ping?url=${encodeURIComponent(targetUrl)}`);
      const data = await res.json();
      if (data.success && data.result) {
        setCustomPingResult(data.result);
      } else {
        setCustomPingError(data.error || "Не вдалося виміряти затримку до цільового ресурсу");
      }
    } catch {
      setCustomPingError("Помилка зв'язку з діагностичним сервісом");
    } finally {
      setIsCustomPinging(false);
    }
  };

  const handleFetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const res = await fetch("/api/inquiries");
      if (!res.ok) return;
      const data = await res.json();
      if (data.inquiries && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
        localStorage.setItem("admin_inquiries", JSON.stringify(data.inquiries));
        setSelectedInquiry((prev) => {
          if (!prev) return null;
          return data.inquiries.find((inq: Inquiry) => inq.id === prev.id) || null;
        });
      }
    } catch {
      // Graceful fallback to local storage
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  const handleExportInquiriesJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      count: inquiries.length,
      inquiries,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-inquiries-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportInquiriesCsv = () => {
    if (inquiries.length === 0) {
      alert("Немає вхідних заявок для експорту в CSV.");
      return;
    }
    const headers = [
      "Inquiry ID",
      "Name",
      "Email",
      "Project Type",
      "Status",
      "Date",
      "Message",
    ];
    const rows = inquiries.map((inq) => [
      `"${(inq.id || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(inq.name || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(inq.email || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(inq.projectType || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(inq.status || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(formatTelemetryTimestamp(inq.date, inq.id) || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
      `"${(inq.message || "").replace(/\r\n|\r|\n/g, " ").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-inquiries-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAllInquiries = async () => {
    if (!window.confirm("Ви дійсно бажаєте видалити ВСІ вхідні заявки на сервері?")) return;
    setInquiries([]);
    localStorage.removeItem("admin_inquiries");
    setSelectedInquiry(null);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear_all" }),
      });
      handleFetchInquiries();
    } catch {
      // offline fallback
    }
  };

  // Fetch telemetry, journeys, intent, routing rules, and inquiries on load if authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    const timer = setTimeout(() => {
      handleRunPingDiagnostic();
      handleFetchJourneys();
      handleFetchIntent();
      handleFetchRedirectConfig();
      handleFetchInquiries();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Periodic background sync when authenticated and auto-refresh enabled
  useEffect(() => {
    if (!isAuthenticated || !isAutoRefreshEnabled) return;

    const interval = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }
      handleFetchJourneys();
      handleFetchIntent();
      handleFetchInquiries();
      handleFetchRedirectConfig();
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated, isAutoRefreshEnabled]);

  const handleUpdateInquiryStatus = async (id: string, newStatus: "new" | "in_progress" | "archived") => {
    const updated = inquiries.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
    setInquiries(updated);
    localStorage.setItem("admin_inquiries", JSON.stringify(updated));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_status", id, status: newStatus }),
      });
      const data = await res.json();
      if (data.inquiries && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
        localStorage.setItem("admin_inquiries", JSON.stringify(data.inquiries));
        const currentItem = data.inquiries.find((item: Inquiry) => item.id === id);
        if (currentItem) setSelectedInquiry(currentItem);
      }
    } catch {
      // Graceful offline fallback
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Ви дійсно бажаєте видалити цю вхідну заявку?")) return;
    const updated = inquiries.filter((item) => item.id !== id);
    setInquiries(updated);
    localStorage.setItem("admin_inquiries", JSON.stringify(updated));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      const data = await res.json();
      if (data.inquiries && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
        localStorage.setItem("admin_inquiries", JSON.stringify(data.inquiries));
      } else {
        handleFetchInquiries();
      }
    } catch {
      // Graceful offline fallback
    }
  };

  const handleCreateInquirySubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isCreatingInquiry) return;
    if (!newInquiryForm.name.trim() || !newInquiryForm.email.trim()) {
      alert("Будь ласка, вкажіть ім'я та email контакту.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newInquiryForm.email.trim())) {
      alert("Будь ласка, вкажіть дійсний email адресат (наприклад: partner@company.com).");
      return;
    }

    setIsCreatingInquiry(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          name: newInquiryForm.name.trim(),
          email: newInquiryForm.email.trim(),
          projectType: newInquiryForm.projectType,
          message: newInquiryForm.message.trim() || "Зареєстровано вручну в кабінеті адміністратора",
          status: newInquiryForm.status,
        }),
      });
      const data = await res.json();
      if (data.success && data.inquiry) {
        setInquiries((prev) => [data.inquiry, ...prev]);
        setSelectedInquiry(data.inquiry);
        setShowCreateInquiryModal(false);
        setNewInquiryForm({
          name: "",
          email: "",
          projectType: "Industrial Automation & SCADA",
          message: "",
          status: "new",
        });
        handleFetchInquiries();
      } else {
        alert(data.error || "Помилка при створенні заявки на сервері");
      }
    } catch {
      alert("Помилка зв'язку з сервером при створенні заявки");
    } finally {
      setIsCreatingInquiry(false);
    }
  };

  const handleCopyEmail = async (email: string) => {
    await copyTextSafely(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSavePin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isChangingPin) return;
    setPinChangeError("");
    setPinChangeSuccess(false);

    const currentPin = currentPinInput.trim();
    const newPin = newPinInput.trim();
    const confirmPin = confirmPinInput.trim();

    if (!currentPin) {
      setPinChangeError("Введіть поточний PIN-код");
      return;
    }
    if (newPin.length < 4) {
      setPinChangeError("Новий PIN-код має містити щонайменше 4 символи");
      return;
    }
    if (newPin !== confirmPin) {
      setPinChangeError("Новий PIN та його підтвердження не співпадають");
      return;
    }
    if (newPin === currentPin) {
      setPinChangeError("Новий PIN-код повинен відрізнятися від поточного");
      return;
    }

    setIsChangingPin(true);
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change_pin",
          currentPin,
          newPin,
        }),
      });
      const data = await res.json();

      if (data.success && data.token) {
        sessionStorage.setItem("admin_session_token", data.token);
        localStorage.setItem("admin_session_token", data.token);
        localStorage.removeItem("admin_custom_pin");
        setPinChangeSuccess(true);
        setCurrentPinInput("");
        setNewPinInput("");
        setConfirmPinInput("");
        setShowNewPin(false);
        setShowCurrentPin(false);
        setTimeout(() => setPinChangeSuccess(false), 5000);
      } else {
        setPinChangeError(data.error || "Не вдалося змінити PIN-код");
      }
    } catch {
      setPinChangeError("Помилка зв'язку з сервером при зміні PIN-коду");
    } finally {
      setIsChangingPin(false);
    }
  };

  const handleToggleMaintenance = async () => {
    const newVal = !maintenanceMode;
    setMaintenanceMode(newVal);
    localStorage.setItem("admin_maintenance_mode", newVal ? "true" : "false");
    try {
      await fetch("/api/redirect-rules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maintenanceMode: newVal }),
      });
      handleFetchRedirectConfig();
    } catch {
      // offline fallback
    }
  };

  const handleToggleAutoRefresh = () => {
    setIsAutoRefreshEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("admin_auto_refresh", next ? "true" : "false");
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleRestoreBackupFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isRestoringBackup) return;
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const backup = JSON.parse(text);

      if (!backup || typeof backup !== "object") {
        alert("Некоректний формат файлу резервної копії.");
        return;
      }

      const hasValidData =
        Array.isArray(backup.inquiries) ||
        Array.isArray(backup.journeys) ||
        Array.isArray(backup.intentEvents) ||
        backup.redirectConfig;

      if (!hasValidData) {
        alert("Файл не містить дійсних даних конфігурації портфоліо.");
        return;
      }

      if (
        !window.confirm(
          `Відновити стан платформи з бекапу від ${backup.exportedAt || "невідомої дати"}?\nУсі поточні записи будуть оновлені.`
        )
      ) {
        return;
      }

      setIsRestoringBackup(true);
      setBackupRestoreMessage(null);

      const restorePromises: Promise<unknown>[] = [];

      // 1. Restore redirect config & maintenance mode
      if (backup.redirectConfig) {
        restorePromises.push(
          fetch("/api/redirect-rules", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "restore", config: backup.redirectConfig }),
          }).catch(() => {})
        );
      } else if (typeof backup.maintenanceMode === "boolean") {
        restorePromises.push(
          fetch("/api/redirect-rules", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ maintenanceMode: backup.maintenanceMode }),
          }).catch(() => {})
        );
      }

      // 2. Restore inquiries
      if (Array.isArray(backup.inquiries)) {
        restorePromises.push(
          fetch("/api/inquiries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "restore", inquiries: backup.inquiries }),
          }).catch(() => {})
        );
      }

      // 3. Restore journeys
      if (Array.isArray(backup.journeys)) {
        restorePromises.push(
          fetch("/api/visitors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "restore", journeys: backup.journeys }),
          }).catch(() => {})
        );
      }

      // 4. Restore intent events
      if (Array.isArray(backup.intentEvents)) {
        restorePromises.push(
          fetch("/api/intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "restore", events: backup.intentEvents }),
          }).catch(() => {})
        );
      }

      await Promise.all(restorePromises);

      // 5. Restore featured projects override
      if (backup.featuredProjects && typeof backup.featuredProjects === "object") {
        try {
          localStorage.setItem("admin_featured_projects", JSON.stringify(backup.featuredProjects));
          setFeaturedOverride(backup.featuredProjects);
        } catch {
          // ignore
        }
      }

      setBackupRestoreMessage({
        text: "✓ Резервну копію успішно відновлено на сервері!",
        isError: false,
      });

      // Refresh all state from server
      await Promise.all([
        handleFetchJourneys(),
        handleFetchIntent(),
        handleFetchInquiries(),
        handleFetchRedirectConfig(),
      ]);

      setTimeout(() => setBackupRestoreMessage(null), 6000);
    } catch {
      setBackupRestoreMessage({
        text: "Помилка при розборі файлу резервної копії",
        isError: true,
      });
    } finally {
      setIsRestoringBackup(false);
      e.target.value = "";
    }
  };

  const toggleJourneyExpanded = (id: string) => {
    setExpandedJourneys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExportDataJson = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      inquiries,
      journeys,
      intentEvents,
      redirectConfig,
      maintenanceMode,
      featuredProjects: featuredOverride,
      projectsCount: projectsList.length,
      system: "Roman Deyneko Engineering Portfolio Admin",
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-admin-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const navItems: NavItem[] = [
    { id: "overview", label: "Дашборд", icon: Activity },
    { id: "intent", label: "Рекрутери & CV", icon: Target, badge: intentCounts.cvDownloads },
    { id: "visitors", label: "Відвідувачі & Шляхи", icon: Compass, badge: journeyStats.external },
    { id: "routing", label: "Маршрутизатор", icon: Split, badge: redirectConfig.enabled ? redirectConfig.stats?.totalRedirected : undefined },
    { id: "projects", label: "Проєкти", icon: Layers },
    { id: "inquiries", label: "Заявки", icon: Inbox, badge: inquiries.filter((i) => i.status === "new").length },
    { id: "telemetry", label: "Мережа & Сервіси", icon: Radio },
    { id: "settings", label: "Налаштування", icon: Sliders },
  ];

  // ─── GATEKEEPER / AUTH VIEW ─────────────────────────────────
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08090a] text-[#777168] font-mono text-xs">
        <RefreshCw size={18} className="animate-spin text-[#c4a160] mr-2" />
        Ініціалізація захищеного шлюзу...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-[#08090a] relative overflow-hidden w-full max-w-full">
        <div className="absolute inset-0 bg-[radial-gradient(#c4a160_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#a39c91] hover:text-[#eeece5] transition-colors"
            >
              <ArrowLeft size={14} />
              На головну сторінку
            </Link>
            <div className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#c4a160] bg-[#c4a160]/10 px-2.5 py-1 rounded border border-[#c4a160]/20">
              SECURE GATEWAY
            </div>
          </div>

          <div data-hydrated={isHydrated ? "true" : "false"} className="rounded-2xl border border-white/10 bg-[#11100e]/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/80">
            <div className="w-12 h-12 rounded-xl bg-[#1c1917] border border-white/10 flex items-center justify-center text-[#c4a160] mb-5 shadow-inner">
              <Lock size={22} />
            </div>

            <h1 className="text-xl font-bold tracking-tight text-[#eeece5]">
              Кабінет Адміністратора
            </h1>
            <p className="mt-1 text-xs text-[#a39c91] font-mono">
              Введіть PIN-код або авторизуйтесь через Telegram OIDC
            </p>

            {authError && (
              <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLoginWithPin} className="mt-6 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#777168] mb-1.5">
                  Майстер-PIN / Пароль:
                </label>
                <div className="relative flex items-center">
                  <input
                    id="admin-pin-input"
                    name="pin"
                    autoComplete="current-password"
                    type={showPin ? "text" : "password"}
                    maxLength={32}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Введіть PIN (код: 2026)"
                    className="w-full rounded-xl bg-[#08090a] border border-white/15 px-4 py-3 pr-28 text-sm text-[#eeece5] placeholder:text-[#555048] font-mono focus:border-[#c4a160] focus:outline-none transition-colors"
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="p-1.5 text-[#777168] hover:text-[#eeece5] transition-colors cursor-pointer"
                      title={showPin ? "Приховати PIN" : "Показати PIN"}
                    >
                      {showPin ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      type="submit"
                      disabled={isLoggingIn}
                      className="px-3 py-1.5 rounded-lg bg-[#c4a160] hover:bg-[#d6b578] disabled:opacity-50 text-[#11100e] text-xs font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isLoggingIn ? "..." : "Вхід"}</span>
                      <Unlock size={12} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsTelegramModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 text-xs font-mono text-[#229ED9] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={14} />
                  Вхід через Telegram OIDC (@BotFather)
                </button>
              </div>
            </form>

            <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#777168]">
              <span>Roman Deyneko Engineering</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Gateway Online
              </span>
            </div>
          </div>
        </div>

        <TelegramAuthModal
          isOpen={isTelegramModalOpen}
          onClose={() => setIsTelegramModalOpen(false)}
          onSuccess={handleTelegramSuccess}
        />
      </div>
    );
  }

  // ─── AUTHENTICATED DASHBOARD ────────────────────────────────
  const filteredInquiries = inquiries.filter((inq) => {
    const q = inquirySearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (inq.id || "").toLowerCase().includes(q) ||
      (inq.name || "").toLowerCase().includes(q) ||
      (inq.email || "").toLowerCase().includes(q) ||
      (inq.date || "").toLowerCase().includes(q) ||
      (inq.message || "").toLowerCase().includes(q) ||
      (inq.projectType || "").toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (inquiryFilter === "all") return true;
    return inq.status === inquiryFilter;
  });

  const filteredProjects = projectsList.filter((proj: Project) => {
    const q = projectSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (proj.title || "").toLowerCase().includes(q) ||
      (proj.shortDescription || "").toLowerCase().includes(q) ||
      (proj.tags || []).some((t: string) => (t || "").toLowerCase().includes(q));

    if (!matchesSearch) return false;
    if (projectCategory === "all") return true;
    if (projectCategory === "featured") {
      return featuredOverride[proj.id] ?? true;
    }
    const cat = (proj.category || "").toLowerCase();
    if (projectCategory === "automation") {
      return (
        cat.includes("automation") ||
        (proj.tags || []).some((t) => (t || "").toLowerCase().includes("siemens") || (t || "").toLowerCase().includes("scada"))
      );
    }
    if (projectCategory === "mes") {
      return (
        cat.includes("mes") ||
        cat.includes("software") ||
        (proj.tags || []).some((t) => (t || "").toLowerCase().includes("mes") || (t || "").toLowerCase().includes("fastapi"))
      );
    }
    if (projectCategory === "embedded") {
      return (
        cat.includes("embedded") ||
        (proj.tags || []).some((t) => (t || "").toLowerCase().includes("mesh") || (t || "").toLowerCase().includes("esp") || (t || "").toLowerCase().includes("iot"))
      );
    }
    return proj.category === projectCategory;
  });

  return (
    <div className="min-h-screen bg-[#08090a] text-[#eeece5] flex flex-col w-full max-w-full overflow-x-hidden overflow-x-clip">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.09] bg-[#11100e]/95 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="w-11 h-11 sm:w-10 sm:h-10 rounded-lg bg-[#1c1917] border border-white/10 flex items-center justify-center text-[#a39c91] hover:text-[#eeece5] hover:border-white/30 active:scale-95 transition-all shrink-0"
              title="Перейти на публічний сайт"
            >
              <ArrowLeft size={16} />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#c4a160]" />
                <span className="font-bold text-sm tracking-tight text-[#eeece5]">
                  Control Panel
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-[0.14em] text-[#c4a160] bg-[#c4a160]/10 px-2 py-0.5 rounded border border-[#c4a160]/30">
                  v0.2.0-MES
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#777168] hidden sm:block">
                Roman Deyneko // Hardware & Full-Stack Platform
              </div>
            </div>
          </div>

          {/* Center Tabs for Desktop */}
          <nav className="hidden md:flex items-center gap-1 bg-[#08090a] p-1 rounded-xl border border-white/[0.08]">
            {navItems.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeTab === id
                    ? "bg-[#c4a160] text-[#11100e] font-semibold shadow-sm"
                    : "text-[#a39c91] hover:text-[#eeece5] hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={14} />
                <span>{label}</span>
                {typeof badge === "number" && badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      activeTab === id ? "bg-[#11100e] text-[#c4a160]" : "bg-[#c4a160]/20 text-[#c4a160]"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Actions: Live Auto-Refresh + Public Site Link + Logout */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAutoRefresh}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                isAutoRefreshEnabled
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                  : "bg-white/[0.04] border-white/10 text-[#777168] hover:text-[#a39c91]"
              }`}
              title={
                isAutoRefreshEnabled
                  ? "Авто-оновлення кожні 30с увімкнено (натисніть, щоб вимкнути)"
                  : "Увімкнути фонове авто-оновлення дашборду (кожні 30с)"
              }
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isAutoRefreshEnabled ? "bg-emerald-400 animate-pulse" : "bg-[#777168]"
                }`}
              />
              <span className="hidden sm:inline">Live 30s</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#a39c91] hover:text-[#eeece5] transition-colors"
            >
              <span>Сайт</span>
              <ExternalLink size={12} />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-mono transition-colors cursor-pointer"
              title="Вийти з кабінету"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Вихід</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-start gap-1.5 mt-3 pt-3 border-t border-white/[0.08] overflow-x-auto no-scrollbar overscroll-contain pb-1 w-full max-w-full min-w-0">
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs font-mono shrink-0 min-h-[44px] active:scale-95 transition-all cursor-pointer ${
                activeTab === id
                  ? "bg-[#c4a160] text-[#11100e] font-semibold shadow-sm"
                  : "text-[#a39c91] hover:text-[#eeece5] bg-white/[0.03]"
              }`}
            >
              <Icon size={14} />
              <span>{label}</span>
              {typeof badge === "number" && badge > 0 && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    activeTab === id ? "bg-[#11100e] text-[#c4a160]" : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-8 space-y-4 sm:space-y-6 pb-20 min-w-0 max-w-full overflow-x-hidden overflow-x-clip">
        {/* Maintenance Banner if Active */}
        {maintenanceMode && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-amber-400" />
              <span>
                <strong>УВАГА:</strong> Увімкнено демонстраційний режим планового техобслуговування.
              </span>
            </div>
            <button
              onClick={handleToggleMaintenance}
              className="text-[11px] underline hover:text-white cursor-pointer"
            >
              Вимкнути
            </button>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 1: OVERVIEW & DASHBOARD
           ──────────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-4 sm:space-y-6">
            {/* Top KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div
                onClick={() => setActiveTab("intent")}
                className="p-4 sm:p-5 rounded-2xl bg-[#11100e] border border-white/10 hover:border-[#c4a160]/40 transition-all cursor-pointer space-y-2 group shadow-sm"
                title="Перейти до аналітики рекрутерів та CV"
              >
                <div className="flex items-center justify-between text-[#777168] group-hover:text-[#a39c91] text-xs font-mono uppercase tracking-wider transition-colors">
                  <span>Завантажень CV</span>
                  <FileDown size={16} className="text-[#c4a160] group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-bold tracking-tight text-[#eeece5]">
                  {intentCounts.cvDownloads}
                </div>
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Конверсія в контакт: {intentCounts.conversionRate}
                </div>
              </div>

              <div
                onClick={() => setActiveTab("visitors")}
                className="p-4 sm:p-5 rounded-2xl bg-[#11100e] border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer space-y-2 group shadow-sm"
                title="Перейти до телеметрії та шляхів відвідувачів"
              >
                <div className="flex items-center justify-between text-[#777168] group-hover:text-[#a39c91] text-xs font-mono uppercase tracking-wider transition-colors">
                  <span>Зовнішні сесії</span>
                  <Users size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-bold tracking-tight text-cyan-400">
                  {journeyStats.external}
                </div>
                <div className="text-[11px] font-mono text-[#a39c91]">
                  Перенаправлено: {journeyStats.redirected} гостей
                </div>
              </div>

              <div
                onClick={() => setActiveTab("routing")}
                className="p-4 sm:p-5 rounded-2xl bg-[#11100e] border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer space-y-2 group shadow-sm"
                title="Перейти до налаштувань маршрутизатора гостей"
              >
                <div className="flex items-center justify-between text-[#777168] group-hover:text-[#a39c91] text-xs font-mono uppercase tracking-wider transition-colors">
                  <span>Маршрутизатор</span>
                  <Split size={16} className="text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl font-bold tracking-tight text-[#eeece5]">
                  {redirectConfig.enabled ? "ACTIVE" : "OFF"}
                </div>
                <div className="text-[11px] font-mono text-[#a39c91] truncate">
                  Режим: {redirectConfig.mode}
                </div>
              </div>

              <div
                onClick={() => setActiveTab("telemetry")}
                className="p-4 sm:p-5 rounded-2xl bg-[#11100e] border border-white/10 hover:border-emerald-400/40 transition-all cursor-pointer space-y-2 group shadow-sm"
                title="Перейти до мережевої телеметрії та діагностики сервісів"
              >
                <div className="flex items-center justify-between text-[#777168] group-hover:text-[#a39c91] text-xs font-mono uppercase tracking-wider transition-colors">
                  <span>Статус Сервісів</span>
                  <Server size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
                {(() => {
                  const healthPct =
                    pingData.length > 0
                      ? Math.round(
                          (pingData.filter(
                            (p) =>
                              (p.status.includes("200") || p.status.includes("OK")) &&
                              p.latencyMs < 1000
                          ).length /
                            pingData.length) *
                            100
                        )
                      : 100;
                  const isHealthy = healthPct >= 90;
                  const isDegraded = healthPct >= 50 && healthPct < 90;
                  const colorClass = isHealthy
                    ? "text-emerald-400"
                    : isDegraded
                    ? "text-amber-400"
                    : "text-rose-400";

                  return (
                    <>
                      <div className={`text-3xl font-bold tracking-tight ${colorClass}`}>
                        {pingData.length > 0 ? `${healthPct}% OK` : "99.8% OK"}
                      </div>
                      <div className={`text-[11px] font-mono ${colorClass} flex items-center gap-1`}>
                        {isHealthy ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        <span>
                          {pingData.length > 0
                            ? `${pingData.length} вузлів перевірено (${healthPct}% працездатні)`
                            : "ESP-NOW + API Operational"}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Recruiter Intent Quick Funnel Banner */}
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-[#11100e] to-[#181714] border border-[#c4a160]/20 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Target size={18} className="text-[#c4a160]" />
                  <div>
                    <h3 className="text-sm font-bold text-[#eeece5] font-mono">
                      ATS & RECRUITER CONVERSION FUNNEL
                    </h3>
                    <p className="text-xs text-[#a39c91]">
                      Проходження відвідувачів від першого кліку до завантаження CV та зв&apos;язку
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab("intent")}
                  className="px-3.5 py-1.5 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] text-xs font-mono font-semibold transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Повний звіт конверсій &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#777168]">1. Візити сайту</div>
                  <div className="text-xl font-bold text-[#eeece5]">{intentFunnel.impressions}</div>
                  <div className="text-[10px] text-[#a39c91] font-mono">100% аудиторія</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#777168]">2. Дослідження кейсів</div>
                  <div className="text-xl font-bold text-cyan-400">{intentFunnel.engaged}</div>
                  <div className="text-[10px] text-[#a39c91] font-mono">
                    {intentFunnel.impressions > 0
                      ? `${Math.round((intentFunnel.engaged / intentFunnel.impressions) * 100)}%`
                      : "0%"} взаємодія
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#777168]">3. Recruiter Mode</div>
                  <div className="text-xl font-bold text-amber-400">{intentCounts.recruiterModeOpens}</div>
                  <div className="text-[10px] text-[#a39c91] font-mono">Високий інтерес HR</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#08090a] border border-[#c4a160]/30 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#c4a160]">4. CV & Контакти</div>
                  <div className="text-xl font-bold text-[#c4a160]">
                    {intentCounts.cvDownloads + intentCounts.contactClicks}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono">
                    Конверсія: {intentCounts.conversionRate}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section: Quick Actions & Live Telemetry Snippet */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions Card */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-[#eeece5] uppercase tracking-wider font-mono flex items-center gap-2">
                  <Zap size={14} className="text-[#c4a160]" />
                  Швидкі операції
                </h3>

                <div className="space-y-2.5">
                  <button
                    onClick={() => setActiveTab("routing")}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Split size={14} className="text-amber-400" />
                      Налаштувати маршрутизатор гостей
                    </span>
                    <span className="text-[#777168]">&rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("visitors")}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Compass size={14} className="text-cyan-400" />
                      Повні шляхи відвідувачів ({journeyStats.total})
                    </span>
                    <span className="text-[#777168]">&rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("intent")}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Target size={14} className="text-[#c4a160]" />
                      Хто завантажував CV ({intentCounts.cvDownloads})
                    </span>
                    <span className="text-[#777168]">&rarr;</span>
                  </button>

                  <button
                    onClick={handleExportDataJson}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Download size={14} className="text-[#a39c91]" />
                      Експортувати повний бекап (JSON)
                    </span>
                    <span className="text-[#777168]">&darr;</span>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className="lg:col-span-2 p-4 sm:p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#eeece5] uppercase tracking-wider font-mono flex items-center gap-2">
                    <Inbox size={14} className="text-cyan-400" />
                    Останні вхідні звернення
                  </h3>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="text-xs font-mono text-[#c4a160] hover:underline cursor-pointer"
                  >
                    Усі заявки &rarr;
                  </button>
                </div>

                <div className="space-y-3">
                  {inquiries.length === 0 ? (
                    <div className="p-6 text-center rounded-xl bg-[#08090a] border border-white/[0.06] text-xs font-mono text-[#777168]">
                      Вхідних звернень поки немає. Заявки з форми контактів з&apos;являться тут.
                    </div>
                  ) : (
                    inquiries.slice(0, 3).map((inq) => (
                      <div
                        key={inq.id}
                        onClick={() => {
                          setSelectedInquiry(inq);
                          setInquiryFilter("all");
                          setActiveTab("inquiries");
                        }}
                        className="p-3.5 rounded-xl bg-[#08090a] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-[#eeece5]">{inq.name}</span>
                            <span className="text-[10px] font-mono text-[#777168]">{formatTelemetryTimestamp(inq.date, inq.id)}</span>
                            <span
                              className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase ${
                                inq.status === "new"
                                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                  : inq.status === "in_progress"
                                  ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                                  : "bg-white/5 text-[#777168] border border-white/10"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <div className="text-xs text-[#a39c91] font-mono mt-0.5 line-clamp-1">
                            {inq.projectType}: {inq.message}
                          </div>
                        </div>

                        <div className="text-[11px] font-mono text-[#c4a160] sm:text-right shrink-0">
                          {inq.email}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 2: INTENT TRACKING & RECRUITER CONVERSIONS
           ──────────────────────────────────────────────────────── */}
        {activeTab === "intent" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#eeece5] tracking-tight">
                  Аналітика Конверсій & Намірів Рекрутерів (Intent Tracking)
                </h2>
                <p className="text-xs text-[#a39c91] font-mono">
                  Завантаження CV, активації ATS-режиму, кліки по контактах та воронка рекрутера
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={handleExportIntentJson}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-xs font-mono text-[#eeece5] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Завантажити аналітику намірів у форматі JSON"
                >
                  <Download size={13} className="text-[#c4a160]" />
                  <span>Експорт JSON</span>
                </button>

                <button
                  onClick={handleExportIntentCsv}
                  disabled={intentEvents.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 text-xs font-mono text-[#eeece5] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Завантажити аналітику намірів у форматі CSV (Excel)"
                >
                  <Download size={13} className="text-cyan-400" />
                  <span>Експорт CSV</span>
                </button>

                <button
                  onClick={handleClearAllIntent}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Очистити всі зареєстровані події наміру"
                >
                  <Trash2 size={13} />
                  <span>Очистити</span>
                </button>

                <button
                  onClick={() => handleFetchIntent()}
                  disabled={isLoadingIntent}
                  className="px-4 py-2 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] disabled:opacity-50 text-[#11100e] text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <RefreshCw size={13} className={isLoadingIntent ? "animate-spin" : ""} />
                  <span>{isLoadingIntent ? "Оновлення..." : "Оновити аналітику"}</span>
                </button>
              </div>
            </div>

            {/* Visual ATS Conversion Funnel */}
            <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-bold text-xs font-mono uppercase tracking-wider text-[#eeece5] flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#c4a160]" />
                  Поетапна Воронка Рекрутера (ATS Candidate Funnel)
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  Загальна конверсія: {intentCounts.conversionRate}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
                <div className="p-4 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-[#777168] text-xs font-mono">
                    <span>1. Відвідувачі</span>
                    <Globe size={14} className="text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-[#eeece5]">{intentFunnel.impressions}</div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full w-full" />
                  </div>
                  <div className="text-[10px] font-mono text-[#777168]">100% аудиторії сайту</div>
                </div>

                <div className="p-4 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-[#777168] text-xs font-mono">
                    <span>2. Інтерес / Кейси</span>
                    <Eye size={14} className="text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-indigo-400">{intentFunnel.engaged}</div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-400 h-full"
                      style={{
                        width: `${Math.min(
                          Math.round((intentFunnel.engaged / Math.max(intentFunnel.impressions, 1)) * 100),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-[#777168]">
                    {intentFunnel.impressions > 0
                      ? `${Math.round((intentFunnel.engaged / intentFunnel.impressions) * 100)}%`
                      : "0%"} доскролили до робіт
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-2">
                  <div className="flex items-center justify-between text-[#777168] text-xs font-mono">
                    <span>3. Recruiter Mode</span>
                    <Zap size={14} className="text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-amber-400">{intentCounts.recruiterModeOpens}</div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full"
                      style={{
                        width: `${Math.min(
                          Math.round((intentCounts.recruiterModeOpens / Math.max(intentFunnel.impressions, 1)) * 100),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-[#777168]">Активовано HR-режим</div>
                </div>

                <div className="p-4 rounded-xl bg-[#08090a] border border-[#c4a160]/40 space-y-2">
                  <div className="flex items-center justify-between text-[#c4a160] text-xs font-mono">
                    <span>4. CV / Контакт</span>
                    <FileDown size={14} className="text-[#c4a160]" />
                  </div>
                  <div className="text-2xl font-bold text-[#c4a160]">
                    {intentCounts.cvDownloads + intentCounts.contactClicks}
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#c4a160] h-full"
                      style={{
                        width: `${Math.min(
                          Math.round(
                            ((intentCounts.cvDownloads + intentCounts.contactClicks) /
                              Math.max(intentFunnel.impressions, 1)) *
                              100
                          ),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400">
                    Успішна дія: {intentCounts.conversionRate}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Search & Filter Bar */}
            <div className="p-4 rounded-2xl bg-[#11100e] border border-white/10 space-y-3">
              {/* Search input */}
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777168]" />
                <input
                  type="text"
                  value={intentSearch}
                  onChange={(e) => {
                    const val = e.target.value;
                    setIntentSearch(val);
                    if (intentSearchTimer.current) clearTimeout(intentSearchTimer.current);
                    intentSearchTimer.current = setTimeout(() => {
                      handleFetchIntent(intentFilter, val);
                    }, 250);
                  }}
                  placeholder="Пошук дій за назвою, деталями, роллю, країною чи джерелом..."
                  className="w-full bg-[#08090a] border border-white/10 rounded-xl pl-9 pr-24 py-2 text-xs font-mono text-[#eeece5] placeholder:text-[#555048] focus:outline-none focus:border-[#c4a160]/50 transition-colors"
                />
                {intentSearch && (
                  <button
                    onClick={() => {
                      setIntentSearch("");
                      if (intentSearchTimer.current) clearTimeout(intentSearchTimer.current);
                      handleFetchIntent(intentFilter, "");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#a39c91] hover:text-[#eeece5] bg-white/[0.06] hover:bg-white/[0.1] px-2 py-0.5 rounded cursor-pointer transition-colors"
                  >
                    Очистити
                  </button>
                )}
              </div>

              {/* Filter Buttons & Counters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  <button
                    onClick={() => {
                      setIntentFilter("external");
                      handleFetchIntent("external", intentSearch);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                      intentFilter === "external"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <Globe size={13} />
                    <span>Лише рекрутери / зовнішні ({intentStats.external || intentCounts.external || 0})</span>
                  </button>

                  <button
                    onClick={() => {
                      setIntentFilter("admin");
                      handleFetchIntent("admin", intentSearch);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                      intentFilter === "admin"
                        ? "bg-[#c4a160]/20 text-[#c4a160] border border-[#c4a160]/40 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <User size={13} />
                    <span>Мої тестові кліки ({intentStats.admin || intentCounts.admin || 0})</span>
                  </button>

                  <button
                    onClick={() => {
                      setIntentFilter("cv");
                      handleFetchIntent("cv", intentSearch);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                      intentFilter === "cv"
                        ? "bg-[#c4a160]/20 text-[#c4a160] border border-[#c4a160]/40 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <FileDown size={13} />
                    <span>Завантаження CV ({intentCounts.cvDownloads || 0})</span>
                  </button>

                  <button
                    onClick={() => {
                      setIntentFilter("all");
                      handleFetchIntent("all", intentSearch);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                      intentFilter === "all"
                        ? "bg-white/15 text-[#eeece5] border border-white/30 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <span>Всі події ({intentStats.total || intentCounts.total || 0})</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-[#777168] shrink-0">
                  Знайдено: {intentEvents.length} подій
                </div>
              </div>
            </div>

            {/* Live Recruiter Stream */}
            <div className="space-y-3">
              {intentEvents.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#11100e] border border-white/10 text-xs font-mono text-[#777168] space-y-2">
                  <Activity size={24} className="mx-auto text-[#777168]/50 mb-1" />
                  <div>Подій наміру в цій вибірці не знайдено.</div>
                  <div className="text-[11px] text-[#555048]">
                    Спробуйте змінити фільтр або очистити рядок пошуку.
                  </div>
                </div>
              ) : (
                <>
                  {intentEvents.slice(0, visibleIntentCount).map((record) => {
                  const isCv = record.type === "cv_download";
                  const isRecruiter = record.type === "recruiter_modal_open";
                  const isContact = record.type.startsWith("contact_click_");
                  const isForm = record.type === "contact_form_submit";

                  return (
                    <div
                      key={record.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCv
                          ? "bg-[#11100e] border-[#c4a160]/40 shadow-sm shadow-[#c4a160]/5"
                          : record.isAdminDevice
                          ? "bg-[#11100e]/60 border-white/5"
                          : "bg-[#11100e] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold flex items-center gap-1 border ${
                              isCv
                                ? "bg-[#c4a160]/20 text-[#c4a160] border-[#c4a160]/40"
                                : isRecruiter
                                ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                : isForm
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                : isContact
                                ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                                : "bg-white/10 text-[#eeece5] border-white/20"
                            }`}
                          >
                            {isCv && <FileDown size={10} />}
                            {isRecruiter && <Zap size={10} />}
                            {isContact && <MousePointerClick size={10} />}
                            {isForm && <Send size={10} />}
                            <span>
                              {isCv
                                ? "CV DOWNLOAD"
                                : isRecruiter
                                ? "RECRUITER MODE"
                                : isForm
                                ? "LEAD FORM SUBMIT"
                                : isContact
                                ? "CONTACT CLICK"
                                : record.type.toUpperCase()}
                            </span>
                          </span>

                          <span className="text-xs font-bold text-[#eeece5]">
                            {record.label}
                          </span>

                          <span className="text-[10px] font-mono text-[#777168]">
                            {formatTelemetryTimestamp(record.timestamp, record.id)}
                          </span>

                          <span className="text-[10px] font-mono text-[#a39c91]">
                            {record.country}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleIntentAdmin(record.id);
                            }}
                            title="Клікніть для перемикання: Рекрутер ⇄ Ви (Тест)"
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full border cursor-pointer transition-opacity hover:opacity-80 ${
                              record.isAdminDevice
                                ? "bg-white/10 text-[#a39c91] border-white/20"
                                : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                            }`}
                          >
                            {record.isAdminDevice ? "👤 Ви (Тест)" : "🌐 Рекрутер"}
                          </button>
                        </div>

                        <div className="text-xs text-[#777168] font-mono flex flex-wrap items-center gap-3">
                          {record.details && (
                            <span className="text-[#c4a160] font-semibold">
                              Деталі: {record.details}
                            </span>
                          )}

                          <span>&bull;</span>

                          <span className="truncate max-w-[280px]">
                            Джерело: <span className="text-[#eeece5]">{record.referrer}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                        <span className="text-[10px] font-mono text-[#777168] bg-[#08090a] px-2.5 py-1 rounded border border-white/[0.06]">
                          {record.path}
                        </span>

                        <button
                          onClick={() => handleDeleteIntentEvent(record.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                          title="Видалити подію наміру"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {intentEvents.length > visibleIntentCount && (
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#11100e] border border-white/10 font-mono text-xs">
                    <div className="text-[#a39c91]">
                      Показано <span className="text-[#eeece5] font-bold">{Math.min(visibleIntentCount, intentEvents.length)}</span> із <span className="text-[#c4a160] font-bold">{intentEvents.length}</span> подій
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setVisibleIntentCount((prev) => prev + 25)}
                        className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#eeece5] transition-colors cursor-pointer"
                      >
                        Показати ще 25 подій
                      </button>
                      <button
                        onClick={() => setVisibleIntentCount(intentEvents.length)}
                        className="px-4 py-2 rounded-xl bg-[#c4a160]/10 hover:bg-[#c4a160]/20 border border-[#c4a160]/30 text-[#c4a160] transition-colors cursor-pointer"
                      >
                        Показати всі ({intentEvents.length})
                      </button>
                    </div>
                  </div>
                )}
              </>
              )}
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 3: FULL VISITOR JOURNEYS (CLICKSTREAM)
           ──────────────────────────────────────────────────────── */}
        {activeTab === "visitors" && (
          <div className="space-y-6">
            {/* Header & Main Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#eeece5] tracking-tight flex items-center gap-2">
                  <Compass className="text-[#c4a160]" size={20} />
                  <span>Повна Телеметрія та Шляхи Відвідувачів (Visitor Telemetry)</span>
                </h2>
                <p className="text-xs text-[#a39c91] font-mono mt-0.5">
                  Глибока діагностика апаратного забезпечення (GPU, CPU, RAM, батарея, Retina), мережі (RTT, Downlink), геолокації (IP, місто) та повний покроковий клікстрім
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={handleExportVisitorsJson}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-xs font-mono text-[#eeece5] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Завантажити зібрані дані телеметрії у форматі JSON"
                >
                  <Download size={13} className="text-[#c4a160]" />
                  <span>Експорт JSON</span>
                </button>

                <button
                  onClick={handleExportVisitorsCsv}
                  disabled={journeys.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 text-xs font-mono text-[#eeece5] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Завантажити зібрані дані телеметрії у форматі CSV"
                >
                  <Download size={13} className="text-cyan-400" />
                  <span>Експорт CSV</span>
                </button>

                <button
                  onClick={handleClearAllJourneys}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Очистити всю телеметрію та історію сесій"
                >
                  <Trash2 size={13} />
                  <span>Очистити</span>
                </button>

                <button
                  onClick={() => handleFetchJourneys()}
                  disabled={isLoadingJourneys}
                  className="px-4 py-2 rounded-xl bg-[#c4a160] hover:bg-[#d6b578] disabled:opacity-50 text-[#11100e] text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <RefreshCw size={13} className={isLoadingJourneys ? "animate-spin" : ""} />
                  <span>{isLoadingJourneys ? "Оновлення..." : "Оновити дані"}</span>
                </button>
              </div>
            </div>

            {/* Diagnostic KPI Metrics Banner */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#11100e] border border-white/10 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#777168] flex items-center justify-between">
                  <span>Трафік & Гості</span>
                  <Globe size={13} className="text-cyan-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-[#eeece5]">
                  {journeyStats.external} <span className="text-xs text-[#777168] font-normal">гостей</span>
                </div>
                <div className="text-[11px] font-mono text-[#a39c91] flex items-center gap-2">
                  <span>Всього сесій: {journeyStats.total}</span>
                  <span className="text-[#777168]">&bull;</span>
                  <span>Адмін: {journeyStats.admin}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#11100e] border border-white/10 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#777168] flex items-center justify-between">
                  <span>Конверсії & Редіректи</span>
                  <Target size={13} className="text-[#c4a160]" />
                </div>
                <div className="text-2xl font-bold font-mono text-[#c4a160]">
                  {journeyStats.converted} <span className="text-xs text-[#777168] font-normal">конверсій</span>
                </div>
                <div className="text-[11px] font-mono text-[#a39c91] flex items-center gap-2">
                  <span>Редіректи роутера: {journeyStats.redirected}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#11100e] border border-white/10 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#777168] flex items-center justify-between">
                  <span>Пристрої</span>
                  <Monitor size={13} className="text-emerald-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-[#eeece5]">
                  {journeyStats.desktop || 0} <span className="text-xs text-[#777168] font-normal">десктоп</span>
                </div>
                <div className="text-[11px] font-mono text-[#a39c91] flex items-center gap-2">
                  <span>Мобільні / Планшети: {journeyStats.mobile || 0}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#11100e] border border-white/10 space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#777168] flex items-center justify-between">
                  <span>Топ Локації</span>
                  <MapPin size={13} className="text-rose-400" />
                </div>
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {journeyStats.topCountries && journeyStats.topCountries.length > 0 ? (
                    journeyStats.topCountries.map((c, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded-md text-[#eeece5]"
                      >
                        {c.country} ({c.count})
                      </span>
                    ))
                  ) : (
                    <span className="text-xs font-mono text-[#777168]">Немає даних</span>
                  )}
                </div>
              </div>
            </div>

            {/* Device Recognition Status Box */}
            <div className="p-4 rounded-2xl bg-[#11100e] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isCurrentDeviceAdmin
                      ? "bg-[#c4a160]/20 text-[#c4a160] border border-[#c4a160]/40"
                      : "bg-white/5 text-[#777168] border border-white/10"
                  }`}
                >
                  <Laptop size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#eeece5] font-semibold">Ваш поточний пристрій:</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full uppercase ${
                        isCurrentDeviceAdmin
                          ? "bg-[#c4a160]/20 text-[#c4a160] font-bold border border-[#c4a160]/40"
                          : "bg-white/5 text-[#777168] border border-white/10"
                      }`}
                    >
                      {isCurrentDeviceAdmin ? "👤 Зареєстровано як пристрій Адміна" : "🌐 Зовнішній / Невідомий"}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#777168] mt-0.5">
                    {isCurrentDeviceAdmin
                      ? "Всі сесії з цього браузера автоматично маркуються як 'Ви (Адмін)', не перенаправляються роутером і виключаються з фільтру гостей."
                      : "Цей браузер ще не був зафіксований як адмінський. Увійдіть у кабінет, щоб закріпити його."}
                  </div>
                </div>
              </div>

              <button
                onClick={handleToggleAdminDevice}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] text-[#a39c91] hover:text-[#eeece5] transition-colors cursor-pointer self-start sm:self-auto shrink-0"
              >
                {isCurrentDeviceAdmin ? "Скинути мітку для тесту" : "Позначити пристрій як адмінський"}
              </button>
            </div>

            {/* Live Search & Filter Bar */}
            <div className="p-4 rounded-2xl bg-[#11100e] border border-white/10 space-y-3">
              {/* Search input */}
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777168]" />
                <input
                  type="text"
                  value={journeySearch}
                  onChange={(e) => {
                    const val = e.target.value;
                    setJourneySearch(val);
                    if (journeySearchTimer.current) clearTimeout(journeySearchTimer.current);
                    journeySearchTimer.current = setTimeout(() => {
                      handleFetchJourneys(journeyFilter, val);
                    }, 250);
                  }}
                  placeholder="Пошук за IP, містом, країною, моделлю відеокарти (GPU), ОС, браузером, UTM чи ID сесії..."
                  className="w-full bg-[#08090a] border border-white/10 rounded-xl pl-9 pr-24 py-2 text-xs font-mono text-[#eeece5] placeholder:text-[#555048] focus:outline-none focus:border-[#c4a160]/50 transition-colors"
                />
                {journeySearch && (
                  <button
                    onClick={() => {
                      setJourneySearch("");
                      if (journeySearchTimer.current) clearTimeout(journeySearchTimer.current);
                      handleFetchJourneys(journeyFilter, "");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#a39c91] hover:text-[#eeece5] bg-white/[0.06] hover:bg-white/[0.1] px-2 py-0.5 rounded cursor-pointer transition-colors"
                  >
                    Очистити
                  </button>
                )}
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-white/[0.06] w-full min-w-0">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 w-full max-w-full min-w-0">
                  <button
                    onClick={() => {
                      setJourneyFilter("external");
                      handleFetchJourneys("external", journeySearch);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                      journeyFilter === "external"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <Globe size={12} />
                    <span>Лише гості ({journeyStats.external})</span>
                  </button>

                  <button
                    onClick={() => {
                      setJourneyFilter("converted");
                      handleFetchJourneys("converted", journeySearch);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                      journeyFilter === "converted"
                        ? "bg-[#c4a160]/20 text-[#c4a160] border border-[#c4a160]/40 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <Target size={12} />
                    <span>З діями CV/контакти ({journeyStats.converted})</span>
                  </button>

                  <button
                    onClick={() => {
                      setJourneyFilter("redirected");
                      handleFetchJourneys("redirected", journeySearch);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                      journeyFilter === "redirected"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <Split size={12} />
                    <span>Перенаправлені ⚡ ({journeyStats.redirected})</span>
                  </button>

                  <button
                    onClick={() => {
                      setJourneyFilter("desktop");
                      handleFetchJourneys("desktop", journeySearch);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                      journeyFilter === "desktop"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <Laptop size={12} />
                    <span>💻 Десктоп ({journeyStats.desktop || 0})</span>
                  </button>

                  <button
                    onClick={() => {
                      setJourneyFilter("mobile");
                      handleFetchJourneys("mobile", journeySearch);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                      journeyFilter === "mobile"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <Smartphone size={12} />
                    <span>📱 Мобільні ({journeyStats.mobile || 0})</span>
                  </button>

                  <button
                    onClick={() => {
                      setJourneyFilter("bots");
                      handleFetchJourneys("bots", journeySearch);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                      journeyFilter === "bots"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <span>🤖 Боти ({journeyStats.bots || 0})</span>
                  </button>

                  <button
                    onClick={() => {
                      setJourneyFilter("admin");
                      handleFetchJourneys("admin", journeySearch);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                      journeyFilter === "admin"
                        ? "bg-white/15 text-[#eeece5] border border-white/30 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <User size={12} />
                    <span>Адмін ({journeyStats.admin})</span>
                  </button>

                  <button
                    onClick={() => {
                      setJourneyFilter("all");
                      handleFetchJourneys("all", journeySearch);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      journeyFilter === "all"
                        ? "bg-white/15 text-[#eeece5] border border-white/30 font-semibold"
                        : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    <span>Всі ({journeyStats.total})</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-[#777168]">
                  Знайдено: {journeys.length} сесій
                </div>
              </div>
            </div>

            {/* Interactive Structured Journey Cards */}
            <div className="space-y-4">
              {journeys.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#11100e] border border-white/10 text-xs font-mono text-[#777168] space-y-2">
                  <Compass size={24} className="mx-auto text-[#777168]/50 mb-1" />
                  <div>Сесій у цій вибірці не знайдено.</div>
                  <div className="text-[11px] text-[#555048]">
                    Спробуйте змінити фільтри або очистити рядок пошуку.
                  </div>
                </div>
              ) : (
                <>
                  {journeys.slice(0, visibleJourneysCount).map((j) => {
                  const isExpanded = expandedJourneys[j.id] ?? false;

                  return (
                    <div
                      key={j.id}
                      className={`p-5 rounded-2xl border transition-all space-y-4 ${
                        j.converted
                          ? "bg-[#11100e] border-[#c4a160]/40 shadow-md shadow-[#c4a160]/5"
                          : j.isAdminDevice
                          ? "bg-[#11100e]/70 border-white/10"
                          : "bg-[#11100e] border-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Session Top Bar */}
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Device / Status Pill (Clickable Toggle) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleSessionAdmin(j.id);
                            }}
                            title="Клікніть, щоб змінити: Гість ⇄ Ви (Адмін)"
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold flex items-center gap-1 border cursor-pointer hover:opacity-80 transition-opacity ${
                              j.isAdminDevice
                                ? "bg-white/10 text-[#a39c91] border-white/20 hover:border-white/40"
                                : j.converted
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
                            }`}
                          >
                            {j.isAdminDevice ? <User size={10} /> : <Globe size={10} />}
                            <span>{j.isAdminDevice ? "Ви (Адмін)" : "Гість"}</span>
                          </button>

                          {/* Country & City */}
                          <span className="text-xs font-bold font-mono text-[#eeece5] flex items-center gap-1">
                            <span>{j.country}</span>
                            {j.city && j.city !== "Unknown City" && (
                              <span className="text-[#a39c91] font-normal">&bull; {j.city}</span>
                            )}
                          </span>

                          {/* IP Pill with Copy Button */}
                          <span className="inline-flex items-center gap-1 bg-[#08090a] border border-white/10 rounded-md px-2 py-0.5 text-[11px] font-mono text-[#eeece5]">
                            <span className="text-[#777168]">IP:</span>
                            <span>{j.ip}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyIp(j.ip);
                              }}
                              className="text-[#a39c91] hover:text-[#c4a160] transition-colors ml-0.5 cursor-pointer"
                              title="Копіювати IP адресу"
                            >
                              {copiedIp === j.ip ? (
                                <Check size={11} className="text-emerald-400" />
                              ) : (
                                <Copy size={11} />
                              )}
                            </button>
                          </span>

                          {/* Visit Counter */}
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#a39c91]">
                            Візит #{j.visitCount || 1}
                          </span>

                          {/* Started At & Duration */}
                          <span className="text-[11px] font-mono text-[#777168]">
                            {formatTelemetryTimestamp(j.startedAt, j.id)}
                            {j.lastActiveAt && j.lastActiveAt !== j.startedAt && (
                              <span className="text-[#a39c91]"> &rarr; {formatTelemetryTimestamp(j.lastActiveAt, j.id)}</span>
                            )}{" "}
                            &bull; ⏱️ {j.totalDurationSec} сек на сайті
                          </span>

                          {/* Conversion Badge */}
                          {j.converted && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#c4a160]/20 text-[#c4a160] border border-[#c4a160]/40 font-semibold flex items-center gap-1">
                              <Target size={9} />
                              <span>Конверсія в лід</span>
                            </span>
                          )}

                          {/* Bot Indicator */}
                          {j.system?.isBotOrHeadless && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold">
                              🤖 Headless/Bot
                            </span>
                          )}
                        </div>

                        {/* Action Buttons & Quick Referrer */}
                        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0">
                          <span className="text-[11px] font-mono text-[#777168] truncate max-w-[200px]">
                            Вхід: <span className="text-[#eeece5]">{j.marketing?.referrerDomain || j.referrer}</span>
                          </span>

                          <button
                            onClick={() => toggleJourneyExpanded(j.id)}
                            className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <span>{isExpanded ? "Згорнути" : "Детальна телеметрія"}</span>
                            <span className="text-[10px] text-[#c4a160] font-bold">
                              ({(j.steps?.length || 0)} кроків)
                            </span>
                            {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteJourney(j.id);
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                            title="Видалити сесію"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Quick Diagnostic Hardware & Network Tags Bar */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                        {/* Device / OS / Browser */}
                        <span className="bg-[#08090a] border border-white/[0.08] px-2.5 py-1 rounded-lg text-[#eeece5] flex items-center gap-1.5">
                          {j.deviceType === "mobile" ? (
                            <Smartphone size={12} className="text-indigo-400" />
                          ) : j.deviceType === "tablet" ? (
                            <Tablet size={12} className="text-purple-400" />
                          ) : (
                            <Laptop size={12} className="text-cyan-400" />
                          )}
                          <span>
                            {j.system?.os || j.os} {j.system?.osVersion || ""} &bull; {j.system?.browser || j.browser} {j.system?.browserVersion ? `v${String(j.system.browserVersion).replace(/^v/, "").split(".")[0]}` : ""}
                          </span>
                        </span>

                        {/* GPU Tag */}
                        {j.hardware?.gpuRenderer && (
                          <span
                            className="bg-[#08090a] border border-white/[0.08] px-2.5 py-1 rounded-lg text-[#c4a160] flex items-center gap-1.5 max-w-[280px] truncate"
                            title={j.hardware.gpuRenderer}
                          >
                            <Zap size={12} className="shrink-0" />
                            <span className="truncate">GPU: {j.hardware.gpuRenderer}</span>
                          </span>
                        )}

                        {/* Screen Resolution & Retina */}
                        <span className="bg-[#08090a] border border-white/[0.08] px-2.5 py-1 rounded-lg text-[#a39c91] flex items-center gap-1.5">
                          <Maximize2 size={12} className="text-[#777168]" />
                          <span>
                            {j.hardware?.screenResolution || j.screenResolution}
                            {j.hardware?.pixelRatio && j.hardware.pixelRatio > 1 && (
                              <span className="text-[#c4a160] ml-1">({j.hardware.pixelRatio}x Retina)</span>
                            )}
                          </span>
                        </span>

                        {/* Network Quality */}
                        {j.network && (
                          <span className="bg-[#08090a] border border-white/[0.08] px-2.5 py-1 rounded-lg text-[#a39c91] flex items-center gap-1.5">
                            <Wifi size={12} className={j.network.isOnline ? "text-emerald-400" : "text-rose-400"} />
                            <span>
                              {j.network.effectiveType.toUpperCase()}
                              {j.network.downlink ? ` • ${j.network.downlink}` : ""}
                              {j.network.rtt ? ` (${j.network.rtt})` : ""}
                            </span>
                          </span>
                        )}

                        {/* Battery */}
                        {j.hardware?.batteryLevel !== null && j.hardware?.batteryLevel !== undefined && (
                          <span className="bg-[#08090a] border border-white/[0.08] px-2.5 py-1 rounded-lg text-[#a39c91] flex items-center gap-1.5">
                            {j.hardware.batteryCharging ? (
                              <BatteryCharging size={12} className="text-emerald-400" />
                            ) : (
                              <Battery size={12} className="text-[#c4a160]" />
                            )}
                            <span>
                              {j.hardware.batteryLevel}%
                              {j.hardware.batteryCharging && <span className="text-emerald-400 ml-1">⚡</span>}
                            </span>
                          </span>
                        )}

                        {/* UTM Campaign badge */}
                        {j.marketing?.utmCampaign && (
                          <span className="bg-purple-500/10 border border-purple-500/30 text-purple-300 px-2 py-0.5 rounded-lg text-[10px]">
                            utm: {j.marketing.utmCampaign}
                          </span>
                        )}
                      </div>

                      {/* Redirection Alert Banner if Triggered */}
                      {j.redirectTriggered && (
                        <div className="p-3 rounded-xl bg-amber-500/[0.08] border border-amber-500/25 text-xs font-mono text-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 w-full min-w-0">
                          <div className="flex items-center gap-2">
                            <Split size={14} className="text-amber-400 shrink-0" />
                            <span>
                              <strong>АВТОМАТИЧНИЙ РЕДІРЕКТ:</strong> Гість перенаправлений з{" "}
                              <code className="text-white bg-black/40 px-1.5 py-0.5 rounded">
                                {j.redirectTriggered.from}
                              </code>{" "}
                              на{" "}
                              <code className="text-white bg-black/40 px-1.5 py-0.5 rounded">
                                {j.redirectTriggered.to}
                              </code>{" "}
                              (Правило: {j.redirectTriggered.rule})
                            </span>
                          </div>
                          <span className="text-[10px] text-amber-400/80">
                            {formatTelemetryTimestamp(j.redirectTriggered.timestamp, j.id)}
                          </span>
                        </div>
                      )}

                      {/* Expanded Deep Structured Telemetry Panels */}
                      {isExpanded && (
                        <div className="space-y-4 pt-3 border-t border-white/[0.08]">
                          {/* 4 Structured Information Categories */}
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
                            {/* Panel 1: Network & Geo */}
                            <div className="p-4 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-2.5">
                              <div className="text-xs font-bold font-mono text-[#c4a160] flex items-center gap-1.5 border-b border-white/[0.06] pb-2">
                                <Globe size={13} />
                                <span>1. Мережа та Географія</span>
                              </div>
                              <div className="space-y-1.5 text-xs font-mono">
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">IP-адреса:</span>
                                  <span className="text-[#eeece5] font-semibold flex items-center gap-1">
                                    {j.ip}
                                    <button
                                      onClick={() => handleCopyIp(j.ip)}
                                      className="text-[#a39c91] hover:text-[#c4a160] cursor-pointer"
                                    >
                                      {copiedIp === j.ip ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                                    </button>
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Країна:</span>
                                  <span className="text-[#eeece5]">{j.country}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Місто / Регіон:</span>
                                  <span className="text-[#eeece5] text-right truncate max-w-[130px]" title={`${j.city || ""} ${j.region || ""}`}>
                                    {j.city || "—"} {j.region ? `(${j.region})` : ""}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Часовий пояс:</span>
                                  <span className="text-[#eeece5] text-right truncate max-w-[130px]" title={j.timezone}>
                                    {j.timezone || "—"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Зсув часу:</span>
                                  <span className="text-[#eeece5]">{j.timezoneOffset || "—"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Тип з&apos;єднання:</span>
                                  <span className="text-emerald-400 font-semibold uppercase">{j.network?.effectiveType || "4G"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Швидкість / RTT:</span>
                                  <span className="text-[#eeece5]">
                                    {j.network?.downlink || "—"} {j.network?.rtt ? `(${j.network.rtt})` : ""}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Економія даних:</span>
                                  <span className="text-[#eeece5]">{j.network?.saveData ? "Увімкнено (Save-Data)" : "Вимкнено"}</span>
                                </div>
                              </div>
                            </div>

                            {/* Panel 2: Hardware & Display */}
                            <div className="p-4 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-2.5">
                              <div className="text-xs font-bold font-mono text-cyan-400 flex items-center gap-1.5 border-b border-white/[0.06] pb-2">
                                <Cpu size={13} />
                                <span>2. Залізо та Дисплей</span>
                              </div>
                              <div className="space-y-1.5 text-xs font-mono">
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Процесор (CPU):</span>
                                  <span className="text-[#eeece5]">
                                    {j.hardware?.cpuCores ? `${j.hardware.cpuCores} ядер` : "—"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">ОЗП (RAM):</span>
                                  <span className="text-[#eeece5]">
                                    {j.hardware?.memoryGb ? `~${j.hardware.memoryGb} GB` : "—"}
                                  </span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[#777168] block">Відеокарта (GPU):</span>
                                  <span className="text-[#c4a160] text-[11px] block truncate font-semibold" title={j.hardware?.gpuRenderer || "Не визначено"}>
                                    {j.hardware?.gpuRenderer || "Generic WebGL"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Дисплей:</span>
                                  <span className="text-[#eeece5]">{j.hardware?.screenResolution || j.screenResolution}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Вікно (Viewport):</span>
                                  <span className="text-[#eeece5]">{j.hardware?.viewport || "—"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Retina DPR / Колір:</span>
                                  <span className="text-[#eeece5]">
                                    {j.hardware?.pixelRatio || 1}x &bull; {j.hardware?.colorDepth || 24}-bit
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Сенсор (Touch):</span>
                                  <span className="text-[#eeece5]">
                                    {j.hardware?.touchSupport ? `Так (${j.hardware.maxTouchPoints} точок)` : "Ні"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Батарея:</span>
                                  <span className="text-[#eeece5]">
                                    {j.hardware?.batteryLevel !== null && j.hardware?.batteryLevel !== undefined
                                      ? `${j.hardware.batteryLevel}% ${j.hardware.batteryCharging ? "(Живлення ⚡)" : "(АКБ 🔋)"}`
                                      : "Не надано"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Panel 3: System & Software */}
                            <div className="p-4 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-2.5">
                              <div className="text-xs font-bold font-mono text-emerald-400 flex items-center gap-1.5 border-b border-white/[0.06] pb-2">
                                <Terminal size={13} />
                                <span>3. Система та Браузер</span>
                              </div>
                              <div className="space-y-1.5 text-xs font-mono">
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Операційна система:</span>
                                  <span className="text-[#eeece5]">
                                    {j.system?.os || j.os} {j.system?.osVersion || ""}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Браузер:</span>
                                  <span className="text-[#eeece5]">
                                    {j.system?.browser || j.browser} {j.system?.browserVersion ? `v${j.system.browserVersion}` : ""}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Основна мова:</span>
                                  <span className="text-[#eeece5]">{j.system?.language || "—"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Тема оформлення:</span>
                                  <span className="text-[#eeece5] flex items-center gap-1">
                                    {j.system?.colorScheme === "dark" ? <Moon size={11} className="text-indigo-400" /> : <Sun size={11} className="text-amber-400" />}
                                    <span>{j.system?.colorScheme === "dark" ? "Темна (Dark)" : "Світла (Light)"}</span>
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Зменшений рух:</span>
                                  <span className="text-[#eeece5]">{j.system?.reducedMotion ? "Увімкнено" : "Вимкнено"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Cookies / PDF:</span>
                                  <span className="text-[#eeece5]">
                                    {j.system?.cookiesEnabled ? "Cookies ✓" : "Cookies ✕"} &bull; {j.system?.pdfViewerEnabled ? "PDF ✓" : "PDF ✕"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Do Not Track:</span>
                                  <span className="text-[#eeece5]">{j.system?.doNotTrack ? "Активовано (1)" : "Вимкнено (0)"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">WebDriver / Bot:</span>
                                  <span className={j.system?.isBotOrHeadless ? "text-rose-400 font-bold" : "text-emerald-400"}>
                                    {j.system?.isBotOrHeadless ? "⚠️ Headless" : "✓ Звичайний"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Panel 4: Marketing & Navigation */}
                            <div className="p-4 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-2.5">
                              <div className="text-xs font-bold font-mono text-purple-400 flex items-center gap-1.5 border-b border-white/[0.06] pb-2">
                                <Route size={13} />
                                <span>4. Джерело та UTM</span>
                              </div>
                              <div className="space-y-1.5 text-xs font-mono">
                                <div className="space-y-0.5">
                                  <span className="text-[#777168] block">Джерело переходу:</span>
                                  <span className="text-[#eeece5] text-[11px] block truncate" title={j.marketing?.referrer || j.referrer}>
                                    {j.marketing?.referrer || j.referrer}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Домен джерела:</span>
                                  <span className="text-[#c4a160] font-semibold">{j.marketing?.referrerDomain || "Direct"}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Вхідна сторінка:</span>
                                  <span className="text-[#eeece5] truncate max-w-[130px]" title={j.marketing?.landingPage || j.entryPath}>
                                    {j.marketing?.landingPage || j.entryPath}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Поточна сторінка:</span>
                                  <span className="text-[#eeece5] truncate max-w-[130px]" title={j.currentPath}>
                                    {j.currentPath}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">Час завантаження:</span>
                                  <span className="text-[#eeece5]">
                                    {j.marketing?.pageLoadTimeMs ? `${j.marketing.pageLoadTimeMs} мс` : "—"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">UTM Campaign:</span>
                                  <span className="text-purple-300 font-semibold truncate max-w-[120px]" title={j.marketing?.utmCampaign || "—"}>
                                    {j.marketing?.utmCampaign || "—"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">UTM Source:</span>
                                  <span className="text-[#eeece5] truncate max-w-[120px]" title={j.marketing?.utmSource || "—"}>
                                    {j.marketing?.utmSource || "—"}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-[#777168]">UTM Medium:</span>
                                  <span className="text-[#eeece5] truncate max-w-[120px]" title={j.marketing?.utmMedium || "—"}>
                                    {j.marketing?.utmMedium || "—"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Raw User Agent Box with 1-Click Copy */}
                          {j.system?.userAgent && (
                            <div className="p-3 rounded-xl bg-[#08090a] border border-white/[0.08] flex items-center justify-between gap-3 text-xs font-mono">
                              <div className="flex items-center gap-2 overflow-hidden">
                                <Terminal size={13} className="text-[#777168] shrink-0" />
                                <span className="text-[#777168] shrink-0">User-Agent:</span>
                                <span className="text-[#a39c91] text-[11px] truncate select-all">
                                  {j.system.userAgent}
                                </span>
                              </div>
                              <button
                                onClick={() => handleCopyUa(j.system?.userAgent || "")}
                                className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] text-[#eeece5] flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
                              >
                                {copiedUa === j.system.userAgent ? (
                                  <>
                                    <Check size={11} className="text-emerald-400" />
                                    <span>Скопійовано!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={11} />
                                    <span>Копіювати UA</span>
                                  </>
                                )}
                              </button>
                            </div>
                          )}

                          {/* Clickstream Trail */}
                          <div className="pt-2 space-y-3">
                            <div className="text-[11px] font-mono uppercase tracking-wider text-[#777168] flex items-center gap-1.5">
                              <Route size={13} className="text-[#c4a160]" />
                              <span>Повна хронологія дій та переходів ({(j.steps?.length || 0)} кроків):</span>
                            </div>

                            <div className="relative pl-6 space-y-3 border-l-2 border-white/10 ml-2">
                              {(j.steps || []).map((step, idx) => (
                                <div key={idx} className="relative space-y-1">
                                  <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#c4a160] border-2 border-[#11100e]" />

                                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[#777168]">{formatTelemetryTimestamp(step.timestamp, j.id)}</span>
                                      <span className="font-bold text-[#eeece5] bg-[#08090a] px-2 py-0.5 rounded border border-white/[0.08]">
                                        {step.path}
                                      </span>
                                      <span className="text-xs text-[#a39c91]">
                                        {step.action}
                                      </span>
                                    </div>

                                    <span className="text-[11px] text-[#777168]">
                                      Час на кроці: ~{step.durationSec} сек
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {journeys.length > visibleJourneysCount && (
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-[#11100e] border border-white/10 font-mono text-xs">
                    <div className="text-[#a39c91]">
                      Показано <span className="text-[#eeece5] font-bold">{Math.min(visibleJourneysCount, journeys.length)}</span> із <span className="text-[#c4a160] font-bold">{journeys.length}</span> сесій
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setVisibleJourneysCount((prev) => prev + 25)}
                        className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#eeece5] transition-colors cursor-pointer"
                      >
                        Показати ще 25 сесій
                      </button>
                      <button
                        onClick={() => setVisibleJourneysCount(journeys.length)}
                        className="px-4 py-2 rounded-xl bg-[#c4a160]/10 hover:bg-[#c4a160]/20 border border-[#c4a160]/30 text-[#c4a160] transition-colors cursor-pointer"
                      >
                        Показати всі ({journeys.length})
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 4: GUEST TRAFFIC ROUTER (REDIRECTION ENGINE)
           ──────────────────────────────────────────────────────── */}
        {activeTab === "routing" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#eeece5] tracking-tight">
                  Маршрутизатор Гостей (Smart Traffic Router)
                </h2>
                <p className="text-xs text-[#a39c91] font-mono">
                  Спрямування зовнішніх відвідувачів на різні версії сайту, специфічні інженерні кейси або зовнішні посилання
                  {redirectConfig.updatedAt && (
                    <span className="text-[#777168] block mt-0.5">
                      Остання зміна конфігурації: {formatTelemetryTimestamp(redirectConfig.updatedAt)}
                    </span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveRedirectConfig}
                  disabled={isSavingRedirect}
                  className="px-4 py-2 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] disabled:opacity-50 text-[#11100e] text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-[#c4a160]/20"
                >
                  <RefreshCw size={14} className={isSavingRedirect ? "animate-spin" : "hidden"} />
                  {!isSavingRedirect && <Check size={14} />}
                  <span>{isSavingRedirect ? "Збереження..." : "Зберегти налаштування"}</span>
                </button>
              </div>
            </div>

            {redirectSaveSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>✓ Правило маршрутизації успішно збережено та активовано для всіх зовнішніх гостей!</span>
              </div>
            )}

            {/* Master Switch */}
            <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Split size={18} className="text-[#c4a160]" />
                  <span className="text-sm font-bold text-[#eeece5]">
                    Статус Перенаправлення Гостей
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold border ${
                      isRedirectEnabled
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-white/5 text-[#777168] border-white/10"
                    }`}
                  >
                    {isRedirectEnabled ? "УВІМКНЕНО" : "ВИМКНЕНО"}
                  </span>
                </div>
                <p className="text-xs text-[#a39c91]">
                  Коли увімкнено, гості, які заходять на головну сторінку, будуть автоматично перенаправлені за обраним правилом.
                </p>
              </div>

              <button
                onClick={handleToggleRedirectMaster}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer shrink-0 ${
                  isRedirectEnabled
                    ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
                }`}
              >
                {isRedirectEnabled ? "Вимкнути перенаправлення" : "Увімкнути перенаправлення"}
              </button>
            </div>

            {/* Redirection Scenarios Grid */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#777168]">
                Оберіть цільову версію або сценарій перенаправлення:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: "default" as RedirectMode,
                    title: "Стандартний режим (Без перенаправлення)",
                    desc: "Гості потрапляють на звичайну головну сторінку портфоліо з оглядом усіх напрямків.",
                    target: "/",
                    badge: "Головна",
                  },
                  {
                    id: "hardware_focus" as RedirectMode,
                    title: "Фокус на Hardware & Automation",
                    desc: "Спрямовує гостей на кейс автоматизації виробничих ліній та оптимізації PLC (Goodvalley).",
                    target: "/projects/goodvalley-automation",
                    badge: "Hardware",
                  },
                  {
                    id: "mes_focus" as RedirectMode,
                    title: "Фокус на Industrial MES Platform",
                    desc: "Перенаправляє на промислову платформу моніторингу виробництва (FastAPI + React 19 Canvas).",
                    target: "/projects/wfm-industrial-mes",
                    badge: "MES Platform",
                  },
                  {
                    id: "recruiter_fasttrack" as RedirectMode,
                    title: "Executive Brief (1-Хв Резюме)",
                    desc: "Відкриває головну сторінку з автоматично активованим 1-хвилинним Executive Brief для партнерів та HR.",
                    target: "/?recruiter=open",
                    badge: "⚡ Executive Brief",
                  },
                  {
                    id: "geo_smart" as RedirectMode,
                    title: "Розумна Локалізація (Geo Smart)",
                    desc: "Гості з Польщі спрямовуються на польську версію (/?lang=pl), решта світу — на англійську (/?lang=en).",
                    target: "PL vs EN",
                    badge: "Локалізація",
                  },
                  {
                    id: "custom_url" as RedirectMode,
                    title: "Довільний URL (Зовнішній / Лендінг)",
                    desc: "Перенаправлення на будь-яке вказане вами зовнішнє або внутрішнє посилання.",
                    target: customRedirectUrl || "Вкажіть URL нижче",
                    badge: "Власний URL",
                  },
                ].map((item) => {
                  const isSelected = selectedRedirectMode === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedRedirectMode(item.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                        isSelected
                          ? "bg-[#1c1917] border-[#c4a160] shadow-md shadow-[#c4a160]/10"
                          : "bg-[#11100e] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold border ${
                              isSelected
                                ? "bg-[#c4a160]/20 text-[#c4a160] border-[#c4a160]/40"
                                : "bg-white/5 text-[#777168] border-white/10"
                            }`}
                          >
                            {item.badge}
                          </span>
                          <h3 className="font-bold text-sm text-[#eeece5] mt-1">
                            {item.title}
                          </h3>
                        </div>

                        <input
                          type="radio"
                          checked={isSelected}
                          onChange={() => setSelectedRedirectMode(item.id)}
                          className="mt-1 text-[#c4a160] focus:ring-[#c4a160]"
                        />
                      </div>

                      <p className="text-xs text-[#a39c91]">
                        {item.desc}
                      </p>

                      <div className="pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[#777168] flex items-center justify-between">
                        <span>Цільовий роут:</span>
                        <code className="text-[#c4a160]">{item.target}</code>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom URL Input Field if mode is custom_url */}
            {selectedRedirectMode === "custom_url" && (
              <div className="p-6 rounded-2xl bg-[#11100e] border border-[#c4a160]/40 space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#eeece5]">
                  Введіть довільний цільовий URL:
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/demo або /projects/..."
                  value={customRedirectUrl}
                  onChange={(e) => setCustomRedirectUrl(e.target.value)}
                  className="w-full bg-[#08090a] border border-white/15 rounded-xl px-4 py-3 text-xs font-mono text-[#eeece5] focus:outline-none focus:border-[#c4a160]"
                />
              </div>
            )}

            {/* Redirection Statistics */}
            <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-bold text-xs font-mono uppercase tracking-wider text-[#eeece5] flex items-center gap-2">
                  <Activity size={14} className="text-[#c4a160]" />
                  Статистика Спрацьовування Маршрутизатора
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-emerald-400">
                    Всього перенаправлено: {redirectConfig.stats?.totalRedirected || 0} гостей
                  </span>
                  <button
                    onClick={handleResetRedirectStats}
                    className="text-[10px] font-mono text-[#a39c91] hover:text-rose-400 px-2 py-0.5 rounded bg-white/[0.04] hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 transition-colors cursor-pointer"
                    title="Скинути лічильники перенаправлення до нуля"
                  >
                    Скинути лічильники
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#08090a] border border-white/[0.06]">
                  <div className="text-[#777168]">Hardware Focus</div>
                  <div className="text-lg font-bold text-[#c4a160] mt-1">
                    {redirectConfig.stats?.byMode?.hardware_focus || 0}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#08090a] border border-white/[0.06]">
                  <div className="text-[#777168]">MES Focus</div>
                  <div className="text-lg font-bold text-cyan-400 mt-1">
                    {redirectConfig.stats?.byMode?.mes_focus || 0}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#08090a] border border-white/[0.06]">
                  <div className="text-[#777168]">Recruiter Mode</div>
                  <div className="text-lg font-bold text-amber-400 mt-1">
                    {redirectConfig.stats?.byMode?.recruiter_fasttrack || 0}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#08090a] border border-white/[0.06]">
                  <div className="text-[#777168]">Geo Smart</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">
                    {redirectConfig.stats?.byMode?.geo_smart || 0}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#08090a] border border-white/[0.06]">
                  <div className="text-[#777168]">Custom URL</div>
                  <div className="text-lg font-bold text-[#eeece5] mt-1">
                    {redirectConfig.stats?.byMode?.custom_url || 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 5: PROJECTS MANAGEMENT
           ──────────────────────────────────────────────────────── */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#eeece5] tracking-tight">
                  Керування Проєктами & Кейсами
                </h2>
                <p className="text-xs text-[#a39c91] font-mono">
                  Перегляд, фільтрація та статус інженерних робіт (всього: {projectsList.length})
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-3 text-[#777168]" />
                  <input
                    type="text"
                    placeholder="Пошук проєкту або тегу..."
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="w-full bg-[#11100e] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-[#eeece5] placeholder:text-[#555048] focus:border-[#c4a160] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 w-full max-w-full min-w-0">
              {[
                { id: "all", label: `Всі проєкти (${projectsList.length})` },
                {
                  id: "automation",
                  label: `Automation & PLC (${
                    projectsList.filter(
                      (p) =>
                        p.category.toLowerCase().includes("automation") ||
                        p.tags.some((t) => t.toLowerCase().includes("siemens") || t.toLowerCase().includes("scada"))
                    ).length
                  })`,
                },
                {
                  id: "mes",
                  label: `Industrial MES (${
                    projectsList.filter(
                      (p) =>
                        p.category.toLowerCase().includes("mes") ||
                        p.category.toLowerCase().includes("software") ||
                        p.tags.some((t) => t.toLowerCase().includes("mes") || t.toLowerCase().includes("fastapi"))
                    ).length
                  })`,
                },
                {
                  id: "embedded",
                  label: `Embedded & IoT (${
                    projectsList.filter(
                      (p) =>
                        p.category.toLowerCase().includes("embedded") ||
                        p.tags.some((t) => t.toLowerCase().includes("mesh") || t.toLowerCase().includes("esp") || t.toLowerCase().includes("iot"))
                    ).length
                  })`,
                },
                {
                  id: "featured",
                  label: `Featured (${
                    projectsList.filter((p) => featuredOverride[p.id] ?? true).length
                  })`,
                },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setProjectCategory(id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 transition-colors cursor-pointer ${
                    projectCategory === id
                      ? "bg-[#c4a160] text-[#11100e] font-semibold"
                      : "bg-[#11100e] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-[#11100e] border border-white/10 text-xs font-mono text-[#777168] space-y-2 col-span-1 md:col-span-2">
                  <Layers size={24} className="mx-auto text-[#777168]/50 mb-1" />
                  <div>Проєктів у цій вибірці не знайдено.</div>
                  <div className="text-[11px] text-[#555048]">
                    Спробуйте обрати іншу категорію або очистити рядок пошуку.
                  </div>
                </div>
              ) : (
                filteredProjects.map((proj: Project) => {
                const isFeatured = featuredOverride[proj.id] ?? true;

                return (
                  <div
                    key={proj.id}
                    className="p-5 rounded-2xl bg-[#11100e] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-mono text-[#c4a160] uppercase tracking-wider">
                            {proj.category}
                          </div>
                          <h3 className="font-bold text-sm text-[#eeece5] mt-0.5">
                            {proj.title}
                          </h3>
                        </div>

                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase border ${
                            isFeatured
                              ? "bg-[#c4a160]/10 text-[#c4a160] border-[#c4a160]/30 font-semibold"
                              : "bg-white/5 text-[#777168] border-white/10"
                          }`}
                        >
                          {isFeatured ? "Featured" : "Published"}
                        </span>
                      </div>

                      <p className="text-xs text-[#a39c91] line-clamp-2">
                        {proj.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded bg-[#08090a] border border-white/[0.08] text-[10px] font-mono text-[#777168]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                      <div className="text-[#777168] flex items-center gap-2">
                        {proj.metrics[0] && (
                          <span className="text-[#c4a160]">
                            {proj.metrics[0].label}: {proj.metrics[0].value}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleFeatured(proj.id, isFeatured)}
                          className="text-[11px] text-[#a39c91] hover:text-[#c4a160] cursor-pointer"
                        >
                          {isFeatured ? "Зняти Featured" : "Зробити Featured"}
                        </button>
                        <Link
                          href={`/projects/${proj.id}`}
                          target="_blank"
                          className="text-[11px] text-[#c4a160] hover:underline flex items-center gap-1"
                        >
                          <span>Перегляд</span>
                          <ExternalLink size={11} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 6: INQUIRIES & LEADS
           ──────────────────────────────────────────────────────── */}
        {activeTab === "inquiries" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#eeece5] tracking-tight">
                  Вхідні Заявки та Ліди
                </h2>
                <p className="text-xs text-[#a39c91] font-mono">
                  Запити з форми сайту, рекрутери та пропозиції щодо контрактів
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={handleExportInquiriesJson}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-xs font-mono text-[#eeece5] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Завантажити всі заявки у форматі JSON"
                >
                  <Download size={13} className="text-[#c4a160]" />
                  <span>Експорт JSON</span>
                </button>

                <button
                  onClick={handleExportInquiriesCsv}
                  disabled={inquiries.length === 0}
                  className="px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 text-xs font-mono text-[#eeece5] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Завантажити всі заявки у форматі CSV (Excel)"
                >
                  <Download size={13} className="text-cyan-400" />
                  <span>Експорт CSV</span>
                </button>

                <button
                  onClick={handleClearAllInquiries}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Очистити всі вхідні звернення"
                >
                  <Trash2 size={13} />
                  <span>Очистити</span>
                </button>

                <button
                  onClick={() => setShowCreateInquiryModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#c4a160]/15 hover:bg-[#c4a160]/25 text-[#c4a160] border border-[#c4a160]/40 text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Створити нову вхідну заявку вручну"
                >
                  <Mail size={13} />
                  <span>+ Створити заявку</span>
                </button>

                <button
                  onClick={handleFetchInquiries}
                  disabled={isLoadingInquiries}
                  className="px-4 py-2 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] disabled:opacity-50 text-[#11100e] text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  title="Оновити список заявок"
                >
                  <RefreshCw size={13} className={isLoadingInquiries ? "animate-spin" : ""} />
                  <span>{isLoadingInquiries ? "Оновлення..." : "Оновити"}</span>
                </button>
              </div>
            </div>
            {/* Live Search & Filter Bar */}
            <div className="p-4 rounded-2xl bg-[#11100e] border border-white/10 space-y-3">
              {/* Search input */}
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777168]" />
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Пошук заявок за ім'ям, email, роллю або текстом..."
                  className="w-full bg-[#08090a] border border-white/10 rounded-xl pl-9 pr-24 py-2 text-xs font-mono text-[#eeece5] placeholder:text-[#555048] focus:outline-none focus:border-[#c4a160]/50 transition-colors"
                />
                {inquirySearch && (
                  <button
                    onClick={() => setInquirySearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#a39c91] hover:text-[#eeece5] bg-white/[0.06] hover:bg-white/[0.1] px-2 py-0.5 rounded cursor-pointer transition-colors"
                  >
                    Очистити
                  </button>
                )}
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {(
                    [
                      { id: "all" as const, label: `Всі (${inquiries.length})` },
                      { id: "new" as const, label: `Нові (${inquiries.filter((i) => i.status === "new").length})` },
                      { id: "in_progress" as const, label: `В роботі (${inquiries.filter((i) => i.status === "in_progress").length})` },
                      { id: "archived" as const, label: `Архів (${inquiries.filter((i) => i.status === "archived").length})` },
                    ] as const
                  ).map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setInquiryFilter(id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        inquiryFilter === id
                          ? "bg-[#c4a160] text-[#11100e] font-semibold"
                          : "bg-[#08090a] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-[#777168] shrink-0">
                  Знайдено: {filteredInquiries.length} заявок
                </div>
              </div>
            </div>

            {/* Create Inquiry Inline Modal / Drawer */}
            {showCreateInquiryModal && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#161513] border border-[#c4a160]/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#c4a160]" />
                    <h3 className="text-sm font-bold text-[#eeece5] font-mono uppercase tracking-wider">
                      Створення Нової Вхідної Заявки
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowCreateInquiryModal(false)}
                    className="text-xs font-mono text-[#a39c91] hover:text-[#eeece5] px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] cursor-pointer"
                  >
                    ✕ Закрити
                  </button>
                </div>

                <form onSubmit={handleCreateInquirySubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="block text-[11px] text-[#a39c91] uppercase mb-1">
                      Ім&apos;я / Компанія: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Олександр / Talent Acquisition"
                      value={newInquiryForm.name}
                      onChange={(e) => setNewInquiryForm({ ...newInquiryForm, name: e.target.value })}
                      className="w-full bg-[#08090a] border border-white/15 rounded-xl px-3.5 py-2.5 text-[#eeece5] focus:outline-none focus:border-[#c4a160]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#a39c91] uppercase mb-1">
                      Email для зв&apos;язку: *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="partner@company.com"
                      value={newInquiryForm.email}
                      onChange={(e) => setNewInquiryForm({ ...newInquiryForm, email: e.target.value })}
                      className="w-full bg-[#08090a] border border-white/15 rounded-xl px-3.5 py-2.5 text-[#eeece5] focus:outline-none focus:border-[#c4a160]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#a39c91] uppercase mb-1">
                      Напрямок співпраці / Проєкт:
                    </label>
                    <select
                      value={newInquiryForm.projectType}
                      onChange={(e) => setNewInquiryForm({ ...newInquiryForm, projectType: e.target.value })}
                      className="w-full bg-[#08090a] border border-white/15 rounded-xl px-3 py-2.5 text-[#eeece5] focus:outline-none focus:border-[#c4a160] cursor-pointer"
                    >
                      <option value="Industrial Automation & SCADA">Industrial Automation & SCADA (Siemens S7)</option>
                      <option value="Embedded Mesh & IoT">Embedded Mesh & IoT (ESP-NOW / ESP32-C6)</option>
                      <option value="Industrial MES Platform">Industrial MES Platform (FastAPI + React 19)</option>
                      <option value="Engineering Tech Lead / R&D">Engineering Tech Lead / Head of R&D</option>
                      <option value="Consulting & Technical Audit">Консалтинг та технічний аудит OEE</option>
                      <option value="General Inquiry">Загальне питання / Нетворкінг</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#a39c91] uppercase mb-1">
                      Початковий статус:
                    </label>
                    <select
                      value={newInquiryForm.status}
                      onChange={(e) =>
                        setNewInquiryForm({
                          ...newInquiryForm,
                          status: e.target.value as "new" | "in_progress" | "archived",
                        })
                      }
                      className="w-full bg-[#08090a] border border-white/15 rounded-xl px-3 py-2.5 text-[#eeece5] focus:outline-none focus:border-[#c4a160] cursor-pointer"
                    >
                      <option value="new">NEW (Нова)</option>
                      <option value="in_progress">IN PROGRESS (В роботі)</option>
                      <option value="archived">ARCHIVED (Архів)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] text-[#a39c91] uppercase mb-1">
                      Повідомлення або деталі дзвінка:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Опис пропозиції, вимог до вакансії або деталей контракту..."
                      value={newInquiryForm.message}
                      onChange={(e) => setNewInquiryForm({ ...newInquiryForm, message: e.target.value })}
                      className="w-full bg-[#08090a] border border-white/15 rounded-xl px-3.5 py-2.5 text-[#eeece5] focus:outline-none focus:border-[#c4a160] resize-none"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowCreateInquiryModal(false)}
                      className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#a39c91] hover:text-[#eeece5] transition-colors cursor-pointer"
                    >
                      Скасувати
                    </button>
                    <button
                      type="submit"
                      disabled={isCreatingInquiry}
                      className="px-5 py-2 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] disabled:opacity-50 text-[#11100e] font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Check size={14} />
                      <span>{isCreatingInquiry ? "Збереження..." : "Зберегти заявку"}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inquiries List */}
              <div className="lg:col-span-1 space-y-3">
                {filteredInquiries.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-[#11100e] border border-white/10 text-xs font-mono text-[#777168] space-y-2">
                    <Mail size={24} className="mx-auto text-[#777168]/50 mb-1" />
                    <div>Заявок у цій вибірці не знайдено.</div>
                    <div className="text-[11px] text-[#555048]">
                      Спробуйте змінити фільтр або очистити рядок пошуку.
                    </div>
                  </div>
                ) : (
                  filteredInquiries.map((inq) => (
                    <div
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        selectedInquiry?.id === inq.id
                          ? "bg-[#1c1917] border-[#c4a160] shadow-md shadow-black/40"
                          : "bg-[#11100e] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#eeece5]">{inq.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const nextStatus =
                              inq.status === "new"
                                ? "in_progress"
                                : inq.status === "in_progress"
                                ? "archived"
                                : "new";
                            handleUpdateInquiryStatus(inq.id, nextStatus);
                          }}
                          title="Клікніть для зміни статусу (new ➔ in_progress ➔ archived)"
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase cursor-pointer transition-opacity hover:opacity-80 ${
                            inq.status === "new"
                              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                              : inq.status === "in_progress"
                              ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                              : "bg-white/5 text-[#777168] border border-white/10"
                          }`}
                        >
                          {inq.status === "new"
                            ? "NEW"
                            : inq.status === "in_progress"
                            ? "IN PROGRESS"
                            : "ARCHIVED"}
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-[#c4a160] truncate">{inq.email}</div>
                      <p className="text-xs text-[#a39c91] line-clamp-2">{inq.message}</p>
                      <div className="text-[10px] font-mono text-[#777168]">{formatTelemetryTimestamp(inq.date, inq.id)}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Inquiry Detail Inspector */}
              <div className="lg:col-span-2">
                {selectedInquiry ? (
                  <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-base font-bold text-[#eeece5]">{selectedInquiry.name}</h3>
                          <span className="text-[11px] font-mono text-[#777168] flex items-center gap-1 bg-[#08090a] px-2 py-0.5 rounded border border-white/[0.08]">
                            <Clock size={11} className="text-[#c4a160]" />
                            {formatTelemetryTimestamp(selectedInquiry.date, selectedInquiry.id)}
                          </span>
                        </div>
                        <div className="text-xs font-mono text-[#c4a160] flex items-center gap-2 mt-1">
                          <span>{selectedInquiry.email}</span>
                          <button
                            onClick={() => handleCopyEmail(selectedInquiry.email)}
                            className="text-[#777168] hover:text-[#eeece5] cursor-pointer"
                            title="Скопіювати email"
                          >
                            {copiedEmail === selectedInquiry.email ? (
                              <Check size={12} className="text-emerald-400" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={selectedInquiry.status}
                          onChange={(e) =>
                            handleUpdateInquiryStatus(
                              selectedInquiry.id,
                              e.target.value as "new" | "in_progress" | "archived"
                            )
                          }
                          aria-label="Змінити статус заявки"
                          className="bg-[#08090a] border border-white/15 rounded-xl px-3 py-1.5 text-xs font-mono text-[#eeece5] focus:outline-none cursor-pointer"
                        >
                          <option value="new">Статус: NEW</option>
                          <option value="in_progress">Статус: IN PROGRESS</option>
                          <option value="archived">Статус: ARCHIVED</option>
                        </select>

                        <button
                          onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors cursor-pointer"
                          title="Видалити заявку"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-[#777168] uppercase tracking-wider">
                        Тип запиту:
                      </div>
                      <div className="p-3 rounded-xl bg-[#08090a] border border-white/[0.06] text-xs font-mono text-[#eeece5]">
                        {selectedInquiry.projectType}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-[#777168] uppercase tracking-wider">
                        Повідомлення:
                      </div>
                      <div className="p-4 rounded-xl bg-[#08090a] border border-white/[0.06] text-xs leading-relaxed text-[#eeece5] whitespace-pre-wrap font-sans">
                        {selectedInquiry.message}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <a
                        href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(
                          selectedInquiry.projectType
                        )}`}
                        className="px-4 py-2.5 rounded-xl bg-[#c4a160] hover:bg-[#d6b578] text-[#11100e] text-xs font-mono font-semibold transition-colors flex items-center gap-2"
                      >
                        <Mail size={14} />
                        Відповісти по Email
                      </a>

                      {(() => {
                        const tgMatch = selectedInquiry.message.match(/@([a-zA-Z0-9_]{5,32})|t\.me\/([a-zA-Z0-9_]{5,32})/);
                        const recipientTg = tgMatch ? (tgMatch[1] || tgMatch[2]) : null;
                        const tgHref = recipientTg ? `https://t.me/${recipientTg}` : SOCIAL_LINKS.telegram;
                        return (
                          <a
                            href={tgHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] border border-[#229ED9]/30 text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
                          >
                            <Send size={14} />
                            {recipientTg ? `Відповісти @${recipientTg}` : "Відповісти в Telegram"}
                          </a>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="h-full min-h-[300px] flex flex-col items-center justify-center p-8 rounded-2xl bg-[#11100e] border border-white/10 text-center text-[#777168] font-mono text-xs space-y-2">
                    <Inbox size={32} className="text-[#555048] mb-1" />
                    <div>Виберіть заявку зі списку ліворуч для перегляду деталей</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 7: TELEMETRY & SYSTEM HEALTH
           ──────────────────────────────────────────────────────── */}
        {activeTab === "telemetry" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#eeece5] tracking-tight">
                  Системна Телеметрія & Мережевий Діагностик
                </h2>
                <p className="text-xs text-[#a39c91] font-mono">
                  Перевірка доступності сервісів (/api/ping) та статус edge-шлюзів
                </p>
              </div>

              <button
                onClick={handleRunPingDiagnostic}
                disabled={isPinging}
                className="px-4 py-2 rounded-xl bg-[#c4a160] hover:bg-[#d6b578] disabled:opacity-50 text-[#11100e] text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <RefreshCw size={13} className={isPinging ? "animate-spin" : ""} />
                <span>{isPinging ? "Вимірювання..." : "Запустити Ping Діагностику"}</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-bold text-xs font-mono uppercase tracking-wider text-[#eeece5] flex items-center gap-2">
                  <Activity size={14} className="text-cyan-400" />
                  Результати перевірки API endpoints (/api/ping)
                </span>
                {lastPingTimestamp && (
                  <span className="text-[10px] font-mono text-[#777168]">
                    Останнє оновлення: {lastPingTimestamp}
                  </span>
                )}
              </div>

              {pingData.length === 0 ? (
                <div className="p-8 text-center rounded-xl bg-[#08090a] border border-white/[0.06] text-xs font-mono text-[#777168] space-y-1">
                  <div>Дані діагностики ще не отримано.</div>
                  <div className="text-[11px] text-[#555048]">
                    Натисніть «Запустити Ping Діагностику» для вимірювання затримок.
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {pingData.map((item) => (
                    <div
                      key={item.domain}
                      className="p-4 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-2"
                    >
                      <div className="text-xs font-bold text-[#eeece5] truncate">{item.domain}</div>
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-2xl font-bold text-cyan-400">{item.ping}</span>
                        {(() => {
                          const isGood =
                            item.status.includes("200") || item.status.includes("OK") || item.status === "Operational";
                          const isWarn = item.status.startsWith("3");
                          return (
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                                isGood
                                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                  : isWarn
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              }`}
                            >
                              {item.status}
                            </span>
                          );
                        })()}
                      </div>
                      <div className="text-[10px] font-mono text-[#777168] flex items-center justify-between pt-1 border-t border-white/[0.06]">
                        <span>{item.ssl}</span>
                        <span>{formatTelemetryTimestamp(item.lastChecked)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom URL Ping Tool */}
            <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/[0.08] pb-3">
                <span className="font-bold text-[#eeece5] flex items-center gap-2">
                  <Terminal size={14} className="text-[#c4a160]" />
                  Тестування Довільного Endpoint / URL
                </span>
                <span className="text-[11px] text-[#777168]">
                  Перевірка доступності веб-хуків, API або зовнішніх серверів
                </span>
              </div>

              <form onSubmit={handleRunCustomPing} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={customPingInput}
                  onChange={(e) => setCustomPingInput(e.target.value)}
                  placeholder="https://api.github.com або domain.com"
                  className="flex-1 bg-[#08090a] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-[#eeece5] placeholder:text-[#555048] focus:outline-none focus:border-[#c4a160] transition-colors"
                />
                <button
                  type="submit"
                  disabled={isCustomPinging || !customPingInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#c4a160] hover:bg-[#d6b578] disabled:opacity-50 text-[#11100e] font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <RefreshCw size={13} className={isCustomPinging ? "animate-spin" : ""} />
                  <span>{isCustomPinging ? "Перевірка..." : "Виміряти Ping"}</span>
                </button>
              </form>

              {customPingError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{customPingError}</span>
                </div>
              )}

              {customPingResult && (
                <div className="p-4 rounded-xl bg-[#08090a] border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#eeece5]">{customPingResult.domain}</span>
                    <span
                      className={`font-bold text-sm ${
                        customPingResult.status.startsWith("2") || customPingResult.status === "Operational"
                          ? "text-emerald-400"
                          : customPingResult.status.startsWith("3")
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      {customPingResult.ping}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#777168] pt-1 border-t border-white/[0.06]">
                    <span>
                      Статус:{" "}
                      <strong
                        className={
                          customPingResult.status.startsWith("2") || customPingResult.status === "Operational"
                            ? "text-emerald-300"
                            : customPingResult.status.startsWith("3")
                            ? "text-amber-300"
                            : "text-rose-300"
                        }
                      >
                        {customPingResult.status}
                      </strong>
                    </span>
                    <span>SSL: {customPingResult.ssl}</span>
                    <span>Перевірено: {formatTelemetryTimestamp(customPingResult.lastChecked)}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-bold text-[#eeece5] flex items-center gap-2">
                  <Cpu size={14} className="text-emerald-400" />
                  ESP-NOW P2P MESH NODES STATUS
                </span>
                <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Mesh Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#a39c91]">
                <div className="p-3.5 rounded-xl bg-[#08090a] border border-white/[0.06] space-y-1">
                  <div className="text-[#eeece5] font-semibold">Node #1: Spindle Motor</div>
                  <div className="text-emerald-400">18,000 RPM (Normal)</div>
                  <div className="text-[10px] text-[#777168]">RSSI: -44 dBm | FTR: 99.1%</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#08090a] border border-white/[0.06] space-y-1">
                  <div className="text-[#eeece5] font-semibold">Node #2: Vacuum Clamp</div>
                  <div className="text-emerald-400">Pressure -0.85 Bar (Locked)</div>
                  <div className="text-[10px] text-[#777168]">RSSI: -38 dBm | Cycle: 48s</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#08090a] border border-white/[0.06] space-y-1">
                  <div className="text-[#eeece5] font-semibold">Node #3: Edge Gateway</div>
                  <div className="text-emerald-400">RS485 Bus Active (Sub-10ms)</div>
                  <div className="text-[10px] text-[#777168]">Packet Loss: 0.00%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 8: SETTINGS & CONFIGURATION
           ──────────────────────────────────────────────────────── */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#eeece5] tracking-tight">
                Налаштування & Конфігурація Портфоліо
              </h2>
              <p className="text-xs text-[#a39c91] font-mono">
                Параметри безпеки, експорт даних та стан сайту
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-[#eeece5] uppercase tracking-wider font-mono flex items-center gap-2">
                  <KeyRound size={14} className="text-[#c4a160]" />
                  Зміна PIN-коду доступу
                </h3>
                <p className="text-xs text-[#a39c91]">
                  Встановіть новий майстер-PIN для захисту кабінету адміністратора. Для зміни необхідно підтвердити поточний пароль.
                </p>

                {pinChangeSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>✓ Новий PIN успішно збережено на сервері! Усі старі сесії анульовано.</span>
                  </div>
                )}

                {pinChangeError && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle size={14} className="text-rose-400 shrink-0" />
                    <span>{pinChangeError}</span>
                  </div>
                )}

                <form onSubmit={handleSavePin} className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-mono text-[#a39c91] uppercase">
                        Поточний PIN-код:
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowCurrentPin(!showCurrentPin)}
                        className="text-[10px] font-mono text-[#a39c91] hover:text-[#eeece5] flex items-center gap-1 cursor-pointer"
                      >
                        {showCurrentPin ? <EyeOff size={11} /> : <Eye size={11} />}
                        <span>{showCurrentPin ? "Приховати" : "Показати"}</span>
                      </button>
                    </div>
                    <input
                      type={showCurrentPin ? "text" : "password"}
                      maxLength={32}
                      value={currentPinInput}
                      onChange={(e) => setCurrentPinInput(e.target.value)}
                      placeholder="Введіть поточний PIN"
                      className="w-full bg-[#08090a] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-[#eeece5] focus:outline-none focus:border-[#c4a160]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-mono text-[#a39c91] uppercase">
                        Новий PIN-код (мін. 4 символи):
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowNewPin(!showNewPin)}
                        className="text-[10px] font-mono text-[#a39c91] hover:text-[#eeece5] flex items-center gap-1 cursor-pointer"
                      >
                        {showNewPin ? <EyeOff size={11} /> : <Eye size={11} />}
                        <span>{showNewPin ? "Приховати" : "Показати"}</span>
                      </button>
                    </div>
                    <input
                      type={showNewPin ? "text" : "password"}
                      maxLength={32}
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      placeholder="Введіть новий PIN"
                      className="w-full bg-[#08090a] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-[#eeece5] focus:outline-none focus:border-[#c4a160]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-[#a39c91] uppercase mb-1">
                      Підтвердження нового PIN-коду:
                    </label>
                    <input
                      type={showNewPin ? "text" : "password"}
                      maxLength={32}
                      value={confirmPinInput}
                      onChange={(e) => setConfirmPinInput(e.target.value)}
                      placeholder="Повторіть новий PIN"
                      className="w-full bg-[#08090a] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-[#eeece5] focus:outline-none focus:border-[#c4a160]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isChangingPin}
                    className="px-5 py-2.5 rounded-xl bg-[#c4a160] hover:bg-[#d6b578] disabled:opacity-50 text-[#11100e] text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{isChangingPin ? "Збереження..." : "Зберегти новий PIN"}</span>
                  </button>
                </form>
              </div>

              <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-[#eeece5] uppercase tracking-wider font-mono flex items-center gap-2">
                  <AlertCircle size={14} className="text-amber-400" />
                  Планове Обслуговування (Maintenance Mode)
                </h3>
                <p className="text-xs text-[#a39c91]">
                  Увімкнення інформаційного банеру про проведення технічних робіт над платформою.
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs font-mono text-[#eeece5]">
                    Статус банеру: {maintenanceMode ? "УВІМКНЕНО" : "ВИМКНЕНО"}
                  </span>
                  <button
                    onClick={handleToggleMaintenance}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer ${
                      maintenanceMode
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    }`}
                  >
                    {maintenanceMode ? "Вимкнути банер" : "Увімкнути банер"}
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4 lg:col-span-2">
                {backupRestoreMessage && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-2 ${
                      backupRestoreMessage.isError
                        ? "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                        : "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                    }`}
                  >
                    {backupRestoreMessage.isError ? (
                      <AlertCircle size={14} className="text-rose-400 shrink-0" />
                    ) : (
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    )}
                    <span>{backupRestoreMessage.text}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#eeece5] uppercase tracking-wider font-mono flex items-center gap-2">
                      <Download size={14} className="text-cyan-400" />
                      Резервне Копіювання та Очищення Даних
                    </h3>
                    <p className="text-xs text-[#a39c91] mt-0.5">
                      Експортуйте повний архів або скиньте тестові дані телеметрії та аналітики намірів.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleExportDataJson}
                      className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Download size={14} className="text-[#c4a160]" />
                      Завантажити бекап (JSON)
                    </button>

                    <label className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] transition-colors flex items-center gap-2 cursor-pointer">
                      <Upload size={14} className="text-cyan-400" />
                      <span>{isRestoringBackup ? "Відновлення..." : "Відновити з бекапу (JSON)"}</span>
                      <input
                        type="file"
                        accept=".json,application/json"
                        className="hidden"
                        disabled={isRestoringBackup}
                        onChange={handleRestoreBackupFile}
                      />
                    </label>

                    <button
                      onClick={async () => {
                        if (!window.confirm("УВАГА: Це видалить усю телеметрію відвідувачів, події намірів та тестові заявки на сервері. Продовжити?")) return;
                        setJourneys([]);
                        setIntentEvents([]);
                        setInquiries([]);
                        setSelectedInquiry(null);
                        setJourneyStats({
                          total: 0,
                          external: 0,
                          admin: 0,
                          redirected: 0,
                          converted: 0,
                          mobile: 0,
                          desktop: 0,
                          bots: 0,
                          topCountries: [],
                          topBrowsers: [],
                          topOs: [],
                        });
                        setIntentStats({ total: 0, external: 0, admin: 0, cv: 0 });
                        setIntentCounts({
                          cvDownloads: 0,
                          recruiterModeOpens: 0,
                          contactClicks: 0,
                          formSubmits: 0,
                          fitMatcherUses: 0,
                          totalActions: 0,
                          conversionRate: "0.0%",
                        });
                        setIntentFunnel({ impressions: 0, engaged: 0, highIntent: 0, conversions: 0 });
                        localStorage.removeItem("admin_inquiries");

                        try {
                          await Promise.all([
                            fetch("/api/visitors", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ action: "clear_all" }),
                            }),
                            fetch("/api/intent", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ action: "clear_all" }),
                            }),
                            fetch("/api/inquiries", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ action: "clear_all" }),
                            }),
                          ]);
                          handleFetchJourneys();
                          handleFetchIntent();
                          handleFetchInquiries();
                        } catch {
                          // offline fallback
                        }
                      }}
                      className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Trash2 size={14} />
                      Видалити всі тестові дані
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-white/[0.08] py-4 px-4 sm:px-8 text-[11px] font-mono text-[#777168] flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>Roman Deyneko // Personal Engineering Portfolio Admin</div>
        <div>Next.js 16 App Router &bull; React 19 &bull; v0.2.0-MES</div>
      </footer>
    </div>
  );
}
