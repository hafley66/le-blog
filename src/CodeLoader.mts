import { debounce } from "lodash";
import { SHIKI } from "./shiki.dual.mts";
// import "mermaid";
const Exec = debounce(function Exec() {
  const As = Array.from(document.querySelectorAll("a[data-preview][href]"));
  As.forEach(node => {
    console.log({ node });
    if (
      node instanceof HTMLElement &&
      node.tagName === "A" &&
      node.hasAttribute("data-preview")
    ) {
      const href = node.getAttribute("href");
      if (href) {
        handlePreview(node as HTMLAnchorElement);
      }
    }
  });
}, 200);

const observer = new MutationObserver(mutations => {
  Exec();
});

Exec();
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function handlePreview(element: HTMLAnchorElement): void {
  fetch(element.href, { headers: { "content-type": "application/text" } })
    .then(response => response.text())
    .then(async code => {
      const html = SHIKI.codeToHtml(code, {
        lang: "typescript",
        theme: "nord",
        // transformers: [transformerTwoslash()],
      });

      const previewElement = document.createElement("div");
      previewElement.className = "code-preview";
      previewElement.innerHTML = html;

      element.parentNode?.replaceChild(previewElement, element);
    })
    .catch(error => {
      console.error("Failed to load code preview:", error);
    });
}
