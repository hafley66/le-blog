// deno-lint-ignore-file jsx-key
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { from } from "rxjs"
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

## Setup
We are going to focus on handling the state of an api call. 
We want to capture the following information:
1. isLoading
2. value
3. error

## Goals
We are going to create an Observable and a useEffect by hand that do the same things: Output the same console.log sequence over time.

Our goal is to create a DOM listener for our button in a component.

This is simply our button:
~~~tsx
export default () => 
  <button id="example">Click Counter</button>
~~~

## Visual Comparison
Here is a visual comparison of an observable
${
  $.CodeTabs.markdown`

~~~tsx
// @@filename React
const [state, nextState] = React.useState(0)
useEffect(() => {
}, [])
~~~

~~~tsx
// @@filename RxJS
new Observable(({next: nextState}) => {
  let state = 0;
})
~~~
` //``
}

Note how 

`,
  // ``
})
