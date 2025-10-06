import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, getCategory, getProductsByCategory } from "@/lib/catalog";
import SearchBox from "./SearchBox";
import WhatsAppButton from "@/app/components/WhatsAppButton";

type Props = { params: Promise<{ categoria: string }> };

export function generateStaticParams() {
  return [
    { categoria: "ortopedia" },
    { categoria: "infiltracao" },
    { categoria: "coluna-vertebral" },
    { categoria: "neurocirurgia" },
  ];
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const category = getCategory(categoria);
  const products = getProductsByCategory(categoria);

  if (!category) {
    return (
      <main className="container py-16">
        <p>Categoria não encontrada.</p>
      </main>
    );
  }

  return (
    <main>
      <section className="hero-bg-catalogo-pdt h-[25vw] flex items-end">
        <div className="container py-10">
          <h1 className="fluid-h2 font-bold text-[#3E515B]">
            Catálogo › {category.name}
          </h1>
          <p className="section-subtitle fluid-body text-[#646464] max-w-2xl mt-2">
          Produtos especializados para procedimentos ortopédicos minimamente invasivos, aplicáveis em diversas articulações do corpo, como joelho, ombro, cotovelo, pulso, tornozelo, quadril e articulações menores.
          </p>
        </div>
      </section>
      <section className="py-6 pt-20">
        <div className="container">
          <div className="max-w-2xl">
            <SearchBox products={products} categorySlug={category.slug} />
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link key={p.slug} href={`/catalogo/${category.slug}/${p.slug}`} className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="">
                <Image src={p.image} alt={p.name} width={400} height={300} className="w-full h-[300px] object-contain" />
              </div>
              <div className="px-4 pb-4 flex items-center justify-between">
                <span className="font-bold fluid-label text-[#16514B]">{p.name}</span>
                <span className="small underline text-[#646464]">{p.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="py-6">
        <div className="container">
          <h3 className="font-semibold text-[#3E515B] mb-4">Mais categorias</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.filter((c) => c.slug !== category!.slug).map((c) => {
              const imageMap: Record<string, string> = {
                "ortopedia": "/assets/Ortopedia-ctg.jpg",
                "infiltracao": "/assets/infiltracao-ctg.jpg",
                "coluna-vertebral": "/assets/Coluna-ctg.jpg",
                "neurocirurgia": "/assets/Neulorogia.jpg",
              };
              const bg = imageMap[c.slug] || "/assets/bg-catalogo.jpg";
              return (
                <Link key={c.slug} href={`/catalogo/${c.slug}`} className="relative rounded-2xl overflow-hidden group border shadow-sm">
                  <div
                    className="h-[160px] sm:h-[300px] w-full"
                    style={{
                      backgroundImage: ` linear-gradient(180deg, rgba(0, 0, 0, 0.00) -3.44%, rgba(0, 75, 59, 0.90) 80.49%), url('${bg}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "top",
                    }}
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <span className="text-white font-semibold fluid-label drop-shadow">{c.name}</span>
                    <span className="mt-2 inline-flex text-nowrap small items-center justify-center btn-ctg h-8 w-28">Saiba mais</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <WhatsAppButton />
    </main>
    
  );
}


