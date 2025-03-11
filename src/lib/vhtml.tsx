import vhtml from "vhtml"
import {
  Observable,
  isObservable,
  combineLatest,
  of,
  merge,
} from "rxjs"
import { map, scan, tap } from "rxjs/operators"

function resolveObservable(value: any): Observable<string> {
  if (isObservable(value)) {
    return value.pipe(
      map(v => (v == null ? "" : String(v))),
    )
  }
  return of(value == null ? "" : String(value))
}

export function sillyJsx$(
  tag: string | Function,
  props: Record<string, any> | null,
  ...children: any[]
): Observable<string> {
  const attrObservables: Record<
    string,
    Observable<string>
  > = {}
  const childrenObservables: Observable<string>[] = []

  if (props) {
    for (const key in props) {
      if (isObservable(props[key])) {
        attrObservables[key] = resolveObservable(props[key])
      }
    }
  }

  children.forEach(child => {
    childrenObservables.push(resolveObservable(child))
  })

  const attrs$ = Object.keys(attrObservables).length
    ? combineLatest(attrObservables)
    : of({})

  const children$ = childrenObservables.length
    ? combineLatest(childrenObservables).pipe(
        map(resolvedChildren => resolvedChildren.join("")),
      )
    : of("")

  return merge(
    attrs$.pipe(map(i => ["props", i] as const)),
    children$.pipe(map(i => ["children", i] as const)),
  ).pipe(
    tap(i => console.log("A", i)),
    scan(
      (state, event) => ({
        props:
          event[0] === "props" ? event[1] : state.props,
        children:
          event[0] === "children"
            ? event[1]
            : state.children,
      }),
      { props: {}, children: "" },
    ),
    tap(i => console.log("B", i)),
    map(i => vhtml(tag, i.props, i.children)),
  )
}
