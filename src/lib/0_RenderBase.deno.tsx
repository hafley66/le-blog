import _ from "lodash"

import {
  Observable,
  Subject,
  catchError,
  combineLatest,
  combineLatestWith,
  debounceTime,
  from,
  isObservable,
  map,
  of,
  pipe,
  switchMap,
} from "rxjs"
import {
  FootnoteFlat,
  HeaderFlat,
  HeaderProps,
  LayoutProps,
  Layout,
  TOC,
} from "./0_Layout.dual.tsx"
import { Remark } from "./00_Remark2.deno.tsx"
import { deferFrom } from "~/lib/lib.dual.ts"
import { v7 } from "uuid"
import { CodeTabs } from "~/lib/CodeTabs/index.dual.tsx"
import path from "node:path"
import { statSync } from "node:fs"
import { TAKE_UNTIL_EXIT } from "~/lib/lib.deno.ts"
import { watch } from "node:fs/promises"
import { readFileSync } from "node:fs"

const MARKDOWN_REGEX_TO_NAIVELY_SPLIT_HEADERS__BEWARE_HASH_COMMENTS =
  /(#{2,} .+?)\n([\s\S]*?)(?=\n#{2,} |\n*$|$)/g

type TemplateComponentStart<T extends string> = [
  "start",
  T,
  index: number,
  (value: string) => Observable<string>,
]
type TemplateComponentEnd<T extends string> = [
  "end",
  T,
  index: number,
]
type TemplateComponent<T extends string> =
  | TemplateComponentStart<T>
  | TemplateComponentEnd<T>

export const Render$ = (
  importMetaFilename: string,
  opts?: { debug?: boolean },
) => {
  const [dontCare, ...thisOne] =
    importMetaFilename.split("/src")

  const OUTFILE = importMetaFilename.replace(
    ".render.deno.tsx",
    ".vite.html",
  )
  importMetaFilename = path.resolve(
    importMetaFilename.replace(process.cwd(), ""),
  )
  const dir = thisOne.join("")

  const safeRead = (path: string) => {
    try {
      return Deno.readTextFileSync(path)
    } catch (e) {
      return ""
    }
  }

  const writeToDist = pipe(
    debounceTime<string>(1000),
    switchMap(async (content: string) => ({
      writer:
        safeRead(OUTFILE) !== content
          ? (console.log(
              "Writing...",
              OUTFILE,
              content.length,
            ),
            await Deno.writeTextFile(OUTFILE, content))
          : false,
      content,
      renderedPath: OUTFILE,
      dirname: import.meta.dirname,
      filename: import.meta.filename,
    })),
    catchError(e => {
      console.error(e)
      throw e
    }),
  )
  // As we render H1...6, we capture their props as subject.next and we reduce over
  const header$ = new Subject<HeaderFlat>()
  const footnote$ = new Subject<FootnoteFlat>()

  const markdown = (
    strings: TemplateStringsArray,
    ...values: any[]
  ) => {
    return from(
      Remark(strings.join("\n"), importMetaFilename),
    )
  }

  const md = (
    strings: TemplateStringsArray,
    ...values: (
      | Observable<string>
      | string
      | TemplateComponent<any>
    )[]
  ) => {
    const extractedComponents = {} as Record<
      string,
      | [index: number, value: TemplateComponentStart<any>]
      | Observable<string>
    >

    const parseStack = [] as [
      index: number,
      value: TemplateComponentStart<any>,
    ][]

    const build = [] as string[]
    const obs = values
      .filter(i => isObservable(i))
      .map((i, index) => [v7(), i] as const)

    let i = 0
    for (const n of strings) {
      const it = values[i]
      if (Array.isArray(it)) {
        const key = it[0] + it[1]
        const entry = parseStack.at(-1)
        if (it[0] === "start") {
          if (entry) {
            console.error(
              "Bad parse, i do not support nesting you goober",
            )
          }
          build.push(n)
          parseStack.push([i, it] as const)
        } else if (it[0] === "end") {
          if (!entry) {
            console.error("Missing start for an end!")
          }
          if (entry && "findIndex" in entry) {
            const [startFoundAtIndex] = entry
            const slice = strings.slice(
              startFoundAtIndex + 1,
              i + 1,
            )
            const obss = entry[1][3](slice.join("\n\n"))
            obs.push([key, obss] as const)
            build.push(
              `\n\n\n<div id="${key}"></div>\n\n\n`,
            )
            parseStack.pop()
          }
        }
      } else if (parseStack.length) {
        continue
      } else {
        build.push(
          `${n}${
            !it
              ? ""
              : typeof it === "string"
                ? it
                : `\n\n\n<div id="${obs.find(x => x[1] === it)?.[0]}"></div>\n\n\n`
          }`,
        )
      }
      i++
    }
    const it = build.join(" ")
    // console.log({ importMetaFilename, it: obs.length })
    if (!it.trim()) {
      return {
        toc: of(""),
        children: of(""),
      }
    }
    const sections = [
      ...it.matchAll(
        MARKDOWN_REGEX_TO_NAIVELY_SPLIT_HEADERS__BEWARE_HASH_COMMENTS,
      ),
    ]

    const them = sections
      .map(i => ({
        match: i[1],
        header: i[1].replace(/#{2,} /gi, ""),
        depth: i[1].split(/ /gi)[0].length,
        body: i[2],
      }))
      .map(i => ({
        ...i,
        id: _.kebabCase(i.header),
        value: i.header,
      }))

    const { byId, stack, items } = createNestedHeaders(them)
    const ConstructedMarkdown = items.map(
      it => `

${"#".repeat(it.depth)} ${it.value}
${it.body}

`,
    )

    // console.log(ConstructedMarkdown)

    const meta = {
      sections: ConstructedMarkdown,
      byId,
      stack,
    }
    const out = deferFrom(() =>
      Remark(
        ConstructedMarkdown.join("\n"),
        importMetaFilename,
      ),
    ).pipe(
      combineLatestWith(
        (obs.length
          ? combineLatest(
              obs.map(i =>
                i[1].pipe(map(ii => [i[0], ii] as const)),
              ),
            )
          : of([] as [string, string][])
        ).pipe(),
      ),
      map(
        ([compiled, next]) =>
          next.reduce((html, [id, value]) => {
            return html.replace(
              `<div id="${id}"></div>`,
              value,
            )
          }, compiled) || compiled,
      ),
      catchError(err => {
        console.log("OI", importMetaFilename)
        console.error(err)
        return of("")
      }),
    )

    Object.assign(out, meta)

    return {
      toc: TOC({ tocRoot: stack[0] }),
      children: out as typeof out & typeof meta,
    }
  }

  const createNestedHeaders = (flat: HeaderFlat[]) => {
    const stack = [
      {
        depth: 1,
        children: [],
        id: "",
        index: 0,
        parent: null,
        value: "root",
        slug: "#root",
        address: "",
        body: "",
      } as HeaderProps,
    ]
    const byId: Record<string, HeaderProps> = {}
    const items: HeaderProps[] = []
    const all = flat.map((next, index) => {
      const node: HeaderProps = {
        ...next,
        id: _.kebabCase(next.value),
        index,
        children: [],
        parent: null,
        get address() {
          let curr: HeaderProps | null = this
          let n = [] as number[]
          while (curr) {
            n.push(curr.index)
            curr = curr.parent
          }
          return `${n
            .reverse()
            .slice(1 /* slice the root h1 off */)
            .map(
              i => i + 1 /* Users start at index 1 base */,
            )
            .join(".")}. `
        },
      }

      // Pop levels until we find the correct parent for this heading
      while (stack[stack.length - 1].depth >= next.depth) {
        stack.pop()
      }

      // Add node to current parent and push it onto current level
      node.index = stack[stack.length - 1].children.length
      stack[stack.length - 1].children.push(node)
      node.parent = stack[stack.length - 1]
      stack.push(node)
      items.push(node)
    })

    items.forEach(it => {
      it.value = `${it.address} ${it.value}`
      byId[it.id] = it
    })
    // console.log({ items })
    return {
      byId,
      stack,
      items: items,
    }
  }

  const SSGLayout = (
    props: Omit<LayoutProps, "url"> & { debug?: boolean },
  ) => {
    const it = (<Layout {...props} url={dir} />).pipe(
      writeToDist,
      map(i => ({
        ...i,
        props,
        importMetaFilename,
        dir,
      })),
    )
    return TypedAssign(it, {
      props,
      importMetaFilename,
      dir,
    })
  }

  let mid = 0
  let midg = 0

  const $ = {
    header$,
    md,
    writeToDist,
    Layout,
    SSGLayout,
    markdown,
    CodeTabs: {
      markdown: (
        values: TemplateStringsArray,
        ...args: any[]
      ): Observable<string> => {
        const codes = CodeTabs.markdown(values, ...args)
        return codes.pipe(
          switchMap(nextC => {
            const folder = `${path.dirname(importMetaFilename)}/md_${midg++}/`
            return CodeTabs({
              debug: opts?.debug,
              folder,
              mapping: Object.fromEntries(
                nextC.map(
                  (code, ci) =>
                    [
                      `${folder}md_${mid++}${code.lang ? `.${code.lang}` : ""}`,
                      code,
                    ] as const,
                ),
              ),
            })
          }),
        )
      },
      start: (opts?: {
        groupName?: string
        autoSave?: boolean
      }) =>
        [
          "start",
          "CodeTabs",
          midg,
          (templateStringValueBetween: string) => {
            const fspath =
              process.cwd() + importMetaFilename
            if (
              opts?.autoSave &&
              statSync(fspath) &&
              opts.groupName
            ) {
              // hehehehe

              return deferFrom(() =>
                watch(fspath, {
                  persistent: false,
                  recursive: true,
                }),
              ).pipe(
                debounceTime(100),
                map(nextLol => {
                  console.log("NEXT LOL", nextLol)
                  const me = readFileSync(fspath).toString()
                  const lol = [
                    ...me.matchAll(
                      /\$\.CodeTabs\.start\((?:\s|\n)*\{(?:\s|\n)*autoSave: true,?(?:.|\n)*?\}\)\}\n((?:\n|.)+?)\$\{\$\.CodeTabs\.end\(\)/gi,
                    ),
                  ]
                  const mineLol = lol.find(i =>
                    i?.[0]?.includes(
                      `groupName: "${opts.groupName}"`,
                    ),
                  )
                  return mineLol?.[1]
                }),
                switchMap(i =>
                  $.CodeTabs.markdown(
                    // @ts-ignore
                    [i],
                  ),
                ),
                TAKE_UNTIL_EXIT(),
              )
            }
            return $.CodeTabs.markdown(
              // @ts-ignore
              [templateStringValueBetween],
            )
          },
        ] as TemplateComponentStart<"CodeTabs">,
      end: () =>
        [
          "end",
          "CodeTabs",
          midg,
        ] as TemplateComponentEnd<"CodeTabs">,
    },
  }
  return $
}

function TypedAssign<T extends Record<any, any>, Next>(
  source: T,
  shallow: Next,
): T & Next {
  return Object.assign(source ?? ({} as T), shallow)
}
