import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { FS } from "~/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

const F =
  "src/blog/unholy-custom-jsx-with-observable-strings" as const

export default $.SSGLayout({
  title:
    "True lazy rendering with JSX and RxJS Observables",
  description: (
    <em>
      <blockquote>
        "Do you think God stays in heaven because he too
        lives in fear of what he's created?"
      </blockquote>
    </em>
  ),
  date_created: "2025-02-25",
  tags: [
    "typescript",
    "javascript",
    "jsx",
    "react",
    "deno",
    "rxjs",
  ],
  ...$.md`
## Abstract
I created a jsx implementation that returns \`Observable<string>\` for static site generation(SSG). It uses a really simple technique to determine when a component is ready (first emit!). This round is for unsanitized html over time for my blog.

You can do both of these with this technique:
Subscribe to every next value of your html over time using...just rxjs.

Here are 3 main demos demonstrating basic jsx, sync jsx, and async jsx.
:::codes
~~~tsx
// @@filename Basic
// @@eval
${FS["src/blog/unholy-custom-jsx-with-observable-strings/basic.deno.tsx"].readSync()}
~~~

~~~tsx eval
// @@filename Sync children
// @@eval
${FS["src/blog/unholy-custom-jsx-with-observable-strings/sync.deno.tsx"].readSync()}
~~~

~~~tsx
// @@filename Async Observable
// @@eval
${FS["src/blog/unholy-custom-jsx-with-observable-strings/async.deno.tsx"].readSync()}
~~~

~~~tsx
// @@filename Async RxJS 
// @@eval
${FS["src/blog/unholy-custom-jsx-with-observable-strings/async.rxjs.deno.tsx"].readSync()}
~~~

:::
`,
})
