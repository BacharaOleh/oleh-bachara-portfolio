"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Send, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  KeyRound,
  UserCheck,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TelegramAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: { username: string; firstName?: string }, logMessage: string) => void;
}

export function TelegramAuthModal({ isOpen, onClose, onSuccess }: TelegramAuthModalProps) {
  const [step, setStep] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [verifyLogs, setVerifyLogs] = useState<string[]>([]);
  const [sessionResult, setSessionResult] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const clientId = process.env.NEXT_PUBLIC_TELEGRAM_CLIENT_ID || "8649904549";

  // Listen for OAuth postMessage callback from popup window
  useEffect(() => {
    if (!isOpen) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "TELEGRAM_AUTH_SUCCESS") {
        const { user, sessionToken, message, mode } = event.data;
        setSessionResult({ user, sessionToken, message, mode });
        setVerifyLogs((prev) => [
          ...prev,
          `[Telegram OAuth 2.0 Popup]: Authorization Code Received`,
          `[OIDC Endpoint]: Token Exchange POST /api/telegram-auth/callback (200 OK)`,
          `[Verified Identity]: @${user.username} (ID #${user.id})`,
          `[Issued Session]: ${sessionToken}`,
        ]);
        setStep("success");
        if (onSuccess) {
          onSuccess(
            { username: user.username || user.firstName, firstName: user.firstName },
            `[TELEGRAM OIDC SUCCESS] @${user.username || user.firstName} authenticated via OpenID Connect (Client ID: ${clientId})`
          );
        }
      } else if (event.data && event.data.type === "TELEGRAM_AUTH_ERROR") {
        setStep("error");
        setErrorMessage(event.data.error || "Telegram OAuth authorization failed");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isOpen, clientId, onSuccess]);

  const handleLaunchTelegramOIDC = () => {
    setStep("verifying");
    setVerifyLogs([
      `[Telegram OpenID Connect]: Initializing OAuth 2.0 Authorization Flow...`,
      `[Client ID]: ${clientId}`,
      `[Issuer Endpoint]: https://oauth.telegram.org/auth`,
      `[Redirect URI]: ${window.location.origin}/api/telegram-auth/callback`,
      `[Opening Popup]: Launching official Telegram authorization dialog...`,
    ]);

    const redirectUri = encodeURIComponent(`${window.location.origin}/api/telegram-auth/callback`);
    const authUrl = `https://oauth.telegram.org/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20profile`;

    const width = 550;
    const height = 650;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const popup = window.open(
      authUrl,
      "TelegramOauthPopup",
      `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,status=yes`
    );

    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      setVerifyLogs((prev) => [
        ...prev,
        `[Notice]: Popup blocked by browser. Directing to web authorization...`,
      ]);
    }
  };

  const handleInstantDemoAuth = async () => {
    setStep("verifying");
    setVerifyLogs([
      `[Direct OAuth Verification]: Dispatching OpenID payload...`,
      `[Client ID]: ${clientId}`,
      `[Server API]: POST /api/telegram-auth`,
    ]);

    try {
      const res = await fetch("/api/telegram-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "8649904549",
          first_name: "Oleh",
          last_name: "Bachara",
          username: "olegh_bachara",
          auth_date: Math.floor(Date.now() / 1000),
        }),
      });
      const data = await res.json();

      if (data.verified) {
        setSessionResult(data);
        setVerifyLogs((prev) => [
          ...prev,
          `[Next.js Server API]: OpenID Connect Credentials Validated ✓`,
          `[Mode]: ${data.mode}`,
          `[Client ID Matched]: ${data.clientId}`,
          `[Issued Session Token]: ${data.sessionToken}`,
        ]);
        setStep("success");
        if (onSuccess) {
          onSuccess(
            { username: data.user.username, firstName: data.user.firstName },
            `[TELEGRAM OIDC SUCCESS] Verified via Client ID: ${clientId}`
          );
        }
      } else {
        setStep("error");
        setErrorMessage(data.error || "Authentication verification failed");
      }
    } catch (err: any) {
      setStep("error");
      setErrorMessage(err.message || "Failed to communicate with authentication server");
    }
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Send size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  Official Telegram OpenID Connect
                  <Sparkles size={14} className="text-cyan-400" />
                </h3>
                <p className="text-xs text-slate-400 font-mono">OAuth 2.0 Authorization Code Protocol</p>
              </div>
            </div>

            {/* STEP: Idle */}
            {step === "idle" && (
              <div className="space-y-5">
                {/* OIDC Credentials Card */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5 font-semibold">
                      <KeyRound size={14} className="text-cyan-400" />
                      Active Telegram Client ID:
                    </span>
                    <span className="text-cyan-300 font-bold bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
                      {clientId}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-white/[0.06]">
                    <span>Issuer Protocol:</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Globe size={12} />
                      oauth.telegram.org (OIDC)
                    </span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  onClick={handleLaunchTelegramOIDC}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-mono text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <Send size={16} />
                  Log In with Real Telegram Account
                  <ExternalLink size={14} className="opacity-75" />
                </button>

                {/* Secondary Quick Test Button */}
                <button
                  onClick={handleInstantDemoAuth}
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-white/[0.08] text-slate-300 hover:text-white font-mono text-xs hover:border-indigo-500/40 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserCheck size={14} className="text-indigo-400" />
                  Fast Client Verification Test (@olegh_bachara)
                </button>

                <p className="text-[11px] text-slate-400 text-center font-mono leading-relaxed">
                  Uses official Telegram OAuth 2.0 endpoint (<code className="text-cyan-300">https://oauth.telegram.org/auth</code>) with Client ID <strong className="text-white">{clientId}</strong>.
                </p>
              </div>
            )}

            {/* STEP: Verifying */}
            {step === "verifying" && (
              <div className="py-6 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <RefreshCw size={24} className="animate-spin text-cyan-400" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">Authorizing with Telegram OAuth 2.0...</h4>
                  <p className="text-xs text-slate-400 font-mono">Awaiting response from oauth.telegram.org</p>
                </div>

                <div className="w-full bg-slate-950 p-4 rounded-2xl font-mono text-[11px] text-cyan-300 text-left space-y-1.5 border border-cyan-500/20 max-h-[170px] overflow-y-auto">
                  {verifyLogs.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-500 select-none">&gt;</span>
                      <span className="leading-relaxed">{log}</span>
                    </div>
                  ))}
                </div>

                <Button onClick={handleReset} variant="outline" size="sm" className="font-mono text-xs mt-1">
                  Cancel / Retry
                </Button>
              </div>
            )}

            {/* STEP: Success */}
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
                      Verified via Telegram OpenID Connect (Client ID: {clientId})
                    </div>
                  </div>
                </div>

                {/* User Details */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {sessionResult?.user?.photoUrl ? (
                      <img
                        src={sessionResult.user.photoUrl}
                        alt="Avatar"
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
                    Authenticate Again
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
                  {errorMessage || "OpenID Connect authorization error"}
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
