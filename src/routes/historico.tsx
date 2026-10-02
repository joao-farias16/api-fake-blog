import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { History, Trash2 } from "lucide-react";

import { api } from "@/lib/api";
import {
  LIMITE_HISTORICO,
  limparHistorico,
  selecionarPorIndices,
  useHistorico,
} from "@/lib/local-storage";
import { SiteHeader } from "@/components/blog/site-header";
import { PostGrid } from "@/components/blog/post-grid";
import { EmptyState, ErrorState, LoadingGrid, VoltarParaPostagens } from "@/components/blog/states";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/historico")({
  head: () => ({
    meta: [
      { title: "Histórico — FakeBlog" },
      {
        name: "description",
        content: "Postagens que você visualizou recentemente no FakeBlog.",
      },
      { property: "og:title", content: "Histórico — FakeBlog" },
      { property: "og:description", content: "Suas postagens visualizadas recentemente." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HistoricoPage,
});

function HistoricoPage() {
  const navigate = useNavigate();
  const historico = useHistorico();

  const postagens = useQuery({
    queryKey: ["todas-postagens"],
    queryFn: api.postagens,
    enabled: (historico?.length ?? 0) > 0,
  });

  const lista = historico && postagens.data ? selecionarPorIndices(postagens.data, historico) : [];

  return (
    <div className="min-h-screen">
      <SiteHeader onSearch={(q) => navigate({ to: "/", search: { q } })} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Histórico</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Postagens que você abriu recentemente (até {LIMITE_HISTORICO}), da mais recente para a
              mais antiga.
            </p>
          </div>

          {historico && historico.length > 0 ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary" size="sm">
                  <Trash2 aria-hidden />
                  Limpar histórico
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Limpar histórico?</AlertDialogTitle>
                  <AlertDialogDescription>
                    A lista de postagens visualizadas será apagada deste navegador. Seus favoritos
                    não serão afetados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={limparHistorico}>Limpar</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : null}
        </div>

        <div className="mt-8">
          {historico === null ? (
            <LoadingGrid items={3} />
          ) : historico.length === 0 ? (
            <EmptyState
              icon={History}
              title="Seu histórico está vazio."
              description="As postagens que você abrir aparecerão aqui."
              action={<VoltarParaPostagens />}
            />
          ) : postagens.isPending ? (
            <LoadingGrid items={Math.min(historico.length, 6)} />
          ) : postagens.isError ? (
            <ErrorState message={(postagens.error as Error).message} />
          ) : lista.length === 0 ? (
            <EmptyState
              icon={History}
              title="As postagens do histórico não estão mais disponíveis."
              description="Elas não foram encontradas na API."
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
