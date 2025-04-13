import { Observable, OperatorFunction } from "rxjs"
import {
  pipeEvents,
  rxjsState,
  wrapOperatorFunction,
  wrapWithLifecycle,
} from "~/lib/tagPipe/core.2.dual.ts"

// Store original pipe method
const originalPipe = Observable.prototype.pipe

// Monkey patch the pipe method
Observable.prototype.pipe = function (
  ...operations: OperatorFunction<any, any>[]
): any {
  let pipeIdentifier: string | null = null
  this.url ??= ""
  // Look for pipeId operator to extract the identifier
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i]
    if (
      op &&
      typeof op === "function" &&
      (op as any).pipeId
    ) {
      // Extract the ID from the operator
      pipeIdentifier = (op as any).pipeId
      // Remove the pipeId operator as it's just for identification
      operations.splice(i, 1)
      break
    }
  }

  if (!pipeIdentifier)
    return originalPipe.apply(this, operations)

  const pathname = pipeIdentifier
  const i =
    rxjsState.value.observables[this.url]?.childPipes
      ?.length ?? 0
  const url = `${this.url}[${i}]/${pathname}`

  // Emit pipe-start event
  pipeEvents.next(["pipe-start", url, this])

  // Call the original pipe method
  const result = originalPipe.apply(
    this,
    // @ts-ignore
    operations.map((i, index) => {
      // if (i.derpy) debugger
      if ("parentUrl" in i) {
        // @ts-ignore
        i.parentUrl = url
        i.index = index
      } else {
        const it = wrapOperatorFunction(i)
        it.parentUrl = url
        it.index = index
        return it
      }
      return i
    }),
  )

  // Emit pipe-end event
  pipeEvents.next(["pipe-end", url, result])
  const it = wrapWithLifecycle(result, url)
  it.url = url
  return it
}
