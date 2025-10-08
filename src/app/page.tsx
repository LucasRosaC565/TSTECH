"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import WhatsAppButton from "./components/WhatsAppButton";


function Hero() {
  return (
    <section id="inicio" className="anchor-offset relative xl:mt-32 mt-20 overflow-hidden hero-bg">
      <div className="container grid grid-cols-1 lg:grid-cols-2 items-center gap-12 py-12 lg:py-[12vw]">
        <div className="place-self-center text-center md:text-left z-10">
          <h1 className="fluid-h2 font-bold md:max-w-full max-w-86 text-[#3E515B] mb-4">
            Soluções Minimamente Invasivas para Cirurgias de Alta Tecnologia
          </h1>
          <p className="text-[#646464] mb-8 max-w-86 md:max-w-xl">
            Equipamentos Cirúrgicos de alta qualidade para máxima precisão e
            segurança.
          </p>
          <div className="flex gap-3 justify-center md:justify-start">
            <Link href="/catalogo" className="btn-primary">
              {" "}
              Confira o catálogo agora!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="anchor-offset items-center flex justify-center py-20">
      <div className="container">
        <div className="grid grid-cols-1 place-items-center lg:place-items-start lg:grid-cols-[360px_1fr] gap-10 items-start">
          <h2 className="section-title fluid-display">
            Sobre <span className="hidden lg:hidden">Nós</span>
            <br className="hidden lg:block" />
            Nós
          </h2>
          <p className="section-subtitle text-center lg:text-left mb-12 max-w-9xl">
            A TS Tech & Health atua desde 2021 no mercado de produtos médicos,
            oferecendo soluções inovadoras e de alta qualidade nas áreas de
            Coluna, Neurocirurgia, Ortopedia e Infiltração. Nosso compromisso é
            unir tecnologia, ética e excelência no atendimento para garantir
            segurança, confiança e melhores resultados a pacientes e
            profissionais da saúde.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 md:ml-12 gap-6">
          {[
            {
              title: "Missão",
              img: "/assets/img1-sobre.jpg",
              badge: "/assets/Alvo.svg",
              text: "Fomentar a inovação com foco nos melhores resultados a pacientes e profissionais.",
            },
            {
              title: "Visão",
              img: "/assets/img2-sobre.jpg",
              badge: "/assets/Olho.svg",
              text: "Valorizar o trabalho em equipe garantindo qualidade e segurança.",
            },
            {
              title: "Valores",
              img: "/assets/img3-sobre.jpg",
              badge: "/assets/Maos.svg",
              text: "Compromisso com a excelência e melhoria contínua em nossas ações.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="relative bg-white rounded-2xl shadow-sm border overflow-hidden"
            >
              <Image
                src={card.img}
                alt={card.title}
                width={480}
                height={320}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="w-full h-[220px] object-cover"
              />
              <Image
                src={card.badge}
                alt=""
                width={40}
                height={40}
                sizes="40px"
                className="absolute top-0 left-4 w-12 h-14"
              />
              <div className="p-5">
                <h3 className="font-bold fluid-h2 leading-7 text-[#16514B] mb-5">
                  {card.title}
                </h3>
                <p className="text-[#646464] fluid-body leading-7">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tecnologia() {
  const items = [
    { icon: "/assets/Estrela.svg", label: "Produtos de Qualidade" },
    { icon: "/assets/Equipe.svg", label: "Equipe Treinada" },
    { icon: "/assets/Certificacao.svg", label: "Certificação" },
    { icon: "/assets/Emergencia.svg", label: "Emergência" },
  ];
  return (
    <section className="anchor-offset relative justify-center items-center py-18 bg-white">
      <div className="container gap-12 justify-center items-center flex lg:justify-start relative z-10 lg:pr-[740px] xl:pr-[840px] 2xl:pr-[900px]">
        <div className="max-w-[760px] text-center justify-center lg:text-left xl:max-w-[820px]">
          <div className="flex flex-col items-center lg:items-start justify-center">
            <h2 className="section-title max-w-xl fluid-display mb-12">
              Tecnologia Avançada para Cirurgias Precisas
            </h2>

            <p className="section-subtitle max-w-xl mb-12">
              Especializada em materiais minimamente Invasivas para Cirurgias, a
              TS Tech & Health oferece mais de 70 produtos de alta qualidade
              para cirurgias de Coluna, Neurocirurgia, Ortopedia e Infiltração.
              Com atendimento especializado em todo o Brasil, garantimos
              soluções inovadoras, seguras e em conformidade com as normas da
              Anvisa.
              <strong>
                <br />
                Nosso compromisso é fornecer excelência no atendimento e
                estabelecer parcerias duradouras, visando sempre os melhores
                resultados para profissionais da saúde e seus pacientes.
              </strong>
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-2 gap-x-[20vw] gap-3 lg:gap-4 mb-6">
              {items.map((it) => (
                <li key={it.label} className="flex items-center gap-1 md:gap-3">
                  <Image src={it.icon} alt="" width={30} height={30} />
                  <span className="text-[#16514B] text-nowrap small-tec font-bold">
                    {it.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="lg:hidden w-[80vw] h-[60vw] right-0 absolute  rounded-[185px_0_0_185px]"
        style={{
          backgroundImage:
            "linear-gradient(220deg, rgba(255, 255, 255, 0.50) 9.01%, rgba(0, 158, 124, 0.50) 92.14%), url('/assets/img-tec.jpg')",
          backgroundColor: "lightgray",
          backgroundPosition: "-145.43px 0px",
          backgroundSize: "159.198% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="hidden lg:block absolute inset-y-0 right-0">
        <div
          className="h-full w-[35vw] rounded-[185px_0_0_185px]"
          style={{
            backgroundImage:
              "linear-gradient(220deg, rgba(255, 255, 255, 0.50) 9.01%, rgba(0, 158, 124, 0.50) 92.14%), url('/assets/img-tec.jpg')",
            backgroundColor: "lightgray",
            backgroundPosition: "-145.43px 0px",
            backgroundSize: "159.198% 100%",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </section>
  );
}

function Produtos() {
  const cats = [
    { icon: "/assets/Coluna.svg", name: "Coluna" },
    { icon: "/assets/Ortopedia.svg", name: "Ortopedia" },
    { icon: "/assets/Cerebro.svg", name: "Neurocirurgia" },
    { icon: "/assets/Osso.svg", name: "Infiltração" },
  ];
  return (
    <section id="produtos" className="anchor-offset mt-[60vw] lg:mt-14 py-14">
      <div className="container">
        <h2 className="section-title fluid-display text-center mb-12">
          Nossa Linha de Produtos
        </h2>
        <p className="text-[#646464] max-w-3xl mx-auto text-center mb-16">
          Descubra nossa linha de equipamentos e materiais médicos, feitos para
          garantir precisão e segurança em suas cirurgias.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 mb-16 gap-4">
          {cats.map((c) => (
            <div
              key={c.name}
              className="bg-white rounded-xl border shadow-sm p-6 flex flex-col items-center gap-3"
            >
              <Image src={c.icon} alt={c.name} width={40} height={40} />
              <span className="font-bold text-[#575555]">{c.name}</span>
            </div>
          ))}
        </div>
        <div className="text-center pb-14 mt-8">
          <Link href="/catalogo" className="btn-primary">
            Veja nosso catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}

function Artigos() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<
    Array<{
      slug: string;
      title: string;
      excerpt: string;
      image: string;
      date: string;
    }>
  >([]);
  const handleScroll = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstChild = el.querySelector<HTMLElement>("article");
    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const cardWidth = firstChild
      ? firstChild.getBoundingClientRect().width
      : el.clientWidth / 3;
    const amount = cardWidth * 3 + gap * 2; // avançar/recuar exatamente 3 cards
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/articles", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const items = (data.items || []).map(
          (a: {
            slug: string;
            title: string;
            excerpt: string;
            image: string;
            date: string;
          }) => ({
            slug: a.slug,
            title: a.title,
            excerpt: a.excerpt,
            image: a.image,
            date: a.date,
          })
        );
        if (mounted) setArticles(items);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <section id="artigos" className="anchor-offset py-14 bg-white">
      <div className="container">
        <div className="flex items-center justify-between mb-16">
          <h2 className="section-title fluid-display">Artigos</h2>
          <Link
            className="text-sm font-medium text-teal-800 hover:underline"
            href="/artigos"
          >
            Ver mais Artigos
          </Link>
        </div>
        <div className="relative">
          <button
            aria-label="Anterior"
            onClick={() => handleScroll("left")}
            className="hidden sm:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center text-black"
          >
            <span className="sr-only">Anterior</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 pr-1"
          >
            {articles.map((c) => (
              <Link
                key={c.slug}
                href={`/artigos/${c.slug}`}
                className="flex-shrink-0 w-[calc(100%_-_16px)] sm:w-[calc(50%_-_12px)] md:w-[calc(33.333%_-_16px)] bg-white rounded-xl shadow-sm border overflow-hidden snap-start"
              >
                <Image
                  src={c.image || "/assets/img-artigo.jpg"}
                  alt={c.title}
                  width={480}
                  height={320}
                  className="w-full h-[180px] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-[#3E515B] mb-8">
                    {c.title}
                  </h3>
                  <p className="text-sm text-[#646464] mb-3 line-clamp-3">
                    {c.excerpt}
                  </p>
                  <span className="block text-xs text-gray-500">
                    {new Date(c.date).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <button
            aria-label="Próximo"
            onClick={() => handleScroll("right")}
            className="hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 h-6 w-6 items-center justify-center text-black"
          >
            <span className="sr-only">Próximo</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <main className="font-sans">
      <section className="reveal"><Hero /></section>
      <section className="reveal"><Sobre /></section>
      <TamanhoSeparador />
      <section className="reveal"><Tecnologia /></section>
      <section className="reveal"><Produtos /></section>
      <section className="reveal"><Artigos /></section>
      <section className="reveal"><ProdutosDestaque /></section>
      <section className="reveal"><LogosMarquee /></section>
      <WhatsAppButton />
    </main>
  );
}

function TamanhoSeparador() {
  return <div className="h-2" />;
}

function LogosMarquee() {
  const logos = [
    "/assets/bradesco.svg",
    "/assets/cabesp.svg",
    "/assets/Cassi.svg",
    "/assets/unimed.svg",
    "/assets/unimed_rio.svg",
    "/assets/saude_caixa.svg",
    "/assets/metrus.svg",
    "/assets/porto_seguro.svg",
    "/assets/saude_petrobras.svg",
    "/assets/Omint.svg",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const clone = cloneRef.current;
    if (!container || !clone) return;

    // Define posições iniciais
    let offset = 0;
    const totalWidth = container.scrollWidth;

    // Função de animação contínua
    function animate() {
      offset -= 0.8; // velocidade (px/frame) → ajuste conforme quiser
      if (offset <= -totalWidth) offset = 0;

      container?.style.setProperty("transform", `translateX(${offset}px)`);
clone?.style.setProperty("transform", `translateX(${offset + totalWidth}px)`);

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <section id="convenios" className="anchor-offset py-28 bg-white">
      <div className="relative overflow-hidden w-full h-16 sm:h-20">
        {/* Faixa principal */}
        <div
          ref={containerRef}
          className="flex gap-4 items-center whitespace-nowrap will-change-transform absolute left-0 top-0"
        >
          {logos.map((src, idx) => (
            <div
              key={`logo-${idx}`}
              className="relative inline-block h-16 sm:h-20 w-52 sm:w-64"
            >
              <Image src={src} alt="" fill className="object-contain" />
            </div>
          ))}
        </div>

        {/* Faixa clonada para continuidade */}
        <div
          ref={cloneRef}
          className="flex gap-4 items-center whitespace-nowrap will-change-transform absolute left-0 top-0"
        >
          {logos.map((src, idx) => (
            <div
              key={`clone-${idx}`}
              className="relative inline-block h-16 sm:h-20 w-52 sm:w-64"
            >
              <Image src={src} alt="" fill className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ProdutosDestaque() {
  const [products, setProducts] = useState<
    Array<{ slug: string; name: string; image: string; category: string }>
  >([]);
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/products", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const items = (data.items || []).map(
          (p: {
            slug: string;
            name: string;
            image: string;
            category: string;
          }) => ({
            slug: p.slug,
            name: p.name,
            image: p.image,
            category: p.category,
          })
        );
        if (mounted) setProducts(items);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (products.length <= 4 || paused) return;
    const id = setInterval(() => {
      setStart((s) => (s + 4) % products.length);
    }, 2000);
    return () => clearInterval(id);
  }, [products.length, paused]);

  const getWindow = () => {
    if (products.length === 0) return [] as typeof products;
    const out: typeof products = [] as unknown as typeof products;
    for (let i = 0; i < Math.min(4, products.length); i++) {
      out.push(products[(start + i) % products.length]);
    }
    return out;
  };

  const shown = getWindow();

  const step = (dir: "left" | "right") => {
    if (products.length === 0) return;
    const delta = dir === "right" ? 4 : -4;
    setStart((s) => (s + delta + products.length) % products.length);
  };

  return (
    <section id="convenios" className="anchor-offset bg-white pt-20 py-4">
      <div className="container text-center">
        <h2 className="section-title fluid-display mb-3">
          Produtos Exclusivos, Convênios Especializados e Ampla Área de Atuação
        </h2>
        <p className="text-[#646464] max-w-5xl mx-auto mb-10">
          Oferecemos produtos exclusivos e convênios especiais para garantir
          qualidade e condições diferenciadas para você e seus pacientes.
          Atuamos nas seguintes áreas:{" "}
          <b>
            São Paulo, Rio de Janeiro, Bahia, Pernambuco, Tocantins, Brasília e
            Espírito Santo
          </b>
          , com convenções exclusivas para cada região, proporcionando acesso a
          condições especiais e atendimento personalizado.
        </p>
      </div>
    </section>
  );
}
