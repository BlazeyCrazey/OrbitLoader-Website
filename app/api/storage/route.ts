import { NextResponse } from "next/server";
import { getStorageUsed } from "@/lib/storage";

const STORAGE_LIMIT = 5 * 1024 * 1024 * 1024; // 5GB Firebase free

export async function GET() {
  try {
    const used = await getStorageUsed();
    const percent = (used / STORAGE_LIMIT) * 100;
    const uploadsBlocked = percent >= 95;

    return NextResponse.json({
      used,
      limit: STORAGE_LIMIT,
      percent: Math.round(percent * 100) / 100,
      uploads_blocked: uploadsBlocked,
      message: uploadsBlocked
        ? "Storage is full. Uploads are disabled until storage is upgraded."
        : null,
    });
  } catch {
    return NextResponse.json({ error: "Failed to check storage" }, { status: 500 });
  }
}
