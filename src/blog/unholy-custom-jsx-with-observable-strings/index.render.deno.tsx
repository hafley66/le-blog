import { SUB } from "~/blog/unholy-custom-jsx-with-observable-strings/SITEMAP.deno.ts"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { CodeTabs } from "~/lib/CodeTabs/index.dual.tsx"
const $ = Render$(import.meta.filename!)
const { fs: FS } = SUB
const F =
  "src/blog/unholy-custom-jsx-with-observable-strings" as const

export default $.SSGLayout({
  title:
    "(DRAFT) True lazy rendering with JSX and RxJS Observables (DRAFT)",
  description: (
    <div className="f-col">
      <strong>DRAFT!!!</strong>
      <em>
        <blockquote>
          "Do you think God stays in heaven because he too
          lives in fear of what he's created?"
        </blockquote>
      </em>
    </div>
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

## HTML Over Time
React Components represent **HTML** over time.

Observables represent **any value**  over time.

So then, we can say React Components are \`Observable<JSX>\` over time.

After seeing this logic, I decided to create a RxJS version of \`JSX\`. It is meant to be as simple as possible, and promote what I view as idiomatic/practical RxJS.

### But actually why
I have a lot of experience getting react to work with RxJS. Often times, its a chaotic mess. Its much like lifting everything out of react and into redux. But even with redux, you are often left re-implementing a ton of missing features that are just in rxjs for free.

My biggest frustration was making this blog while learning the ReactDOM server API's. You must spam \`use(Promise)\` everywhere to prevent rendering your blog post. useEffect cannot be used as a way to defer rendering. React notes this in their docs for 19, with a special info block that tells you to use a meta-framework that does all this for you. Talk about friendly and intuitive ergonomics.

These are simply non-problems in RxJS, so I decided to write a version of jsx that __naturally__ allows lazy programming, by leveraging Observable's and RxJS.

If you want to defer rendering for a blog post, just do whatever combo of rxjs that you need.

RxJS is fundamentally the reverse order of how you do things in other libraries, but they express all the same things.

I truly hope that this is a starting point for some devs to build intuition or interest in RxJS, and more importantly, Observable's as a standard data structure.

### Comparisons with React
1. Components
    - Components are __run once__
        - Unlike React, more like Solid.js
    - The unit of reactivity is \`Observable<string>\`
        - Not signals, and not magic hooks
        - Just an Symbol.asyncIterable compatible data structure
    - Props
        - Props are not reactive, if you want reactive props, you must pass Observables
2. JSX Basics
    - Like all others, style as css object, className, id
    - __There are no refs__: this is intentional...for now
    - There is no vdom and reason for \`key\` prop...also for now
        - I will eventually learn how to make efficient dom updates just using rxjs and a read/write queue
3. DOM events
    - I am not supporting inline handlers for now
        - I view it as an anti-pattern
    - Instead, there are helpers for making __event delegation__ patterns easier
        - **jQuery was right all along**
    - But this keeps the DOM you produced mostly serializable from the get go
4. State
    - scan operator exists or new Observable for idiomatic RxJS
    - BehaviorSubject for imperative/useState style setState
5. Memos/Computed/Derived
    - In RxJS, you have a massive amount of incredibly useful tools
    - The very basic combo of \`combineLatest(...).pipe(map(MEMO_FN))\` will get you very far
        - This gives you manual control of the reactivity, instead of having 1 blunt tool for it
            - (Lexical scope deps arrays)
    - I do nothing special here, you must learn the power of \`merge\`, \`combineLatest\`
6. Effects
    - switchMap
        - switchMap
        - ?????????
        - Believe it or not, also switchMap
    - The ubiquity of switchMap will drive you nuts
    - You will see it in every library you use, a horrifically custom and duct taped switchMap of disappointment
    - You can do conditional useEffect's in this lib, bc switchMap doesn't care about magic call order 
7. Server Side Stuff
    - I have crazy ideas for this with websockets but thats a much later thing.
    - Running on the server is easy, I do it for the demos that output console.logs to the page.
    - Its just a string output, so you do what you want with it. 
    - Some day I'll make a better situations but for now it works fine for my blog.

### Basic Demos
Here are 4 intro demos demonstrating basic jsx, sync jsx, and async jsx with observables, and async jsx with rxjs.

The console.logs represent the value of html emitted over time.
${<CodeTabs folder={SUB.path! + "intro/"} index={0} />}

${FS["intro/basic.deno.tsx"].markdownDemo("Basic")}
${FS["intro/sync.deno.tsx"].markdownDemo("Sync children")}
${FS["intro/async.deno.tsx"].markdownDemo("Async Observable")}
${FS["intro/async.rxjs.deno.tsx"].markdownDemo("Async RxJS")}

`,
})
