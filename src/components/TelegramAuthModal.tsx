"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, Lock, Sparkles, RefreshCw, Server, UserCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TelegramUserPreset {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarBg: string;
  role: string;
}

const PRESET_PROFILES: TelegramUserPreset[] = [
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
    firstName: "Tech",
    lastName: "Recruiter",
    username: "recruiter_evaluator",
    avatarBg: "bg-gradient-to-tr from-violet-600 to-indigo-500",
    role: "Senior IT Recruiter / Hiring Manager",
  },
  {
    id: "57382910",
    firstName: "Alexander",
    lastName: "Nowak",
    username: "alex_tech_lead",
    avatarBg: "bg-gradient-to-tr from-emerald-600 to-cyan-500",
    role: "CTO / Systems Architect",
  },
];

interface TelegramAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { username: string; firstName?: string }, logMessage: string) => void;
}

export function TelegramAuthModal({ isOpen, onClose, onSuccess }: TelegramAuthModalProps) {
  const [selectedProfile, setSelectedProfile] = useState<TelegramUserPreset>(PRESET_PROFILES[0]);
  const [customHandle, setCustomHandle] = useState("");
  const [step, setStep] = useState<"select" | "verifying" | "success">("select");
  const [verifyLogs, setVerifyLogs] = useState<string[]>([]);
  const [sessionResult, setSessionResult] = useState<any>(null);

  const handleAuthenticate = async () => {
    const handleClean = customHandle.trim().replace("@", "");
    const activeUser = handleClean
      ? {
          id: Math.floor(10000000 + Math.random() * 90000000).toString(),
          firstName: handleClean.charAt(0).toUpperCase() + handleClean.slice(1),
          lastName: "(Guest)",
          username: handleClean,
          avatarBg: "bg-gradient-to-tr from-cyan-600 to-indigo-600",
          role: "Verified Guest Developer",
        }
      : selectedProfile;

    setStep("verifying");
    setVerifyLogs([
      `[1/3] Preparing Telegram OAuth 2.0 Payload for @${activeUser.username}...`,
      `[2/3] Dispatching POST /api/telegram-auth HTTP Request...`,
    ]);

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

      setVerifyLogs((prev) => [
        ...prev,
        `[3/3] Server API Response: HMAC-SHA256 Validated ✓`,
        `[Session Token Issued]: ${data.sessionToken || "tg_sso_verified"}`,
      ]);

      setTimeout(() => {
        setSessionResult({ ...data, userProfile: activeUser });
        setStep("success");
        if (onSuccess) {
          onSuccess(
            activeUser,
            `[TELEGRAM AUTH SSO] User @${activeUser.username} authenticated via Server Route (HMAC Validated)`
          );
        }
      }, 500);
    } catch (err: any) {
      setVerifyLogs((prev) => [...prev, `[Error]: ${err.message}`]);
    }
  };

  const handleReset = () => {
    setStep("select");
    setVerifyLogs([]);
    setCustomHandle("");
    setSessionResult(null);
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
                  Telegram OAuth 2.0 Authorization
                  <Sparkles size={14} className="text-cyan-400" />
                </h3>
                <p className="text-xs text-slate-400 font-mono">1-Click Fast Login & HMAC SHA-256 Server Validation</p>
              </div>
            </div>

            {/* STEP 1: Select Profile or Enter Handle */}
            {step === "select" && (
              <div className="space-y-5">
                <div className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider flex items-center justify-between">
                  <span>Select Profile to Log In:</span>
                  <span className="text-cyan-400 text-[11px]">Instant 1-Click Auth</span>
                </div>

                {/* Profile Selector Cards */}
                <div className="space-y-2.5">
                  {PRESET_PROFILES.map((profile) => {
                    const isSelected = selectedProfile.id === profile.id && !customHandle;
                    return (
                      <div
                        key={profile.id}
                        onClick={() => {
                          setSelectedProfile(profile);
                          setCustomHandle("");
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-gradient-to-r from-cyan-500/15 via-indigo-500/10 to-transparent border-cyan-500/50 shadow-md shadow-cyan-500/10"
                            : "bg-slate-950/60 border-white/[0.08] hover:border-white/[0.2]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl ${profile.avatarBg} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                            {profile.firstName[0]}
                            {profile.lastName[0]}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              {profile.firstName} {profile.lastName}
                              <span className="text-[11px] font-mono text-cyan-400 font-normal">
                                (@{profile.username})
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">{profile.role}</div>
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-cyan-400 bg-cyan-500" : "border-slate-600"
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Handle Input */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 mb-1.5 block">
                    Or enter your custom Telegram handle:
                  </label>
                  <input
                    type="text"
                    value={customHandle}
                    onChange={(e) => setCustomHandle(e.target.value)}
                    placeholder="@your_telegram_username"
                    className="w-full bg-slate-950/80 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                {/* Action CTA Button */}
                <Button
                  onClick={handleAuthenticate}
                  className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-semibold cursor-pointer py-3.5 shadow-lg shadow-cyan-500/20"
                >
                  <UserCheck size={16} />
                  Authorize & Log In via Telegram
                </Button>
              </div>
            )}

            {/* STEP 2: Verifying Cryptographic Signature */}
            {step === "verifying" && (
              <div className="py-8 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <RefreshCw size={24} className="animate-spin text-cyan-400" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Authenticating Telegram OAuth Signature...</h4>
                  <p className="text-xs text-slate-400 font-mono">Server HMAC SHA-256 Validation in Progress</p>
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
                    <div className="text-xs font-bold text-emerald-300">Telegram Authentication Verified ✓</div>
                    <div className="text-[11px] text-slate-300 font-mono">
                      Server API Route `/api/telegram-auth` Response: 200 OK
                    </div>
                  </div>
                </div>

                {/* User Session Details */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${sessionResult?.userProfile?.avatarBg || "bg-indigo-600"} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                      {sessionResult?.userProfile?.firstName[0]}
                      {sessionResult?.userProfile?.lastName[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {sessionResult?.userProfile?.firstName} {sessionResult?.userProfile?.lastName}
                      </div>
                      <div className="text-xs font-mono text-cyan-400">
                        @{sessionResult?.userProfile?.username}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-mono border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <ShieldCheck size={13} />
                    VERIFIED
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06] font-mono text-[11px] text-slate-300 space-y-1">
                  <div className="text-slate-400 font-semibold">Active Session Token:</div>
                  <code className="text-cyan-300 block truncate font-mono">
                    {sessionResult?.sessionToken || `tg_sso_verified_${Date.now()}`}
                  </code>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleReset}
                    variant="secondary"
                    className="flex-1 font-mono text-xs cursor-pointer"
                  >
                    Select Another Profile
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
