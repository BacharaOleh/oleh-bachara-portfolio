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
  return (
    <html lang="en" className={`dark scroll-smooth ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#080c14] text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-white overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
