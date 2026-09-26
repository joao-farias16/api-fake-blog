import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Badge } from "./states-Sd8sGc6k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/post-grid-IO5q74w5.js
var import_jsx_runtime = require_jsx_runtime();
function PostCard({ post }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/postagem/$index",
		params: { index: String(post.index) },
		className: "group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "aspect-[16/9] overflow-hidden bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: post.thumbImage,
				alt: post.thumbImageAltText,
				loading: "lazy",
				className: "h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "w-fit uppercase tracking-wide",
					children: post.categoria
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg leading-snug font-semibold text-card-foreground group-hover:text-primary",
					children: post.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-3 text-sm text-muted-foreground",
					children: post.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-center gap-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: post.profileThumbImage,
						alt: post.profileName,
						className: "size-8 rounded-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-card-foreground",
							children: post.profileName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: post.postDate
						})]
					})]
				})
			]
		})]
	});
}
function PostGrid({ posts }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
		children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, { post }, post.index))
	});
}
//#endregion
export { PostGrid as n, PostCard as t };
