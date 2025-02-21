import {
  debounceTime,
  filter,
  from,
  map,
  merge,
  mergeMap,
  reduce,
  share,
} from "rxjs";
import { expandGlob } from "@std/fs";
import { deferFrom } from "./lib.dual.mts";

export const makeWatcher$ = (
  searchRoot: string,
  filter_: string,
  includeDirs = false,
) =>
  merge(
    deferFrom(() => Deno.watchFs(searchRoot)).pipe(
      filter(e => e.kind === "create" || e.kind === "modify"),
      debounceTime(100),
      // TAG("watcher$"),
    ),
    deferFrom(() => expandGlob(`${searchRoot}/**/*`, { includeDirs }))
      .pipe(
        reduce(
          (acc, path) => ((acc[path.path] = path.path), acc),
          {} as Record<string, string>,
        ),
      )
      .pipe(map(p => ({ paths: Object.values(p) }))),
  ).pipe(
    mergeMap((i, index) =>
      from(i.paths).pipe(
        filter(p => p.includes(filter_)),
        map(p => ({ path: p, time: +new Date(), index })),
      ),
    ),
    share(),
  );
