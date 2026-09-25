import { createFileRoute } from "@tanstack/react-router";

import { buscarPostagens } from "../../../../api/lib/blog.js";
import { json } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/buscar")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const q = new URL(request.url).searchParams.get("q");
        return json(buscarPostagens(q));
      },
    },
  },
});
