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
} from "rxjs"
import { get, isEqual } from "lodash"
import { Draft, isDraftable, produce } from "immer"

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
      const parent = get(state$.value, path.slice(0, -1))
      if (isDraftable(parent)) {
        const next = produce(parent as object, (draft: Draft<any>) => {
          draft[path[path.length - 1]] = n
        })
        return state$.next(next as T)
      } else {
        SignalCreator.dispatch.next({ type: "BAD_SET", value: { parent, child: n, path } })
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

    const _selfFn = { [path.join("/")]: () => {} }[path.join("/")]
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
          if (p in target) return target[p]
          if (p === "value") return getter()
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

export interface ISignalNullish<T, Depth extends number = 5> extends ASignalNullish<T> {
  _: RSignalNullish<NonNullable<T>, Depth>
}

export type RSignal<T, Depth extends number = 5> = Depth extends never
  ? never
  : T extends null | undefined
    ? RSignalNullish<NonNullable<T>, Depth>
    : {
        [K in keyof T]: ISignal<T[K]> & RSignal<T[K], DepthLimit[Depth]>
      }

export type RSignalNullish<T, Depth extends number = 5> = Depth extends never
  ? never
  : {
      [K in keyof T]: ISignalNullish<T[K]> & RSignalNullish<T[K], DepthLimit[Depth]>
    }
type Nullish<T> = T extends null | undefined ? true : false

export function Signal<T extends () => any>(
  state: T,
): T extends () => infer U ? (Nullish<U> extends [true] ? ISignalNullish<U> : ISignal<U>) : never
export function Signal<T>(observable: Observable<T>, defaultState: T): ISignal<T>
export function Signal<T>(observable: Observable<T>): ISignalNullish<T>
export function Signal<T>(state: T): Nullish<T> extends true ? ISignalNullish<T> : ISignal<T>
export function Signal<T>(): ISignalNullish<T>
export function Signal<T>(obs_memo_state_or_void?: Observable<T> | T, defaults?: T) {
  if (isObservable(obs_memo_state_or_void)) {
    return SignalCreator({ initialState: defaults, observable: obs_memo_state_or_void })
  }

  if (typeof obs_memo_state_or_void === "function") {
    return Signal.MEMO(obs_memo_state_or_void as () => T)
  }

  return SignalCreator({ initialState: obs_memo_state_or_void })
}

Signal.MEMO = function MEMO_FUN<T>(fun: () => T): ISignal<T> {
  const start = new Subject<void>()
  const end = new Subject<void>()

  const watchFun = () => {
    start.next()
    try {
      console.log("Run1")
      return fun()
    } finally {
      console.log("Run2")
      end.next()
    }
  }

  const run$ = start.pipe(
    tap({
      subscribe: () => console.log("sub"),
    }),
    exhaustMap(() =>
      SignalCreator.dispatch.pipe(
        filter(i => i.type === "get"),
        tap({
          subscribe: () => console.log("sub3"),
          next: n => console.log("next", n.value.value),
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
    mergeWith(
      defer(() => of(watchFun())).pipe(
        tap({
          subscribe: () => console.log("sub2"),
        }),
      ),
    ),
    map(() => watchFun()),
    distinctUntilChanged<T>(isEqual),
  )

  return SignalCreator({
    observable: run$,
    initialState: fun(),
  })
}
