import { DiffDOM } from "diff-dom"

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
    if (!root.children.length) {
      root.innerHTML = "<div></div>"
    }
    const diff = dd.diff(root, next) as unknown as {
      action: string
      node?: any
      name?: string
    }[]
    console.log({
      root,
      rootText: root.outerHTML,
      diff,
      next,
    })
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
