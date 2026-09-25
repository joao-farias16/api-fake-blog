import { createFileRoute } from "@tanstack/react-router";

import { listarAutores } from "../../../../api/lib/blog.js";
import { json } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/autores")({
  server: {
    handlers: {
      GET: () => json(listarAutores()),
    },
  },
});
