import { createFileRoute } from "@tanstack/react-router";

import { listarDestaques } from "../../../../backend/lib/blog.js";
import { json, metodoNaoPermitido } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/postagens/destaques")({
  server: {
    handlers: {
      GET: () => json(listarDestaques()),
      ANY: metodoNaoPermitido,
    },
  },
});
