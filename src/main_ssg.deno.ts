import {
  debounceTime,
  merge,
  share,
  switchMap,
  tap,
} from "rxjs"
import {
  deferFrom,
  makeWatcher$,
} from "~/lib/fs_watcher.deno.ts"
import path from "node:path"
import _ from "lodash"
import { SITEMAP } from "~/SITEMAP.deno.ts"
import { createServer } from "vite"
// const denoRenderWatcher$ = makeWatcher$(
//   process.cwd(),
//   "**/*/*render.deno.{ts,tsx}",
// )
//   .pipe(share());

const allRenders = SITEMAP.includes(
  "render.deno.ts" as const,
).map(i =>
  deferFrom(() =>
    i.dynamicImport().then(i => i.default),
  ).pipe(switchMap(i => i)),
)

// const mdWatcher$ = makeWatcher$(search, ".md")
const effect$ = merge(...allRenders)
  .pipe(
    debounceTime(500),
    tap(() => {
      const it = path.join(process.cwd(), "vite.config.mts")
      const fileContents = Deno.readTextFileSync(it)
      Deno.writeTextFileSync(it, fileContents)
    }),
  )
  .subscribe()

Deno.serve(
  { port: 4040, hostname: "0.0.0.0" },
  async req => {
    console.log("Method:", req.method)

    const url = new URL(req.url)
    console.log("Path:", url.pathname)
    console.log("Query parameters:", url.searchParams)

    console.log("Headers:", req.headers)

    if (req.body) {
      const body = await req.text()
      console.log("Body:", body)
    }

    return new Response("Hello, World!")
  },
)

const server = await createServer({})
await server.listen()

server.printUrls()
server.bindCLIShortcuts({ print: true })
