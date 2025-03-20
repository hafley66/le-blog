import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { FS } from "~/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

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
// @@filename Basic Subscribe
// @@log
(<div>Hello World</div>).subscribe(console.log)
// Outputs: "<div>Hello World</div>"
~~~


~~~tsx
// @@filename Sync children
// @@log
const children = of("Hello World", "It was me, DIO");

(<div>{children}</div>).pipe(toArray()).subscribe(console.log)
// Outputs: ["<div>Hello World</div>", "<div>It was me, DIO</div>"]
~~~

~~~tsx
// @@filename Async children
const fakeUserApiCall = () => new Promise(
  res => setTimeout(
    () => res({id: 0, name: "DIO"}), 
    100
  )
);

(
  <div>
    Hello World
    <div>{
      new Observable(sub => {
        sub.next("Loading user...");
        fakeUserApiCall().then(
          i => sub.next(i) + sub.complete(), 
          err => sub.error(err)
        );
        return () => {
        }
      })
    }</div>
  </div>
).subscribe(
  console.log
)

// Outputs: 
// 1. <div> Hello World <div> Loading user... </div> </div>
// 2. <div> Hello World <div> DIO </div> </div>
~~~




:::
`,
})
