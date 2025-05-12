import { BehaviorSubject, map, Observable, shareReplay, Subject, tap } from "rxjs"
import { get, isEqual, set } from "lodash"
import { Draft, produce, isDraftable } from "immer"
import { Act, ASignal, ISignal } from "~/lib/Signal2/types.ts"
// dirty recursive upward
// invalid recursive upward
// touched is also upward
// disable is down
// commit is down
// default change is down

type ValidDraftReturnType<State> = State | void | undefined

export function SignalCreator<T, Meta = unknown>({
  initialState,
  observable,
  createMeta,
}: {
  initialState?: T
  observable?: Observable<T>
  createMeta?: (root?: ISignal<T>, path?: string[]) => Meta
}): ISignal<T, Meta> {
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

  const activeSubs: ISignal<T>[] = []

  const createProxy = (_path: string[], meta?: Meta): ISignal<T, Meta> => {
    // In case a symbol gets thru, bc that will break array.join
    const path = _path.filter(i => typeof i === "string")
    const depth = path.length

    const setterImmer = (recipe: (draft: Draft<T>) => ValidDraftReturnType<Draft<T>>) => {
      const curr = get(state$.value, path)
      if (isDraftable(curr)) {
        const next = produce(curr as Draft<T>, recipe)
        return setter(next as T)
      }
    }

    const setter = (n: T) => {
      // Pretty simple situation
      if (!depth) {
        return state$.next(n)
      }

      // we just deep set with lodash on an immer draft, this works unreasonably well.
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

      const val = get(root, path)
      if (typeof val === "function") {
        const context = depth === 1 ? root : get(root, path.slice(0, -1))
        // console.log({ val, context, root, path, p: path.slice(0, -1),  })
        if (Array.isArray(context)) {
          return (...args: any[]) => {
            let toReturn: any = undefined
            const next = produce(context, draft => {
              const funcName = path[path.length - 1]
              toReturn = draft[funcName as any](...args)
            })

            if (!isEqual(next, context)) {
              const parent: ISignal<any> = depth > 1 ? get(rootProxy, path.slice(0, -1)) : rootProxy
              parent.$.next(next)
            }

            return toReturn
          }
        }
        return val.bind(context)
      }
      return val
    }

    const _selfFn = {
      [path.join("/")]: (...args: any[]) => {
        if (args.length) {
          setter(args[0])
          SignalCreator.dispatch.next({ type: "set", value: { it: proxy as ISignal<any>, path, value: args[0] } })
          return _self.$
        }
        SignalCreator.dispatch.next({ type: "get", value: { it: proxy as ISignal<any>, path } })
        return getter()
      },
    }[path.join("/")]
    let ID = ""

    const _self = {
      $: new Proxy(_selfFn as ASignal<T, Meta>, {
        get(target, p) {
          if (p === "value") {
            return _selfFn()
          }
          if (p === "next") {
            return _selfFn
          }
          if (p === "setImmer") return setterImmer
          if (p === "path") return path
          if (p === "meta") return meta

          // Hit cache
          if (p in target) return (target as any)[p as any]

          // Lazy match observable props
          if (p in root$) {
            // Init assume root as source
            let _autoSelector_$ = root$

            if (depth) {
              // we are an auto-scope since we have a path
              _autoSelector_$ = root$.pipe(
                map(i => get(i, path)),
                tap({
                  subscribe: () => {
                    if (!activeSubs.includes(proxy)) {
                      activeSubs.push(proxy)
                    }
                  },
                  finalize: () => {
                    if (activeSubs.includes(proxy)) {
                      activeSubs.splice(activeSubs.indexOf(proxy), 1)
                    }
                  },
                }),
                shareReplay({
                  refCount: true,
                  bufferSize: 1,
                }),
              )
            }

            let it: any = _autoSelector_$[p as keyof typeof root$]

            // When its a method (it usually will be)
            if (typeof it === "function") it = it.bind(_autoSelector_$)

            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            return ((target as any)[p] ||= it)
          }

          // Id getter/setter
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
    } as ISignal<T, Meta>

    const proxy = new Proxy<ISignal<T, Meta>>(
      /** Bc of how proxies work, we must pass a function if we want apply to work */
      _self as ISignal<T, Meta>,
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
          return ((target as any)[p] ||= createProxy([...path, p as string], createMeta?.(rootProxy, path)))
        },
      },
    )
    return proxy
  }

  const rootProxy = createProxy([], createMeta?.()) as ISignal<T, Meta>
  return rootProxy
}

SignalCreator.dispatch = new Subject<
  | Act<"create", { it: ISignal<any>; path: string[] }>
  | Act<"subscribe", { it: ISignal<any>; path: string[] }>
  | Act<"get", { it: ISignal<any>; path: string[] }>
  | Act<"set", { it: ISignal<any>; path: string[]; value: any }>
  | Act<"next", { it: ISignal<any> }>
  | Act<"unsubscribe", { it: ISignal<any>; path: string[] }>
  | Act<"destory", { it: ISignal<any>; path: string[] }>
>()
