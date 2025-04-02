/** @jsxImportSource react */
import React, { useState } from "react"

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

export default () => <Elapsed />
