import {
  defer,
  distinctUntilChanged,
  filter,
  map,
  of,
  scan,
  shareReplay,
  Subject,
  takeUntil,
  tap,
  mergeWith,
  mergeMap,
  exhaustMap,
} from "rxjs"
import { isEqual } from "lodash"
import { ISignal } from "~/lib/Signal2/types.ts"
import { SignalCreator } from "~/lib/Signal2/0_SignalCreator.deno.ts"

export const MEMO_PRE = function <T>(fun: (...args: any[]) => T) {
  const start = new Subject<void>()
  const end = new Subject<void>()

  const watchFun = (...args: any[]) => {
    start.next()
    try {
      // console.log("Run1")
      return fun(...args)
    } finally {
      // console.log("Run2")
      end.next()
    }
  }

  return {
    fun: watchFun,
    watcher$: start.pipe(
      // tap({
      // subscribe: () => console.log("sub"),
      // }),
      exhaustMap(() =>
        SignalCreator.dispatch.pipe(
          filter(i => i.type === "get"),
          // tap({
          // subscribe: () => console.log("sub3"),
          // next: n => console.log("next", n.value.$.id(), n.value.$.path, n.value.$.ref),
          // }),
          takeUntil(
            end.pipe(
              tap({
                // next: () => console.log("END"),
              }),
            ),
          ),
        ),
      ),
      scan(
        (found, next) => {
          if (found.all.find(i => i === next.value)) {
            return {
              all: found.all,
              next: null,
            }
          }
          const all = found.all.concat([next.value])

          return {
            all,
            next: next.value,
          }
        },
        { next: null, all: [] } as { next: ISignal<any> | null; all: ISignal<any>[] },
      ),
      filter(i => !!i.next),
      mergeMap(i =>
        i.next!.$.pipe(
          map((n, index) => ({
            index,
            value: n,
            signal: i.next,
          })),
        ),
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
    ),
  }
}

export const MEMO_FUN = function MEMO_FUN<T>(fun: () => T) {
  const it = MEMO_PRE(fun)
  const watchDepsAndRerun$ = it.watcher$.pipe(
    mergeWith(
      defer(() => of(it.fun())).pipe(
        // tap({
        // subscribe: () => console.log("sub2"),
        // }),
      ),
    ),
    map(() => it.fun()),
    distinctUntilChanged<T>(isEqual),
    shareReplay({ bufferSize: 1, refCount: true }),
  )

  return {
    watchDepsAndRerun$,
    watchDeps$: it.watcher$,
    signal: SignalCreator({
      observable: watchDepsAndRerun$,
      initialState: fun(),
    }),
  }
}
