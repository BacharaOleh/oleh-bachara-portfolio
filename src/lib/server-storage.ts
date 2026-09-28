import fs from "node:fs";
import path from "node:path";

/**
 * Storage directory resolution:
 * Uses DATA_DIR environment variable if specified (e.g. in Docker /app/data),
 * otherwise defaults to ./data in the project root.
 */
const DEFAULT_DATA_DIR = path.join(process.cwd(), "data");

/**
 * Ensures the persistent storage directory exists with proper permissions.
 */
export function getStorageDir(): string {
  const dir = process.env.DATA_DIR || DEFAULT_DATA_DIR;
  try {
    if (!fs.existsSync(/*turbopackIgnore: true*/ dir)) {
      fs.mkdirSync(/*turbopackIgnore: true*/ dir, { recursive: true, mode: 0o775 });
    }
  } catch (err) {
    console.error("[server-storage] Failed to create data directory:", err);
  }
  return dir;
}

/**
 * Reads a JSON file from persistent storage.
 * If the file doesn't exist, it safely writes the fallback data and returns it.
 */
export function readJsonData<T>(fileName: string, fallback: T): T {
  try {
    const dir = getStorageDir();
    const filePath = path.join(/*turbopackIgnore: true*/ dir, fileName);

    if (!fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
      writeJsonData(fileName, fallback);
      return fallback;
    }

    const content = fs.readFileSync(/*turbopackIgnore: true*/ filePath, "utf-8");
    if (!content || !content.trim()) {
      return fallback;
    }

    return JSON.parse(content) as T;
  } catch (err) {
    console.error(`[server-storage] Error reading ${fileName}:`, err);
    return fallback;
  }
}

/**
 * Writes data atomically to persistent storage using a temporary file and rename.
 * This prevents race conditions and corrupt files during concurrent requests.
 */
export function writeJsonData<T>(fileName: string, data: T): boolean {
  try {
    const dir = getStorageDir();
    const filePath = path.join(/*turbopackIgnore: true*/ dir, fileName);
    const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).slice(2, 6)}.tmp`;
    const serialized = JSON.stringify(data, null, 2);

    fs.writeFileSync(/*turbopackIgnore: true*/ tempPath, serialized, "utf-8");

    try {
      fs.renameSync(/*turbopackIgnore: true*/ tempPath, /*turbopackIgnore: true*/ filePath);
    } catch {
      // Fallback if atomic rename is restricted on specific filesystems
      fs.writeFileSync(/*turbopackIgnore: true*/ filePath, serialized, "utf-8");
      try {
        if (fs.existsSync(/*turbopackIgnore: true*/ tempPath)) {
          fs.unlinkSync(/*turbopackIgnore: true*/ tempPath);
        }
      } catch {
        // Non-blocking cleanup
      }
    }

    return true;
  } catch (err) {
    console.error(`[server-storage] Error writing ${fileName}:`, err);
    return false;
  }
}
