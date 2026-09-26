import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CQxyGC5N.js
var $$splitComponentImporter = () => import("./routes-BODTnd1q.mjs");
var searchSchema = objectType({
	q: stringType().optional(),
	categoria: stringType().optional()
});
var Route = createFileRoute("/")({
	validateSearch: searchSchema,
	head: () => ({ meta: [
		{ title: "FakeBlog — Blog de tecnologia consumindo a API" },
		{
			name: "description",
			content: "Blog de tecnologia que consome a API de estudo em Node.js + Express: postagens, categorias, busca e autores."
		},
		{
			property: "og:title",
			content: "FakeBlog — Blog de tecnologia"
		},
		{
			property: "og:description",
			content: "Postagens, categorias, busca e autores vindos direto da API de estudo."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
