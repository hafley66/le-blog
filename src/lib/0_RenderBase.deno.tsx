/** @jsxImportSource ./rxjs-vhtml */
/** @jsxImportSourceTypes ./rxjs-vhtml */
import _ from "lodash"

import {
  BehaviorSubject,
  MonoTypeOperatorFunction,
  Observable,
  Subject,
  scan,
  share,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
  timer,
} from "rxjs"
import {
  FootnoteFlat,
  HeaderFlat,
  HeaderProps,
  TOC,
} from "./0_Layout.dual.tsx"
import { Remark } from "./00_Remark2.deno.tsx"
import jsx from "~/lib/rxjs-vhtml/jsx-runtime"
import { TAG } from "~/lib/lib.dual.ts"

export const Render$ = (
  tocTreePipe: MonoTypeOperatorFunction<string> = takeUntil<string>(
    timer(500),
  ),
) => {
  // As we render H1...6, we capture their props as subject.next and we reduce over
  const header$ = new Subject<HeaderFlat>()
  const footnote$ = new Subject<FootnoteFlat>()

  const H: Record<
    `H${1 | 2 | 3 | 4 | 5 | 6}`,
    (
      title: string,
      render?:
        | string
        | string[]
        | Element
        | Element[]
        | (string | Element)[],
    ) => Observable<string>
  > = Object.fromEntries(
    ([1, 2, 3, 4, 5, 6] as const).map(
      i =>
        [
          `H${i}`,
          (
            title: string,
            render?: Observable<string> | string,
          ) => {
            const id = _.kebabCase(title)
            header$.next({
              value: title,
              depth: i,
              id,
            })
            const latest =
              asTreeState$.value.flat.at(-1)?.address

            return (
              <section id={`section-${id}`}>
                {jsx(`h${i}`, {
                  id,
                  children: [latest ?? "", title],
                })}
                {(typeof render === "string"
                  ? Remark(`${render.replace(/''/gi, "`")}`)
                  : render) ?? null}
              </section>
            )
          },
        ] as const,
    ),
  ) as any

  const asTreeState$ = new BehaviorSubject({
    stack: [
      {
        depth: 1,
        children: [],
        id: "",
        index: 0,
        parent: null,
        value: "root",
        slug: "#root",
        address: "",
      } as HeaderProps,
    ],
    flat: [] as HeaderProps[],
  })

  const asTree$ = header$.pipe(
    scan(({ stack: state, flat }, next, index) => {
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
      while (state[state.length - 1].depth >= next.depth) {
        state.pop()
      }

      // Add node to current parent and push it onto current level
      node.index = state[state.length - 1].children.length
      state[state.length - 1].children.push(node)
      node.parent = state[state.length - 1]
      state.push(node)
      flat.push(node)

      // console.log({ next })

      return {
        stack: state,
        flat,
      }
    }, asTreeState$.value),
    tap(asTreeState$),
    share(),
  )

  const asTreeRoot$ = asTree$.pipe(
    switchMap(
      i => TOC({ tocRoot: i.stack[0] }), // The root is at the front
    ),
    tocTreePipe,
    shareReplay(),
  )

  asTreeRoot$.subscribe()
  return {
    ...H,
    asTree$,
    TOC: asTreeRoot$,
    header$,
  }
}
