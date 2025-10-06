"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
type Product = { slug: string; name: string; image: string };

type Props = {
  products: Product[];
  categorySlug: string;
};

export default function SearchBox({ products, categorySlug }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Product[];
    return products
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 6);
  }, [products, query]);

  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Pesquisar produto"
        placeholder="Pesquisar produto"
        className="w-full rounded-full border border-gray-200 bg-white text-[#646464] pl-10 pr-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16514B33] focus:border-[#16514B]"
      />

      {filtered.length > 0 && (
        <div className="absolute z-10 mt-2 w-full rounded-xl border bg-white shadow-lg">
          <ul className="max-h-80 overflow-auto py-2">
            {filtered.map((p) => (
              <li key={p.slug} className="">
                <Link
                  href={`/catalogo/${categorySlug}/${p.slug}`}
                  className="grid grid-cols-[72px_1fr_auto] items-center gap-3 px-3 py-2 hover:bg-gray-50"
                  onClick={() => setQuery("")}
                >
                  <div className="h-[56px] w-[72px] bg-gray-50 rounded-md flex items-center justify-center">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={72}
                      height={56}
                      className="h-[56px] w-[72px] object-contain"
                    />
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-medium text-gray-800 truncate">{p.name}</div>
                    {/* preço removido */}
                  </div>
                  <span className="text-xs text-[#16514B] underline">Ver mais</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


