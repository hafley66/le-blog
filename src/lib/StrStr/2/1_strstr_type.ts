import {
  ExtractKeysFromParts,
  ExtractTemplateKeys,
  FillPathParts,
  Join,
  PathParts,
  Serial,
  Split,
  ToMutable,
  TypesHelper,
  WithInput,
  HtmlEventIndex$WithParams,
} from "./0_helper_types"

export type StrStrType<
  P extends PathParts,
  Keys extends string = ExtractKeysFromParts<ToMutable<P>>,
  Q extends Record<string, any> = {},
  H extends Record<string, any> = {},
> = {
  path: P
  head: P extends [...string[], infer Head] ? Head : ""
  join<D extends string>(delimiter: D): Join<P, D>

  // Type information for external use
  Types: TypesHelper<Keys, Q, H>

  // Combined with function
  // Replace the current with function definition with this:
  // Update the with function
  // Update the with function
  // with<const T extends WithInput<Keys, Q, H>>(
  //   params: T,
  // ): StrStrType<
  //   {
  //     [K in keyof P]: P[K] extends `:${infer Param}`
  //       ? Param extends keyof T
  //         ? T[Param] extends string | number
  //           ? T[Param]
  //           : P[K]
  //         : P[K]
  //       : P[K]
  //   } extends infer R
  //     ? R extends any[]
  //       ? R
  //       : never
  //     : never,
  //   Exclude<Keys, keyof T>,
  //   Q,
  //   H
  // >

  // Update the with function type to preserve all possible inputs
  with<const T extends WithInput<Keys, Q, H>>(
    params: T,
  ): StrStrType<
    {
      [K in keyof P]: P[K] extends `:${infer Param}`
        ? Param extends keyof T
          ? T[Param] extends string | number
            ? T[Param]
            : P[K]
          : P[K]
        : P[K]
    } extends infer R
      ? R extends any[]
        ? R
        : never
      : never,
    Keys, // Keep all original Keys instead of excluding used ones
    Q,
    H
  >

  x<const S extends string, const D extends string = "/">(
    next: S,
    delim?: D,
  ): StrStrType<
    [...P, ...Split<S, D>],
    Keys | ExtractTemplateKeys<S>,
    Q,
    H
  >

  // // Renamed from declare to children, with parent reference
  // children<
  //   T extends {
  //     [K in keyof T]: (
  //       k: StrStrType<
  //         [...P, ...Split<K & string, "/">],
  //         any,
  //         Q,
  //         H
  //       > & { parent: StrStrType<P, Keys, Q, H> },
  //     ) => any
  //   },
  // >(
  //   defs: T,
  // ): {
  //   [K in keyof T]: StrStrType<
  //     [...P, ...Split<K & string, "/">],
  //     | Keys
  //     | ExtractKeysFromParts<
  //         ToMutable<Split<K & string, "/">>
  //       >,
  //     Q,
  //     H
  //   > & {
  //     parent: StrStrType<P, Keys, Q, H>
  //   }
  // }
  // Update the children method type to support nested definitions
  // children<
  //   T extends {
  //     [K in keyof T]: (
  //       k: StrStrType<
  //         [...P, ...Split<K & string, "/">],
  //         | Keys
  //         | ExtractKeysFromParts<
  //             ToMutable<Split<K & string, "/">>
  //           >,
  //         Q,
  //         H
  //       > & { parent: StrStrType<P, Keys, Q, H> },
  //     ) => any
  //   },
  // >(
  //   defs: T,
  // ): {
  //   [K in keyof T]: ReturnType<T[K]> extends StrStrType<
  //     any,
  //     any
  //   >
  //     ? StrStrType<
  //         [...P, ...Split<K & string, "/">],
  //         | Keys
  //         | ExtractKeysFromParts<
  //             ToMutable<Split<K & string, "/">>
  //           >,
  //         Q,
  //         H
  //       > & {
  //         parent: StrStrType<P, Keys, Q, H>
  //       }
  //     : ReturnType<T[K]>
  // }
  // Update the children method type
  children<
    T extends {
      [K in keyof T]: (
        k: StrStrType<
          [...P, ...Split<K & string, "/">],
          | Keys
          | ExtractKeysFromParts<
              ToMutable<Split<K & string, "/">>
            >,
          Q,
          H
        > & { parent: StrStrType<P, Keys, Q, H> },
      ) => any
    },
  >(defs: T): FlattenPaths<P, T, Q, H, Keys>

  // Define query types using Serial markers
  declareQuery<QTypes extends Record<string, any>>(
    queryTypes: { [K in keyof QTypes]: Serial<QTypes[K]> },
  ): StrStrType<P, Keys, QTypes, H>

  // Define hash types using Serial markers
  declareHash<HTypes extends Record<string, any>>(
    hashTypes: { [K in keyof HTypes]: Serial<HTypes[K]> },
  ): StrStrType<P, Keys, Q, HTypes>

  $: HtmlEventIndex$WithParams<Keys, `#${Join<P, "-">}`>

  to: {
    // Basic URL formats
    absUrl(): `/${Join<P, "/">}`
    url(): Join<P, "/">
    dot(): Join<P, ".">
    debug(): Join<P, ":">
    css(): Join<P, "-">
    id(): `#${Join<P, "-">}`
    className(): `.${Join<P, "-">}`
    lodash(): `[${Join<P, "][">}]`

    // Enhanced URL formats with query and hash
    fullUrl(): string
    absFullUrl(): string
    queryString(): string
    hashString(): string

    // Updated location method that includes query and hash
    // location(): `/${Join<P, "/">}${IsEmpty<Q> extends true
    //   ? ""
    //   : "?"}`
    // Location method with phantom types
    location(): LocationString<P, Q, H>

    //  extends readonly string[]
    //   ? P extends readonly [infer First, ...infer Rest]
    //     ? First extends string
    //       ? Rest extends readonly string[]
    //         ? `/${First}${Rest extends readonly [] ? "" : `/${Join<Rest, "/">}`}${keyof Q extends never
    //             ? ""
    //             : "?"}${{
    //             [K in keyof Q]: `${string & K}=${string}`
    //           }[keyof Q & string] extends infer QStr
    //             ? QStr extends string
    //               ? QStr extends ""
    //                 ? ""
    //                 : `${QStr}`
    //               : ""
    //             : ""}${keyof H extends never ? "" : "#"}${{
    //             [K in keyof H]: `${string & K}=${string}`
    //           }[keyof H & string] extends infer HStr
    //             ? HStr extends string
    //               ? HStr extends ""
    //                 ? ""
    //                 : `${HStr}`
    //               : ""
    //             : ""}`
    //         : "/"
    //       : // : `/${String(First)}`
    //         "/"
    //     : "/"
    //   : "/"
  }
}

type IsEmpty<T> = T extends Record<string, never>
  ? true
  : false

// Usage
type Test1 = IsEmpty<{}> // true
type Test2 = IsEmpty<{ key: string }> // false

type Serialized<T> = string & {
  __type__: T
}

type wtf1 = `key=${Serialized<{ lolwat: 123 }>}`

// Helper type to convert an object to a query string template literal
export type ObjectToQueryString<
  T extends Record<string, any>,
> = keyof T extends never
  ? ""
  : `?${ObjectToQueryParams<T>}`

// Helper type to convert an object to query parameters
export type ObjectToQueryParams<
  T extends Record<string, any>,
> = {
  [K in keyof T]: `${string & K}=${Serialized<T[K]>}`
}[keyof T] extends infer Param
  ? Param extends string
    ? JoinWithAmpersand<Param>
    : never
  : never

// Helper type to join strings with ampersands
export type JoinWithAmpersand<T extends string> =
  T extends `${infer First}`
    ? T extends `${First}${infer Rest}`
      ? Rest extends ""
        ? First
        : `${First}&${Rest}`
      : T
    : T

// Helper type for hash string
export type ObjectToHashString<
  T extends Record<string, any>,
> = keyof T extends never
  ? ""
  : `#${ObjectToQueryParams<T>}`

// Helper type for location string with strongly typed query and hash
export type LocationString<
  P extends readonly string[],
  Q extends Record<string, any>,
  H extends Record<string, any>,
> = `/${Join<P, "/">}${ObjectToQueryString<Q>}${ObjectToHashString<H>}`
// Helper type to flatten nested path definitions
type FlattenPaths<
  P extends PathParts,
  T extends Record<string, any>,
  Q extends Record<string, any>,
  H extends Record<string, any>,
  Keys extends string,
> = {
  [K in keyof T]: ReturnType<T[K]> extends StrStrType<
    any,
    any
  >
    ? ReturnType<T[K]>
    : StrStrType<
        [...P, ...Split<K & string, "/">],
        | Keys
        | ExtractKeysFromParts<
            ToMutable<Split<K & string, "/">>
          >,
        Q,
        H
      > & { parent: StrStrType<P, Keys, Q, H> }
} & {
  [K in keyof T as FlattenNestedKeys<
    K & string,
    T[K]
  >]: FlattenNestedTypes<P, K & string, T[K], Q, H, Keys>
}

// Helper type to extract nested keys
type FlattenNestedKeys<K extends string, V> = V extends (
  k: any,
) => infer R
  ? R extends { children: (...args: any[]) => infer C }
    ?
        | `${K}/${keyof C & string}`
        | FlattenNestedKeys<
            `${K}/${keyof C & string}`,
            C[keyof C]
          >
    : never
  : never

// Helper type to extract nested types
type FlattenNestedTypes<
  P extends PathParts,
  K extends string,
  V,
  Q extends Record<string, any>,
  H extends Record<string, any>,
  Keys extends string,
> = V extends (k: any) => infer R
  ? R extends { children: (...args: any[]) => infer C }
    ? {
        [NK in keyof C]: StrStrType<
          [
            ...P,
            ...Split<K, "/">,
            ...Split<NK & string, "/">,
          ],
          | Keys
          | ExtractKeysFromParts<ToMutable<Split<K, "/">>>
          | ExtractKeysFromParts<
              ToMutable<Split<NK & string, "/">>
            >,
          Q,
          H
        > & { parent: StrStrType<P, Keys, Q, H> }
      }[keyof C]
    : never
  : never
// Update the children method type
