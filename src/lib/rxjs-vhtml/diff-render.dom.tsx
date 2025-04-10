import { DiffDOM } from "diff-dom"
/**
 * @param {String} HTML representing a single node (which might be an Element,
                   a text node, or a comment).
 * @return {Node}
 */
export function htmlToNode(html: string) {
  const template = document.createElement("template")
  template.innerHTML = html
  const nNodes = template.content.childNodes.length
  if (nNodes !== 1) {
    throw new Error(
      `html parameter must represent a single node; got ${nNodes}. Note that leading or trailing spaces around an element in your HTML, like " <img/> ", get parsed as text nodes neighbouring the element; call .trim() on your input to avoid this.`,
    )
  }
  return template.content.firstChild as HTMLElement
}

export const makeDiffer = (
  root: HTMLElement,
  id: string,
) => {
  const dd = new DiffDOM({
    valueDiffing: false,
    caseSensitive: false,

    // @ts-ignore this whole lib is not typed :( but it works fine lol
    preDiffApply: function (info) {
      if (
        info.diff.action === "removeAttribute" &&
        info.diff.name === "open" &&
        (info.node as HTMLElement).tagName === "DIALOG" &&
        info.diff.value === ""
      ) {
        console.log(
          "preventing attribute removal for dialog open",
        )
        return true
      }
    },
  })

  return (next: string) => {
    const diff = dd.diff(root, next) as unknown as {
      action: string
      node?: any
      name?: string
    }[]
    // console.log({
    //   root,
    //   rootText: root.outerHTML,
    //   diff,
    //   next,
    // })
    const actualDiffsAfterRedundantRemoveAddFiltered = diff
      .reduce(
        (sum, next, index) => {
          if (
            next.action === "addAttribute" &&
            next.name?.startsWith("data-")
          ) {
            const redundantRemove = sum.findIndex(
              i =>
                i &&
                i.action === "removeAttribute" &&
                i.node === next.node &&
                i.name?.startsWith("data-"),
            )
            if (redundantRemove >= 0) {
              // @ts-ignore
              sum[redundantRemove] = null
            } else {
              sum[index] = next
            }

            return sum
          }
          sum[index] = next
          return sum
        },
        new Array(diff.length) as (
          | (typeof diff)[number]
          | null
        )[],
      )
      .filter(Boolean)
    // console.log({
    //   diff,
    //   actualDiffsAfterRedundantRemoveAddFiltered,
    // })
    dd.apply(
      root,
      actualDiffsAfterRedundantRemoveAddFiltered as typeof diff,
    )
  }
}
