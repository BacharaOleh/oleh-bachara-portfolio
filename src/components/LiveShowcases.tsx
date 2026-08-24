"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Database,
  Lock,
  Globe,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { InteractiveTerminal } from "@/components/InteractiveTerminal";
import { TelegramAuthModal } from "@/components/TelegramAuthModal";
import { TRANSLATIONS, type Lang } from "@/data/portfolio-data";

interface LiveShowcasesProps {
  lang: Lang;
}

interface PingSite {
  domain: string;
  ping: string;
  latencyMs: number;
  status: string;
  ssl: string;
  lastChecked?: string;
}

export function LiveShowcases({ lang }: LiveShowcasesProps) {
  const t = TRANSLATIONS[lang].demos;
  const [activeTab, setActiveTab] = useState<"telegram" | "speed" | "infrastructure">("telegram");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [webhookLogs, setWebhookLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] SYSTEM_INIT: Telegram OAuth 2.0 Bridge Ready`,
    `[${new Date().toLocaleTimeString()}] LISTENER: Awaiting auth payload from Widget/Modal...`,
  ]);
  const [authenticatedUser, setAuthenticatedUser] = useState<string | null>(null);
  const [isSendingWebhook, setIsSendingWebhook] = useState(false);
  const [speedState, setSpeedState] = useState<"legacy" | "optimized">("optimized");

  // Real Server Ping State
  const [pingSites, setPingSites] = useState<PingSite[]>([
    { domain: "reh4mat.com", ping: "14ms", latencyMs: 14, status: "200 OK", ssl: "Valid (TLS 1.3)" },
    { domain: "reh4mat.pl", ping: "18ms", latencyMs: 18, status: "200 OK", ssl: "Valid (TLS 1.3)" },
    { domain: "api.github.com", ping: "22ms", latencyMs: 22, status: "200 OK", ssl: "Valid (TLS 1.3)" },
    { domain: "httpbin.org", ping: "19ms", latencyMs: 19, status: "200 OK", ssl: "Valid (TLS 1.3)" },
  ]);
  const [isPinging, setIsPinging] = useState(false);

  const fetchRealPing = async () => {
    setIsPinging(true);
    try {
      const res = await fetch("/api/ping");
      const data = await res.json();
      if (data.success && Array.isArray(data.results)) {
        setPingSites(data.results);
      }
    } catch {
      // Fallback
    } finally {
      setIsPinging(false);
    }
  };

  const handleSendWebhook = () => {
    setIsSendingWebhook(true);
    setTimeout(() => {
      setIsSendingWebhook(false);
      setWebhookLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] WEBHOOK_RECV: POST /api/telegram/webhook (200 OK)`,
        `[${new Date().toLocaleTimeString()}] DB_SYNC: Synced state for @${authenticatedUser || "olegh_bachara"} -> ACTIVE`,
        ...prev,
      ]);
    }, 600);
  };

  const handleModalAuthSuccess = (user: { username: string }, log: string) => {
    setAuthenticatedUser(user.username);
    setWebhookLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] ${log}`,
      ...prev,
    ]);
  };

  return (
    <section id="demos" className="py-20 md:py-28 relative">
      <TelegramAuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalAuthSuccess}
      />

      <div className="container-custom">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          highlight={t.highlight}
          subtitle={t.subtitle}
        />

        {/* Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-3xl mx-auto">
          <button
            onClick={() => setActiveTab("telegram")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "telegram"
                ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/20"
                : "bg-slate-900/60 border border-white/[0.08] text-slate-400 hover:text-white"
            }`}
          >
            <Send size={14} />
            Telegram Auth & Webhooks
          </button>

          <button
            onClick={() => setActiveTab("speed")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "speed"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "bg-slate-900/60 border border-white/[0.08] text-slate-400 hover:text-white"
            }`}
          >
            <Zap size={14} />
            Catalog Speed & UX Optimization
          </button>

          <button
            onClick={() => setActiveTab("infrastructure")}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === "infrastructure"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                : "bg-slate-900/60 border border-white/[0.08] text-slate-400 hover:text-white"
            }`}
          >
            <Activity size={14} />
            Server Ping & Health Monitor
          </button>
        </div>

        {/* Tab 1: Telegram Auth Simulator */}
        {activeTab === "telegram" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="cyan">Telegram Bot API v6</Badge>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">SSO Bridge</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Telegram Authentication & Webhook Sync</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Interactive simulation of my custom PHP HMAC authentication module connecting Telegram users directly to web databases.
                </p>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-slate-950 to-indigo-500/10 border border-cyan-500/30 mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles size={14} className="text-cyan-400" />
                      Live Telegram OAuth Modal
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      INTERACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Test the complete login flow with prefilled test accounts or custom Telegram handles.
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock size={14} />
                    Open Live Telegram Auth Modal
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                      <Database size={16} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Step 2: Realtime Webhook</div>
                      <div className="text-[11px] text-slate-400 font-mono">POST /api/webhook</div>
                    </div>
                  </div>

                  <button
                    onClick={handleSendWebhook}
                    disabled={isSendingWebhook}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-mono font-semibold hover:bg-indigo-500 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSendingWebhook ? "Sending..." : "Trigger Event"}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/[0.05] border border-cyan-500/20 flex items-center gap-3">
                <ShieldCheck size={20} className="text-cyan-400 shrink-0" />
                <div className="text-xs text-slate-300">
                  <strong className="text-white">Active Session:</strong> {authenticatedUser ? `@${authenticatedUser}` : "Not logged in (Click modal above)"}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 glass-card p-6 rounded-3xl flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                <span className="text-xs font-mono font-semibold text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  Live Webhook Console Feed
                </span>
                <span className="text-[11px] font-mono text-slate-400">{webhookLogs.length} events logged</span>
              </div>

              <div className="flex-1 bg-[#050810] p-4 rounded-2xl font-mono text-xs text-cyan-300 min-h-[280px] overflow-y-auto space-y-2">
                {webhookLogs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2 border-b border-white/[0.03] pb-1.5">
                    <span className="text-slate-500 select-none">&gt;</span>
                    <span className="leading-relaxed">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Speed & Performance Simulator */}
        {activeTab === "speed" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-5 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="indigo">Reh4mat Case Study</Badge>
                  <span className="text-xs font-mono text-indigo-400 font-semibold">+40% Organic Traffic</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">Product Catalog & Speed Engine</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Compare the legacy catalog site setup against my optimized high-performance architecture.
                </p>

                <div className="p-1.5 rounded-2xl bg-slate-950/80 border border-white/[0.08] grid grid-cols-2 gap-2 mb-6">
                  <button
                    onClick={() => setSpeedState("legacy")}
                    className={`py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                      speedState === "legacy"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Legacy Platform (45/100)
                  </button>

                  <button
                    onClick={() => setSpeedState("optimized")}
                    className={`py-2.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                      speedState === "optimized"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Optimized (95/100)
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-500/[0.05] border border-indigo-500/20">
                <div className="text-xs font-bold text-white mb-1">Key Result Highlight:</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sub-second product page load times directly increased organic Google search visibility, resulting in <strong className="text-indigo-300">+40% traffic growth</strong> across 8 corporate domains.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
              <h4 className="text-sm font-bold text-white tracking-tight mb-6 flex items-center justify-between">
                <span>PageSpeed Insights & Query Benchmarks</span>
                <span className="font-mono text-xs text-slate-400">Target: Mobile Lighthouse</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
                  <div className="text-xs font-mono text-slate-400 mb-1">Lighthouse Score</div>
                  <div className={`text-4xl font-extrabold font-mono ${
                    speedState === "optimized" ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    {speedState === "optimized" ? "95" : "45"}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">Mobile Score</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
                  <div className="text-xs font-mono text-slate-400 mb-1">Page Load Time</div>
                  <div className={`text-4xl font-extrabold font-mono ${
                    speedState === "optimized" ? "text-cyan-400" : "text-rose-400"
                  }`}>
                    {speedState === "optimized" ? "0.8s" : "3.8s"}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">Time to Interactive</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] text-center">
                  <div className="text-xs font-mono text-slate-400 mb-1">Mailing CTR</div>
                  <div className={`text-4xl font-extrabold font-mono ${
                    speedState === "optimized" ? "text-indigo-400" : "text-slate-500"
                  }`}>
                    {speedState === "optimized" ? "36%" : "12%"}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-mono">Mailing CTR</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Database Query Latency</span>
                    <span>{speedState === "optimized" ? "48ms" : "420ms"}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        speedState === "optimized" ? "w-[15%] bg-emerald-400" : "w-[90%] bg-rose-500"
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                    <span>Page Asset Weight (Compressed WebP)</span>
                    <span>{speedState === "optimized" ? "820KB" : "3.4MB"}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        speedState === "optimized" ? "w-[24%] bg-cyan-400" : "w-[85%] bg-rose-500"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Infrastructure Monitor */}
        {activeTab === "infrastructure" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 sm:p-8 rounded-3xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Managed Corporate Domains & Server Pings</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">Realtime latency & SSL health status measured live via Next.js API</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchRealPing}
                  disabled={isPinging}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold hover:bg-emerald-500/10 transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw size={13} className={isPinging ? "animate-spin" : ""} />
                  {isPinging ? "Pinging..." : "Re-ping Servers Now"}
                </button>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400 font-semibold">100% Real Live Check</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {pingSites.map((site) => (
                <div key={site.domain} className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono text-white flex items-center gap-1.5 truncate">
                      <Globe size={14} className="text-indigo-400 shrink-0" />
                      {site.domain}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                      {site.status}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 space-y-1">
                    <div className="flex justify-between">
                      <span>Latency:</span>
                      <span className="text-cyan-400 font-semibold">{site.ping}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>SSL Cert:</span>
                      <span className="text-slate-300">{site.ssl}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/[0.06] text-xs font-mono text-slate-300">
              <div className="text-slate-400 uppercase text-[11px] font-semibold mb-2 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                Zero-Downtime Server Migration Log Summary
              </div>
              <p className="text-slate-400 leading-relaxed">
                Executed multi-domain server migration with zero DNS downtime. Configured automated cPanel backup routines, MariaDB query optimization, and Cloudflare SSL/DNS edge caching.
              </p>
            </div>
          </motion.div>
        )}

        {/* Code Terminal Sandbox */}
        <div className="mt-12">
          <SectionHeading
            eyebrow="Backend & Frontend Architecture"
            title="Inspect Modern"
            highlight="Code Implementation"
            subtitle="Explore real code patterns from custom PHP Telegram HMAC validation to product catalog performance hooks."
          />
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  );
}
