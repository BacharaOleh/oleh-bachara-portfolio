import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const langParam = searchParams.get("lang");
  const lang = langParam === "pl" ? "pl" : "en";
  const isDownload = searchParams.get("download") === "1";

  const filename = `cv-roman-deyneko-${lang}.pdf`;
  const filePath = path.join(process.cwd(), "public", filename);

  if (!fs.existsSync(filePath)) {
    // Fallback to default cv-roman-deyneko.pdf if specific language file is missing
    const defaultPath = path.join(process.cwd(), "public", "cv-roman-deyneko.pdf");
    if (!fs.existsSync(defaultPath)) {
      return NextResponse.json({ error: "CV file not found" }, { status: 404 });
    }
    const defaultBuffer = fs.readFileSync(defaultPath);
    return new NextResponse(defaultBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${isDownload ? "attachment" : "inline"}; filename="cv-roman-deyneko.pdf"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const fileBuffer = fs.readFileSync(filePath);
  const disposition = isDownload ? "attachment" : "inline";

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
