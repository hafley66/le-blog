import {
  Observable,
  Subscription,
  isObservable,
  of,
  combineLatest,
} from "rxjs"
import { map, switchMap } from "rxjs/operators"
import {
  combinePartialArray,
  combinePartialRecord,
} from "../../lib.dual.ts"

// Import Snabbdom modules
import { init, VNode } from "snabbdom"
import { propsModule } from "snabbdom"
import { styleModule } from "snabbdom"
import { eventListenersModule } from "snabbdom"
import { classModule } from "snabbdom"
import { attributesModule } from "snabbdom"
import { h } from "snabbdom"

// Initialize Snabbdom with modules
export const snabPatch = init([
  propsModule,
  styleModule,
  eventListenersModule,
  classModule,
  attributesModule,
])

// Utility functions
export const isEmpty = (value: any): boolean => {
  return (
    value == null ||
    (typeof value === "object" &&
      Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  )
}

// Process style objects for Snabbdom
export function processStyle(
  style: string | Record<string, string>,
): Record<string, string> {
  if (typeof style === "string") {
    const result: Record<string, string> = {}
    style.split(";").forEach(rule => {
      const [key, value] = rule.split(":")
      if (key && value) {
        const camelKey = key
          .trim()
          .replace(/-([a-z])/g, (_, char) =>
            char.toUpperCase(),
          )
        result[camelKey] = value.trim()
      }
    })
    return result
  }
  return style as Record<string, string>
}

// Helper to convert values to appropriate format
export function normalizeValue(
  value: any,
  meta?: string,
  tag?: string,
): any {
  if (value === null || value === undefined) return ""
  if (value === 0) return "0"

  if (meta === "disabled" && tag === "button") {
    return value ? true : undefined
  }

  if (meta === "popover") {
    return value ? "" : undefined
  }

  return value
}

// Resolve observable or static value
export function resolveObservable(
  value: any,
  meta?: string,
  tag?: string,
): Observable<any> {
  if (isObservable(value)) {
    return value.pipe(
      map(v => {
        if (v === null || v === undefined) return ""
        if (v === 0) return "0"

        if (Array.isArray(v)) {
          return combinePartialArray(
            v.map(i => (isObservable(i) ? i : of(i))),
          ).pipe(
            map(partial =>
              partial.map(i => (i === 0 ? "0" : i)),
            ),
          )
        }

        return normalizeValue(v, meta, tag)
      }),
    )
  }

  return of(normalizeValue(value, meta, tag))
}

// Convert primitive values to text nodes
export function primitiveToVNode(
  value: string | number,
): VNode {
  return h("text", value.toString())
}

// Process style prop
export function processStyleProp(
  value: any,
): Observable<Record<string, string>> {
  if (isObservable(value)) {
    return value.pipe(
      map(v =>
        typeof v === "string"
          ? processStyle(v)
          : typeof v === "object" && !isEmpty(v)
            ? v
            : {},
      ),
    )
  }

  if (
    typeof value === "object" &&
    !Array.isArray(value) &&
    !isEmpty(value)
  ) {
    return combinePartialRecord(
      Object.fromEntries(
        Object.entries(value).map(([k, v]) =>
          isObservable(v) ? [k, v] : ([k, of(v)] as const),
        ),
      ),
    )
  }

  return of(processStyle(value as string))
}

// Process className prop
export function processClassNameProp(
  value: any,
): Observable<string> {
  return isObservable(value)
    ? value.pipe(
        map(v => (Array.isArray(v) ? v.join(" ") : v)),
      )
    : of(Array.isArray(value) ? value.join(" ") : value)
}

// Create a children observable that handles path propagation
export function createChildrenObservable(
  children: any[],
  rootId: number,
  parentKey: string,
  debug?: boolean,
): Observable<VNode[]> {
  return new Observable<VNode[]>(subscriber => {
    const subs: Subscription[] = []
    const latest: VNode[] = []
    let hasObservableChildren = false

    children.forEach((child, index) => {
      debug && console.log(index, child)
      // Handle primitive children
      if (
        typeof child === "string" ||
        typeof child === "number"
      ) {
        latest[index] = primitiveToVNode(child)
      }
      // Handle observable children
      else if (isObservable(child)) {
        hasObservableChildren = true

        // Set up key hierarchy
        child.rootId = rootId
        child.parentKey = parentKey
        child.key = parentKey + "/" + index

        subs.push(
          child
            .pipe(
              switchMap(value => {
                // Handle arrays of observables
                if (Array.isArray(value)) {
                  return value.length
                    ? combinePartialArray(
                        value.map(item =>
                          isObservable(item)
                            ? item
                            : of(item),
                        ),
                      )
                    : of([])
                }

                // Handle nested observables
                if (isObservable(value)) {
                  value.rootId = rootId
                  return value
                }

                return of(value)
              }),
            )
            .subscribe(next => {
              debug && console.log("Child#", index, next)

              if (Array.isArray(next)) {
                latest[index] = next as unknown as VNode
              } else if (
                typeof next === "string" ||
                typeof next === "number"
              ) {
                latest[index] = primitiveToVNode(next)
              } else {
                latest[index] = next as VNode
              }
              debug && console.log({ latest })
              subscriber.next(latest.filter(Boolean))
            }),
        )
      }
    })

    // Emit initial children if no observables
    if (!hasObservableChildren) {
      subscriber.next(latest.filter(Boolean))
    }

    return () => {
      subs.forEach(sub => sub.unsubscribe())
    }
  })
}

// Process props into observables
export function processProps(
  props: Record<string, any> | null | undefined,
  tag: string,
): Record<string, Observable<any>> {
  const attrObservables: Record<
    string,
    Observable<any>
  > = {}

  if (!props) return attrObservables

  for (const key in props) {
    const value = props[key]

    // Handle style prop
    if (key === "style") {
      attrObservables[key] = processStyleProp(value)
    }
    // Handle className prop
    else if (key === "className") {
      attrObservables["class"] = processClassNameProp(value)
    }
    // Handle other props
    else {
      attrObservables[key] = isObservable(value)
        ? resolveObservable(value, key, tag)
        : of(value)
    }
  }

  return attrObservables
}

// Add data attributes to props
export function addDataAttributes(
  props: Record<string, any>,
  nodeId: number,
  rootId: number,
  key?: string,
  parentKey?: string,
): Record<string, any> {
  props.attrs = props.attrs || {}
  props.attrs["data-root-id"] = rootId
  props.attrs["data-myId"] = "" + nodeId

  if (key) {
    props.attrs["data-myKey"] = parentKey
      ? `${parentKey}/${key}`
      : key
  }

  if (parentKey) {
    props.attrs["data-parentKey"] = parentKey
  }

  return props
}

// Process fragments
export function processFragments(
  vnode: VNode,
): VNode[] | VNode {
  if (vnode.sel === "fragment") {
    return vnode.children as VNode[]
  }

  // Process children recursively
  if (vnode.children && Array.isArray(vnode.children)) {
    const processedChildren: VNode[] = []
    for (const child of vnode.children) {
      const processed = processFragments(child)
      if (Array.isArray(processed)) {
        processedChildren.push(...processed)
      } else {
        processedChildren.push(processed)
      }
    }
    vnode.children = processedChildren
  }

  return vnode
}
