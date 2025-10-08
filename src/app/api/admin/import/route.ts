import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Espera CSV em texto puro no body. Query param type=products|articles
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const text = await request.text();

  if (!type || !text) return new NextResponse("Parâmetros ausentes", { status: 400 });

  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return new NextResponse("Conteúdo vazio", { status: 400 });

  const header = lines.shift()!;
  const cols = header.split(",").map((c) => c.trim());

  if (type === "products") {
    // header esperado: name,slug,image,category,description,images
    const required = ["name","slug","image","category"]; // description e images são opcionais
    for (const r of required) if (!cols.includes(r)) return new NextResponse("CSV inválido: produtos requerem name,slug,image,category", { status: 400 });
    for (const l of lines) {
      const values = l.split(",").map((v) => v.trim());
      const obj = Object.fromEntries(cols.map((c, i) => [c, values[i] ?? ""])) as Record<string, string>;
      if (!obj.name || !obj.slug || !obj.image || !obj.category) continue;
      const description = (obj.description || "").trim() || undefined;
      const images = (obj.images || "").split(";").map((s) => s.trim()).filter(Boolean);
      const mappedImages = images.filter(Boolean);
      try {
        await prisma.product.upsert({
          where: { slug: obj.slug },
          update: { name: obj.name, image: obj.image, category: obj.category, description, images: mappedImages.length ? mappedImages : undefined },
          create: { name: obj.name, slug: obj.slug, image: obj.image, category: obj.category, description, images: mappedImages.length ? mappedImages : undefined },
        });
      } catch {}
    }
    return NextResponse.json({ ok: true });
  }

  if (type === "articles") {
    // header esperado: title,slug,image,excerpt,content
    const required = ["title","slug","image","excerpt","content"];
    for (const r of required) if (!cols.includes(r)) return new NextResponse("CSV inválido: artigos requerem title,slug,image,excerpt,content", { status: 400 });
    for (const l of lines) {
      const values = l.split(",").map((v) => v.trim());
      const obj = Object.fromEntries(cols.map((c, i) => [c, values[i] ?? ""])) as Record<string, string>;
      if (!obj.title || !obj.slug || !obj.image || !obj.excerpt || !obj.content) continue;
      try { await prisma.article.upsert({ where: { slug: obj.slug }, update: { title: obj.title, image: obj.image, excerpt: obj.excerpt, content: obj.content }, create: { title: obj.title, slug: obj.slug, image: obj.image, excerpt: obj.excerpt, content: obj.content } }); } catch {}
    }
    return NextResponse.json({ ok: true });
  }

  return new NextResponse("Tipo inválido", { status: 400 });
}


