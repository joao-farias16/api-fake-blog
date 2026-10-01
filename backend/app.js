import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { catgames } from "./models/games.js";
import {
  listarPostagens,
  obterPostagem,
  listarCategorias,
  listarPorCategoria,
  listarAutores,
  listarPorAutor,
  buscarPostagens,
  listarDestaques,
} from "./lib/blog.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Imagens locais das postagens
app.use("/img", express.static(path.join(__dirname, "public/images")));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// LISTAR TODAS AS POSTAGENS
app.get("/postagens", (req, res) => {
  res.json(listarPostagens());
});

// POSTAGENS EM DESTAQUE (3 mais recentes)
app.get("/postagens/destaques", (req, res) => {
  res.json(listarDestaques());
});

// LISTAR UMA POSTAGEM
app.get("/postagem/:index", (req, res) => {
  const postagem = obterPostagem(req.params.index);
  if (!postagem) {
    return res.status(404).json({ erro: "Postagem não encontrada" });
  }
  res.json(postagem);
});

// LISTAR CATEGORIAS
app.get("/categorias", (req, res) => {
  res.json(listarCategorias());
});

// LISTAR CATEGORIA GAMES (rota original preservada)
app.get("/categoria/games", (req, res) => {
  res.json(catgames);
});

// LISTAR QUALQUER CATEGORIA
app.get("/categoria/:categoria", (req, res) => {
  const postagens = listarPorCategoria(req.params.categoria);
  if (postagens.length === 0) {
    return res.status(404).json({ erro: "Categoria não encontrada", postagens: [] });
  }
  res.json(postagens);
});

// BUSCAR POSTAGENS
app.get("/buscar", (req, res) => {
  res.json(buscarPostagens(req.query.q));
});

// LISTAR AUTORES
app.get("/autores", (req, res) => {
  res.json(listarAutores());
});

// POSTAGENS DE UM AUTOR
app.get("/autor/:nome", (req, res) => {
  const postagens = listarPorAutor(req.params.nome);
  if (postagens.length === 0) {
    return res.status(404).json({ erro: "Autor não encontrado", postagens: [] });
  }
  res.json(postagens);
});

// ROTAS INEXISTENTES (mesma resposta dos endpoints /api/public do frontend)
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

app.listen(port, () => console.log(`API rodando na porta ${port}!`));
