"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Shield, Cpu, Activity, ArrowRight, Zap, Code2, Globe } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { type Lang } from "@/data/portfolio-data";

interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  tech: string;
  metric: string;
  details: string;
  icon: any;
  accent: string;
}

const NODES: ArchitectureNode[] = [
  {
    id: "client-webhook",
    name: "Client & Telegram Webhook",
    role: "Traffic & Event Trigger",
    tech: "Telegram Bot API v6 / HTTP POST",
    metric: "<200ms Latency",
    details: "Handles incoming OAuth login events, Telegram bot webhooks, and visitor HTTP requests from EU/PL regions.",
    icon: Globe,
    accent: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  },
  {
    id: "cdn-dns",
    name: "DNS & Edge Protection",
    role: "Edge Hardening & WAF",
    tech: "Cloudflare DNS / SSL TLS 1.3",
    metric: "99.99% Uptime",
    details: "Provides instant propagation DNS routing, DDOS protection, SSL certificate enforcement, and asset caching.",
    icon: Shield,
    accent: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
  },
  {
    id: "server-host",
    name: "cPanel & Nginx Hosting",
    role: "Server Infrastructure",
    tech: "Linux CLI / cPanel WHM / PHP 8.2",
    metric: "0% Downtime",
    details: "High-performance server stack tuned for zero-downtime domain cutovers and automated daily backups.",
    icon: Server,
    accent: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  },
  {
    id: "php-core",
    name: "PHP & WordPress Core",
    role: "Custom Business Logic",
    tech: "Custom Themes, ACF, HMAC Auth",
    metric: "Sub-2s Load",
    details: "Refactored legacy PHP scripts, lightweight custom Gutenberg blocks, and product catalog showcase optimization.",
    icon: Cpu,
    accent: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    id: "database",
    name: "MariaDB Database Engine",
    role: "Data Layer & Query Cache",
    tech: "MariaDB Index Tuning / InnoDB",
    metric: "48ms Queries",
    details: "Custom postmeta index tuning, query caching, and automated cron jobs maintaining low database execution latency.",
    icon: Database,
    accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
];

interface SystemArchitectureProps {
  lang: Lang;
}

export function SystemArchitecture({ lang }: SystemArchitectureProps) {
  const [selectedId, setSelectedId] = useState(NODES[0].id);
  const activeNode = NODES.find((n) => n.id === selectedId)!;

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container-custom">
        <SectionHeading
          eyebrow="System Blueprint"
          title={lang === "pl" ? "Architektura Systemów" : "Interactive System"}
          highlight={lang === "pl" ? "i Przepływ Danych" : "Architecture Blueprint"}
          subtitle={lang === "pl" 
            ? "Interaktywny schemat przepływu danych od zapytania klienta i ботів Telegram по сервери korporacyjne i bazę MariaDB." 
            : "Interactive visual blueprint illustrating real-time data flow from Telegram bot webhooks through cPanel servers down to optimized MariaDB databases."}
        />

        {/* Nodes Grid Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const isSelected = selectedId === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedId(node.id)}
                className={`glass-card p-4 rounded-2xl cursor-pointer transition-all duration-300 relative ${
                  isSelected
                    ? "border-indigo-500/60 bg-slate-900/90 shadow-lg shadow-indigo-500/20 scale-[1.02]"
                    : "hover:border-white/[0.2]"
                }`}
              >
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

        {/* Selected Node Details Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-500/30 bg-slate-950/80"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${activeNode.accent}`}>
                  <activeNode.icon size={20} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white tracking-tight">{activeNode.name}</h4>
                  <p className="text-xs font-mono text-indigo-400">{activeNode.tech}</p>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/[0.08] text-xs font-mono font-semibold text-emerald-400">
                Benchmark: {activeNode.metric}
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-4xl">
              {activeNode.details}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
