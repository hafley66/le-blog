// deno-lint-ignore-file no-fallthrough
import { stat } from "node:fs"
import {
  BehaviorSubject,
  Observable,
  OperatorFunction,
  Subject,
  UnaryFunction,
  map,
  merge,
  of,
  pipe as rxjsPipe,
  scan,
  shareReplay,
  tap,
} from "rxjs"
import { string } from "zod"
import { u } from "unist-builder"

type LifeEvents =
  | ["subscribe", url: string, index: number]
  | [
      "subscribe-start",
      url: string,
      index: number,
      time: number,
    ]
  | [
      "subscribe-end",
      url: string,
      index: number,
      time: number,
    ]
  | [
      "next",
      url: string,
      index: number,
      valueIndex: number,
      value: any,
    ]
  | ["complete", url: string, subIndex: number]
  | ["error", url: string, subIndex: number, error: any]
  | [
      "error-during-subscribe",
      url: string,
      subIndex: number,
      error: any,
    ]
  | ["unsubscribe", url: string, subIndex: number]
  | ["unsubscribe-start", url: string, subIndex: number]
  | ["unsubscribe-end", url: string, subIndex: number]
  | [
      "finalize-start",
      url: string,
      subIndex: number,
      time: number,
    ]
  | ["finalize-end", url: string, sub: number, time: number]
  | ["dynamic-ref", url: string, sub: number, ref: string]

// Event subjects for tracking
export const lifeEvents = new Subject<LifeEvents>()

export const pipeEvents = new Subject<
  | ["op", url: string, number, Function]
  | ["op-call", url: string, number, args: any[]]
  | ["op-source", url: string, source: Observable<any>]
  | [
      "op-source-result",
      url: string,
      result: Observable<any>,
    ]
  | ["pipe-start", url: string, source: Observable<any>]
  | ["pipe-end", url: string, result: Observable<any>]
  | ["observable-created", string, Observable<any>]
>()

// Global counters and maps
let globalObsCounter = 0
const funMap = new WeakMap<Function, number>()
const funCallMap = new WeakMap<Function, number>()

// Store for pipe metadata
export interface PipeMetadata {
  id: string
  operations: string[]
  sourceId?: string
  resultId?: string
  operatorIds?: string[] // Track operator IDs used in this pipe
  subscriberIds?: string[] // Track subscriber IDs for this pipe
}

export const pipeMetadata: Record<string, PipeMetadata> = {}

// Tree structure for visualization
export interface PipeNode {
  id: string
  parentId?: string
  operators: string[]
  children: PipeNode[]
  subscribers: string[]
}

export const pipeTree: Record<string, PipeNode> = {}

/**
 * Wrap an observable with lifecycle tracking
 */
export function wrapWithLifecycle<T>(
  source: Observable<T>,
  prefixId: string,
): Observable<T> {
  let sub_id = 0

  return new Observable<T>(subscriber => {
    const this_id = sub_id++
    let n_id = 0

    lifeEvents.next([
      "subscribe-start",
      prefixId,
      this_id,
      +new Date(),
    ])

    try {
      const subscription = tap<T>({
        next: value =>
          lifeEvents.next([
            "next",
            prefixId,
            this_id,
            n_id++,
            value,
          ]),

        error: err =>
          lifeEvents.next([
            "error",
            prefixId,
            this_id,
            err,
          ]),

        complete: () =>
          lifeEvents.next(["complete", prefixId, this_id]),

        unsubscribe: () =>
          lifeEvents.next([
            "unsubscribe",
            prefixId,
            this_id,
          ]),
      })(source).subscribe(subscriber)

      const old =
        subscription.unsubscribe.bind(subscription)
      subscription.unsubscribe = (...args) => {
        console.log(subscription._parentage)
        !subscription.closed &&
          lifeEvents.next([
            "unsubscribe-start",
            prefixId,
            this_id,
          ])
        const wasClosedBefore = subscription.closed
        const r = old(...args)
        !wasClosedBefore &&
          lifeEvents.next([
            "unsubscribe-end",
            prefixId,
            this_id,
          ])
        return r
      }

      lifeEvents.next([
        "subscribe-end",
        prefixId,
        this_id,
        +new Date(),
      ])

      return () => {
        !subscription.closed &&
          lifeEvents.next([
            "finalize-start",
            prefixId,
            this_id,
            +new Date(),
          ])
        if (!subscription.closed) subscription.unsubscribe()
        !subscription.closed &&
          lifeEvents.next([
            "finalize-end",
            prefixId,
            this_id,
            +new Date(),
          ])
      }
    } catch (subscribeTimeError) {
      lifeEvents.next([
        "error-during-subscribe",
        prefixId,
        this_id,
        subscribeTimeError,
      ])
      throw subscribeTimeError
    }
  })
}

/**
 * Register an observable with a unique ID
 */
export function registerObservable<T>(
  obs: Observable<T>,
  id?: string,
): Observable<T> {
  const obsId = id || `obs-${globalObsCounter++}`
  pipeEvents.next(["observable-created", obsId, obs])
  // Create a wrapped version with lifecycle tracking
  const wrappedObs = wrapWithLifecycle(obs, obsId)
  // Add metadata to the wrapper
  wrappedObs.url = obsId
  return wrappedObs
}

/**
 * Enhanced operator wrapper that tracks operator usage
 */
export function o<
  T extends (...args: any[]) => OperatorFunction<any, any>,
>(fun: T): T {
  const wrapper = {
    [fun.name]: (...args: any[]) => {
      const originalOperatorFn = fun(...args)
      return wrapOperatorFunction(
        originalOperatorFn,
        fun.name,
      )
    },
  }[fun.name]
  Object.assign(wrapper, fun)
  return wrapper as any
}

export const wrapOperatorFunction = (
  originalOperatorFn: OperatorFunction<any, any>,
  opName?: string,
) => {
  const wrapper = (
    source: Observable<any>,
  ): Observable<any> => {
    const url = `${wrapper.parentUrl}/${wrapper.index}/${wrapper.opName}`

    pipeEvents.next(["op-source", url, source])

    // Apply the original operator function to get the result observable
    const og = originalOperatorFn(source)
    // Generate a result ID for this operator application
    pipeEvents.next(["op-source-result", url, og])

    // Wrap the result with lifecycle tracking
    const wrappedResult = wrapWithLifecycle(og, url)
    // observableIdMap.set(wrappedResult, id)

    return wrappedResult
  }
  // Add metadata to the wrapper
  wrapper.opName = opName ?? "?op?"
  wrapper.parentUrl = ""
  wrapper.index = 0
  return wrapper
}

let currentRefScope = ""

export const withCurrentRefScope = <T>(
  scope: string,
  it: () => T,
) => {
  currentRefScope = scope
  const out = it()
  currentRefScope = ""
  return out
}

/**
 * Custom operator to name a pipe
 */
export function pipeId<T>(
  id: string,
  tag?: string,
): UnaryFunction<Observable<T>, Observable<T>> {
  const it = (source: Observable<T>): Observable<T> => {
    // This is a no-op operator that just passes the source through
    return source
  }
  it.pipeId = id
  it.pipeIdUrl = tag
  return it
}

// Monkey patch observable creation methods
const originalOf = of
export function enhancedOf<T>(...args: T[]): Observable<T> {
  const result = originalOf(...args)
  return registerObservable(
    result,
    `of-${globalObsCounter++}`,
  )
}

globalThis.pipeEvents = []
pipeEvents.subscribe(n => globalThis.pipeEvents.push(n))
lifeEvents.subscribe(n => globalThis.pipeEvents.push(n))

const state = new BehaviorSubject({
  subs: {} as Record<
    string,
    {
      root: null | [url: string, subIndex: number]
      events: {
        time: number
        value: LifeEvents
      }[]
    }[]
  >,
  activeSubRoots: [] as {
    url: string
    subIndex: number
    deps: [url: string, subIndex: number][]
  }[],
  subscribeChain: { root: null, stack: [] } as {
    root: null | [url: string, subIndex: number]
    stack: [url: string, subIndex: number][]
  },
  observables: {} as Record<string, Entry>,
  currentNode: [
    {
      url: "",
      parent: null,
      children: [],
      depth: 0,
      childPipes: [],
      refs: [],
      before: "",
    },
  ] as Entry[],
})

globalThis.state = state
export { state as rxjsState }
export const rxjsDebugState = merge(
  lifeEvents.pipe(
    map(i => ({ type: "life", value: i }) as const),
  ),
  pipeEvents.pipe(
    map(i => ({ type: "pipe", value: i }) as const),
  ),
).pipe(
  scan((state, { type, value }) => {
    switch (type) {
      case "pipe": {
        const current = state.currentNode.at(-1)
        if (!current) return state
        const before = current.children.at(-1)

        switch (value[0]) {
          case "observable-created":
          case "pipe-start": {
            current.children.push(value[1])
            const it: Entry = {
              parent: value[2].url ?? current.url ?? null,
              url: value[1],
              children: [],
              depth: current.depth + 1,
              childPipes: [],
              refs: [],
              before: before || current.url,
            }
            state.currentNode.push(it)
            state.observables[value[1]] = it
            if (value[2].url) {
              state.observables[
                value[2].url
              ].childPipes.push(value[1])
            }
            return state
          }
          case "op-source": {
            const current = state.currentNode.at(-1)
            const before = current?.children.at(-1)

            current?.children.push(value[1])

            state.observables[value[1]] ??= {
              url: value[1],
              children: [],
              refs: [],
              parent: current?.url ?? null,
              depth: (current?.depth ?? 0) + 1,
              childPipes: [],
              before: before || current?.url,
            }
            return state
          }
          case "pipe-end": {
            state.currentNode.pop()
            return state
          }
          default:
            return state
        }
      }
      case "life":
        {
          state.subs[value[1]] ||= []
          state.subs[value[1]][value[2]] ||= {
            events: [],
            root: null,
          }
          state.subs[value[1]][value[2]].events.push({
            time: +new Date(),
            superNow: performance.now(),
            value,
          })
          const isRoot = state.activeSubRoots.find(
            i =>
              i.url === value[1] && i.subIndex === value[2],
          )

          switch (value[0]) {
            case "subscribe-start": {
              state.subscribeChain.stack.push([
                value[1],
                value[2],
              ])
              return state
            }
            case "subscribe-end": {
              // We have started reversing, here is root? idk we will find out lmfao
              if (!state.subscribeChain.root) {
                state.subscribeChain.root = [
                  value[1],
                  value[2],
                ]
                state.activeSubRoots.push({
                  url: value[1],
                  subIndex: value[2],
                  deps: [],
                })
              } else {
                const r = state.subscribeChain.root
                state.activeSubRoots
                  .find(
                    i =>
                      i.url === r?.[0] &&
                      i.subIndex === r?.[1],
                  )
                  ?.deps?.push([value[1], value[2]])
              }

              // const foundRoots = []
              // Find all dependents that are not finalized
              // if (state.value[1])
              // U can b ur own root
              state.subs[value[1]][value[2]].root =
                state.subscribeChain.root

              // Pop the stack and validate
              const peek = state.subscribeChain.stack.pop()
              if (peek && peek[0] !== value[1]) {
                console.log("WTF", peek, value)
              }

              // Clear root once stack is cleared?
              if (!state.subscribeChain.stack.length) {
                state.subscribeChain.root = null
              }

              return state
            }
            case "unsubscribe-start": {
              if (!isRoot) {
                const root =
                  state.subs[value[1]][value[2]]?.root

                if (root) {
                  const anotherRoot =
                    state.activeSubRoots.find(
                      i =>
                        i.url === root[0] &&
                        i.subIndex === root[1],
                    )

                  if (anotherRoot) {
                    const me = anotherRoot.deps.findIndex(
                      i =>
                        i[0] === value[1] &&
                        i[1] === value[2],
                    )
                    // console.log(
                    //   "Cutting from root deps",
                    //   value,
                    //   [...anotherRoot.deps],
                    //   me,
                    //   { ...root },
                    // )
                    if (me > -1) {
                      anotherRoot.deps?.splice(me, 1)
                    }
                  }
                }
              }
              return state
            }
            case "unsubscribe-end": {
              if (isRoot) {
                const updatees = isRoot.deps
                // this is everyone alive after finalization, so something is up lol.
                console.log({ updatees: [...updatees] })
              }
            }

            // case "next": {
            // }
            // case "error": {
            // }
            // case "error-during-subscribe": {
            // }
            // case "complete": {
            // }
            // case "unsubscribe": {
            // }
          }
        }
        return state
    }
  }, state.value),
  tap(state),
  shareReplay({ bufferSize: 1, refCount: true }),
)

rxjsDebugState.subscribe()
// .subscribe(x => console.log(JSON.stringify(x, null, 2)))
// .subscribe(console.log)

type Entry = {
  parent: null | string
  url: string
  children: string[]
  depth: number
  childPipes: string[]
  before?: string | null
  refs: string[] // Optional refs for things like merge/combine and mergeWith etc.
}
// // Example usage with the enhanced operators
// const example = originalOf(1).pipe(
//   pipeId("example-pipe"),
//   o(map)(i => i + 1),
// )

// // You can subscribe to the example to see the events
// example.subscribe()
