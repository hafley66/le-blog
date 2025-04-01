import { compute } from "compute-scroll-into-view"

const getScrollPaddings = (target: Element) => {
  const computedStyle = window.getComputedStyle(target)
  return {
    // biome-ignore lint/style/useNumberNamespace: <explanation>
    top: parseFloat(computedStyle.scrollPaddingTop) || 0,
    right:
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      parseFloat(computedStyle.scrollPaddingRight) || 0,
    bottom:
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      parseFloat(computedStyle.scrollPaddingBottom) || 0,
    // biome-ignore lint/style/useNumberNamespace: <explanation>
    left: parseFloat(computedStyle.scrollPaddingLeft) || 0,
  }
}

export function scrollIntoView<T = unknown>(
  target: HTMLElement,
  options: Parameters<typeof compute>[1] & {
    behavior: ScrollBehavior
  },
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
): T | void {
  for (const { el, top, left } of compute(
    target,
    options,
  )) {
    // Get scrolling element's scroll-padding
    const scrollPaddings = getScrollPaddings(target)

    // Subtract padding from computed top
    const topWithPadding = top - scrollPaddings.top

    // Make sure to not scroll too far down
    const safeMin =
      target.offsetTop +
      target.getBoundingClientRect().height +
      scrollPaddings.bottom -
      el.clientHeight
    console.log({ scrollPaddings, topWithPadding, safeMin })

    const adjustedTop = Math.max(topWithPadding, safeMin)

    el.scroll({
      top: adjustedTop,
      left,
      behavior: options?.behavior,
    })
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener(
    "click",
    e => {
      let h = e.target as HTMLElement
      if (!(h instanceof HTMLElement)) return
      if (h.matches("[data-scroll-to-me]")) {
        const it = document.querySelector(
          h.dataset.scrollToMe ?? "",
        )
        if (it && it instanceof HTMLElement) {
          console.log({ it })
          setTimeout(
            () =>
              scrollIntoView(it, {
                scrollMode: "if-needed",
                behavior: "smooth",
                block: "start",
              }),
            16,
          )
        }
      }
    },
    { capture: true },
  )
})
