// Lógica compartilhada da API (dados simulados em arrays, como no projeto original).
import { publicacoes } from "../models/articles.js";

/** Retorna todas as postagens, cada uma com seu índice (usado pelo frontend). */
export function listarPostagens() {
  return publicacoes.map((post, index) => ({ index, ...post }));
}

/** Retorna uma postagem pelo índice ou null quando não existir. */
export function obterPostagem(indexParam) {
  const index = Number(indexParam);
  if (!Number.isInteger(index) || index < 0 || index >= publicacoes.length) {
    return null;
  }
  return { index, ...publicacoes[index] };
}

/** Categorias derivadas dos próprios dados, com a quantidade de postagens. */
export function listarCategorias() {
  const contagem = new Map();
  for (const post of publicacoes) {
    contagem.set(post.categoria, (contagem.get(post.categoria) ?? 0) + 1);
  }
  return [...contagem.entries()].map(([categoria, total]) => ({ categoria, total }));
}

export function listarPorCategoria(categoria) {
  const alvo = String(categoria).toLowerCase();
  return listarPostagens().filter((post) => post.categoria.toLowerCase() === alvo);
}

export function listarAutores() {
  const autores = new Map();
  for (const post of publicacoes) {
    const atual = autores.get(post.profileName);
    if (atual) {
      atual.total += 1;
    } else {
      autores.set(post.profileName, {
        nome: post.profileName,
        profileThumbImage: post.profileThumbImage,
        total: 1,
      });
    }
  }
  return [...autores.values()];
}

export function listarPorAutor(nome) {
  const alvo = String(nome).toLowerCase();
  return listarPostagens().filter((post) => post.profileName.toLowerCase() === alvo);
}

/** Busca simples por título, descrição ou categoria. */
export function buscarPostagens(termo) {
  const q = String(termo ?? "")
    .trim()
    .toLowerCase();
  if (!q) return [];
  return listarPostagens().filter((post) =>
    [post.title, post.description, post.categoria].join(" ").toLowerCase().includes(q),
  );
}

/** Destaques: regra simples e determinística — as 3 postagens mais recentes. */
export function listarDestaques() {
  const paraData = (br) => {
    const [dia, mes, ano] = br.split("/").map(Number);
    return new Date(ano, mes - 1, dia).getTime();
  };
  return [...listarPostagens()]
    .sort((a, b) => paraData(b.postDate) - paraData(a.postDate))
    .slice(0, 3);
}
