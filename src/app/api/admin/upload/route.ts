import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return new NextResponse("Arquivo ausente", { status: 400 });

  const maxBytes = 4 * 1024 * 1024; // 4MB
  if (file.size > maxBytes) return new NextResponse("Arquivo excede 4MB", { status: 413 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const uploadsDir = join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const safeName = (file.name || "upload").replace(/[^a-zA-Z0-9_.-]/g, "_");
  const fileName = `${Date.now()}_${safeName}`;
  const targetPath = join(uploadsDir, fileName);
  await writeFile(targetPath, buffer);
  const url = `/uploads/${fileName}`;
  return NextResponse.json({ url });
}

// Armazenamento via filesystem para simplificar o deploy e compatibilizar com importações


