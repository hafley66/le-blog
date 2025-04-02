import remarkGfm from "remark-gfm"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
// import rehypeSanitize from "rehype-sanitize"
import { unified } from "unified"
import { inspect } from "unist-util-inspect"
import rehypeExternalLinks from "rehype-external-links"
import remarkDirective from "remark-directive"
import { visit } from "unist-util-visit"
import rehypeRaw from "rehype-raw"
import rehypeMermaid from "rehype-mermaid"

import rehypeShikiFromHighlighter from "@shikijs/rehype/core"
import { transformerTwoslash } from "@shikijs/twoslash"
import {
  myRemarkPlugin,
  rehype_AddConsoleLogsToLines,
  rehypeAddIdToSectionForToc,
  remarkNestSections,
} from "./remark_rehype/remarkNestSections.deno.ts"
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  of,
  scan,
  shareReplay,
  Subject,
  tap,
} from "rxjs"

import _ from "lodash"
import { SHIKI } from "./shiki/shiki.deno.tsx"
import { remarkPlantUML } from "~/lib/remark_rehype/remark-plant-uml.deno.ts"
import { TAG } from "~/lib/lib.dual.ts"

const REEEE = await unified()
  .use(remarkParse)
  .use(remarkPlantUML)
  // .use(remarkDirective)
  // .use(myRemarkPlugin)
  .use(remarkGfm, {} as Parameters<typeof remarkGfm>[0])
  .use(remarkNestSections, { enableNesting: false })
  .use(remarkRehype, {
    allowDangerousHtml: true,
    clobberPrefix: "",
  } as Parameters<typeof remarkRehype>[0])
  .use(rehypeMermaid, {
    strategy: "img-svg",
    dark: true,
    prefix: "rehype-mermaid",
  })
  .use(rehypeRaw, {} as Parameters<typeof rehypeRaw>[0])
  // .use(rehypeSanitize, {
  //   allowComments: true,
  //   clobberPrefix: "",
  // } as Parameters<typeof rehypeSanitize>[0])
  .use(rehypeExternalLinks, {
    rel: ["nofollow", "noopener", "noreferrer"],
    target: "_blank",
  } as Parameters<typeof rehypeExternalLinks>[0])
  .use(rehypeShikiFromHighlighter, SHIKI, {
    theme: "one-dark-pro",
    addLanguageClass: true,
    transformers: [
      transformerTwoslash({
        explicitTrigger: true, // <--
      }),
    ],
  } as Parameters<typeof rehypeShikiFromHighlighter>[1])
  .use(rehypeAddIdToSectionForToc)
  // .use(rehype_AddConsoleLogsToLines)
  .use(rehypeStringify, {
    allowDangerousHtml: true,
  } as Parameters<typeof rehypeStringify>[0])

let remarkCalls = 0
const _input = new Subject<[string, string?]>()
const _cache = new BehaviorSubject(
  {} as Record<string, Observable<string>>,
)

const RemarkDaemon = _input
  .pipe(
    scan((state, [next, filename], index) => {
      console.log(`[${index}] processing next`, filename)
      if (state[next]) return state
      state[next] = new Observable<string>(sub => {
        REEEE.process(next)
          .then(i => {
            console.log(
              `/[${index}] Output of...`,
              filename,
            )
            // console.log({ next, i: i.value })
            sub.next(i.value as any)
            sub.complete()
          })
          .catch(ee => {
            console.log("Whelp...", filename, ee)
            sub.next(ee)
          })
        return () => {}
      }).pipe(
        catchError(err => {
          console.log("Whelp 2", filename)
          console.error(err)
          return of("")
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
      )
      return state
    }, _cache.value),
    catchError(err => {
      console.log("Whelp 3")
      console.error(err)
      return of({})
    }),
    tap({
      finalize: () => "MOTHER FUCKER",
    }),
  )
  .subscribe(_cache)

export const Remark = (
  props:
    | {
        val: string
      }
    | string,
  forFilename?: string,
) => {
  const id = remarkCalls++
  // console.log(
  //   "Calling remark",
  //   forFilename,
  //   // @ts-ignore
  //   props?.val?.length || props?.length,
  //   id,
  // )
  const value =
    typeof props === "string" ? props : props.val
  _input.next([value, forFilename] as const)
  return _cache.value[value]
}
