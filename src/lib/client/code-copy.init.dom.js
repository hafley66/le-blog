function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Text copied successfully
      console.log("Text copied to clipboard")
    })
    .catch(err => {
      // Error copying text
      console.error("Failed to copy text: ", err)
    })
}

/**
 * @param {HTMLElement} el
 * @param {Window} win
 */
function selectElementText(el, win) {
  win = win || window
  let doc = win.document
  /**
   * @type {Selection}
   */
  let sel
  /**
   * @type {Range}
   */
  let range

  if (win.getSelection && doc.createRange) {
    sel = win.getSelection()
    range = doc.createRange()
    range.selectNodeContents(el)
    sel.removeAllRanges()
    sel.addRange(range)
  } else if (doc.body.createTextRange) {
    range = doc.body.createTextRange()
    range.moveToElementText(el)
    range.select()
  }
  console.log(sel.toString())
  return sel.toString()
}

document.addEventListener("click", e => {
  let target =
    e.target.classList.contains("copy-to-clipboard") &&
    e.target.parentElement.classList.contains("shiki")
      ? e.target
      : null
  target = target?.parentElement.querySelector("code")
  if (target) {
    copyToClipboard(selectElementText(target))
    window.getSelection().removeAllRanges()
  }
})
