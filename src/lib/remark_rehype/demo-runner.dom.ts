import { Observable, tap } from "rxjs"
import {
  CE_DEMO_RUNNER_ACTIVATE,
  CE_REGISTER_DEMO_CUSTOM_EVENT,
} from "./demo-runner.dual"
import { createRoot } from "react-dom/client"
import React from "react"

export const registerDemo = (
  importFileName: string,
  demo: (target: HTMLElement) => Observable<any>,
) => {
  const it = new CustomEvent(
    CE_REGISTER_DEMO_CUSTOM_EVENT,
    {
      detail: {
        importFileName,
        demo,
      },
    },
  )

  document.body.dispatchEvent(it)
}

export const activateDemo = (importFileName: string) => {
  new CustomEvent(CE_DEMO_RUNNER_ACTIVATE, {
    detail: importFileName,
  })
}

export const registerRxJSXDemo = (
  importFileName: string,
  jsx: () => Observable<string>,
) => {
  registerDemo(importFileName, target =>
    jsx().pipe(
      tap({
        next: n => (target.innerHTML = n),
        finalize: () => (target.innerHTML = ""),
      }),
    ),
  )
}

export const registerReactDemo = (
  importFileName: string,
  Comp: React.ComponentType,
) => {
  registerDemo(
    importFileName,
    target =>
      new Observable(s => {
        const root = createRoot(target)
        root.render(React.createElement(Comp))
        return () => {
          root.unmount()
        }
      }),
  )
}
