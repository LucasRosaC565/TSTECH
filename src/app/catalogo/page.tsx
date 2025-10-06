import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import WhatsAppButton from "../components/WhatsAppButton";
export const metadata = {
  title: "Catálogo | TS Tech & Health",
};

export default function CatalogoPage() {
  const cards = [
    { slug: "ortopedia", title: "Ortopedia", img: "/assets/Ortopedia-ctg.jpg" },
    {
      slug: "infiltracao",
      title: "Infiltração",
      img: "/assets/infiltracao-ctg.jpg",
    },
    {
      slug: "coluna-vertebral",
      title: "Coluna Vertebral",
      img: "/assets/Coluna-ctg.jpg",
    },
    {
      slug: "neurocirurgia",
      title: "Neurocirurgia",
      img: "/assets/Neulorogia.jpg",
    },
  ];
  return (
    <main>
      <section className="relative flex items-center md:h-[30vw] h-[70vw]  hero-bg-catalogo">
        <div className="container flex items-center py-10 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            <div>
              <h1 className="section-title text-[#3E515B] fluid-h2 ">
                Catálogo de Produtos Exclusivos
              </h1>
              <p className=" text-[#646464] mt-2 fluid-body max-w-xl">
                Explore nossas especialidades e descubra a linha de produtos da
                TS Tech & Health.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10">
        <div className="mx-auto w-fit grid grid-cols-1  lg:grid-cols-[repeat(2,max-content)] gap-6">
          {cards.map((c) => (
            <Link
              key={c.slug}
              href={`/catalogo/${c.slug}`}
              className="group relative overflow-hidden rounded-3xl p-5 text-white lg:w-[25vw] lg:h-[20vw] md:w-[40vw] md:h-[30vw] w-[60vw] h-[50vw] flex flex-col justify-end"
              style={{
                background:
                  `linear-gradient(182deg, rgba(0, 0, 0, 0.00) -4.59%, rgba(0, 75, 59, 0.90) 77.24%), url(${c.img}) top / cover no-repeat`,
              }}
            >
              <div className="relative">
                <h3 className="fluid-h2 font-bold drop-shadow-md">{c.title}</h3>
                <span className="mt-2 inline-flex text-[#16514B] btn-ctg fluid-body">
                  Saiba mais
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <WhatsAppButton />
    </main>
  );
}
