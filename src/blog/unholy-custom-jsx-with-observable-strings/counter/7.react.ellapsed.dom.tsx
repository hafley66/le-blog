/** @jsxImportSource react */
import React, { useState } from "react"
import { registerReactDemo } from "~/lib/remark_rehype/demo-runner.dom"

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

registerReactDemo(import.meta.filename, Elapsed)
