import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const items = await prisma.article.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, slug, image, excerpt, content } = body || {};
  if (!title || !slug || !image || !excerpt || !content) return new NextResponse("Campos obrigatórios ausentes", { status: 400 });
  try {
    await prisma.article.create({ data: { title, slug, image, excerpt, content } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e.code === "P2002") return new NextResponse("Slug já existe", { status: 409 });
    return new NextResponse("Erro ao salvar", { status: 500 });
  }
}


