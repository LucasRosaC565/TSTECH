import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ArtigosPage() {
  let artigos: Array<{ slug: string; title: string; excerpt: string; image: string; date: Date }>; 
  try {
    artigos = await prisma.article.findMany({
      orderBy: { date: "desc" },
      select: { slug: true, title: true, excerpt: true, image: true, date: true },
    });
  } catch {
    artigos = [];
  }
  return (
    <main>
      <section className="hero-bg-artigos xl:mt-32 mt-20 h-[28vw] min-h-[280px] flex items-center">
        <div className="container py-8">
          <h1 className="fluid-h2 font-bold text-[#3E515B]">Artigos</h1>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artigos.map((a) => (
            <Link key={a.slug} href={`/artigos/${a.slug}`} className="block">
              <article className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition">
                <Image src={a.image} alt={a.title} width={480} height={320} className="w-full h-[160px] object-cover" />
                <div  className="p-4">
                  <h3 className="font-bold text-[#3E515B] mb-2 fluid-label line-clamp-2">{a.title}</h3>
                  <p className="small text-[#646464] mb-3 line-clamp-3">{a.excerpt}</p>
                  <span className="block font-semibold small text-gray-500 mb-3">{new Date(a.date).toLocaleDateString("pt-BR")}</span>
                  <span className="small text-[#16514B] underline">Ler mais</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}


