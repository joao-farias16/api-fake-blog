import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { api, type Postagem } from "@/lib/api";
import { SiteHeader } from "@/components/blog/site-header";
import { PostGrid } from "@/components/blog/post-grid";
import { PostCard } from "@/components/blog/post-card";
import { EmptyState, ErrorState, InlineLoading, LoadingGrid } from "@/components/blog/states";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  q: z.string().optional(),
  categoria: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "FakeBlog — Blog de tecnologia consumindo a API" },
      {
        name: "description",
        content:
          "Blog de tecnologia que consome a API de estudo em Node.js + Express: postagens, categorias, busca e autores.",
      },
      { property: "og:title", content: "FakeBlog — Blog de tecnologia" },
      {
        property: "og:description",
        content: "Postagens, categorias, busca e autores vindos direto da API de estudo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { q = "", categoria = "" } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });

  const atualizar = (params: { q?: string; categoria?: string }) =>
    navigate({ search: (prev) => ({ ...prev, ...params }) });

  const categorias = useQuery({ queryKey: ["categorias"], queryFn: api.categorias });
  const destaques = useQuery({ queryKey: ["destaques"], queryFn: api.destaques });
  const autores = useQuery({ queryKey: ["autores"], queryFn: api.autores });

  const modo = q ? "busca" : categoria ? "categoria" : "todas";

  const postagens = useQuery<Postagem[]>({
    queryKey: ["postagens", modo, q, categoria],
    queryFn: () =>
      modo === "busca"
        ? api.buscar(q)
        : modo === "categoria"
          ? api.porCategoria(categoria)
          : api.postagens(),
    retry: false,
  });

  const tituloLista =
    modo === "busca"
      ? `Resultados para “${q}”`
      : modo === "categoria"
        ? `Categoria: ${categoria}`
        : "Todas as postagens";

  return (
    <div className="min-h-screen">
      <SiteHeader initialQuery={q} onSearch={(termo) => atualizar({ q: termo, categoria: "" })} />

      <section className="surface-glow border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Node.js · Express · API de estudo
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl leading-tight font-bold sm:text-5xl">
            Notícias de tecnologia servidas por uma API real
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Cada postagem, categoria e busca desta página vem de uma requisição aos endpoints da
            API.
          </p>
        </div>
      </section>

      {modo === "todas" ? (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="text-xl font-semibold">Destaques</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            As postagens mais recentes, via{" "}
            <code className="text-primary">/postagens/destaques</code>
          </p>

          <div className="mt-6">
            {destaques.isPending ? (
              <LoadingGrid items={3} />
            ) : destaques.isError ? (
              <ErrorState message={(destaques.error as Error).message} />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {destaques.data.map((post) => (
                  <PostCard key={post.index} post={post} />
                ))}
              </div>
            )}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={modo === "todas" ? "default" : "secondary"}
            size="sm"
            onClick={() => atualizar({ q: "", categoria: "" })}
          >
            Todas
          </Button>

          {categorias.isPending ? (
            <span className="text-sm text-muted-foreground">Carregando categorias…</span>
          ) : categorias.isError ? (
            <span className="text-sm text-destructive">Categorias indisponíveis</span>
          ) : (
            categorias.data.map((item) => (
              <Button
                key={item.categoria}
                variant={categoria === item.categoria ? "default" : "secondary"}
                size="sm"
                onClick={() => atualizar({ categoria: item.categoria, q: "" })}
              >
                {item.categoria} ({item.total})
              </Button>
            ))
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-semibold">{tituloLista}</h2>

        <div className="mt-6">
          {postagens.isPending ? (
            <LoadingGrid />
          ) : postagens.isError ? (
            modo === "categoria" ? (
              <EmptyState
                title="Categoria sem postagens"
                description={(postagens.error as Error).message}
              />
            ) : (
              <ErrorState message={(postagens.error as Error).message} />
            )
          ) : postagens.data.length === 0 ? (
            <EmptyState
              title="Nenhuma postagem encontrada"
              description="Tente outro termo de pesquisa ou escolha uma categoria."
            />
          ) : (
            <PostGrid posts={postagens.data} />
          )}
        </div>
      </section>

      <section id="autores" className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-semibold">Autores</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Lista vinda de <code className="text-primary">/autores</code>
          </p>

          <div className="mt-6">
            {autores.isPending ? (
              <InlineLoading label="Carregando autores…" />
            ) : autores.isError ? (
              <ErrorState message={(autores.error as Error).message} />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {autores.data.map((autor) => (
                  <Link
                    key={autor.nome}
                    to="/autor/$nome"
                    params={{ nome: autor.nome }}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
                  >
                    <img
                      src={autor.profileThumbImage}
                      alt={autor.nome}
                      className="size-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{autor.nome}</p>
                      <p className="text-xs text-muted-foreground">
                        {autor.total} {autor.total === 1 ? "postagem" : "postagens"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-muted-foreground">
          FakeBlog — frontend consumindo a API de estudo em Node.js + Express.
        </div>
      </footer>
    </div>
  );
}
