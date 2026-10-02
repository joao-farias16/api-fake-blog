import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Database, Monitor, Server } from "lucide-react";

import { SiteHeader } from "@/components/blog/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — FakeBlog" },
      {
        name: "description",
        content:
          "O que é o FakeBlog: projeto de estudo de um blog de tecnologia cujo frontend consome uma API própria.",
      },
      { property: "og:title", content: "Sobre — FakeBlog" },
      {
        property: "og:description",
        content: "Projeto de estudo: um blog de tecnologia consumindo uma API própria.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

const tecnologias = [
  {
    grupo: "Frontend",
    itens: [
      "React 19",
      "TypeScript",
      "TanStack Start",
      "TanStack Router",
      "TanStack Query",
      "Tailwind CSS 4",
      "shadcn/ui + Radix UI",
      "lucide-react",
      "Recharts",
      "Zod",
    ],
  },
  { grupo: "API", itens: ["Node.js", "Express", "CORS", "Dados simulados em arrays"] },
  { grupo: "Build e deploy", itens: ["Vite", "Nitro", "Vercel", "ESLint", "Prettier"] },
];

const funcionalidades = [
  "Lista de postagens com destaques das mais recentes",
  "Filtro por categoria e busca feita pela API",
  "Página individual de cada postagem",
  "Lista de autores e página com as postagens de cada um",
  "Favoritos salvos no navegador",
  "Histórico das postagens visualizadas recentemente",
  "Estatísticas calculadas a partir dos dados da API",
  "Estados de carregamento, erro e lista vazia em todas as telas",
];

const arquitetura = [
  {
    icon: Monitor,
    titulo: "Frontend",
    texto:
      "Páginas em React com TanStack Start. Todas as requisições passam por um cliente único (src/lib/api.ts) e são gerenciadas pelo TanStack Query.",
  },
  {
    icon: Server,
    titulo: "API",
    texto:
      "Endpoints somente leitura (GET) em /api/public, servidos junto do site. A mesma API também existe como servidor Express independente na pasta backend/.",
  },
  {
    icon: Database,
    titulo: "Dados",
    texto:
      "As postagens ficam em arrays JavaScript, sem banco de dados. Categorias e autores são derivados desses dados. Favoritos e histórico ficam no localStorage do navegador.",
  },
];

function SobrePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <SiteHeader onSearch={(q) => navigate({ to: "/", search: { q } })} />

      <section className="surface-glow border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Sobre o projeto
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl leading-tight font-bold sm:text-5xl">
            Fake<span className="text-primary">Blog</span>: um blog de tecnologia feito para estudo
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
            O FakeBlog é um projeto educacional que mostra, na prática, um frontend moderno
            consumindo uma API própria. Cada postagem, categoria, autor e busca exibidos no site vem
            de uma requisição HTTP aos endpoints dessa API.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12">
        <section>
          <h2 className="text-xl font-semibold">Objetivo</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/90 sm:text-base">
            Praticar o ciclo completo de uma aplicação web: criar endpoints REST, organizar os
            dados, consumir a API no frontend e tratar cada estado da interface — carregamento,
            sucesso, lista vazia e erro. O conteúdo das postagens é simulado; o foco está na
            comunicação entre as partes, não no volume de dados.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Arquitetura</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {arquitetura.map(({ icon: Icon, titulo, texto }) => (
              <div key={titulo} className="rounded-xl border border-border bg-card p-5">
                <span className="grid size-9 place-items-center rounded-lg bg-primary/15 text-primary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold">{titulo}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{texto}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Fluxo: página → <code className="text-primary">src/lib/api.ts</code> →{" "}
            <code className="text-primary">/api/public/…</code> →{" "}
            <code className="text-primary">backend/lib/blog.js</code> → dados.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Principais funcionalidades</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {funcionalidades.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Tecnologias utilizadas</h2>
          <div className="mt-6 space-y-5">
            {tecnologias.map(({ grupo, itens }) => (
              <div key={grupo}>
                <h3 className="text-sm font-semibold text-muted-foreground">{grupo}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {itens.map((item) => (
                    <Badge key={item} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Propósito educacional</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            O FakeBlog não tem login, cadastro nem banco de dados de propósito: ele é pequeno o
            suficiente para ser lido do começo ao fim e serve como referência de como estruturar um
            frontend que depende de uma API.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/">
                Ver postagens
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/estatisticas">Ver estatísticas</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
