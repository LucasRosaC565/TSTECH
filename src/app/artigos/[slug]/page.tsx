import { prisma } from "@/lib/prisma";
import type React from "react";
import Image from "next/image";

export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const items = await prisma.article.findMany({ select: { slug: true } });
    return items.map((a) => ({ slug: a.slug }));
  } catch {
    // Sem DB no build: não pré-renderizar artigos
    return [];
  }
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const artigo = await prisma.article.findUnique({ where: { slug } });

  if (!artigo) {
    return (
      <main className="container py-16">
        <p>Artigo não encontrado.</p>
      </main>
    );
  }

  const outros = await prisma.article.findMany({ where: { slug: { not: artigo.slug } }, orderBy: { date: "desc" }, take: 3 });

  return (
    <main>
      <section className="hero-bg-artigo h-[28vw] min-h-[280px] flex items-center">
        <div className="container py-8">
          <p className="fluid-h2 font-bold text-[#3E515B] mb-1">Artigos</p>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="bg-white rounded-2xl shadow-sm border p-6 max-w-5xl">
            <h2 className="font-semibold text-[#3E515B] mb-4">{artigo.title}</h2>
            <ArticleBody content={String(artigo.content)} />
            <span className="block text-xs text-gray-500 mt-4">{new Date(artigo.date as unknown as string).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="container">
          <h3 className="font-semibold text-[#3E515B] mb-4">Outros Artigos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outros.map((a) => (
              <a key={a.slug} href={`/artigos/${a.slug}`} className="bg-white rounded-2xl shadow-sm border overflow-hidden block">
                <Image src={a.image} alt={a.title} width={480} height={160} className="w-full h-[160px] object-cover" />
                <div className="p-4">
                  <h4 className="font-medium text-[#3E515B] mb-2 line-clamp-2">{a.title}</h4>
                  <p className="text-sm text-[#646464] line-clamp-2">{a.excerpt}</p>
                  <span className="block text-xs text-gray-500 mt-2">{new Date(a.date as unknown as string).toLocaleDateString("pt-BR")}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}



function ArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);

  function escapeHtml(s: string) {
    return s
      .replaceAll(/&/g, "&amp;")
      .replaceAll(/</g, "&lt;")
      .replaceAll(/>/g, "&gt;")
      .replaceAll(/"/g, "&quot;")
      .replaceAll(/'/g, "&#039;");
  }

  function inline(md: string) {
    const esc = escapeHtml(md);
    // negrito **texto**
    const bold = esc.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // itálico *texto*
    const italic = bold.replace(/\*(.+?)\*/g, "<em>$1</em>");
    return italic;
  }

  const elements: React.ReactElement[] = [];
  let listOpen = false;
  let listItems: string[] = [];

  function flushList() {
    if (listOpen && listItems.length) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-6 text-[#646464] mb-4 leading-7">
          {listItems.map((li, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: inline(li) }} />
          ))}
        </ul>
      );
    }
    listOpen = false;
    listItems = [];
  }

  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    // listas: linhas iniciando com "- "
    const lines = block.split(/\n/);
    if (lines.every((l) => l.trim().startsWith("- "))) {
      listOpen = true;
      listItems.push(
        ...lines.map((l) => l.replace(/^\-\s+/, "").trim())
      );
      flushList();
      continue;
    }

    flushList();

    // subtítulo: ## Título
    const h3 = block.match(/^##\s+(.+)/);
    if (h3) {
      elements.push(
        <h3 key={`h3-${elements.length}`} className="font-semibold text-[#3E515B] mb-3" dangerouslySetInnerHTML={{ __html: inline(h3[1]) }} />
      );
      continue;
    }

    // título secundário maior: # Título
    const h2 = block.match(/^#\s+(.+)/);
    if (h2) {
      elements.push(
        <h2 key={`h2-${elements.length}`} className="font-bold text-[#3E515B] mb-3" dangerouslySetInnerHTML={{ __html: inline(h2[1]) }} />
      );
      continue;
    }

    // parágrafo padrão com inline (negrito/itálico)
    elements.push(
      <p key={`p-${elements.length}`} className="text-[#646464] mb-4 leading-7" dangerouslySetInnerHTML={{ __html: inline(block) }} />
    );
  }

  return <div>{elements}</div>;
}

