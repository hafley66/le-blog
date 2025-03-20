/** @jsxImportSource ./rxjs-vhtml */
/** @jsxImportSourceTypes ./rxjs-vhtml */
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
  rehypeAddIdToSectionForToc,
  remarkNestSections,
} from "./remark_rehype/remarkNestSections.deno.ts"
import {
  BehaviorSubject,
  Observable,
  scan,
  shareReplay,
  Subject,
} from "rxjs"

import _ from "lodash"
import { SHIKI } from "~/shiki.deno.ts"
import { remarkPlantUML } from "~/lib/remark_rehype/remark-plant-uml.deno.ts"

const REEEE = await unified()
  .use(remarkParse)
  .use(remarkPlantUML)
  .use(remarkDirective)
  .use(myRemarkPlugin)
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
    theme: "vitesse-dark",
    transformers: [
      transformerTwoslash({
        explicitTrigger: true, // <--
      }),
    ],
  } as Parameters<typeof rehypeShikiFromHighlighter>[1])
  .use(rehypeAddIdToSectionForToc)
  .use(rehypeStringify, {
    allowDangerousHtml: true,
  } as Parameters<typeof rehypeStringify>[0])

let remarkCalls = 0
const _input = new Subject<string>()
const _cache = new BehaviorSubject(
  {} as Record<string, Observable<string>>,
)

const RemarkDaemon = _input
  .pipe(
    scan((state, next) => {
      if (state[next]) return state
      state[next] = new Observable<string>(sub => {
        // console.log("processing next")
        REEEE.process(next)
          .then(i => {
            // console.log({ next, i: i.value })
            sub.next(i.value)
            sub.complete()
          })
          .catch(ee => sub.error(ee))
        return () => {}
      }).pipe(
        shareReplay({ bufferSize: 1, refCount: true }),
      )
      return state
    }, _cache.value),
  )
  .subscribe(_cache)

export const Remark = (
  props:
    | {
        val: string
      }
    | string,
) => {
  const id = remarkCalls++
  // console.log("Calling remark", props, id)
  const value =
    typeof props === "string" ? props : props.val
  _input.next(value)
  return _cache.value[value]
}
