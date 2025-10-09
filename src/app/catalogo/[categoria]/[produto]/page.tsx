import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ categoria: string; produto: string }> };

// Força renderização dinâmica para refletir edições de produtos imediatamente
export const dynamic = "force-dynamic";

export function generateStaticParams() {
  // Sem pré-render dinâmico: deixar o Next gerar sob demanda
  return [];
}

export default async function ProdutoPage({ params }: Props) {
  const { categoria, produto } = await params;
  const category = getCategory(categoria);
  type ProductView = { slug: string; name: string; image: string; images: string[] | null; description?: string | null };
  let product: ProductView | null = null;
  try {
    const db = await prisma.product.findUnique({
      where: { slug: produto },
      // client types podem estar desatualizados em build, então não selecionamos description tipada aqui
      select: { slug: true, name: true, image: true, images: true },
    });
    product = db as unknown as ProductView;
  } catch {
    product = null;
  }

  if (!category || !product) {
    return (
      <main className="container py-16">
        <p>Produto não encontrado.</p>
      </main>
    );
  }

  const relacionados: Array<{ slug: string; name: string; image: string; price: string | null }> = [];

  return (
    <main>
      <section className="hero-bg-catalogo-pdt xl:mt-32 mt-20 h-[22vw] flex items-center">
        <div className="container py-10">
          <h1 className="fluid-h2 font-bold text-[#3E515B]">
            <Link href="/catalogo" className="hover:underline">Catálogo</Link>
            <span className="opacity-60 px-2">›</span>
            <Link href={`/catalogo/${category.slug}`} className="hover:underline">{category.name}</Link>
            <span className="opacity-60 px-2">›</span>
            <span>{product.name}</span>
          </h1>
        </div>
      </section>
      <section className="py-10">
        <div className="container">
          <div className="bg-white rounded-2xl shadow-sm border p-6 grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-8">
            <div className="space-y-4">
              {Array.isArray(product.images) && product.images.length > 0 ? (
                <div>
                  <div className="h-[360px] rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                    <Image src={product.image} alt={product.name} width={520} height={360} sizes="(min-width: 1024px) 520px, 100vw" loading="eager" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex gap-3 mt-3 overflow-x-auto no-scrollbar">
                    {[product.image, ...(product.images as string[])] .map((url, idx) => (
                      <button key={idx} className="h-16 w-24 flex-shrink-0 rounded border bg-white" onClick={(e) => { e.preventDefault(); }}>
                        <Image src={url} alt="thumb" width={96} height={64} sizes="96px" loading="lazy" className="h-full w-full object-cover rounded" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <Image src={product.image} alt={product.name} width={520} height={360} sizes="(min-width: 1024px) 520px, 100vw" loading="eager" className="rounded-lg bg-gray-50 w-full object-contain" />
              )}
            </div>
            <div>
              <h2 className="fluid-label text-[#16514B] font-bold mb-3">{product.name}</h2>
              {product.description && (
                <p className="text-[#646464] mb-4 whitespace-pre-wrap">{product.description}</p>
              )}
            
              <a className="btn-primary" href="#contato">Pedir orçamento</a>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-14">
        <div className="container">
          <h3 className="font-semibold text-[#3E515B] mb-4">Produtos relacionados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relacionados.map((p) => (
              <Link key={p.slug} href={`/catalogo/${category.slug}/${p.slug}`} className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Image src={p.image} alt={p.name} width={400} height={300} className="w-full h-[160px] object-contain" />
                </div>
                <div className="px-4 pb-4 flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-800">{p.name}</span>
                  <span className="text-xs text-gray-500">Ver mais</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}


