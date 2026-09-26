import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/autor._nome-gk9nsgS6.js
var $$splitComponentImporter = () => import("./autor._nome-DG-cTKp0.mjs");
var Route = createFileRoute("/autor/$nome")({
	head: () => ({ meta: [
		{ title: "Autor — FakeBlog" },
		{
			name: "description",
			content: "Postagens de um autor específico, carregadas pelo endpoint /autor/:nome."
		},
		{
			property: "og:title",
			content: "Autor — FakeBlog"
		},
		{
			property: "og:description",
			content: "Todas as postagens publicadas por um autor."
		},
		{
			property: "og:type",
			content: "profile"
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
