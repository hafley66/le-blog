import { Observable } from "rxjs"

export const event$ = function fromEventDelegateCurry(
  selector: string,
) {
  return function innerEvent$<
    K extends keyof HTMLElementEventMap,
  >(event: K) {
    return fromEventDelegate(selector, event)
  }
}

/**
 * Creates an observable that emits events of a specific type from elements matching a selector.
 * Basically jQuery style event delegation with precise selectors. This kinda falls apart when you are mapping over elements in rxjs+react,
 * rxjs is only good at singletons in react.
 *
 * @example
 * const buttonClicks = fromEventDelegate("button", "click");
 *
 * buttonClicks.subscribe(event => {
 *   console.log("Button clicked:", event);
 * });
 */
export function fromEventDelegate<
  K extends keyof HTMLElementEventMap,
>(
  selector: string,
  eventName: K,
  root = document.body,
  capture = false,
): Observable<
  K extends "input"
    ? Omit<HTMLElementEventMap[K], "target"> & {
        target: HTMLInputElement
      }
    : HTMLElementEventMap[K] extends {
          target: EventTarget | null
        }
      ? Omit<HTMLElementEventMap[K], "target"> & {
          target: HTMLElement
        }
      : HTMLElementEventMap[K]
> {
  return new Observable<
    K extends "input"
      ? Omit<HTMLElementEventMap[K], "target"> & {
          target: HTMLInputElement
        }
      : HTMLElementEventMap[K] extends {
            target: EventTarget | null
          }
        ? Omit<HTMLElementEventMap[K], "target"> & {
            target: HTMLElement
          }
        : HTMLElementEventMap[K]
  >(sub => {
    const fn = (event: HTMLElementEventMap[K]) => {
      const { target } = event
      if (!(target instanceof HTMLElement)) {
        return
      }
      if (target?.matches(selector)) {
        sub.next(
          // @ts-ignore
          event,
        )
      }
    }
    // console.log("Adding to   ", root, eventName, selector, fn)
    root.addEventListener(eventName, fn, capture)

    // const observer = new MutationObserver(mutations => {
    //   mutations.forEach(mutation => {
    //     if (mutation.type === "childList") {
    //       mutation.addedNodes.forEach(node => {
    //         if (
    //           node instanceof HTMLElement &&
    //           node.matches(selector)
    //         ) {
    //           node.addEventListener(eventName, fn, capture)
    //         }
    //       })
    //     }
    //   })
    // })

    // observer.observe(root, {
    //   childList: true,
    //   subtree: true,
    // })

    // const all = document.querySelectorAll(selector)
    // all.forEach(node => {
    //   if (node instanceof HTMLElement)
    //     node.addEventListener(eventName, fn, capture)
    // })

    return () => {
      root.removeEventListener(eventName, fn, capture)
      // observer.disconnect()
      // all.forEach(node => {
      //   if (node instanceof HTMLElement)
      //     node.removeEventListener(eventName, fn, capture)
      // })
    }

    // root.addEventListener(eventName, fn, capture)
    // return () => {
    //   root.removeEventListener(eventName, fn, capture)
    // }
  })
}

// type TemplateStringsArrayTYPED<T extends string> =
//   ReadonlyArray<T> & {
//     readonly raw: readonly string[]
//   }

export function pre<P extends string>(prefix: P) {
  // Template string function
  // function template(strings: TemplateStringsArray, ...values: any[]) {
  // 	return `${prefix}-${strings[0]}`;
  // }

  // Alternative function call
  function altCall<T extends string>(
    value: T,
  ): `${P}-${T}` {
    return `${prefix}-${value}`
  }
  return altCall
  // // Ensure the function can be called as both a template function and a normal function
  // function resultFunction<T extends any[]>(
  //   ...args: T
  // ): T[0] extends TemplateStringsArrayTYPED<infer U>
  //   ? `${P}-${U}`
  //   : T[0] extends string
  //     ? `${P}-${T[0]}`
  //     : never {
  //   if (Array.isArray(args[0])) {
  //     // @ts-ignore
  //     return template(
  //       // @ts-ignore
  //       args[0] as TemplateStringsArray,
  //       ...args.slice(1),
  //     )
  //   }
  //   // @ts-ignore
  //   return altCall(args[0])
  // }

  // Set the function name
  // Object.defineProperty(resultFunction, "name", {
  //   value: prefix,
  // })

  // return resultFunction
}

const NS = pre("task")

// const A = NS`list` // Outputs: task-list
const B = NS("list") // Outputs: task-list
const C = NS.name // Outputs: task
