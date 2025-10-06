import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return new NextResponse("Arquivo não enviado", { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadsDir = join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const timestamp = Date.now();
  const safeName = (file.name || "upload").replace(/[^a-zA-Z0-9_.-]/g, "_");
  const fileName = `${timestamp}_${safeName}`;
  const targetPath = join(uploadsDir, fileName);
  await writeFile(targetPath, buffer);

  const url = `/uploads/${fileName}`;
  return NextResponse.json({ url });
}


