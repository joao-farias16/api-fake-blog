import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";

import { api } from "@/lib/api";
import { SiteHeader } from "@/components/blog/site-header";
import { EmptyState, ErrorState, InlineLoading } from "@/components/blog/states";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/postagem/$index")({
  head: () => ({
    meta: [
      { title: "Postagem — FakeBlog" },
      {
        name: "description",
        content: "Detalhes completos de uma postagem, carregados pelo endpoint /postagem/:index.",
      },
      { property: "og:title", content: "Postagem — FakeBlog" },
      {
        property: "og:description",
        content: "Detalhes completos de uma postagem do blog de tecnologia.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PostagemPage,
});

function PostagemPage() {
  const { index } = Route.useParams();
  const navigate = useNavigate();

  const postagem = useQuery({
    queryKey: ["postagem", index],
    queryFn: () => api.postagem(index),
    retry: false,
  });

  return (
    <div className="min-h-screen">
      <SiteHeader onSearch={(q) => navigate({ to: "/", search: { q } })} />

      <div className="mx-auto max-w-3xl px-4 py-10">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="size-4" aria-hidden />
            Voltar para as postagens
          </Link>
        </Button>

        {postagem.isPending ? (
          <InlineLoading label="Carregando postagem…" />
        ) : postagem.isError ? (
          <EmptyState
            title="Postagem não encontrada"
            description={(postagem.error as Error).message}
          />
        ) : (
          <article>
            <Badge variant="secondary" className="uppercase">
              {postagem.data.categoria}
            </Badge>

            <h1 className="mt-4 text-2xl leading-tight font-bold sm:text-4xl">
              {postagem.data.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <Link
                to="/autor/$nome"
                params={{ nome: postagem.data.profileName }}
                className="flex items-center gap-2 hover:text-primary"
              >
                <img
                  src={postagem.data.profileThumbImage}
                  alt={postagem.data.profileName}
                  className="size-8 rounded-full object-cover"
                />
                {postagem.data.profileName}
              </Link>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden />
                {postagem.data.postDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag className="size-4" aria-hidden />
                índice #{postagem.data.index}
              </span>
            </div>

            <img
              src={postagem.data.thumbImage}
              alt={postagem.data.thumbImageAltText}
              className="mt-8 aspect-[16/9] w-full rounded-xl border border-border object-cover"
            />

            <p className="mt-8 text-base leading-relaxed text-foreground/90">
              {postagem.data.description}
            </p>

            <p className="mt-6 text-sm text-muted-foreground">
              Dados carregados de <code className="text-primary">/postagem/{index}</code>
            </p>
          </article>
        )}

        {postagem.isError ? (
          <div className="mt-6">
            <ErrorState message="Confira o índice informado ou se a API está disponível." />
          </div>
        ) : null}
      </div>
    </div>
  );
}
