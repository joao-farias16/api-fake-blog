// Mantido do projeto original: atalho para a categoria "games".
// Agora a lista é derivada dos dados reais das postagens, sem duplicação.
import { publicacoes } from "./articles.js";

export const catgames = publicacoes.filter((post) => post.categoria === "games");
