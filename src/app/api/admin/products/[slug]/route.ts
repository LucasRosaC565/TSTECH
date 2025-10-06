import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_: Request, { params }: Params) {
  const { slug } = await params;
  const item = await prisma.product.findUnique({ where: { slug } });
  if (!item) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: Params) {
  const { slug } = await params;
  const body = await req.json();
  const { name, image, images, price, category, newSlug } = body || {};
  try {
    const data: any = {
      name: name ?? undefined,
      image: image ?? undefined,
      images: images ?? undefined,
      price: price ?? undefined,
      category: category ?? undefined,
      slug: newSlug ?? undefined,
    };
    const updated = await prisma.product.update({
      where: { slug },
      data,
    });
    return NextResponse.json(updated);
  } catch (e: any) {
    if (e.code === "P2002") return new NextResponse("Slug já existe", { status: 409 });
    if (e.code === "P2025") return new NextResponse("Não encontrado", { status: 404 });
    return new NextResponse("Erro ao atualizar", { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { slug } = await params;
  try {
    await prisma.product.delete({ where: { slug } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e.code === "P2025") return new NextResponse("Não encontrado", { status: 404 });
    return new NextResponse("Erro ao excluir", { status: 500 });
  }
}


