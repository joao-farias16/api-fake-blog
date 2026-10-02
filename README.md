# FakeBlog

Blog de tecnologia desenvolvido como **projeto de estudo**. O objetivo principal é demonstrar
um frontend moderno consumindo uma **API própria**: cada postagem, categoria, autor e busca
exibidos no site vem de uma requisição HTTP aos endpoints dessa API.

O conteúdo das postagens é simulado (arrays em JavaScript, sem banco de dados); o foco está na
comunicação entre frontend e API e no tratamento de cada estado da interface — carregamento,
sucesso, lista vazia e erro.

## Funcionalidades

- Destaques com as 3 postagens mais recentes
- Lista de todas as postagens
- Filtro por categoria
- Busca feita pela API (`/buscar?q=`), não filtrada localmente
- Página individual de cada postagem
- Lista de autores e página com as postagens de cada autor
- Estados de carregamento, erro e "nenhum resultado" em todas as listas
- Layout responsivo (celular, tablet e desktop) com tema escuro

### Novidades da versão 2

- **Favoritos** — botão de coração nos cards e na página da postagem; página `/favoritos`.
- **Histórico** — as postagens abertas são registradas automaticamente; página `/historico`
  com opção de limpar.
- **Estatísticas** — página `/estatisticas` com totais de postagens, autores e categorias,
  gráfico de postagens por categoria, autor e categoria com mais postagens (com tratamento de
  empate) e postagem mais recente. Tudo calculado a partir das respostas da API.
- **Sobre** — página `/sobre` explicando o projeto, a arquitetura e as tecnologias.
- **Navegação** — os novos links aparecem no header em telas grandes e em um menu lateral
  (botão "Menu") em tablets e celulares.

Favoritos e histórico não usam login nem banco de dados: ficam no `localStorage` do navegador
(veja [Favoritos e histórico](#favoritos-e-histórico-localstorage)).

## Tecnologias

| Parte          | Tecnologias                                                                     |
| -------------- | ------------------------------------------------------------------------------- |
| Frontend       | React 19, TypeScript, TanStack Start, TanStack Router, TanStack Query           |
| Interface      | Tailwind CSS 4, componentes shadcn/ui (Radix UI), ícones lucide-react, Recharts |
| Validação      | Zod (parâmetros de busca da página inicial)                                     |
| API            | Node.js + Express (com `cors`), dados simulados em arrays                       |
| Build e deploy | Vite, Nitro, Vercel                                                             |
| Qualidade      | ESLint, Prettier                                                                |

## Estrutura do projeto

```text
backend/
  app.js                       # servidor Express e rotas
  lib/blog.js                  # regras da API (listar, buscar, filtrar) — usadas também pelo frontend
  models/articles.js           # dados simulados das postagens
  models/games.js              # atalho da categoria "games"
  public/images/               # imagens das postagens e perfis
src/
  lib/api.ts                   # cliente HTTP + API_BASE_URL (configuração central)
  lib/local-storage.ts         # favoritos e histórico no localStorage
  components/blog/             # header, cards, grid, botão de favorito e estados de loading/erro/vazio
  components/ui/               # componentes shadcn/ui
  routes/index.tsx             # página principal (destaques, categorias, busca, autores)
  routes/postagem.$index.tsx   # detalhe da postagem
  routes/autor.$nome.tsx       # postagens de um autor
  routes/favoritos.tsx         # postagens favoritadas
  routes/historico.tsx         # postagens visualizadas recentemente
  routes/estatisticas.tsx      # números do conteúdo do blog
  routes/sobre.tsx             # sobre o projeto
  routes/api/public/           # os mesmos endpoints da API servidos junto do frontend
  routeTree.gen.ts             # gerado automaticamente pelo TanStack Router (não editar)
  styles.css                   # tema (cores, fontes, raios) com Tailwind CSS
public/images/                 # imagens usadas pelo frontend
```

## Como executar localmente

Pré-requisito: Node.js e npm.

### Frontend (já inclui a API)

```bash
npm install
npm run dev
```

O Vite mostra o endereço local no terminal (por padrão `http://localhost:5173`, ou a próxima
porta livre). Os endpoints da API ficam disponíveis no mesmo servidor, em `/api/public/...`.

### API Express separada (opcional)

```bash
cd backend
npm install
npm start          # http://localhost:8080
```

Para o frontend usar essa API em vez de `/api/public`, crie um `.env` na raiz:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

## Scripts disponíveis

| Script              | O que faz                                               |
| ------------------- | ------------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento (Vite)                      |
| `npm run build`     | Build de produção                                       |
| `npm run build:dev` | Build em modo de desenvolvimento                        |
| `npm run preview`   | Pré-visualização do build com o Vite (veja observações) |
| `npm run lint`      | ESLint (inclui as regras do Prettier)                   |
| `npm run format`    | Formata o projeto com o Prettier                        |

Na pasta `backend/`: `npm start` inicia a API Express.

## Comunicação entre frontend e API

1. As páginas pedem dados pelo **TanStack Query** (`useQuery`), que cuida de cache,
   carregamento e erro.
2. Todas as requisições passam pelo cliente único em `src/lib/api.ts`, que monta a URL a partir
   de `API_BASE_URL` e converte respostas de erro (`{ "erro": "..." }`) em mensagens amigáveis.
3. Por padrão, `API_BASE_URL` é `/api/public`: rotas de servidor do TanStack Start
   (`src/routes/api/public/`) que reutilizam as funções de `backend/lib/blog.js`. Assim, a API
   Express e os endpoints servidos junto do frontend respondem exatamente os mesmos dados.

```text
página → src/lib/api.ts → /api/public/... → backend/lib/blog.js → backend/models/articles.js
```

## Páginas da aplicação

| Rota                | Página                                               |
| ------------------- | ---------------------------------------------------- |
| `/`                 | Início: destaques, categorias, lista/busca e autores |
| `/?categoria=games` | Postagens filtradas por categoria                    |
| `/?q=termo`         | Resultado de busca                                   |
| `/#autores`         | Seção de autores da página inicial                   |
| `/postagem/:index`  | Detalhe de uma postagem                              |
| `/autor/:nome`      | Postagens de um autor                                |
| `/favoritos`        | Postagens favoritadas                                |
| `/historico`        | Postagens visualizadas recentemente                  |
| `/estatisticas`     | Estatísticas do conteúdo                             |
| `/sobre`            | Sobre o projeto                                      |

## API

Todos os endpoints são somente leitura (`GET`). No frontend eles ficam em `/api/public/...`;
na API Express, na raiz (`http://localhost:8080/...`).

| Método | Rota                    | Descrição                                  |
| ------ | ----------------------- | ------------------------------------------ |
| GET    | `/postagens`            | Todas as postagens                         |
| GET    | `/postagens/destaques`  | As 3 postagens mais recentes               |
| GET    | `/postagem/:index`      | Uma postagem (404 quando não existe)       |
| GET    | `/categorias`           | Categorias derivadas dos dados, com totais |
| GET    | `/categoria/games`      | Rota original preservada                   |
| GET    | `/categoria/:categoria` | Postagens de uma categoria                 |
| GET    | `/buscar?q=termo`       | Busca por título, descrição ou categoria   |
| GET    | `/autores`              | Autores presentes nas postagens            |
| GET    | `/autor/:nome`          | Postagens de um autor                      |

A API Express também serve as imagens em `/img/...` e `/images/...`. Rotas inexistentes
respondem `404` com `{ "erro": "Rota não encontrada" }`, e os endpoints em `/api/public`
respondem `405` para métodos diferentes de `GET`/`HEAD`.

### Exemplos

```bash
curl http://localhost:8080/postagens
curl http://localhost:8080/postagem/99      # 404 { "erro": "Postagem não encontrada" }
curl "http://localhost:8080/buscar?q=google"
curl "http://localhost:8080/autor/Maria%20Silva"
```

### Estrutura de cada postagem

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

O `index` é a posição da postagem no array de dados e funciona como identificador.

## Favoritos e histórico (localStorage)

A lógica fica em `src/lib/local-storage.ts`. São guardados **apenas os índices** das
postagens; os dados completos sempre são buscados na API (`/postagens`), então nada fica
desatualizado.

| Chave                | Conteúdo                                                        |
| -------------------- | --------------------------------------------------------------- |
| `fakeblog:favoritos` | Índices favoritados, do mais recente para o mais antigo         |
| `fakeblog:historico` | Até 12 índices visualizados, do mais recente para o mais antigo |

- O histórico só registra postagens que carregaram com sucesso, não guarda duplicatas e move
  para o topo uma postagem aberta novamente.
- Os dados ficam só no navegador atual: outro navegador ou aparelho tem listas próprias, e
  limpar os dados do site apaga as listas.
- Conteúdo inválido no `localStorage` é ignorado (tratado como lista vazia).
- Alterações aparecem na hora em todos os cards da página e também em outras abas abertas.

## Hospedagem

O projeto está hospedado na **Vercel**.

- O `vercel.json` usa o preset `tanstack-start`; no build da Vercel o Nitro detecta o
  ambiente sozinho e gera `.vercel/output` (função `__server` + arquivos estáticos).
- Não defina `VITE_API_BASE_URL` na Vercel: o frontend chama `/api/public` na mesma origem.
- A API Express fica em `backend/` e **não** em `api/`: a Vercel trata a pasta `api/` da raiz
  como Serverless Functions e passaria a responder 404 para todo `/api/*`, derrubando os
  endpoints `/api/public/...` do frontend.
- `.vercel/` é saída de build e não deve ser versionada.

## Observações para desenvolvimento

- O projeto está conectado ao [Lovable](https://lovable.dev): evite reescrever o histórico do
  Git já publicado (force push, rebase ou amend de commits enviados).
- `src/routeTree.gen.ts` é gerado pelo plugin do TanStack Router ao rodar `npm run dev` ou
  `npm run build`. Ao criar uma página nova em `src/routes/`, rode um dos dois antes do
  `tsc`, senão a rota nova ainda não existe nos tipos.
- Fora da Vercel, o build local usa o preset padrão do Nitro e gera `.output/`. Nessa
  configuração o `npm run preview` procura `dist/server/server.js` e não sobe o servidor;
  para testar localmente, use `npm run dev`.
- O projeto não tem testes automatizados; a validação é feita com `npm run lint`,
  `npx tsc --noEmit` e `npm run build`.
- As cores, fontes e raios ficam em `src/styles.css`. Novos componentes devem reutilizar esses
  tokens (`bg-card`, `text-primary`, `border-border` etc.) para manter a identidade visual.

## Correções aplicadas à API original

- `require('./models/games')` importava `catweb`, mas o modelo exporta `catgames` —
  a rota `/categoria/games` estava quebrada e agora funciona.
- `express.urlencoded({ extende: true })` corrigido para `extended: true`.
- `/postagem/:index` retorna `404` com mensagem JSON em vez de `undefined`.
- Campo `categoria` adicionado de forma consistente a todas as postagens.
- Imagens de thumbnail repetidas/externas substituídas pelas imagens locais do projeto.
- `models/games.js` deixou de duplicar postagens: agora deriva dos dados reais.
