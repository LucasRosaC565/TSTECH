import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_: Request, { params }: Params) {
  const { slug } = await params;
  const item = await prisma.article.findUnique({ where: { slug } });
  if (!item) return new NextResponse("Not found", { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: Params) {
  const { slug } = await params;
  const body = await req.json();
  const { title, image, excerpt, content, newSlug } = body || {};
  try {
    const updated = await prisma.article.update({
      where: { slug },
      data: {
        title: title ?? undefined,
        image: image ?? undefined,
        excerpt: excerpt ?? undefined,
        content: content ?? undefined,
        slug: newSlug ?? undefined,
      },
    });
    return NextResponse.json(updated);
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err.code === "P2002") return new NextResponse("Slug já existe", { status: 409 });
    if (err.code === "P2025") return new NextResponse("Não encontrado", { status: 404 });
    return new NextResponse("Erro ao atualizar", { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { slug } = await params;
  try {
    await prisma.article.delete({ where: { slug } });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err.code === "P2025") return new NextResponse("Não encontrado", { status: 404 });
    return new NextResponse("Erro ao excluir", { status: 500 });
  }
}


