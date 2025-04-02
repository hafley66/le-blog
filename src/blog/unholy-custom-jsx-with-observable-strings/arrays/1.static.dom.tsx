import { registerRxJSXDemo } from "~/lib/remark_rehype/demo-runner.dom"

const navItems = [
  "home",
  "resume",
  "blog",
  "tags",
  "projects",
]

export const main = (
  <nav style={{ background: "purple", color: "white" }}>
    Primary Nav:
    <ul>
      {navItems.map(it => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  </nav>
)

registerRxJSXDemo(import.meta.filename, () => main)
