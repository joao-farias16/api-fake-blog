import { createFileRoute } from "@tanstack/react-router";

import { listarCategorias } from "../../../../api/lib/blog.js";
import { json } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/categorias")({
  server: {
    handlers: {
      GET: () => json(listarCategorias()),
    },
  },
});
