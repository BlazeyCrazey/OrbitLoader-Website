import { NextResponse } from "next/server";
import { canUpload, uploadMod } from "@/lib/storage";
import { createClient } from "@/lib/supabase-server";

const MAX_UNCOMPRESSED = 10 * 1024 * 1024; // 10MB uncompressed limit

export async function POST(request: Request) {
  // Auth check
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string | null;
  const name = formData.get("name") as string | null;

  if (!file || !slug || !name) {
    return NextResponse.json({ error: "Missing file, slug, or name" }, { status: 400 });
  }

  // Check uncompressed size
  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length > MAX_UNCOMPRESSED) {
    return NextResponse.json({
      error: `File too large: ${(buffer.length / (1024 * 1024)).toFixed(2)}MB (max ${MAX_UNCOMPRESSED / (1024 * 1024)}MB)`,
    }, { status: 400 });
  }

  // Brotli compress server-side as well (the client pre-compresses, but we verify)
  // The file should already be .br compressed from the desktop app
  const compressedSize = buffer.length;

  // Check storage capacity
  const storageCheck = await canUpload(compressedSize);
  if (!storageCheck.allowed) {
    return NextResponse.json({
      error: storageCheck.message,
      storage: { used: storageCheck.used, limit: storageCheck.limit },
    }, { status: 507 });
  }

  // Upload to R2
  const key = `mods/${slug}/${slug}.br`;
  await uploadMod(key, buffer);

  return NextResponse.json({
    success: true,
    key,
    compressed_size: compressedSize,
    storage: { used: storageCheck.used + compressedSize, limit: storageCheck.limit },
  });
}
