import {
  isObservable,
  map,
  mergeWith,
  share,
  startWith,
  tap,
} from "rxjs"
import jsx, {
  RxJSXComponent,
} from "~/lib/rxjs-vhtml/v2/jsx-runtime"

import {
  HtmlEvent,
  HtmlEventIndex$,
} from "~/lib/rxjs-vhtml/v2/types.dom.events.dom.ts"
import { TaggedComponent } from "./types.dual"
import { fromEventDelegate } from "../lib.dom"
import { TAG } from "../lib.dual"

const NONE = Symbol("NONE")
export function withSelector<
  T extends RxJSXComponent = RxJSXComponent,
  ClassName extends string = string,
>(
  Tag: T,
  selector: ClassName,
  staticProps: any = {},
): TaggedComponent<T, ClassName> {
  const it = {
    [selector](
      props: T extends (...args: any[]) => any
        ? Parameters<T>[0]
        : any,
    ) {
      return jsx(Tag, {
        ...staticProps,
        ...props,
        ...(selector.startsWith(".")
          ? {
              className: [
                selector.replace(".", ""),
                staticProps.className,
                props.className,
              ]
                .flat(3)
                .filter(Boolean),
            }
          : selector.startsWith("#")
            ? {
                id: selector.replace("#", ""),
              }
            : {}),
      })
    },
  }[selector]

  // @ts-ignore
  it.selector = selector
  const eventStreamCache = {} as Record<string, any>

  // @ts-ignore
  it.$ = new Proxy(eventStreamCache, {
    get(target, p: HtmlEvent, receiver) {
      if (p in target) return target[p]
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      return (eventStreamCache[p] ||= fromEventDelegate(
        selector,
        p as HtmlEvent,
      )).pipe(share())
    },
  }) as unknown as HtmlEventIndex$

  const value$s = {} as Record<string, any>

  // @ts-ignore
  it.value$ = new Proxy(value$s, {
    get(target, p: string, receiver) {
      console.log(
        "I am inside value$ getter",
        p,
        target,
        Object.keys(target),
      )
      if (p in target) return target[p]
      if (
        [
          "text",
          "checkbox",
          "number",
          "open",
          "date",
          "select",
          "selectNumber",
          "multiSelect",
          "radio",
          "commaString",
        ].includes(p)
      ) {
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        return (target[p] = (_startWith: any = NONE) =>
          // @ts-ignore
          it.$.input.pipe(
            map((i: InputEvent) => {
              if (
                p === "text" ||
                p === "select" ||
                p === "selectNumber"
              )
                return p === "selectNumber"
                  ? +(i.target as HTMLInputElement).value
                  : (i.target as HTMLInputElement).value
              if (p === "commaString")
                return (i.target as HTMLInputElement).value
                  ?.split(",")
                  .map(i => i.trim())
              if (p === "number")
                return (i.target as HTMLInputElement)
                  .valueAsNumber
              if (p === "checkbox")
                return (i.target as HTMLInputElement)
                  .checked
              if (p === "radio")
                return (i.target as HTMLInputElement).value
              if (p === "date")
                return (i.target as HTMLInputElement)
                  .valueAsDate
              if (p === "open")
                return !!(
                  i.target as
                    | HTMLDetailsElement
                    | HTMLDialogElement
                ).open
            }),
            mergeWith(
              _startWith.pipe(
                tap(i => {
                  // console.log(
                  //   "TAP",
                  //   i,
                  //   value$s,
                  //   Tag,
                  //   it.ref(),
                  //   selector,
                  // )
                  if (!it.ref()) return
                  if (p === "radio" || p === "checkbox") {
                    it.ref().checked = !!i
                    return
                  }
                  if (p === "open") {
                    it.ref().open = i
                  }
                  if (p === "date") {
                    it.ref().valueAsDate = i
                    return
                  }
                  if (p === "commaString") {
                    it.ref().value = i.join(", ")
                    return
                  }
                  it.ref().value = i
                  return
                }),
              ),
            ),
          ))
      }
      return target[p]
    },
  })

  // @ts-ignore
  it.$capture = new Proxy(eventStreamCache, {
    get(target, p: HtmlEvent, receiver) {
      if (p in target) return target[p]
      // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      return (eventStreamCache[p] ||= fromEventDelegate(
        selector,
        p as HtmlEvent,
        document.body,
        true,
      )).pipe(share())
    },
  }) as unknown as HtmlEventIndex$

  // @ts-ignore
  it.ref = () => document.querySelector(selector)

  // @ts-ignore
  return it
}

export function withClass<
  T extends RxJSXComponent = RxJSXComponent,
  ID extends string = string,
>(
  Tag: T,
  className: ID,
  staticProps: any = {},
): TaggedComponent<T, `.${ID}`> & { className: ID } {
  const it = withSelector(Tag, `.${className}`, staticProps)
  // @ts-ignore
  it.className = className
  // @ts-ignore
  return it
}

export function withId<
  T extends RxJSXComponent = RxJSXComponent,
  ID extends string = string,
>(
  Tag: T,
  id: ID,
  extraProps?: any,
): TaggedComponent<T, `#${ID}`> & { id: ID } {
  const it = withSelector(Tag, `#${id}`, extraProps)
  // @ts-ignore
  it.id = id
  // @ts-ignore
  return it
}
