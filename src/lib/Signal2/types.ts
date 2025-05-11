import { Observable } from "rxjs"

export type Act<T extends string, V> = {
  type: T
  value: V
}

export type DepthLimit = [never, 0, 1, 2, 3, 4, 5, 6]

export interface ASignal<T> extends Observable<T> {
  (): T
  (next: T): this
  value: T
  next: (next: T) => this
  use: () => T
  ref: T
  path: string[]
}

export type ISignal<T, Depth extends number = 5> = RSignal<T, Depth> & {
  $: ASignal<T> & {
    id: {
      (setId: string): ISignal<T>
      (): string
    }
  }
  _: T
}

export interface ASignalNullish<T> extends Observable<T | undefined> {
  (): T | undefined
  (next: T | undefined): ASignalNullish<T>
  value: T | undefined
  next: (next: T | undefined) => ASignalNullish<T>
  use: () => T | undefined
  ref: T | undefined
  path: string[]
}

export type ISignalNullish<T, Depth extends number = 5> = RSignalNullish<T, Depth> & {
  $: ASignalNullish<T> & {
    id: {
      (setId: string): ISignalNullish<T>
      (): string
    }
  }
  _: T | undefined
}

export type RSignal<T, Depth extends number = 5> = Depth extends never
  ? never
  : Nullish<T> extends true
    ? RSignalNullish<NonNullable<T>, Depth>
    : isRecursive<T> extends 1
      ? {
          [K in keyof T as T[K] extends Function ? never : K]-?: ISignal<T[K], DepthLimit[Depth]>
        }
      : {
          $: ASignal<T>
          _: T
        }

export type RSignalNullish<T, Depth extends number = 5> = Depth extends never
  ? never
  : isRecursive<T> extends 1
    ? {
        [K in keyof T as T[K] extends Function ? never : K]-?: ISignalNullish<T[K], DepthLimit[Depth]>
      }
    : {
        $: ASignalNullish<T>
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
  ar2: any[] extends Record<any, any> ? 1 : 0
}
