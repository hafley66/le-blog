import {
  map,
  Observable,
  of,
  OperatorFunction,
  Subject,
  tap,
  UnaryFunction,
  pipe as rxjsPipe,
} from "rxjs"

// Event subjects for tracking
export const lifeEvents = new Subject<
  | ["subscribe", string, number]
  | ["subscribe-start", string, number, number]
  | ["subscribe-end", string, number, number]
  | ["next", string, number, number]
  | ["complete", string, number]
  | ["error", string, number, any]
  | ["error-during-subscribe", string, number, any]
  | ["unsubscribe", string, number]
  | ["finalize", string, number]
  | ["finalize-start", string, number, number]
  | ["finalize-end", string, number, number]
>()

export const pipeEvents = new Subject<
  | ["op", string, number, Function]
  | ["op-call", string, number, ...args: any[]]
  | ["op-source", string, source: Observable<any>]
  | ["op-source-result", string, result: Observable<any>]
  | ["pipe-start", string, source: Observable<any>]
  | ["pipe-end", string, result: Observable<any>]
  | [
      "pipe-operator",
      string,
      operatorIndex: number,
      operatorName: string,
    ]
  | ["observable-created", string, Observable<any>]
>()

// Global counters and maps
let globalFunId = 0
let globalPipeCounter = 0
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

// Map to associate observables with their IDs
const observableIdMap = new WeakMap<
  Observable<any>,
  string
>()

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
    const fullId = `${prefixId}:${this_id}`
    let n_id = 0

    // Track subscriber in pipe metadata
    if (pipeMetadata[prefixId]) {
      pipeMetadata[prefixId].subscriberIds =
        pipeMetadata[prefixId].subscriberIds || []
      pipeMetadata[prefixId].subscriberIds.push(fullId)

      // Also update the tree
      if (pipeTree[prefixId]) {
        pipeTree[prefixId].subscribers.push(fullId)
      }
    }

    lifeEvents.next([
      "subscribe-start",
      prefixId,
      this_id,
      +new Date(),
    ])

    try {
      const subscription = tap<T>({
        subscribe: () =>
          lifeEvents.next(["subscribe", prefixId, this_id]),

        next: value =>
          lifeEvents.next([
            "next",
            prefixId,
            this_id,
            n_id++,
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

        finalize: () =>
          lifeEvents.next(["finalize", prefixId, this_id]),
      })(source).subscribe(subscriber)

      lifeEvents.next([
        "subscribe-end",
        prefixId,
        this_id,
        +new Date(),
      ])

      return () => {
        subscription.unsubscribe()
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
  observableIdMap.set(obs, obsId)
  pipeEvents.next(["observable-created", obsId, obs])

  // Create a wrapped version with lifecycle tracking
  const wrappedObs = wrapWithLifecycle(obs, obsId)
  observableIdMap.set(wrappedObs, obsId)

  // Add pipe metadata
  pipeMetadata[obsId] = {
    id: obsId,
    operations: ["source"],
    subscriberIds: [],
  }

  // Add to tree
  pipeTree[obsId] = {
    id: obsId,
    operators: ["source"],
    children: [],
    subscribers: [],
  }

  return wrappedObs
}

/**
 * Enhanced operator wrapper that tracks operator usage
 */
export function o<
  T extends (...args: any[]) => OperatorFunction<any, any>,
>(fun: T): T {
  const opBaseId = `op-${fun.name || "unknown"}-${globalFunId++}`
  const funId = funMap.get(fun) ?? 0
  funMap.set(fun, funId + 1)

  pipeEvents.next(["op", opBaseId, funId, fun])

  // Create a wrapper function with the same signature as the original
  const wrapper = (...args: any[]) => {
    const callId = funCallMap.get(fun) ?? 0
    funCallMap.set(fun, callId + 1)
    const opCallId = `${opBaseId}:${callId}`

    pipeEvents.next(["op-call", opCallId, callId, ...args])

    // Get the original operator function
    const originalOperatorFn = fun(...args)

    // Return an enhanced operator function
    return (source: Observable<any>): Observable<any> => {
      const sourceId =
        observableIdMap.get(source) || "unknown"
      pipeEvents.next(["op-source", opCallId, source])

      // Apply the original operator function to get the result observable
      const og = originalOperatorFn(source)

      // Store the operator ID on the source if it's part of a pipe
      if (sourceId && pipeMetadata[sourceId]) {
        pipeMetadata[sourceId].operatorIds =
          pipeMetadata[sourceId].operatorIds || []
        pipeMetadata[sourceId].operatorIds.push(opCallId)
      }

      // Generate a result ID for this operator application
      const resultId = `${opCallId}-result`
      pipeEvents.next(["op-source-result", resultId, og])

      // Wrap the result with lifecycle tracking
      const wrappedResult = wrapWithLifecycle(og, resultId)
      observableIdMap.set(wrappedResult, resultId)

      return wrappedResult
    }
  }

  // Copy properties from original function
  Object.assign(wrapper, fun)

  // Add metadata to the wrapper
  wrapper.opId = opBaseId
  wrapper.opName = fun.name || "unknown"

  return wrapper as any
}

/**
 * Custom operator to name a pipe
 */
export function pipeId<T>(
  id: string,
): UnaryFunction<Observable<T>, Observable<T>> {
  const it = (source: Observable<T>): Observable<T> => {
    // This is a no-op operator that just passes the source through
    return source
  }
  it.pipeId = id
  return it
}

// Store original pipe method
const originalPipe = Observable.prototype.pipe

// Monkey patch the pipe method
Observable.prototype.pipe = function (
  ...operations: OperatorFunction<any, any>[]
): any {
  let pipeIdentifier: string | null = null

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

  // Generate a default pipe ID
  // const defaultPipeId = `pipe-${globalPipeCounter++}`

  const oid = `${this.parentPipeId}/${pipeIdentifier}`
  this.pipeFilename = pipeIdentifier
  this.pipeId = oid

  // // Register the result observable with the pipe ID
  // observableIdMap.set(result, pipeIdentifier)

  // Emit pipe-start event
  pipeEvents.next(["pipe-start", this.pipeId, this])

  // Store metadata about this pipe
  pipeMetadata[pipeIdentifier] = {
    id: this.pipeId,
    operations: operations.map(op => {
      // Track each operator in the pipe
      const opName = op.opName || op.name || "unknown"
      pipeEvents.next([
        "pipe-operator",
        this.pipeId,
        operations.indexOf(op),
        opName,
      ])
      return opName
    }),
    operatorIds: [],
    subscriberIds: [],
  }

  // Update the tree structure
  pipeTree[pipeIdentifier] = {
    id: pipeIdentifier,
    parentId: sourceObsId,
    operators: pipeMetadata[pipeIdentifier].operations,
    children: [],
    subscribers: [],
  }

  // If this pipe has a parent, add it as a child in the tree
  if (sourceObsId && pipeTree[sourceObsId]) {
    pipeTree[sourceObsId].children.push(
      pipeTree[pipeIdentifier],
    )
  }

  // Call the original pipe method
  const result = originalPipe.apply(this, operations)

  // Emit pipe-end event
  pipeEvents.next(["pipe-end", pipeIdentifier, result])

  result.parentPipeId = pipeIdentifier
  return result
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

// Setup console logging for events
pipeEvents.subscribe(event => {
  console.log("Pipe Event:", event)
})

lifeEvents.subscribe(event => {
  console.log("Life Event:", event)
})

// Example usage
export function logPipeTree() {
  console.log(
    "Pipe Tree:",
    JSON.stringify(pipeTree, null, 2),
  )
  console.log(
    "Pipe Metadata:",
    JSON.stringify(pipeMetadata, null, 2),
  )
}

// Example usage with the enhanced operators
const example = originalOf(1).pipe(
  pipeId("example-pipe"),
  o(map)(i => i + 1),
)

// You can subscribe to the example to see the events
example.subscribe()
