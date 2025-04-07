// deno-lint-ignore-file jsx-key
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { SUB } from "./SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title:
    "Event Delegation Exploration with HTMLElement.closest",
  description:
    "Creating an all events visualizer for debugging",
  date_created: "2025-04-06",
  tags: ["rxjs", "events"],
  ...$.md`

## Intro
I needed to write something with __rapid__ ui updates to tune the performance of my RxJSX library. 

So I decided to write a debugger for single DOM element that will visualize the dom events in rows, where the columns are circles, spaced out by their relative start and end times.



## V1
In v1, we are going to learn how to get all events, group them together into observables/streams, and render them to the dom using RxJSX.
To do this, we must tackle 2 parts: 
1. Event sourcing
2. UI Rendering


### Getting all our DOM Events
We want to get all the dom events, so we can either
1. Create a static list of all names from specs
2. Dynamically grab everything that starts with \`on\` from he window object

Lets go with #2
~~~tsx
const allEvents = Object.getOwnPropertyNames(window)
  .filter(propertyName => propertyName.startsWith("on"))
  .map(eventName => eventName.substring(2))
  .filter(
    i => i !== "pointerrawupdate" && !i.includes("pointer"),
  )
~~~

You should be able to run that yourself on here and validate it yourself.


### Listen to all events
We can now make an observable that will listen to __every__ event we can find on the \`document\`.

~~~tsx
const all$ = new Observable<Event>(sub => {
  const allListener = (event: any) => {
    sub.next(event)
  }

  const add = () =>
    allEvents.forEach(e =>
      document.addEventListener(e, allListener),
    )

  const remove = () =>
    allEvents.forEach(e =>
      document.removeEventListener(e, allListener),
    )

  add()
  return () => {
    remove()
  }
})
~~~

### Use event delegation
If you want to watch for any event to an element:
1. you can check if a DOM event.target is an HTMLElement, 
2. then use [HTMLElement.closest](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest) to locate the element you want.

This is simple enough, we just make a function that takes a selector:
~~~tsx
const delegateAllFor = (selector: string) =>
  all$.pipe(
    filter(i => i.target instanceof HTMLElement),
    map(
      i =>
        [
          i,
          (i.target as HTMLElement)?.closest(selector)!,
        ] as const,
    ),
    filter(i => !!i[1]),
  )
~~~

This technique is great, and avoids the need for having a ref inside of react or being inside of react or others.

RxJSX does not support inline event handlers bc it goes against the normal flow of RxJS, so event delegation will allow you to keep your code out of frameworks and in your own hands.

### Filtering for specific events
You can filter further like so:
~~~tsx
delegateAllFor('#my-button').pipe(
  filter(([event, target]) => event.type === 'click'),
  // ...Do something with click events on #my-button!
)
~~~

We want to see every event though for this experiment, so no filtering here.

### Grouping by event type
RxJS has a very useful pipeline operator called [groupBy](https://rxjs.dev/api/operators/groupBy).

We can use this to groupBy the event types like so:

~~~tsx
const myButtomDemoEvents_Grouped = delegateAllFor(
  "#my-button-demo-all-events",
).pipe(
  groupBy(([event, element]) => event.type),
  tap(group$ => {
    console.log(group$.key, isObservable(group$))
  })
)
~~~
If you access the next value using [map](https://rxjs.dev/api/index/function/map), you will its a special Observable that has a .key prop on it.

This next observable will emit all values that get grouped to this key. 

For example: 
1. click 1 happens
    - groupBy will emit a new "grouped" observable with key = 'click'
3. click 2 happens
    - groupBy will pump click 2 into the previous "click" grouped observable
    - it will NOT make a new observable, now it will call "next"

Its scarier than it looks, but is called groupBy bc its doing exactly what it says.

However, we now have multiple __new__ observables by group id. We need to collect its values over time and then collect all the groups.

We now need a way to handle the new \`group$\`'s subscriptions.

### Listen to the new Observable
Since we are in \`Observable<Observable>\` territory, this is like being in \`Array<Array>\` territory. 

We want to "flatten" these new grouped observables using [mergeMap](https://rxjs.dev/api/index/function/mergeMap).

This operator used to be called \`flatMap\`, because its a lot like flatMap with arrays.

Plus, mergeMap will auto-observe its output for you, like a process manager.

Here is example of next step:
~~~tsx
const myButtomDemoEvents_Grouped = delegateAllFor(
  "#my-button-demo-all-events",
).pipe(
  groupBy(([event, element]) => event.type),
  mergeMap(group$ => group$), 
  // Yes its that silly, but so is [[1], 2, [3]].flat()
  // ^^^ it will start listening to group$ after this
  tap(([event, element]) => {
    console.log("event:", event.type, "element:", element)
  })
)
~~~


#### Keeping track of key
We want to listen to every event group, so we dont want to merge all of them into the same data structure.

So, we can do whatever we want to this new observable, but mergeMap will not track __which__ one of the grouped observables was clicked last.

In order to keep track of that information, we have to add it back in, by mapping every output of group$ with its __key__.

~~~tsx
const myButtomDemoEvents_Grouped = delegateAllFor(
  "#my-button-demo-all-events",
).pipe(
  groupBy(([event, element]) => event.type),
  mergeMap(group$ => 
    group$.pipe(
      // This is like a nested scope
      map(([event, element], index) => ({
        key: group$.key,
        value: {
          event, 
          element, 
          index
        }
      }))
    )
  ),
  tap(next => {
    console.log("event:", next.key, "element:", next.value.element)
  })
)
~~~

You might ask why we did not make the object flat like this:
~~~tsx
//...
map(([event, element], index) => ({
  key: group$.key,
    event, 
    element, 
    index
}))
//...
~~~

But it will become apparent later, we are going to be transforming our group$ into an array of events.

### Tracking state

So, we will take the new grouped observable:
- track when it was emitted and 
- collect all events of the group into an array __while__ its running.
    - Do not use [toArray](https://rxjs.dev/api/operators/toArray), its not gonna do what you want since it waits for complete.

Here is all three in sequence:
${
  $.CodeTabs.markdown`
~~~tsx
// @@filename 1: Add start time
const myButtomDemoEvents_Grouped = delegateAllFor(
  "#my-button-demo-all-events",
).pipe(
  groupBy(([event, element]) => event.type),
  mergeMap(group$ => {
    const start = +new Date()
  })
)
~~~

~~~tsx
// @@filename 2: Map with its key and current time
const myButtomDemoEvents_Grouped = delegateAllFor(
  "#my-button-demo-all-events",
).pipe(
  groupBy(([event, element]) => event.type),
  mergeMap(group$ => {
    const start = +new Date()
    return group$.pipe(
      map(([event], index) => ({
        key: group$.key,
        value: {
          event, 
          index,
          time: +new Date()
        }
      })),
    )
  })
)
~~~

~~~tsx
// @@filename 3: Scan all events into array
const myButtomDemoEvents_Grouped = delegateAllFor(
  "#my-button-demo-all-events",
).pipe(
  groupBy(([event, element]) => event.type),
  mergeMap(group$ => {
    const start = +new Date()
    return group$.pipe(
      scan(
        function StateReducer(
          state, 
          [event], 
          index
        ) {
          state.value.push({
            event: event.type,
            index,
            time: +new Date(),
          })
          // Key is constant so we are good to go.
          return state
        },
        {
          key: group$.key,
          value: [] as {
            event: string
            index: number
            time: number
          }[],
        }
      )
    )
  })
)
~~~

`
  // ``
}

Lets walk through the state changes
1. On click, groupBy will create  new group$
2. mergeMap is going to add scan
3. After mergeMap, we auto subscribe to the scan
    1. The 1st click replays synchronously
    2. We now have output 
~~~tsx
const out = {
  key: 'click', 
  value: [
    {
      event, //...,
      time,
      index: 0
    }
  ]
}
~~~
4. When next click happens, we will have:
~~~tsx 
const out = {
  key: 'click', 
  value: [
    {
      //...
      index: 0
    },
    {
      //...
      index: 1
    }
  ]
}
~~~

Now we want to combine these grouped streams together into an array of arrays

## Demo
Below is a button where I capture every dom event except for pointers (for now they are explosive).

Gonna make a drag demo and input/form demo. But I also want to tune the performance to maximize fps.

Anyways, this was the final step in tuning my RxJSX transform by integrating with snabbdom. Its a great success, as this demo represents capturing all the events on 1 element and creating basically a 2x2 dynamic grid on unbounded "columns".

More importantly, this finalizes the one thing my transform does as "magic", which is auto subscribe to arrays of elements without you having to call combineLatest on them.

${SUB.fs["demo.dom.tsx"].DemoScript()}
`,
  // ``
})
