import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

  // 1) Tenta salvar no filesystem (funciona em servidores com disco gravável)
  try {
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });
    const safeName = (file.name || "upload").replace(/[^a-zA-Z0-9_.-]/g, "_");
    const fileName = `${Date.now()}_${safeName}`;
    const targetPath = join(uploadsDir, fileName);
    await writeFile(targetPath, buffer);
    const url = `/uploads/${fileName}`;
    return NextResponse.json({ url });
  } catch {
    // 2) Fallback: salvar no banco (compatível com Vercel/serverless)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const saved = await (prisma as any).storedFile.create({
        data: { mime: file.type || "application/octet-stream", size: buffer.length, data: buffer },
      });
      const url = `/api/files/${saved.id}`;
      return NextResponse.json({ url });
    } catch {
      // 3) Último recurso: Data URL inline (não persiste, mas evita quebrar a UI)
      const mime = file.type || "application/octet-stream";
      const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`;
      return NextResponse.json({ url: dataUrl, inline: true });
    }
  }
}

// Armazenamento via filesystem para simplificar o deploy e compatibilizar com importações


