import { MEMO_PRE } from "~/lib/Signal2/1_SignalMemoFunction.deno.ts"
import { Signal } from "~/lib/Signal2/2_Signal.deno.ts"
import React from "react"
import { animationFrameScheduler, map, throttleTime } from "rxjs"

let SIGNAL_REACT_DISPLAY_ID = 0
Signal.react = function <T>(it: T): T {
  if (typeof it === "function") {
    // assume react function component
    const id = SIGNAL_REACT_DISPLAY_ID++
    const { [`SIGNAL_REACT_DISPLAY_ID_${id}_${it.name}`]: fn } = {
      [`SIGNAL_REACT_DISPLAY_ID_${id}_${it.name}`]: (...args: any[]) => {
        const [, forceRender] = React.useState(0)

        // We use memo to keep it sync, bc we are about to read a bunch of signals.
        // Dont worry about sync updates, see throttleTime below
        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        const watcher = React.useMemo(() => {
          const memo = MEMO_PRE(it as unknown as (props: any) => any)
          return {
            ...memo,
            sub: memo.watcher$
              .pipe(
                throttleTime(16, animationFrameScheduler, { leading: true, trailing: true }),
                map((n, index) => {
                  // A auto-dep has been set
                  forceRender(index)
                  return n
                }),
              )
              .subscribe(),
          }
        }, [])

        // Gotta unsub the watcher in the end
        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        React.useEffect(() => {
          return () => {
            watcher.sub.unsubscribe()
          }
        }, [])
        return watcher.fun(...args)
      },
    }
    return fn as T
  }
  return it
}
