/** @jsxImportSource ~/lib/rxjs-vhtml */
/** @jsxImportSourceTypes ~/lib/rxjs-vhtml */

import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { FS } from "~/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "React Query vs RxJS and switchMap",
  description: "Its all switchMap",
  date_created: "2025-02-25",
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
  ...$.md`

## Motivations
I recently finished up working on multiple projects with react-query, and at the end of it, I was transitioning into using plain rxjs for making side effects as state.

I spent several months over-abstracting rxjs + react-query, when I finally realized I can just use some very simple patterns.

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
