import { BehaviorSubject, map, Observable, shareReplay, Subject, tap } from "rxjs"
import { get, set } from "lodash"
import { Draft, produce } from "immer"
import { Act, ASignal, ISignal } from "~/lib/Signal2/types.ts"

export function SignalCreator<T>({
  initialState,
  observable,
}: { initialState?: T; observable?: Observable<T> }): ISignal<T> {
  const state$ = new BehaviorSubject(initialState as T)
  const root$ = !observable
    ? state$
    : observable.pipe(
        tap({
          next: n => {
            rootProxy.$(n)
          },
        }),
        shareReplay({
          refCount: true,
          bufferSize: 1,
        }),
      )

  const createProxy = (_path: string[]): ISignal<T> => {
    // In case a symbol gets thru, bc that will break array.join
    const path = _path.filter(i => typeof i === "string")
    const depth = path.length

    const setter = (n: T) => {
      if (!depth) {
        return state$.next(n)
      }

      // parent must have object value
      const next = produce((state$.value || {}) as object, (draft: Draft<any>) => {
        // console.log("Set parent 2!", draft[path[path.length - 1]], path[path.length - 1], draft, n)
        set(draft, path, n)
      })
      // console.log({ next })
      return state$.next(next as T)
    }

    const getter = () => {
      const root = state$.value
      if (!depth) {
        return root
      }

      return get(root, path)
    }

    const _selfFn = {
      [path.join("/")]: (...args: any[]) => {
        if (args.length) {
          setter(args[0])
          SignalCreator.dispatch.next({ type: "set", value: proxy as ISignal<any> })
          return _self.$
        }
        SignalCreator.dispatch.next({ type: "get", value: proxy as ISignal<any> })
        return getter()
      },
    }[path.join("/")]
    let ID = ""

    const _self = {
      $: new Proxy(_selfFn as ASignal<T>, {
        get(target, p) {
          if (p === "value") {
            return _selfFn()
          }
          if (p === "next") {
            return _selfFn
          }
          if (p === "path") return path
          if (p in target) return (target as any)[p as any]
          if (p in root$) {
            let _autoSelector_$ = root$
            if (depth) {
              _autoSelector_$ = root$.pipe(
                map(i => get(i, path)),
                // tap({ subscribe: () => console.log("What in tarnation 2?") }),
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
          if (p === "id") {
            // biome-ignore lint/suspicious/noAssignInExpressions: proxy caching inline
            return ((target as any)[p] ||= (setId?: string) => {
              if (setId) {
                ID = setId
                return proxy
              }
              return ID
            })
          }
          if (p === "use") {
            return (target[p] ||= () => getter())
          }

          if (p === "ref") {
            return getter()
          }
        },
      }),
    } as ISignal<T>

    const proxy = new Proxy<ISignal<T>>(
      /** Bc of how proxies work, we must pass a function if we want apply to work */
      _self as ISignal<T>,
      {
        get(target, p) {
          if (p in target) return (target as any)[p as any]
          if (p === "_") {
            return _selfFn()
          }
          if (typeof p === "symbol") {
            return (target as any)[p]
          }
          // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
          return ((target as any)[p] ||= createProxy([...path, p as string]))
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
