import _ from "lodash"

import {
  MonoTypeOperatorFunction,
  Subject,
  catchError,
  debounceTime,
  from,
  map,
  of,
  pipe,
  switchMap,
  takeUntil,
  timer,
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

const MARKDOWN_REGEX_TO_NAIVELY_SPLIT_HEADERS__BEWARE_HASH_COMMENTS =
  /(#{2,} .+?)\n([\s\S]*?)(?=\n#{2,} |\n*$|$)/g

export const Render$ = (importMetaFilename: string) => {
  const [dontCare, ...thisOne] =
    importMetaFilename.split("/src")
  const dir = thisOne.join("")

  const OUTFILE = importMetaFilename.replace(
    ".render.deno.tsx",
    ".vite.html",
  )

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
    ...values: any[]
  ) => {
    let i = 0
    let build = [] as string[]
    for (const n of strings) {
      const other = values[i++]
      build.push(n + (other ?? ""))
    }
    const it = build.join(" ")

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

  const SSGLayout = (props: Omit<LayoutProps, "url">) => {
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

  return {
    header$,
    md,
    writeToDist,
    Layout,
    SSGLayout,
    markdown,
  }
}

function TypedAssign<T extends Record<any, any>, Next>(
  source: T,
  shallow: Next,
): T & Next {
  return Object.assign(source ?? ({} as T), shallow)
}
