import React from "react"
import _ from "lodash"
import {
  delay,
  isObservable,
  merge,
  Observable,
  of,
  Subscription,
} from "rxjs"
import {
  filter,
  map,
  scan,
  switchMap,
  tap,
} from "rxjs/operators"
import {
  combinePartialArray,
  combinePartialRecord,
  TAG,
} from "../../lib.dual.ts"
import { Attributes, vhtml } from "../vhtml.deno.ts"

const { isEmpty } = _

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

export function jsx(
  tag: string,
  propsWithChildren:
    | JSX.IntrinsicElements[keyof JSX.IntrinsicElements]
    | null,
): Observable<string> {
  function resolveObservable(
    value: any,
    meta: any,
  ): Observable<any> {
    if (isObservable(value)) {
      return value.pipe(
        map(v =>
          v == null
            ? ""
            : Array.isArray(v)
              ? (console.log(tag, meta),
                combinePartialArray(
                  v.map(i => (isObservable(i) ? i : of(i))),
                )).pipe(map(partial => partial.join("")))
              : String(v),
        ),
      )
    }
    return of(value == null ? "" : String(value))
  }

  try {
    if (typeof tag === "function") {
      // @ts-ignore
      return tag(propsWithChildren)
    }
    const {
      children: _children,
      debug,
      ...props
    } = propsWithChildren || {}

    let childrenn = (
      !_children
        ? []
        : Array.isArray(_children)
          ? _children
          : [_children]
    )
      .filter(Boolean)
      .flat()

    const children$$ = new Observable<string>(S => {
      const subs: Subscription[] = []
      const latest = [] as string[]
      let isObservableChildren = false
      childrenn.forEach((it, index) => {
        if (typeof it === "string") {
          latest[index] = it
        } else if (isObservable(it)) {
          isObservableChildren = true
          subs.push(
            it.pipe(delay(1)).subscribe(next => {
              latest[index] = next as string
              S.next(latest.filter(Boolean).join(""))
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
                    ? styleToString(v as JSX.CSSProperties)
                    : "",
              ),
            )
          } else if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            !isEmpty(value)
          ) {
            attrObservables[key] = of(
              styleToString(value as JSX.CSSProperties),
            )
          } else {
            attrObservables[key] = of(value as string)
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
      console.log(tag, { hasProps, hasChildren })
    }

    return merge(
      attrs$.pipe(map(i => ["props", i] as const)),
      children$.pipe(map(i => ["children", i] as const)),
    ).pipe(
      debug ? TAG(tag + "") : i => i,
      scan(
        (state, event) => ({
          props:
            event[0] === "props" ? event[1] : state.props,
          children:
            event[0] === "children"
              ? event[1]
              : state.children,
          propCount:
            state.propCount + Number(event[0] === "props"),
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
}

export const jsxs = jsx
export default jsx

export type RxJSXNode =
  | string
  | string[]
  | JSX.Element
  | JSX.Element[]
  | (string | JSX.Element)[]

export namespace RxJSX {
  export type Node = RxJSXNode
  export type FC<T extends Record<string, any>> =
    Props$<T> & {
      id?: string
      style?:
        | React.CSSProperties
        | Observable<React.CSSProperties>
      className?:
        | string
        | number
        | Observable<string | number>
      children?: RxJSXNode
    }
}

export type Props$<
  T extends Record<string, any | Observable<any>>,
> = {
  [K in keyof T]: T[K] extends Observable<any>
    ? T[K]
    : Observable<T[K]>
}

export namespace JSX {
  export type Element = Observable<string>

  export interface CSSProperties
    extends React.CSSProperties {}

  export interface IntrinsicElements {
    [key: string]: {
      id?: string
      style?: CSSProperties | Observable<CSSProperties>
      className?:
        | string
        | number
        | Observable<string | number>
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
