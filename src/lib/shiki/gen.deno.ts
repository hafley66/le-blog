// import { codegen } from "shiki-codegen";

// const { code } = await codegen({
//   langs: ["typescript", "javascript", "vue"],
//   themes: ["light-plus", "dark-plus"],
//   engine: "javascript",
//   typescript: true,
// });

import { codeToHtml } from "shiki"

const code = "const message = 'Hello, world!';"
const html = await codeToHtml(code, {
  lang: "javascript",
  theme: "one-dark-pro",
})

console.log(html)
