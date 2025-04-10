// Listen to custom events for register and navigate relative to closest data-demo-root then find data-demo-mount
// Demo scripts will use register with there filename and main observable to subscribe and unsub from
// How to track registers and scope them to the nearest demo root? oof. Lets try to see if importfilename is same as src tag, then we can do DOM things from there

import {
  animationFrameScheduler,
  combineLatestWith,
  distinctUntilChanged,
  Observable,
  Subscription,
  tap,
  throttleTime,
} from "rxjs"
import React from "react"
import { deferFrom } from "../lib.dual"
import { VNode } from "snabbdom"

export const registeredDemos = {} as Record<
  string,
  | ((demoElement: HTMLElement) => Observable<any>)
  | (() => Observable<string> | React.ComponentType)
>

const activatedRootToTarget = {} as Record<
  string,
  Subscription
>

export const __activate_demo = (filename: string) => {
  const found = registeredDemos[filename]
  // console.log("Activating", filename, found)
  if (!found) console.log("not found", filename, found)
  const dirname =
    filename.split("/").slice(0, -1).join("/") + "/"
  const current = activatedRootToTarget[dirname]

  if (current) {
    console.log(
      "Unsupping current from group",
      dirname,
      current,
      filename,
    )
    current.unsubscribe()
  }

  setTimeout(() => {
    const target = document
      .getElementById(dirname)
      ?.querySelector(
        ".code-group-demo-area",
      ) as HTMLElement | null

    let next =
      found.length > 0
        ? target
          ? found(target)
          : null
        : // @ts-ignore
          found()

    // console.log({ dirname, target, next })
    if (
      target &&
      next &&
      "subscribe" in next &&
      "pipe" in next
    ) {
      let currentVnode = null as null | VNode
      let root = null as null | HTMLElement
      let differ: ((n: string) => void) | null = null
      activatedRootToTarget[dirname] = next
        .pipe(
          throttleTime(16, animationFrameScheduler, {
            leading: true,
            trailing: true,
          }),
          distinctUntilChanged(),
          combineLatestWith(
            deferFrom(
              () =>
                import("../rxjs-vhtml/diff-render.dom.tsx"),
            ),
          ),
          combineLatestWith(
            deferFrom(() =>
              import("../rxjs-vhtml/v3/util.dual.ts").then(
                i => i.snabPatch,
              ),
            ),
          ),
        )
        .pipe(
          tap({
            finalize: () => {
              root?.remove()
              console.log("finalize", filename)
            },
          }),
        )
        .subscribe({
          next: ([[n, diffDom], patch]) => {
            if (typeof n === "string") {
              if (!root) {
                root = diffDom.htmlToNode(n)
                if (root) {
                  target.appendChild(root)
                }
              }
              differ ||= diffDom.makeDiffer(root, dirname)
              differ?.(n)
            } else {
              if (!root) {
                root = document.createElement(
                  (n as VNode).sel,
                )
                if (root) {
                  target.appendChild(root)
                }
              }
              if (!currentVnode) {
                // First render
                patch(root, n)
              } else {
                // Update existing DOM
                patch(currentVnode, n)
              }
              currentVnode = n
            }
          },
          error: e => {
            root?.remove()
            target?.appendChild(
              (() => {
                const d = document.createElement("div")
                d.innerHTML = "/*ERROR*/\n  " + String(e)
                return d
              })(),
            )
          },
        })
    } else if (target && next) {
      activatedRootToTarget[dirname] = new Observable<any>(
        s => {
          let root = null as any
          Promise.all([
            import("react-dom/client"),
            import("react"),
          ]).then(
            ([
              { createRoot },
              { createElement, isValidElement },
            ]) => {
              try {
                root = createRoot(target)
                root.render(
                  isValidElement(next)
                    ? next
                    : createElement(
                        next as React.ComponentType,
                      ),
                )
              } catch (e) {
                root.unmount()
              }
            },
          )
          return () => {
            root?.unmount()
          }
        },
      ).subscribe({
        error: e =>
          target?.appendChild(
            (() => {
              const d = document.createElement("div")
              d.innerHTML = "/*ERROR*/\n  " + String(e)
              return d
            })(),
          ),
      })
    }
  }, 20)
}

// export const listenForActivateDemo = () => {
//   // @ts-ignore
//   document.body.addEventListener(
//     CE_DEMO_RUNNER_ACTIVATE,
//     (
//       ce: CustomEvent<{
//         importFileName: string
//       }>,
//     ) => {
//       __activate_demo(ce.detail.importFileName)
//     },
//   )
// }

export const listenForInputIdAsKey = () => {
  document.body.addEventListener("input", ({ target }) => {
    if (!(target instanceof HTMLInputElement)) return
    if (target.checked) {
      const path = `${target.name}${target.value}`
      if (path in registeredDemos) {
        __activate_demo(path)
      }
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  // listenForDemos()
  // listenForActivateDemo()
  listenForInputIdAsKey()
})

window.demoRunner = {
  registry: registeredDemos,
  active: activatedRootToTarget,
  activate: __activate_demo,
}
