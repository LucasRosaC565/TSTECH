import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-guard";
import { prisma } from "@/lib/prisma";

export async function GET(_req: Request) {
  const denied = await requireAdminSession();
  if (denied) return denied;

  try {
    const items = await prisma.article.findMany({ orderBy: { date: "desc" } });
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function POST(req: Request) {
  const denied = await requireAdminSession();
  if (denied) return denied;

  const body = await req.json();
  const { title, slug, image, excerpt, content } = body || {};
  if (!title || !slug || !image || !excerpt || !content) return new NextResponse("Campos obrigatórios ausentes", { status: 400 });
  try {
    await prisma.article.create({ data: { title, slug, image, excerpt, content } });
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const err = e as { code?: string };
    if (err.code === "P2002") return new NextResponse("Slug já existe", { status: 409 });
    return new NextResponse("Erro ao salvar", { status: 500 });
  }
}


