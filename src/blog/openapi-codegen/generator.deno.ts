import fs from "fs/promises"
import openapiTS from "openapi-typescript"
import { OpenAPIObject } from "openapi3-ts"

async function main() {
  const spec = JSON.parse(
    await fs.readFile("openapi.json", "utf-8"),
  ) as OpenAPIObject
  const types = await openapiTS(spec, { bannerComment: "" })
  await fs.writeFile("types.ts", types)

  // -- generate rtkApi.ts
  const rtkEntries: string[] = []
  const mkName = (m: string, r: string) =>
    (
      spec.paths[r]![m].operationId ||
      m + r.replace(/[^a-zA-Z0-9]/g, "_")
    ).replace(/[^0-9a-zA-Z_]/g, "")
  for (const [route, methods] of Object.entries(
    spec.paths,
  )) {
    for (const [method, op] of Object.entries(
      methods as any,
    )) {
      const name = mkName(method, route)
      const In = `paths['${route}']['${method}']['parameters']`
      const Out = `paths['${route}']['${method}']['responses']['200']['content']['application/json']`
      const builder =
        method === "get" ? "query" : "mutation"
      const urlExpr = route.replace(/{/g, "${")
      rtkEntries.push(
        `    ${name}: build.${builder}<${Out}, ${In}>({ query: i => ({ url: \`${urlExpr}\`, method: '${method.toUpperCase()}', body: i }) }),`,
      )
    }
  }
  const rtkApi = `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { paths } from './types'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: build => ({
${rtkEntries.join("\n")}
  }),
})
`
  await fs.writeFile("rtkApi.ts", rtkApi)

  // -- generate sdk.ts
  const entries = Object.entries(spec.paths).flatMap(
    ([route, methods]) =>
      Object.entries(methods as Record<string, any>).map(
        ([method, op]) => {
          const key = `${method.toUpperCase()} ${route}`
          const name = mkName(method, route)
          const inType = `paths['${route}']['${method}']['parameters']`
          const outType = `paths['${route}']['${method}']['responses']['200']['content']['application/json']`
          return `  '${key}': (() => {
    const e = new Endpoint<${inType},${outType}>(i => request('${method}', \`${route}\`, i))
    Object.assign(e, {
      useQuery: api.use${name.charAt(0).toUpperCase() + name.slice(1)}Query,
      useLazyQuery: api.useLazy${name.charAt(0).toUpperCase() + name.slice(1)}Query,
      useMutation: api.use${name.charAt(0).toUpperCase() + name.slice(1)}Mutation,
    })
    return e
  })(),`
        },
      ),
  )

  const sdk = `import type { paths } from './types'
import { api } from './rtkApi'

export class Endpoint<I, O> {
  constructor(public query: (input: I) => Promise<O>) {}
  useQuery!: <T extends I>(input: T, opts?: any) => ReturnType<typeof api.useGetDummyQuery>
  useLazyQuery!: ReturnType<typeof api.useLazyGetDummyQuery>
  useMutation!: ReturnType<typeof api.useGetDummyMutation>
}

// you can swap this out for fetch/axios/etc
declare function request<M, P>(method: M, path: P, input: any): Promise<any>

export const sdk = {
${entries.join("\n")}
}
`

  await fs.writeFile("sdk.AUTOGEN.ts", sdk)
}
