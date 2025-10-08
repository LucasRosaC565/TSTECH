import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  const fileId = Number(id);
  if (!Number.isFinite(fileId)) return new NextResponse("Invalid id", { status: 400 });
  try {
    const row = await (prisma as any).storedFile.findUnique({ where: { id: fileId } });
    if (!row) return new NextResponse("Not found", { status: 404 });
    return new NextResponse(Buffer.from(row.data as Uint8Array), {
      headers: { "Content-Type": row.mime, "Content-Length": String(row.size) },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}


