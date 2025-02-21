import {
  debounceTime,
  filter,
  from,
  map,
  merge,
  mergeMap,
  of,
  reduce,
  share,
  startWith,
  switchMap,
} from "rxjs";
import { expandGlob } from "@std/fs";
import { deferFrom, TAG } from "./lib.dual.mts";
//

export const makeWatcher$ = (
  folders: string[],
  endsWith = "",
  includeDirs = false,
) =>
  deferFrom(() =>
    expandGlob(`{${folders.join(",")}}/**/*${endsWith}`, {
      includeDirs,
    }),
  ).pipe(
    reduce(
      (acc, path) => ((acc[path.path] = path.path), acc),
      {} as Record<string, string>,
    ),
    map(p => ({ paths: Object.values(p) })),
    switchMap(next =>
      merge(
        deferFrom(() => Deno.watchFs(next.paths)),
        ...folders.map(f =>
          deferFrom(() =>
            Deno.watchFs(f, {
              recursive: true,
            }),
          ),
        ),
      ).pipe(
        filter(
          e => e.kind === "create" || e.kind === "modify",
        ),
        debounceTime(100),
        startWith(next),
      ),
    ),
    mergeMap((i, index) =>
      from(i.paths).pipe(
        filter(i => i.endsWith(endsWith)),
        map(p => ({ path: p, time: +new Date(), index })),
      ),
    ),
    share(),
  );
