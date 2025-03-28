import {
  coerceValue,
  ParamDef,
  parseParams,
  parseValue,
} from "./funcs"
import { ExtractTypedArgs } from "./types"

class Path<
  P extends string,
  T extends Record<string, any> = ExtractTypedArgs<P>,
> {
  private pathTemplate: P
  private paramDefs: ParamDef[]

  constructor(path: P) {
    this.pathTemplate = path
    this.paramDefs = parseParams(path)
  }

  pathStr(input: T): string {
    return this.pathTemplate.replace(
      /:({.+?}|[^/]+)/g,
      match => {
        const def = parseParams(match)[0]
        if (!def) return match
        const val = input[def.name]
        if (val === undefined)
          throw new Error(`Missing param: ${def.name}`)
        return coerceValue(val, def.type)
      },
    )
  }

  parse(url: string): T {
    const templateSegments = this.pathTemplate.split("/")
    const inputSegments = url.split("/")

    if (templateSegments.length !== inputSegments.length) {
      throw new Error("Path segment count mismatch")
    }

    const result: Record<string, any> = {}

    for (let i = 0; i < templateSegments.length; i++) {
      const tpl = templateSegments[i]
      const inp = inputSegments[i]
      if (!tpl.startsWith(":")) continue

      const def = parseParams(tpl)[0]
      if (!def) continue

      result[def.name] = parseValue(inp, def.type)
    }

    return result as T
  }
}

const p = new Path(
  "/users/:{id as number}/payload/:{data as json64}" as const,
)

const pathStr = p.pathStr({ id: 42, data: { x: 1 } })
// pathStr: "/users/42/payload/eyJ4IjoxfQ=="

const parsed = p.parse(pathStr)
// parsed: { id: number; data: { x: number } }
