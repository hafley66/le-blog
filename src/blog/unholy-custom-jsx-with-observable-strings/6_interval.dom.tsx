import { interval, map } from "rxjs"

export const main = (
  <div style={{ background: "blue", color: "white" }}>
    {interval(1000).pipe(map(String))}
    &nbsp;seconds since mount/subscribe
  </div>
)

// --cut--

main.subscribe(n => (document.body.innerHTML = n))
