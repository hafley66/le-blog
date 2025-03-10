import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { defineEcConfig } from "astro-expressive-code";
import ecTwoSlash from "expressive-code-twoslash";

export default defineEcConfig({
	plugins: [ecTwoSlash(), pluginLineNumbers()],
});
