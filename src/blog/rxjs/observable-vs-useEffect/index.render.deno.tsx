// deno-lint-ignore-file jsx-key
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { SUB } from "~/blog/rxjs/observable-vs-useEffect/SITEMAP.deno.ts"
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
${
  $.CodeTabs.markdown`
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
` //``
}

### Running the effect
To run our useEffect, we must be inside of a React render cycle. If you try to call useEffect, it will throw outside of react running your code for you.

In RxJS, you can just call \`Observable.subscribe()\`

${
  $.CodeTabs.markdown`
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
` //``
}

### Setting up the event listener
${
  $.CodeTabs.markdown`
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
` //``
}


### Adding state to our effect
Our effect is not terribly useful without...some form of state! Lets count using previous state to track clicks.

So now we will add with the respective techniques.

${
  $.CodeTabs.markdown`
~~~tsx
// @@filename React
const [state, setState] = useState(0)
useEffect(() => {
  console.log("Start")
  const fn = (event: Event) => {
    const btn = event.target.closest('#example')
    if(btn) {
      setState(p => p + 1)
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
  let [state, setState] = [0, subscriber.next] as const;
  console.log("Start")
  setState(state) // RxJS does not have concept of initial render
  const fn = (event: Event) => {
    const btn = event.target.closest('#example')
    if(btn) {
      setState(++state)
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
` //``
}

I tried to keep things in a kind of common form, but there is some nuance here.
1. How do we have a deps array for an Observable?
    - Observables have no inherit concept of dependency tracking
        - That is solely the purpose of rxjs and its utilities
        - We will get to it but it involves [combineLatest](https://rxjs.dev/api/operators/combineLatest)
2. Why are we calling setState right away in the Observable?
    - React has __eager__ state, which means it must always be __synchronous__.
        - Observable does not have this constraint, it can call "setState" __anywhere__ in the observable function body except the cleanup function.
    - By calling __next__ in the main body at the start, we are setting our initial value.
        - I rarely do this because new Observable is as rare as new Promise
        - RxJS takes care of this with [startsWith](https://rxjs.dev/api/index/function/startWith)

Lets now log when our state changes:

### Logging state changes
${
  $.CodeTabs.markdown`
~~~tsx
// @@filename React
const MyComponent = () => {
  // ...
  useEffect(() => {
    console.log("state", state)
  }, [state])
}
~~~

~~~tsx
// @@filename RxJS
//...
myEffect$.subscribe(
  state => console.log("state", state)
)
~~~
`
  //``
}

### Running Demo
${SUB.subFolder("1.demo/").CodeTabs({ height: 500 })}
`,
  // ``
})
