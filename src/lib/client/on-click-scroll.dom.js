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
        if (it)
          setTimeout(
            () => it.scrollIntoView({ behavior: "smooth" }),
            16,
          )
      }
    },
    { capture: true },
  )
})
