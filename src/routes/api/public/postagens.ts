import { createFileRoute } from "@tanstack/react-router";

import { listarPostagens } from "../../../../backend/lib/blog.js";
import { json, metodoNaoPermitido } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/postagens")({
  server: {
    handlers: {
      GET: () => json(listarPostagens()),
      ANY: metodoNaoPermitido,
    },
  },
});
