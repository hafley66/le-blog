/** @jsxImportSource ~/lib/rxjs-vhtml/v3/ */
// @@filename With BehaviorSubject
import { BehaviorSubject, Observable } from "rxjs"

export default () => {
  const clicks = new BehaviorSubject(0)

  return (
    <div style="display: flex; flex-direction: column;">
      <button
        className="btn--blue"
        onClick={() => {
          clicks.next(clicks.value + 1)
        }}
      >
        Click one
      </button>
      <div>Result: {clicks}</div>
    </div>
  )
}
