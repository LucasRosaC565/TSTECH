export type Category = {
  slug: string;
  name: string;
  banner?: string;
};

export const CATEGORIES: Category[] = [
  { slug: "ortopedia", name: "Ortopedia" },
  { slug: "infiltracao", name: "Infiltração" },
  { slug: "coluna-vertebral", name: "Coluna Vertebral" },
  { slug: "neurocirurgia", name: "Neurocirurgia" },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export type Product = {
  slug: string;
  name: string;
  image: string;
  images?: string[];
  price?: string;
};

export function getProductsByCategory(_categorySlug: string): Product[] {
  // Placeholder de produtos até integração real
  const base: Product = {
    slug: "blue-foot-2-7mm",
    name: "Blue Foot 2.7mm",
    image: "/assets/Produto.png",
    price: "Ver mais",
  };

  return Array.from({ length: 12 }).map((_, i) => ({
    ...base,
    slug: i === 0 ? base.slug : `${base.slug}-${i + 1}`,
  }));
}

export function getProduct(
  categorySlug: string,
  productSlug: string
): Product | undefined {
  return getProductsByCategory(categorySlug).find((p) => p.slug === productSlug);
}


