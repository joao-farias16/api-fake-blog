import { Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2, SearchX, TriangleAlert, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingGrid({ items = 6 }: { items?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
          <Skeleton className="aspect-[16/9] w-full rounded-none" />
          <div className="space-y-3 p-5">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-8 w-40" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function InlineLoading({ label = "Carregando…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" aria-hidden />
      {label}
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-8 text-center">
      <TriangleAlert className="mx-auto size-6 text-destructive" aria-hidden />
      <h3 className="mt-3 text-base font-semibold text-foreground">Não foi possível carregar</h3>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Verifique se a API está em execução e tente novamente.
      </p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  icon: Icon = SearchX,
  action,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-10 text-center">
      <Icon className="mx-auto size-6 text-muted-foreground" aria-hidden />
      <h3 className="mt-3 text-base font-semibold text-card-foreground">{title}</h3>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

/** Ação padrão dos estados vazios: voltar para a lista de postagens. */
export function VoltarParaPostagens() {
  return (
    <Button asChild>
      <Link to="/">
        <ArrowLeft aria-hidden />
        Ver postagens
      </Link>
    </Button>
  );
}
