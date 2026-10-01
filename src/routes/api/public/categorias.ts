import { createFileRoute } from "@tanstack/react-router";

import { listarCategorias } from "../../../../backend/lib/blog.js";
import { json, metodoNaoPermitido } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/categorias")({
  server: {
    handlers: {
      GET: () => json(listarCategorias()),
      ANY: metodoNaoPermitido,
    },
  },
});
