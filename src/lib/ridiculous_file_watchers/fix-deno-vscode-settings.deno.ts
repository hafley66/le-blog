import { parse } from "@std/jsonc";
import {
  concatMap,
  defer,
  merge,
  of,
  scan,
  Subject,
  switchMap,
  takeUntil,
  throttleTime,
} from "rxjs";
import { makeWatcher$ } from "../fs_watcher.deno.ts";
import process from "node:process";
import { TAG } from "~/lib/lib.dual.ts";
import { TAKE_UNTIL_EXIT, UNTIL_SIGEXIT } from "~/lib/lib.deno.ts";

// These are the three roots for renderables.
// We have to do it this way bc not
//  everything supports shell glob in multiple places.
// Every deno file ending in deno.mts
const allDenoWatcher$ = merge(
  makeWatcher$(process.cwd(), "src/**/*/*{deno,dual}.*{ts,tsx}"),
);

// Deno does not allow glob matching on enabled >:|
const vscodeSettings = `${process.cwd()}/.vscode/settings.json`;

// merge = async SELECT UNION ALL
export const updateDenoPathsBcUgh = defer(
  function ReadFromVscodeSettingsForInit() {
    let init: { ["deno.enablePaths"]: string[] };
    try {
      const it = Deno.readTextFileSync(vscodeSettings);
      Deno.writeTextFileSync(`${vscodeSettings}.backup`, it);
      init = parse(it) as any;
    } catch (e) {
      console.error(e);
      init = { "deno.enablePaths": [] };
    }
    return of(init);
  },
)
  .pipe(
    switchMap(
      // Scan is stable state bc defer only
      //   returns 1 value and completes,
      //   so switchMap only runs 1 time.
      function ListenToFileChangesAndTheirPathsOnMatch(
        dot_vscode_config,
      ) {
        // Grab our 2 streams of valid files.
        return allDenoWatcher$.pipe(
          // Yeehaw redux = scan but with
          //   ability to freestyle the next event.
          scan(function StorePathChangeToSettings(
            state,
            next,
          ) {
            let nextWithoutCWD = next.path
              .replace(process.cwd(), "")
              .replace(/^\//gi, ""); // remove cwd and trailing
            if (
              !state["deno.enablePaths"]?.includes(
                nextWithoutCWD,
              )
            ) {
              console.log("Does not contain...");
              state["deno.enablePaths"].push(nextWithoutCWD);
            }
            return state;
          }, dot_vscode_config),
        );
      },
    ),
    TAG("DERP"),
    // Prevent chaos
    throttleTime(1000, undefined, {
      leading: true,
      trailing: true,
    }),
    // All higher rxjs maps accept promise
    //  outputs and auto-converts into observable of 1 value.
    // If longer than 1second to write for
    //  whatever reason, it will queue them in sequence.
    concatMap((dot_vscode_config) =>
      console.log("Writing...", dot_vscode_config) ||
      Deno.writeTextFile(
        vscodeSettings,
        JSON.stringify(dot_vscode_config, null, 2),
      ).then(
        // Echo param since this is side effectual.
        () => dot_vscode_config,
      )
    ),
    // Get told when a commit happens.
  );

updateDenoPathsBcUgh.pipe(TAKE_UNTIL_EXIT()).subscribe();
