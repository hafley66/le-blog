import { interval, map } from "rxjs"

export const main = (
  <div style={{ background: "red", color: "white" }}>
    {interval(1000).pipe(map(String))}
    &nbsp;seconds since mount/subscribe
  </div>
)
// --cut--
main.subscribe(n => (document.body.innerHTML = n))

// const thisScript = document.querySelector(
//   '[src*="' + new URL(import.meta.url).pathname + '"]',
// )
// if (thisScript) {
//   const container = thisScript.parentElement
//   const demo = document.createElement("div")
//   container?.appendChild(demo)
//   main.subscribe(n => (demo.innerHTML = n))
// }
