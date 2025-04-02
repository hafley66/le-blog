import { interval, map, startWith } from "rxjs"

export default () => (
  <div style={{ background: "red", color: "white" }}>
    {interval(1000).pipe(
      map(i => i + 1),
      startWith(0),
    )}
    &nbsp;seconds since mount/subscribe
  </div>
)
