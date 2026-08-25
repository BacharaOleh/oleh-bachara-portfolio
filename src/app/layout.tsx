import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080c14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://oleh-bachara-portfolio-zeta.vercel.app"),
  title: "Oleh Bachara — Web Developer & Systems Architect",
  description:
    "Portfolio of Oleh Bachara — Inżynier Informatyki & Magister Zarządzania. 4.5+ years of building high-performance web systems, product catalogs, Telegram API bridges, and driving business growth.",
  keywords: [
    "Web Developer",
    "Technical Marketing Specialist",
    "WordPress Developer",
    "PHP Developer",
    "Telegram API",
    "PageSpeed Optimization",
    "Oleh Bachara",
    "Poland",
    "Jarosław",
  ],
  authors: [{ name: "Oleh Bachara" }],
  creator: "Oleh Bachara",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Oleh Bachara — Web Developer & Systems Architect",
    description: "4.5+ years of building high-performance web systems, product catalogs, and driving business growth.",
    siteName: "Oleh Bachara Portfolio",
    url: "https://oleh-bachara-portfolio-zeta.vercel.app",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Oleh Bachara — Web Developer & Systems Architect",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

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
        "name": "Oleh Bachara",
        "jobTitle": "Web Developer & Systems Architect",
        "url": "https://oleh-bachara-portfolio-zeta.vercel.app",
        "sameAs": [
          "https://linkedin.com/in/olegh-bachara",
          "https://github.com/olegb",
          "https://t.me/olegh_bachara"
        ],
        "knowsAbout": [
          "Web Engineering",
          "PHP",
          "WordPress Custom Themes",
          "Telegram API",
          "Google Analytics 4",
          "PageSpeed Optimization"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://oleh-bachara-portfolio-zeta.vercel.app/#website",
        "url": "https://oleh-bachara-portfolio-zeta.vercel.app",
        "name": "Oleh Bachara Portfolio"
      }
    ]
  };

  return (
    <html lang="en" className={`dark scroll-smooth ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#08090a] text-[#f7f8f8] antialiased selection:bg-amber-500/25 selection:text-white overflow-x-hidden min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
