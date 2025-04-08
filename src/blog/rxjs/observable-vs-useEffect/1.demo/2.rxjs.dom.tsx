// @@filename RxJS Clicker
import { Observable } from "rxjs"

const myEffect$ = new Observable<number>(subscriber => {
  let [state, setState] = [
    0,
    subscriber.next.bind(subscriber),
  ] as const
  console.log("Start")
  setState(state) // RxJS does not have concept of initial render
  const fn = (event: Event) => {
    if (!(event.target instanceof HTMLElement)) return
    const btn = event.target.closest("#example")
    if (btn) {
      setState(++state)
      console.log("#example Has been clicked!")
    }
  }
  document.addEventListener("click", fn)
  return () => {
    document.addEventListener("click", fn)
    console.log("End")
  }
})

const Clicker = () => {
  return (
    <div>
      <button id="example" className="btn--blue">
        Click me!
      </button>
      <div>{myEffect$} clicked this many times</div>
    </div>
  )
}

export default Clicker
