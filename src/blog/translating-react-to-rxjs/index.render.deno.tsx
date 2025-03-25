import { FS } from "~/SITEMAP.deno.ts"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "Translate React to RxJS",
  description: "Hope this helps someone",
  // date_created: "(Living Document)",
  tags: [
    "typescript",
    "javascript",
    "rxjs",
    "react",
    "react-context",
    "rxjs-share",
    "react-hooks",
    "observables",
  ],
  ...$.md`

## The basic useQuery
One way to describe useQuery is as replacement for useEffect, if useEffect had a cache-by-dependency-array and a return value of its current state. 

Lets imagine we have an async calculator API for math with \`async add\` and \`async sub\`.

~~~tsx
// @@filename 
${FS["src/blog/rxjs/recreate-react-query-with-rxjs/sample.deno.tsx"].readSync()}
~~~

:::codes
~~~tsx
// @@filename basic useQuery

~~~

~~~tsx
// @@filename useEffect + state

~~~
:::

`,
})
