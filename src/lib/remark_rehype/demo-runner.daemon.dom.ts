// Listen to custom events for register and navigate relative to closest data-demo-root then find data-demo-mount
// Demo scripts will use register with there filename and main observable to subscribe and unsub from
// How to track registers and scope them to the nearest demo root? oof. Lets try to see if importfilename is same as src tag, then we can do DOM things from there

import type { Observable, Subscription } from "rxjs"
import {
  CE_DEMO_RUNNER_ACTIVATE,
  CE_REGISTER_DEMO_CUSTOM_EVENT,
  DATA_DEMO_ROOT,
  DATA_DEMO_TARGET,
} from "./demo-runner.dual"

export const registeredDemos = {} as Record<
  string,
  {
    target: HTMLElement | null
    mount: (demoElement: HTMLElement) => Observable<any>
  }
>

export const listenForDemos = () => {
  // @ts-ignore
  document.body.addEventListener(
    CE_REGISTER_DEMO_CUSTOM_EVENT,
    (
      ce: CustomEvent<{
        importFileName: string
        demo: (demoElement: HTMLElement) => Observable<any>
      }>,
    ) => {
      const found = document.querySelector(
        `script[src="${ce.detail.importFileName}"]`,
      )

      const root =
        (found?.closest(
          `[${DATA_DEMO_ROOT}]`,
        ) as HTMLElement) ?? null

      registeredDemos[ce.detail.importFileName] = {
        mount: ce.detail.demo,
        target: root?.querySelector(
          `[${DATA_DEMO_TARGET}]`,
        ),
      }

      console.log({ found, ce })
    },
  )
}

const activatedRootToTarget = new Map<
  HTMLElement,
  Subscription | null
>()

export const listenForActivateDemo = () => {
  // @ts-ignore
  document.body.addEventListener(
    CE_DEMO_RUNNER_ACTIVATE,
    (
      ce: CustomEvent<{
        importFileName: string
      }>,
    ) => {
      // registeredDemos[ce.detail.importFileName] =
      //   ce.detail.demo
      const found =
        registeredDemos[ce.detail.importFileName]

      if (!found || !found.target)
        console.log("not found", ce, found)

      const current = activatedRootToTarget.get(
        found.target!,
      )

      if (current) current.unsubscribe()

      setTimeout(() => {
        activatedRootToTarget.set(
          found.target!,
          found.mount(found.target!).subscribe(),
        )
      }, 1)

      console.log({ found, ce })
    },
  )
}

window.registered_demos = registeredDemos

listenForDemos()
listenForActivateDemo()
