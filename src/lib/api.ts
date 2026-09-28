/**
 * Configuração central da URL base da API.
 * Em desenvolvimento/produção basta definir VITE_API_BASE_URL
 * (ex.: http://localhost:8080) para apontar para a API Express.
 */
export const API_BASE_URL = "https://api-fake-blog-jet.vercel.app/api/public";

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

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new ApiError("Não foi possível conectar à API.", 0);
  }

  if (!response.ok) {
    let mensagem = `Erro ${response.status} ao consultar a API.`;
    try {
      const corpo = (await response.json()) as { erro?: string };
      if (corpo?.erro) mensagem = corpo.erro;
    } catch {
      /* resposta sem JSON */
    }
    throw new ApiError(mensagem, response.status);
  }

  return (await response.json()) as T;
}

export const api = {
  postagens: () => request<Postagem[]>("/postagens"),
  destaques: () => request<Postagem[]>("/postagens/destaques"),
  postagem: (index: string | number) => request<Postagem>(`/postagem/${index}`),
  categorias: () => request<Categoria[]>("/categorias"),
  porCategoria: (categoria: string) => request<Postagem[]>(`/categoria/${encodeURIComponent(categoria)}`),
  buscar: (q: string) => request<Postagem[]>(`/buscar?q=${encodeURIComponent(q)}`),
  autores: () => request<Autor[]>("/autores"),
  porAutor: (nome: string) => request<Postagem[]>(`/autor/${encodeURIComponent(nome)}`),
};

export { ApiError };
