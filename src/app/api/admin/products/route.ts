import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function GET() {
  const items = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, slug, image, images, price, category } = body || {};
  if (!name || !slug || !image || !category) return new NextResponse("Campos obrigatórios ausentes", { status: 400 });
  try {
    const data = { name, slug, image, images: images ?? null, price, category } as unknown as Prisma.ProductCreateInput;
    await prisma.product.create({ data });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err.code === "P2002") return new NextResponse("Slug já existe", { status: 409 });
    return new NextResponse("Erro ao salvar", { status: 500 });
  }
}


