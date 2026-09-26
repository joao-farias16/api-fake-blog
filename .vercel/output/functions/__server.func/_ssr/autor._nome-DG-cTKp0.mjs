import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as Route } from "./autor._nome-gk9nsgS6.mjs";
import { c as ArrowLeft } from "../_libs/lucide-react.mjs";
import { c as api, n as Button, o as LoadingGrid, r as EmptyState, s as SiteHeader } from "./states-Sd8sGc6k.mjs";
import { n as PostGrid } from "./post-grid-IO5q74w5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/autor._nome-DG-cTKp0.js
var import_jsx_runtime = require_jsx_runtime();
function AutorPage() {
	const { nome } = Route.useParams();
	const navigate = useNavigate();
	const postagens = useQuery({
		queryKey: ["autor", nome],
		queryFn: () => api.porAutor(nome),
		retry: false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { onSearch: (q) => navigate({
			to: "/",
			search: { q }
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-10",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-2xl font-bold sm:text-3xl",
					children: ["Postagens de ", nome]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: ["Consultando ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("code", {
						className: "text-primary",
						children: ["/autor/", nome]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: postagens.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingGrid, { items: 3 }) : postagens.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "Nenhuma postagem para este autor",
						description: postagens.error.message
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostGrid, { posts: postagens.data })
				})
			]
		})]
	});
}
//#endregion
export { AutorPage as component };
