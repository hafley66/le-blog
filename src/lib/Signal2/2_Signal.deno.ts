import { isObservable, Observable } from "rxjs"
import { SignalCreator } from "~/lib/Signal2/0_SignalCreator.deno.ts"
import { RSignal } from "~/lib/Signal2/index.deno.ts"
import { MEMO_PRE, MEMO_FUN } from "~/lib/Signal2/1_SignalMemoFunction.deno.ts"
import React from "react"
import { animationFrameScheduler, map, throttleTime } from "rxjs"

export function Signal<T>(state: () => T): RSignal<T>
export function Signal<T>(observable: Observable<T>): RSignal<T | undefined>
export function Signal<T>(observable: Observable<T>, defaultState: T): RSignal<T>
export function Signal<T>(state: T): RSignal<T>
export function Signal<T>(): RSignal<T>
export function Signal<T>(obs_memo_state_or_void?: Observable<T> | T, defaults?: T) {
  if (isObservable(obs_memo_state_or_void)) {
    return SignalCreator({ initialState: defaults, observable: obs_memo_state_or_void })
  }

  if (typeof obs_memo_state_or_void === "function") {
    return MEMO_FUN(obs_memo_state_or_void as () => T).signal
  }

  return SignalCreator({ initialState: obs_memo_state_or_void })
}

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
