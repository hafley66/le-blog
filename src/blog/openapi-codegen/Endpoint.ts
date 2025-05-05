type SplitKey<K extends string> =
  K extends `${infer M} ${infer U}` ? [M, U] : never

export interface EndpointConfig {
  url: string
  method: string
  pathKeys?: string[]
  queryKeys?: string[]
  headerKeys?: string[]
  cookieKeys?: string[]
}

export class Endpoint<
  K extends string,
  I = unknown,
  O = unknown,
> {
  // Phantom type accessors for extracting Input/Output types
  readonly Input!: I
  readonly Output!: O

  readonly key: K
  readonly method: `${SplitKey<K>[0]}`
  readonly url: `${SplitKey<K>[1]}`
  readonly config: EndpointConfig

  constructor(key: K, config: EndpointConfig) {
    this.key = key
    this.method = key.split(" ")[0] as SplitKey<K>[0]
    this.url = config.url
    this.config = config
  }

  replacePathParams(
    urlParams: Record<string, string | number>,
  ): string {
    let out = this.url
    for (const [k, v] of Object.entries(urlParams)) {
      out = out.replace(
        `{${k}}`,
        encodeURIComponent(String(v)),
      )
    }
    return out
  }

  serializeQuery(params: Record<string, any>): string {
    const sp = new URLSearchParams()
    for (const [k, v] of Object.entries(params)) {
      if (v == null) continue
      if (Array.isArray(v)) {
        for (const i of v) sp.append(k, String(i))
      } else {
        sp.append(k, String(v))
      }
    }
    return sp.toString()
  }
}

// Helpers
export type InputOf<T> = T extends Endpoint<
  any,
  infer I,
  any
>
  ? I
  : never
export type OutputOf<T> = T extends Endpoint<
  any,
  any,
  infer O
>
  ? O
  : never
