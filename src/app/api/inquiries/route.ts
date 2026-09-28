import { NextResponse } from "next/server";
import { readJsonData, writeJsonData } from "@/lib/server-storage";

export const dynamic = "force-dynamic";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  status: "new" | "in_progress" | "archived";
  date: string;
}

// Initial store - empty for clean production start
const DEFAULT_INQUIRIES: Inquiry[] = [];

const STORAGE_FILE = "inquiries.json";

export function getStoredInquiries(): Inquiry[] {
  const inquiries = readJsonData<Inquiry[]>(STORAGE_FILE, DEFAULT_INQUIRIES);
  let hasRepairs = false;

  for (const inq of inquiries) {
    if (inq.date && !inq.date.includes("-") && !inq.date.includes(".")) {
      let datePart = "";
      if (inq.id && inq.id.startsWith("inq-")) {
        const parts = inq.id.split("-");
        const ts = parseInt(parts[1], 36);
        if (!isNaN(ts) && ts > 1500000000000 && ts < 3000000000000) {
          datePart = new Date(ts).toLocaleDateString("sv-SE");
        }
      }
      if (!datePart) {
        datePart = new Date().toLocaleDateString("sv-SE");
      }
      inq.date = `${datePart} ${inq.date}`;
      hasRepairs = true;
    }
  }

  if (hasRepairs) {
    saveStoredInquiries(inquiries);
  }

  return inquiries;
}

export function saveStoredInquiries(inquiries: Inquiry[]): void {
  writeJsonData(STORAGE_FILE, inquiries);
}

export async function GET() {
  const inquiries = getStoredInquiries();
  return NextResponse.json({
    success: true,
    inquiries,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const inquiries = getStoredInquiries();

    if (body.action === "update_status") {
      const { id, status } = body;
      if (!id || typeof id !== "string") {
        return NextResponse.json({ success: false, error: "Missing inquiry ID" }, { status: 400 });
      }
      if (!["new", "in_progress", "archived"].includes(status)) {
        return NextResponse.json({ success: false, error: "Invalid status value" }, { status: 400 });
      }
      const updated = inquiries.map((item) =>
        item.id === id ? { ...item, status: status as Inquiry["status"] } : item
      );
      saveStoredInquiries(updated);
      return NextResponse.json({ success: true, inquiries: updated });
    }

    if (body.action === "delete") {
      const { id } = body;
      if (!id || typeof id !== "string") {
        return NextResponse.json({ success: false, error: "Missing inquiry ID" }, { status: 400 });
      }
      const updated = inquiries.filter((item) => item.id !== id);
      saveStoredInquiries(updated);
      return NextResponse.json({ success: true, inquiries: updated });
    }

    if (body.action === "clear_all") {
      saveStoredInquiries([]);
      return NextResponse.json({ success: true, inquiries: [] });
    }

    if (body.action === "restore") {
      if (!Array.isArray(body.inquiries)) {
        return NextResponse.json({ success: false, error: "inquiries must be an array" }, { status: 400 });
      }
      saveStoredInquiries(body.inquiries);
      return NextResponse.json({ success: true, inquiries: body.inquiries });
    }

    if (body.action === "create" || body.name) {
      const name = String(body.name || "").trim();
      const email = String(body.email || "").trim().toLowerCase();
      const message = String(body.message || "").trim();
      const projectType = String(body.projectType || "General Inquiry").trim();

      if (!name || !email) {
        return NextResponse.json(
          { success: false, error: "Ім'я та email є обов'язковими для створення заявки" },
          { status: 400 }
        );
      }

      if (name.length > 200 || email.length > 254 || message.length > 10000 || projectType.length > 200) {
        return NextResponse.json(
          { success: false, error: "Довжина переданих полів перевищує допустимий ліміт" },
          { status: 400 }
        );
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { success: false, error: "Вказано некоректний формат email адреси" },
          { status: 400 }
        );
      }

      const validStatus: Inquiry["status"] =
        body.status === "in_progress" || body.status === "archived" ? body.status : "new";
      const newInquiry: Inquiry = {
        id: body.id || `inq-${Date.now().toString(36)}`,
        name,
        email,
        projectType,
        message,
        status: validStatus,
        date:
          body.date ||
          new Date().toLocaleDateString("sv-SE") +
            " " +
            new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      inquiries.unshift(newInquiry);

      if (inquiries.length > 500) {
        inquiries.pop();
      }

      saveStoredInquiries(inquiries);
      return NextResponse.json({ success: true, inquiry: newInquiry });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
