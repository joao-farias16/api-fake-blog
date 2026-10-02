import { Link } from "@tanstack/react-router";
import {
  ChartColumn,
  Heart,
  History,
  Info,
  Menu,
  Newspaper,
  Search,
  Terminal,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/** Páginas da V2: inline no desktop (lg+) e no menu lateral em telas menores. */
const paginasExtras = [
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/historico", label: "Histórico", icon: History },
  { to: "/estatisticas", label: "Estatísticas", icon: ChartColumn },
  { to: "/sobre", label: "Sobre", icon: Info },
] as const;

const linkAtivo = { className: "text-primary" };

function MenuNavegacao({ className }: { className?: string }) {
  const [aberto, setAberto] = useState(false);
  const fechar = () => setAberto(false);

  return (
    <Sheet open={aberto} onOpenChange={setAberto}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className={className} aria-label="Abrir menu">
          <Menu aria-hidden />
          <span className="hidden sm:inline">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-display">
            Fake<span className="text-primary">Blog</span>
          </SheetTitle>
          <SheetDescription>Navegue pelas páginas do blog.</SheetDescription>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1 text-sm">
          <Button variant="ghost" className="justify-start" asChild>
            <Link to="/" onClick={fechar}>
              <Newspaper aria-hidden />
              Postagens
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link to="/" hash="autores" onClick={fechar}>
              <Users aria-hidden />
              Autores
            </Link>
          </Button>
          {paginasExtras.map(({ to, label, icon: Icon }) => (
            <Button key={to} variant="ghost" className="justify-start" asChild>
              <Link to={to} onClick={fechar} activeProps={linkAtivo}>
                <Icon aria-hidden />
                {label}
              </Link>
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function SiteHeader({
  initialQuery = "",
  onSearch,
}: {
  initialQuery?: string;
  onSearch?: (q: string) => void;
}) {
  const [value, setValue] = useState(initialQuery);

  useEffect(() => setValue(initialQuery), [initialQuery]);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Terminal className="size-5" aria-hidden />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Fake<span className="text-primary">Blog</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1 text-sm sm:hidden">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">Postagens</Link>
            </Button>
            <MenuNavegacao />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 text-sm sm:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">Postagens</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" hash="autores">
                Autores
              </Link>
            </Button>
            {paginasExtras.map(({ to, label }) => (
              <Button key={to} variant="ghost" size="sm" className="hidden lg:inline-flex" asChild>
                <Link to={to} activeProps={linkAtivo}>
                  {label}
                </Link>
              </Button>
            ))}
            <MenuNavegacao className="lg:hidden" />
          </nav>

          <form
            className="relative flex-1 sm:w-64"
            onSubmit={(event) => {
              event.preventDefault();
              onSearch?.(value.trim());
            }}
          >
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Pesquisar postagens…"
              aria-label="Pesquisar postagens"
              className="pl-9"
            />
          </form>
        </div>
      </div>
    </header>
  );
}
