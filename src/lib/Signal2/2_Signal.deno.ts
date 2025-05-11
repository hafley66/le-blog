import { isObservable, Observable } from "rxjs"
import { ISignal, ISignalNullish, Nullish } from "~/lib/Signal2/types.ts"
import { SignalCreator } from "~/lib/Signal2/0_SignalCreator.deno.ts"
import { MEMO_FUN } from "~/lib/Signal2/1_SignalMemoFunction.deno.ts"

export function Signal<T extends () => any>(
  state: T,
): T extends () => infer U ? (Nullish<U> extends [true] ? ISignalNullish<U> : ISignal<U>) : never
// @ts-ignore
export function Signal<T>(observable: Observable<T>): ISignalNullish<T>
export function Signal<T>(observable: Observable<T>, defaultState: T): ISignal<T>
export function Signal<T>(state: T): Nullish<T> extends true ? ISignalNullish<T> : ISignal<T>
export function Signal<T>(): ISignalNullish<T>
export function Signal<T>(obs_memo_state_or_void?: Observable<T> | T, defaults?: T) {
  if (isObservable(obs_memo_state_or_void)) {
    return SignalCreator({ initialState: defaults, observable: obs_memo_state_or_void })
  }

  if (typeof obs_memo_state_or_void === "function") {
    return MEMO_FUN(obs_memo_state_or_void as () => T).signal
  }

  return SignalCreator({ initialState: obs_memo_state_or_void })
}

Signal.react = function <T>(it: T): T {
  return it
}
