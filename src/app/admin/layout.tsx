import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Cabinet | Engineering Control Panel",
  description: "Internal portfolio administration, telemetry, leads & project management dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#08090a] text-[#f7f8f8] antialiased selection:bg-[#c4a160]/30 selection:text-white">
      {children}
    </div>
  );
}
