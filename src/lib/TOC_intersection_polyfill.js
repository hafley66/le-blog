// Smooth scrolling for browsers that don't support CSS smooth scrolling
window.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(entries => {
    console.log({ entries })
    entries.forEach(entry => {
      const id = entry.target.getAttribute("id")
      if (entry.isIntersecting) {
        console.log("adding to", id)
        document
          .querySelector(`nav li a[href="#${id}"]`)
          ?.parentElement?.classList.add(
            "viewtimeline-active",
          )
      } else {
        console.log("removing from", id)
        document
          .querySelector(`nav li a[href="#${id}"]`)
          ?.parentElement?.classList.remove(
            "viewtimeline-active",
          )
      }
    })
  })

  // Track all sections that have an `id` applied
  document
    .querySelectorAll("section[id]")
    .forEach(section => {
      observer.observe(section)
    })
})
console.log("Does not support timeline-view")
