import { interval, map, startWith } from "rxjs"
import { registerRxJSXDemo } from "~/lib/remark_rehype/demo-runner.dom"

export const main = (
  <div style={{ background: "red", color: "white" }}>
    {interval(1000).pipe(
      map(i => i + 1),
      startWith(0),
    )}
    &nbsp;seconds since mount/subscribe
  </div>
)

registerRxJSXDemo(import.meta.filename, () => main)
