import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, FileText, FolderOpen, Trophy, Users, type LucideIcon } from "lucide-react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";

import { api, type Autor, type Categoria, type Postagem } from "@/lib/api";
import { SiteHeader } from "@/components/blog/site-header";
import { ErrorState, InlineLoading } from "@/components/blog/states";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const Route = createFileRoute("/estatisticas")({
  head: () => ({
    meta: [
      { title: "Estatísticas — FakeBlog" },
      {
        name: "description",
        content: "Números do conteúdo do FakeBlog calculados a partir dos dados da API.",
      },
      { property: "og:title", content: "Estatísticas — FakeBlog" },
      {
        property: "og:description",
        content: "Postagens, autores e categorias do FakeBlog em números.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EstatisticasPage,
});

const chartConfig = {
  total: { label: "Postagens", color: "var(--color-primary)" },
} satisfies ChartConfig;

const plural = (n: number, singular: string, pluralForm: string) =>
  `${n} ${n === 1 ? singular : pluralForm}`;

const listarNomes = (nomes: string[]) =>
  new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" }).format(nomes);

/** Mesma regra dos destaques da API: datas no formato dd/mm/aaaa. */
function paraData(br: string) {
  const [dia = 1, mes = 1, ano = 1970] = br.split("/").map(Number);
  return new Date(ano, mes - 1, dia).getTime();
}

/** Itens com o maior valor (pode haver empate). */
function lideres<T>(itens: T[], valor: (item: T) => number) {
  const maximo = Math.max(...itens.map(valor));
  return { maximo, itens: itens.filter((item) => valor(item) === maximo) };
}

function EstatisticasPage() {
  const navigate = useNavigate();

  const postagens = useQuery({ queryKey: ["todas-postagens"], queryFn: api.postagens });
  const autores = useQuery({ queryKey: ["autores"], queryFn: api.autores });
  const categorias = useQuery({ queryKey: ["categorias"], queryFn: api.categorias });

  const erro = postagens.error ?? autores.error ?? categorias.error;

  return (
    <div className="min-h-screen">
      <SiteHeader onSearch={(q) => navigate({ to: "/", search: { q } })} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Estatísticas</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Calculadas a partir de <code className="text-primary">/postagens</code>,{" "}
          <code className="text-primary">/autores</code> e{" "}
          <code className="text-primary">/categorias</code>
        </p>

        <div className="mt-8">
          {erro ? (
            <ErrorState message={(erro as Error).message} />
          ) : postagens.data && autores.data && categorias.data ? (
            <Painel
              postagens={postagens.data}
              autores={autores.data}
              categorias={categorias.data}
            />
          ) : (
            <PainelCarregando />
          )}
        </div>
      </div>
    </div>
  );
}

function Painel({
  postagens,
  autores,
  categorias,
}: {
  postagens: Postagem[];
  autores: Autor[];
  categorias: Categoria[];
}) {
  const porCategoria = [...categorias].sort((a, b) => b.total - a.total);
  const topCategorias = lideres(categorias, (c) => c.total);
  const topAutores = lideres(autores, (a) => a.total);

  const ordenadas = [...postagens].sort((a, b) => paraData(b.postDate) - paraData(a.postDate));
  const recente = ordenadas[0];
  const mesmaData = recente
    ? ordenadas.filter((p) => p.postDate === recente.postDate).length - 1
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Numero icon={FileText} rotulo="Postagens" valor={postagens.length} />
        <Numero icon={Users} rotulo="Autores" valor={autores.length} />
        <Numero icon={FolderOpen} rotulo="Categorias" valor={categorias.length} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="rounded-xl border border-border bg-card p-5 lg:col-span-3">
          <h2 className="text-base font-semibold">Postagens por categoria</h2>
          <p className="mt-1 text-xs text-muted-foreground">Ordenadas da maior para a menor</p>

          {porCategoria.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Nenhuma categoria cadastrada.
            </p>
          ) : (
            <ChartContainer
              config={chartConfig}
              className="mt-4 aspect-auto w-full"
              style={{ height: porCategoria.length * 48 + 16 }}
            >
              <BarChart
                data={porCategoria}
                layout="vertical"
                margin={{ left: 0, right: 32, top: 0, bottom: 0 }}
                barCategoryGap={10}
                accessibilityLayer
              >
                <XAxis type="number" dataKey="total" hide domain={[0, "dataMax"]} />
                <YAxis
                  type="category"
                  dataKey="categoria"
                  tickLine={false}
                  axisLine={false}
                  width={96}
                  tick={{ fontSize: 13 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" nameKey="total" />}
                />
                <Bar dataKey="total" fill="var(--color-total)" radius={4}>
                  <LabelList
                    dataKey="total"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={13}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
        </section>

        <div className="grid gap-4 lg:col-span-2">
          <Destaque
            icon={Trophy}
            rotulo="Autor com mais postagens"
            titulo={
              topAutores.itens.length === 1
                ? (topAutores.itens[0]?.nome ?? "—")
                : topAutores.itens.length === autores.length
                  ? `Empate entre os ${autores.length} autores`
                  : listarNomes(topAutores.itens.map((a) => a.nome))
            }
            detalhe={
              autores.length === 0
                ? "Nenhum autor cadastrado"
                : topAutores.itens.length === 1
                  ? plural(topAutores.maximo, "postagem", "postagens")
                  : `Empate · ${plural(topAutores.maximo, "postagem", "postagens")} cada`
            }
          />

          <Destaque
            icon={FolderOpen}
            rotulo="Categoria com mais postagens"
            titulo={
              categorias.length === 0
                ? "—"
                : listarNomes(topCategorias.itens.map((c) => c.categoria))
            }
            detalhe={
              categorias.length === 0
                ? "Nenhuma categoria cadastrada"
                : topCategorias.itens.length === 1
                  ? plural(topCategorias.maximo, "postagem", "postagens")
                  : `Empate · ${plural(topCategorias.maximo, "postagem", "postagens")} cada`
            }
          />

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              <CalendarDays className="size-4" aria-hidden />
              Postagem mais recente
            </p>
            {recente ? (
              <Link
                to="/postagem/$index"
                params={{ index: String(recente.index) }}
                className="group mt-3 flex gap-3"
              >
                <img
                  src={recente.thumbImage}
                  alt={recente.thumbImageAltText}
                  className="aspect-[16/9] w-24 shrink-0 rounded-md border border-border object-cover"
                />
                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium group-hover:text-primary">
                    {recente.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {recente.postDate}
                    {mesmaData > 0
                      ? ` · e mais ${plural(mesmaData, "postagem", "postagens")} na mesma data`
                      : null}
                  </p>
                </div>
              </Link>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">Nenhuma postagem publicada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Numero({
  icon: Icon,
  rotulo,
  valor,
}: {
  icon: LucideIcon;
  rotulo: string;
  valor: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        {rotulo}
        <Icon className="size-4 text-primary" aria-hidden />
      </div>
      <p className="mt-2 font-display text-4xl font-bold tracking-tight">{valor}</p>
    </div>
  );
}

function Destaque({
  icon: Icon,
  rotulo,
  titulo,
  detalhe,
}: {
  icon: LucideIcon;
  rotulo: string;
  titulo: string;
  detalhe: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
        <Icon className="size-4" aria-hidden />
        {rotulo}
      </p>
      <p className="mt-3 font-display text-lg font-semibold">{titulo}</p>
      <p className="text-xs text-muted-foreground">{detalhe}</p>
    </div>
  );
}

function PainelCarregando() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-9 w-12" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card">
        <InlineLoading label="Calculando estatísticas…" />
      </div>
    </div>
  );
}
