import _ from "lodash"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { $$ } from "~/BASH.deno.ts"
import { lastValueFrom, switchMap } from "rxjs"
const $ = Render$(import.meta.filename!)
// const pre = $$`source ${process.cwd()}/src/bash/_.watch.sitemap.bash; cd ${import.meta.dirname}; _.watch.sitemap.check src`
const m = $.md`

## Abstract

I present a tutorial for replacing vite's glob import and css imports with zero magic and standard tools like typescript. It results in a file that mimics the output of bash's \`find\` command into a typescript object.

:::codes
~~~text
@@filename fs
src/
  blog/
    hello-world/
      index.css
      index.render.deno.tsx
      example.png
~~~

~~~ts
// @@filename SITEMAP.deno.ts
export const FS = {
  "src/blog/hello-world/index.css": {
    path: "src/blog/hello-world/index.css",
    filename: "index.css",
    dirname:
      "src/blog/hello-world",
    super_extension: "css",
    extension: "css",
    importPath:
      "~/blog/hello-world/index.css",
    readSync: () =>
      Deno.readTextFileSync(
        "src/blog/hello-world/index.css",
      ),
    linkTag: () =>
      "<link rel='stylesheet' href='/src/blog/hello-world/index.css'/>",
    publicPath:
      "/src/blog/hello-world/index.css",
  }
  "src/blog/hello-world/index.render.deno.tsx": {
    path: "src/blog/hello-world/index.render.deno.tsx",
    filename: "index.render.deno.tsx",
    dirname: "src/blog/hello-world",
    super_extension: "render.deno.tsx",
    extension: "tsx",
    importPath: "~/blog/hello-world/index.render.deno.tsx",
    readSync: () =>
      Deno.readTextFileSync(
        "src/blog/hello-world/larg-code-snippet.deno.tsx",
      ),
    dynamicImport: () =>
      import("~/blog/hello-world/larg-code-snippet.deno.tsx"),
  }
  "src/blog/hello-world/example.png": {
    path: "src/blog/hello-world/example.png",
    filename: "example.png",
    dirname: "src/blog/hello-world",
    super_extension: "png",
    extension: "png",
    importPath:
      "~/blog/hello-world/example.png",
    readSync: () =>
      Deno.readTextFileSync(
        "src/blog/hello-world/example.png",
      ),
  },
} as const
~~~

~~~tsx
// @@filename index.render.deno.tsx
import { FS } from '~/SITEMAP.deno.ts';
export default <>
  \${FS['src/blog/hello-world/example.css'].linkTag()}
  <p>Hello World!</p>
</>
~~~
:::



Goals:
1. Implement [Vite's glob import](https://vite.dev/guide/features#glob-import) functionality using bash + typescript.
    - NO MAGIC non-standard meta extensions

2. Replace \`astro.js\`'s  css import for ssg with plain link tags
    - this removes the magic css imports \`import "index.css"\`
    - SSG is just **string concatenation**
        - I am just going to inline the link to stylesheet for vite to pick up in html processing

3. You can create your own sitemap for the set of all files you could ever mention in your blog or code, that is also &**fully typed**.
    - No need for content collections and zod when you can just have the types up front.



This idea came from trying to use Astro.js to build my blog for static site generation (*SSG*). I was trying to make the tags and all posts page and I was stuck deciding between using astro jsx, react, md, or mdx as options. There is _so much_ flexibility that it began to feel like a dislocated shoulder.

Another attribute of this technique is _no *implicit* magic_. We will not rely on framework specific import loaders or custom file type loaders. 

At the end of the day, this is all string concatenation/meta-programming an html page, why add more implicit behavior to the fire.

Here is the end result: A typesafe object with constant strings of rootpaths to all relevant files.

:::codes

~~~tsx twoslash
// @@filename TSX file
// @@eval
import { FS } from '~/SITEMAP.deno.ts'
const fullyTypedTsEntry = FS["src/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx"]

console.log(fullyTypedTsEntry.readSync())
console.log(fullyTypedTsEntry.importPath)
console.log(fullyTypedTsEntry.extension)
console.log(fullyTypedTsEntry.path)
console.log((await fullyTypedTsEntry.dynamicImport()).default)
~~~

~~~tsx twoslash
// @@filename CSS file
// @@eval
import { FS } from '~/SITEMAP.deno.ts'
const fullyTypedCssEntry = FS["src/blog/make-your-own-sitemap-with-typescript/example.css"]

console.log(fullyTypedCssEntry.linkTag())
console.log(fullyTypedCssEntry.publicPath)
console.log(fullyTypedCssEntry.importPath)
console.log(fullyTypedCssEntry.extension)
console.log(fullyTypedCssEntry.path)
~~~

:::

This is a very powerful feature for automatting or matching on specific filenames, for instance, when you want to import all your route handlers or other related shenanigans.

## Start with a single dynamic import
A powerful feature of bundlers (webpack/vite/etc.) is [dynamic import](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#sec-import-calls). There are also bundlers/frameworks that provide their own sense of _glob imports_, a bundler specific magic feature.

0. [Webpack dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) 
    - Has magic comments for features
1. [Vite has one here](https://vite.dev/guide/features#dynamic-import)
    - Has restraints on inputs
2. [Rspack](https://rspack.dev/guide/optimization/code-splitting#dynamic-import)
    - Has magic comment rules

This feature is very useful for lazy/code splitting in bundlers as a performance optimization. However it requires hard strings that are reachable _by the bundler's config_. What I prefer is having a *typed dictionary* of the output of 


`

export default $.SSGLayout({
  title:
    "Make Your Own Sitemap and Glob Import With Typescript",
  description:
    "Sprinkle some meta programming to unroll the set of all possible imports. Stop relying on frameworks to provide this convenience.",

  date_created: "2025-02-25",
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
  toc: m.toc,
  // children: pre.pipe(
  //   switchMap(i => (console.log({ hmm: i }), m.children)),
  // ),
  children: m.children,
})
