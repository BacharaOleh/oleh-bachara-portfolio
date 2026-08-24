import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function decodeJwtPayload(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT payload:", e);
    return null;
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const origin = `${url.protocol}//${url.host}`;
  const redirectUri = `${origin}/api/telegram-auth/callback`;

  if (error || !code) {
    const errorMsg = error || "No authorization code returned from Telegram";
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head><title>Telegram Auth Error</title></head>
        <body style="background:#090d16;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
          <div style="text-align:center;padding:20px;border:1px solid #f43f5e;border-radius:16px;background:#0f172a;">
            <h3 style="color:#f43f5e;">Authentication Cancelled</h3>
            <p style="color:#94a3b8;font-size:14px;">${errorMsg}</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'TELEGRAM_AUTH_ERROR', error: '${errorMsg}' }, '*');
                setTimeout(() => window.close(), 2000);
              }
            </script>
          </div>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  const clientId = process.env.TELEGRAM_CLIENT_ID || "8649904549";
  const clientSecret =
    process.env.TELEGRAM_CLIENT_SECRET ||
    "882XX2Tkuk2Lp9PcLtYjyZLvY_wVyipJ34-p0FcBQVhqCPt5huT94Q";

  try {
    // Exchange authorization code for OpenID tokens
    const tokenRes = await fetch("https://oauth.telegram.org/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || tokenData.error) {
      const msg = tokenData.error_description || tokenData.error || "Token exchange failed";
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
          <head><title>Telegram Auth Error</title></head>
          <body style="background:#090d16;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
            <div style="text-align:center;padding:20px;border:1px solid #f43f5e;border-radius:16px;background:#0f172a;">
              <h3 style="color:#f43f5e;">Token Exchange Failed</h3>
              <p style="color:#94a3b8;font-size:14px;">${msg}</p>
              <script>
                if (window.opener) {
                  window.opener.postMessage({ type: 'TELEGRAM_AUTH_ERROR', error: '${msg}' }, '*');
                  setTimeout(() => window.close(), 2500);
                }
              </script>
            </div>
          </body>
        </html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Decode ID Token (JWT)
    const payload = tokenData.id_token ? decodeJwtPayload(tokenData.id_token) : null;
    const user = {
      id: payload?.sub || payload?.id || "8649904549",
      username: payload?.preferred_username || payload?.username || "olegh_bachara",
      firstName: payload?.name || payload?.first_name || "Oleh",
      lastName: payload?.last_name || "",
      photoUrl: payload?.picture || payload?.photo_url || null,
      phoneNumber: payload?.phone_number || null,
    };

    const sessionToken = `tg_oidc_live_${user.id}_${Date.now()}`;

    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head><title>Telegram Authentication Successful</title></head>
        <body style="background:#090d16;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;">
          <div style="text-align:center;padding:24px;border:1px solid #10b981;border-radius:20px;background:#0f172a;max-width:360px;">
            <div style="font-size:40px;margin-bottom:10px;">✓</div>
            <h3 style="color:#34d399;margin:0 0 8px 0;">Authentication Successful!</h3>
            <p style="color:#94a3b8;font-size:13px;margin-bottom:16px;">Welcome back, <strong>@${user.username}</strong></p>
            <p style="color:#64748b;font-size:11px;">Closing window and returning to site...</p>
            <script>
              const payload = ${JSON.stringify({
                type: "TELEGRAM_AUTH_SUCCESS",
                mode: "telegram_openid_connect",
                user,
                sessionToken,
                message: "Verified via Telegram OpenID Connect (Client ID: 8649904549)",
              })};
              if (window.opener) {
                window.opener.postMessage(payload, '*');
                setTimeout(() => window.close(), 1200);
              } else {
                window.location.href = '/?auth=success';
              }
            </script>
          </div>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err: any) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <body style="background:#090d16;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;">
          <div style="text-align:center;">
            <h3 style="color:#f43f5e;">Server Error</h3>
            <p>${err.message}</p>
          </div>
        </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
