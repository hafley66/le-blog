import {
  map,
  Observable,
  of,
  OperatorFunction,
  Subject,
  tap,
} from "rxjs"

const lifeEvents = new Subject<
  | ["subscribe", number]
  | ["subscribe-start", number, number]
  | ["subscribe-end", number, number]
  | ["next", number, number]
  | ["complete", number]
  | ["error", number, any]
  | ["error-during-subscribe", number, any]
  | ["unsubscribe", number]
  | ["finalize", number]
  | ["finalize-start", number, number]
  | ["finalize-end", number, number]
>()

const pipeEvents = new Subject<
  | ["op", index: number, it: Function]
  | ["op-call", index: number, ...args: any[]]
  | ["op-source", source: Observable<any>]
  | ["op-source-result", result: Observable<any>]
>()

let globalFunId = 0
const funMap = new WeakMap<Function, number>()
const funCallMap = new WeakMap<Function, number>()

export function o<
  T extends (...args: any[]) => OperatorFunction<any, any>,
>(fun: T): T {
  if (!funMap.has(fun)) {
    globalFunId++
  }
  const gid = globalFunId
  const funId = funMap.get(fun) ?? 0
  funMap.set(fun, funId + 1)
  pipeEvents.next(["op", gid, fun])
  // @ts-ignore
  return (...args: any[]) => {
    const callId = funCallMap.get(fun) ?? 0
    funCallMap.set(fun, callId + 1)
    pipeEvents.next(["op-call", callId, ...args])
    return (source: Observable<any>) => {
      pipeEvents.next(["op-source", source])
      const og = fun(...args)(source)
      pipeEvents.next(["op-source-result", og])
      let sub_id = 0
      return new Observable<T>(sub => {
        const this_id = sub_id++
        let n_id = 0
        lifeEvents.next([
          "subscribe-start",
          this_id,
          +new Date(),
        ])
        try {
          const s = tap<T>({
            subscribe: () =>
              lifeEvents.next(["subscribe", this_id]),

            next: n =>
              lifeEvents.next(["next", this_id, n_id++]),

            error: e =>
              lifeEvents.next(["error", this_id, e]),

            complete: () =>
              lifeEvents.next(["complete", this_id]),

            unsubscribe: () =>
              lifeEvents.next(["unsubscribe", this_id]),

            finalize: () =>
              lifeEvents.next(["finalize", this_id]),
          })(og).subscribe(sub)

          lifeEvents.next([
            "subscribe-end",
            this_id,
            +new Date(),
          ])
          return () => {
            s.unsubscribe()
          }
        } catch (subscribeTimeError) {
          lifeEvents.next([
            "error-during-subscribe",
            this_id,
            subscribeTimeError,
          ])
        }
      })
    }
  }
}

of(1).pipe(o(map)(i => i + 1))
