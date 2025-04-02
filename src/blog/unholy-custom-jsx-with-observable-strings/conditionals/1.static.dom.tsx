import { registerRxJSXDemo } from "~/lib/remark_rehype/demo-runner.dom"

export const main = (
  <div style={{ background: "red", color: "white" }}>
    {true ? "Yes " : "No "}
    {false ? "Yay " : "Nay "}
  </div>
)

registerRxJSXDemo(import.meta.filename, () => main)
