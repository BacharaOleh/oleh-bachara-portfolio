import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

interface AdminSecurityConfig {
  pinHash: string;
  salt: string;
  sessionSecret: string;
  updatedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const CONFIG_FILE = path.join(DATA_DIR, "admin-security.json");

function hashPin(pin: string, salt: string): string {
  return crypto.createHmac("sha256", salt).update(pin.trim()).digest("hex");
}

function getOrInitSecurityConfig(): AdminSecurityConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const raw = fs.readFileSync(CONFIG_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed.pinHash && parsed.salt && parsed.sessionSecret) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("[admin-auth] Error reading config file:", e);
  }

  // Default initial configuration with "2026" (or process.env.ADMIN_PIN)
  const defaultPin = process.env.ADMIN_PIN || "2026";
  const salt = crypto.randomBytes(16).toString("hex");
  const sessionSecret = crypto.randomBytes(32).toString("hex");
  const pinHash = hashPin(defaultPin, salt);

  const initialConfig: AdminSecurityConfig = {
    pinHash,
    salt,
    sessionSecret,
    updatedAt: new Date().toISOString(),
  };

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(initialConfig, null, 2), "utf-8");
  } catch (e) {
    console.error("[admin-auth] Error saving initial config:", e);
  }

  return initialConfig;
}

function saveSecurityConfig(config: AdminSecurityConfig): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    return true;
  } catch (e) {
    console.error("[admin-auth] Error writing security config:", e);
    return false;
  }
}

function generateSessionToken(sessionSecret: string): string {
  const timestamp = Date.now().toString();
  const signature = crypto.createHmac("sha256", sessionSecret).update(timestamp).digest("hex");
  return `${timestamp}.${signature}`;
}

function verifySessionToken(token: string, sessionSecret: string): boolean {
  if (!token || !token.includes(".")) return false;
  const [timestamp, signature] = token.split(".");
  const expectedSig = crypto.createHmac("sha256", sessionSecret).update(timestamp).digest("hex");
  if (signature !== expectedSig) return false;

  // Max session age: 7 days
  const tokenTime = parseInt(timestamp, 10);
  if (isNaN(tokenTime) || Date.now() - tokenTime > 7 * 24 * 60 * 60 * 1000) {
    return false;
  }
  return true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const config = getOrInitSecurityConfig();

    // 1. Verify existing session
    if (body.action === "verify_session") {
      const token = body.token;
      const isValid = verifySessionToken(token, config.sessionSecret);
      return NextResponse.json({ valid: isValid });
    }

    // 2. Login with PIN
    if (body.action === "login") {
      const pin = body.pin;
      if (!pin || typeof pin !== "string") {
        return NextResponse.json(
          { success: false, error: "Введіть PIN-код" },
          { status: 400 }
        );
      }

      const inputHash = hashPin(pin, config.salt);
      if (inputHash !== config.pinHash) {
        return NextResponse.json(
          { success: false, error: "Невірний PIN-код або пароль доступу" },
          { status: 401 }
        );
      }

      const token = generateSessionToken(config.sessionSecret);
      return NextResponse.json({
        success: true,
        token,
        message: "Авторизація успішна",
      });
    }

    // 3. Change PIN
    if (body.action === "change_pin") {
      const { currentPin, newPin } = body;

      if (!currentPin || typeof currentPin !== "string") {
        return NextResponse.json(
          { success: false, error: "Введіть поточний PIN-код" },
          { status: 400 }
        );
      }

      // Verify current PIN
      const currentInputHash = hashPin(currentPin, config.salt);
      if (currentInputHash !== config.pinHash) {
        return NextResponse.json(
          { success: false, error: "Поточний PIN-код введено невірно" },
          { status: 401 }
        );
      }

      if (!newPin || typeof newPin !== "string" || newPin.trim().length < 4) {
        return NextResponse.json(
          { success: false, error: "Новий PIN-код має містити щонайменше 4 символи" },
          { status: 400 }
        );
      }

      // Generate new salt, hash and NEW sessionSecret (invalidates all previous sessions!)
      const newSalt = crypto.randomBytes(16).toString("hex");
      const newSessionSecret = crypto.randomBytes(32).toString("hex");
      const newPinHash = hashPin(newPin, newSalt);

      const updatedConfig: AdminSecurityConfig = {
        pinHash: newPinHash,
        salt: newSalt,
        sessionSecret: newSessionSecret,
        updatedAt: new Date().toISOString(),
      };

      const saved = saveSecurityConfig(updatedConfig);
      if (!saved) {
        return NextResponse.json(
          { success: false, error: "Не вдалося зберегти конфігурацію на сервері" },
          { status: 500 }
        );
      }

      // Issue a fresh token for the current user
      const newToken = generateSessionToken(newSessionSecret);

      return NextResponse.json({
        success: true,
        token: newToken,
        message: "PIN-код успішно змінено. Усі старі сесії на інших пристроях анульовано.",
      });
    }

    return NextResponse.json(
      { success: false, error: "Невідома дія" },
      { status: 400 }
    );
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[admin-auth] Handler error:", err.message);
    return NextResponse.json(
      { success: false, error: "Помилка сервера авторизації" },
      { status: 500 }
    );
  }
}
