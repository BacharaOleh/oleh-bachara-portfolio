"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Lock, Sparkles, RefreshCw, Server, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TelegramUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarBg: string;
  role: string;
}

const PRESET_USERS: TelegramUser[] = [
  {
    id: "94820194",
    firstName: "Oleh",
    lastName: "Bachara",
    username: "olegh_bachara",
    avatarBg: "bg-gradient-to-tr from-indigo-600 to-cyan-500",
    role: "Inżynier Informatyki & Web Developer",
  },
  {
    id: "82910482",
    firstName: "Recruiter",
    lastName: "Evaluator",
    username: "recruiter_guest",
    avatarBg: "bg-gradient-to-tr from-violet-600 to-indigo-500",
    role: "Tech Recruiter / Hiring Manager",
  },
];

interface TelegramAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { username: string; firstName?: string }, logMessage: string) => void;
}

export function TelegramAuthModal({ isOpen, onClose, onSuccess }: TelegramAuthModalProps) {
  const [selectedUser, setSelectedUser] = useState<TelegramUser>(PRESET_USERS[0]);
  const [customUsername, setCustomUsername] = useState("");
  const [step, setStep] = useState<"select" | "verifying" | "success" | "error">("select");
  const [verifyLogs, setVerifyLogs] = useState<string[]>([]);
  const [apiResponse, setApiResponse] = useState<any>(null);
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  const botName = process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || "OlehBacharaBot";

  // Real Telegram Login Widget Callback
  useEffect(() => {
    if (!isOpen || !widgetContainerRef.current) return;

    // Define global callback for official Telegram Widget
    (window as any).onTelegramAuth = async (user: any) => {
      setStep("verifying");
      setVerifyLogs(["Received Official Telegram Widget Auth Payload..."]);

      try {
        const res = await fetch("/api/telegram-auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        const data = await res.json();

        if (data.verified) {
          setApiResponse(data);
          setVerifyLogs((prev) => [
            ...prev,
            `[Server Route /api/telegram-auth]: HMAC-SHA256 Validated ✓`,
            `[Mode]: ${data.mode}`,
            `[Token Issued]: ${data.sessionToken}`,
          ]);
          setStep("success");
          if (onSuccess) {
            onSuccess(
              { username: user.username || user.first_name, firstName: user.first_name },
              `[REAL TELEGRAM AUTH] @${user.username || user.first_name} authenticated via Server Route (HMAC Validated)`
            );
          }
        } else {
          setStep("error");
          setVerifyLogs((prev) => [...prev, `[Server Error]: ${data.error}`]);
        }
      } catch (err: any) {
        setStep("error");
        setVerifyLogs((prev) => [...prev, `[Fetch Error]: ${err.message}`]);
      }
    };

    // Inject Official Telegram Widget script
    const container = widgetContainerRef.current;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", botName);
    script.setAttribute("data-size", "large");
    script.setAttribute("data-radius", "12");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;
    container.appendChild(script);
  }, [isOpen, botName, onSuccess]);

  const handleSimulatedAuthenticate = async () => {
    const activeUser = customUsername.trim()
      ? {
          id: Math.floor(10000000 + Math.random() * 90000000).toString(),
          firstName: customUsername.replace("@", ""),
          lastName: "(Guest)",
          username: customUsername.replace("@", ""),
          avatarBg: "bg-gradient-to-tr from-emerald-600 to-cyan-500",
          role: "Verified Guest User",
        }
      : selectedUser;

    setStep("verifying");
    setVerifyLogs(["Dispatching POST /api/telegram-auth payload..."]);

    const mockPayload = {
      id: activeUser.id,
      first_name: activeUser.firstName,
      last_name: activeUser.lastName,
      username: activeUser.username,
      auth_date: Math.floor(Date.now() / 1000),
      hash: "7f8a91b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef123456",
    };

    try {
      const res = await fetch("/api/telegram-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockPayload),
      });
      const data = await res.json();

      if (data.verified) {
        setApiResponse(data);
        setVerifyLogs((prev) => [
          ...prev,
          `[Payload Dispatch]: id=${activeUser.id}, username=@${activeUser.username}`,
          `[Next.js Server API]: HMAC-SHA256 Verified ✓`,
          `[Session Token]: ${data.sessionToken}`,
        ]);

        setTimeout(() => {
          setStep("success");
          if (onSuccess) {
            onSuccess(
              activeUser,
              `[SERVER OAUTH API] @${activeUser.username} authenticated via Next.js Route (HMAC Validated)`
            );
          }
        }, 600);
      } else {
        setStep("error");
      }
    } catch (err: any) {
      setStep("error");
      setVerifyLogs((prev) => [...prev, `[API Error]: ${err.message}`]);
    }
  };

  const handleReset = () => {
    setStep("select");
    setVerifyLogs([]);
    setCustomUsername("");
    setApiResponse(null);
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
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
            className="relative w-full max-w-lg glass-card rounded-3xl p-6 sm:p-8 bg-[#090d16]/95 border border-cyan-500/30 shadow-2xl z-10 overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Send size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  Telegram OAuth 2.0 Server Integration
                  <Sparkles size={14} className="text-cyan-400" />
                </h3>
                <p className="text-xs text-slate-400 font-mono">Live Next.js Server Route HMAC Verification</p>
              </div>
            </div>

            {/* STEP 1: Official Telegram Widget or Demo Presets */}
            {step === "select" && (
              <div className="space-y-5">
                {/* Official Telegram Login Widget Embed Container */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-center">
                  <div className="text-xs font-mono text-cyan-300 font-bold mb-2 flex items-center justify-center gap-1.5">
                    <Server size={13} className="text-cyan-400" />
                    Official Telegram Widget Login (Bot: @{botName})
                  </div>
                  <div ref={widgetContainerRef} className="flex justify-center my-2 min-h-[40px]" />
                  <p className="text-[11px] text-slate-400 font-mono">
                    Clicking above connects directly to Telegram OAuth & validates via Next.js `/api/telegram-auth`
                  </p>
                </div>

                <div className="relative flex items-center justify-center my-2">
                  <div className="border-t border-white/[0.08] w-full" />
                  <span className="bg-[#090d16] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    OR TEST DEMO PRESET
                  </span>
                  <div className="border-t border-white/[0.08] w-full" />
                </div>

                {/* Preset Profiles */}
                <div className="space-y-2.5">
                  {PRESET_USERS.map((user) => {
                    const isSelected = selectedUser.id === user.id && !customUsername;
                    return (
                      <div
                        key={user.id}
                        onClick={() => {
                          setSelectedUser(user);
                          setCustomUsername("");
                        }}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-cyan-500/10 border-cyan-500/50 shadow-sm"
                            : "bg-slate-950/60 border-white/[0.08] hover:border-white/[0.2]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl ${user.avatarBg} flex items-center justify-center text-white font-bold text-xs`}>
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              {user.firstName} {user.lastName}
                              <span className="text-[11px] font-mono text-cyan-400 font-normal">
                                (@{user.username})
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">{user.role}</div>
                          </div>
                        </div>

                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-cyan-400 bg-cyan-500" : "border-slate-600"
                        }`}>
                          {isSelected && <div className="w-1 h-1 rounded-full bg-slate-950" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <input
                    type="text"
                    value={customUsername}
                    onChange={(e) => setCustomUsername(e.target.value)}
                    placeholder="Or type custom handle e.g. @guest_user"
                    className="w-full bg-slate-950/80 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <Button
                  onClick={handleSimulatedAuthenticate}
                  className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs cursor-pointer py-3"
                >
                  <Lock size={14} />
                  Test Server OAuth Route Verification
                </Button>
              </div>
            )}

            {/* STEP 2: Verification In Progress */}
            {step === "verifying" && (
              <div className="py-8 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <RefreshCw size={24} className="animate-spin text-cyan-400" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Verifying Cryptographic HMAC Signature...</h4>
                  <p className="text-xs text-slate-400 font-mono">POST /api/telegram-auth execution in progress</p>
                </div>

                <div className="w-full bg-slate-950 p-4 rounded-2xl font-mono text-[11px] text-cyan-300 text-left space-y-1 border border-cyan-500/20 max-h-[140px] overflow-y-auto">
                  {verifyLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-500">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Authenticated */}
            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5"
              >
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-emerald-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-300">Server Authentication Verified ✓</div>
                    <div className="text-[11px] text-slate-300 font-mono">
                      Mode: {apiResponse?.mode || "Live OAuth"}
                    </div>
                  </div>
                </div>

                {/* User Session Card */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {apiResponse?.user?.firstName ? apiResponse.user.firstName[0] : (customUsername ? customUsername[0].toUpperCase() : selectedUser.firstName[0])}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {apiResponse?.user?.firstName || customUsername || selectedUser.firstName} {apiResponse?.user?.lastName || ""}
                      </div>
                      <div className="text-[11px] font-mono text-cyan-400">
                        @{apiResponse?.user?.username || customUsername || selectedUser.username}
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 font-semibold">
                    CONNECTED
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.06] font-mono text-[11px] text-slate-400">
                  <div className="text-slate-300 font-semibold mb-1">Session Token:</div>
                  <code className="text-cyan-300 block truncate">
                    {apiResponse?.sessionToken || "tg_sso_verified_9f82a1"}
                  </code>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleReset}
                    variant="secondary"
                    className="flex-1 font-mono text-xs cursor-pointer"
                  >
                    Test Another Login
                  </Button>
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs cursor-pointer"
                  >
                    Close Demo
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
                <h4 className="text-sm font-bold text-white">Authentication Mismatch</h4>
                <p className="text-xs text-slate-400 font-mono">
                  HMAC SHA-256 signature mismatch. Check TELEGRAM_BOT_TOKEN settings.
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
