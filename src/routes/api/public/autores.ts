import { createFileRoute } from "@tanstack/react-router";

import { listarAutores } from "../../../../backend/lib/blog.js";
import { json, metodoNaoPermitido } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/autores")({
  server: {
    handlers: {
      GET: () => json(listarAutores()),
      ANY: metodoNaoPermitido,
    },
  },
});
