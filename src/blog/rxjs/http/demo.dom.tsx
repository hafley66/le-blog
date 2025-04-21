/** @jsxImportSource ~/lib/rxjs-vhtml/v3/ */
import {
  interval,
  map,
  take,
  tap,
  share,
  timer,
} from "rxjs"
import { RXJSX_DEBUG_DEMO } from "~/lib/tagPipe/demo.core2.dom"
import {
  o,
  pipeId,
  registerObservable,
} from "~/lib/tagPipe/core.2.dual.ts"
import "~/lib/tagPipe/monkey-patch.dual.tsx"
import { repeat_ } from "~/lib/tagPipe/rxjs.dual"

import testIt from "~/lib/StrStr/test.dual"

testIt()

// Example usage
const source = registerObservable(
  interval(1000),
  "derpy",
).pipe(
  share(),
  pipeId("source", import.meta.url), // Name this pipe
  o(take)(1),
  o(map)(i => i + 1),
  repeat_({ count: 2, delay: () => timer(500) }),
)

source.subscribe({
  next: i => console.log("HMM", i),
  error: e => console.log("e", e),
  complete: () => console.log("complete"),
})
const source2 = source.pipe(
  tap(),
  pipeId("source2", import.meta.url), // Name this pipe
)
// setTimeout(() => source.subscribe(), 500)
// const evenNumbers = source.pipe(
//   pipeId("evenFilter"), // Name this pipe
//   filter(x => x % 2 === 0),
//   map(x => `Even: ${x}`),
// )

// const oddNumbers = source.pipe(
//   pipeId("oddFilter"), // Name this pipe
//   filter(x => x % 2 !== 0),
//   map(x => `Odd: ${x}`),
// )

// // Subscribe to the observables
// evenNumbers.subscribe(console.log)
// oddNumbers.subscribe(console.log)

export default () => RXJSX_DEBUG_DEMO
