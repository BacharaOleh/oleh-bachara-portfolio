import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  output: "standalone",
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/cv.pdf",
        destination: "/cv-roman-deyneko.pdf",
      },
      {
        source: "/resume.pdf",
        destination: "/cv-roman-deyneko.pdf",
      },
      {
        source: "/cv-en.pdf",
        destination: "/cv-roman-deyneko-en.pdf",
      },
      {
        source: "/cv-pl.pdf",
        destination: "/cv-roman-deyneko-pl.pdf",
      },
    ];
  },
};

export default nextConfig;
