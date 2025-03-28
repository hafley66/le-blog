import _ from "lodash"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { $$ } from "~/BASH.deno.ts"
import { lastValueFrom, switchMap } from "rxjs"
const $ = Render$(import.meta.filename!)
// const pre = $$`source ${process.cwd()}/src/bash/_.watch.sitemap.bash; cd ${import.meta.dirname}; _.watch.sitemap.check src`

export default $.SSGLayout({
  title:
    "Make Your Own Sitemap and Glob Import With Typescript",
  description:
    "Sprinkle some meta programming to unroll the set of all possible imports. Stop relying on frameworks to provide this convenience.",

  // date_created: "2025-02-25",
  tags: [
    "bash",
    "globs",
    "typescript",
    "go",
    "linux",
    "metaprogramming",
    "frameworks",
    "diy",
  ],
  ...$.md`
  ## Start with a single dynamic import
  A powerful feature of bundlers (webpack/vite/etc.) is [dynamic import](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-import-calls). There are also bundlers/frameworks that provide their own sense of _glob imports_, a bundler specific magic feature.
  
  0. [Webpack dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) 
      - Has magic comments for features
  1. [Vite has one here](https://vite.dev/guide/features#dynamic-import)
      - Has restraints on inputs
  2. [Rspack](https://rspack.dev/guide/optimization/code-splitting#dynamic-import)
      - Has magic comment rules
  
  This feature is very useful for lazy/code splitting in bundlers as a performance optimization. However it requires hard strings that are reachable _by the bundler's config_. What I prefer is having a *typed dictionary* of the output of 
`,
})
