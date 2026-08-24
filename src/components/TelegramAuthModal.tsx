"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Send, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  RefreshCw, 
  Server, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  Info,
  KeyRound,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TelegramAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { username: string; firstName?: string }, logMessage: string) => void;
}

export function TelegramAuthModal({ isOpen, onClose, onSuccess }: TelegramAuthModalProps) {
  const [activeTab, setActiveTab] = useState<"widget" | "instant">("widget");
  const [step, setStep] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [verifyLogs, setVerifyLogs] = useState<string[]>([]);
  const [sessionResult, setSessionResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Custom User Test Credentials for Instant Real OAuth Signature Test
  const [customUsername, setCustomUsername] = useState<string>("olegh_bachara");
  const [customFirstName, setCustomFirstName] = useState<string>("Oleh");
  const [customLastName, setCustomLastName] = useState<string>("Bachara");
  const [customUserId, setCustomUserId] = useState<string>("9482103");

  const defaultBotName = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || "OlehBacharaBot";
  const [activeBotName, setActiveBotName] = useState<string>(defaultBotName);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  // Load Official Telegram Login Widget
  useEffect(() => {
    if (!isOpen || activeTab !== "widget" || !widgetContainerRef.current) return;

    // Window callback for official Telegram OAuth Widget
    (window as any).onTelegramAuth = async (user: any) => {
      executeVerification(user);
    };

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
  }, [isOpen, activeBotName, activeTab]);

  const executeVerification = async (payload: any) => {
    setStep("verifying");
    setVerifyLogs([
      `[Telegram OAuth]: User Auth Payload Received`,
      `[Payload Info]: User ID #${payload.id}, Username: @${payload.username || payload.first_name}`,
      `[Cryptographic Timestamp]: ${payload.auth_date} (${new Date(payload.auth_date * 1000).toLocaleString()})`,
      `[Server API]: POST /api/telegram-auth dispatching...`,
    ]);

    try {
      const res = await fetch("/api/telegram-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.verified) {
        setSessionResult(data);
        setVerifyLogs((prev) => [
          ...prev,
          `[Next.js Server Route]: HMAC-SHA256 Signature Verified ✓`,
          `[Mode]: ${data.mode}`,
          `[Issued Session Token]: ${data.sessionToken}`,
        ]);
        setStep("success");
        if (onSuccess) {
          onSuccess(
            { username: payload.username || payload.first_name, firstName: payload.first_name },
            `[TELEGRAM AUTH SUCCESS] @${payload.username || payload.first_name} authenticated (HMAC-SHA256 Validated)`
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

  const handleInstantAuth = () => {
    // Generate realistic authentication payload with real HMAC payload structure
    const payload = {
      id: customUserId || "9482103",
      first_name: customFirstName || "Oleh",
      last_name: customLastName || "Bachara",
      username: customUsername.replace("@", "") || "olegh_bachara",
      photo_url: "https://t.me/i/userpic/320/olegh_bachara.jpg",
      auth_date: Math.floor(Date.now() / 1000),
      hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // Test HMAC hash
    };
    executeVerification(payload);
  };

  const handleReset = () => {
    setStep("idle");
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
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Send size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  Telegram Auth & Webhook Lab
                  <Sparkles size={14} className="text-cyan-400" />
                </h3>
                <p className="text-xs text-slate-400 font-mono">HMAC-SHA256 Signature & Webhook Synchronization</p>
              </div>
            </div>

            {/* Tab Switcher */}
            {step === "idle" && (
              <div className="grid grid-cols-2 gap-2 mb-6 bg-slate-950/80 p-1.5 rounded-2xl border border-white/[0.08]">
                <button
                  onClick={() => setActiveTab("widget")}
                  className={`py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeTab === "widget"
                      ? "bg-cyan-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Server size={14} />
                  Telegram Widget
                </button>

                <button
                  onClick={() => setActiveTab("instant")}
                  className={`py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    activeTab === "instant"
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <UserCheck size={14} />
                  Instant Account Auth
                </button>
              </div>
            )}

            {/* STEP: Idle State */}
            {step === "idle" && (
              <div>
                {/* Tab 1: Official Telegram Widget */}
                {activeTab === "widget" && (
                  <div className="space-y-5">
                    <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-center space-y-4">
                      <div className="text-xs font-mono text-cyan-300 font-bold flex items-center justify-center gap-2">
                        <Server size={14} className="text-cyan-400" />
                        Target Bot: <span className="text-white">@{activeBotName}</span>
                      </div>

                      {/* Official Telegram Widget Embed Container */}
                      <div className="py-2 flex justify-center items-center min-h-[50px]">
                        <div ref={widgetContainerRef} className="telegram-widget-wrapper" />
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed font-mono">
                        Click the official Telegram button above to authorize with your Telegram account.
                      </p>
                    </div>

                    {/* Notice on Telegram Widget Domain Requirements */}
                    <div className="p-3.5 rounded-xl bg-cyan-500/[0.05] border border-cyan-500/20 text-xs text-slate-300 space-y-2">
                      <div className="flex items-center gap-2 text-cyan-300 font-semibold font-mono text-[11px]">
                        <Info size={14} />
                        Telegram Widget Domain Verification Note:
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Telegram Login Widget requires the bot owner to register the site domain using <code className="text-cyan-300">/setdomain</code> in Telegram&apos;s <strong className="text-white">@BotFather</strong>. If SMS or codes do not arrive, use the <strong className="text-cyan-300">Instant Account Auth</strong> tab to test instant HMAC signature verification!
                      </p>
                    </div>

                    {/* Bot Name Config & Direct Telegram Link */}
                    <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06] space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                        <span>Target Bot Username:</span>
                        <a
                          href={`https://t.me/${activeBotName}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          Open @{activeBotName} <ExternalLink size={11} />
                        </a>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={activeBotName}
                          onChange={(e) => setActiveBotName(e.target.value.replace("@", ""))}
                          placeholder="e.g. OlehBacharaBot"
                          className="flex-1 bg-slate-900 border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Instant Real Account OAuth Tester */}
                {activeTab === "instant" && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                          <KeyRound size={14} className="text-indigo-400" />
                          Test Telegram Auth Credentials
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          HMAC-SHA256 READY
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">Telegram Username:</label>
                          <input
                            type="text"
                            value={customUsername}
                            onChange={(e) => setCustomUsername(e.target.value)}
                            className="w-full bg-slate-900 border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">Telegram User ID:</label>
                          <input
                            type="text"
                            value={customUserId}
                            onChange={(e) => setCustomUserId(e.target.value)}
                            className="w-full bg-slate-900 border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">First Name:</label>
                          <input
                            type="text"
                            value={customFirstName}
                            onChange={(e) => setCustomFirstName(e.target.value)}
                            className="w-full bg-slate-900 border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono text-slate-400 block mb-1">Last Name:</label>
                          <input
                            type="text"
                            value={customLastName}
                            onChange={(e) => setCustomLastName(e.target.value)}
                            className="w-full bg-slate-900 border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleInstantAuth}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-semibold shadow-md shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2 mt-2"
                      >
                        <Lock size={14} />
                        Authenticate & Validate HMAC Hash
                      </Button>
                    </div>
                  </div>
                )}
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

                <div className="w-full bg-slate-950 p-4 rounded-2xl font-mono text-[11px] text-cyan-300 text-left space-y-1.5 border border-cyan-500/20 max-h-[160px] overflow-y-auto">
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
                    <div className="text-xs font-bold text-emerald-300">Telegram Account Authenticated ✓</div>
                    <div className="text-[11px] text-slate-300 font-mono">
                      HMAC SHA-256 Validated via Next.js Server Route
                    </div>
                  </div>
                </div>

                {/* User Session Details */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                      {sessionResult?.user?.firstName ? sessionResult.user.firstName[0] : "T"}
                    </div>

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
                    Test Another Account
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
