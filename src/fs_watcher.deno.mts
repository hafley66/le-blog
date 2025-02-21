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
import { deferFrom, TAG } from "./lib.dual.mts";

export const makeWatcher$ = (
  searchRoot: string,
  filter_: string | RegExp,
  ext = "",
  includeDirs = false,
) =>
  merge(
    deferFrom(() => Deno.watchFs(searchRoot)).pipe(
      filter(
        e => e.kind === "create" || e.kind === "modify",
      ),
      debounceTime(100),
      // TAG("watcher$"),
    ),
    deferFrom(() =>
      expandGlob(`${searchRoot}/**/*`, {
        includeDirs,
        exclude: [
          `${searchRoot}/node_modules`,
          `${searchRoot}/dist`,
        ],
      }),
    )
      .pipe(
        TAG("WTF"),
        reduce(
          (acc, path) => (
            (acc[path.path] = path.path), acc
          ),
          {} as Record<string, string>,
        ),
      )
      .pipe(map(p => ({ paths: Object.values(p) }))),
  ).pipe(
    mergeMap((i, index) =>
      from(i.paths).pipe(
        filter(p => !!p.match(filter_)),
        map(p => ({ path: p, time: +new Date(), index })),
      ),
    ),
    share(),
  );
