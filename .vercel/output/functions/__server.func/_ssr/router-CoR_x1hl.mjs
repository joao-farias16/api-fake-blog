import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as QueryClientProvider, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Route$9 } from "./autor._nome-gk9nsgS6.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$10 } from "./postagem._index-BsreXvMG.mjs";
import { t as Route$11 } from "./routes-CQxyGC5N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CoR_x1hl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CHNjYr9J.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "FakeBlog — Blog de tecnologia" },
			{
				name: "description",
				content: "Blog de tecnologia que consome a API de estudo em Node.js + Express."
			},
			{
				property: "og:title",
				content: "FakeBlog — Blog de tecnologia"
			},
			{
				property: "og:description",
				content: "Blog de tecnologia que consome a API de estudo em Node.js + Express."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var publicacoes = [
	{
		thumbImage: "/images/post-1.jpg",
		thumbImageAltText: "Google Notícias",
		title: "Google Notícias completa 20 anos com redesign e fundo de apoio ao jornalismo independente",
		description: "Na última semana, o Google apresentou uma nova versão para desktop do seu serviço de notícias. Após um redesign profundo, o Google Notícias promete informar mais sobre os temas que os usuários acompanham, com mais profundidade e facilidade de acesso – seja lendo no smartphone ou, agora, no computador.",
		categoria: "tecnologia",
		profileThumbImage: "/images/profile-1.jpg",
		profileName: "Fernando Silva",
		postDate: "01/03/2022"
	},
	{
		thumbImage: "/images/post-2.jpg",
		thumbImageAltText: "MacBook Pro com chip M2",
		title: "Vendas do Macbook Pro com chip M2 começam nesta sexta-feira (24)",
		description: "Durante a WWDC deste ano, a Apple anunciou diversas novidades em seus sistemas e produtos, incluindo um Macbook Air redesenhado e com a segunda geração de chips da empresa, o M2.",
		categoria: "tecnologia",
		profileThumbImage: "/images/profile-1.jpg",
		profileName: "Paula Ramos",
		postDate: "01/03/2022"
	},
	{
		thumbImage: "/images/post-3.jpg",
		thumbImageAltText: "Citroen Ami Buggy",
		title: "Citroen Ami Buggy: O carro mais simpático que você já viu até hoje",
		description: "17 minutos para esgotar e apenas 2 minutos e 53 segundos para vender a primeira unidade. Estes são os números (incríveis) das vendas das 50 unidades especiais e ultra limitadas do My Ami Buggy, da Citroen.",
		categoria: "carros",
		profileThumbImage: "/images/profile-1.jpg",
		profileName: "Rodrigo Silveira",
		postDate: "01/03/2022"
	},
	{
		thumbImage: "/images/post-4.jpg",
		thumbImageAltText: "Hyenas, novo FPS da SEGA",
		title: "SEGA anuncia Hyenas, novo FPS no espaço pós-apocalíptico",
		description: "O mundo dos jogos competitivos nunca foi tão diverso, e o anúncio feito pela SEGA nesta quarta-feira (22) promete contribuir com outro título promissor.",
		categoria: "games",
		profileThumbImage: "/images/profile-1.jpg",
		profileName: "Lucas Oliveira",
		postDate: "10/06/2022"
	},
	{
		thumbImage: "/images/post-5.jpg",
		thumbImageAltText: "Metaverso",
		title: "Metaverso explode em discussões na internet, mas público ainda tem receios",
		description: "De acordo com números consolidados pela Comscore, apenas 24% dos comentários da internet sobre o metaverso são positivos. O motivo, por sua vez, seria o desconhecimento do público acerca do assunto, que ainda desperta dúvidas e receios em muita gente.",
		categoria: "metaverso",
		profileThumbImage: "/images/profile-1.jpg",
		profileName: "Maria Silva",
		postDate: "10/06/2022"
	},
	{
		thumbImage: "/images/post-6.jpg",
		thumbImageAltText: "Web3",
		title: "Como o metaverso e a web3 revolucionarão a vida e os negócios?",
		description: "A ideia de criar mundos inteiramente fictícios e com possibilidades infinitas sempre encantou o ser humano. Seja nas antigas tradições orais, na literatura, nas telas do cinema ou nos jogos, mais recentemente, o desejo pela materialização daquilo que somente a criatividade e a mente podem elaborar move montanhas, além de muito dinheiro.",
		categoria: "metaverso",
		profileThumbImage: "/images/profile-1.jpg",
		profileName: "Debora Pacheco",
		postDate: "10/06/2022"
	}
];
/** Retorna todas as postagens, cada uma com seu índice (usado pelo frontend). */
function listarPostagens() {
	return publicacoes.map((post, index) => ({
		index,
		...post
	}));
}
/** Retorna uma postagem pelo índice ou null quando não existir. */
function obterPostagem(indexParam) {
	const index = Number(indexParam);
	if (!Number.isInteger(index) || index < 0 || index >= publicacoes.length) return null;
	return {
		index,
		...publicacoes[index]
	};
}
/** Categorias derivadas dos próprios dados, com a quantidade de postagens. */
function listarCategorias() {
	const contagem = /* @__PURE__ */ new Map();
	for (const post of publicacoes) contagem.set(post.categoria, (contagem.get(post.categoria) ?? 0) + 1);
	return [...contagem.entries()].map(([categoria, total]) => ({
		categoria,
		total
	}));
}
function listarPorCategoria(categoria) {
	const alvo = String(categoria).toLowerCase();
	return listarPostagens().filter((post) => post.categoria.toLowerCase() === alvo);
}
function listarAutores() {
	const autores = /* @__PURE__ */ new Map();
	for (const post of publicacoes) {
		const atual = autores.get(post.profileName);
		if (atual) atual.total += 1;
		else autores.set(post.profileName, {
			nome: post.profileName,
			profileThumbImage: post.profileThumbImage,
			total: 1
		});
	}
	return [...autores.values()];
}
function listarPorAutor(nome) {
	const alvo = String(nome).toLowerCase();
	return listarPostagens().filter((post) => post.profileName.toLowerCase() === alvo);
}
/** Busca simples por título, descrição ou categoria. */
function buscarPostagens(termo) {
	const q = String(termo ?? "").trim().toLowerCase();
	if (!q) return [];
	return listarPostagens().filter((post) => [
		post.title,
		post.description,
		post.categoria
	].join(" ").toLowerCase().includes(q));
}
/** Destaques: regra simples e determinística — as 3 postagens mais recentes. */
function listarDestaques() {
	const paraData = (br) => {
		const [dia, mes, ano] = br.split("/").map(Number);
		return new Date(ano, mes - 1, dia).getTime();
	};
	return [...listarPostagens()].sort((a, b) => paraData(b.postDate) - paraData(a.postDate)).slice(0, 3);
}
/** Resposta JSON padrão dos endpoints da API. */
function json(data, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"access-control-allow-origin": "*",
			"cache-control": "no-store"
		}
	});
}
var Route$7 = createFileRoute("/api/public/autores")({ server: { handlers: { GET: () => json(listarAutores()) } } });
var Route$6 = createFileRoute("/api/public/buscar")({ server: { handlers: { GET: ({ request }) => {
	return json(buscarPostagens(new URL(request.url).searchParams.get("q")));
} } } });
var Route$5 = createFileRoute("/api/public/categorias")({ server: { handlers: { GET: () => json(listarCategorias()) } } });
var Route$4 = createFileRoute("/api/public/postagens")({ server: { handlers: { GET: () => json(listarPostagens()) } } });
var Route$3 = createFileRoute("/api/public/autor/$nome")({ server: { handlers: { GET: ({ params }) => {
	const postagens = listarPorAutor(decodeURIComponent(params.nome));
	if (postagens.length === 0) return json({
		erro: "Autor não encontrado",
		postagens: []
	}, 404);
	return json(postagens);
} } } });
var Route$2 = createFileRoute("/api/public/categoria/$categoria")({ server: { handlers: { GET: ({ params }) => {
	const postagens = listarPorCategoria(params.categoria);
	if (postagens.length === 0) return json({
		erro: "Categoria não encontrada",
		postagens: []
	}, 404);
	return json(postagens);
} } } });
var Route$1 = createFileRoute("/api/public/postagem/$index")({ server: { handlers: { GET: ({ params }) => {
	const postagem = obterPostagem(params.index);
	if (!postagem) return json({ erro: "Postagem não encontrada" }, 404);
	return json(postagem);
} } } });
var Route = createFileRoute("/api/public/postagens/destaques")({ server: { handlers: { GET: () => json(listarDestaques()) } } });
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var AutorNomeRoute = Route$9.update({
	id: "/autor/$nome",
	path: "/autor/$nome",
	getParentRoute: () => Route$8
});
var PostagemIndexRoute = Route$10.update({
	id: "/postagem/$index",
	path: "/postagem/$index",
	getParentRoute: () => Route$8
});
var ApiPublicAutoresRoute = Route$7.update({
	id: "/api/public/autores",
	path: "/api/public/autores",
	getParentRoute: () => Route$8
});
var ApiPublicBuscarRoute = Route$6.update({
	id: "/api/public/buscar",
	path: "/api/public/buscar",
	getParentRoute: () => Route$8
});
var ApiPublicCategoriasRoute = Route$5.update({
	id: "/api/public/categorias",
	path: "/api/public/categorias",
	getParentRoute: () => Route$8
});
var ApiPublicPostagensRoute = Route$4.update({
	id: "/api/public/postagens",
	path: "/api/public/postagens",
	getParentRoute: () => Route$8
});
var ApiPublicAutorNomeRoute = Route$3.update({
	id: "/api/public/autor/$nome",
	path: "/api/public/autor/$nome",
	getParentRoute: () => Route$8
});
var ApiPublicCategoriaCategoriaRoute = Route$2.update({
	id: "/api/public/categoria/$categoria",
	path: "/api/public/categoria/$categoria",
	getParentRoute: () => Route$8
});
var ApiPublicPostagemIndexRoute = Route$1.update({
	id: "/api/public/postagem/$index",
	path: "/api/public/postagem/$index",
	getParentRoute: () => Route$8
});
var ApiPublicPostagensRouteChildren = { ApiPublicPostagensDestaquesRoute: Route.update({
	id: "/destaques",
	path: "/destaques",
	getParentRoute: () => ApiPublicPostagensRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AutorNomeRoute,
	PostagemIndexRoute,
	ApiPublicAutoresRoute,
	ApiPublicBuscarRoute,
	ApiPublicCategoriasRoute,
	ApiPublicPostagensRoute: ApiPublicPostagensRoute._addFileChildren(ApiPublicPostagensRouteChildren),
	ApiPublicAutorNomeRoute,
	ApiPublicCategoriaCategoriaRoute,
	ApiPublicPostagemIndexRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
