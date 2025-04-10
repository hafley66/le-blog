// deno-lint-ignore-file jsx-key
import { SUB } from "~/blog/unholy-custom-jsx-with-observable-strings/SITEMAP.deno.ts"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
const $ = Render$(import.meta.filename!)

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
${SUB.subFolder("intro/").CodeTabs()}

## JSX.Element Type
In this jsx transform, thie children types are 

~~~ts
export namespace JSX {
  type Element = Observable<string>
}
~~~

That means every __JSX Expression__ is:
1. pipe-able
    - You can throttle/debounce re-renders intuitively
    - The end result of your intense chains/compositions of rxjs can be the output for jsx
    - Align them to any scheduler
    - Memo-ize freely with \`distinct\` operators
2. subscribe-able
    - You can do whatever you want with the html string produced by the jsx
    - In the following demo's, I simply subscribe and assign to the iframe's body.innerHTML

## Components
In this style, a component is any function that returns an observable. 

This also means that we dont call functions more than once! 
This framework is like solid.js and vue hooks, where we are declaring everything once, then re-evaluating when necessary by means of RxJS and Observables.

Here is a basic, re-usable component comparison:

:::codes 
~~~tsx
// @@filename RxJSX
export const Component = () => {
  return <div>Hello World</div>
}
~~~

~~~tsx
// @@filename React
export const Component = () => {
  return <div>Hello World</div>
}
~~~
:::

### Add static props and styling
Now we can leverage props for dynamic styling

:::codes 
~~~tsx
// @@filename RxJSX
type Props = {
  isRed?: boolean
}

export const Component = (props: Props) => {
  return <div style={{
    background: props.isRed ? 'red' : undefined
  }}>
    Hello World
  </div>
}
~~~

~~~tsx
// @@filename React
type Props = {
  isRed?: boolean
}

export const Component = (props: Props) => {
  return <div style={{
    background: props.isRed ? 'red' : undefined
  }}>
    Hello World
  </div>
}
~~~
:::

However there is 1 problem, our RxJSX props never get redefined. If we want to react to changes in isRed, we must change a few things:

1. We can pass isRed as isRed$
    - \`$\` at the end of a variable is RxJS __convention__ for indicating an observable value.
    - You dont have to do this if you are in typescript, but it can save a headache or two from time to time.
2. This is not unlike \`Signal\`s in Solid.js and in general, there is no auto-reacting.

${$.CodeTabs.start()}
~~~tsx
// @@filename RxJSX
// @@eval
import { map } from 'rxjs';

type Props = {
  isRed$?: boolean
}

export const Component = (props: Props) => {
  return <div style={{
    background: props.isRed$.pipe(
      map(isRed => isRed ? 'red' : undefined)
    )
  }}>
    Hello World
  </div>
}
~~~
~~~tsx    
// @@filename React
type Props = {
  isRed?: boolean
}

export const Component = (props: Props) => {
  return <div style={{
    background: props.isRed ? 'red' : undefined
  }}>
    Hello World
  </div>
}
~~~
${$.CodeTabs.end()}

## Props
Props are the second argument to the JSX transform function's well defined interfaces. 

When you do this in react/solidjs/vue jsx/anything, it must be compiled to true javascript. 
This means functions calls:
${$.CodeTabs.start()}
~~~tsx
// @@filename From
const _jsx_element_instance_ = 
<div 
  className="card"
  id="hello-btn"
>
  Hello world
</div>
~~~
~~~tsx
// @@filename To   
const _jsx_element_instance_ = jsx(
'div', {
  className:"card",
  id:"hello-btn",
children: [
 'Hello world'
]})
~~~
${$.CodeTabs.end()}

## Counter Demo
Here are some demo's of this technique **without DOM events and state**. This is what we can achieve with just a few functions from rxjs itself.

If you don't know rxjs, dont panic, just know that \`interval\` is like \`setTimeout\` + \`setState\`.
1. You give it the interval in milliseconds as first arg
2. It will count, __starting from zero__, forever
3. It's also __lazy__ like \`setInterval\`, it will not emit a value right away
    - This is why you see \`.pipe(startWith(0))\`
    - Imagine this is the first arg to useState, so we already have a value on initial render.
4. It feels backwards for some things, but that is a virtue in RxJS style of composition.

${SUB.subFolder("counter/").CodeTabs()}

## Children
TODO: 

### Arrays
Okay and lets make sure that doing regular array map's into jsx work as expected, as well as conditionals.

${SUB.subFolder("arrays/").CodeTabs({ debug: true })}

### Conditionals
TODO:

## State
For idiomatic RxJS, I heavily urge you to avoid BehaviorSubject as much as possible. BUT, it exists for a reason, and when you are starting out, you will want to use it all the time.

Just know that using it will delay you from understanding everything you see as state is really just some other observable somewhere else.

${SUB.subFolder("state/").CodeTabs()}

`, //``
})
