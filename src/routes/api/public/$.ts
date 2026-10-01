import { createFileRoute } from "@tanstack/react-router";

import { json } from "@/lib/api-response";

// Qualquer endpoint inexistente em /api/public responde 404 em JSON
// (em vez da página HTML de "Page not found").
export const Route = createFileRoute("/api/public/$")({
  server: {
    handlers: {
      ANY: () => json({ erro: "Rota não encontrada" }, 404),
    },
  },
});
