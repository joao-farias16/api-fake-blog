/** Resposta JSON padrão dos endpoints da API. */
export function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "cache-control": "no-store",
    },
  });
}

/** Endpoints da API são somente leitura: outros métodos recebem 405 em JSON. */
export function metodoNaoPermitido() {
  const response = json({ erro: "Método não permitido" }, 405);
  response.headers.set("allow", "GET, HEAD");
  return response;
}
