"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Lock, Sparkles, RefreshCw, Server, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TelegramAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { username: string; firstName?: string }, logMessage: string) => void;
}

export function TelegramAuthModal({ isOpen, onClose, onSuccess }: TelegramAuthModalProps) {
  const [step, setStep] = useState<"widget" | "verifying" | "success" | "error">("widget");
  const [verifyLogs, setVerifyLogs] = useState<string[]>([]);
  const [sessionResult, setSessionResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const defaultBotName = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || "OlehBacharaBot";
  const [activeBotName, setActiveBotName] = useState<string>(defaultBotName);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  // Load Official Telegram Login Widget
  useEffect(() => {
    if (!isOpen || !widgetContainerRef.current) return;

    // Define window callback for official Telegram OAuth Widget
    (window as any).onTelegramAuth = async (user: any) => {
      setStep("verifying");
      setVerifyLogs([
        `[Official Telegram Widget]: Auth Payload Received from Telegram Server`,
        `[Payload]: User ID #${user.id}, Username: @${user.username || user.first_name}`,
        `[API Request]: Dispatching POST /api/telegram-auth...`,
      ]);

      try {
        const res = await fetch("/api/telegram-auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        const data = await res.json();

        if (data.verified) {
          setSessionResult(data);
          setVerifyLogs((prev) => [
            ...prev,
            `[Server Route /api/telegram-auth]: HMAC-SHA256 Signature Verified ✓`,
            `[Mode]: ${data.mode}`,
            `[Session Token]: ${data.sessionToken}`,
          ]);
          setStep("success");
          if (onSuccess) {
            onSuccess(
              { username: user.username || user.first_name, firstName: user.first_name },
              `[REAL TELEGRAM OAUTH] @${user.username || user.first_name} authenticated via Next.js Server Route (HMAC Verified)`
            );
          }
        } else {
          setStep("error");
          setErrorMessage(data.error || "Cryptographic HMAC signature mismatch");
        }
      } catch (err: any) {
        setStep("error");
        setErrorMessage(err.message || "Failed to communicate with authentication server");
      }
    };

    // Inject Official Telegram Login Widget
    const container = widgetContainerRef.current;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", activeBotName);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "14");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;
    container.appendChild(script);
  }, [isOpen, activeBotName, onSuccess]);

  const handleReset = () => {
    setStep("widget");
    setVerifyLogs([]);
    setSessionResult(null);
    setErrorMessage("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 bg-[#090d16]/95 border border-cyan-500/30 shadow-2xl z-10 overflow-hidden"
          >
            {/* Top Glowing Bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Send size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  Official Telegram Web Login Widget
                  <Sparkles size={14} className="text-cyan-400" />
                </h3>
                <p className="text-xs text-slate-400 font-mono">Real Telegram OAuth & Server HMAC Verification</p>
              </div>
            </div>

            {/* STEP 1: Official Telegram Login Widget Container */}
            {step === "widget" && (
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-center space-y-4">
                  <div className="text-xs font-mono text-cyan-300 font-bold flex items-center justify-center gap-2">
                    <Server size={14} className="text-cyan-400" />
                    Telegram Bot Target: <span className="text-white">@{activeBotName}</span>
                  </div>

                  {/* Official Telegram Widget Embed Container */}
                  <div className="py-2 flex justify-center items-center min-h-[50px]">
                    <div ref={widgetContainerRef} className="telegram-widget-wrapper" />
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-mono">
                    Click the official Telegram button above to authorize with your real Telegram account.
                  </p>
                </div>

                {/* Bot Name Config Tool for Testing */}
                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06] space-y-2">
                  <label className="text-[11px] font-mono text-slate-400 block">
                    Connecting a custom bot username? Change target bot:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={activeBotName}
                      onChange={(e) => setActiveBotName(e.target.value.replace("@", ""))}
                      placeholder="e.g. YourBotUsername"
                      className="flex-1 bg-slate-900 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Verifying Cryptographic Signature */}
            {step === "verifying" && (
              <div className="py-8 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <RefreshCw size={24} className="animate-spin text-cyan-400" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Verifying Telegram OAuth Signature...</h4>
                  <p className="text-xs text-slate-400 font-mono">POST /api/telegram-auth Execution in Progress</p>
                </div>

                <div className="w-full bg-slate-950 p-4 rounded-2xl font-mono text-[11px] text-cyan-300 text-left space-y-1.5 border border-cyan-500/20 max-h-[150px] overflow-y-auto">
                  {verifyLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-500 select-none">&gt;</span>
                      <span className="leading-relaxed">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Authenticated Session Card */}
            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5"
              >
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-300">Real Telegram Account Authenticated ✓</div>
                    <div className="text-[11px] text-slate-300 font-mono">
                      HMAC SHA-256 Validated via Next.js Server Route
                    </div>
                  </div>
                </div>

                {/* User Session Details */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {sessionResult?.user?.photoUrl ? (
                      <img
                        src={sessionResult.user.photoUrl}
                        alt="Telegram Avatar"
                        className="w-11 h-11 rounded-xl object-cover border border-cyan-500/40"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {sessionResult?.user?.firstName ? sessionResult.user.firstName[0] : "T"}
                      </div>
                    )}

                    <div>
                      <div className="text-sm font-bold text-white">
                        {sessionResult?.user?.firstName} {sessionResult?.user?.lastName || ""}
                      </div>
                      <div className="text-xs font-mono text-cyan-400">
                        @{sessionResult?.user?.username || `id_${sessionResult?.user?.id}`}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <ShieldCheck size={13} />
                    VERIFIED
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06] font-mono text-[11px] text-slate-300 space-y-1">
                  <div className="text-slate-400 font-semibold">Issued Session Token:</div>
                  <code className="text-cyan-300 block truncate font-mono">
                    {sessionResult?.sessionToken}
                  </code>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleReset}
                    variant="secondary"
                    className="flex-1 font-mono text-xs cursor-pointer"
                  >
                    Log In Again
                  </Button>
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs cursor-pointer"
                  >
                    Done / Close
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Error State */}
            {step === "error" && (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
                  <AlertCircle size={24} />
                </div>
                <h4 className="text-sm font-bold text-white">Authentication Failed</h4>
                <p className="text-xs text-slate-400 font-mono">
                  {errorMessage || "HMAC signature mismatch or missing TELEGRAM_BOT_TOKEN"}
                </p>
                <Button onClick={handleReset} variant="outline" size="sm">
                  Try Again
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
