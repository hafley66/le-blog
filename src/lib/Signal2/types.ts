import { type Draft } from "immer"
import { type Observable } from "rxjs"

export type Act<T extends string, V> = {
  type: T
  value: V
}

export type DepthLimit = [never, 0, 1, 2, 3, 4, 5, 6]

export interface ASignal<T> extends Observable<T> {
  (): T
  (next: T): ASignal<T>
  value: T
  next: (next: T) => ASignal<T>
  nextImmer: (draft: Draft<T>) => undefined | Draft<T>
  use: () => T
  path: string[]
  $: Observable<SignalEvents<T>>
}

export type ISignal<T, Base extends {} = {}, Depth extends number = 5> = Base & {
  $: ASignal<T> & {
    id: {
      (setId: string): RSignal<T, Base, Depth>
      (): string
    }
  }
  _: T
}

export type RSignal<T, Base extends {} = {}, Depth extends number = 5> = ISignal<T, Base, Depth> &
  (Depth extends never
    ? never
    : isRecursive<NonNullable<T>> extends 1
      ? {
          [K in keyof NonNullable<T>]-?: RSignal<_RSignalGetRecursiveValue<T, K>, Base, DepthLimit[Depth]>
        } & (NonNullable<T> extends unknown[]
          ? Record<number, RSignal<_RSignalGetRecursiveValue<T, number>, Base, DepthLimit[Depth]>>
          : {}) // Array case, we iterate over all prototype above, but we actually get the generic of number => T mapping here
      : {}) &
  Base

export type _RSignalGetRecursiveValue<T, K> = Nullish<T> extends true
  ? K extends keyof NonNullable<T>
    ? NonNullable<T>[K] | undefined
    : never
  : K extends keyof T
    ? T[K]
    : never

export type Nullish<T> = null extends T ? true : undefined extends T ? true : false

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

type NonFunctionKeys<T> = { [K in keyof T]: [K, T[K]] }[keyof T]

type Functional<T> = T extends (...args: any) => any ? 1 : 0
export type isRecursive<T> = NonNullable<T> extends Record<any, any>
  ? NonNullable<T> extends never
    ? 0
    : 1
  : [] extends NonNullable<T>
    ? 1
    : 0
type ex1 = { a: number; b: { c: number } } | null
type h = {
  x: NonFunctionKeys<string>
  _: isRecursive<{ a: "WAT" }>
  __: isRecursive<{ a: "WAT" }[]>
  a1: isRecursive<[]>
  a11: isRecursive<any[]>
  a111: isRecursive<{}[] | null>
  a2: isRecursive<{}>
  a3: isRecursive<{} | null>
  a4: isRecursive<{} | undefined | { a: 123 }>
  a44: isRecursive<{} | undefined | null>
  a5: isRecursive<[] | null>
  a55: isRecursive<[] | undefined>
  a555: isRecursive<[] | null | undefined>
  a6: isRecursive<[] | {} | null>
  b0: isRecursive<false>
  b1: isRecursive<true>
  b2: isRecursive<boolean>
  b3: isRecursive<string>
  b4: isRecursive<number>
  b5: isRecursive<null>
  b6: isRecursive<undefined>
  b7: isRecursive<never>
  c: isRecursive<{
    a: number
    b: {
      x: number
    } | null
  } | null>
  wtf: NonNullable<null>
  wtf2: NonNullable<null> extends Record<any, any> ? 1 : 0
  ar: Record<any, any> extends any[] ? 1 : 0
  fun: Functional<number | undefined>
  ar2: any[] extends Record<any, any> ? 1 : 0
  tr: {
    a: isRecursive<TR>
    b: Nullish<TR>
    c: Functional<TR>
    x: RSignal<TR>[number]["b"]["x"]
    xx: RSignal<any[] | null>["length"]["$"]
    x1: RSignal<{ a: number }[] | null>["length"]["_"]
    x4: RSignal<{ a: number; b: { c: number } }>["b"]["c"]["_"]
    x6: RSignal<
      | {
          a: number
          b: string
        }
      | undefined
    >
    x44: isRecursive<NonNullable<{ a: number; b: { c: number } }>>
    x4a: _RSignalGetRecursiveValue<_RSignalGetRecursiveValue<ex1, "b">, "c">
    x4aa: keyof NonNullable<ex1>
    x4aaa: Nullish<ex1>
    x5: RSignal<{}>
    // x: RSignalNullish<TR>
    // xx: RSignalNullish<any[] | null>
    // x1: RSignalNullish<{}[] | null>
    x2: isRecursive<{}[] | null>
  }
}
type AA = {
  a: RSignal<"hmm">
  aa: RSignal<string>
  string: isRecursive<NonNullable<string>>
}

type TR =
  | {
      a: number
      b: null | {
        x: 123
      }
    }[]
  | null

export type SignalEvents<T> =
  | Act<"create", { it: RSignal<T>; path: string[] }>
  | Act<"subscribe", { it: RSignal<T>; path: string[] }>
  | Act<"get", { it: RSignal<T>; path: string[] }>
  | Act<"set", { it: RSignal<T>; path: string[]; value: T }>
  | Act<"unsubscribe", { it: RSignal<T>; path: string[] }>
  | Act<"destory", { it: RSignal<T>; path: string[] }>
