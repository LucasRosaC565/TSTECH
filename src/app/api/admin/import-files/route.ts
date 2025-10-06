import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  if (!type) return new NextResponse("Parâmetros ausentes", { status: 400 });

  const form = await request.formData();
  const csvFile = form.get("csv");
  if (!(csvFile instanceof File)) return new NextResponse("CSV não enviado", { status: 400 });

  // Salvar imagens e mapear por nome original → url salva
  const uploadsDir = join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const imageUrlByName = new Map<string, string>();
  for (const [key, value] of form.entries()) {
    if (key !== "images") continue;
    const f = value as unknown as File;
    if (!(f instanceof File)) continue;
    const arrayBuffer = await f.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const safeName = (f.name || "img").replace(/[^a-zA-Z0-9_.-]/g, "_");
    const fileName = `${Date.now()}_${safeName}`;
    const targetPath = join(uploadsDir, fileName);
    await writeFile(targetPath, buffer);
    const url = `/uploads/${fileName}`;
    imageUrlByName.set(safeName, url);
  }

  const text = await csvFile.text();
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return new NextResponse("CSV vazio", { status: 400 });
  const header = lines.shift()!;
  const cols = header.split(",").map((c) => c.trim());

  if (type === "products") {
    const required = ["name","slug","image","category"]; // price é opcional
    for (const r of required) if (!cols.includes(r)) return new NextResponse("CSV inválido: produtos requerem name,slug,image,category", { status: 400 });
    for (const l of lines) {
      const values = l.split(",").map((v) => v.trim());
      const obj: any = Object.fromEntries(cols.map((c, i) => [c, values[i] ?? ""]));
      if (!obj.name || !obj.slug || !obj.image || !obj.category) continue;
      let image = obj.image;
      if (!/^https?:\/\//i.test(image)) {
        const safe = image.replace(/[^a-zA-Z0-9_.-]/g, "_");
        image = imageUrlByName.get(safe) || image;
      }
      try {
        await prisma.product.upsert({
          where: { slug: obj.slug },
          update: { name: obj.name, image, price: obj.price || null, category: obj.category },
          create: { name: obj.name, slug: obj.slug, image, price: obj.price || null, category: obj.category },
        });
      } catch {}
    }
    return NextResponse.json({ ok: true });
  }

  if (type === "articles") {
    const required = ["title","slug","image","excerpt","content"];
    for (const r of required) if (!cols.includes(r)) return new NextResponse("CSV inválido: artigos requerem title,slug,image,excerpt,content", { status: 400 });
    for (const l of lines) {
      const values = l.split(",").map((v) => v.trim());
      const obj: any = Object.fromEntries(cols.map((c, i) => [c, values[i] ?? ""]));
      if (!obj.title || !obj.slug || !obj.image || !obj.excerpt || !obj.content) continue;
      let image = obj.image;
      if (!/^https?:\/\//i.test(image)) {
        const safe = image.replace(/[^a-zA-Z0-9_.-]/g, "_");
        image = imageUrlByName.get(safe) || image;
      }
      try {
        await prisma.article.upsert({
          where: { slug: obj.slug },
          update: { title: obj.title, image, excerpt: obj.excerpt, content: obj.content },
          create: { title: obj.title, slug: obj.slug, image, excerpt: obj.excerpt, content: obj.content },
        });
      } catch {}
    }
    return NextResponse.json({ ok: true });
  }

  return new NextResponse("Tipo inválido", { status: 400 });
}


