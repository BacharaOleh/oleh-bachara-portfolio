"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Copy, Check, Play, FileCode, Cpu } from "lucide-react";

interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  description: string;
  code: string;
  outputSnippet?: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    id: "telegram-auth",
    filename: "TelegramOAuthHandler.php",
    language: "php",
    description: "Server-side HMAC-SHA256 hash validation for Telegram Widget Auth & Webhook Sync",
    code: `<?php
declare(strict_types=1);

namespace App\\Security;

class TelegramOAuthHandler {
    private string $botToken;

    public function __construct(string $botToken) {
        $this->botToken = $botToken;
    }

    public function verifyAuth(array $authData): bool {
        $checkHash = $authData['hash'] ?? '';
        unset($authData['hash']);
        
        $dataCheckArr = [];
        foreach ($authData as $key => $value) {
            $dataCheckArr[] = $key . '=' . $value;
        }
        sort($dataCheckArr);
        $dataCheckString = implode("\n", $dataCheckArr);

        $secretKey = hash('sha256', $this->botToken, true);
        $hash = hash_hmac('sha256', $dataCheckString, $secretKey);

        return hash_equals($hash, $checkHash);
    }
}`,
    outputSnippet: "✔ Hash verification signature match (HMAC-SHA256 verified)\n✔ Auth Token Issued: session_tg_9f82a1\n✔ Webhook synced with User ID #482910",
  },
  {
    id: "catalog-speed",
    filename: "CatalogPerformanceOptimizer.php",
    language: "php",
    description: "Custom WordPress product catalog query tuning & asset deferral for sub-second load times",
    code: `<?php
// Defer non-critical CSS/JS & cleanup bloat on corporate catalog pages
add_action('wp_enqueue_scripts', function() {
    if (is_front_page() || is_archive('product_catalog')) {
        wp_dequeue_style('global-styles');
        wp_enqueue_script('catalog-fast-filter', get_template_directory_uri() . '/js/catalog.js', [], '1.0', true);
    }
}, 99);

// Add index optimization for custom product catalog meta tables
add_action('init', function() {
    global $wpdb;
    $wpdb->query("ALTER TABLE {$wpdb->prefix}postmeta ADD INDEX IF NOT EXISTS catalog_meta_key (meta_key(32), meta_value(32));");
});`,
    outputSnippet: "✔ Unused scripts dequeued (-240KB assets saved)\n✔ Catalog query time reduced from 420ms to 48ms\n✔ PageSpeed score increased from 45 to 94+",
  },
  {
    id: "ga4-events",
    filename: "GA4CatalogTracker.js",
    language: "javascript",
    description: "Custom DataLayer payload dispatcher for precise product catalog engagement & inquiry tracking",
    code: `export function trackProductInquiry(productData) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'product_inquiry',
    catalog: {
      product_id: productData.sku,
      product_name: productData.name,
      category: productData.category,
      user_region: productData.region
    }
  });
  console.log('[GA4] Product catalog inquiry event dispatched successfully');
}`,
    outputSnippet: "✔ Event payload pushed to window.dataLayer\n✔ GA4 Stream ID matched: G-XXXXXXXXXX\n✔ Catalog engagement attribution recorded",
  },
];

export function InteractiveTerminal() {
  const [activeId, setActiveId] = useState(SNIPPETS[0].id);
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(true);

  const activeSnippet = SNIPPETS.find((s) => s.id === activeId)!;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setRunning(false);
      setShowOutput(true);
    }, 600);
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl">
      {/* Terminal Window Top Bar */}
      <div className="bg-slate-950/90 px-4 py-3 border-b border-white/[0.08] flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
            <Terminal size={14} className="text-indigo-400" />
            oleh@systems-lab:~
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-white/[0.06]">
          {SNIPPETS.map((snippet) => (
            <button
              key={snippet.id}
              onClick={() => {
                setActiveId(snippet.id);
                setShowOutput(true);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeId === snippet.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileCode size={13} />
              {snippet.filename}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={running}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1 hover:bg-emerald-500/20 transition-colors cursor-pointer"
          >
            <Play size={12} className={running ? "animate-spin" : ""} />
            {running ? "Executing..." : "Run Test"}
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Copy code"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Snippet Header */}
      <div className="px-5 py-2.5 bg-slate-950/60 border-b border-white/[0.06] text-xs font-mono text-slate-400 flex items-center justify-between">
        <span>// {activeSnippet.description}</span>
        <span className="uppercase text-indigo-400 font-semibold">{activeSnippet.language}</span>
      </div>

      {/* Code Editor Body */}
      <div className="p-5 font-mono text-xs sm:text-sm bg-[#050810]/95 overflow-x-auto text-slate-300 leading-relaxed min-h-[220px]">
        <pre className="whitespace-pre">
          {activeSnippet.code.split("\n").map((line, idx) => (
            <div key={idx} className="flex hover:bg-white/[0.02] px-1 rounded">
              <span className="w-8 text-slate-600 select-none text-right pr-4 text-[11px] opacity-60">
                {idx + 1}
              </span>
              <span className="flex-1">{line}</span>
            </div>
          ))}
        </pre>
      </div>

      {/* Live Console Output Bar */}
      <AnimatePresence>
        {showOutput && activeSnippet.outputSnippet && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-emerald-500/30 bg-slate-950/90 p-4 font-mono text-xs text-emerald-400"
          >
            <div className="flex items-center gap-2 mb-1.5 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
              <Cpu size={13} className="text-emerald-400" />
              Terminal Execution Result
            </div>
            <pre className="whitespace-pre-wrap text-emerald-300/90 text-xs">
              {activeSnippet.outputSnippet}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
