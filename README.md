# API Fake Blog + Frontend

Projeto de estudo composto por:

1. **API** em Node.js + Express (`backend/`) com dados simulados em arrays (sem banco de dados).
2. **Frontend** moderno (React + TanStack Start) que consome a API.

## Estrutura do projeto

```text
backend/
  app.js                 # servidor Express e rotas
  lib/blog.js            # regras da API (listar, buscar, filtrar)
  models/articles.js     # dados simulados das postagens
  models/games.js        # atalho da categoria "games"
  public/images/         # imagens das postagens e perfis
src/
  lib/api.ts             # cliente HTTP + API_BASE_URL (configuração central)
  components/blog/       # header, cards, grid e estados de loading/erro/vazio
  routes/index.tsx       # página principal (lista, categorias, busca, autores)
  routes/postagem.$index.tsx  # detalhe da postagem
  routes/autor.$nome.tsx      # postagens de um autor
  routes/api/public/     # os mesmos endpoints servidos junto do frontend (usam backend/lib)
public/images/           # imagens usadas pelo frontend
```

## Instalação e execução

### API (Express)

```bash
cd backend
npm install
npm start          # http://localhost:8080
```

### Frontend

```bash
npm install
npm run dev
```

## Configuração da URL da API

A URL base fica em um único lugar: `src/lib/api.ts`, lida da variável de ambiente.

```bash
# .env
VITE_API_BASE_URL=http://localhost:8080
```

Sem essa variável, o frontend usa `/api/public`, que serve os mesmos endpoints junto da
aplicação (útil em produção, quando não há um servidor Express separado no ar).

## Deploy na Vercel

- O `vercel.json` usa o preset `tanstack-start`; no build da Vercel o Nitro detecta o
  ambiente sozinho e gera `.vercel/output` (função `__server` + arquivos estáticos).
- Não defina `VITE_API_BASE_URL` na Vercel: o frontend chama `/api/public` na mesma origem.
- A API Express fica em `backend/` e **não** em `api/`: a Vercel trata a pasta `api/` da raiz
  como Serverless Functions e passa a responder 404 para todo `/api/*`, o que derrubava
  os endpoints `/api/public/...` do frontend.
- `.vercel/` é saída de build e não deve ser versionada.

## Rotas da API

| Método | Rota                      | Descrição                                    |
| ------ | ------------------------- | -------------------------------------------- |
| GET    | `/postagens`              | Todas as postagens                           |
| GET    | `/postagens/destaques`    | As 3 postagens mais recentes                 |
| GET    | `/postagem/:index`        | Uma postagem (404 quando não existe)         |
| GET    | `/categorias`             | Categorias derivadas dos dados, com totais   |
| GET    | `/categoria/games`        | Rota original preservada                     |
| GET    | `/categoria/:categoria`   | Postagens de uma categoria                   |
| GET    | `/buscar?q=termo`         | Busca por título, descrição ou categoria     |
| GET    | `/autores`                | Autores presentes nas postagens              |
| GET    | `/autor/:nome`            | Postagens de um autor                        |
| GET    | `/img/...`                | Imagens estáticas                            |

### Exemplos

```bash
curl http://localhost:8080/postagens
curl http://localhost:8080/postagem/0
curl http://localhost:8080/postagem/99      # 404 { "erro": "Postagem não encontrada" }
curl http://localhost:8080/categorias
curl http://localhost:8080/categoria/games
curl "http://localhost:8080/buscar?q=google"
curl http://localhost:8080/autores
curl "http://localhost:8080/autor/Maria%20Silva"
```

## Estrutura de cada postagem

```json
{
  "index": 0,
  "thumbImage": "/images/post-1.jpg",
  "thumbImageAltText": "Google Notícias",
  "title": "...",
  "description": "...",
  "categoria": "tecnologia",
  "profileThumbImage": "/images/profile-1.jpg",
  "profileName": "Fernando Silva",
  "postDate": "01/03/2022"
}
```

## Correções aplicadas à API original

- `require('./models/games')` importava `catweb`, mas o modelo exporta `catgames` —
  a rota `/categoria/games` estava quebrada e agora funciona.
- `express.urlencoded({ extende: true })` corrigido para `extended: true`.
- `/postagem/:index` retorna `404` com mensagem JSON em vez de `undefined`.
- Campo `categoria` adicionado de forma consistente a todas as postagens.
- Imagens de thumbnail repetidas/externas substituídas pelas imagens locais do projeto.
- `models/games.js` deixou de duplicar postagens: agora deriva dos dados reais.

## Frontend

- Página principal com destaques, filtro por categoria, busca e lista de autores.
- Busca feita pela API (`/buscar?q=`), não filtrada localmente.
- Página de detalhe consumindo `/postagem/:index`.
- Estados de carregamento, erro de API e "nenhum resultado" tratados em todas as listas.
- Layout responsivo (celular, tablet e desktop).
