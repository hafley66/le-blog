import {
  catchError,
  debounceTime,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  share,
  switchMap,
  takeUntil,
  tap,
} from "rxjs";
import { deferFrom, makeWatcher$ } from "~/lib/fs_watcher.deno.ts";
import { updateDenoPathsBcUgh } from "./lib/ridiculous_file_watchers/fix-deno-vscode-settings.deno.ts";
import { MakeSITEMAP_lol } from "~/lib/ridiculous_file_watchers/SITEMAP_generator.deno.ts";
import path from "node:path";
import _ from "lodash";
import { SITEMAP } from "~/SITEMAP.deno.ts";

const denoRenderWatcher$ = makeWatcher$(
  process.cwd(),
  "**/*/*render.deno.{ts,tsx}",
)
  .pipe(share());

const allRenders = SITEMAP.includes("render.deno.ts" as const).map((
  i,
) => [i, i.dynamicImport().then((i) => i)] as const);
const x = allRenders[0][0].dynamicImport;

// const mdWatcher$ = makeWatcher$(search, ".md")
const effect$ = denoRenderWatcher$
  .pipe(
    mergeMap((e, eI) => {
      console.log(e.path);
      return deferFrom(() =>
        console.log("Importing...", e.path) ||
        import(e.path).finally(() => console.log("...Done", e.path))
      ).pipe(
        switchMap((
          html: any,
        ) => ("render$" in html
          ? (html.render$ as Observable<string>)
          : "default" in html
          ? html["default"] as Observable<any>
          : of(null))
        ),
        takeUntil(
          denoRenderWatcher$.pipe(
            filter((i) => i.path === e.path),
          ),
        ),
        map((i) => ["data", i] as const),
        catchError(
          (err) => of(["error", err, e] as const),
        ),
      );
    }),
    debounceTime(500),
    tap(() => {
      const it = path.join(process.cwd(), "vite.config.mts");
      const fileContents = Deno.readTextFileSync(it);
      Deno.writeTextFileSync(it, fileContents);
    }),
  )
  .subscribe();

MakeSITEMAP_lol({
  outputFilePath: `${process.cwd()}/src/SITEMAP.deno.ts`,
}).subscribe();

updateDenoPathsBcUgh.subscribe();
