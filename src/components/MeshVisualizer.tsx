"use client";

import { useState, useRef } from "react";
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertTriangle, 
  Zap, 
  Send, 
  Layers, 
  Activity 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lang } from "@/data/portfolio-data";

interface MeshVisualizerProps {
  lang: Lang;
}

type TopologyMode = "mesh" | "star";

interface MeshNode {
  id: string;
  nameEn: string;
  namePl: string;
  roleEn: string;
  rolePl: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  isGateway?: boolean;
  isRouter?: boolean; // for star mode
  isObstacleNear?: boolean;
}

const NODES: MeshNode[] = [
  {
    id: "gw",
    nameEn: "Edge Gateway",
    namePl: "Bramka Edge",
    roleEn: "Raspberry Pi / MES Server",
    rolePl: "Raspberry Pi / Serwer MES",
    x: 82,
    y: 46,
    isGateway: true,
  },
  {
    id: "cnc",
    nameEn: "CNC Machine #1",
    namePl: "Obrabiarka CNC #1",
    roleEn: "ESP32-C6 + Kinematics",
    rolePl: "ESP32-C6 + Kinematyka",
    x: 16,
    y: 22,
    isObstacleNear: true,
  },
  {
    id: "pack",
    nameEn: "Packaging Line",
    namePl: "Linia Pakująca",
    roleEn: "ESP32-C6 + OEE Sensors",
    rolePl: "ESP32-C6 + Czujniki OEE",
    x: 18,
    y: 72,
  },
  {
    id: "relay",
    nameEn: "Mesh Relay A",
    namePl: "Węzeł Pośredni A",
    roleEn: "ESP32-C6 Repeater",
    rolePl: "ESP32-C6 Wzmacniacz",
    x: 48,
    y: 30,
  },
  {
    id: "rfid",
    nameEn: "Access / RFID",
    namePl: "Kontrola / RFID",
    roleEn: "ESP32-C6 + Wiegand Reader",
    rolePl: "ESP32-C6 + Czytnik Wiegand",
    x: 50,
    y: 80,
  },
  {
    id: "sensor",
    nameEn: "Oven Telemetry",
    namePl: "Telemetria Pieca",
    roleEn: "ESP32-C6 + RS485 Bus",
    rolePl: "ESP32-C6 + Magistrala RS485",
    x: 76,
    y: 82,
  },
];

// Star topology central router
const STAR_ROUTER: MeshNode = {
  id: "router",
  nameEn: "Central Wi-Fi Router",
  namePl: "Centralny Router Wi-Fi",
  roleEn: "Commercial 2.4/5GHz AP",
  rolePl: "Komercyjny AP 2.4/5GHz",
  x: 50,
  y: 54,
  isRouter: true,
};

export function MeshVisualizer({ lang }: MeshVisualizerProps) {
  const [mode, setMode] = useState<TopologyMode>("mesh");
  const [disabledNodes, setDisabledNodes] = useState<Set<string>>(new Set());
  const [healingLog, setHealingLog] = useState<string | null>(null);
  const [starRouterCrashed, setStarRouterCrashed] = useState(false);
  const pingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle node failure
  const toggleNodeStatus = (nodeId: string) => {
    if (nodeId === "gw") return; // Keep gateway alive

    setDisabledNodes((prev) => {
      const next = new Set(prev);
      const wasDisabled = next.has(nodeId);
      if (wasDisabled) {
        next.delete(nodeId);
        setHealingLog(
          lang === "pl"
            ? `✓ Węzeł przywrócony. Sieć automatycznie zintegrowała ścieżkę.`
            : `✓ Node restored. Mesh dynamically incorporated link.`
        );
      } else {
        next.add(nodeId);
        const reroutedVia = nodeId === "relay" ? "Access/RFID Node" : "Mesh Relay A";
        setHealingLog(
          lang === "pl"
            ? `⚡ Autonaprawa: Wykryto przerwę! Ruch przekierowany przez ${reroutedVia} w 6.2 ms (0 utraconych pakietów).`
            : `⚡ Dynamic Self-Healing: Obstruction bypassed via ${reroutedVia} in 6.2 ms (0 packets lost).`
        );
      }
      return next;
    });
  };

  // Dispatch ping packet
  const handleSendPing = () => {
    if (pingTimeoutRef.current) clearTimeout(pingTimeoutRef.current);

    if (mode === "star") {
      if (starRouterCrashed) {
        setHealingLog(
          lang === "pl"
            ? `❌ Błąd transmisji: Centralny router nie odpowiada. Cała linia zatrzymana!`
            : `❌ Packet dropped: Central AP unreachable. Entire plant telemetry halted!`
        );
        return;
      }
      setHealingLog(
        lang === "pl"
          ? `📡 Pakiet przesłany przez Router Wi-Fi (opóźnienie: 48 ms, wahania jitter)`
          : `📡 Packet sent via Central Wi-Fi AP (latency: 48 ms, subject to jitter)`
      );
    } else {
      const relayBroken = disabledNodes.has("relay");
      const pathText = relayBroken
        ? (lang === "pl" ? "CNC → Linia Pakująca → RFID → Bramka [8.1 ms]" : "CNC → Packaging → RFID → Gateway [8.1 ms]")
        : (lang === "pl" ? "CNC → Węzeł Pośredni A → Bramka [4.3 ms]" : "CNC → Relay Node A → Gateway [4.3 ms]");

      setHealingLog(
        lang === "pl"
          ? `📡 Pakiet ESP-NOW dostarczony: ${pathText}`
          : `📡 ESP-NOW packet delivered: ${pathText}`
      );
    }
  };

  // Determine active mesh links
  const isRelayDead = disabledNodes.has("relay");
  const isCncDead = disabledNodes.has("cnc");
  const isPackDead = disabledNodes.has("pack");
  const isRfidDead = disabledNodes.has("rfid");
  const isSensorDead = disabledNodes.has("sensor");

  return (
    <div className="rounded-2xl border border-white/[0.12] bg-[#141311] overflow-hidden shadow-2xl">
      {/* Control Topbar */}
      <div className="border-b border-white/[0.08] bg-[#181714] p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="font-display text-base sm:text-lg font-bold text-[#eeece5]">
              {lang === "pl" ? "Interaktywny Symulator Topologii Sieci" : "Interactive Network Topology Simulator"}
            </h3>
          </div>
          <p className="text-[11px] sm:text-xs text-[#a39c91] font-mono mt-0.5">
            {lang === "pl"
              ? "Kliknij dowolny węzeł, aby zasymulować awarię i zobaczyć samonaprawę (Self-Healing)"
              : "Click any node to simulate machine failure and watch real-time self-healing"}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="bg-[#11100e] p-1 rounded-xl border border-white/[0.08] grid grid-cols-1 min-[420px]:grid-cols-2 sm:flex sm:items-center w-full sm:w-auto gap-1">
            <button
              type="button"
              onClick={() => {
                setMode("mesh");
                setHealingLog(null);
              }}
              className={`min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === "mesh"
                  ? "bg-[#c4a160] text-[#11100e] shadow"
                  : "text-[#a39c91] hover:text-[#eeece5]"
              }`}
            >
              <Zap size={13} className="shrink-0" />
              <span>{lang === "pl" ? "Mesh ESP-NOW" : "ESP-NOW Mesh"}</span>
              <span className="hidden min-[480px]:inline text-[10px] opacity-75 font-normal">
                {lang === "pl" ? "(Autonomiczny)" : "(Autonomous)"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("star");
                setHealingLog(null);
              }}
              className={`min-h-[36px] px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === "star"
                  ? "bg-rose-500 text-white shadow"
                  : "text-[#a39c91] hover:text-[#eeece5]"
              }`}
            >
              <Wifi size={13} className="shrink-0" />
              <span>{lang === "pl" ? "Wi-Fi (Router)" : "Traditional Wi-Fi"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative w-full h-[360px] sm:h-[420px] bg-gradient-to-b from-[#131210] to-[#0f0e0c] overflow-hidden select-none p-3 sm:p-4 touch-pan-y">
        {/* Background Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Factory Obstacle / Metal Shield Representation */}
        <div 
          className="absolute left-[33%] top-[10%] w-[3.5%] h-[40%] rounded-md bg-white/[0.03] border border-white/[0.08] flex items-center justify-center pointer-events-none"
          title="Factory Reinforced Steel Wall"
        >
          <span className="font-mono text-[8.5px] uppercase tracking-widest text-[#777168] -rotate-90 whitespace-nowrap">
            {lang === "pl" ? "Ściana Żelbet / Stal" : "Steel Shield / Wall"}
          </span>
        </div>

        {/* SVG Network Links & Signals */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          {mode === "mesh" ? (
            /* MESH NETWORK TOPOLOGY LINKS */
            <g>
              {/* CNC <-> Relay A */}
              {!isCncDead && !isRelayDead && (
                <line
                  x1="16%" y1="22%" x2="48%" y2="30%"
                  stroke="#c4a160" strokeWidth="2" strokeDasharray="5,4"
                  className="animate-pulse" opacity="0.8"
                />
              )}

              {/* CNC <-> Packaging Line (Direct Backup Path) */}
              {!isCncDead && !isPackDead && (
                <line
                  x1="16%" y1="22%" x2="18%" y2="72%"
                  stroke={isRelayDead ? "#34d399" : "#c4a160"}
                  strokeWidth={isRelayDead ? "3" : "1.5"}
                  strokeDasharray={isRelayDead ? "none" : "4,4"}
                  opacity={isRelayDead ? "1" : "0.4"}
                />
              )}

              {/* Packaging <-> Relay A */}
              {!isPackDead && !isRelayDead && (
                <line
                  x1="18%" y1="72%" x2="48%" y2="30%"
                  stroke="#c4a160" strokeWidth="2" strokeDasharray="5,4"
                  opacity="0.7"
                />
              )}

              {/* Packaging <-> RFID */}
              {!isPackDead && !isRfidDead && (
                <line
                  x1="18%" y1="72%" x2="50%" y2="80%"
                  stroke={isRelayDead ? "#34d399" : "#c4a160"}
                  strokeWidth={isRelayDead ? "2.5" : "1.5"}
                  strokeDasharray={isRelayDead ? "none" : "4,4"}
                  opacity={isRelayDead ? "1" : "0.5"}
                />
              )}

              {/* Relay A <-> Gateway (Primary backbone) */}
              {!isRelayDead && (
                <line
                  x1="48%" y1="30%" x2="82%" y2="46%"
                  stroke="#c4a160" strokeWidth="2.5"
                  opacity="0.9"
                />
              )}

              {/* RFID <-> Gateway (Alternate backbone) */}
              {!isRfidDead && (
                <line
                  x1="50%" y1="80%" x2="82%" y2="46%"
                  stroke={isRelayDead ? "#34d399" : "#c4a160"}
                  strokeWidth={isRelayDead ? "3" : "2"}
                  opacity="0.8"
                />
              )}

              {/* RFID <-> Relay A (Cross interconnect) */}
              {!isRfidDead && !isRelayDead && (
                <line
                  x1="50%" y1="80%" x2="48%" y2="30%"
                  stroke="#c4a160" strokeWidth="1.5" strokeDasharray="3,3"
                  opacity="0.4"
                />
              )}

              {/* Oven Telemetry <-> RFID & Gateway */}
              {!isSensorDead && !isRfidDead && (
                <line
                  x1="76%" y1="82%" x2="50%" y2="80%"
                  stroke="#c4a160" strokeWidth="2" strokeDasharray="4,4"
                  opacity="0.7"
                />
              )}
              {!isSensorDead && (
                <line
                  x1="76%" y1="82%" x2="82%" y2="46%"
                  stroke="#c4a160" strokeWidth="2"
                  opacity="0.7"
                />
              )}

              {/* Broken connection indicator if Relay is dead */}
              {isRelayDead && !isCncDead && (
                <line
                  x1="16%" y1="22%" x2="48%" y2="30%"
                  stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,3"
                  opacity="0.5"
                />
              )}
            </g>
          ) : (
            /* TRADITIONAL STAR (WI-FI) TOPOLOGY */
            <g>
              {/* Star connections from central router */}
              {NODES.map((node) => {
                const isBlocked = node.isObstacleNear;
                const isDropped = starRouterCrashed || isBlocked;
                return (
                  <line
                    key={node.id}
                    x1="50%" y1="54%"
                    x2={`${node.x}%`} y2={`${node.y}%`}
                    stroke={isDropped ? "#f43f5e" : "#60a5fa"}
                    strokeWidth={isDropped ? "1.5" : "2"}
                    strokeDasharray={isDropped ? "4,4" : "none"}
                    opacity={isDropped ? "0.4" : "0.8"}
                  />
                );
              })}
            </g>
          )}
        </svg>

        {/* Render Star Router when in star mode */}
        {mode === "star" && (
          <div
            style={{ left: `${STAR_ROUTER.x}%`, top: `${STAR_ROUTER.y}%` }}
            onClick={() => setStarRouterCrashed((c) => !c)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
          >
            <div className={`p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all flex flex-col items-center ${
              starRouterCrashed
                ? "bg-rose-950/80 border-rose-500 shadow-lg shadow-rose-500/20"
                : "bg-blue-950/70 border-blue-400 hover:scale-105 shadow-lg shadow-blue-500/20"
            }`}>
              {starRouterCrashed ? (
                <WifiOff size={18} className="sm:w-6 sm:h-6 text-rose-400 animate-bounce" />
              ) : (
                <Wifi size={18} className="sm:w-6 sm:h-6 text-blue-400 animate-pulse" />
              )}
              <span className="font-mono text-[8.5px] sm:text-[10px] font-bold mt-0.5 sm:mt-1 text-white whitespace-nowrap">
                {starRouterCrashed
                  ? (lang === "pl" ? "ROUTER PADAŁ!" : "AP CRASHED!")
                  : STAR_ROUTER.nameEn}
              </span>
              <span className="font-mono text-[7px] sm:text-[8px] text-[#a39c91] hidden min-[380px]:inline">
                {starRouterCrashed
                  ? (lang === "pl" ? "Kliknij, by włączyć" : "Click to reboot")
                  : (lang === "pl" ? "Kliknij, by wyłączyć" : "Click to kill AP")}
              </span>
            </div>
          </div>
        )}

        {/* Render Physical Nodes */}
        {NODES.map((node) => {
          const isDead = disabledNodes.has(node.id);
          const isStarBlocked = mode === "star" && (node.isObstacleNear || starRouterCrashed);

          return (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => toggleNodeStatus(node.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group transition-transform ${
                node.isGateway ? "cursor-default" : "hover:scale-105 active:scale-95"
              }`}
            >
              {/* Node Card */}
              <div
                className={`p-1.5 sm:p-3 rounded-xl border transition-all flex items-center gap-1.5 sm:gap-2.5 max-w-[105px] sm:max-w-none shadow-md ${
                  node.isGateway
                    ? "bg-[#211d15] border-[#c4a160] shadow-md shadow-[#c4a160]/20 ring-1 ring-[#c4a160]/40"
                    : isDead || isStarBlocked
                    ? "bg-rose-950/80 border-rose-500/70 shadow-md shadow-rose-500/10 opacity-90"
                    : "bg-[#181714]/95 border-white/[0.14] hover:border-[#c4a160]/50"
                }`}
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    node.isGateway
                      ? "bg-[#c4a160]/20 text-[#c4a160]"
                      : isDead || isStarBlocked
                      ? "bg-rose-500/20 text-rose-400"
                      : "bg-white/[0.06] text-[#eeece5]"
                  }`}
                >
                  {node.isGateway ? (
                    <Layers size={14} className="sm:w-4 sm:h-4" />
                  ) : isDead || isStarBlocked ? (
                    <AlertTriangle size={13} className="sm:w-4 sm:h-4" />
                  ) : (
                    <Activity size={13} className="sm:w-4 sm:h-4" />
                  )}
                </div>

                <div className="min-w-0 pr-0.5">
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[9.5px] sm:text-xs font-bold text-[#eeece5] truncate">
                      {lang === "pl" ? node.namePl : node.nameEn}
                    </span>
                    {node.isGateway && (
                      <span className="px-1 py-0.2 rounded text-[7px] sm:text-[8px] font-mono font-bold bg-[#c4a160] text-[#11100e] shrink-0">
                        HOST
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[8px] sm:text-[9px] text-[#a39c91] truncate">
                    {isDead
                      ? (lang === "pl" ? "Awaria" : "Offline")
                      : isStarBlocked
                      ? (lang === "pl" ? "Brak Wi-Fi" : "Drop")
                      : <span className="hidden sm:inline">{lang === "pl" ? node.rolePl : node.roleEn}</span>}
                  </div>
                </div>
              </div>

              {/* Status Indicator Dot */}
              <span
                className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ring-2 ring-[#11100e] ${
                  node.isGateway
                    ? "bg-[#c4a160]"
                    : isDead || isStarBlocked
                    ? "bg-rose-500 animate-ping"
                    : "bg-emerald-400"
                }`}
              />
            </div>
          );
        })}

        {/* Real-Time Notification Pill */}
        {healingLog && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 z-30 max-w-md p-2.5 sm:p-3 rounded-xl bg-[#1c1a17]/95 border border-[#c4a160]/40 backdrop-blur-md shadow-xl text-[11px] sm:text-xs font-mono text-[#eeece5] flex items-center gap-2">
            <Zap size={14} className="text-[#c4a160] shrink-0 fill-[#c4a160]" />
            <span className="leading-snug">{healingLog}</span>
          </div>
        )}
      </div>

      {/* Interactive Controls & Telemetry Bar */}
      <div className="border-t border-white/[0.08] bg-[#161513] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              size="sm"
              onClick={handleSendPing}
              className="group cursor-pointer bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold text-xs min-h-[40px]"
            >
              <Send size={13} className="transition-transform group-hover:translate-x-0.5" />
              <span>{lang === "pl" ? "Wyślij Pakiet Telemetrii (Ping)" : "Send Telemetry Ping"}</span>
            </Button>

            {mode === "mesh" ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleNodeStatus("relay")}
                className={`cursor-pointer font-mono text-xs border-white/[0.14] text-[#eeece5] min-h-[40px] ${
                  isRelayDead ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400" : "hover:bg-white/[0.06]"
                }`}
              >
                <RefreshCw size={13} className={isRelayDead ? "animate-spin" : ""} />
                <span>
                  {isRelayDead
                    ? (lang === "pl" ? "Przywróć Węzeł A" : "Restore Relay Node A")
                    : (lang === "pl" ? "Symuluj Awarię Węzła A" : "Simulate Relay Failure")}
                </span>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setStarRouterCrashed((c) => !c)}
                className="cursor-pointer font-mono text-xs border-rose-500/40 text-rose-400 hover:bg-rose-500/10 min-h-[40px]"
              >
                <WifiOff size={13} />
                <span>
                  {starRouterCrashed
                    ? (lang === "pl" ? "Włącz Router Wi-Fi" : "Reboot Wi-Fi Router")
                    : (lang === "pl" ? "Symuluj Awarię Routera" : "Simulate Router Crash")}
                </span>
              </Button>
            )}
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-6 font-mono text-xs text-[#a39c91] pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06] w-full sm:w-auto">
            <div className="min-w-0">
              <div className="text-[10px] uppercase text-[#777168]">
                {lang === "pl" ? "Protokół" : "Protocol"}
              </div>
              <div className="font-bold text-[#eeece5] text-xs">
                {mode === "mesh" ? "ESP-NOW (P2P MAC)" : "TCP/IP 802.11ax"}
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase text-[#777168]">
                {lang === "pl" ? "Średnie Opóźnienie" : "Latency"}
              </div>
              <div className={`font-bold text-xs ${mode === "mesh" ? "text-emerald-400" : "text-amber-400"}`}>
                {mode === "mesh" ? "< 4.3 ms / hop" : "35 – 120 ms"}
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase text-[#777168]">
                {lang === "pl" ? "Dostępność" : "Resilience"}
              </div>
              <div className="font-bold text-[#c4a160] text-xs">
                {mode === "mesh" ? "99.2% (Self-Heal)" : "Single Point Fail"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
