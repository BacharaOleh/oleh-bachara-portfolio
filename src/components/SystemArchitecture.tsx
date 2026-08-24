"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Shield, Cpu, Globe, Play, CheckCircle2, RefreshCw, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { type Lang } from "@/data/portfolio-data";

interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  tech: string;
  metric: string;
  latencyOffset: number; // latency ms in simulation
  statusText: string;
  details: string;
  icon: any;
  accent: string;
  borderGlow: string;
}

const NODES: ArchitectureNode[] = [
  {
    id: "client-webhook",
    name: "Client / Telegram Webhook",
    role: "Traffic & Ingestion",
    tech: "Telegram Bot API v6 / HTTP POST",
    metric: "0ms (Origin)",
    latencyOffset: 0,
    statusText: "Event payload dispatched to HTTPS endpoint",
    details: "Handles incoming OAuth login events, Telegram bot webhooks, and visitor HTTP requests from EU/PL regions with instant acknowledgment.",
    icon: Globe,
    accent: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    borderGlow: "rgba(56, 189, 248, 0.4)",
  },
  {
    id: "cdn-dns",
    name: "DNS & Edge Protection",
    role: "Edge Hardening & WAF",
    tech: "Cloudflare DNS / SSL TLS 1.3",
    metric: "+12ms Edge Latency",
    latencyOffset: 12,
    statusText: "TLS 1.3 handshake verified, DDoS WAF passed",
    details: "Provides instant propagation DNS routing, DDOS protection, SSL certificate enforcement, and edge asset caching for sub-second delivery.",
    icon: Shield,
    accent: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
    borderGlow: "rgba(99, 102, 241, 0.4)",
  },
  {
    id: "server-host",
    name: "cPanel & Nginx Host",
    role: "Reverse Proxy & Load Balancer",
    tech: "Linux CLI / cPanel WHM / PHP 8.2-FPM",
    metric: "+18ms Proxy Latency",
    latencyOffset: 30,
    statusText: "Reverse proxy routing to PHP-FPM worker pool",
    details: "High-performance server stack tuned for zero-downtime domain cutovers, HTTP/2 multiplexing, and automated daily backups.",
    icon: Server,
    accent: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    borderGlow: "rgba(168, 85, 247, 0.4)",
  },
  {
    id: "php-core",
    name: "PHP 8.2 & Auth Engine",
    role: "HMAC & Business Logic",
    tech: "HMAC-SHA256 / Custom Gutenberg Blocks",
    metric: "+32ms Execution Time",
    latencyOffset: 62,
    statusText: "Cryptographic hash verified, session JWT issued",
    details: "Refactored legacy PHP scripts, lightweight custom Gutenberg blocks, and product catalog showcase optimization with HMAC cryptographic verification.",
    icon: Cpu,
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    borderGlow: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: "database",
    name: "MariaDB Database Engine",
    role: "Data Layer & Query Cache",
    tech: "MariaDB Index Tuning / InnoDB Buffer",
    metric: "+48ms Query Latency",
    latencyOffset: 110,
    statusText: "InnoDB indexed query cached, transaction committed",
    details: "Custom postmeta index tuning, query caching, and automated cron jobs maintaining low database execution latency across 8+ corporate platforms.",
    icon: Database,
    accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    borderGlow: "rgba(245, 158, 11, 0.4)",
  },
];

interface SystemArchitectureProps {
  lang: Lang;
}

export function SystemArchitecture({ lang }: SystemArchitectureProps) {
  const [selectedId, setSelectedId] = useState(NODES[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const activeNode = NODES.find((n) => n.id === selectedId)!;

  const startSimulation = (mode: "telegram" | "catalog") => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);
    setSelectedId(NODES[0].id);

    const eventName = mode === "telegram" ? "Telegram Auth Webhook" : "Catalog Speed Query";
    setLogs([`[0ms] 🚀 Triggering ${eventName}...`]);

    NODES.forEach((node, index) => {
      setTimeout(() => {
        setActiveStep(index);
        setSelectedId(node.id);
        setLogs((prev) => [
          ...prev,
          `[+${node.latencyOffset}ms] ⚡ ${node.name}: ${node.statusText}`,
        ]);

        if (index === NODES.length - 1) {
          setTimeout(() => {
            setIsSimulating(false);
            setLogs((prev) => [
              ...prev,
              `[✅ Complete] Total Round-Trip: 110ms · 0 errors · 100% Data Integrity.`,
            ]);
          }, 600);
        }
      }, (index + 1) * 700);
    });
  };

  return (
    <section id="architecture" className="py-20 md:py-28 relative">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Interactive System Blueprint"
          title={lang === "pl" ? "Architektura Systemów" : "Interactive System"}
          highlight={lang === "pl" ? "i Przepływ Danych Live" : "Architecture & Data Pipeline"}
          subtitle={
            lang === "pl"
              ? "Interaktywny symulator przepływu danych: od zapytania webhooka Telegram przez Cloudflare i Nginx po zoptymalizowaną bazę MariaDB."
              : "Interactive visual data pipeline simulator: test how live requests travel from Telegram Bot Webhooks through Edge CDN and Nginx to optimized MariaDB queries."
          }
        />

        {/* Simulation Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-white/[0.08] backdrop-blur-md mb-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-slate-300 font-semibold">
              Live Pipeline State: <span className="text-emerald-400">{isSimulating ? "Simulating Request..." : "Idle & Ready"}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => startSimulation("telegram")}
              disabled={isSimulating}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-mono font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              {isSimulating ? <RefreshCw size={13} className="animate-spin" /> : <Play size={13} />}
              <span>Simulate Telegram Webhook</span>
            </button>

            <button
              onClick={() => startSimulation("catalog")}
              disabled={isSimulating}
              className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 text-xs font-mono font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Zap size={13} />
              <span>Simulate Catalog Query</span>
            </button>
          </div>
        </div>

        {/* Pipeline Nodes Flow (Connected with SVG Animated Lasers) */}
        <div className="relative mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10">
            {NODES.map((node, i) => {
              const Icon = node.icon;
              const isSelected = selectedId === node.id;
              const isStepActive = activeStep === i;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedId(node.id)}
                  className={`glass-card p-4 rounded-2xl cursor-pointer transition-all duration-300 relative ${
                    isStepActive
                      ? "ring-2 ring-emerald-400 bg-slate-900/95 shadow-xl shadow-emerald-500/20 scale-[1.04]"
                      : isSelected
                      ? "border-indigo-500/60 bg-slate-900/90 shadow-lg shadow-indigo-500/20 scale-[1.02]"
                      : "hover:border-white/[0.2]"
                  }`}
                >
                  {/* Active Step Laser Indicator */}
                  {isStepActive && (
                    <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-[9px] font-mono font-bold text-slate-950 uppercase tracking-widest shadow-md">
                      Active Step
                    </span>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-8 h-8 rounded-xl border flex items-center justify-center ${node.accent}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">0{i + 1}</span>
                  </div>

                  <div className="text-xs font-bold text-white tracking-tight mb-1">{node.name}</div>
                  <div className="text-[10px] font-mono text-slate-400">{node.role}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Box & Telemetry Log Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Node Details Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-slate-950/80 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${activeNode.accent}`}>
                        <activeNode.icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">{activeNode.name}</h3>
                        <p className="text-xs font-mono text-indigo-400">{activeNode.tech}</p>
                      </div>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/[0.08] text-xs font-mono font-semibold text-emerald-400">
                      Latency: {activeNode.metric}
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {activeNode.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-slate-400">
                  <CheckCircle2 size={14} className="text-emerald-400" />
                  <span>Pipeline status: <strong>{activeNode.statusText}</strong></span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Live Telemetry Log Box */}
          <div className="lg:col-span-5">
            <div className="glass-card p-5 sm:p-6 rounded-3xl border border-white/[0.08] bg-slate-950/90 font-mono text-xs h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08] text-slate-400">
                  <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Live Telemetry Tracing</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-bold">110ms AVG</span>
                </div>

                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {logs.length === 0 ? (
                    <div className="text-slate-500 italic py-4 text-center">
                      Click "Simulate Telegram Webhook" to trace packet execution across the system.
                    </div>
                  ) : (
                    logs.map((log, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-[11px] leading-relaxed ${
                          log.includes("Complete")
                            ? "text-emerald-400 font-bold"
                            : log.includes("Triggering")
                            ? "text-cyan-400 font-semibold"
                            : "text-slate-300"
                        }`}
                      >
                        {log}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] text-[10px] text-slate-500 flex items-center justify-between">
                <span>Architecture: Micro-monolith + Edge</span>
                <span>TLS 1.3 · HTTPS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
