import { createFileRoute } from "@tanstack/react-router";

import { obterPostagem } from "../../../../api/lib/blog.js";
import { json } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/postagem/$index")({
  server: {
    handlers: {
      GET: ({ params }) => {
        const postagem = obterPostagem(params.index);
        if (!postagem) {
          return json({ erro: "Postagem não encontrada" }, 404);
        }
        return json(postagem);
      },
    },
  },
});
