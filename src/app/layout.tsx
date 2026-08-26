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
  title: "Oleh Bachara — Web Developer for Product Platforms",
  description:
    "Portfolio of Oleh Bachara — Web Developer working across WordPress/PHP, product catalogues, performance and technical measurement.",
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
    title: "Oleh Bachara — Web Developer for Product Platforms",
    description: "WordPress/PHP, product catalogues, performance and technical measurement.",
    siteName: "Oleh Bachara Portfolio",
    url: "https://oleh-bachara-portfolio-zeta.vercel.app",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Oleh Bachara — Web Developer for Product Platforms",
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
        "jobTitle": "Web Developer for Product Platforms",
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
    <html lang="en" className={`dark scroll-smooth ${dmSans.variable} ${newsreader.variable} ${ibmPlexMono.variable}`}>
      <body className="bg-[#11100e] text-[#eeece5] antialiased overflow-x-hidden min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
