import { NextResponse } from "next/server";
import { downloadMod } from "@/lib/r2";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const key = `mods/${slug}/${slug}.br`;

  try {
    const data = await downloadMod(key);

    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${slug}.br"`,
        "Content-Length": data.length.toString(),
      },
    });
  } catch {
    return NextResponse.json({ error: "Mod not found" }, { status: 404 });
  }
}
