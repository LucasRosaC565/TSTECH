import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return new NextResponse("Arquivo ausente", { status: 400 });

  const maxBytes = 4 * 1024 * 1024; // 4MB
  if (file.size > maxBytes) return new NextResponse("Arquivo excede 4MB", { status: 413 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  // Persistir no banco (compatível com Vercel/serverless)
  try {
    const saved = await prisma.storedFile.create({
      data: { mime: file.type || "application/octet-stream", size: buffer.length, data: buffer },
    });
    const url = `/api/files/${saved.id}`;
    return NextResponse.json({ url });
  } catch {
    return new NextResponse("Falha ao salvar arquivo", { status: 500 });
  }
}

// Armazenamento via filesystem para simplificar o deploy e compatibilizar com importações


