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
// --cut--
main.subscribe(n => (document.body.innerHTML = n))
