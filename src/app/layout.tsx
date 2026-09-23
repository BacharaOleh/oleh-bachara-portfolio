import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#11100e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nekorom.eu"),
  title: "Roman Deyneko — Lead Hardware, Embedded & Full-Stack Architect",
  description:
    "Portfolio of Roman Deyneko — CTO & Lead Architect across ESP32-C6 firmware, robotics CNC, ESP-NOW mesh, Raspberry Pi, and industrial MES platforms.",
  keywords: [
    "Hardware Engineer",
    "Embedded Systems",
    "ESP32-C6",
    "ESP-NOW Mesh",
    "Robotics",
    "CNC Machining",
    "MES Architecture",
    "Python FastAPI",
    "React 19",
    "Raspberry Pi",
    "Roman Deyneko",
    "Poland",
    "Przechlewo",
  ],
  authors: [{ name: "Roman Deyneko" }],
  creator: "Roman Deyneko",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Roman Deyneko — Lead Hardware, Embedded & Full-Stack Architect",
    description: "ESP32-C6 firmware, robotics CNC, ESP-NOW mesh, Raspberry Pi edge gateways, and industrial MES platforms.",
    siteName: "Roman Deyneko Portfolio",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://nekorom.eu",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Roman Deyneko — Lead Hardware, Embedded & Full-Stack Architect",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Roman Deyneko",
  },
  formatDetection: {
    telephone: false,
  },
};

import { Suspense } from "react";
import Script from "next/script";
import { VisitorTracker } from "@/components/VisitorTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nekorom.eu";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        "name": "Roman Deyneko",
        "jobTitle": "Lead Hardware, Embedded & Full-Stack Architect",
        "url": siteUrl,
        "sameAs": [
          "https://github.com/NeKoRoM"
        ],
        "knowsAbout": [
          "Embedded Systems",
          "ESP32-C6",
          "ESP-NOW Wireless Mesh",
          "Robotics & CNC Machining",
          "Raspberry Pi Edge Gateways",
          "Manufacturing Execution Systems (MES)",
          "Python FastAPI",
          "React 19"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Roman Deyneko Portfolio"
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className={`dark scroll-smooth ${dmSans.variable} ${newsreader.variable} ${ibmPlexMono.variable}`}>
      <body suppressHydrationWarning className="bg-[#11100e] text-[#eeece5] antialiased overflow-x-hidden min-h-screen">
        <Script
          defer
          src="https://umami.nekorom.eu/script.js"
          data-website-id="b8310bfb-6470-4008-85d8-80e92852dbe1"
          strategy="afterInteractive"
        />
        <Script id="matomo-analytics" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['setDomains', ['*.nekorom.eu', '*.nekorom.pl']]);
            _paq.push(['enableCrossDomainLinking']);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            _paq.push(['enableHeartBeatTimer', 5]);
            _paq.push(['enableJSErrorTracking']);
            _paq.push(['trackAllContentImpressions']);
            (function() {
              var u="https://spy.nekorom.eu/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '1']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
        <Script id="posthog-analytics" strategy="afterInteractive">
          {`
            !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags startSessionRecording stopSessionRecording sessionRecordingStarted".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1.0)}(document,window.posthog||[]);
            posthog.init('phc_local_instance', {
                api_host: 'https://spy.nekorom.eu',
                person_profiles: 'always',
                session_recording: {
                    recordCrossOriginIframes: true,
                },
                autocapture: true,
                cross_subdomain_cookie: true
            });
          `}
        </Script>
        <Suspense fallback={null}>
          <VisitorTracker />
        </Suspense>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
