import {
  debounceTime,
  defer,
  filter,
  from,
  map,
  merge,
  mergeMap,
  Observable,
  ObservableInput,
  reduce,
  share,
  startWith,
  switchMap,
} from "rxjs"
import { expandGlob } from "@std/fs"

// Convenience, very useful to convert lazy observable of 1 value on init of many places.
export function deferFrom<T>(
  factory: () => ObservableInput<T>,
): Observable<T> {
  return defer(() => from(factory()))
}

export const makeWatcher$ = (
  folders: string[],
  endsWith = "",
  includeDirs = false,
) =>
  deferFrom(() =>
    // Get all files based on root list, and file type
    expandGlob(
      `${folders.length > 1 ? "{" : ""}${folders.join(",")}${folders.length > 1 ? "}" : ""}/**/*${endsWith}*`,
      {
        includeDirs,
      },
    ),
  ).pipe(
    // map path to path on complete
    reduce(
      (acc, path) => ((acc[path.path] = path.path), acc),
      {} as Record<string, string>,
    ),
    // Convert to object to make this initial read match watcher api.
    map(p => ({ paths: Object.values(p) })),
    // By this point, we are done with initial read
    switchMap(next =>
      // Now, we use merge for each folder, and then we watch every file we initially found.
      // Deno.watchFs does not work with same glob pattern, so we have to do some trickery.
      merge(
        // now we combo into watch fs, we must do this for 2-forms, list of files, and an $ for every folder.
        // This is necessary for the watchFs api, can't mix them.
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
        // Start with the initial read concat'ed
        // This creates a type union of our duck type with actual fs.events type in deno,
        // but its fine bc we are ducked to .paths
        startWith(next),
      ),
    ),
    // Map remove the things we dont want (tail matching)
    mergeMap((i, index) =>
      // We flatten/convert normal object {paths: []} into multiple Observable<{path: string}>
      from(i.paths).pipe(
        filter(i => i.endsWith(endsWith)),
        map(p => ({ path: p, time: +new Date(), index })),
      ),
    ),
    // Share the watcher instances
    share(),
  )
