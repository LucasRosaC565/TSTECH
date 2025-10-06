import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, slug, image, images, price, category } = body || {};
  if (!name || !slug || !image || !category) return new NextResponse("Campos obrigatórios ausentes", { status: 400 });
  try {
    await prisma.product.create({ data: { name, slug, image, images: images ?? null, price, category } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e.code === "P2002") return new NextResponse("Slug já existe", { status: 409 });
    return new NextResponse("Erro ao salvar", { status: 500 });
  }
}


