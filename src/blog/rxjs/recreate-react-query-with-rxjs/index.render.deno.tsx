import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { SUB } from "./SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

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
  ...$.md`

## The basic useQuery
One way to describe useQuery is as replacement for useEffect, if useEffect had a cache-by-dependency-array and a return value of its current state. 

Lets imagine we have an async calculator API for math with \`async add\` and \`async sub\`.

~~~tsx
// @@filename 
${SUB.fs["sample.deno.tsx"].readSync()}
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
