"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CATEGORIES } from "@/lib/catalog";

type ProductInput = { name: string; slug: string; image: string; price: string; category: string };
type ArticleInput = { title: string; slug: string; image: string; excerpt: string; content: string };
type ProductItem = { slug: string; name: string; image: string; category: string; images?: string[] | null; description?: string | null };
type ArticleItem = { slug: string; title: string; image: string; excerpt: string; content: string };

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [pForm, setPForm] = useState<ProductInput>({ name: "", slug: "", image: "", price: "", category: "" });
  const [pDesc, setPDesc] = useState<string>("");
  const [aForm, setAForm] = useState<ArticleInput>({ title: "", slug: "", image: "", excerpt: "", content: "" });
  const [pImages, setPImages] = useState<string[]>([]);
  const [editProductSlug, setEditProductSlug] = useState<string | null>(null);
  const [editArticleSlug, setEditArticleSlug] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "articles" | "import">("products");
  const [isUploadingProduct, setIsUploadingProduct] = useState(false);
  const [isUploadingArticle, setIsUploadingArticle] = useState(false);

  async function loadData() {
    const safeJson = async (res: Response) => {
      if (!res.ok) return { items: [] };
      try { return await res.json(); } catch { return { items: [] }; }
    };
    const [prRes, arRes] = await Promise.all([
      fetch("/api/admin/products", { cache: "no-store" }),
      fetch("/api/admin/articles", { cache: "no-store" }),
    ]);
    const [pr, ar] = await Promise.all([safeJson(prRes), safeJson(arRes)]);
    setProducts((pr.items || []) as ProductItem[]);
    setArticles((ar.items || []) as ArticleItem[]);
  }

  useEffect(() => { loadData(); }, []);

  function slugify(input: string) {
    return input
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  async function createProduct(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...pForm, images: pImages, description: pDesc }) });
    if (res.ok) { setPForm({ name: "", slug: "", image: "", price: "", category: "" }); setPImages([]); setPDesc(""); loadData(); }
  }
  async function createArticle(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/articles", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(aForm) });
    if (res.ok) { setAForm({ title: "", slug: "", image: "", excerpt: "", content: "" }); loadData(); }
  }

  async function deleteProduct(slug: string) {
    if (!confirm("Excluir produto?")) return;
    await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    loadData();
  }
  async function deleteArticle(slug: string) {
    if (!confirm("Excluir artigo?")) return;
    await fetch(`/api/admin/articles/${slug}`, { method: "DELETE" });
    loadData();
  }
  async function startEditProduct(p: ProductItem) {
    setEditProductSlug(p.slug);
    setPForm({ name: p.name, slug: p.slug, image: p.image, price: "", category: p.category });
    setPImages(Array.isArray(p.images) ? p.images : []);
    setPDesc(p.description || "");
  }
  async function startEditArticle(a: ArticleItem) {
    setEditArticleSlug(a.slug);
    setAForm({ title: a.title, slug: a.slug, image: a.image, excerpt: a.excerpt, content: a.content });
  }
  async function saveProductEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editProductSlug) return;
    const { slug: newSlug, name, image, category } = pForm;
    const res = await fetch(`/api/admin/products/${editProductSlug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, image, category, description: pDesc, images: pImages, newSlug }) });
    if (res.ok) { setEditProductSlug(null); setPForm({ name: "", slug: "", image: "", price: "", category: "" }); setPImages([]); loadData(); }
  }
  async function saveArticleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editArticleSlug) return;
    const { slug: newSlug, title, image, excerpt, content } = aForm;
    const res = await fetch(`/api/admin/articles/${editArticleSlug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, image, excerpt, content, newSlug }) });
    if (res.ok) { setEditArticleSlug(null); setAForm({ title: "", slug: "", image: "", excerpt: "", content: "" }); loadData(); }
  }

  async function uploadImage(file: File): Promise<string | null> {
    const data = new FormData();
    data.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: data });
    if (!res.ok) {
      // Em produção, fallback: não fazer upload, apenas retorna null
      return null;
    }
    const json = await res.json();
    return json.url as string;
  }

  async function onProductFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0];
    if (!f) return;
    setIsUploadingProduct(true);
    const url = await uploadImage(f);
    setIsUploadingProduct(false);
    if (url) setPForm({ ...pForm, image: url });
  }

  async function onProductFilesChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(ev.target.files || []);
    if (!files.length) return;
    setIsUploadingProduct(true);
    const uploaded: string[] = [];
    for (const f of files) {
      const url = await uploadImage(f);
      if (url) uploaded.push(url);
    }
    setIsUploadingProduct(false);
    setPImages((prev) => {
      const merged = [...prev, ...uploaded];
      return merged.filter((url, idx, arr) => url && arr.indexOf(url) === idx);
    });
    if (!pForm.image && uploaded[0]) setPForm({ ...pForm, image: uploaded[0] });
  }

  async function onArticleFileChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0];
    if (!f) return;
    setIsUploadingArticle(true);
    const url = await uploadImage(f);
    setIsUploadingArticle(false);
    if (url) setAForm({ ...aForm, image: url });
  }

  return (
    <main className="container xl:mt-32 mt-20 py-10">
      <h1 className="fluid-h2 font-bold text-[#3E515B] mb-6">Admin</h1>

      <div className="bg-white rounded-full border shadow-sm inline-flex p-1 mb-6">
        <button onClick={() => setActiveTab("products")} className={`px-4 py-2 rounded-full text-sm ${activeTab === "products" ? "bg-[#16514B] text-white" : "text-[#16514B]"}`}>Produtos</button>
        <button onClick={() => setActiveTab("articles")} className={`px-4 py-2 rounded-full text-sm ${activeTab === "articles" ? "bg-[#16514B] text-white" : "text-[#16514B]"}`}>Artigos</button>
        <button onClick={() => setActiveTab("import")} className={`px-4 py-2 rounded-full text-sm ${activeTab === "import" ? "bg-[#16514B] text-white" : "text-[#16514B]"}`}>Importar</button>
      </div>

      {activeTab === "products" && (
      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white text-black rounded-2xl border shadow-sm p-6">
          <h2 className="font-semibold mb-4">{editProductSlug ? "Editar Produto" : "Criar Produto"}</h2>
          <form onSubmit={editProductSlug ? saveProductEdit : createProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="input" placeholder="Nome" value={pForm.name} onChange={(e) => { const name = e.target.value; setPForm({ ...pForm, name, slug: slugify(name) }); }} required />
            <input className="input bg-gray-50" placeholder="Slug" value={pForm.slug} readOnly />
            <div className="sm:col-span-2 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <label className="btn-outline cursor-pointer">
                  Importar imagem
                  <input type="file" accept="image/*" className="hidden" onChange={onProductFileChange} />
                </label>
                <label className="btn-outline cursor-pointer">
                  Importar imagens (galeria)
                  <input type="file" accept="image/*" multiple className="hidden" onChange={onProductFilesChange} />
                </label>
                {isUploadingProduct && <span className="text-xs text-gray-600">Enviando...</span>}
              </div>
              <div className="flex items-center gap-2">
                <input className="input flex-1" placeholder="Imagem (URL) - opcional" value={pForm.image} onChange={(e) => setPForm({ ...pForm, image: e.target.value })} />
                {pForm.image && (
                  <button type="button" className="btn-outline h-9 px-3" onClick={() => setPForm({ ...pForm, image: "" })}>Limpar</button>
                )}
              </div>

              {pImages.length > 0 && (
                <div className="mt-2">
                  <span className="text-xs text-gray-600">Galeria (clique no × para remover)</span>
                  <div className="mt-1 flex gap-2 flex-wrap">
                    {pImages
                      .filter(Boolean)
                      .filter((url, idx, arr) => arr.indexOf(url) === idx)
                      .map((url, idx) => (
                        <div key={idx} className="relative h-16 w-24">
                          <Image src={url} alt="thumb" width={96} height={64} className="h-16 w-24 object-cover rounded border" />
                          <button
                            type="button"
                            aria-label="Remover imagem"
                            onClick={() => {
                              const next = pImages.filter((u) => u !== url);
                              setPImages(next);
                              if (pForm.image === url) {
                                setPForm({ ...pForm, image: next[0] || "" });
                              }
                            }}
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center shadow"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
            {/* campo de preço removido */}
            <select className="input sm:col-span-2" value={pForm.category} onChange={(e) => setPForm({ ...pForm, category: e.target.value })} required>
              <option value="" disabled>Selecione a categoria</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <textarea className="input sm:col-span-2 min-h-28" placeholder="Descrição do produto (como aparecerá na página). Use quebras de linha para separar parágrafos." value={pDesc} onChange={(e) => setPDesc(e.target.value)} />
            <div className="sm:col-span-2">
              <span className="text-xs text-gray-600">Pré-visualização</span>
              <div className="mt-2">
                <AdminProductPreview name={pForm.name} image={pForm.image} images={pImages} description={pDesc} />
              </div>
            </div>
            <div className="flex gap-3 sm:col-span-2">
              <button className="btn-primary cursor-pointer">{editProductSlug ? "Salvar Edição" : "Salvar Produto"}</button>
              {editProductSlug && (
                <button type="button" onClick={() => { setEditProductSlug(null); setPForm({ name: "", slug: "", image: "", price: "", category: "" }); }} className="btn-outline">Cancelar</button>
              )}
            </div>
          </form>
        </section>

        <section className="bg-white text-black rounded-2xl border shadow-sm p-6">
          <h2 className="font-semibold mb-4">Seus Produtos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {products.map((p) => (
              <div key={p.slug} className="border rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="h-36 bg-gray-50 flex items-center justify-center">
                  <Image src={p.image} alt={p.name} width={300} height={144} className="max-h-full object-contain" />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[#3E515B] truncate mr-2">{p.name}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full border text-[#16514B]">{p.category}</span>
                  </div>
                  {/* preço removido */}
                  <div className="flex gap-3 mt-3">
                    <button className="btn-outline h-8 px-3" onClick={() => startEditProduct(p)}>Editar</button>
                    <button className="h-8 px-3 rounded-full bg-red-50 text-red-700 border border-red-200" onClick={() => deleteProduct(p.slug)}>Excluir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      )}

      {activeTab === "articles" && (
        <div className="grid grid-cols-1 gap-8">
          <section className="bg-white text-black rounded-2xl border shadow-sm p-6">
            <h2 className="font-semibold mb-4">{editArticleSlug ? "Editar Artigo" : "Criar Artigo"}</h2>
            <form onSubmit={editArticleSlug ? saveArticleEdit : createArticle} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input className="input rounded-sm border-black border-1 sm:col-span-2" placeholder="Título" value={aForm.title} onChange={(e) => { const title = e.target.value; setAForm({ ...aForm, title, slug: slugify(title) }); }} required />
              <input className="input rounded-sm border-black border-1 bg-gray-50" placeholder="Slug" value={aForm.slug} readOnly />
              <div className="sm:col-span-2 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <label className="btn-outline cursor-pointer">
                    Importar capa
                    <input type="file" accept="image/*" className="hidden" onChange={onArticleFileChange} />
                  </label>
                  {isUploadingArticle && <span className="text-xs text-gray-600">Enviando...</span>}
                </div>
                <input className="input rounded-sm border-black border-1" placeholder="Imagem (URL) - opcional" value={aForm.image} onChange={(e) => setAForm({ ...aForm, image: e.target.value })} />
              </div>
              <input className="input rounded-sm border-black border-1 sm:col-span-2" placeholder="Resumo" value={aForm.excerpt} onChange={(e) => setAForm({ ...aForm, excerpt: e.target.value })} required />
              <textarea className="input rounded-sm border-black border-1 sm:col-span-2 min-h-28" placeholder={"Conteúdo:\n- Parágrafos: separe com linha em branco (\\n\\n)\n- Negrito: **texto**\n- Itálico: *texto*\n- Subtítulo: ## Meu subtítulo\n- Título secundário: # Título\n- Lista: cada linha iniciando com '- '"} value={aForm.content} onChange={(e) => setAForm({ ...aForm, content: e.target.value })} required />
              <div className="sm:col-span-2">
                <span className="text-xs text-gray-600">Pré-visualização</span>
                <div className="mt-2">
                  <AdminArticlePreview title={aForm.title} excerpt={aForm.excerpt} content={aForm.content} />
                </div>
              </div>
              <div className="flex gap-3 sm:col-span-2">
                <button className="btn-primary">{editArticleSlug ? "Salvar Edição" : "Salvar Artigo"}</button>
                {editArticleSlug && (
                  <button type="button" onClick={() => { setEditArticleSlug(null); setAForm({ title: "", slug: "", image: "", excerpt: "", content: "" }); }} className="btn-outline">Cancelar</button>
                )}
              </div>
            </form>
          </section>
          <section className="bg-white text-black rounded-2xl border shadow-sm p-6">
            <h2 className="font-semibold mb-4">Seus Artigos</h2>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
              {articles.map((a) => (
                <div key={a.slug} className="border rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="h-36 bg-gray-50 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.image} alt={a.title} className="max-h-full object-contain" />
                  </div>
                  <div className="p-3">
                    <div className="font-semibold text-[#3E515B] truncate">{a.title}</div>
                    <div className="text-xs text-gray-600 line-clamp-2 mt-1">{a.excerpt}</div>
                    <div className="flex gap-3 mt-3">
                      <button className="btn-outline h-8 px-3" onClick={() => startEditArticle(a)}>Editar</button>
                      <button className="h-8 px-3 rounded-full bg-red-50 text-red-700 border border-red-200" onClick={() => deleteArticle(a.slug)}>Excluir</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {activeTab === "import" && (
        <section className="bg-white text-black rounded-2xl border shadow-sm p-6">
          <h2 className="font-semibold mb-4">Importação em massa</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BulkImport title="Produtos" type="products" templatePath="/templates/produtos.csv" description="CSV: name,slug,image,category,description,images (images separadas por ';' e nomes de arquivo devem coincidir com os enviados)" />
            <BulkImport title="Artigos" type="articles" templatePath="/templates/artigos.csv" description="CSV: title,slug,image,excerpt,content" />
          </div>
        </section>
      )}
      <style jsx global>{`
        .input { @apply rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#16514B33] focus:border-[#16514B]; }
      `}</style>
    </main>
  );
}

function BulkImport({ title, type, templatePath, description }: { title: string; type: "products" | "articles"; templatePath: string; description: string }) {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imageErrors, setImageErrors] = useState<string[]>([]);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (csvFile) {
      const data = new FormData();
      data.append("csv", csvFile);
      for (const f of images) data.append("images", f, f.name);
      await fetch(`/api/admin/import-files?type=${type}`, { method: "POST", body: data });
      setCsvFile(null); setImages([]); setFileName(""); setText("");
      alert("Importação com arquivos enviada.");
    } else if (text.trim()) {
      await fetch(`/api/admin/import?type=${type}`, { method: "POST", headers: { "Content-Type": "text/plain" }, body: text });
      setText("");
      alert("Importação via texto enviada.");
    } else {
      alert("Envie um CSV ou cole o conteúdo.");
    }
  }
  function handleFile(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setCsvFile(f);
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result || ""));
    reader.readAsText(f);
  }
  function handleImages(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(ev.target.files || []);
    if (!files.length) return;
    const MAX_BYTES = 4 * 1024 * 1024;
    const accepted: File[] = [];
    const errors: string[] = [];
    for (const f of files) {
      if (!f.type || !f.type.startsWith("image/")) {
        errors.push(`${f.name}: formato inválido (apenas imagens)`);
        continue;
      }
      if (f.size > MAX_BYTES) {
        errors.push(`${f.name}: excede 4MB`);
        continue;
      }
      if (/[^a-zA-Z0-9_.-]/.test(f.name)) {
        errors.push(`${f.name}: nome contém espaços/acentos; será normalizado no servidor`);
      }
      accepted.push(f);
    }
    setImages((prev) => [...prev, ...accepted]);
    setImageErrors(errors);
  }
  return (
    <form onSubmit={submit} className="space-y-3">
      <h3 className="font-medium">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
      {type === "products" && (
        <div className="text-xs text-gray-700 bg-gray-50 border rounded p-3 space-y-1">
          <div><strong>Como preencher:</strong></div>
          <div>- <code>name</code>: Nome do produto.</div>
          <div>- <code>slug</code>: Identificador único (geralmente automático do nome, em minúsculas e hífens).</div>
          <div>- <code>image</code>: URL completa ou nome do arquivo da imagem principal (se enviar no campo abaixo).</div>
          <div>- <code>category</code>: slug da categoria (ex.: ortopedia, infiltracao, coluna-vertebral, neurocirurgia).</div>
          <div>- <code>description</code>: Texto descritivo (pode usar quebras de linha \n\n; no CSV, evite vírgulas ou envolva em aspas).</div>
          <div>- <code>images</code>: Lista de imagens extras separadas por ponto e vírgula <code>;</code> (ex.: <code>foto1.jpg;foto2.jpg</code>).</div>
          <div className="mt-2"><strong>Importando imagens:</strong> Anexe os arquivos em “Selecionar imagens (múltiplas)”. Os nomes devem corresponder aos informados nas colunas <code>image</code> e/ou <code>images</code>. Se usar URL (http/https), não precisa anexar o arquivo.</div>
          <div className="text-[11px] text-gray-600 mt-1">Limite por imagem: 4MB. Formatos recomendados: JPG/PNG. Use nomes sem espaços/acentos (ex.: <code>foto_01.jpg</code>).</div>
        </div>
      )}
      {type === "articles" && (
        <div className="text-xs text-gray-700 bg-gray-50 border rounded p-3 space-y-1">
          <div><strong>Como preencher:</strong></div>
          <div>- <code>title</code>, <code>slug</code>, <code>image</code>, <code>excerpt</code>, <code>content</code> são obrigatórios.</div>
          <div>- <code>content</code>: separe parágrafos com linha em branco (\n\n). Suporta <code>**negrito**</code>, <code>*itálico*</code>, <code>## Subtítulo</code>, <code># Título</code> e listas com linhas iniciadas por <code>- </code>.</div>
          <div className="mt-2"><strong>Importando imagens:</strong> Você pode usar URL completa em <code>image</code> ou anexar a imagem e referenciar pelo nome do arquivo.</div>
          <div className="mt-2"><strong>Exemplo de conteúdo:</strong></div>
          <pre className="whitespace-pre-wrap bg-white border rounded p-2 text-[11px] leading-5">
{`A tendinite no ombro é uma inflamação nos tendões, muitas vezes causada por esforço repetitivo.

**Sintomas comuns** incluem dor ao levantar o braço, fraqueza e sensibilidade local.

- Repouso relativo
- Gelo por 15–20 minutos
- Alongamentos guiados por profissional
- Avaliação médica quando a dor persiste

## Quando procurar ajuda
Se houver **dor intensa**, formigamentos, perda de força ou alteração do controle esfincteriano, busque atendimento especializado.`}
          </pre>
          <div className="mt-2">Baixe também o template pronto: <a className="underline" href="/templates/artigos.csv" download>artigos.csv</a></div>
          <div className="text-[11px] text-gray-600 mt-1">Limite por imagem: 4MB. Formatos recomendados: JPG/PNG. Use nomes sem espaços/acentos (ex.: <code>capa_artigo.jpg</code>).</div>
        </div>
      )}
      <div className="flex items-center gap-3">
        <a href={templatePath} download className="btn-outline">Baixar template</a>
        <label className="btn-outline cursor-pointer">
          Selecionar arquivo
          <input type="file" accept=".csv,.txt" className="hidden" onChange={handleFile} />
        </label>
        <label className="btn-outline cursor-pointer">
          Selecionar imagens (múltiplas)
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImages} />
        </label>
        {fileName && <span className="text-xs text-gray-600">{fileName}</span>}
      </div>
      {images.length > 0 && (
        <div className="text-[11px] text-gray-600">Imagens selecionadas: {images.length}</div>
      )}
      {imageErrors.length > 0 && (
        <div className="text-[11px] text-red-600">
          <ul className="list-disc pl-5 space-y-0.5">
            {imageErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <textarea className="input w-full min-h-32" placeholder="Ou cole o CSV aqui" value={text} onChange={(e) => setText(e.target.value)} />
      <button className="btn-primary">Importar {title}</button>
    </form>
  );
}


function AdminProductPreview({ name, image, images, description }: { name: string; image: string; images: string[]; description: string }) {
  return (
    <div className="rounded-2xl border shadow-sm bg-white p-5 w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 items-start w-full">
        <div className="h-[360px] rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden w-full">
          {image ? (
            <Image src={image} alt="Produto" width={420} height={360} className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="text-xs text-gray-400">Imagem do produto</span>
          )}
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-bold mb-3 text-[#3E515B] break-words">{name || "(Nome do produto)"}</h2>
          {description ? (
            description.split(/\n+/).map((p, i) => (
              <p key={i} className="text-gray-700 mb-3 leading-7 break-words whitespace-pre-wrap">{p}</p>
            ))
          ) : (
            <p className="text-sm text-gray-400 mb-3">Escreva a descrição acima para visualizar aqui.</p>
          )}
          <div className="flex items-center gap-4 flex-wrap">
            <a className="btn-primary cursor-default">Pedir orçamento</a>
          </div>
          {images?.length ? (
            <div className="mt-4">
              <div className="text-xs text-gray-600 mb-2">Galeria</div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {[image, ...images]
                  .filter(Boolean)
                  .filter((url, idx, arr) => arr.indexOf(url) === idx)
                  .map((url, idx) => (
                  <div key={idx} className="relative h-16 w-24 flex-shrink-0">
                    <Image src={url as string} alt="thumb" width={96} height={64} className="h-16 w-24 object-cover rounded border" />
                    {/* Remoção é controlada no formulário; apenas preview aqui */}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function AdminArticlePreview({ title, excerpt, content }: { title: string; excerpt: string; content: string }) {
  const date = new Date();
  return (
    <div className="rounded-2xl border shadow-sm overflow-hidden bg-gray-50 w-full">
      <div className="hero-bg-artigo h-36 w-full flex items-center">
        <div className="px-6">
          <p className="text-sm text-[#3E515B]">Artigos › {title ? title.split(" ")[0] + "..." : "(título)"}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="font-semibold text-[#3E515B] mb-2">{title || "(Título do artigo)"}</h2>
          {excerpt && <p className="text-sm text-gray-600 mb-3">{excerpt}</p>}
          <ArticleBodyInline content={content} />
          <span className="block text-xs text-gray-500 mt-3">{date.toLocaleDateString("pt-BR")}</span>
        </div>
      </div>
    </div>
  );
}

function ArticleBodyInline({ content }: { content: string }) {
  const blocks = (content || "").split(/\n\n+/);

  function esc(s: string) {
    return s
      .replaceAll(/&/g, "&amp;")
      .replaceAll(/</g, "&lt;")
      .replaceAll(/>/g, "&gt;")
      .replaceAll(/"/g, "&quot;")
      .replaceAll(/'/g, "&#039;");
  }
  function inline(t: string) {
    const a = esc(t);
    const b = a.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    const c = b.replace(/\*(.+?)\*/g, "<em>$1</em>");
    return c;
  }

  const elements: React.ReactNode[] = [];
  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;
    const h3 = block.match(/^##\s+(.+)/);
    if (h3) {
      elements.push(<h3 key={`h3-${elements.length}`} className="font-semibold text-[#3E515B] mb-2" dangerouslySetInnerHTML={{ __html: inline(h3[1]) }} />);
      continue;
    }
    const h2 = block.match(/^#\s+(.+)/);
    if (h2) {
      elements.push(<h2 key={`h2-${elements.length}`} className="font-bold text-[#3E515B] mb-2" dangerouslySetInnerHTML={{ __html: inline(h2[1]) }} />);
      continue;
    }
    const lines = block.split(/\n/);
    if (lines.every((l) => l.trim().startsWith("- "))) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc pl-6 text-[#646464] mb-3 leading-7">
          {lines.map((l, i) => <li key={i} dangerouslySetInnerHTML={{ __html: inline(l.replace(/^\-\s+/, "")) }} />)}
        </ul>
      );
      continue;
    }
    elements.push(<p key={`p-${elements.length}`} className="text-[#646464] mb-3 leading-7" dangerouslySetInnerHTML={{ __html: inline(block) }} />);
  }
  if (!elements.length) {
    elements.push(<p key="empty" className="text-xs text-gray-500">Escreva o conteúdo do artigo para visualizar aqui.</p>);
  }
  return <div>{elements}</div>;
}

