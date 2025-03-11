/** @jsxImportSource ./rxjs-vhtml */
/** @jsxImportSourceTypes ./rxjs-vhtml */
import rehypeExpressiveCode, {
  RehypeExpressiveCodeOptions,
} from "rehype-expressive-code"
import ecTwoSlash from "expressive-code-twoslash"
import remarkGfm from "remark-gfm"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeSanitize from "rehype-sanitize"
import { unified } from "unified"

import {
  BehaviorSubject,
  Observable,
  scan,
  shareReplay,
  Subject,
} from "rxjs"

import _ from "lodash"

const rehypeExpressiveCodeOptions: RehypeExpressiveCodeOptions =
  {
    defaultProps: {
      overridesByLang: {
        "bash,ps,sh,ts,tsx,js,jsx": {
          preserveIndent: false,
        },
      },
      preserveIndent: true,
    },
    plugins: [ecTwoSlash({})],
  }

const REEEE = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeExpressiveCode, rehypeExpressiveCodeOptions)
  .use(rehypeStringify)

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
        REEEE.process(next)
          .then(i => {
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
