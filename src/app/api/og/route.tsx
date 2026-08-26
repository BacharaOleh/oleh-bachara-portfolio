import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", backgroundColor: "#11100e", color: "#eeece5", padding: "58px 66px", fontFamily: "serif", position: "relative" }}>
        <div style={{ position: "absolute", inset: "24px", border: "1px solid rgba(238,236,229,0.15)", display: "flex" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "monospace", fontSize: "15px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c4a160" }}>
          <span>Oleh Bachara</span>
          <span>Selected work / 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "980px", zIndex: 1 }}>
          <span style={{ fontFamily: "monospace", fontSize: "17px", letterSpacing: "0.13em", textTransform: "uppercase", color: "#c4a160", marginBottom: "25px" }}>Web Developer / Product Platforms</span>
          <h1 style={{ fontSize: "82px", lineHeight: 0.98, letterSpacing: "-0.045em", fontWeight: 500, margin: 0 }}>Web platforms that make complex product information easier to use.</h1>
        </div>
        <div style={{ display: "flex", borderTop: "1px solid rgba(238,236,229,0.2)", paddingTop: "20px", fontFamily: "sans-serif", fontSize: "22px", color: "#b9b4aa" }}>
          WordPress/PHP · Product catalogues · Performance & measurement
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
