import { BehaviorSubject, Subject } from "rxjs" // dispatch$ input stream: actions flow here
import {
  scan,
  startWith,
  shareReplay,
  tap,
} from "rxjs/operators" // operators to build state stream
import { useState, useEffect } from "react"

// Reducer map: actionName -> (state, payload) => newState
type CaseReducers<S> = {
  [actionName: string]: (state: S, payload?: any) => S
}

/**
 * createSlice$ - RxJS-based slice akin to Redux Toolkit's createSlice
 *
 * Visual model of state over time:
 *
 *   dispatch$    ---action---> scan() ---> reducer$ ===> shared latest state
 *                    │                      │
 *                    └--[history array]     └--shareReplay caches last value
 *
 * - dispatch$: Subject that receives actions (like store.dispatch)
 * - reducer$: Observable stream of state snapshots over time
 * - startWith: ensures initialState emits immediately
 * - scan: applies reducer to action stream, accumulating state
 * - shareReplay: caches latest state for new subscribers (bufferSize=1)
 */
export function createSlice$<S>(opts: {
  id: string
  initialState: S
  reducers: CaseReducers<S>
}) {
  const { id, initialState, reducers } = opts

  // Action creators auto-dispatch into dispatch$
  const actions: Record<string, (payload?: any) => void> =
    {}
  // Handler lookup: actionType -> reducer function
  const handler: Record<string, (s: S, p?: any) => S> = {}

  // Build action creators and handler map
  for (const key of Object.keys(reducers)) {
    const type = `${id}/${key}`
    actions[key] = (payload?) =>
      dispatch$.next({ type, payload })
    handler[type] = reducers[key]
  }

  // Combined reducer function: applies matching handler or returns state
  const reducer = (
    state: S,
    action: { type: string; payload?: any },
  ) =>
    handler[action.type]?.(state, action.payload) ?? state

  // Subject for dispatching actions
  const dispatch$ = new Subject<{
    type: string
    payload?: any
  }>()

  const store$ = new BehaviorSubject(initialState)

  // Stream of state over time
  const reducer$ = dispatch$.pipe(
    scan(reducer, store$.value), // apply reducer per action
    startWith(store$.value), // emit initial state
    tap(store$),
    shareReplay(1), // cache latest state
  )

  /**
   * React hook to subscribe to reducer$
   * Usage: const state = slice.use()
   */
  function use() {
    const [state, set] = useState(store$.value)
    useEffect(() => {
      const sub = reducer$.subscribe(set)
      return () => sub.unsubscribe()
    }, [])
    return state
  }

  return { id, reducer, dispatch$, reducer$, actions, use }
}
