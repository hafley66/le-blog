import { Render$ } from "~/lib/0_RenderBase.deno.tsx";
import { SUB } from "./SITEMAP.deno.ts";
const $ = Render$(import.meta.filename!);

export default $.SSGLayout({
	title: "React Query vs RxJS and switchMap",
	description: "Its all switchMap",
	// date_created: "2025-02-25",
	tags: [
		"typescript",
		"javascript",
		"rxjs",
		"react-query",
		"react",
		"react-context",
		"rxjs-share",
		"react-hooks",
	],
	...$.md``,
});
