// Smooth scrolling for browsers that don't support CSS smooth scrolling
;(() => {
  /**
   * @type {Record<string, {elem: HTMLElement, percent: number, lastEntry: null | IntersectionObserverEntry}>}
   */
  const byId = {}
  window.sectionById = byId
  /**
   * @type {(typeof byId)[string]}
   */
  let top = null
  /**
   * @type {(typeof byId)[string]}
   */
  let bottom = null

  window.addEventListener("DOMContentLoaded", () => {
    /**
     * @type {HTMLElement}
     */
    const nav = document.getElementById("toc-nav")
    const li = nav?.querySelector("li a")

    let liRatio = li.offsetHeight / nav.offsetHeight

    window.addEventListener("resize", () => {
      console.log("Resize detected")
      liRatio = li.offsetHeight / nav.offsetHeight
    })

    const setEnds = (start, end) => {
      start != null &&
        nav.style.setProperty(
          "--toc-scroll-start",
          "" + (start * 100).toFixed(0) + "%",
        )
      end != null &&
        nav.style.setProperty(
          "--toc-scroll-end",
          "" + (end * 100).toFixed(0) + "%",
        )
    }

    // use elem, its the li
    // now we have its offset from its parent
    // get percent from parent 0 edge
    // that is constant range start

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id = entry.target.getAttribute("id") ?? ""
          let cache =
            // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
            (byId[id] ||= {
              elem: document.querySelector(
                `nav li a[href="#${id}"]`,
              ),
              percent: 0,
              lastEntry: entry,
            })
          const elem = cache.elem
          cache.lastEntry = entry
          cache.percent = entry.intersectionRatio
          if (entry.isIntersecting) {
            if (entry.intersectionRatio === 1) {
              // console.log("we are golden", cache)
              // console.log("--", elem)
              if (!top) {
                // console.log("A)", elem)
                top = cache
              } else if (
                top.lastEntry.intersectionRect.top >
                  entry.intersectionRect.top ||
                top.lastEntry.time < entry.time
              ) {
                // console.log("AA)", elem)
                // this entry is above the previous top
                top = cache
              } else {
                // console.log(
                //   top.lastEntry,
                //   "does not beat",
                //   entry,
                // )
              }
              // we take full percent of offset + offset+height of LI
            } else if (
              entry.intersectionRect.y ===
                entry.rootBounds.y &&
              entry.intersectionRect.bottom ===
                entry.rootBounds.bottom
            ) {
              // console.log("B)", elem)
              top = cache
              bottom = cache
              // console.log(
              //   "this is both entering/exiting element",
              //   cache,
              // )
            } else if (entry.intersectionRect.y === 0) {
              // console.log(
              //   "this is the leaving element",
              //   cache,
              // )
              // console.log("C)", elem)
              top = cache
            } else {
              // console.log(
              //   "this is the entering element",
              //   cache,
              // )
              // console.log("D)", elem)
              bottom = cache
            }
            if (cache.percent === 0)
              elem?.parentElement?.classList.add(
                "viewtimeline-active",
              )
          } else {
            elem?.parentElement?.classList.remove(
              "viewtimeline-active",
            )
            cache.percent = 0
          }
          console.log(entry.boundingClientRect.top)
          if (entry.boundingClientRect.top < 0) {
            // we have passed the element and are exiting, which means we are stickied. we need to set the var for our mini gradient as a ratio of relative percent of top / height
            const underWater =
              Math.abs(entry.boundingClientRect.top) /
              entry.boundingClientRect.height

            entry.target.style.setProperty(
              "--section-header-hr-progress",
              underWater,
            )
          }
        })
        if (top && bottom) {
          const a = top.elem // get corresponding LI's anchor
          const percentFromNavTop =
            a.offsetTop / a.offsetParent.offsetHeight // this is our base percent we are setting
          // now calculate the intersection ratio relative to

          const percentDiff =
            (a.offsetHeight *
              (1 - top.lastEntry.intersectionRatio)) /
            a.offsetParent.offsetHeight

          const b = bottom.elem
          const percentFromNavTopToBottom =
            (b.offsetTop + b.offsetHeight) /
            b.offsetParent.offsetHeight // this is our base percent we are setting
          // now calculate the intersection ratio relative to

          const percentDiffB =
            (b.offsetHeight *
              (1 - bottom.lastEntry.intersectionRatio)) /
            b.offsetParent.offsetHeight

          // console.log({
          //   top,
          //   bottom,
          //   percentFromNavTop,
          //   percentFromNavTopToBottom,
          //   percentDiff,
          //   percentDiffB,
          //   a,
          //   b,
          // })

          setEnds(
            percentFromNavTop + percentDiff,
            percentFromNavTopToBottom - percentDiffB,
          )
        }
        // console.log({ top, bottom })
      },
      {
        threshold: Array.from(
          { length: 10 },
          (_, i) => i / 10,
        ),
      },
    )

    // Track all sections that have an `id` applied
    document
      .querySelectorAll("#main-content-middle section[id]")
      .forEach(section => {
        observer.observe(section)
      })
  })
})()
