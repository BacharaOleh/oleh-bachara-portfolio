import { NextResponse } from "next/server";
import { getStoredInquiries, saveStoredInquiries } from "@/app/api/inquiries/route";

export const dynamic = "force-dynamic";

interface EmailRateLimitRecord {
  count: number;
  resetTime: number;
}
const emailRateLimit = new Map<string, EmailRateLimitRecord>();

function isRateLimited(req: Request): boolean {
  const cfIp = req.headers.get("cf-connecting-ip");
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  const clientIp = (cfIp || (forwarded ? forwarded.split(",")[0] : null) || realIp || "local").trim();

  const now = Date.now();
  const record = emailRateLimit.get(clientIp);
  if (!record || now > record.resetTime) {
    emailRateLimit.set(clientIp, { count: 1, resetTime: now + 10 * 60 * 1000 });
    return false;
  }
  if (record.count >= 5) {
    return true;
  }
  record.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    if (isRateLimited(req)) {
      return NextResponse.json(
        { error: "Забагато спроб відправки. Будь ласка, зачекайте кілька хвилин перед наступним зверненням." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, projectType, message, rodo } = body;

    if (!name || !email || !message || !rodo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedProjectType = String(projectType || "General").trim();
    const trimmedMessage = String(message).trim();

    if (trimmedName.length > 200 || trimmedEmail.length > 254 || trimmedMessage.length > 10000) {
      return NextResponse.json({ error: "Payload exceeds allowable length" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Persist inquiry to server storage for admin panel
    try {
      const inquiries = getStoredInquiries();
      const newInquiry = {
        id: `inq-${Date.now().toString(36)}`,
        name: trimmedName,
        email: trimmedEmail,
        projectType: trimmedProjectType,
        message: trimmedMessage,
        status: "new" as const,
        date:
          new Date().toLocaleDateString("sv-SE") +
            " " +
            new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      inquiries.unshift(newInquiry);
      if (inquiries.length > 500) {
        inquiries.pop();
      }
      saveStoredInquiries(inquiries);
    } catch (saveErr) {
      console.error("[send-email] Failed to save inquiry to storage:", saveErr);
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    const sanitizeHtml = (str: string) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const safeName = sanitizeHtml(trimmedName);
    const safeEmail = sanitizeHtml(trimmedEmail);
    const safeProjectType = sanitizeHtml(trimmedProjectType);
    const safeMessage = sanitizeHtml(trimmedMessage).replace(/\n/g, "<br/>");

    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact Form <onboarding@resend.dev>",
          to: ["m.pnikut@gmail.com"],
          subject: `NEW INQUIRY: ${safeProjectType} from ${safeName}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; background: #08090a; color: #f7f8f8;">
              <h2 style="color: #f59e0b;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> ${safeEmail}</p>
              <p><strong>Project Type:</strong> ${safeProjectType}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="border-left: 3px solid #f59e0b; padding-left: 12px; color: #a8a29e;">
                ${safeMessage}
              </blockquote>
              <hr style="border-color: #333;" />
              <p style="font-size: 11px; color: #666;">RODO Consent Confirmed.</p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Resend API Error:", errorText);
        return NextResponse.json({ success: true, warning: "Resend error logged" });
      }

      return NextResponse.json({ success: true, mode: "resend" });
    }

    // Graceful Fallback if RESEND_API_KEY is not set yet
    console.log("==========================================");
    console.log("NEW PORTFOLIO INQUIRY RECEIVED:");
    console.log(`Name: ${name} (${email})`);
    console.log(`Type: ${projectType}`);
    console.log(`Message: ${message}`);
    console.log("==========================================");

    return NextResponse.json({ success: true, mode: "logged" });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Contact Form API Error:", err.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
