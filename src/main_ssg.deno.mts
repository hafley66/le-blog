import {
  catchError,
  debounceTime,
  defer,
  filter,
  from,
  map,
  merge,
  mergeMap,
  mergeWith,
  of,
  switchMap,
  takeUntil,
  tap,
} from "rxjs";
import { makeWatcher$ } from "./fs_watcher.deno.mts";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { MARKDOWN_IT } from "./markdown.deno.mts";
import path from "node:path";
import { HTML } from "./HTML.dual.mts";
import { createMermaidRenderer } from "mermaid-isomorphic";

const search = ["src", "demos", "blog"];
// .map(
//   i => `${(globalThis as any).process.cwd()}/${i}`,
// );
const allDenoWatcher$ = makeWatcher$(search, "deno.mts");
const denoRenderWatcher$ = makeWatcher$(
  search,
  "render.deno.mts",
);
const dualWatcher$ = makeWatcher$(search, "dual.mts");
const mdWatcher$ = makeWatcher$(search, ".md");
const srcWatcher$ = makeWatcher$(["src"]);

// Deno does not allow glob matching on enabled >:|
let vscodeSettings = `${process.cwd()}/.vscode/settings.json`;
const updateDenoPathsBcUgh = merge(
  allDenoWatcher$,
  dualWatcher$,
)
  .pipe(
    tap(it => {
      const ot = JSON.parse(
        readFileSync(vscodeSettings).toString(),
      );
      const p = `src/${it.path.split("src/")[1]}`;
      ot["deno.enablePaths"] ||= [];
      if (!ot["deno.enablePaths"].includes(p)) {
        ot["deno.enablePaths"].push(p);
      }
      writeFileSync(
        vscodeSettings,
        JSON.stringify(ot, null, 2),
      );
    }),
  )
  .subscribe();

let refs = `${process.cwd()}/src/FS/REF.json`;
const REFs_updater = srcWatcher$
  .pipe(
    filter(i => !i.path.endsWith("FS/REF.json")),
    map(x => {
      const n = `/${x.path.split("src/")[1]}`;
      if (n.match(/\.md$/i)) {
        return n.replace(/\.md$/i, ".html");
      }
      if (!n.includes(".deno.")) {
        return `/src${n}`;
      }
      return n;
    }),
    mergeWith(
      makeWatcher$(search, "../public/").pipe(
        map(i => `/${i.path.split("public/")[1]}`),
      ),
    ),
    tap(n => {
      const ot = JSON.parse(readFileSync(refs).toString());
      ot[n] = n;
      writeFileSync(refs, JSON.stringify(ot, null, 2));
    }),
  )
  .subscribe();

const effect$ = denoRenderWatcher$.pipe(
  mergeMap((e, eI) => {
    let module = null;
    return defer(() => from(import(e.path))).pipe(
      switchMap(html =>
        of([
          "data",
          { metaPath: [e.index, eI], module: html },
        ] as const).pipe(),
      ),
      catchError(err => of(["error", err, e] as const)),
      takeUntil(
        denoRenderWatcher$.pipe(
          filter(w => w.path === e.path),
          tap(n => console.log("TAKE UNTIL TRIGGERED", n)),
        ),
      ),
    );
  }),
);

const MERMAIDER = createMermaidRenderer();
const renderMd = mdWatcher$
  .pipe(
    mergeMap(async n => {
      let html = readFileSync(n.path).toString();

      html = await Array.from(
        html.matchAll(/```mermaid/gi),
      ).reduce(function ReduceMermaidManually(
        n_html,
        match,
      ) {
        return n_html.then(async html => {
          const startIndex = match.index;
          const endIndex = html.indexOf(
            "```",
            startIndex + 10,
          );
          if (endIndex !== -1) {
            const [mermaidContent] = await MERMAIDER([
              html.substring(startIndex + 10, endIndex),
            ]);
            return `${html.slice(0, startIndex)}<pre><code class="mermaid">${
              mermaidContent.status === "fulfilled"
                ? mermaidContent.value.svg
                : mermaidContent.reason
            }</code></pre>${html.slice(endIndex + 3)}`;
          }
          return html;
        });
      }, Promise.resolve(html));

      let capturedFiles: string[] = [];
      html = Array.from(
        html.matchAll(
          /<a data-preview href="(.*)"><\/a>/gi,
        ),
      ).reduce(function RenderSpecialDirective(acc, match) {
        const p = path.join(
          match[1].startsWith("/")
            ? process.cwd()
            : path.dirname(n.path),
          match[1],
        );
        capturedFiles.push(p);
        const file = readFileSync(p).toString().trim();
        const hmm = `\`\`\`${
          match[1].includes(".mts")
            ? "ts"
            : path.extname(match[1]).replace(".", "")
        }
${file}
\`\`\`

`;
        const a = `<a data-preview href="${match[1]}"></a>`;
        return acc.replace(a, hmm);
      }, html);
      if (capturedFiles.length) {
        html = `${html}\n<script>window.__hafley_files=["${capturedFiles
          .map(i => i.replace(process.cwd(), ""))
          .join('", "')}"]</script>`;
      }
      const it = {
        next: n,
        output: HTML()(MARKDOWN_IT.render(html)).replaceAll(
          '<span class="line"></span></code>',
          "</code>",
        ),
      };
      const toDist = path.join(
        it.next.path.replace(/\.md$/i, ".html"),
      );

      mkdirSync(path.dirname(toDist), { recursive: true });
      writeFileSync(toDist, it.output);
      console.log(
        "Rendered...",
        it.next.path,
        "=>",
        toDist,
      );
    }),
    debounceTime(500),
    tap(() => {
      const it = path.join(
        process.cwd(),
        "vite.config.mts",
      );
      const fileContents = readFileSync(it);
      writeFileSync(it, fileContents);
    }),
  )
  .subscribe();

effect$
  .pipe(
    takeUntil(
      denoRenderWatcher$.pipe(
        filter(w => w.path === `${import.meta.filename}`),
        tap(n =>
          console.log("TAKE UNTIL TRIGGERED MAIN", n),
        ),
      ),
    ),
  )
  .subscribe(x =>
    x[0] === "error"
      ? console.log("Error: ", x.slice(1))
      : null,
  );

console.log("What?");
