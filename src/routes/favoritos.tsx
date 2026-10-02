import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";

import { api } from "@/lib/api";
import { selecionarPorIndices, useFavoritos } from "@/lib/local-storage";
import { SiteHeader } from "@/components/blog/site-header";
import { PostGrid } from "@/components/blog/post-grid";
import { EmptyState, ErrorState, LoadingGrid, VoltarParaPostagens } from "@/components/blog/states";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Favoritos — FakeBlog" },
      {
        name: "description",
        content: "Postagens que você favoritou no FakeBlog, salvas no seu navegador.",
      },
      { property: "og:title", content: "Favoritos — FakeBlog" },
      { property: "og:description", content: "Suas postagens favoritas do FakeBlog." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FavoritosPage,
});

function FavoritosPage() {
  const navigate = useNavigate();
  const favoritos = useFavoritos();

  const postagens = useQuery({
    queryKey: ["todas-postagens"],
    queryFn: api.postagens,
    enabled: (favoritos?.length ?? 0) > 0,
  });

  const lista = favoritos && postagens.data ? selecionarPorIndices(postagens.data, favoritos) : [];

  return (
    <div className="min-h-screen">
      <SiteHeader onSearch={(q) => navigate({ to: "/", search: { q } })} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Favoritos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Postagens que você marcou com <Heart className="inline size-3.5 align-[-2px]" /> ficam
          salvas neste navegador.
        </p>

        <div className="mt-8">
          {favoritos === null ? (
            <LoadingGrid items={3} />
          ) : favoritos.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="Você ainda não possui favoritos."
              description="Toque no coração de uma postagem para guardá-la aqui."
              action={<VoltarParaPostagens />}
            />
          ) : postagens.isPending ? (
            <LoadingGrid items={Math.min(favoritos.length, 6)} />
          ) : postagens.isError ? (
            <ErrorState message={(postagens.error as Error).message} />
          ) : lista.length === 0 ? (
            <EmptyState
              icon={Heart}
              title="Seus favoritos não estão mais disponíveis."
              description="As postagens salvas não foram encontradas na API."
              action={<VoltarParaPostagens />}
            />
          ) : (
            <PostGrid posts={lista} />
          )}
        </div>
      </div>
    </div>
  );
}
