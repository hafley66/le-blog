import {
  catchError,
  merge,
  mergeMap,
  Observable,
  of,
  share,
  switchMap,
  tap,
  map,
  debounceTime,
  takeUntil,
  filter,
} from "rxjs"
import {
  deferFrom,
  makeWatcher$,
} from "~/lib/fs_watcher.deno.ts"
import {} from "~/lib/fix-deno-vscode-settings.deno.ts"
import path from "node:path"

const search = ["src"]

const denoRenderWatcher$ = merge(
  makeWatcher$(search, "render.deno.ts"),
  makeWatcher$(search, "render.deno.tsx"),
).pipe(share())

// const mdWatcher$ = makeWatcher$(search, ".md")
const effect$ = denoRenderWatcher$
  .pipe(
    mergeMap((e, eI) => {
      console.log(e.path)
      return deferFrom(() => import(e.path)).pipe(
        switchMap((html: any) =>
          "render$" in html
            ? (html.render$ as Observable<string>)
            : of(null),
        ),
        takeUntil(
          denoRenderWatcher$.pipe(
            filter(i => i.path === e.path),
          ),
        ),
        map(i => ["data", i] as const),
        catchError(
          err =>
            console.error(err) ||
            of(["error", err, e] as const),
        ),
      )
    }),
    debounceTime(500),
    tap(() => {
      const it = path.join(process.cwd(), "vite.config.mts")
      const fileContents = Deno.readTextFileSync(it)
      Deno.writeTextFileSync(it, fileContents)
    }),
  )
  .subscribe()
