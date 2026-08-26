import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, projectType, message, rodo } = body;

    if (!name || !email || !message || !rodo) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact Form <onboarding@resend.dev>",
          to: ["olegbachara@gmail.com"],
          subject: `NEW INQUIRY: ${projectType} from ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; background: #08090a; color: #f7f8f8;">
              <h2 style="color: #f59e0b;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Project Type:</strong> ${projectType}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="border-left: 3px solid #f59e0b; padding-left: 12px; color: #a8a29e;">
                ${message.replace(/\n/g, "<br/>")}
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
  } catch (error: any) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
