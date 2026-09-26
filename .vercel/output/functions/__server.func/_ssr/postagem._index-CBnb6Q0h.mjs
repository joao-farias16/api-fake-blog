import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { c as ArrowLeft, r as Tag, s as CalendarDays } from "../_libs/lucide-react.mjs";
import { a as InlineLoading, c as api, i as ErrorState, n as Button, r as EmptyState, s as SiteHeader, t as Badge } from "./states-Sd8sGc6k.mjs";
import { t as Route } from "./postagem._index-BsreXvMG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/postagem._index-CBnb6Q0h.js
var import_jsx_runtime = require_jsx_runtime();
function PostagemPage() {
	const { index } = Route.useParams();
	const navigate = useNavigate();
	const postagem = useQuery({
		queryKey: ["postagem", index],
		queryFn: () => api.postagem(index),
		retry: false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { onSearch: (q) => navigate({
			to: "/",
			search: { q }
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-4 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					className: "mb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							className: "size-4",
							"aria-hidden": true
						}), "Voltar para as postagens"]
					})
				}),
				postagem.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineLoading, { label: "Carregando postagem…" }) : postagem.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Postagem não encontrada",
					description: postagem.error.message
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "uppercase",
						children: postagem.data.categoria
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-2xl leading-tight font-bold sm:text-4xl",
						children: postagem.data.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/autor/$nome",
								params: { nome: postagem.data.profileName },
								className: "flex items-center gap-2 hover:text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: postagem.data.profileThumbImage,
									alt: postagem.data.profileName,
									className: "size-8 rounded-full object-cover"
								}), postagem.data.profileName]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
									className: "size-4",
									"aria-hidden": true
								}), postagem.data.postDate]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
										className: "size-4",
										"aria-hidden": true
									}),
									"índice #",
									postagem.data.index
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: postagem.data.thumbImage,
						alt: postagem.data.thumbImageAltText,
						className: "mt-8 aspect-[16/9] w-full rounded-xl border border-border object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-base leading-relaxed text-foreground/90",
						children: postagem.data.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-sm text-muted-foreground",
						children: ["Dados carregados de ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
							className: "text-primary",
							children: ["/postagem/", index]
						})]
					})
				] }),
				postagem.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, { message: "Confira o índice informado ou se a API está disponível." })
				}) : null
			]
		})]
	});
}
//#endregion
export { PostagemPage as component };
