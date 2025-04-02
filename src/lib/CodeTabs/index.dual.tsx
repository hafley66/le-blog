import { writeFile } from "node:fs/promises"
import path from "node:path"
import {
  catchError,
  map,
  of,
  switchMap,
  takeLast,
} from "rxjs"
import { FS, SITEMAP } from "~/SITEMAP.deno.ts"
import { Shiki } from "~/lib/shiki/shiki.deno.tsx"
import { $$ } from "~/BASH.deno.ts"
import { rmSync } from "node:fs"
import { deferFrom } from "~/lib/lib.dual.ts"
import { v7 } from "uuid"
import { mkdirSync } from "node:fs"

export type CodeTabsProps = {
  index?: number
  mapping?: Record<string, string>
  folder: string
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
  index,
  mapping,
  folder,
}: CodeTabsProps) => {
  const radioName = `code-group-${folder ? path.dirname(folder) : index}`
  console.log(
    "The fuck",
    index,
    radioName,
    folder,
    path.dirname(folder),
  )
  const files = SITEMAP.subFolder(folder).includes<
    "deno.ts" | "deno.tsx" | "dom.ts" | "dom.tsx"
  >(/\.(dom|deno)\.tsx?$/)

  const true_mapping = mapping
    ? Object.entries(mapping)
    : folder
      ? (files.map(
          i => [i.path, i.readSync()] as const,
        ) as [string, string][])
      : []
  const id = `code-group-radio-${index}`
  const tempDir = `${import.meta.dirname!}/temp/${folder}`

  const configs = true_mapping.map((i, cIndex) => {
    const fspath = i[0]
    let filename: null | string = null
    let content = i[1]
    let enableEval = false

    let evalType: "" | "back" | "front" | string = ""
    console.log({ filename, content })
    ;[content, filename] = eatAtAt("filename", i[1])
    console.log({ filename })
    ;[content, evalType, enableEval] = eatAtAt("eval", i[1])
    console.log({ filename })

    const cleanExt = path.extname(fspath).slice(1)

    mkdirSync(tempDir, { recursive: true })

    evalType = enableEval
      ? fspath.includes(".deno.")
        ? "back"
        : fspath.includes(".dom.")
          ? "front"
          : evalType.trim()
      : ""
    const itemId = `${id}-${cIndex}`
    const out = {
      itemId,
      path: i[0],
      filename,
      content,
      evalType,
      renderCss: () => {
        return `
  &:has(#${cssEscapeSimple(id)}:checked) { 
    & pre:nth-child(${cIndex + 2}){
      & + .console\\.log-details {
        display: block;
      }
      display: block;
    }
    pre:nth-child(${cIndex + 2})
  }
  `
      },
      renderTab: () => {
        return [
          <input
            key={itemId}
            type="radio"
            name={path.basename(fspath)}
            id={fspath}
            value={folder}
            className="code-tabs-radio-input"
            {...{ "data-scroll-to-me": `.${radioName}` }}
            checked={index === 0 ? "true" : undefined}
          />,
          <label key={itemId + "2"} for={itemId}>
            <div className="centerino">{filename}</div>
          </label>,
        ]
      },
      renderCode: () => {
        return [
          <Shiki code={content} lang={cleanExt} />,
          // "derp",
          evalType === "backend"
            ? runBackendDemo({
                tempDir,
                code: content,
                lang: cleanExt,
              })
            : "",
        ]
      },
      renderInlineListener: () =>
        evalType === "front"
          ? `import("${filename}").then(({default: def}) => {
  window.demoRunner.registry["${filename}"] = def;
  ${cIndex === 0 ? `window.demoRunner.activate("${filename}");` : ""}
});`
          : "",
    }
    return out
  })

  const frontends = configs
    .map(c => c.renderInlineListener())
    .filter(Boolean)

  return (
    <div className={`code-group ${radioName}`}>
      <div
        id={radioName}
        className={`code-group-tabs`}
        data-sticky="1"
      >
        {configs.map(i => i.renderTab())}
      </div>
      {configs.map(i => i.renderCode())}
      {frontends.length
        ? deferFrom(() =>
            of(
              writeFile(
                `${tempDir}/index.vite.ts`,
                frontends.join("\n"),
              ),
            ),
          ).pipe(
            map(
              () =>
                `<script defer src="${`${tempDir}/index.vite.ts`}" type="module"></script>`,
            ),
          )
        : ""}

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
      match[0].split(`@@${atat} `)[1],
      true,
    ] as const
  }
  return [atat, "", false] as const
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
  return lines$.pipe(map(i => <Logs logs={i} />))
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
          {i}
        </span>,
      ])}
    </code>
  </details>
)

function cssEscapeSimple(str: string) {
  return `${str.replace(/[^a-zA-Z0-9_-]/g, c => `\\${c}`)}`
}

function toSimpleCssSelector(s: string) {
  return `${s.replaceAll(/[^a-zA-Z0-9_-]/g, c => "-_-")}`
}
