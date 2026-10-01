import { createFileRoute } from "@tanstack/react-router";

import { buscarPostagens } from "../../../../backend/lib/blog.js";
import { json, metodoNaoPermitido } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/buscar")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const q = new URL(request.url).searchParams.get("q");
        return json(buscarPostagens(q));
      },
      ANY: metodoNaoPermitido,
    },
  },
});
