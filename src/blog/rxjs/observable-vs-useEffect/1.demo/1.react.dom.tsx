/** @jsxImportSource react */
// @@filename React Clicker
import React from "react"

const Clicker = () => {
  const [state, setState] = React.useState(0)
  React.useEffect(() => {
    console.log("Start")
    const fn = (event: Event) => {
      if (!(event.target instanceof HTMLElement)) return
      const btn = event.target.closest("#example")
      if (btn) {
        setState(p => p + 1)
        console.log("#example Has been clicked!")
      }
    }
    document.addEventListener("click", fn)
    return () => {
      document.addEventListener("click", fn)
      console.log("End")
    }
  }, [])

  return (
    <div>
      <button id="example" className="btn--blue">
        Click me!
      </button>
      <div>{state} clicked this many times</div>
    </div>
  )
}

export default () => Clicker
