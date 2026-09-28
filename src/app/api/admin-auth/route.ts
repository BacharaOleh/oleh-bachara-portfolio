import { NextResponse } from "next/server";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { readJsonData, writeJsonData } from "@/lib/server-storage";

export const dynamic = "force-dynamic";

interface AdminSecurityConfig {
  pinHash: string;
  salt: string;
  sessionSecret: string;
  updatedAt: string;
}

const STORAGE_FILE = "admin-security.json";
const LEGACY_FILE = path.join(process.cwd(), "src", "data", "admin-security.json");

function hashPin(pin: string, salt: string): string {
  return crypto.createHmac("sha256", salt).update(pin.trim()).digest("hex");
}

export function getOrInitSecurityConfig(): AdminSecurityConfig {
  // 1. Try reading from persistent data/ (mapped in Docker volume)
  try {
    const existing = readJsonData<AdminSecurityConfig | null>(STORAGE_FILE, null);
    if (existing && existing.pinHash && existing.salt && existing.sessionSecret) {
      return existing;
    }
  } catch (e) {
    console.error("[admin-auth] Error reading config from storage:", e);
  }

  // 2. Try legacy fallback if exists in src/data/
  try {
    if (fs.existsSync(LEGACY_FILE)) {
      const raw = fs.readFileSync(LEGACY_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (parsed.pinHash && parsed.salt && parsed.sessionSecret) {
        writeJsonData(STORAGE_FILE, parsed);
        return parsed;
      }
    }
  } catch (e) {
    console.error("[admin-auth] Error reading legacy config:", e);
  }

  // 3. Default initial configuration with "2026" (or process.env.ADMIN_PIN)
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

  writeJsonData(STORAGE_FILE, initialConfig);
  return initialConfig;
}

function saveSecurityConfig(config: AdminSecurityConfig): boolean {
  return writeJsonData(STORAGE_FILE, config);
}

export function generateSessionToken(sessionSecret: string): string {
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

interface RateLimitRecord {
  attempts: number;
  lockedUntil: number;
  lastAttemptTime: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();

function getClientIdentifier(req: Request): string {
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "local-client";
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
      const clientIp = getClientIdentifier(req);
      const now = Date.now();
      const record = loginAttempts.get(clientIp);

      if (record && record.lockedUntil > now) {
        const remainingMinutes = Math.ceil((record.lockedUntil - now) / 60000);
        return NextResponse.json(
          {
            success: false,
            error: `Забагато невдалих спроб входу. Захисне блокування на ${remainingMinutes} хв.`,
          },
          { status: 429 }
        );
      }

      // If lockout expired or 15 minutes of inactivity passed, reset counter
      const hasLockoutExpired = Boolean(record && record.lockedUntil > 0 && record.lockedUntil <= now);
      const hasWindowExpired = Boolean(record && now - (record.lastAttemptTime || 0) > 15 * 60 * 1000);
      const previousAttempts = hasLockoutExpired || hasWindowExpired ? 0 : (record?.attempts || 0);

      const pin = body.pin;
      if (!pin || typeof pin !== "string") {
        return NextResponse.json(
          { success: false, error: "Введіть PIN-код" },
          { status: 400 }
        );
      }

      const inputHash = hashPin(pin, config.salt);
      if (inputHash !== config.pinHash) {
        const attempts = previousAttempts + 1;
        const maxAttempts = 5;
        const isLocked = attempts >= maxAttempts;
        loginAttempts.set(clientIp, {
          attempts: isLocked ? maxAttempts : attempts,
          lockedUntil: isLocked ? now + 10 * 60 * 1000 : 0,
          lastAttemptTime: now,
        });

        // Periodic cleanup of stale IP records
        if (loginAttempts.size > 150) {
          for (const [ip, rec] of loginAttempts.entries()) {
            if (now - rec.lastAttemptTime > 30 * 60 * 1000 && rec.lockedUntil <= now) {
              loginAttempts.delete(ip);
            }
          }
        }

        const remaining = Math.max(maxAttempts - attempts, 0);
        const errorMsg = isLocked
          ? "Перевищено ліміт спроб. Кабінет тимчасово заблоковано на 10 хвилин."
          : `Невірний PIN-код. Залишилось спроб: ${remaining}`;

        return NextResponse.json(
          { success: false, error: errorMsg },
          { status: isLocked ? 429 : 401 }
        );
      }

      // Successful login resets rate limit counter for this IP
      loginAttempts.delete(clientIp);

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

      if (currentPin.trim() === newPin.trim()) {
        return NextResponse.json(
          { success: false, error: "Новий PIN-код повинен відрізнятися від поточного" },
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
