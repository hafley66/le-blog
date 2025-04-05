import { autoDemo } from "~/lib/client/auto-demo"
import { TextDiff } from "~/lib/TextDiffMini.dual"
console.log(
  "Wtf",
  import.meta.url,
  new URL(import.meta.url).pathname,
)
autoDemo(new URL(import.meta.url).pathname, () => (
  <TextDiff
    a={`
const MyComponent = () => {
  const [state, setState] = React.useState(0)

  return <button
    id="my-component-clicker"
    onClick={
      ev => setState(state + 1)
    }
  >
    You have clicked {
      state
    } times
  </button>
}
`}
    b={`
const MyComponent = () => {
  const state = new BehaviorSubject(0)

  return <button
    id="my-component-clicker"
    onClick={
      ev => state.next(state.value + 1)
    }
  >
    You have clicked {
      state.value
    } times
  </button>
}
`}
  />
))
