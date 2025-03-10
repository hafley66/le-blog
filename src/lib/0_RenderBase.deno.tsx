import React, { use } from "react"
import {
  BehaviorSubject,
  lastValueFrom,
  map,
  MonoTypeOperatorFunction,
  scan,
  share,
  Subject,
  takeUntil,
  tap,
  timer,
} from "rxjs"
import _ from "lodash"
import {
  FootnoteFlat,
  HeaderFlat,
  HeaderProps,
  TOC,
} from "./0_Layout.dual.tsx"
import { Remark } from "./00_Remark.deno.tsx"
import { dedent } from "@qnighy/dedent"

export const Render$ = (
  tocTreePipe: MonoTypeOperatorFunction<React.JSX.Element> = takeUntil<React.JSX.Element>(
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
      render?: React.ReactNode,
    ) => React.ReactNode
  > = Object.fromEntries(
    ([1, 2, 3, 4, 5, 6] as const).map(
      i =>
        [
          `H${i}`,
          (title: string, render?: React.ReactNode) => {
            const id = _.kebabCase(title)
            header$.next({
              value: title,
              depth: i,
              id,
            })
            const latest =
              asTreeState$.value.flat.at(-1)?.address
            console.log(title, latest)
            return (
              <section id={`section-${id}`}>
                {React.createElement(
                  `h${i}`,
                  { id },
                  <>
                    <span>{latest ?? ""}</span>
                    {title}
                  </>,
                )}
                {(typeof render === "string" ? (
                  <Remark>{dedent`${render.replace(/''/gi, "`")}`}</Remark>
                ) : (
                  render
                )) ?? null}
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
          return n.reverse().join(".") + "."
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

      console.log({ next })

      return {
        stack: state,
        flat,
      }
    }, asTreeState$.value),
    tap(asTreeState$),
    share(),
  )

  const asTreeRoot$ = asTree$.pipe(
    map(
      i => <TOC tocRoot={i.stack[0]} />, // The root is at the front
    ),
  )

  let lastValuePromise: Promise<React.JSX.Element> | null =
    null

  const asTreeSync$ = asTreeRoot$.pipe(tocTreePipe)
  asTreeSync$.subscribe()
  return {
    ...H,
    asTree$,
    // TOC_SYNC: () =>
    //   use(
    //     (lastValuePromise ||= lastValueFrom(asTreeSync$)),
    //   ),
    // TOC_CUSTOM: () =>
    //   use(
    //     (lastValuePromise ||= lastValueFrom(asTreeRoot$)),
    //   ),
  }
}
