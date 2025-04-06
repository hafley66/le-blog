import React from "react"
import {
  Observable,
  Subscription,
  isObservable,
  merge,
  of,
} from "rxjs"
import { filter, map, scan } from "rxjs/operators"
import {
  combinePartialArray,
  combinePartialRecord,
  deferFrom,
  TAG,
} from "../../lib.dual.ts"
import { VNode, h } from "snabbdom"
import {
  addDataAttributes,
  createChildrenObservable,
  processFragments,
  processProps,
  primitiveToVNode,
  snabPatch as patch,
} from "./util.dual.ts"

// ID generators for tracking nodes
export let ROOT_ID = 0
export let NODE_ID = 0

export function jsx(
  tag: string | ((props: any) => Observable<VNode>),
  propsWithChildren:
    | JSX.IntrinsicElements[keyof JSX.IntrinsicElements]
    | null,
  key?: string,
): Observable<VNode> {
  const nodeId = NODE_ID++
  const {
    children: _children,
    debug,
    "data-root-id": rootId,
    ...props
  } = propsWithChildren || {}

  const ME: Observable<VNode> = deferFrom(() => {
    // Handle functional components
    if (typeof tag === "function") {
      debug &&
        console.log(
          "Calling child tag...",
          tag.name,
          rootId,
        )
      return tag({
        ...propsWithChildren,
        "data-root-id": ME.rootId,
      })
    }

    try {
      // Process children
      const children = (
        !_children
          ? []
          : Array.isArray(_children)
            ? _children
            : [_children]
      )
        .filter(Boolean)
        .flat(3)

      debug && console.log({ children })

      // Create children observable
      const children$ = createChildrenObservable(
        children,
        ME.rootId,
        key || ME.key,
        debug,
      )

      // Process props
      const attrObservables = processProps(
        props,
        tag as string,
      )

      const attrs$ = Object.keys(attrObservables).length
        ? combinePartialRecord(attrObservables)
        : of({} as Record<string, any>)

      const hasProps = !!Object.keys(attrObservables).length
      const hasChildren = !!children.length

      if (debug) {
        console.log(tag, {
          hasProps,
          hasChildren,
          propsWithChildren,
        })
      }

      // Combine props and children updates
      return merge(
        attrs$.pipe(
          map(attrs => ["props", attrs] as const),
        ),
        children$.pipe(
          debug ? TAG("CHILDREN") : i => i,
          map(children => ["children", children] as const),
        ),
      ).pipe(
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
            children: [] as VNode[],
            propCount: 0,
            childrenCount: 0,
          },
        ),
        // Only emit when we have the required data
        filter(
          state =>
            !!(hasChildren
              ? state.childrenCount
              : hasProps
                ? state.propCount
                : true),
        ),
        map(state => {
          // Add data attributes to props
          const snabbdomProps = addDataAttributes(
            { ...state.props },
            nodeId,
            ME.rootId,
            key,
            ME.parentKey,
          )
          debug &&
            console.log(
              "State.children",
              state.children.length,
            )
          // Create Snabbdom VNode
          return h(
            tag as string,
            snabbdomProps,
            state.children,
          )
        }),
      )
    } catch (error) {
      console.error(error)
      return of(
        h(
          "div",
          { attrs: { class: "error" } },
          "Error rendering component",
        ),
      )
    }
  })

  // Set up rootId and key
  ME.rootId = rootId || ROOT_ID++
  ME.key = key

  return ME
}

export const Fragment = (props: {
  children: RxJSXNode
}): Observable<VNode> => {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children]

  return combinePartialArray(
    children
      .filter(Boolean)
      .map(child =>
        isObservable(child)
          ? child
          : of(
              typeof child === "string" ||
                typeof child === "number"
                ? primitiveToVNode(child)
                : (child as VNode),
            ),
      ),
  ).pipe(
    map(nodes => h("fragment", {}, nodes.filter(Boolean))),
  )
}

// Helper function to render a VNode to a DOM element
export function renderToDOM(
  vnode$: Observable<VNode>,
  container: Element,
): Subscription {
  let currentVNode: VNode | undefined

  return vnode$.subscribe(newVNode => {
    if (!currentVNode) {
      // First render
      patch(container, newVNode)
    } else {
      // Update existing DOM
      patch(currentVNode, newVNode)
    }
    currentVNode = newVNode
  })
}

export const jsxs = jsx
export default jsx

export type Prims_ =
  | null
  | number
  | string
  | boolean
  | VNode
export type ObsPrims_ = Observable<
  null | number | string | boolean | VNode
>

// Type definitions
export type Prims =
  | Prims_
  | Observable<
      | null
      | number
      | string
      | boolean
      | VNode
      | (null | number | string | boolean | VNode)[]
      | Observable<VNode>
      | Observable<
          null | number | string | boolean | VNode
        >[]
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

export type RxJSXComponent =
  | string
  | ((props: any) => JSX.Element)

export namespace JSX {
  export type Element = Observable<VNode>
  export interface CSSProperties
    extends React.CSSProperties {}

  interface ElementAttributesProperty {
    key?: string
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
