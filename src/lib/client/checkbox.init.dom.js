document.addEventListener("DOMContentLoaded", () => {
  try {
    const it = document.getElementById("toc-toggle")
    if (it) {
      it.checked = JSON.parse(
        localStorage.tocChecked ?? "false",
      )
      it.addEventListener("change", e => {
        localStorage.tocChecked = !!e.target.checked
      })
    }
  } catch (e) {}
  setTimeout(() => {
    document.body.classList.toggle("ready")
  }, 1)
})
