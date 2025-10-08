"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  // Lógica de ativação de menu baseada em scroll (conforme solicitado)
  useEffect(() => {
    if (pathname !== "/") return;
    const li = document.querySelectorAll(".links");
    const header = document.querySelector(".header") as HTMLElement | null;

    function activeMenu() {
      const headerHeight = header ? header.offsetHeight : 0;
      const scrollPosition = window.scrollY + headerHeight + 1;
      // Parear links → seções mantendo o mesmo índice e ordem do menu
      const pairs = Array.from(li).map((a) => {
        const targetSel = (a as HTMLElement).getAttribute("data-target") ||
          (a as HTMLAnchorElement).getAttribute("href") || "";
        const el = targetSel.startsWith("#")
          ? (document.querySelector(targetSel) as HTMLElement | null)
          : null;
        return { link: a as HTMLElement, section: el };
      });

      let menuIndex = 0;
      for (let i = 0; i < pairs.length; i++) {
        const sec = pairs[i].section;
        if (!sec) continue;
        const top = sec.getBoundingClientRect().top + window.pageYOffset;
        if (scrollPosition >= top) {
          menuIndex = i;
        } else {
          break;
        }
      }
      li.forEach((ltx) => {
        ltx.classList.remove("active");
      });
      const target = li[menuIndex] as HTMLElement | undefined;
      if (target) {
        target.classList.add("active");
      }
    }

    activeMenu();
    window.addEventListener("scroll", activeMenu, { passive: true });
    window.addEventListener("resize", activeMenu);
    return () => {
      window.removeEventListener("scroll", activeMenu);
      window.removeEventListener("resize", activeMenu);
    };
  }, [pathname]);

  // smooth-scroll para âncoras
  function onAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, target: string) {
    if (!target.startsWith("#")) return;
    e.preventDefault();
    // Se não estamos na home, navegamos para a home com o hash
    if (pathname !== "/") {
      router.push(`/${target}`.replace("//#", "/#").replace("//", "/"));
      return;
    }
    const el = document.querySelector(target) as HTMLElement | null;
    if (!el) return;
    window.history.replaceState(null, "", target);
    const header = document.querySelector(".header");
    const headerH = header ? (header as HTMLElement).offsetHeight : 120;
    const y = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 20);
    window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <nav className="hidden md:flex  items-center gap-6 small font-medium">
      <a href="#inicio" onClick={(e) => onAnchorClick(e, "#inicio")} className={`links small text-[#646464] hover:text-[#16514B] hover:underline`}>Início</a>
      <a href="#sobre" onClick={(e) => onAnchorClick(e, "#sobre")} className={`links small text-[#646464] hover:text-[#16514B] hover:underline`}>Sobre nós</a>
      <a href="#artigos" onClick={(e) => onAnchorClick(e, "#artigos")} className={`links small text-[#646464] hover:text-[#16514B] hover:underline`}>Artigos</a>
      <a href="#convenios" onClick={(e) => onAnchorClick(e, "#convenios")} className={`links small text-[#646464] hover:text-[#16514B] hover:underline`}>Convênios</a>
      <a href="#contato" onClick={(e) => onAnchorClick(e, "#contato")} className={`links small text-[#646464] hover:text-[#16514B] hover:underline`}>Contato</a>
      <Link href="/catalogo" data-target="#produtos" className={`links small btn-nav h-10 px-5 ${pathname.startsWith("/catalogo") ? "text-[#16514B] underline" : "text-[#646464] hover:text-[#16514B] hover:underline"}`}>Produtos</Link>
    </nav>
  );
}



