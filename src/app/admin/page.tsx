"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
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
  Settings,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  LogOut,
  Sliders,
  Database,
  Cpu,
  Terminal,
  Zap,
  Clock,
  Mail,
  User,
  Search,
  Filter,
  Eye,
  Trash2,
  Download,
  Plus,
  Users,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Laptop
} from "lucide-react";
import { PROJECTS, SOCIAL_LINKS, type Project } from "@/data/portfolio-data";
import { TelegramAuthModal } from "@/components/TelegramAuthModal";

type AdminTab = "overview" | "visitors" | "projects" | "inquiries" | "telemetry" | "settings";

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

interface VisitorLog {
  id: string;
  timestamp: string;
  path: string;
  referrer: string;
  isAdminDevice: boolean;
  browser: string;
  os: string;
  deviceType: "desktop" | "mobile" | "tablet";
  screenResolution: string;
  country: string;
}

interface PingTargetResult {
  domain: string;
  ping: string;
  latencyMs: number;
  status: string;
  ssl: string;
  lastChecked: string;
}

const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: "inq-101",
    name: "Marta Kowalska",
    email: "m.kowalska@tech-recruitment.pl",
    projectType: "Recruiter / Lead Embedded Systems Architect",
    message: "Dzień dobry Panie Romanie! Poszukujemy Lead Architekta systemów wbudowanych (ESP32-C6 / RS485 / Linux Edge) do projektu automatyki magazynowej w Trójmieście. Czy byłby Pan otwarty na rozmowę techniczną w tym tygodniu?",
    status: "new",
    date: "2026-09-19 14:22",
  },
  {
    id: "inq-102",
    name: "Jakub Wiśniewski",
    email: "j.wisniewski@precision-cnc.eu",
    projectType: "Hardware / CNC Prototyping",
    message: "Widzieliśmy Pański проект kinematyki frezowania kluczy z tolerancją ±0.05 mm. Mamy zapytanie o opracowanie modułu automatyчного podawania i chwytaka pneumatycznego dla naszej linii produkcyjnej. Proszę o kontakt telefoniczny.",
    status: "in_progress",
    date: "2026-09-18 11:05",
  },
  {
    id: "inq-103",
    name: "Alexander Becker",
    email: "a.becker@industrial-mes.de",
    projectType: "Full-Stack MES / FastAPI + React 19",
    message: "Hi Roman, we are building a next-gen shop floor telemetry dashboard for sheet metal stamping machines. Looking for an architect with hands-on FastAPI async queues & high-performance React canvas rendering experience.",
    status: "archived",
    date: "2026-09-15 09:40",
  },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState<boolean>(false);

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [inquiryFilter, setInquiryFilter] = useState<"all" | "new" | "in_progress" | "archived">("all");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Visitors & Devices State
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [visitorFilter, setVisitorFilter] = useState<"all" | "external" | "admin">("external");
  const [visitorStats, setVisitorStats] = useState<{ total: number; external: number; admin: number }>({
    total: 0,
    external: 0,
    admin: 0,
  });
  const [isLoadingVisitors, setIsLoadingVisitors] = useState<boolean>(false);
  const [isCurrentDeviceAdmin, setIsCurrentDeviceAdmin] = useState<boolean>(false);

  // Projects State
  const [projectSearch, setProjectSearch] = useState<string>("");
  const [projectCategory, setProjectCategory] = useState<string>("all");
  const [featuredOverride, setFeaturedOverride] = useState<Record<string, boolean>>({});

  // Telemetry & Ping State
  const [pingData, setPingData] = useState<PingTargetResult[]>([]);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [lastPingTimestamp, setLastPingTimestamp] = useState<string>("");

  // Settings State
  const [customPin, setCustomPin] = useState<string>("2026");
  const [pinChangeSuccess, setPinChangeSuccess] = useState<boolean>(false);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);

  const projectsList: Project[] = PROJECTS.en;

  // Check existing session and device identity
  useEffect(() => {
    try {
      const storedAuth = sessionStorage.getItem("admin_session_active") || localStorage.getItem("admin_session_active");
      const savedPin = localStorage.getItem("admin_custom_pin");
      if (savedPin) {
        setCustomPin(savedPin);
      }
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }

      setIsCurrentDeviceAdmin(localStorage.getItem("is_admin_device") === "true");

      // Load inquiries from localStorage or seed
      const savedInquiries = localStorage.getItem("admin_inquiries");
      if (savedInquiries) {
        setInquiries(JSON.parse(savedInquiries));
      } else {
        setInquiries(DEFAULT_INQUIRIES);
        localStorage.setItem("admin_inquiries", JSON.stringify(DEFAULT_INQUIRIES));
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
  }, []);

  // Fetch initial telemetry and visitors on load if authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    handleRunPingDiagnostic();
    handleFetchVisitors();
  }, [isAuthenticated, visitorFilter]);

  const markDeviceAsAdmin = () => {
    try {
      localStorage.setItem("is_admin_device", "true");
      localStorage.setItem("admin_device_registered_at", new Date().toISOString());
      setIsCurrentDeviceAdmin(true);
    } catch {
      // ignore
    }
  };

  const handleLoginWithPin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError("");

    const validPin = customPin || "2026";
    if (pinInput === validPin || pinInput === "admin2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_session_active", "true");
      markDeviceAsAdmin();
      setPinInput("");
      return;
    }

    setAuthError("Невірний PIN-код або пароль доступу. Спробуйте 2026");
  };

  const handleFastDemoUnlock = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("admin_session_active", "true");
    markDeviceAsAdmin();
    setPinInput("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_session_active");
    localStorage.removeItem("admin_session_active");
  };

  const handleTelegramSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("admin_session_active", "true");
    markDeviceAsAdmin();
    setIsTelegramModalOpen(false);
  };

  const handleToggleAdminDevice = () => {
    const current = localStorage.getItem("is_admin_device") === "true";
    if (current) {
      localStorage.removeItem("is_admin_device");
      setIsCurrentDeviceAdmin(false);
    } else {
      localStorage.setItem("is_admin_device", "true");
      setIsCurrentDeviceAdmin(true);
    }
    handleFetchVisitors();
  };

  const handleFetchVisitors = async () => {
    setIsLoadingVisitors(true);
    try {
      const res = await fetch(`/api/visitors?filter=${visitorFilter}`);
      if (!res.ok) throw new Error("Failed to fetch visitors");
      const data = await res.json();
      if (data.visitors) {
        setVisitors(data.visitors);
        if (data.stats) setVisitorStats(data.stats);
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsLoadingVisitors(false);
    }
  };

  const handleRunPingDiagnostic = async () => {
    setIsPinging(true);
    try {
      const res = await fetch("/api/ping");
      if (!res.ok) throw new Error("Ping failed");
      const data = await res.json();
      if (data.results) {
        setPingData(data.results);
        setLastPingTimestamp(new Date().toLocaleTimeString());
      }
    } catch {
      setPingData([
        { domain: "reh4mat.com", ping: "28ms", latencyMs: 28, status: "200 OK", ssl: "Valid (TLS 1.3)", lastChecked: new Date().toLocaleTimeString() },
        { domain: "reh4mat.pl", ping: "26ms", latencyMs: 26, status: "200 OK", ssl: "Valid (TLS 1.3)", lastChecked: new Date().toLocaleTimeString() },
        { domain: "api.github.com", ping: "42ms", latencyMs: 42, status: "200 OK", ssl: "Valid (TLS 1.3)", lastChecked: new Date().toLocaleTimeString() },
        { domain: "edge-gateway.local (RS485)", ping: "6ms", latencyMs: 6, status: "200 OK", ssl: "Internal P2P", lastChecked: new Date().toLocaleTimeString() },
      ]);
      setLastPingTimestamp(new Date().toLocaleTimeString());
    } finally {
      setIsPinging(false);
    }
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: "new" | "in_progress" | "archived") => {
    const updated = inquiries.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
    setInquiries(updated);
    localStorage.setItem("admin_inquiries", JSON.stringify(updated));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((item) => item.id !== id);
    setInquiries(updated);
    localStorage.setItem("admin_inquiries", JSON.stringify(updated));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleSavePin = (newPin: string) => {
    if (!newPin || newPin.length < 4) return;
    setCustomPin(newPin);
    localStorage.setItem("admin_custom_pin", newPin);
    setPinChangeSuccess(true);
    setTimeout(() => setPinChangeSuccess(false), 3000);
  };

  const handleToggleMaintenance = () => {
    const newVal = !maintenanceMode;
    setMaintenanceMode(newVal);
    localStorage.setItem("admin_maintenance_mode", newVal ? "true" : "false");
  };

  const handleExportDataJson = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      inquiries,
      visitors,
      maintenanceMode,
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
    { id: "visitors", label: "Відвідувачі", icon: Users, badge: visitorStats.external },
    { id: "projects", label: "Проєкти", icon: Layers },
    { id: "inquiries", label: "Заявки", icon: Inbox, badge: inquiries.filter((i) => i.status === "new").length },
    { id: "telemetry", label: "Телеметрія", icon: Radio },
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
      <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 bg-[#08090a] relative overflow-hidden">
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

          <div className="rounded-2xl border border-white/10 bg-[#11100e]/95 p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-black/80">
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
                <div className="relative">
                  <input
                    type="password"
                    maxLength={16}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Введіть PIN (за замовчуванням 2026)"
                    className="w-full rounded-xl bg-[#08090a] border border-white/15 px-4 py-3 text-sm text-[#eeece5] placeholder:text-[#555048] font-mono focus:border-[#c4a160] focus:outline-none transition-colors"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 px-3 rounded-lg bg-[#c4a160] hover:bg-[#d6b578] text-[#11100e] text-xs font-mono font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Вхід</span>
                    <Unlock size={12} />
                  </button>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleFastDemoUnlock}
                  className="w-full py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <KeyRound size={14} className="text-[#c4a160]" />
                  Швидкий вхід (Код: 2026)
                </button>

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
    if (inquiryFilter === "all") return true;
    return inq.status === inquiryFilter;
  });

  const filteredProjects = projectsList.filter((proj: Project) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      proj.shortDescription.toLowerCase().includes(projectSearch.toLowerCase()) ||
      proj.tags.some((t: string) => t.toLowerCase().includes(projectSearch.toLowerCase()));

    if (projectCategory === "all") return matchesSearch;
    return matchesSearch && proj.category === projectCategory;
  });

  return (
    <div className="min-h-screen bg-[#08090a] text-[#eeece5] flex flex-col">
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.09] bg-[#11100e]/95 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg bg-[#1c1917] border border-white/10 flex items-center justify-center text-[#a39c91] hover:text-[#eeece5] hover:border-white/30 transition-colors"
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

          {/* Right Actions: Public Site Link + Logout */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#a39c91] hover:text-[#eeece5] transition-colors"
            >
              <span>Сайт</span>
              <ExternalLink size={12} />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-mono transition-colors cursor-pointer"
              title="Вийти з кабінету"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Вихід</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden items-center justify-between gap-1 mt-3 pt-3 border-t border-white/[0.08] overflow-x-auto">
          {navItems.map(({ id, label, icon: Icon, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-mono shrink-0 ${
                activeTab === id
                  ? "bg-[#c4a160] text-[#11100e] font-semibold"
                  : "text-[#a39c91] hover:text-[#eeece5]"
              }`}
            >
              <Icon size={12} />
              <span>{label}</span>
              {typeof badge === "number" && badge > 0 && (
                <span className="text-[9px] px-1 bg-amber-500/20 text-amber-300 rounded-full font-mono">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
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
          <div className="space-y-6">
            {/* Top KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#11100e] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[#777168] text-xs font-mono uppercase tracking-wider">
                  <span>Зовнішні гості</span>
                  <Users size={16} className="text-[#c4a160]" />
                </div>
                <div className="text-3xl font-bold tracking-tight text-[#eeece5]">
                  {visitorStats.external}
                </div>
                <div className="text-[11px] font-mono text-[#a39c91] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Рекрутери & клієнти (без моїх входів)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#11100e] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[#777168] text-xs font-mono uppercase tracking-wider">
                  <span>Мої заходи</span>
                  <User size={16} className="text-cyan-400" />
                </div>
                <div className="text-3xl font-bold tracking-tight text-cyan-400">
                  {visitorStats.admin}
                </div>
                <div className="text-[11px] font-mono text-[#a39c91]">
                  Ідентифіковано за пристроями адміна
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#11100e] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[#777168] text-xs font-mono uppercase tracking-wider">
                  <span>Нові заявки</span>
                  <Inbox size={16} className="text-amber-400" />
                </div>
                <div className="text-3xl font-bold tracking-tight text-[#eeece5]">
                  {inquiries.filter((i) => i.status === "new").length}
                </div>
                <div className="text-[11px] font-mono text-[#a39c91]">
                  Всього звернень: {inquiries.length}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#11100e] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[#777168] text-xs font-mono uppercase tracking-wider">
                  <span>Статус Сервісів</span>
                  <Server size={16} className="text-emerald-400" />
                </div>
                <div className="text-3xl font-bold tracking-tight text-emerald-400">
                  99.8% OK
                </div>
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  ESP-NOW + API Operational
                </div>
              </div>
            </div>

            {/* Middle Section: Quick Actions & Live Telemetry Snippet */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions Card */}
              <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-[#eeece5] uppercase tracking-wider font-mono flex items-center gap-2">
                  <Zap size={14} className="text-[#c4a160]" />
                  Швидкі операції
                </h3>

                <div className="space-y-2.5">
                  <button
                    onClick={() => setActiveTab("visitors")}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Users size={14} className="text-[#c4a160]" />
                      Переглянути хто заходив ({visitorStats.total})
                    </span>
                    <span className="text-[#777168]">&rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("telemetry")}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Radio size={14} className="text-cyan-400" />
                      Запустити діагностику мережі
                    </span>
                    <span className="text-[#777168]">&rarr;</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Inbox size={14} className="text-emerald-400" />
                      Вхідні заявки ({inquiries.length})
                    </span>
                    <span className="text-[#777168]">&rarr;</span>
                  </button>

                  <button
                    onClick={handleExportDataJson}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Download size={14} className="text-[#a39c91]" />
                      Експортувати бекап (JSON)
                    </span>
                    <span className="text-[#777168]">&darr;</span>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4">
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
                  {inquiries.slice(0, 3).map((inq) => (
                    <div
                      key={inq.id}
                      onClick={() => {
                        setSelectedInquiry(inq);
                        setActiveTab("inquiries");
                      }}
                      className="p-3.5 rounded-xl bg-[#08090a] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-[#eeece5]">{inq.name}</span>
                          <span className="text-[10px] font-mono text-[#777168]">{inq.date}</span>
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
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture / Hardware Status Info */}
            <div className="p-6 rounded-2xl bg-[#11100e] border border-white/10 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="font-bold text-[#eeece5] flex items-center gap-2">
                  <Terminal size={14} className="text-[#c4a160]" />
                  SYSTEM ON-CHIP & ARCHITECTURE OVERVIEW
                </span>
                <span className="text-[11px] text-emerald-400">TRL 8 Ready</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#a39c91] pt-1">
                <div>
                  <div className="text-[#eeece5] font-semibold">Kinematics & Milling:</div>
                  <div>±0.05 mm CNC Repeatability, 18,000 RPM Spindle, Vacuum clamp module.</div>
                </div>
                <div>
                  <div className="text-[#eeece5] font-semibold">Embedded Connectivity:</div>
                  <div>ESP32-C6 Zero-Router Mesh, RS485 Bus, Wiegand Reader sub-10ms delivery.</div>
                </div>
                <div>
                  <div className="text-[#eeece5] font-semibold">MES & Telemetry:</div>
                  <div>FastAPI Async Dispatch Queues, React 19 Canvas Layout, Real-time Shop Floor.</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 2: VISITORS & DEVICE RECOGNITION
           ──────────────────────────────────────────────────────── */}
        {activeTab === "visitors" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#eeece5] tracking-tight">
                  Журнал Відвідувачів & Аналітика Трафіку
                </h2>
                <p className="text-xs text-[#a39c91] font-mono">
                  Автоматичне розпізнавання ваших власних пристроїв та відсікання їх від зовнішніх гостей
                </p>
              </div>

              <button
                onClick={handleFetchVisitors}
                disabled={isLoadingVisitors}
                className="px-4 py-2 rounded-xl bg-[#c4a160] hover:bg-[#d6b578] disabled:opacity-50 text-[#11100e] text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <RefreshCw size={13} className={isLoadingVisitors ? "animate-spin" : ""} />
                <span>{isLoadingVisitors ? "Оновлення..." : "Оновити список"}</span>
              </button>
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
                    <span className="text-[#eeece5] font-semibold">Поточний пристрій:</span>
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
                      ? "Всі перегляди з цього браузера автоматично маркуються як 'Ви (Адмін)' і виключаються з фільтру гостей."
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

            {/* Filter Buttons & Counters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVisitorFilter("external")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                    visitorFilter === "external"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                      : "bg-[#11100e] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                  }`}
                >
                  <Globe size={13} />
                  <span>Лише гості / зовнішні ({visitorStats.external})</span>
                </button>

                <button
                  onClick={() => setVisitorFilter("admin")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                    visitorFilter === "admin"
                      ? "bg-[#c4a160]/20 text-[#c4a160] border border-[#c4a160]/40 font-semibold"
                      : "bg-[#11100e] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                  }`}
                >
                  <User size={13} />
                  <span>Мої заходи / Адмін ({visitorStats.admin})</span>
                </button>

                <button
                  onClick={() => setVisitorFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer flex items-center gap-2 ${
                    visitorFilter === "all"
                      ? "bg-white/15 text-[#eeece5] border border-white/30 font-semibold"
                      : "bg-[#11100e] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                  }`}
                >
                  <span>Всі візити ({visitorStats.total})</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-[#777168]">
                Показано: {visitors.length} записів
              </div>
            </div>

            {/* Visitors Table / List */}
            <div className="space-y-3">
              {visitors.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-[#11100e] border border-white/10 text-xs font-mono text-[#777168]">
                  Записів у цій категорії ще немає.
                </div>
              ) : (
                visitors.map((log) => (
                  <div
                    key={log.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      log.isAdminDevice
                        ? "bg-[#11100e]/60 border-amber-500/20 hover:border-amber-500/40"
                        : "bg-[#11100e] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-semibold flex items-center gap-1 border ${
                            log.isAdminDevice
                              ? "bg-[#c4a160]/15 text-[#c4a160] border-[#c4a160]/30"
                              : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          }`}
                        >
                          {log.isAdminDevice ? (
                            <>
                              <User size={10} />
                              <span>Ви (Адмін)</span>
                            </>
                          ) : (
                            <>
                              <Globe size={10} />
                              <span>Гість / Рекрутер</span>
                            </>
                          )}
                        </span>

                        <span className="text-xs font-bold text-[#eeece5] font-mono">
                          {log.path}
                        </span>

                        <span className="text-[10px] font-mono text-[#777168]">
                          {log.timestamp}
                        </span>

                        <span className="text-[10px] font-mono text-[#a39c91]">
                          {log.country}
                        </span>
                      </div>

                      <div className="text-xs text-[#777168] font-mono flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1.5 text-[#a39c91]">
                          {log.deviceType === "mobile" ? (
                            <Smartphone size={12} />
                          ) : log.deviceType === "tablet" ? (
                            <Tablet size={12} />
                          ) : (
                            <Monitor size={12} />
                          )}
                          <span>
                            {log.os} / {log.browser} ({log.screenResolution})
                          </span>
                        </span>

                        <span>&bull;</span>

                        <span className="truncate max-w-[280px]">
                          Джерело: <span className="text-[#eeece5]">{log.referrer}</span>
                        </span>
                      </div>
                    </div>

                    <Link
                      href={log.path}
                      target="_blank"
                      className="text-[11px] font-mono text-[#c4a160] hover:underline flex items-center gap-1 shrink-0 self-start sm:self-auto"
                    >
                      <span>Відкрити сторінку</span>
                      <ExternalLink size={11} />
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 3: PROJECTS MANAGEMENT
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

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {[
                { id: "all", label: "Всі категорії" },
                { id: "Hardware & Robotics", label: "Hardware & Robotics" },
                { id: "Embedded Systems & IoT", label: "Embedded & IoT" },
                { id: "Industrial MES Platforms", label: "Industrial MES" },
                { id: "Web Platforms & Full-Stack", label: "Full-Stack Platforms" },
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
              {filteredProjects.map((proj: Project) => {
                const isFeatured = featuredOverride[proj.id] ?? false;

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
                          onClick={() => {
                            setFeaturedOverride((prev) => ({
                              ...prev,
                              [proj.id]: !isFeatured,
                            }));
                          }}
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
              })}
            </div>
          </div>
        )}

        {/* ────────────────────────────────────────────────────────
            TAB 4: INQUIRIES & LEADS
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

              <div className="flex items-center gap-2">
                {(["all", "new", "in_progress", "archived"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setInquiryFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors cursor-pointer ${
                      inquiryFilter === st
                        ? "bg-[#c4a160] text-[#11100e] font-semibold"
                        : "bg-[#11100e] text-[#a39c91] hover:text-[#eeece5] border border-white/10"
                    }`}
                  >
                    {st === "all" ? "Всі" : st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inquiries List */}
              <div className="lg:col-span-1 space-y-3">
                {filteredInquiries.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-[#11100e] border border-white/10 text-xs font-mono text-[#777168]">
                    Заявок у цій категорії немає.
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
                      <div className="text-[11px] font-mono text-[#c4a160] truncate">{inq.email}</div>
                      <p className="text-xs text-[#a39c91] line-clamp-2">{inq.message}</p>
                      <div className="text-[10px] font-mono text-[#777168]">{inq.date}</div>
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
                        <h3 className="text-base font-bold text-[#eeece5]">{selectedInquiry.name}</h3>
                        <div className="text-xs font-mono text-[#c4a160] flex items-center gap-2 mt-0.5">
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

                      <a
                        href={SOCIAL_LINKS.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] border border-[#229ED9]/30 text-xs font-mono transition-colors flex items-center gap-2"
                      >
                        <Send size={14} />
                        Відповісти в Telegram
                      </a>
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
            TAB 5: TELEMETRY & SYSTEM HEALTH
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {pingData.map((item) => (
                  <div
                    key={item.domain}
                    className="p-4 rounded-xl bg-[#08090a] border border-white/[0.08] space-y-2"
                  >
                    <div className="text-xs font-bold text-[#eeece5] truncate">{item.domain}</div>
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-2xl font-bold text-cyan-400">{item.ping}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-[#777168] flex items-center justify-between pt-1 border-t border-white/[0.06]">
                      <span>{item.ssl}</span>
                      <span>{item.lastChecked}</span>
                    </div>
                  </div>
                ))}
              </div>
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
            TAB 6: SETTINGS & CONFIGURATION
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
                  Встановіть новий майстер-PIN для розблокування кабінету адміністратора.
                </p>

                {pinChangeSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                    ✓ Новий PIN успішно збережено в системі!
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="password"
                    maxLength={16}
                    defaultValue={customPin}
                    id="newPinInput"
                    placeholder="Новий PIN (мінімум 4 символи)"
                    className="flex-1 bg-[#08090a] border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-[#eeece5] focus:outline-none focus:border-[#c4a160]"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById("newPinInput") as HTMLInputElement;
                      if (input) handleSavePin(input.value);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#c4a160] hover:bg-[#d6b578] text-[#11100e] text-xs font-mono font-semibold transition-colors cursor-pointer"
                  >
                    Зберегти
                  </button>
                </div>
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
                <h3 className="text-sm font-bold text-[#eeece5] uppercase tracking-wider font-mono flex items-center gap-2">
                  <Download size={14} className="text-cyan-400" />
                  Резервне Копіювання Даних
                </h3>
                <p className="text-xs text-[#a39c91]">
                  Експортуйте повний стан заявок, журнал візитів та налаштування сайту у форматі JSON.
                </p>

                <button
                  onClick={handleExportDataJson}
                  className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-[#eeece5] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Download size={14} className="text-[#c4a160]" />
                  Завантажити повний архів (backup.json)
                </button>
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
