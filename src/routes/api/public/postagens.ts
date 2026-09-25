import { createFileRoute } from "@tanstack/react-router";

import { listarPostagens } from "../../../../api/lib/blog.js";
import { json } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/postagens")({
  server: {
    handlers: {
      GET: () => json(listarPostagens()),
    },
  },
});
