let isZoomin = false
let container = null
const remove = () => {
  if (!container) return
  container?.remove()
  container = null
  const it = document.querySelector(".img-zoom")
  it?.classList.toggle("img-zoom")
  isZoomin = false
}
document.addEventListener("click", e => {
  if (
    isZoomin &&
    e.target.classList.contains("img-zoom-clone-parent")
  ) {
    document
      .querySelector(".img-zoom-clone-exit")
      ?.dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: false,
        }),
      )
  }

  if (e.target.tagName === "IMG") {
    if (e.target.classList.contains("img-zoom-clone")) {
      return
    }
    if (!e.target.classList.contains("img-zoom")) {
      /**
       * @type {HTMLImageElement}
       */
      const orig = e.target
      /**
       * @type {HTMLImageElement}
       */
      const clone = e.target.cloneNode()
      clone.classList.add("img-zoom-clone")

      container = document.createElement("div")
      container.classList.add("img-zoom-clone-parent")

      const behind = document.createElement("div")
      behind.classList.add("behind")

      const exitButton = document.createElement("button")
      exitButton.classList.add("img-zoom-clone-exit")
      ;[exitButton, behind].forEach(i =>
        i.addEventListener("click", remove),
      )
      isZoomin = true

      exitButton.setAttribute("aria-role", "button")
      exitButton.setAttribute("type", "button")
      exitButton.innerHTML = "Close"

      container.appendChild(behind)
      container.appendChild(clone)
      container.appendChild(exitButton)

      document.body.appendChild(container)
      e.target.classList.toggle("img-zoom")
      requestAnimationFrame(() => {
        exitButton.focus()
      })
    }
  }
})

document.addEventListener("keyup", e => {
  if (e.key === "Escape" && isZoomin) {
    remove()
  }
})
