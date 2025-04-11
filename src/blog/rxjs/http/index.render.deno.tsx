import { from } from "rxjs"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { generateD2Diagram } from "~/lib/remark_rehype/remark-plant-uml.deno.ts"
import { SUB } from "./SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)
export default $.SSGLayout({
  title: "Part 1: Basic queries with RxJS",
  description: "Its all switchMap",
  date_created: "2025-04-09",
  tags: [
    "typescript",
    "javascript",
    "rxjs",
    "fetch",
    "websockets",
    "async",
    "promises",
    "http",
    "state machines",
  ],
  ...$.md`

## TLDR;
Here is the most basic form of calling an api in RxJS:

In main feature is the use of [switchMap](https://rxjs.dev/api/operators/switchMap) in response to input changes:

${$.CodeTabs.start()}
~~~ts
// @@filename switchMap
import {
  switchMap
} from 'rxjs'

export const makeGetUserById$ = (
  input$: Observable<{id: number}>
) => input$.pipe(
  switchMap(
    input => 
      fetch("/api/users/" + input.id)
        .then(i => i.json())
  )
)
~~~
${$.CodeTabs.end()}

We are going to eventually create something that looks like [tanstack/react-query](https://tanstack.com/query/latest) and [Redux Toolkit Query (RTK Query)](https://redux-toolkit.js.org/rtk-query/overview).

We are going to solve the problems in this order:
1. Add a loading status
2. Add a success status
3. Add an error status
4. Add ability to arbitrarily refetch
5. Add a reloading status
6. Add conditional fetching
7. Add refetch on interval
8. Add refetch on refocus
9. Add refetch on 
7. Add retry count/limit
8. Add retry exponential backoff
5. Add ability to imperatively refetch (boo)
10. Stale Cache Time
11. Cache Invalidation
12. Optimistic Updates

## Adding success and error status
Lets do a quick transformation of our fetch promise to make it type union friendly. 
We are going to add 2 things to our fetch, a .then handler and a .catch handler.

We want to map these branches of the promises to "events" or "actions".

${$.CodeTabs.start()}
~~~ts
// @@filename switchMap fetch mapped
import {
  switchMap
} from 'rxjs'

export const makeGetUserById$ = (
  input$: Observable<{id: number}>
) => input$.pipe(
  switchMap(
    input => (
      fetch("/api/users/" + input.id)
        .then(i => i.json())
        .then(
          data => ({
            status: "success",
            data,
          }) as const
        )
        .catch(
          error => ({
            status: 'error',
            error,
          }) as const
        )
    )
  )
)
~~~
${$.CodeTabs.end()}
Now we have transformed our endpoint into a Promise of a type union.

The \`as const\` at the end of our objects records the status string as being constant, so we can use it for [TS discriminated unions](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#discriminated-unions).

If you have never used a discriminated union technique, that is okay, you probably __have__ used one, its just not called that in OOP.

In OOP, its called \`instanceof\`, to a degree, they are very similar.

### Small OOP Type union and discriminant
The "discriminant" in instanceof-checks, is the constructor function of the object and its prototype chain.

Consider the following classes and their union type:
${$.CodeTabs.start()}
~~~ts
// @@filename Class tree union
// twoslash
class Shape {}
class Conical extends Shape {}
class Circle extends Conical {}
class Ellipse extends Conical {}

const test: Shape = new Ellipse()

if(test instanceof Shape) {
  test
//  ^?
}

if(test instanceof Conical) {
  test
//  ^?
}

if(test instanceof Ellipse) {
  test
//  ^?
}
~~~
${$.CodeTabs.end()}

## Add loading status
Okay, now for the thing that promises are really bad at: a 2nd value. In fact, promises can not express multiple values over time. 
Only async iterables can do that, Observable being one of those.

In RxJS, to give a "loading" value to something, we use [startWith](https://rxjs.dev/api/operators/startWith). We can then use to do: \`startWith({status: "loading"} as const)\`.

However, [switchMap](https://rxjs.dev/api/operators/switchMap) requires that we return either a Promise or Observable. So, we must convert our promise into an observable so we can use this operator. 

To do this, we will use [from](https://rxjs.dev/api/index/function/from). 


${$.CodeTabs.start()}
~~~ts
// @@filename switchMap fetch loading
import {
  switchMap,
  from,
  startWith
} from 'rxjs'

export const makeGetUserById$ = (
  input$: Observable<{id: number}>
) => input$.pipe(
  switchMap(
    input => (
      from(
        fetch("/api/users/" + input.id)
          .then(i => i.json())
          .then(
            data => ({
              status: "success",
              data,
            }) as const
          )
          .catch(
            error => ({
              status: 'error',
              error,
            }) as const
          )
      ).pipe(
        startWith({ 
          status: "loading" 
        } as const)
      )
    )
  )
)
~~~
${$.CodeTabs.end()}

## Making it generic
While using Promise.then and Promise.catch are good, we can make this more generic, by utilizing their rxjs equivalents:
1. [map (aka .then)](https://rxjs.dev/api/index/function/map)
2. [catchError](https://rxjs.dev/api/index/function/catchError)

It might be the case you'd want to have this work with other observables, not just promises.

These functions are the Promise.then and Promise.catch, respectively.

Lets see this in action:

${$.CodeTabs.start()}
~~~ts
// @@filename switchMap fetch loading
import {
  switchMap,
  from,
  startWith,
  map,
  catchError,
  of
} from 'rxjs'

export const makeGetUserById$ = (
  input$: Observable<{id: number}>
) => input$.pipe(
  switchMap(
    input => (
      from(
        fetch("/api/users/" + input.id)
          .then(i => i.json())
      ).pipe(
        map(
          data => ({
            status: "success",
            data,
          }) as const
        ),
        catchError(
          /* Must return an observable */
          error => of({
            status: 'error',
            error,
          } as const) 
        ),
        // Must stay at the bottom of list.
        startWith({ 
          status: "loading" 
        } as const)
      )
    )
  )
)
~~~
${$.CodeTabs.end()}

The only thing different is satisfying catchError's output type, by wrapping our error object with \`of\`.

Lets look at the inferred type of this observable with twoslash:

${$.CodeTabs.start()}
~~~ts
// @@filename switchMap Inferred Type
// twoslash
  // --cut-start
import {
  Observable,
  switchMap,
  from,
  startWith,
  map,
  catchError,
  of
} from 'rxjs'
  // --cut-end

export const makeGetUserById$ = (
  input$: Observable<{id: number}>
) => input$.pipe(
  switchMap(
    // --cut-start
    input => (
      from(
        fetch("/api/users/" + input.id)
          .then(i => i.json())
      ).pipe(
        map(
          data => ({
            status: "success",
            data,
          }) as const
        ),
        catchError(
          /* Must return an observable */
          error => of({
            status: 'error',
            error,
          } as const) 
        ),
        // Must stay at the bottom of list.
        startWith({ 
          status: "loading" 
        } as const)
      )
    )
    // --cut-end
  )
)

const query$ = makeGetUserById$(of({id: 1}))
//    ^?
~~~
${$.CodeTabs.end()}

### Making queryFn generic
The next step of re-use, is making the query function(<u>AKA: queryFn</u>), and adding some typescript generics along the way.

${$.CodeTabs.start()}
~~~ts
// @@filename Generic Make Query
// twoslash
// --cut-start
import {
  Observable,
  ObservableInput,
  switchMap,
  from,
  startWith,
  map,
  catchError,
  of
} from 'rxjs'
  // --cut-end

function makeQuery$< // [!code ++]
  Input = any, // [!code ++]
  Output = any // [!code ++]
>( // [!code ++]
  props: { // [!code ++]
    input$: Observable<
      Input // [!code ++]
    >,
    queryFn: (input: Input) => ObservableInput<Output>, // [!code ++]
  } // [!code ++]
) {
  return props. // [!code ++]
  input$.pipe(
    switchMap(
      input => (
        from(
          props.queryFn( // [!code ++]
            input
          ) 
        ).pipe( 
        // All else the same
        // --cut-start
          map(
            data => ({
              status: "success",
              data,
            }) as const
          ),
          catchError(
            /* Must return an observable */
            error => of({
              status: 'error',
              error,
            } as const) 
          ),
          // Must stay at the bottom of list.
          startWith({ 
            status: "loading" 
          } as const)
          // --cut-end
        )
      )
    )
  )
}

const query$ = 
  makeQuery$({ // [!code ++]
    input$: // [!code ++]
      of({id: 1}), 
    queryFn: input => // [!code ++]
      fetch('/api/users'+input.id).then(
        res => res.json()
      ) as Promise<{ // [!code ++]
        firstname: string // [!code ++]
        lastname: string // [!code ++]
      }>
  })

query$
// ^?
~~~
${$.CodeTabs.end()}

## Flattening the union
In a lot of tools like react-query and rtk-query (and others), the output of a "query" is typically some kind of helper type, that flattens this union of loading | success | error into a single type.

We are going to use map to transform our type union into <u>one</u> type:

${$.CodeTabs.start()}
~~~ts
// @@filename switchMap Unify Union
// twoslash
// --cut-start
import {
  Observable,
  ObservableInput,
  switchMap,
  from,
  startWith,
  map,
  catchError,
  of
} from 'rxjs'

function makeQuery$<
  Input = any,
  Output = any
>(
  props: {
    input$: Observable<Input>,
    queryFn: (input: Input) => ObservableInput<Output>,
  }
) {
  return props.input$.pipe(
    switchMap(
      input => (
        from(props.queryFn(input)).pipe(
          map(
            data => ({
              status: "success",
              data,
            }) as const
          ),
          catchError(
            /* Must return an observable */
            error => of({
              status: 'error',
              error,
            } as const) 
          ),
          // Must stay at the bottom of list.
          startWith({ 
            status: "loading" 
          } as const)
        )
      )
      // --cut-end
    ),
    // This will add every field from 
    //   the type union at cost of undefined everywhere.
    map(
      (next) => ({
        status:    next.status,
        isLoading: next.status === 'loading',
        isSuccess: next.status === 'success',
        isError:   next.status === 'error',
        error:     next.status === 'error'
          ? next.error as Error
          : undefined,
        data:      next.status === 'success' 
          ? next.data 
          : undefined,
      })
    )
  )
}

const makeGetUserById$ = makeQuery$({
  // --cut-start
  input$: of({id: 1}),
  queryFn: input => 
    fetch('/api/users'+input.id).then(
      res => res.json()
    ) as Promise<{
      firstname: string; 
      lastname: string
    }>
  // --cut-end
})

makeGetUserById$
// ^?
~~~
${$.CodeTabs.end()}

Great, now we have all 3 possibilities. And you don't need to unfold the union. 

So lets review what we have done:
1. [x] Unsub from previous fetches and re-fetch on input change
    - This is handled by switchMap all on its own
2. [x] Get status of fetch's state machine
    - A promise can now go from loading -> (success OR error)
3. [x] Make it ergonomic for non-functional devs
    - we made it easy to make with type inference by using FRP
    - having input and output inference
    - mapping it to a flatter type


However, we are still missing some important features:


1. Conditional Fetching
1. Refetching
2. Retrying
3. Caching
4. Optimistic Updates

Some ideas for implementing:
1. Reuseability requires standard functions and typescript generics
2. We will implement this with filter on the input stream
3. We will implement this with repeat in the switchMap stream
4. We will implement this with retry operator in the switchMap
5. We will implement this with scan operator after and outside the switchMap
6. Must learn how to use merge on multiple queries into 1 bigger query

Caching is intense, but once you understand merge + scan combos

${SUB.fs["demo.dom.tsx"].DemoScript()}

## Intro
In this post I am going to explain how I prefer to call API's with RxJS. 
We are going to develop a demo that calls some fake APIs and then gets around

I am going to demo the examples doing 2 styles:
1. Observables
2. RxJS

The difference is like explaining \`for loops\` vs \`Array.prototype.forEach\`.

One is a low level, imperative/procedural way of programming. The other is higher level functional and dynamic.

First lets start with some example code to set the stage.
1. We are going to define some HTML that load some data
2. We want to show the status of these API calls in our UI as 
    1. idle
        1. loading
            1. data
            2. error
            3. reloading
                1. data
                2. error
                3. reloading...
3. There are 2 types of fetch calls
    1. idempotent (repeatable)
        1. AKA a **query**
    2. not-idempotent (not repeatable)
        2. AKA a **mutation**


### Data Model
${(
  <Diagram
    summary="Data Model"
    isInitClosed
    diagram={`
direction: down
int: "Subscriber<T>"
ext: "TapObserver<T>"
obs: "Observable<T>"
obs.sub: "subscribe"
subi.unsub: "unsubscribe"
subi: "Subscription"
obs.sub -> subi.unsub

obs.sub -> int: {
  style: {
    stroke-dash: 4
  }
}

int -> ext.finalize
subi.unsub -> ext.finalize
int.next -> int.complete
int.next -> int.error
int -> subi.unsub
(int.next -> int.next)[*]: {
  style: {
    stroke-dash: 4
  }
}
int.next -> int.next: 1
int.next -> int.next: 2
int.next -> int.next: 3

`}
  />
)}
`, // ``
})

function Diagram(props: {
  summary: any
  isInitClosed?: boolean
  children?: any
  diagram?: string
}) {
  return (
    <details
      className="basic"
      {...(props?.isInitClosed ? {} : { open: true })}
    >
      <summary>{props.summary}</summary>
      <div style="max-width:500px; margin: auto;">
        {from(
          generateD2Diagram(
            props.diagram ||
              `${props.children}
vars: {
  d2-config: {
    layout-engine: dagre
  }
}
*.style.font-size: 12
**.style.font-size: 12
(** -> **)[*]: {
  style.font-size: 12
}    
`,
          ),
        )}
      </div>
    </details>
  )
}
