import { createFileRoute } from "@tanstack/react-router";

import { listarPorAutor } from "../../../../backend/lib/blog.js";
import { json, metodoNaoPermitido } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/autor/$nome")({
  server: {
    handlers: {
      GET: ({ params }) => {
        const postagens = listarPorAutor(decodeURIComponent(params.nome));
        if (postagens.length === 0) {
          return json({ erro: "Autor não encontrado", postagens: [] }, 404);
        }
        return json(postagens);
      },
      ANY: metodoNaoPermitido,
    },
  },
});
