"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Radio, 
  Building2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeshVisualizer } from "@/components/MeshVisualizer";
import type { Lang } from "@/data/portfolio-data";

const COPY = {
  en: {
    back: "Back to Portfolio",
    eyebrow: "⚡ Live Topology Simulator",
    title: "How an Industrial Mesh Network Works",
    subtitle:
      "Instead of all machines relying on a single fragile Wi-Fi router, each device connects directly to its neighbors. If a node fails, data automatically reroutes in milliseconds with zero downtime.",
    recruiterTitle: "Executive Summary (For Recruiters & Non-Engineers)",
    recruiterSubtitle: "Why Roman built this and how it creates immediate business value:",
    pillars: [
      {
        icon: Radio,
        title: "The Relay Concept (No Dead Zones)",
        body: "Instead of 50 machines struggling to connect to a single Wi-Fi router through reinforced concrete and steel walls, each machine talks directly to its closest neighbor. Every device acts as a signal relay, naturally blanketing the entire plant.",
      },
      {
        icon: ShieldCheck,
        title: "Dynamic Self-Healing (Zero Single Point of Failure)",
        body: "In a standard office setup, if the router crashes, everything stops. In our mesh, if a machine is unplugged or obstructed, packets automatically discover an alternative detour in under 10 milliseconds. Production never halts.",
      },
      {
        icon: Building2,
        title: "High ROI & Zero Cabling Cost",
        body: "Eliminates tens of thousands of PLN in expensive industrial Ethernet cabling, outdoor repeaters, and IT overhead. Devices form their own private network instantly upon power-up without Wi-Fi passwords.",
      },
    ],
    comparisonTitle: "Traditional Factory Wi-Fi vs. Roman's ESP-NOW Mesh",
    comparisonHeaders: ["Criteria", "Traditional Industrial Wi-Fi", "ESP-NOW Industrial Mesh"],
    comparisonRows: [
      {
        feature: "Central Point of Failure",
        traditional: "High: If the central AP drops, all shop-floor telemetry halts.",
        mesh: "Zero: Distributed P2P with dynamic multi-hop rerouting.",
      },
      {
        feature: "Factory Obstacles (Metal & Concrete)",
        traditional: "Severe packet loss and blind spots behind heavy machinery.",
        mesh: "Packets simply hop around physical obstacles through neighboring nodes.",
      },
      {
        feature: "Packet Latency",
        traditional: "50 – 250 ms with high jitter and TCP retransmission delay.",
        mesh: "Sub-10 ms deterministic delivery (Layer 2 MAC action frames).",
      },
      {
        feature: "Infrastructure Cost (CAPEX)",
        traditional: "High: Enterprise access points, switches, cabling, IT licenses.",
        mesh: "Low: Built natively into low-cost ESP32-C6 microcontrollers.",
      },
      {
        feature: "Setup Complexity",
        traditional: "SSID provisioning, certificate management, IT firewalls.",
        mesh: "Pre-paired hardware MAC routing; runs immediately on boot.",
      },
    ],
    techTitle: "Technical Architecture Under the Hood (For CTOs & Tech Leads)",
    techSpecs: [
      {
        label: "Hardware Platform",
        value: "Espressif ESP32-C6 (32-bit RISC-V @ 160MHz, IEEE 802.15.4, 2.4GHz Wi-Fi 6)",
      },
      {
        label: "Wireless Protocol",
        value: "ESP-NOW (Connectionless Layer 2 MAC action frames, no handshake latency, ~250B payload)",
      },
      {
        label: "Industrial Bus Bridge",
        value: "RS485 half-duplex industrial transceivers + Wiegand 26/34-bit RFID reader decoding",
      },
      {
        label: "Edge Gateway & Buffering",
        value: "Raspberry Pi 4 running local SQLite/FastAPI caching and bi-directional cloud dispatch",
      },
    ],
    caseStudyCtaTitle: "Explore the Full Engineering Case Study",
    caseStudyCtaBody:
      "Deep dive into the architecture, schematic diagrams, FreeRTOS queue management, and test bench metrics for this system.",
    caseStudyBtn: "Read Mesh Case Study",
    contactBtn: "Discuss IoT Architecture with Roman",
  },
  pl: {
    back: "Powrót do Portfolio",
    eyebrow: "⚡ Wizualny Symulator Topologii",
    title: "Jak Działa Przemysłowa Sieć Kratowa (Mesh)",
    subtitle:
      "Zamiast łączyć maszyny z jednym podatnym na awarie routerem Wi-Fi, każde urządzenie komunikuje się bezpośrednio z sąsiadem. W razie awarii węzła sieć automatycznie samonaprawia trasę w ułamku sekundy.",
    recruiterTitle: "Podsumowanie dla Rekeruterów i Menedżerów (Plain English)",
    recruiterSubtitle: "Dlaczego Roman stworzył to rozwiązanie i jaką wartość biznesową przynosi fabryce:",
    pillars: [
      {
        icon: Radio,
        title: "Zasada Przekazywania (Brak Martwych Stref)",
        body: "Zamiast 50 maszyn próbujących połączyć się z jednym odległym routerem przez grube ściany ze stali i żelbetu, każda maszyna rozmawia bezpośrednio ze swoim najbliższym sąsiadem. Każde urządzenie jest wzmacniaczem sygnału.",
      },
      {
        icon: ShieldCheck,
        title: "Dynamiczna Samonaprawa (Zero Przestojów)",
        body: "W typowym biurze awaria routera paraliżuje całą firmę. W naszej sieci kratowej, jeśli wózek widłowy uszkodzi maszynę lub odetnie zasilanie, pakiety natychmiast omijają przeszkodę alternatywną trasą w mniej niż 10 milisekund.",
      },
      {
        icon: Building2,
        title: "Wysoki Zwrot z Inwestycji (Zero Okablowania)",
        body: "Oszczędność dziesiątek tysięcy złotych na przemysłowym okablowaniu Ethernet i drogich punktach dostępowych. Urządzenia tworzą prywatną, bezpieczną sieć natychmiast po podłączeniu zasilania.",
      },
    ],
    comparisonTitle: "Tradycyjny Wi-Fi Fabryczny vs. Sieć Mesh ESP-NOW Romana",
    comparisonHeaders: ["Kryterium", "Tradycyjny Wi-Fi Przemysłowy", "Przemysłowy Mesh ESP-NOW"],
    comparisonRows: [
      {
        feature: "Pojedynczy Punkt Awarii (SPOF)",
        traditional: "Wysoki: Padnięcie routera zatrzymuje telemetrię w całym zakładzie.",
        mesh: "Zero: Zdecentralizowany P2P z automatycznym routingiem awaryjnym.",
      },
      {
        feature: "Przeszkody Fabryczne (Stal i Beton)",
        traditional: "Częste gubienie pakietów i martwe strefy za maszynami.",
        mesh: "Pakiety omijają przeszkody przeskakując przez sąsiednie węzły.",
      },
      {
        feature: "Opóźnienia Transmisji (Latency)",
        traditional: "50 – 250 ms z dużym jitterem i retransmisjami TCP.",
        mesh: "Poniżej 10 ms (ramki Layer 2 MAC bez handshake'u nawiązywania sesji).",
      },
      {
        feature: "Koszt Infrastruktury (CAPEX)",
        traditional: "Wysoki: Komercyjne AP Cisco/Siemens, switche, okablowanie.",
        mesh: "Niski: Wbudowane bezpośrednio w mikrokontroler ESP32-C6 za ułamek ceny.",
      },
      {
        feature: "Wdrożenie",
        traditional: "Zarządzanie SSID, certyfikaty, konfiguracja firewalli IT.",
        mesh: "Sprzętowo sparowane adresy MAC; działa natychmiast po włączeniu.",
      },
    ],
    techTitle: "Szczegóły Architektury Pod Maską (Dla CTO i Architektów)",
    techSpecs: [
      {
        label: "Platforma Sprzętowa",
        value: "Espressif ESP32-C6 (32-bit RISC-V @ 160MHz, IEEE 802.15.4, 2.4GHz Wi-Fi 6)",
      },
      {
        label: "Protokół Bezprzewodowy",
        value: "ESP-NOW (Bezpołączeniowe ramki akcji Layer 2 MAC, ~250B ładunku, brak opóźnień handshake)",
      },
      {
        label: "Mostki Magistral Przemysłowych",
        value: "Transceivery RS485 half-duplex + obsługa protokołu RFID Wiegand 26/34-bit",
      },
      {
        label: "Bramka Brzegowa i Buforowanie",
        value: "Raspberry Pi 4 z lokalną bazą SQLite/FastAPI i asynchronicznym wysyłaniem do MES",
      },
    ],
    caseStudyCtaTitle: "Zobacz Pełne Studium Przypadku",
    caseStudyCtaBody:
      "Poznaj pełną architekturę, schematy połączeń, kolejkowanie FreeRTOS oraz wyniki testów obciążeniowych w warunkach przemysłowych.",
    caseStudyBtn: "Przejdź do Case Study Mesh",
    contactBtn: "Omów Architekturę IoT z Romanem",
  },
} as const;

export default function MeshExplainerPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = COPY[lang];

  return (
    <div className="site-shell min-h-screen w-full max-w-full overflow-x-hidden overflow-x-clip">
      <div className="site-grain" aria-hidden="true" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.09] bg-[#11100e]/85 backdrop-blur-xl">
        <div className="container-custom flex min-h-16 sm:min-h-20 items-center justify-between py-3 sm:py-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 min-h-[44px] font-mono text-[10px] uppercase tracking-[0.15em] text-[#b9b4aa] transition-colors hover:text-[#eeece5]"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
            {t.back}
          </Link>

          {/* Language Toggle */}
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em]">
            {(["en", "pl"] as Lang[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLang(item)}
                className={`min-h-[36px] min-w-[36px] px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  lang === item
                    ? "bg-[#eeece5] text-[#11100e] font-bold"
                    : "text-[#777168] hover:text-[#eeece5]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom relative w-full max-w-full min-w-0 overflow-x-hidden overflow-x-clip pt-6 sm:pt-10 pb-[calc(4rem+env(safe-area-inset-bottom,0px))] space-y-12 sm:space-y-16">
        {/* Page Hero Header + Direct Interactive Visualization (Above the fold) */}
        <section className="space-y-5">
          <div className="space-y-3 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c4a160]/10 border border-[#c4a160]/30 font-mono text-xs text-[#c4a160]">
              <Zap size={13} className="fill-[#c4a160]" />
              <span>{t.eyebrow}</span>
            </div>
            <h1 className="display-lg sm:display-xl text-[#eeece5] tracking-tight">{t.title}</h1>
            <p className="editorial-copy text-base sm:text-lg text-[#b9b4aa] leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Interactive Visualizer immediately visible without scrolling */}
          <div className="pt-2">
            <MeshVisualizer lang={lang} />
          </div>
        </section>

        {/* SECTION: Recruiter / Plain English Cards */}
        <section className="space-y-8 border-t border-white/[0.1] pt-12">
          <div>
            <span className="kicker">{t.recruiterTitle}</span>
            <h2 className="display-md mt-2 text-[#eeece5]">{t.recruiterSubtitle}</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#161513] border border-white/[0.08] hover:border-[#c4a160]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#c4a160]/10 border border-[#c4a160]/20 flex items-center justify-center text-[#c4a160] mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#eeece5] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#a39c91] leading-relaxed">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION: Comparison Table */}
        <section className="space-y-8 border-t border-white/[0.1] pt-12">
          <div>
            <span className="kicker">Architectural Comparison</span>
            <h2 className="display-md mt-2 text-[#eeece5]">{t.comparisonTitle}</h2>
          </div>

          {/* Mobile Comparison Cards (< md) */}
          <div className="block md:hidden space-y-3.5">
            {t.comparisonRows.map((row, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-white/[0.08] bg-[#141311] space-y-2.5"
              >
                <div className="font-mono text-xs font-bold text-[#eeece5] border-b border-white/[0.06] pb-2">
                  {row.feature}
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-500/20">
                    <span className="text-[10px] uppercase tracking-wider text-rose-400 block mb-1 font-semibold">
                      ✕ {t.comparisonHeaders[1]}
                    </span>
                    <p className="text-[#a39c91] leading-relaxed">{row.traditional}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 block mb-1 font-semibold">
                      ✓ {t.comparisonHeaders[2]}
                    </span>
                    <p className="text-[#eeece5] font-medium leading-relaxed">{row.mesh}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Comparison Table (md+) */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#141311]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#181714] border-b border-white/[0.08] font-mono text-xs text-[#a39c91] uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-5">{t.comparisonHeaders[0]}</th>
                  <th className="py-4 px-5 text-rose-400">{t.comparisonHeaders[1]}</th>
                  <th className="py-4 px-5 text-emerald-400">{t.comparisonHeaders[2]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] font-mono text-xs">
                {t.comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-bold text-[#eeece5] whitespace-nowrap">
                      {row.feature}
                    </td>
                    <td className="py-4 px-5 text-[#a39c91] leading-relaxed">
                      {row.traditional}
                    </td>
                    <td className="py-4 px-5 text-[#eeece5] font-medium leading-relaxed bg-emerald-950/10">
                      {row.mesh}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION: Deep-Dive Technical Specifications */}
        <section className="space-y-8 border-t border-white/[0.1] pt-12">
          <div>
            <span className="kicker text-[#c4a160]">Under the Hood</span>
            <h2 className="display-md mt-2 text-[#eeece5]">{t.techTitle}</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.techSpecs.map((spec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#161513] border border-white/[0.08] space-y-1.5"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-[#c4a160]">
                  {spec.label}
                </div>
                <div className="text-sm font-mono text-[#eeece5] leading-relaxed">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Case Study CTA Box */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1b1915] to-[#141311] border border-[#c4a160]/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#c4a160] font-bold">
              {t.caseStudyCtaTitle}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#eeece5]">
              Distributed Embedded Mesh & Edge IoT
            </h3>
            <p className="text-sm sm:text-base text-[#b9b4aa] leading-relaxed">
              {t.caseStudyCtaBody}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/projects/embedded-mesh-iot">
                <Button
                  size="lg"
                  className="w-full sm:w-auto justify-center group cursor-pointer bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold min-h-[46px]"
                >
                  <span>{t.caseStudyBtn}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto justify-center cursor-pointer border-white/[0.14] text-[#eeece5] hover:bg-white/[0.05] font-mono text-xs min-h-[46px]"
                >
                  <span>{t.contactBtn}</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
