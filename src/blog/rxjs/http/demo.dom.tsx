/** @jsxImportSource ~/lib/rxjs-vhtml/v3/ */
import { interval, map, filter, take, of } from "rxjs"
import { autoDemo } from "~/lib/client/auto-demo"
import { RXJSX_DEBUG_DEMO } from "~/lib/tagPipe/demo.core2.dom"
import { pipeId } from "~/lib/tagPipe/core.2.dual.ts"

// Example usage
const source = interval(1000).pipe(
  pipeId("source"), // Name this pipe
  take(10),
)

const evenNumbers = source.pipe(
  pipeId("evenFilter"), // Name this pipe
  filter(x => x % 2 === 0),
  map(x => `Even: ${x}`),
)

const oddNumbers = source.pipe(
  pipeId("oddFilter"), // Name this pipe
  filter(x => x % 2 !== 0),
  map(x => `Odd: ${x}`),
)

// // Subscribe to the observables
// evenNumbers.subscribe(console.log)
// oddNumbers.subscribe(console.log)

autoDemo(import.meta.url, () => RXJSX_DEBUG_DEMO)
