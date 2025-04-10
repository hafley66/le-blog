import React from "react"
import {
  Observable,
  Subscription,
  delay,
  isObservable,
  merge,
  of,
} from "rxjs"
import {
  filter,
  map,
  scan,
  switchMap,
  tap,
} from "rxjs/operators"
import {
  TAG,
  combinePartialArray,
  combinePartialRecord,
  deferFrom,
} from "../../lib.dual.ts"
import { vhtml } from "../vhtml.deno.ts"

const isEmpty = (value: any) => {
  return (
    value == null || // From standard.js: Always use === - but obj == null is allowed to check null || undefined
    (typeof value === "object" &&
      Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  )
}

let ROOT_ID = 0
function styleToString(style: JSX.CSSProperties): string {
  return Object.entries(style)
    .filter(
      ([_, value]) => value !== undefined && value !== "",
    )
    .map(
      ([key, value]) =>
        `${key.replace(
          /[A-Z]/g,
          match => `-${match.toLowerCase()}`,
        )}:${value};`,
    )
    .join(" ")
}
let node_id = 0
export function jsx(
  tag: string | ((props: any) => Observable<string>),
  propsWithChildren:
    | JSX.IntrinsicElements[keyof JSX.IntrinsicElements]
    | null,
  key?: string,
): Observable<string> {
  let myId = node_id++
  // if (key) console.log({ propsWithChildren, key })
  const {
    children: _children,
    debug,
    "data-root-id": rootId,
    ...props
  } = propsWithChildren || {}
  function resolveObservable(
    value: any,
    meta: any,
  ): Observable<any> {
    if (isObservable(value)) {
      return value.pipe(
        map(v => {
          console.log(meta)
          // if (debug)
          // console.log("resolveObservable", value, v, meta)
          return v === null || v === undefined
            ? ""
            : v === 0
              ? "0"
              : Array.isArray(v)
                ? (console.log(tag, meta),
                  combinePartialArray(
                    v.map(i =>
                      isObservable(i) ? i : of(i),
                    ),
                  )).pipe(
                    map(partial =>
                      partial
                        .map(i => (i === 0 ? "0" : i))
                        .join(""),
                    ),
                  )
                : v === 0
                  ? "0"
                  : meta === "disabled" && tag === "button"
                    ? v
                      ? "true"
                      : undefined
                    : meta === "popover"
                      ? v
                        ? ""
                        : undefined
                      : String(v)
        }),
      )
    }
    return of(
      value === null || value === undefined
        ? ""
        : value === 0
          ? "0"
          : meta === "popover"
            ? value
              ? ""
              : undefined
            : String(value),
    )
  }
  const ME: Observable<string> = deferFrom(() => {
    if (typeof tag === "function") {
      debug &&
        console.log(
          "Calling child tag...",
          tag.name,
          rootId,
        )
      // @ts-ignore
      const it = tag({
        ...propsWithChildren,
        ...{ "data-root-id": ME.rootId },
      })
      it.rootId = ME.rootId
      it.parentKey = ME.parentKey
      it.key = key ? `${ME.parentKey}/${key}` : ME.key
      return it
    }

    try {
      // console.log({ _children })

      let childrenn = (
        !_children
          ? []
          : Array.isArray(_children)
            ? _children
            : [_children]
      )
        .filter(Boolean)
        .flat(3)

      const children$$ = new Observable<string>(S => {
        const subs: Subscription[] = []
        const latest = [] as string[]
        let isObservableChildren = false
        childrenn.forEach((it, index) => {
          if (typeof it === "string") {
            if (debug) console.log("A", it, tag)

            latest[index] = it
          } else if (isObservable(it)) {
            // debug && console.log("B", it, tag)
            isObservableChildren = true
            // Set up key hierarchy
            it.rootId = rootId
            let k = key || ME.key
            it.parentKey = k
            it.key = k + "/" + index
            // @ts-ignore
            it.rootId = rootId
            subs.push(
              it
                .pipe(
                  delay(1),
                  switchMap(i => {
                    if (Array.isArray(i)) {
                      if (debug)
                        console.log("BB", it, i, tag)
                      return i.length
                        ? combinePartialArray(
                            i.map(i => {
                              if (isObservable(i)) {
                                if (debug)
                                  console.log(
                                    "BBB",
                                    it,
                                    i,
                                    tag,
                                    props,
                                  )
                                i.rootId = ME.rootId
                                return i
                              }
                              if (debug)
                                console.log(
                                  "BBBB",
                                  it,
                                  i,
                                  tag,
                                  props,
                                )
                              return of(i)
                            }),
                          )
                        : of("")
                    }
                    if (isObservable(i)) {
                      if (debug)
                        console.log("C", it, i, tag)
                      i.rootId = ME.rootId
                      return i
                    }
                    if (debug) console.log("D", it, i, tag)
                    return of(i)
                  }),
                )
                .subscribe(next => {
                  if (debug) {
                    console.log(
                      "Tag",
                      tag,
                      "child#",
                      index,
                      next,
                    )
                  }
                  if (Array.isArray(next)) {
                    next = next.join("")
                  }
                  latest[index] = next as string
                  S.next(
                    latest
                      .map(v =>
                        // @ts-ignore
                        v === 0
                          ? "0"
                          : v === null || v === undefined
                            ? ""
                            : v,
                      )
                      .filter(Boolean)
                      .join(""),
                  )
                }),
            )
          }
        })
        if (!isObservableChildren) {
          S.next(latest.join(""))
        }
        return () => {
          subs.forEach(i => i.unsubscribe())
        }
      })

      // ../../../../node_modules/.bin/tsc --emitDeclarationOnly --declaration  --allowImportingTsExtensions --jsx react-jsx --esModuleInterop --outDir ./out  ./jsx-runtime.mts
      const attrObservables: Record<
        string,
        Observable<any>
      > = {}

      if (props) {
        for (const key in props) {
          const value = props[key]

          if (key === "style") {
            if (isObservable(value)) {
              // @ts-ignore boo shutup it works omg it works wow
              attrObservables[key] = (
                value as Observable<
                  string | number | boolean | Node
                >
              ).pipe(
                map<any, any>((v: any) =>
                  typeof v === "string"
                    ? v
                    : typeof v === "object" && !isEmpty(v)
                      ? styleToString(
                          v as JSX.CSSProperties,
                        )
                      : "",
                ),
              )
            } else if (
              typeof value === "object" &&
              !Array.isArray(value) &&
              !isEmpty(value)
            ) {
              attrObservables[key] = combinePartialRecord(
                Object.fromEntries(
                  Object.entries(value).map(i =>
                    isObservable(i[1])
                      ? i
                      : ([i[0], of(i[1])] as const),
                  ),
                ),
              ).pipe(
                map(value =>
                  styleToString(value as JSX.CSSProperties),
                ),
              )
            } else {
              attrObservables[key] = of(value as string)
            }
          } else if (key === "className") {
            let val = props.className!
            if (isObservable(val)) {
              attrObservables[key] = val.pipe(
                map(i =>
                  Array.isArray(i) ? i.join(" ") : i,
                ),
              )
            } else {
              attrObservables[key] = of(
                Array.isArray(val) ? val.join(" ") : val,
              )
            }
          } else if (isObservable(value)) {
            attrObservables[key] = resolveObservable(
              value,
              key,
            )
          } else {
            attrObservables[key] = of(value)
          }
        }
      }

      const attrs$ = Object.keys(attrObservables).length
        ? combinePartialRecord(attrObservables)
        : of({} as Record<string, string>)

      const children$ = childrenn.length ? children$$ : of()

      const hasProps = !!Object.keys(attrObservables).length
      const hasChildren = !!childrenn.length

      if (debug) {
        console.log(tag, {
          hasProps,
          hasChildren,
          propsWithChildren,
        })
      }

      return merge(
        attrs$.pipe(map(i => ["props", i] as const)),
        children$.pipe(map(i => ["children", i] as const)),
      ).pipe(
        // debug ? TAG(tag + "") : i => i,
        scan(
          (state, event) => ({
            props:
              event[0] === "props" ? event[1] : state.props,
            children:
              event[0] === "children"
                ? event[1]
                : state.children,
            propCount:
              state.propCount +
              Number(event[0] === "props"),
            childrenCount:
              state.childrenCount +
              Number(event[0] === "children"),
          }),
          {
            props: {},
            children: "",
            propCount: 0,
            childrenCount: 0,
          },
        ),
        filter(
          i =>
            !!(hasChildren
              ? i.childrenCount
              : hasProps
                ? i.propCount
                : true),
        ),
        switchMap(i => {
          return of(
            vhtml(
              tag,
              {
                ...i.props,
                // "data-root-id": ME.rootId,
                // "data-myId": "" + myId,
                // "data-myKey": key
                // ? `${ME.parentKey}/${key}`
                // : ME.key,
                // "data-parentKey": ME.parentKey,
              },
              i.children,
            ) as string,
          )
        }),
      )
    } catch (e) {
      console.error(e)
      return of("")
    }
  })
  // Thanks to defer from, we get this back propogation of rootId for free.
  ME.rootId = rootId || ROOT_ID++
  ME.key = key
  if (debug) console.log({ ME })
  return ME
}

export const jsxs = jsx
export default jsx
export type Prims =
  | number
  | string
  | boolean
  | null
  | Observable<
      | string
      | number
      | boolean
      | null
      | (string | number | boolean | null)[]
      | Observable<string | number | boolean | null>[]
    >

export type Node$ = Prims | Prims[]

export type RxJSXNode = Node$

export namespace RxJSX {
  export type Node = RxJSXNode
  export type FC<T extends Record<string, any>> = (
    props: T & {
      id?: string
      style?:
        | React.CSSProperties
        | Observable<React.CSSProperties>
      className?:
        | string
        | Observable<string | string[]>
        | string[]
      children?: RxJSXNode
      key?: string
    },
  ) => JSX.Element
}

// export type Props$<
//   T extends Record<string, any | Observable<any>>,
// > = {
//   [K in keyof T]: T[K] extends Observable<any>
//     ? T[K]
//     : Observable<T[K]>
// }

export type RxJSXComponent =
  | string
  | ((props: any) => JSX.Element)

export namespace JSX {
  export type Element = Observable<string>

  export interface CSSProperties
    extends React.CSSProperties {}

  interface ElementAttributesProperty {
    key?: string // specify the property name to use
  }

  export interface IntrinsicElements {
    [key: string]: {
      key?: string | number
      id?: string
      style?:
        | string
        | CSSProperties
        | Observable<CSSProperties>
      className?:
        | string
        | string[]
        | Observable<string | string[]>
      children?: RxJSXNode
    } & {
      [prop: string]:
        | string
        | number
        | boolean
        | Observable<string | number | boolean>
        | undefined
        | {}
    }
  }
}

export const Fragment = jsx
