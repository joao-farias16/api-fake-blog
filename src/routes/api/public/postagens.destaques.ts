import { createFileRoute } from "@tanstack/react-router";

import { listarDestaques } from "../../../../api/lib/blog.js";
import { json } from "@/lib/api-response";

export const Route = createFileRoute("/api/public/postagens/destaques")({
  server: {
    handlers: {
      GET: () => json(listarDestaques()),
    },
  },
});
