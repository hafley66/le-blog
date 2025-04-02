import { interval, map } from "rxjs"

export const Ellapsed = () => {
  const start = +new Date()
  return (
    <div style={{ background: "blue", color: "white" }}>
      {interval(60).pipe(
        map(() =>
          ((+new Date() - start) / 1000).toFixed(2),
        ),
      )}
      &nbsp;seconds since mount/subscribe
    </div>
  )
}

export default Ellapsed
