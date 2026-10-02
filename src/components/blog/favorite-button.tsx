import { Heart } from "lucide-react";

import { alternarFavorito, useFavoritos } from "@/lib/local-storage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Botão de favoritar/desfavoritar. `compact` é a versão só com ícone usada nos cards. */
export function FavoriteButton({
  index,
  compact = false,
  className,
}: {
  index: number;
  compact?: boolean;
  className?: string;
}) {
  const favoritos = useFavoritos();
  const favorito = favoritos?.includes(index) ?? false;
  const rotulo = favorito ? "Remover dos favoritos" : "Adicionar aos favoritos";

  return (
    <Button
      type="button"
      variant={compact ? "ghost" : "secondary"}
      size={compact ? "icon" : "sm"}
      aria-pressed={favorito}
      aria-label={rotulo}
      title={rotulo}
      onClick={() => alternarFavorito(index)}
      className={cn(
        compact &&
          "size-9 rounded-full border border-border bg-background/80 backdrop-blur hover:bg-background hover:text-primary",
        favorito && "text-primary",
        className,
      )}
    >
      <Heart className={cn(favorito && "fill-current")} aria-hidden />
      {compact ? null : favorito ? "Favoritado" : "Favoritar"}
    </Button>
  );
}
