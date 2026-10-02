/**
 * Favoritos e histórico guardados no localStorage do navegador (sem backend).
 * Cada lista guarda apenas os índices das postagens; os dados completos sempre
 * vêm da API, então nada fica desatualizado.
 */
import { useSyncExternalStore } from "react";

import type { Postagem } from "./api";

export const CHAVE_FAVORITOS = "fakeblog:favoritos";
export const CHAVE_HISTORICO = "fakeblog:historico";
export const LIMITE_HISTORICO = 12;

/** Evento disparado nesta aba quando uma lista muda (o evento "storage" só chega às outras abas). */
const EVENTO_ALTERACAO = "fakeblog:storage";

function lerBruto(chave: string): string | null {
  try {
    return window.localStorage.getItem(chave);
  } catch {
    return null;
  }
}

/** Converte o conteúdo salvo em uma lista de índices válidos, sem duplicatas. */
function interpretar(bruto: string | null): number[] {
  if (!bruto) return [];
  try {
    const dados: unknown = JSON.parse(bruto);
    if (!Array.isArray(dados)) return [];
    const indices = dados.filter(
      (valor): valor is number => Number.isInteger(valor) && (valor as number) >= 0,
    );
    return [...new Set(indices)];
  } catch {
    return [];
  }
}

// useSyncExternalStore exige o mesmo array enquanto o conteúdo salvo não mudar.
const cache = new Map<string, { bruto: string | null; indices: number[] }>();

function lerIndices(chave: string): number[] {
  const bruto = lerBruto(chave);
  const anterior = cache.get(chave);
  if (anterior && anterior.bruto === bruto) return anterior.indices;
  const indices = interpretar(bruto);
  cache.set(chave, { bruto, indices });
  return indices;
}

function salvarIndices(chave: string, indices: number[]) {
  try {
    window.localStorage.setItem(chave, JSON.stringify(indices));
  } catch {
    /* armazenamento indisponível (ex.: modo privado sem espaço) */
  }
  window.dispatchEvent(new Event(EVENTO_ALTERACAO));
}

function assinar(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENTO_ALTERACAO, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENTO_ALTERACAO, callback);
  };
}

/**
 * Lista salva em `chave`. Retorna `null` no servidor e durante a hidratação,
 * quando o localStorage ainda não foi lido.
 */
function useIndices(chave: string): number[] | null {
  return useSyncExternalStore<number[] | null>(
    assinar,
    () => lerIndices(chave),
    () => null,
  );
}

// ---------- Favoritos ----------

export function useFavoritos() {
  return useIndices(CHAVE_FAVORITOS);
}

/** Adiciona (no topo) ou remove a postagem dos favoritos. */
export function alternarFavorito(index: number) {
  const atuais = lerIndices(CHAVE_FAVORITOS);
  salvarIndices(
    CHAVE_FAVORITOS,
    atuais.includes(index) ? atuais.filter((i) => i !== index) : [index, ...atuais],
  );
}

// ---------- Histórico ----------

export function useHistorico() {
  return useIndices(CHAVE_HISTORICO);
}

/** Coloca a postagem no topo do histórico, sem duplicar e respeitando o limite. */
export function registrarVisualizacao(index: number) {
  const atuais = lerIndices(CHAVE_HISTORICO);
  if (atuais[0] === index) return;
  salvarIndices(
    CHAVE_HISTORICO,
    [index, ...atuais.filter((i) => i !== index)].slice(0, LIMITE_HISTORICO),
  );
}

export function limparHistorico() {
  salvarIndices(CHAVE_HISTORICO, []);
}

/** Postagens correspondentes aos índices salvos, na mesma ordem; ignora índices que não existem mais. */
export function selecionarPorIndices(postagens: Postagem[], indices: number[]): Postagem[] {
  const porIndice = new Map(postagens.map((post) => [post.index, post]));
  return indices.flatMap((index) => {
    const post = porIndice.get(index);
    return post ? [post] : [];
  });
}
