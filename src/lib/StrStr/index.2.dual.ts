import { map, share } from "rxjs"
import { fromEventDelegate } from "~/lib/lib.dom.ts"
import { HtmlEventIndex$ } from "~/lib/rxjs-vhtml/v2/types.dom.events.dom.ts"

import {
  ExtractKeysFromParts,
  PathParts,
  Serial,
  Split,
  ToMutable,
} from "./2/0_helper_types.ts"

import { StrStrType } from "./2/1_strstr_type.ts"
const __strstr_cache = new Map<string, any>()

// Implementation
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

export function StrStr<const P extends PathParts>(
  path: P,
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

    // Types field for type inference
    Types: {} as any, // This is just for TypeScript, no runtime value needed

    // Combined with function
    // with(params: any) {
    //   // Extract path params (everything except query and hash)
    //   const pathParams: Record<string, string | number> = {}
    //   const queryParams = params.query || {}
    //   const hashParams = params.hash || {}

    //   for (const key in params) {
    //     if (key !== "query" && key !== "hash") {
    //       pathParams[key] = params[key]
    //     }
    //   }

    //   // Fill path parts with provided params
    //   const filled = segments.map(s => {
    //     if (s.startsWith(":")) {
    //       const paramName = s.substring(1)
    //       return pathParams[paramName] !== undefined
    //         ? String(pathParams[paramName])
    //         : s
    //     }
    //     return s
    //   })

    //   const result = StrStr(filled)

    //   // Store query and hash params for later use
    //   result._queryParams = queryParams
    //   result._hashParams = hashParams

    //   return result
    // },

    // Update the with function implementation
    with(params: any) {
      // Create empty objects for path, query and hash params
      const pathParams: Record<string, string | number> = {}
      const queryParams: Record<string, any> = {}
      const hashParams: Record<string, any> = {}

      // Determine which parameters go where based on the defined types
      for (const key in params) {
        // Check if this is a path parameter (exists in segments with : prefix)
        const isPathParam = segments.some(
          s => s === `:${key}`,
        )

        // Check if this is a query parameter (exists in _queryTypes)
        const isQueryParam =
          this._queryTypes && key in this._queryTypes

        // Check if this is a hash parameter (exists in _hashTypes)
        const isHashParam =
          this._hashTypes && key in this._hashTypes

        if (isPathParam) {
          pathParams[key] = params[key]
        } else if (isQueryParam) {
          queryParams[key] = params[key]
        } else if (isHashParam) {
          hashParams[key] = params[key]
        } else {
          // Default to query params if not specified elsewhere
          queryParams[key] = params[key]
        }
      }

      // Fill path parts with provided params
      const filled = segments.map(s => {
        if (s.startsWith(":")) {
          const paramName = s.substring(1)
          return pathParams[paramName] !== undefined
            ? String(pathParams[paramName])
            : s
        }
        return s
      })

      const result = StrStr(filled)

      // Store query and hash params for later use
      result._queryParams = queryParams
      result._hashParams = hashParams

      return result
    },

    x(next: any, delim = "/") {
      const split = next.split(delim)
      return StrStr([...segments, ...split])
    },

    children(defs: any) {
      const obj: any = {}
      const underscore: any = {}

      for (const key in defs) {
        const subInstance = StrStr([...segments, key])
        subInstance.parent = instance
        const val = defs[key](subInstance)
        obj[key] = () => val
        obj[key]._ = val
        obj[key].__ = subInstance
        underscore[key] = val
      }

      obj._ = underscore
      return obj
    },

    declareQuery(queryTypes: any) {
      const result = Object.create(instance)
      result._queryTypes = queryTypes
      return result
    },

    declareHash(hashTypes: any) {
      const result = Object.create(instance)
      result._hashTypes = hashTypes
      return result
    },

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

      // URL methods with query and hash
      fullUrl: function () {
        let url = segments.join("/")
        const queryString = instance.to.queryString()
        const hashString = instance.to.hashString()

        if (queryString) url += queryString
        if (hashString) url += hashString

        return url
      },
      absFullUrl: function () {
        return "/" + instance.to.fullUrl()
      },
      queryString: function () {
        if (
          !instance._queryParams ||
          Object.keys(instance._queryParams).length === 0
        ) {
          return ""
        }

        const parts: string[] = []
        for (const key in instance._queryParams) {
          const value = instance._queryParams[key]
          if (value === undefined || value === null)
            continue

          const serialized =
            typeof value === "object"
              ? encodeURIComponent(JSON.stringify(value))
              : encodeURIComponent(String(value))

          parts.push(
            `${encodeURIComponent(key)}=${serialized}`,
          )
        }

        return parts.length ? `?${parts.join("&")}` : ""
      },
      hashString: function () {
        if (
          !instance._hashParams ||
          Object.keys(instance._hashParams).length === 0
        ) {
          return ""
        }

        const parts: string[] = []
        for (const key in instance._hashParams) {
          const value = instance._hashParams[key]
          if (value === undefined || value === null)
            continue

          const serialized =
            typeof value === "object"
              ? encodeURIComponent(JSON.stringify(value))
              : encodeURIComponent(String(value))

          parts.push(
            `${encodeURIComponent(key)}=${serialized}`,
          )
        }

        return parts.length ? `#${parts.join("&")}` : ""
      },
    },

    $: getDelegatedStreamWithParams(segments),
  }

  __strstr_cache.set(key, instance)
  return instance
}

// Rest of the implementation (getDelegatedStreamWithParams, etc.)
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

const C = StrStr(["users", ":id", "card"]) // inferred keys: "id"
const D = StrStr(["users", ":id"]) // still just treated as array

type GridState = {
  filterModel: {
    items: {
      field: string
      operation: string
      value: any
    }[]
  }
  sort: { field: string; order: string }[]
}

const A = StrStr("users/:id/card").declareQuery({
  grid: Serial<GridState>(),
})

A.to.location()

const aa = A.with({
  id: "derp",
  grid: {
    filterModel: {
      items: [],
    },
    sort: [],
  } as GridState,
})
aa.to.location()

C.with({
  id: "xerp2",
}).to.location()

A.$.click.pipe()

const x = StrStr(["users", ":id", "action-btn"])

x.$.click.subscribe(e => {
  e.params.id // 🔒 typed as string
  e.delegateElement // HTMLElement
})

const xx = StrStr(["users", ":id", "card"]).with({
  id: "123",
})

const root = StrStr("admin/sites/:site_id").declareQuery({
  grid: Serial<Partial<GridState>>(),
})

root.with({
  grid: {},
  site_id: 123,
})

const _ = <T>(i: T) => i
const PATHS = root.children({
  edit: i => i,
  logs: i => i,
  posts: i => i,
  "posts/:post_id": i => i,
  "posts/:post_id/edit": i => i,
  "posts/:post_id/create": i => i,
  "posts/:post_id/delete": i => i,
  "posts/:post_id/comments": i => i,
  "posts/:post_id/comments/edit": i => i,
  "posts/:post_id/comments/:comment_id": i => i,
  "posts/:post_id/comments/:comment_id/edit": i => i,
})

PATHS["posts/:post_id/comments/:comment_id"].Types["with"]

PATHS["posts/:post_id/comments"]
  .with({
    post_id: "123",
    site_id: 123,
    grid: {},
  })
  .x("submit-btn")
  .to.location()
