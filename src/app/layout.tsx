import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oleh Bachara — Web Developer & Technical Marketing Specialist",
  description:
    "Portfolio of Oleh Bachara — Inżynier Informatyki & Magister Zarządzania. 4.5+ years of building high-performance web systems, custom API integrations, and driving e-commerce conversions in Poland.",
  keywords: [
    "Web Developer",
    "Technical Marketing Specialist",
    "WordPress Developer",
    "WooCommerce Specialist",
    "PHP Developer",
    "SEO Specialist",
    "Oleh Bachara",
    "Poland",
    "Full-Stack",
  ],
  authors: [{ name: "Oleh Bachara" }],
  creator: "Oleh Bachara",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Oleh Bachara — Web Developer & Systems Architect",
    description: "4.5+ years of building high-performance web systems and driving growth.",
    siteName: "Oleh Bachara Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#080c14] text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-white overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
