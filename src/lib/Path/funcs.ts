import { ParamType } from "./types"

export type ParamDef = {
  name: string
  type: ParamType
}

export function parseParams(path: string): ParamDef[] {
  const segments = path.split("/")
  const params: ParamDef[] = []

  for (const segment of segments) {
    if (segment.startsWith(":")) {
      const inner = segment.slice(1)
      const braceMatch = inner.match(
        /^\{(.+?) as (string|number|boolean|json|json64)\}$/,
      )
      if (braceMatch) {
        const [, name, type] = braceMatch
        params.push({ name, type: type as ParamType })
      } else {
        params.push({ name: inner, type: "string" })
      }
    }
  }

  return params
}

export function coerceValue(
  value: unknown,
  type: ParamType,
): string {
  switch (type) {
    case "number":
      if (typeof value !== "number")
        throw new Error(`Expected number`)
      return String(value)
    case "boolean":
      if (typeof value !== "boolean")
        throw new Error(`Expected boolean`)
      return value ? "true" : "false"
    case "json":
      return encodeURIComponent(JSON.stringify(value))
    case "json64":
      return btoa(JSON.stringify(value))
    case "string":
    default:
      return String(value)
  }
}

export function parseValue(
  value: string,
  type: ParamType,
): unknown {
  switch (type) {
    case "number":
      return Number(value)
    case "boolean":
      return value === "true"
    case "json":
      return JSON.parse(decodeURIComponent(value))
    case "json64":
      return JSON.parse(atob(value))
    case "string":
    default:
      return value
  }
}
