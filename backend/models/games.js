// Mantido do projeto original: atalho para a categoria "games".
// Agora a lista é derivada dos dados reais das postagens, sem duplicação,
// e inclui o `index` de cada postagem (usado pelo frontend nos links e chaves).
import { publicacoes } from "./articles.js";

export const catgames = publicacoes
  .map((post, index) => ({ index, ...post }))
  .filter((post) => post.categoria === "games");
