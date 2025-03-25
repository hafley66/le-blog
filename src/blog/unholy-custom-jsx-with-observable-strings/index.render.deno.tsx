import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { FS, SITEMAP } from "~/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

const F =
  "src/blog/unholy-custom-jsx-with-observable-strings" as const
// SITEMAP.startsWith(F);
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

Here are 4 main demos demonstrating basic jsx, sync jsx, and async jsx with observables, and async jsx with rxjs.

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

## Basics
In this jsx transform, thie children types are \`Array<string | number | boolean | Observable<string | number | boolean>>\`.

This means you can do anything with rxjs as a child, so long as it results in a string over time.

:::codes
${FS["src/blog/unholy-custom-jsx-with-observable-strings/5_interval.dom.tsx"].frontendDemo()}
${FS["src/blog/unholy-custom-jsx-with-observable-strings/6_interval.dom.tsx"].frontendDemo()}
:::



## State
For idiomatic RxJS, I heavily urge you to avoid BehaviorSubject as much as possible. BUT, it exists for a reason, and when you are starting out, you will want to use it all the time.

Just know that using it will delay you from understanding everything you see as state is really just some other observable somewhere else.

:::codes
${FS["src/blog/unholy-custom-jsx-with-observable-strings/state.1.dom.tsx"].frontendDemo("With BehaviorSubject")}
${FS["src/blog/unholy-custom-jsx-with-observable-strings/state.2.dom.tsx"].frontendDemo("Without BehaviorSubject")}
:::

`,
})
