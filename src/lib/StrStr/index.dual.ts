import { HtmlEventIndex$ } from "~/lib/rxjs-vhtml/v2/types.dom.events.dom.ts"
import { map, Observable, share } from "rxjs"
import { fromEventDelegate } from "~/lib/lib.dom.ts"

type PathParts = readonly string[]

type Join<
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
      ? `${F}${D}${Join<R, D>}`
      : string

type ExtractTemplateKeys<S extends string> =
  S extends `${string}{${infer Param}}${infer Rest}`
    ? Param | ExtractTemplateKeys<Rest>
    : never

type ExtractKeysFromParts<P extends string[]> = P extends [
  infer Head extends string,
  ...infer Rest extends string[],
]
  ? ExtractTemplateKeys<Head> | ExtractKeysFromParts<Rest>
  : never

type ToMutable<T> = T extends readonly [...infer R]
  ? [...R]
  : T

type PathLike<P extends PathParts> = {
  path: P
  head: P extends [...string[], infer Head] ? Head : ""
  join<D extends string>(delimiter: D): Join<P, D>
}

export type StrStrType<
  P extends PathParts,
  Keys extends string = ExtractKeysFromParts<ToMutable<P>>,
> = PathLike<P> & {
  x<const S extends string, const D extends string = "/">(
    next: S,
    delim?: D,
  ): StrStrType<
    [...P, ...Split<S, D>],
    Keys | ExtractTemplateKeys<S>
  >

  with<
    const T extends Record<Keys, string | number>,
    NewPath extends FillPathParts<P, T> = FillPathParts<
      P,
      T
    >,
    NewKeys extends string = Exclude<Keys, keyof T>,
  >(params: T): StrStrType<NewPath, NewKeys>

  declare<
    T extends {
      [K in keyof T]: (
        k: StrStrType<[...P, K & string]>,
      ) => any
    },
  >(
    defs: T,
  ): {
    [K in keyof T]: {
      (): ReturnType<T[K]>
      _: ReturnType<T[K]>
      __: StrStrType<[...P, K & string]>
    }
  } & { _: { [K in keyof T]: ReturnType<T[K]> } }

  next<T>(value: T): StrStrWithValue<P, Keys, T>

  $: HtmlEventIndex$WithParams<Keys>

  to: {
    absUrl(): `/${Join<P, "/">}`
    url(): Join<P, "/">
    dot(): Join<P, ".">
    debug(): Join<P, ":">
    css(): Join<P, "-">
    id(): `#${Join<P, "-">}`
    className(): `.${Join<P, "-">}`
    lodash(): `[${Join<P, "][">}]`
  }
}

export type StrStrWithValue<
  P extends PathParts,
  Keys extends string,
  T,
> = StrStrType<P, Keys> &
  (() => T) & {
    _: T
    __: StrStrType<P, Keys>
  }

type Split<
  S extends string,
  D extends string,
> = D extends ""
  ? [S]
  : S extends `${infer Head}${D}${infer Rest}`
    ? [Head, ...Split<Rest, D>]
    : [S]

const __strstr_cache = new Map<string, any>()

// StrStr(string, delim?) → auto split
export function StrStr<
  const S extends string,
  const D extends string = "/",
>(
  path: S,
  delim?: D,
): StrStrType<
  ToMutable<Split<S, D>>,
  ExtractKeysFromParts<ToMutable<Split<S, D>>>
>

// StrStr(array, delim?) → no split, just pass-through
export function StrStr<
  const P extends PathParts,
  const D extends string = "/",
>(
  path: P,
  delim?: D,
): StrStrType<
  ToMutable<P>,
  ExtractKeysFromParts<ToMutable<P>>
>

export function StrStr(
  path: string | string[],
  delim = "/",
): any {
  const segments = Array.isArray(path)
    ? path
    : path.split(delim)
  const key = segments.join("/")
  if (__strstr_cache.has(key))
    return __strstr_cache.get(key)

  const _memo: Record<string, string> = {}

  const instance: any = {
    path: segments,
    head: segments.at(-1) ?? "",
    join: (d: string) =>
      (_memo[`join:${d}`] ??= segments.join(d)),
    to: {
      absUrl: () =>
        (_memo.absUrl ??= "/" + segments.join("/")),
      url: () => (_memo.url ??= segments.join("/")),
      dot: () => (_memo.dot ??= segments.join(".")),
      debug: () => (_memo.debug ??= segments.join(":")),
      css: () => (_memo.css ??= segments.join("-")),
      id: () => (_memo.css_id ??= `#${segments.join("-")}`),
      className: () =>
        (_memo.css_class ??= `.${segments.join("-")}`),
      lodash: () =>
        (_memo.lodash ??= `[${segments.join("][")}]`),
    },
    with<T extends Record<Keys, string | number>>(
      params: T,
    ) {
      const filled = segments.map(s =>
        s.replace(
          /{(\w+)}/g,
          (_, k) => params[k] ?? `{${k}}`,
        ),
      ) as unknown as FillPathParts<Path, T>

      return StrStr(filled as FillPathParts<Path, T>)
    },
    x(next: any, delim = "/") {
      const split = next.split(delim)
      return StrStr([...segments, ...split])
    },
    declare(defs: any) {
      const obj: any = {}
      const underscore: any = {}

      for (const key in defs) {
        const subInstance = StrStr([...segments, key])
        const val = defs[key](subInstance)
        obj[key] = () => val
        obj[key]._ = val
        obj[key].__ = subInstance
        underscore[key] = val
      }

      obj._ = underscore
      return obj
    },
    next(value: any) {
      const callable = (() => value) as typeof instance &
        (() => any)
      Object.assign(callable, instance)
      callable._ = value
      callable.__ = instance
      return callable
    },
    $: getDelegatedStreamWithParams(segments),
  }

  instance.next = (value => {
    const fn = (() => value) as StrStrWithValue<
      typeof segments,
      any,
      typeof value
    >
    Object.assign(fn, instance)
    fn._ = value
    fn.__ = instance
    return fn
  }) satisfies <T>(
    value: T,
  ) => StrStrWithValue<typeof segments, any, T>

  __strstr_cache.set(key, instance)
  return instance
}
const eventStreamCache: Record<
  string,
  Partial<HtmlEventIndex$>
> = {}

function parsePathValues(
  template: string[],
  actual: string[],
): Record<string, string> {
  const out: Record<string, string> = {}
  for (let i = 0; i < template.length; i++) {
    const part = template[i]
    if (part.startsWith("{") && part.endsWith("}")) {
      out[part.slice(1, -1)] = actual[i]
    }
  }
  return out
}

function getDelegatedStreamWithParams(
  templateSegments: string[],
): HtmlEventIndex$ {
  const idSelector = `[id^="${templateSegments[0]}"]`
  const key = templateSegments.join("/")

  if (eventStreamCache[key])
    return eventStreamCache[key] as HtmlEventIndex$
  // First, create a plain object for the cache entry
  const cacheEntry: Partial<HtmlEventIndex$> = {}

  const proxy = new Proxy(cacheEntry, {
    get(_, event: string) {
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      return (cacheEntry[event] ??= fromEventDelegate(
        idSelector,
        event,
      ).pipe(
        map((e: Event) => {
          const el = e.target as HTMLElement
          const idSegments = el.id?.split("-") ?? []
          const params = parsePathValues(
            templateSegments,
            idSegments,
          )
          return Object.assign(e, {
            delegateElement: el,
            params,
          })
        }),
        share(),
      ))
    },
  })

  // Assign it once to break the loop
  eventStreamCache[key] = cacheEntry

  return proxy as HtmlEventIndex$
}

const A = StrStr("users/{id}/card") // inferred keys: "id"
const B = StrStr("users:{id}:card", ":") // inferred keys: "id"
const C = StrStr(["users", "{id}", "card"]) // inferred keys: "id"
const D = StrStr(["users", "{id}"], "-") // still just treated as array

A.with({
  id: "derp",
}).to.id()
A.next(123)
C.with({
  id: "xerp2",
})
const base = StrStr("users/{id}/card")
const bound = base.next("hi")

bound.join("/")

bound() // "hi"
bound._ // "hi"
bound.__.to.url() // "users/{id}/card"
type AA = StrStrWithValue<[], "", number>

A.$.click.pipe()

type EventWithParams<E, Keys extends string> = E & {
  delegateElement: HTMLElement
  params: Record<Keys, string>
}

type DelegatedObservableWithParams<
  E,
  Keys extends string,
> = Observable<EventWithParams<E, Keys>>

type HtmlEventIndex$WithParams<Keys extends string> = {
  [K in keyof HtmlEventIndex$]: DelegatedObservableWithParams<
    HtmlEventIndex$[K] extends Observable<infer E>
      ? E
      : never,
    Keys
  >
}

const x = StrStr(["users", "{id}", "btn"])

x.$.click.subscribe(e => {
  e.params.id // 🔒 typed as string
  e.delegateElement // HTMLElement
})

type FillPathParts<
  P extends readonly string[],
  T extends Record<string, string | number>,
> = {
  [K in keyof P]: P[K] extends string
    ? P[K] extends `{${infer Param}}`
      ? Param extends keyof T
        ? `${T[Param]}`
        : P[K]
      : P[K]
    : never
}

const xx = StrStr(["users", "{id}", "card"]).with({
  id: "123",
})

type Path = (typeof x)["path"]
// → ["users", "123", "card"]

type Keys = typeof x extends StrStrType<any, infer K>
  ? K
  : never
// → never ✅
