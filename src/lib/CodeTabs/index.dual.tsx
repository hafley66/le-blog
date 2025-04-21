import { writeFile } from "node:fs/promises"

import { rmSync } from "node:fs"
import { mkdirSync } from "node:fs"
import path from "node:path"
import remarkParse from "remark-parse"
import {
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
  takeLast,
} from "rxjs"
import { unified } from "unified"
import { v7 } from "uuid"
import { $$ } from "~/BASH.deno.ts"
import { SITEMAP } from "~/SITEMAP.deno.ts"
import { deferFrom } from "~/lib/lib.dual.ts"
import { Shiki } from "~/lib/shiki/shiki.deno.tsx"
import { propsModule } from "snabbdom"
import rehypeStringify from "rehype-stringify"

export type CodeTabsProps = {
  mapping?: Record<
    string,
    {
      value: string
      lang?: string | null
      meta?: string | null
    }
  >
  folder: string
  height?: number
  debug?: boolean
}

/**
 * Lets see, we need id from rendering, and we need way to rename files. push @@filename into the file
 *
 * Use .demo*deno. suffix for loading deno scripts, use .demo.dom for loading frontend demos
 * frontend demos can happen by...
 * Can pass down markdown strings
 * @param props
 */
export const CodeTabs = ({
  mapping,
  folder,
  height,
  debug,
}: CodeTabsProps) => {
  !folder.endsWith("/") && (folder = folder + "/")
  const radioName = `code-group-${path.dirname(folder)}`
  debug && console.log({ folder })
  const files = SITEMAP.subFolder(folder as any).includes<
    "deno.ts" | "deno.tsx" | "dom.ts" | "dom.tsx"
  >(/\.(dom|deno)\.tsx?$/)
  debug && console.log("Folder", { folder, mapping })
  const true_mapping = mapping
    ? Object.entries(mapping).map(
        i =>
          [
            i[0],
            i[1].value.trim(),
            true,
            i[1].meta ?? "",
          ] as const,
      )
    : folder
      ? files.map(
          i => [i.path, i.readSync(), false, ""] as const,
        )
      : []
  const tempDir = `${import.meta.dirname!}/temp${
    folder.startsWith("/") ? "" : "/"
  }${folder.replace(process.cwd() + "/", "")}`
  debug && console.log("Folder", { folder, true_mapping })

  const configs = true_mapping.map((i, cIndex) => {
    const fspath = i[0]
    let filename: null | string = null
    let content = i[1]
    let inline = i[2]
    let meta = i[3]
    let enableEval = false

    let evalType: "" | "back" | "front" | string = ""
    ;[content, filename] = eatAtAt("filename", content)
    ;[content, evalType, enableEval] = eatAtAt(
      "eval",
      content,
    )
    filename ||= fspath
    const cleanExt = path.extname(fspath).slice(1)

    mkdirSync(tempDir, { recursive: true })

    evalType =
      fspath.endsWith(".deno.tsx") ||
      fspath.endsWith("deno.ts")
        ? "back"
        : fspath.endsWith(".dom.ts") ||
            fspath.endsWith(".dom.tsx")
          ? "front"
          : evalType.trim().includes("front")
            ? "front"
            : evalType.trim().includes("backend")
              ? "back"
              : ""
    const inlineTempFsPath = path.join(
      tempDir,
      path.basename(fspath),
    )
    if (debug && inline)
      console.log({
        fspath,
        evalType,
        inlineTempFsPath,
        tempDir,
      })
    const itemId = fspath
    const out = {
      itemId,
      path: i[0],
      filename,
      content,
      inline,
      inlineTempFsPath,
      evalType,
      renderCss: () => {
        return `
  &:has(#${cssEscapeSimple(itemId)}:checked) { 
    #${cssEscapeSimple(itemId)}--pre {
      display: block;
      & + .console\\.log-details {
        display: block;
      }
    }
  }
  `
      },
      renderTab: () => {
        return [
          <input
            key={itemId}
            type="radio"
            value={path.basename(fspath)}
            id={itemId}
            name={folder}
            className="code-tabs-radio-input"
            {...{
              "data-scroll-to-me": `${folder}/code-group-demo-area`,
            }}
            checked={cIndex === 0 ? "true" : undefined}
          />,
          <label key={itemId + "2"} for={itemId}>
            <div className="centerino">
              {path.basename(filename)}
            </div>
          </label>,
        ]
      },
      renderCode: () => {
        return [
          combineLatest([
            Shiki({
              code: content,
              lang: cleanExt,
              meta,
              debug,
              id: fspath,
            }),
            evalType === "back"
              ? runBackendDemo({
                  tempDir,
                  code: content,
                  lang: cleanExt,
                })
              : of(""),
          ]).pipe(
            map(([shiki, logs]) => {
              if (typeof shiki !== "string") {
                debug &&
                  content.includes("twoslash") &&
                  console.log(shiki)
                const pre = shiki.children.find(
                  c =>
                    c.type === "element" &&
                    c.tagName === "pre",
                )

                if (pre && pre.type === "element") {
                  const code = pre.children.find(
                    i =>
                      i.type === "element" &&
                      i.tagName === "code",
                  )
                  pre.children = [
                    {
                      type: "element",
                      tagName: "div",
                      properties: {
                        class: "code-scroller",
                      },
                      children:
                        code && code.type === "element"
                          ? [
                              {
                                ...code,
                                children: [
                                  ...code.children,
                                  ...(logs
                                    ? [
                                        {
                                          type: "raw",
                                          value: logs,
                                        } as const,
                                      ]
                                    : []),
                                ],
                              },
                            ]
                          : [],
                    },
                    {
                      type: "element",
                      tagName: "button",
                      properties: {
                        class: "copy-to-clipboard",
                      },
                      children: [
                        { type: "text", value: "Copy" },
                      ],
                    },
                  ]
                }

                return unified()
                  .use(rehypeStringify)
                  .stringify(shiki)
                  .toString()
                // .then(i => i.toString())
              }
              return of("")
              // return shiki
              //   .replace(
              //     "<code>",
              //     `<div class='code-scroller' ${
              //       height
              //         ? `style='height: ${height};'`
              //         : ""
              //     }><code>`,
              //   )
              //   .replace(
              //     "</code>",
              //     "</code></div><button class='copy-to-clipboard caption'>Copy</button>",
              //   )
              //   .replace("</code>", logs + "</code>")
            }),
          ),
        ]
      },
      makeTempFile: () =>
        writeFile(inlineTempFsPath, content),
      renderInlineListener: () =>
        evalType === "front"
          ? `import("${
              inline
                ? `~/${inlineTempFsPath.replace(process.cwd() + "/src/", "")}`
                : fspath.replace("src/", "~/")
            }").then(({default: def}) => {
  window.demoRunner.registry["${fspath}"] = def;
  ${
    cIndex === 0
      ? `window.demoRunner.activate("${fspath}");`
      : ""
  }
});`
          : "",
    }
    return out
  })

  const frontends = configs
    .map(c => c.renderInlineListener())
    .filter(Boolean)

  const makeAllFrontendTempFiles = deferFrom(() =>
    Promise.all(
      configs
        .filter(i => i.evalType === "front" && i.inline)
        .map(i => i.makeTempFile()),
    ),
  )

  return (
    <div className={`code-group`} id={folder}>
      <div
        id={radioName}
        className={`code-group-tabs`}
        data-sticky="1"
      >
        {configs.map(i => i.renderTab())}
      </div>
      <div data-sticky-boundary>
        {configs.map(i => i.renderCode())}
        {frontends.length
          ? makeAllFrontendTempFiles.pipe(
              switchMap(() =>
                deferFrom(() =>
                  of(
                    writeFile(
                      `${tempDir}/index.vite.ts`,
                      frontends.join("\n"),
                    ),
                  ),
                ).pipe(
                  map(
                    () =>
                      `<script defer src="${`${tempDir}/index.vite.ts`}" type="module" data-from="CodeTabs"></script>`,
                  ),
                ),
              ),
            )
          : ""}
        <div
          className="code-group-demo-area"
          id={`${folder}/code-group-demo-area`}
        ></div>
      </div>
      {String.raw`
<style>
  #${cssEscapeSimple(folder)}{
    ${configs.map(i => i.renderCss()).join("\n")}
  }
</style>
`}
    </div>
  )
}

function eatAtAt(atat: string, target: string) {
  let match = target.match(
    new RegExp(`/.*@@${atat}(.*)\\n`, "gi"),
  )
  if (match) {
    return [
      target?.replace(
        new RegExp(`(.*@@${atat}.*)\\n`, "i"),
        "",
      ),
      match[0].split(`@@${atat} `)[1] || "",
      true,
    ] as const
  }
  return [target, "", false] as const
}

function runBackendDemo(props: {
  tempDir: string
  code: string
  lang: string
}) {
  const tempTimestamp = v7()
  const name = `${props.tempDir}/${tempTimestamp}.${props.lang!}`

  const script = `
  ${`const log = console.log.bind(console);
  console.log = (...args: any[]) => {
    log(...args)
    log('øøø')
    return;
  };
  ;`}${props.code};
  `

  const lines$ = deferFrom(() =>
    writeFile(name, script),
  ).pipe(
    switchMap(() =>
      $$`deno --allow-read --allow-env ${name}`.pipe(
        takeLast(1),
        map(ret => {
          const res = ret.split("\nøøø\n").filter(Boolean)
          if (res.length) {
            rmSync(name)
            // We are going to look for .line {this key} in the html pass and expode the line parent with more lines.
          }

          return res
        }),
        catchError(err => {
          console.log("ERROR in remark code sample!")
          console.error(err)
          return of(["error"])
        }),
      ),
    ),
  )
  return lines$.pipe(switchMap(i => <Logs logs={i} />))
}

const Logs = ({ logs }: { logs: string[] }) => (
  <details className="console.log-details" open="1">
    <summary class="log-grid-heading">
      console.log[{logs.length}]
    </summary>
    <code class="console.log-output">
      {logs.flatMap((i, index) => [
        <span
          className="log-line"
          key="A"
        >{`(${index + 1})`}</span>,
        <span className="log-line" key="B">
          {escapeHTML(i)}
        </span>,
      ])}
    </code>
  </details>
)

function cssEscapeSimple(str: string, double = false) {
  return `${str.replace(/[^a-zA-Z0-9_-]/g, c => (double ? `\\\\${c}` : `\\${c}`))}`
}

const list = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
} as any

const escapeHTML = (str: string) =>
  str.replace(/[&<>'"]/g, tag => list[tag])

CodeTabs.markdown = (
  values: TemplateStringsArray,
  ...args: any[]
) => {
  const value = values.join("")
  return deferFrom(() =>
    of(
      unified()
        .use(remarkParse)
        .parse(value)
        .children.filter(i => i.type === "code"),
    ),
  ).pipe()
}
