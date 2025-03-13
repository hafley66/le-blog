import {
  debounceTime,
  defer,
  filter,
  from,
  map,
  mergeMap,
  Observable,
  ObservableInput,
  reduce,
  share,
  startWith,
  switchMap,
} from "rxjs";
import { expandGlob } from "@std/fs";
import { globToRegExp } from "@std/path";

// Convenience, very useful to convert lazy observable of 1 value on init of many places.
export function deferFrom<T>(
  factory: () => ObservableInput<T>,
): Observable<T> {
  return defer(() => from(factory()));
}

export const makeWatcher$ = (
  absoluteRoot: string,
  glob: string,
  includeDirs = false,
) =>
  deferFrom(() =>
    // Get all files based on root list, and file type
    expandGlob(
      console.log(`${absoluteRoot}/${glob}`) || `${absoluteRoot}/${glob}`,
      {
        includeDirs,
      },
    )
  ).pipe(
    // map path to path on complete
    reduce(
      (acc, path) => ((acc[path.path] = path.path), acc),
      {} as Record<string, string>,
    ),
    // Convert to object to make this initial read match watcher api.
    map((p) => ({ paths: Object.values(p) })),
    // By this point, we are done with initial read
    switchMap((next) =>
      // Now, we use merge for each folder, and then we watch every file we initially found.
      // Deno.watchFs does not work with same glob pattern, so we have to do some trickery.
      from(Deno.watchFs(absoluteRoot, { recursive: true })).pipe(
        filter(
          (e) => e.kind === "create" || e.kind === "modify",
        ),
        debounceTime(100),
        // Start with the initial read concat'ed
        // This creates a type union of our duck type with actual fs.events type in deno,
        // but its fine bc we are ducked to .paths
        startWith(next),
      )
    ),
    // Map remove the things we dont want (tail matching)
    mergeMap((i, index) => {
      // We flatten/convert normal object {paths: []} into multiple Observable<{path: string}>
      const reg = globToRegExp(glob);
      return from(i.paths).pipe(
        filter((i) => !!i.match(reg)),
        map((p) => ({ path: p, time: +new Date(), index })),
      );
    }),
    // Share the watcher instances
    share(),
  );
