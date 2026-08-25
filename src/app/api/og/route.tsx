import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#08090a",
          color: "#f7f8f8",
          fontFamily: "sans-serif",
          position: "relative",
          padding: "60px",
        }}
      >
        {/* Subtle Warm Amber Glow Ambient */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "30%",
            width: "500px",
            height: "300px",
            backgroundColor: "rgba(245, 158, 11, 0.08)",
            borderRadius: "50%",
            filter: "blur(100px)",
          }}
        />

        {/* Outer Frame Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "9999px",
            backgroundColor: "#121316",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
            }}
          />
          <span style={{ fontSize: "14px", color: "#a8a29e", fontFamily: "monospace" }}>
            WEB DEVELOPER & SYSTEMS ARCHITECT
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 800,
            textAlign: "center",
            letterSpacing: "-0.02em",
            margin: "0 0 16px 0",
            color: "#ffffff",
          }}
        >
          Oleh Bachara
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "24px",
            color: "#a8a29e",
            textAlign: "center",
            maxWidth: "800px",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          4.5+ Years Building High-Performance Web Systems, Product Catalogs & Telegram API Bridges
        </p>

        {/* Bottom Tagline */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "40px",
            fontSize: "14px",
            color: "#f59e0b",
            fontFamily: "monospace",
          }}
        >
          <span>🇵🇱 Polish Citizen</span>
          <span>•</span>
          <span>Full EU Work Authorization</span>
          <span>•</span>
          <span>PageSpeed 90+</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
