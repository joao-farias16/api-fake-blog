import { Link } from "@tanstack/react-router";

import type { Postagem } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "./favorite-button";

export function PostCard({ post }: { post: Postagem }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
      <Link
        to="/postagem/$index"
        params={{ index: String(post.index) }}
        className="flex flex-1 flex-col"
      >
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={post.thumbImage}
            alt={post.thumbImageAltText}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <Badge variant="secondary" className="w-fit uppercase tracking-wide">
            {post.categoria}
          </Badge>

          <h3 className="font-display text-lg leading-snug font-semibold text-card-foreground group-hover:text-primary">
            {post.title}
          </h3>

          <p className="line-clamp-3 text-sm text-muted-foreground">{post.description}</p>

          <div className="mt-auto flex items-center gap-3 pt-2">
            <img
              src={post.profileThumbImage}
              alt={post.profileName}
              className="size-8 rounded-full object-cover"
            />
            <div className="text-xs">
              <p className="font-medium text-card-foreground">{post.profileName}</p>
              <p className="text-muted-foreground">{post.postDate}</p>
            </div>
          </div>
        </div>
      </Link>

      <FavoriteButton index={post.index} compact className="absolute top-3 right-3" />
    </div>
  );
}
