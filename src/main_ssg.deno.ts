import {
  catchError,
  debounceTime,
  merge,
  of,
  switchMap,
  tap,
} from "rxjs"
import { deferFrom } from "~/lib/fs_watcher.deno.ts"
import path from "node:path"
import _ from "lodash"
import { SUB as SITEMAP } from "~/blog/rxjs/observable-vs-useEffect/SITEMAP.deno.ts"
import { createServer } from "vite"
import { trpcServer } from "~/apps/trpc.listen.deno.ts"

const allRenders = SITEMAP.includes(
  "render.deno.ts" as const,
).map(i =>
  deferFrom(() =>
    i
      .dynamicImport()
      .then(i => [i, i.default] as const)
      .catch(err => {
        console.log("HEY, this threw bro", i.path)
        console.error(err)
        return [i, of({})] as const
      }),
  ).pipe(
    switchMap(([path, i]) =>
      i.pipe(
        // @ts-ignore
        catchError(err => {
          console.log("HEY, this threw bro", path.path)
          console.error(err)
          return of("")
        }),
      ),
    ),
  ),
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

trpcServer.listen(4041)

const server = await createServer({})
await server.listen()

server.printUrls()
server.bindCLIShortcuts({ print: true })
