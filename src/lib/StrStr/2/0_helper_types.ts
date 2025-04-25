import { Observable } from "rxjs"
import { HtmlEventIndex$ } from "~/lib/rxjs-vhtml/v2/types.dom.events.dom"

export type PathParts = readonly string[]

// A serializable type marker that preserves the original type
export interface Serial<T> {
  __serial: true
  __type: T
}

export function Serial<T>(fromDefault: T): Serial<T>
export function Serial<T>(): Serial<T>
// Create a serializable type reference without runtime value
export function Serial<T>(fromDefault_?: T): Serial<T> {
  return { __serial: true } as Serial<T>
}

// Helper to extract the type from Serial
export type ExtractSerialType<T> = T extends Serial<infer U>
  ? U
  : T

export type Join<
  T extends readonly string[],
  D extends string,
> = T extends []
  ? ""
  : T extends [infer F extends string]
    ? F
    : T extends [
          infer F extends string,
          ...infer R extends string[],
        ]
      ? F extends ""
        ? Join<R, D>
        : `${F}${D}${Join<R, D>}`
      : string

export type ExtractTemplateKeys<S extends string> =
  S extends `:${infer Param}` ? Param : never

export type ExtractKeysFromParts<P extends string[]> =
  P extends [
    infer Head extends string,
    ...infer Rest extends string[],
  ]
    ? ExtractTemplateKeys<Head> | ExtractKeysFromParts<Rest>
    : never

export type ToMutable<T> = T extends readonly [...infer R]
  ? [...R]
  : T
// Update the FillPathParts type to be simpler and more reliable
export type FillPathParts<
  P extends readonly string[],
  Params extends Record<string, any>,
> = {
  [K in keyof P]: P[K] extends `:${infer Param}`
    ? Param extends keyof Params
      ? Params[Param] extends string | number
        ? Params[Param]
        : P[K]
      : P[K]
    : P[K]
} extends infer R
  ? R
  : never

export type WithInput<
  PathKeys extends string,
  Q extends Record<string, any>,
  H extends Record<string, any>,
> = {
  [K in PathKeys]: string | number
} & {
  [K in keyof Q]: ExtractSerialType<Q[K]>
} & {
  [K in keyof H]: ExtractSerialType<H[K]>
}

// Create a cleaner flattened type
export type FlattenedWithInput<
  PathKeys extends string,
  Q extends Record<string, any>,
  H extends Record<string, any>,
> = {
  [K in PathKeys]?: string | number
} & {
  [K in keyof Q]?: ExtractSerialType<Q[K]>
} & {
  [K in keyof H]?: ExtractSerialType<H[K]>
}

// Helper type to clean up the intersection
export type CleanObject<T> = {
  [K in keyof T]: T[K]
}
// Even cleaner approach using mapped types
export type TypesHelper<
  PathKeys extends string,
  Q extends Record<string, any>,
  H extends Record<string, any>,
> = {
  path: Record<PathKeys, string | number>
  query: { [K in keyof Q]: ExtractSerialType<Q[K]> }
  hash: { [K in keyof H]: ExtractSerialType<H[K]> }

  // Direct mapped type instead of intersection
  with: {
    [K in PathKeys | keyof Q | keyof H]: K extends PathKeys
      ? string | number
      : K extends keyof Q
        ? ExtractSerialType<Q[K]>
        : K extends keyof H
          ? ExtractSerialType<H[K]>
          : never
  }
}
export type Split<
  S extends string,
  D extends string,
> = D extends ""
  ? [S]
  : S extends `${infer Head}${D}${infer Rest}`
    ? [Head, ...Split<Rest, D>]
    : [S]

export type EventWithParams<E, Keys extends string> = E & {
  delegateElement: HTMLElement
  params: Record<Keys, string>
}

export type DelegatedObservableWithParams<
  E,
  Keys extends string,
> = Observable<EventWithParams<E, Keys>>

export type HtmlEventIndex$WithParams<
  Keys extends string,
  ID extends string = any,
> = {
  [K in keyof HtmlEventIndex$]: DelegatedObservableWithParams<
    HtmlEventIndex$[K] extends Observable<infer E>
      ? E
      : never,
    Keys
  >
}

type JoinTA = Join<["", "a"], "/">
type JoinTB = Join<["a", "b"], "/">
