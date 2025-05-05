import SwaggerParser from "@apidevtools/swagger-parser"
import fs from "node:fs/promises"
import { OpenAPI } from "openapi-types"
import path from "node:path"

const getOperations = (api: OpenAPI.Document) => {
  const ops: { method: string; path: string; op: any }[] =
    []
  for (const [path, item] of Object.entries(
    api.paths || {},
  )) {
    for (const method of [
      "get",
      "post",
      "put",
      "delete",
      "patch",
    ]) {
      const op = (item as any)[method]
      if (op) {
        ops.push({ method: method.toUpperCase(), path, op })
      }
    }
  }
  return ops
}

const mapType = (schema: any): string => {
  if (schema?.$ref) {
    const refType = schema.$ref.split("/").pop()
    return refType || "any"
  }
  if (schema?.enum?.length) {
    return schema.enum
      .map((v: string) => `'${v}'`)
      .join(" | ")
  }
  if (schema?.type === "array") {
    const itemType = mapType(
      schema.items || { type: "any" },
    )
    return `${itemType}[]`
  }
  switch (schema?.type) {
    case "integer":
      return "number"
    case "boolean":
      return "boolean"
    case "string":
    default:
      return "string"
  }
}

const extractResponseSchema = (responses: any): any => {
  const preferred = ["200", "201", "202"]
  for (const code of preferred) {
    const schema =
      responses?.[code]?.content?.["application/json"]
        ?.schema
    if (schema) return schema
  }
  for (const [_, r] of Object.entries(responses || {})) {
    const schema = (r as any)?.content?.["application/json"]
      ?.schema
    if (schema) return schema
  }
  return {} // empty schema fallback
}

const generate = async (specPath: string) => {
  const api = (await SwaggerParser.bundle(
    specPath,
  )) as OpenAPI.Document
  const operations = getOperations(api)

  const types: string[] = []
  const entries: string[] = []
  const referencedTypes = new Set<string>()

  for (const { method, path, op } of operations) {
    const key = `${method} ${path}`
    const id = key.replace(/[^a-zA-Z0-9]/g, "_")
    const input = `${id}Input`
    const output = `${id}Output`

    const params = op.parameters || []
    const seenFields = new Set<string>()
    const inputFields: string[] = []
    const pathKeys: string[] = []
    const headerKeys: string[] = []
    const queryKeys: string[] = []
    const cookieKeys: string[] = []

    for (const param of params) {
      if (seenFields.has(param.name)) continue
      seenFields.add(param.name)

      const schema = param.schema || {}
      const tsType = mapType(schema)
      if (schema?.$ref) referencedTypes.add(tsType)

      if (param.in === "path") {
        inputFields.push(`  ${param.name}: ${tsType};`)
        pathKeys.push(`"${param.name}"`)
      } else if (param.in === "header") {
        inputFields.push(`  '${param.name}'?: ${tsType};`)
        headerKeys.push(`"${param.name}"`)
      } else if (param.in === "query") {
        inputFields.push(`  ${param.name}?: ${tsType};`)
        queryKeys.push(`"${param.name}"`)
      } else if (param.in === "cookie") {
        inputFields.push(`  ${param.name}?: ${tsType};`)
        cookieKeys.push(`"${param.name}"`)
      }
    }

    let bodyType: string | null = null
    const requestSchema =
      op.requestBody?.content?.["application/json"]?.schema
    if (requestSchema?.$ref) {
      bodyType = mapType(requestSchema)
      referencedTypes.add(bodyType)
    }

    let useSingleBodyType =
      !!bodyType && inputFields.length === 0

    if (!useSingleBodyType) {
      if (bodyType && !seenFields.has("body")) {
        inputFields.push(`  body: ${bodyType};`)
        seenFields.add("body")
      } else if (
        requestSchema?.type === "object" &&
        requestSchema.properties
      ) {
        for (const [k, v] of Object.entries(
          requestSchema.properties,
        )) {
          if (seenFields.has(k)) continue
          seenFields.add(k)
          const prop = v as any
          const optional = requestSchema.required?.includes(
            k,
          )
            ? ""
            : "?"
          const tsType = mapType(prop)
          if (prop?.$ref) referencedTypes.add(tsType)
          inputFields.push(`  ${k}${optional}: ${tsType};`)
        }
      } else if (op.requestBody) {
        if (!seenFields.has("body")) {
          inputFields.push("  body: any;")
          seenFields.add("body")
        }
      }
    }

    if (!useSingleBodyType) {
      types.push(`export interface ${input} {
${inputFields.join("\n")}
}`)
    } else {
      types.push(`export type ${input} = ${bodyType}`)
    }

    let outputType = "{}"
    const responseSchema = extractResponseSchema(
      op.responses,
    )
    if (responseSchema?.$ref) {
      const tsType = mapType(responseSchema)
      referencedTypes.add(tsType)
      outputType = `extends ${tsType} {}`
    } else if (
      responseSchema?.type === "object" &&
      responseSchema.properties
    ) {
      const fields = Object.entries(
        responseSchema.properties,
      ).map(([k, v]: [string, any]) => {
        const optional = responseSchema.required?.includes(
          k,
        )
          ? ""
          : "?"
        return `  ${k}${optional}: ${mapType(v)};`
      })
      outputType = `{
${fields.join("\n")}
}`
    }

    types.push(`export interface ${output} ${outputType}`)

    const content = op.responses?.["200"]?.content || {}
    const isJson = "application/json" in content
    const isBlob =
      "application/octet-stream" in content ||
      "application/pdf" in content
    const outputWrapper = isJson
      ? "JsonResponse"
      : isBlob
        ? "BlobResponse"
        : "ResponseBase"

    const keys = [
      headerKeys.length &&
        `headerKeys: [${headerKeys.join(", ")}],`,
      pathKeys.length &&
        `pathKeys: [${pathKeys.join(", ")}],`,
      queryKeys.length &&
        `queryKeys: [${queryKeys.join(", ")}],`,
      cookieKeys.length &&
        `cookieKeys: [${cookieKeys.join(", ")}],`,
    ]
      .filter(Boolean)
      .join(" ")

    entries.push(
      `  "${key}": new Endpoint<"${key}", ${input}, ${outputWrapper}<${output}>>("${key}", { url: "${path}", method: "${method}"${keys ? ", " + keys : ""} }),`,
    )
  }

  const importTypes = Array.from(referencedTypes)
  const result = `// auto-generated\nimport { Endpoint } from './Endpoint';\n${importTypes.length ? `import { ${importTypes.join(", ")} } from './components2';` : ""}\n\nexport interface ResponseBase<T> {}; \nexport interface JsonResponse<T> {\n  json(): Promise<T>;\n}\n\nexport interface BlobResponse<T> {\n  blob(): Promise<T>;\n}\n\n${types.join("\n\n")}\n\nexport const sdk = {\n${entries.join("\n")}\n} as const;\n`

  if (api.components?.schemas) {
    const componentTypes = Object.entries(
      api.components.schemas,
    ).map(([name, schema]: [string, any]) => {
      if (schema.type === "object" && schema.properties) {
        const fields = Object.entries(
          schema.properties,
        ).map(([k, v]: [string, any]) => {
          const optional = schema.required?.includes(k)
            ? ""
            : "?"
          return `  ${k}${optional}: ${mapType(v)};`
        })
        return `export interface ${name} {
${fields.join("\n")}
}`
      } else {
        return `export type ${name} = ${mapType(schema)};`
      }
    })
    await fs.writeFile(
      "src/blog/openapi-codegen/components2.ts",
      componentTypes.join("\n\n"),
    )
  }

  await fs.writeFile(
    "src/blog/openapi-codegen/sdk3.ts",
    result,
  )
}

// Usage:
// generate('openapi.yaml');

await generate("src/blog/openapi-codegen/petstore.json")
