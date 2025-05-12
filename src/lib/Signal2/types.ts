import { Draft } from "immer"
import { SyntheticEvent } from "react"
import { Observable } from "rxjs"

export type Act<T extends string, V> = {
  type: T
  value: V
}

export type DepthLimit = [never, 0, 1, 2, 3, 4, 5, 6]

export type ASignal<T, Meta = unknown> = Observable<T> & {
  (): T
  (next: T): ASignal<T, Meta>
  value: T
  next: (next: T) => ASignal<T, Meta>
  setImmer: (draft: Draft<T>) => undefined | Draft<T>
  use: () => T
  path: string[]
} & Meta

export type ISignal<T, M = unknown, Depth extends number = 5> = RSignal<T, M, Depth> & {
  $: ASignal<T, M> & {
    id: {
      (setId: string): ISignal<T, M, Depth>
      (): string
    }
  }
  _: T
}

export type ASignalNullish<T, M = unknown> = Observable<T | undefined> & {
  (): T | undefined
  (next: T | undefined): ASignalNullish<T, M>
  value: T | undefined
  next: (next: T | undefined) => ASignalNullish<T, M>
  setImmer: (draft: Draft<T>) => undefined | Draft<T>
  use: () => T | undefined
  path: string[]
} & M

export type ISignalNullish<T, M = unknown, Depth extends number = 5> = RSignalNullish<T, M, Depth> & {
  $: ASignalNullish<T, M> & {
    id: {
      (setId: string): ISignalNullish<T, M, Depth>
      (): string
    }
  }
  _: T | undefined
}

export type RSignal<T, M = unknown, Depth extends number = 5> = Depth extends never
  ? never
  : Nullish<T> extends true
    ? RSignalNullish<NonNullable<T>, Depth>
    : isRecursive<T> extends 1
      ? {
          [K in keyof T]-?: Functional<T[K]> extends 1 ? T[K] : ISignal<T[K], M, DepthLimit[Depth]>
        } & (T extends unknown[] ? Record<number, ISignal<T[number], M, DepthLimit[Depth]>> : {}) // Array case, we iterate over all prototype above, but we actually get the generic of number => T mapping here
      : {
          $: ASignal<T, M>
          _: T
        }

export type RSignalNullish<T, M = unknown, Depth extends number = 5> = Depth extends never
  ? never
  : isRecursive<T> extends 1
    ? {
        [K in keyof T as K]-?: ISignalNullish<T[K], M, DepthLimit[Depth]>
      } & (T extends unknown[] ? Record<number, ISignalNullish<T[number], M, DepthLimit[Depth]>> : {})
    : {
        $: ASignalNullish<T, M>
        _: T | undefined
      }

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
    x: ISignalNullish<TR>
    xx: ISignalNullish<any[] | null>
    x1: ISignalNullish<{}[] | null>
    x2: isRecursive<{}[] | null>
  }
}
type TR =
  | {
      a: number
      b: null | {
        x: 123
      }
    }[]
  | null
