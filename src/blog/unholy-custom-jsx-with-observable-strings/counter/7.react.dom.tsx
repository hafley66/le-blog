/** @jsxImportSource react */
import React, { useState } from "react"
import { createRoot } from "react-dom/client"

const OneSecondTimer = () => {
  // startWith(0)
  const [state, setState] = useState(0)

  // interval(1000).pipe(map(i => i + 1))
  React.useEffect(() => {
    const id = setInterval(() => {
      setState(p => p + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ background: "red", color: "white" }}>
      {state}&nbsp;seconds since mount/subscribe
    </div>
  )
}

// --cut--
const root = createRoot(document.body)
root.render(<OneSecondTimer />)
