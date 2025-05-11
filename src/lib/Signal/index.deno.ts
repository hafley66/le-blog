import {
  BehaviorSubject,
  defer,
  distinctUntilChanged,
  filter,
  isObservable,
  map,
  Observable,
  of,
  scan,
  shareReplay,
  Subject,
  takeUntil,
  tap,
  mergeWith,
  mergeMap,
  exhaustMap,
  throttleTime,
  animationFrameScheduler,
} from "rxjs"
import { get, isEqual, set } from "lodash"
import { Draft, isDraftable, produce } from "immer"
import React from "react"

export type Act<T extends string, V> = {
  type: T
  value: V
}

export function SignalCreator<T>({
  initialState,
  observable,
}: { initialState?: T; observable?: Observable<T> }): ISignal<T> {
  type Keys = keyof ISignal<T>
  const state$ = new BehaviorSubject(initialState as T)
  const root$ = !observable
    ? state$
    : observable.pipe(
        tap({
          next: n => {
            state$.next(n)
          },
        }),
        shareReplay({
          refCount: true,
          bufferSize: 1,
        }),
      )

  const createProxy = (path: string[]): ISignal<T> => {
    const depth = path.length

    const setter = (n: T) => {
      if (!depth) {
        return state$.next(n)
      }

      // parent must have object value
      const parent = state$.value
      if (isDraftable(parent)) {
        // console.log("Set parent!", path, parent, n)
        const next = produce(state$.value as object, (draft: Draft<any>) => {
          // console.log("Set parent 2!", draft[path[path.length - 1]], path[path.length - 1], draft, n)
          set(draft, path, n)
        })
        // console.log({ next })
        return state$.next(next as T)
      } else {
        SignalCreator.dispatch.next({ type: "BAD_SET", value: { parent: rootProxy, child: n, path } })
      }
    }

    const getter = () => {
      const root = state$.value
      if (!depth) {
        return root
      }

      return get(root, path)
    }

    const _self = {
      _: new Proxy({} as ISignal<T>["_"], {
        get(autoSelector, p) {
          if (p in autoSelector) return (autoSelector as any)[p as any]
          // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          return ((autoSelector as any)[p] ||= createProxy([...path, p as string]))
        },
      }),
      use: () => {
        return getter()
      },
    } as ISignal<T>

    const FUN_NAME = `Signal(${path.join("/")})`
    const _selfFn = { [FUN_NAME]: () => {} }[FUN_NAME]
    Object.assign(_selfFn, _self)

    const proxy = new Proxy<ISignal<T>>(
      /** Bc of how proxies work, we must pass a function if we want apply to work */
      _selfFn as ISignal<T>,
      {
        apply(target, self, args) {
          if (args.length) {
            setter(args[0])
            SignalCreator.dispatch.next({ type: "set", value: proxy })
            return proxy
          }
          SignalCreator.dispatch.next({ type: "get", value: proxy })
          return getter()
        },
        get(target, p: Keys) {
          // Cache/Function type
          if (p in target) return target[p]

          // Non signal getter, mimics behavior subject
          if (p === "value") return getter()

          // Observable subType
          if (p in root$) {
            let _autoSelector_$ = root$
            if (depth) {
              _autoSelector_$ = root$.pipe(
                map(i => get(i, path)),
                shareReplay({
                  refCount: true,
                  bufferSize: 1,
                }),
              )
            }
            let it: any = _autoSelector_$[p as keyof typeof root$]
            if (typeof it === "function") it = it.bind(_autoSelector_$)
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            return ((target as any)[p] ||= it)
          }
        },
      },
    )
    return proxy
  }

  const rootProxy = createProxy([]) as ISignal<T>
  return rootProxy
}

SignalCreator.dispatch = new Subject<
  | Act<"get", ISignal<any>>
  | Act<"set", ISignal<any>>
  | Act<"BAD_SET", { parent: ISignal<any>; child: any; path: string[] }>
>()

type DepthLimit = [never, 0, 1, 2, 3, 4, 5, 6]

export interface ASignal<T> extends Observable<T> {
  (): T
  (next: T): ASignal<T>
  use: () => T
  value: T
}

export interface ISignal<T, Depth extends number = 5> extends ASignal<T> {
  _: RSignal<T, Depth>
}

export interface ASignalNullish<T> extends Observable<T | undefined> {
  (): T | undefined
  (next: T | undefined): ASignalNullish<T>
  use: () => T | undefined
  value: T | undefined
}

export interface ISignalNullish<T, Depth extends number = 5> extends ASignalNullish<NonNullable<T>> {
  _: RSignalNullish<NonNullable<T>, Depth>
}

export type RSignal<T, Depth extends number = 5> = Depth extends never
  ? never
  : Nullish<T> extends true
    ? RSignalNullish<NonNullable<T>, Depth>
    : {
        [K in keyof T as T[K] extends Function ? never : K]: ISignal<T[K], DepthLimit[Depth]>
      }

export type RSignalNullish<T, Depth extends number = 5> = Depth extends never
  ? never
  : {
      [K in keyof T as T[K] extends Function ? never : K]-?: NonNullable<
        ISignalNullish<NonNullable<T>[K], DepthLimit[Depth]>
      >
    }

export function Signal<T extends () => any>(
  state: T,
): T extends () => infer U ? (Nullish<U> extends [true] ? ISignalNullish<U> : ISignal<U>) : never
export function Signal<T>(observable: Observable<T>): ISignalNullish<T>
export function Signal<T>(observable: Observable<T>, defaultState: T): ISignal<T>
export function Signal<T>(state: T): Nullish<T> extends true ? ISignalNullish<T> : ISignal<T>
export function Signal<T>(): ISignalNullish<T>
export function Signal<T>(obs_memo_state_or_void?: Observable<T> | T, defaults?: T) {
  if (isObservable(obs_memo_state_or_void)) {
    return SignalCreator({ initialState: defaults, observable: obs_memo_state_or_void })
  }

  if (typeof obs_memo_state_or_void === "function") {
    return Signal.MEMO(obs_memo_state_or_void as () => T).signal
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

const MEMO_PRE = function <T>(fun: (...args: any[]) => T) {
  const start = new Subject<void>()
  const end = new Subject<void>()

  const watchFun = (...args: any[]) => {
    start.next()
    try {
      console.log("Run1")
      return fun(...args)
    } finally {
      console.log("Run2")
      end.next()
    }
  }

  return {
    fun: watchFun,
    watcher$: start.pipe(
      tap({
        subscribe: () => console.log("sub"),
      }),
      exhaustMap(() =>
        SignalCreator.dispatch.pipe(
          filter(i => i.type === "get"),
          tap({
            subscribe: () => console.log("sub3"),
            next: n => console.log("next", n.value.$.id(), n.value._),
          }),
          takeUntil(
            end.pipe(
              tap({
                next: () => console.log("END"),
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
          const all = found.all.concat(next.value)

          return {
            all,
            next: next.value,
          }
        },
        { next: null, all: [] } as { next: ISignal<any> | null; all: ISignal<any>[] },
      ),
      filter(i => !!i.next),
      mergeMap(i =>
        i.next!.pipe(
          map((i, index) => ({
            index,
            value: i,
            signal: i.next,
          })),
        ),
      ),
      shareReplay({ bufferSize: 1, refCount: true }),
    ),
  }
}

Signal.MEMO = function MEMO_FUN<T>(fun: () => T) {
  const it = MEMO_PRE(fun)
  const watchDepsAndRerun$ = it.watcher$.pipe(
    mergeWith(
      defer(() => of(it.fun())).pipe(
        tap({
          subscribe: () => console.log("sub2"),
        }),
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

type Nullish<T> = null extends T ? true : undefined extends T ? true : false

type X = "a" | null
type x = Nullish<X>
type XX = {
  a: Nullish<null>
  b: Nullish<undefined>
  c: Nullish<{}>
  d: Nullish<[]>
  e: Nullish<[] | null>
  ee: Nullish<void>
  x: Nullish<number>
  wat: never extends true ? 1 : 0
  WAT: true extends never ? 1 : 0
}

type huh = {
  x: undefined | 123
}
