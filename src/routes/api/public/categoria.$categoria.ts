import { createFileRoute } from "@tanstack/react-router";

import { listarPorCategoria } from "../../../../backend/lib/blog.js";
import { json, metodoNaoPermitido } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/categoria/$categoria")({
  server: {
    handlers: {
      GET: ({ params }) => {
        const postagens = listarPorCategoria(params.categoria);
        if (postagens.length === 0) {
          return json({ erro: "Categoria não encontrada", postagens: [] }, 404);
        }
        return json(postagens);
      },
      ANY: metodoNaoPermitido,
    },
  },
});
