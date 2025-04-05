import type { Observable } from "rxjs"
import {
  __activate_demo,
  registeredDemos,
} from "../remark_rehype/demo-runner.daemon.dom.ts"
import type { ComponentType } from "react"

export function autoDemo(
  fsfilename: string,
  me:
    | ((demoElement: HTMLElement) => Observable<any>)
    | (() => Observable<string> | ComponentType<{}>),
) {
  registeredDemos[fsfilename] = me
  __activate_demo(fsfilename)
}

import {
  fromEventPattern,
  map,
  startWith,
  distinctUntilChanged,
} from "rxjs"

// turns NamedNodeMap into a props object
function attrsToProps<T>(el: Element): T {
  const out: any = {}
  for (const attr of Array.from(el.attributes)) {
    out[attr.name] = attr.value
  }
  return out
}

export function defineReactiveComponent<Props>(
  tag: string,
  render: (props: Observable<Props>) => Observable<string>,
  changeDom = (root: HTMLElement, next: string) => {
    root.innerHTML = next
  },
) {
  class ReactiveElement extends HTMLElement {
    private observer?: MutationObserver

    connectedCallback() {
      const element = this

      const attributeChanges$: Observable<Props> =
        fromEventPattern<MutationRecord[]>(
          handler => {
            this.observer = new MutationObserver(handler)
            this.observer.observe(element, {
              attributes: true,
            })
          },
          () => this.observer?.disconnect(),
        ).pipe(
          startWith([]), // trigger initial render
          map(() => attrsToProps<Props>(element)),
          distinctUntilChanged(
            (a, b) =>
              JSON.stringify(a) === JSON.stringify(b),
          ), // adjust as needed
        )

      this.attach(render(attributeChanges$))
    }

    disconnectedCallback() {
      this.observer?.disconnect()
    }

    private attach(attr$: Observable<string>) {
      attr$.subscribe(props => {
        changeDom(this, props)
      })
    }
  }

  customElements.define(tag, ReactiveElement)
}
