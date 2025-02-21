import { readFileSync } from "node:fs";
export function HTML(head = "") {
  const html = readFileSync(`${process.cwd()}/src/HTML.html`).toString();
  return (body = "") => {
    return html.replace("${head}", head).replace("${body}", body);
  };
}
