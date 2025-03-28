/** @jsxImportSource react */
import React, { useState } from "react"
import { createRoot } from "react-dom/client"

const Elapsed = () => {
  const [state, setState] = useState(0)

  React.useEffect(() => {
    let start = +new Date()
    const id = setInterval(() => {
      setState(() => +new Date() - start)
    }, 60)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ background: "blue", color: "white" }}>
      {(state / 1000).toFixed(2)}&nbsp;seconds since
      mount/subscribe
    </div>
  )
}

// --cut--
const root = createRoot(document.body)
root.render(<Elapsed />)
