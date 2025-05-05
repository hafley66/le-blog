import { SUB } from "~/blog/rxjs/observable-vs-useEffect/SITEMAP.deno.ts"
// deno-lint-ignore-file jsx-key
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "RxJS.Observable vs React.useEffect",
  description:
    "Visualizing the similarities and differences",
  date_created: "2025-04-06",
  tags: [
    "rxjs",
    "react",
    "useEffect",
    "effects",
    "state",
    "events",
  ],
  ...$.md`

## Who
This is for any react dev who knows their way around useEffect. 

More accurately, if you know how to call an api with react hooks, then this is for you.

If you are new to react or don't know it, this will be literal gibberish.

## Goals
We are going to create an Observable and a useEffect by hand that do the same things: Output the same console.log sequence over time.

Our goal is to create a DOM listener for our button in a component.

This is simply our button:
~~~tsx
export default () => 
  <button id="example">Click Counter</button>
~~~

We are going to go step by step to implement a few side effects.
1. Attach a manual event listener for clicking on our element.
    - You can do this in react inline event handlers, but that is a shorthand for the manual way
2. We are going to use [event delegation](../../event-delegation/index.html) in our listener.

## Effect, Events and State


### Defining the effect
First we will get our effect and observable to run and log out to the console.

Like most modern event listener APIs, Observable's take an effect function that must synchronously return an unsub/unmount function
${$.CodeTabs.start()}
~~~tsx
// @@filename React
useEffect(() => {
  console.log("Start")
  return () => { console.log("End"); }
}, [])
~~~

~~~tsx
// @@filename RxJS
new Observable(() => {
  console.log("Start")
  return () => { console.log("End"); }
})
~~~
${$.CodeTabs.end()}

### Subscribing the effect
1. To run our useEffect, we must be inside of a React render cycle. 
    - If you try to call useEffect, it will throw outside of react running your code for you.
    - \`:(\`
2. To run our observable, we just call its \`subscribe\` method
    - This also means we will be the one to take care of its subscription

${$.CodeTabs.start()}
~~~tsx
// @@filename React
const MyEffect = () => {
  useEffect(() => {
    console.log("Start")
    return () => { console.log("End"); }
  }, [])
  return null;
}

const root = ReactDOM.createRoot(document.body)
root.render(<MyEffect/>)
~~~

~~~tsx
// @@filename RxJS
const myEffect$ = new Observable(() => {
  console.log("Start")
  return () => { console.log("End"); }
})

myEffect$.subscribe(() => {})
~~~
${$.CodeTabs.end()}

### Setting up the event listener
Now lets add the code for event listening to a dom node with event delegation, using vanilla js.

${$.CodeTabs.start()}
~~~tsx
// @@filename React
useEffect(() => {
  console.log("Start")
  const fn = (event: Event) => {
    const btn = event.target.closest('#example')
    if(btn) {
      console.log("#example Has been clicked!")
    }
  }
  document.addEventListener('click', fn)
  return () => {
    document.addEventListener('click', fn)
    console.log("End");
  }
}, [])
~~~

~~~tsx
// @@filename RxJS
const myEffect$ = new Observable(() => {
  console.log("Start")
  const fn = (event: Event) => {
    const btn = event.target.closest('#example')
    if(btn) {
      console.log("#example Has been clicked!")
    }
  }
  document.addEventListener('click', fn)
  return () => {
    document.addEventListener('click', fn)
    console.log("End");
  }
})
~~~
${$.CodeTabs.end()}


### Adding state to our effect
Our effect is not terribly useful without...some form of state! Lets count using previous state to track clicks:
1. In React hooks, this is <u>useState</u>
2. in Observable, state is much more loose, but we want to match the tools so they look similar
    1. we actually set state in observables with <u>Observer.next</u>
        - Due to OOP, we must bind the method if we want to use it like setState.
    2. We make an internal state using scope.
        - Notice we can use <u>let</u> bindings.

${$.CodeTabs.start()}

~~~tsx
// @@filename React
const [state, setState] = useState(()=> { //[!code ++]
  console.log("Initial State") //[!code ++]
  return 0 //[!code ++]
}) //[!code ++]

useEffect(() => {
  console.log("Start")

  const fn = (event: Event) => {
    const btn = event.target.closest('#example')
    if(btn) {
      setState(p => p + 1) //[!code ++]
      console.log("#example Has been clicked!")
    }
  }
  document.addEventListener('click', fn)
  return () => {
    document.addEventListener('click', fn)
    console.log("End");
  }
}, [])
~~~

~~~tsx
// @@filename RxJS
const myEffect$ = new Observable((subscriber) => {
  console.log("Start")
  
  let [state, setState] = [ //[!code ++]
    0, //[!code ++]
    subscriber.next.bind(subscriber) //[!code ++]
  ] as const; //[!code ++]
  console.log("Init State") //[!code ++]
  setState(state) // RxJS does not have concept of initial render
  
  const fn = (event: Event) => {
    const btn = event.target.closest('#example')
    if(btn) {
      setState(++state) //[!code ++]
      console.log("#example Has been clicked!")
    }
  }
  document.addEventListener('click', fn)
  return () => {
    document.addEventListener('click', fn)
    console.log("End");
  }
})
~~~
${$.CodeTabs.end()}

I tried to keep things in a kind of common form, but there is some nuance here.
1. How do we have a deps array for an Observable?
    - Observables have no inherit concept of dependency tracking
        - That is solely the purpose of rxjs and its utilities
        - We will get to it but it involves [combineLatest](https://rxjs.dev/api/operators/combineLatest)
2. Why are we calling setState right away in the Observable?
    - React has __eager__ state, which means it must always be __synchronous__.
        - Observable does not have this constraint, it can call "setState" __anywhere__ in the observable function body 
            - except the cleanup function?
    - By calling __next__ in the main body at the start, we are setting our initial value.
        - I rarely do this because new Observable is as rare as new Promise
        - RxJS takes care of this with [startsWith](https://rxjs.dev/api/index/function/startWith)

Lets now log when our state changes:

#### Logging state changes
${$.CodeTabs.start()}
~~~tsx
// @@filename useEffect
const MyComponent = () => {
  // ...
  useEffect(() => {
    console.log("state", state)
  }, [state])
}
~~~

~~~tsx
// @@filename Observable
//...
myEffect$.subscribe(
  state => console.log("state", state)
)
~~~
${$.CodeTabs.end()}

### Running Demo
${SUB.subFolder("1.demo/").CodeTabs({ height: 500 })}


## Conditional Effects with a Stopwatch Component
Okay, lets create a stopwatch that does the following things:
1. Starts at 0sec
2. #toggle
4. #reset
3. #lap
5. #save-to-api

This is a good way to demonstrate how various effects interact with each other with React Hooks.


### Build a stopwatch: React 
Lets start by creating
1. state: current ellapsed time = 0
2. state: are we enabled or not = false
3. event: did we click toggle = callback

${$.CodeTabs.start({
  // autoSave: true,
  // groupName: "1.stopwatch-init",
})}

~~~tsx
/** @jsxImportSource react */
// @@eval front
// @@filename 1: State
import React from 'react';

const INIT_STATE = {
  totalTime: 0,
  enabled: false,
}

const Stopwatch = () => {
  const [state, setState] = React.useState(
    INIT_STATE
  )

  return <div id="Stopwatch-root">
    <p>
      {state.totalTime} sec.
    </p>
    <button className="btn--blue">{
      state.enabled ? "Pause" : "Run"
    }</button>
  </div>
}

export default () => Stopwatch
~~~

~~~tsx
/** @jsxImportSource react */
// @@eval front
// @@filename 2: Events
import React from 'react';

const INIT_STATE = {
  totalTime: 0,
  enabled: false,
}

const Stopwatch = () => {
  const [state, setState] = React.useState(
    INIT_STATE
  )

  const onToggleClick = () => 
    setState(
      p => ({
        ...p, 
        enabled: !state.enabled
      })
    )

  return <div id="Stopwatch-root">
    <p>
      {state.totalTime} sec.
    </p>
    <button 
      className="btn--blue"
      onClick={onToggleClick}
    >{
      state.enabled ? "Pause" : "Run"
    }</button>
  </div>
}

export default () => Stopwatch
~~~

~~~tsx
/** @jsxImportSource react */
// @@diff-prev
// @@eval front
// @@filename 3: Effects
import React from 'react';

const INIT_STATE = {
  totalTime: 0,
  enabled: false,
}

const Stopwatch = () => {
  const [state, setState] = React.useState(
    INIT_STATE
  )

  const onToggleClick = () => 
    setState(
      p => ({
        ...p, 
        enabled: !state.enabled
      })
    )

  React.useEffect(
    () => {
      if(!state.enabled) return
      let prev = +new Date()
      let id = requestAnimationFrame(
        function diffTime() {
          let next = +new Date()
          setState(p => {
            return {
              ...p,
              totalTime: p.totalTime + (next - prev)
            }
          })
        }
      )

      return () => {
        cancelAnimationFrame(id)
      }
    },
    [state.enabled, state.totalTime]
  )

  return <div id="Stopwatch-root">
    <p>
      {state.totalTime/1000} sec.
    </p>
    <button 
      className="btn--blue"
      onClick={onToggleClick}
    >{
      state.enabled ? "Pause" : "Run"
    }</button>
  </div>
}

export default () => Stopwatch
~~~

${$.CodeTabs.end()}

`,
  // ``
})
