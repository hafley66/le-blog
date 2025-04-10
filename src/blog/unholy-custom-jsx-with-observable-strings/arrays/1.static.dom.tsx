// @@filename Static Nav Array
const navItems = [
  "home",
  "resume",
  "blog",
  "tags",
  "projects",
]

export default () => (
  <nav style={{ background: "purple", color: "white" }}>
    Primary Nav:
    <ul>
      {navItems.map(it => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  </nav>
)
