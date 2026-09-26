import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { a as InlineLoading, c as api, i as ErrorState, n as Button, o as LoadingGrid, r as EmptyState, s as SiteHeader } from "./states-Sd8sGc6k.mjs";
import { n as PostGrid, t as PostCard } from "./post-grid-IO5q74w5.mjs";
import { t as Route } from "./routes-CQxyGC5N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BODTnd1q.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { q = "", categoria = "" } = Route.useSearch();
	const navigate = useNavigate({ from: "/" });
	const atualizar = (params) => navigate({ search: (prev) => ({
		...prev,
		...params
	}) });
	const categorias = useQuery({
		queryKey: ["categorias"],
		queryFn: api.categorias
	});
	const destaques = useQuery({
		queryKey: ["destaques"],
		queryFn: api.destaques
	});
	const autores = useQuery({
		queryKey: ["autores"],
		queryFn: api.autores
	});
	const modo = q ? "busca" : categoria ? "categoria" : "todas";
	const postagens = useQuery({
		queryKey: [
			"postagens",
			modo,
			q,
			categoria
		],
		queryFn: () => modo === "busca" ? api.buscar(q) : modo === "categoria" ? api.porCategoria(categoria) : api.postagens(),
		retry: false
	});
	const tituloLista = modo === "busca" ? `Resultados para “${q}”` : modo === "categoria" ? `Categoria: ${categoria}` : "Todas as postagens";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {
				initialQuery: q,
				onSearch: (termo) => atualizar({
					q: termo,
					categoria: ""
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "surface-glow border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-12 sm:py-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-[0.2em] text-primary uppercase",
							children: "Node.js · Express · API de estudo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 max-w-2xl text-3xl leading-tight font-bold sm:text-5xl",
							children: "Notícias de tecnologia servidas por uma API real"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-sm text-muted-foreground sm:text-base",
							children: "Cada postagem, categoria e busca desta página vem de uma requisição aos endpoints da API."
						})
					]
				})
			}),
			modo === "todas" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Destaques"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: ["As postagens mais recentes, via ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "text-primary",
							children: "/postagens/destaques"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: destaques.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingGrid, { items: 3 }) : destaques.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: destaques.error.message }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
							children: destaques.data.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.index))
						})
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-4 pb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: modo === "todas" ? "default" : "secondary",
						size: "sm",
						onClick: () => atualizar({
							q: "",
							categoria: ""
						}),
						children: "Todas"
					}), categorias.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						children: "Carregando categorias…"
					}) : categorias.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-destructive",
						children: "Categorias indisponíveis"
					}) : categorias.data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: categoria === item.categoria ? "default" : "secondary",
						size: "sm",
						onClick: () => atualizar({
							categoria: item.categoria,
							q: ""
						}),
						children: [
							item.categoria,
							" (",
							item.total,
							")"
						]
					}, item.categoria))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 pb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: tituloLista
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: postagens.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingGrid, {}) : postagens.isError ? modo === "categoria" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "Categoria sem postagens",
						description: postagens.error.message
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: postagens.error.message }) : postagens.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "Nenhuma postagem encontrada",
						description: "Tente outro termo de pesquisa ou escolha uma categoria."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostGrid, { posts: postagens.data })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "autores",
				className: "border-t border-border bg-card/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Autores"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: ["Lista vinda de ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "text-primary",
								children: "/autores"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: autores.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineLoading, { label: "Carregando autores…" }) : autores.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: autores.error.message }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
								children: autores.data.map((autor) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/autor/$nome",
									params: { nome: autor.nome },
									className: "flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: autor.profileThumbImage,
										alt: autor.nome,
										className: "size-10 rounded-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: autor.nome
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											autor.total,
											" ",
											autor.total === 1 ? "postagem" : "postagens"
										]
									})] })]
								}, autor.nome))
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-4 py-8 text-xs text-muted-foreground",
					children: "FakeBlog — frontend consumindo a API de estudo em Node.js + Express."
				})
			})
		]
	});
}
//#endregion
export { Home as component };
