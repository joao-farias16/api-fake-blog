import { Link } from "@tanstack/react-router";
import { Search, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
