document.addEventListener("DOMContentLoaded", function () {
  const element = document.querySelector(
    "[data-scroll-to-me]",
  )
  document.addEventListener(
    "click",
    e => {
      /**
       * @type {HTMLElement}
       */
      let h = e.target
      if (h.matches("[data-scroll-to-me]")) {
        /**
         * @type {HTMLElement}
         */
        const it = document.querySelector(
          h.dataset.scrollToMe,
        )
        if (it) {
          console.log({ it })
          setTimeout(
            () => it.scrollIntoView({ behavior: "auto" }),
            16,
          )
        }
      }
    },
    { capture: true },
  )
})
