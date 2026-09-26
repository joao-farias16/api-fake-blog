import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/postagem._index-BsreXvMG.js
var $$splitComponentImporter = () => import("./postagem._index-CBnb6Q0h.mjs");
var Route = createFileRoute("/postagem/$index")({
	head: () => ({ meta: [
		{ title: "Postagem — FakeBlog" },
		{
			name: "description",
			content: "Detalhes completos de uma postagem, carregados pelo endpoint /postagem/:index."
		},
		{
			property: "og:title",
			content: "Postagem — FakeBlog"
		},
		{
			property: "og:description",
			content: "Detalhes completos de uma postagem do blog de tecnologia."
		},
		{
			property: "og:type",
			content: "article"
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
