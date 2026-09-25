import type { Postagem } from "@/lib/api";
import { PostCard } from "./post-card";

export function PostGrid({ posts }: { posts: Postagem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.index} post={post} />
      ))}
    </div>
  );
}
