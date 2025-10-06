export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  content: string[]; // paragraphs
};

export const ARTICLES: Article[] = Array.from({ length: 9 }).map((_, i) => ({
  slug: i === 0 ? "problemas-no-joelho" : `problemas-no-joelho-${i + 1}`,
  title: "Problemas no Joelho? Saiba o que fazer...",
  excerpt:
    "Se você sente dor ou desconforto no joelho, não ignore! Descubra as causas mais comuns e as melhores formas de tratamento para recuperar a saúde e mobilidade da articulação.",
  date: "Sexta-Feira, 26 de setembro de 2025",
  image: "/assets/img-artigo.jpg",
  content: [
    "A dor no joelho é um problema que pode surgir devido a diversas causas, desde lesões até o desgaste natural das articulações.",
    "Entre as causas mais comuns estão lesões ligamentares, tendinites, condromalácia e osteoartrite.",
    "O tratamento pode incluir fisioterapia, fortalecimento muscular, uso de órteses, infiltrações e, em alguns casos, cirurgia.",
    "Sempre busque avaliação médica especializada para um diagnóstico preciso e um plano de tratamento adequado.",
  ],
}));

export function getArticles(): Article[] {
  return ARTICLES;
}

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}


