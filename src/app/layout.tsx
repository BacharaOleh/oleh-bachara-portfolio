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
};

export const metadata: Metadata = {
  metadataBase: new URL("https://oleh-bachara-portfolio-zeta.vercel.app"),
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
    url: "https://oleh-bachara-portfolio-zeta.vercel.app",
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
};

import { VisitorTracker } from "@/components/VisitorTracker";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://oleh-bachara-portfolio-zeta.vercel.app/#person",
        "name": "Roman Deyneko",
        "jobTitle": "Lead Hardware, Embedded & Full-Stack Architect",
        "url": "https://oleh-bachara-portfolio-zeta.vercel.app",
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
        "@id": "https://oleh-bachara-portfolio-zeta.vercel.app/#website",
        "url": "https://oleh-bachara-portfolio-zeta.vercel.app",
        "name": "Roman Deyneko Portfolio"
      }
    ]
  };

  return (
    <html lang="en" className={`dark scroll-smooth ${dmSans.variable} ${newsreader.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-[#11100e] text-[#eeece5] antialiased overflow-x-hidden min-h-screen">
        <VisitorTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
