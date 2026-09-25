export interface Postagem {
  index: number;
  thumbImage: string;
  thumbImageAltText: string;
  title: string;
  description: string;
  categoria: string;
  profileThumbImage: string;
  profileName: string;
  postDate: string;
}

export interface Categoria {
  categoria: string;
  total: number;
}

export interface Autor {
  nome: string;
  profileThumbImage: string;
  total: number;
}

export function listarPostagens(): Postagem[];
export function obterPostagem(indexParam: string | number): Postagem | null;
export function listarCategorias(): Categoria[];
export function listarPorCategoria(categoria: string): Postagem[];
export function listarAutores(): Autor[];
export function listarPorAutor(nome: string): Postagem[];
export function buscarPostagens(termo: string | null | undefined): Postagem[];
export function listarDestaques(): Postagem[];
