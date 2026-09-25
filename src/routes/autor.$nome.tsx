import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { api } from "@/lib/api";
import { SiteHeader } from "@/components/blog/site-header";
import { PostGrid } from "@/components/blog/post-grid";
import { EmptyState, LoadingGrid } from "@/components/blog/states";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/autor/$nome")({
  head: () => ({
    meta: [
      { title: "Autor — FakeBlog" },
      {
        name: "description",
        content: "Postagens de um autor específico, carregadas pelo endpoint /autor/:nome.",
      },
      { property: "og:title", content: "Autor — FakeBlog" },
      { property: "og:description", content: "Todas as postagens publicadas por um autor." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AutorPage,
});

function AutorPage() {
  const { nome } = Route.useParams();
  const navigate = useNavigate();

  const postagens = useQuery({
    queryKey: ["autor", nome],
    queryFn: () => api.porAutor(nome),
    retry: false,
  });

  return (
    <div className="min-h-screen">
      <SiteHeader onSearch={(q) => navigate({ to: "/", search: { q } })} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden />
            Voltar para as postagens
          </Link>
        </Button>

        <h1 className="text-2xl font-bold sm:text-3xl">Postagens de {nome}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Consultando <code className="text-primary">/autor/{nome}</code>
        </p>

        <div className="mt-8">
          {postagens.isPending ? (
            <LoadingGrid items={3} />
          ) : postagens.isError ? (
            <EmptyState
              title="Nenhuma postagem para este autor"
              description={(postagens.error as Error).message}
            />
          ) : (
            <PostGrid posts={postagens.data} />
          )}
        </div>
      </div>
    </div>
  );
}
