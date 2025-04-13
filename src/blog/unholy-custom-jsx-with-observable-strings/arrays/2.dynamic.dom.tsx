/** @jsxImportSource ~/lib/rxjs-vhtml/v3/ */
// @@filename Static Nav Array
import {
  Observable,
  interval,
  isObservable,
  map,
} from "rxjs"
import { RxJSXNode } from "~/lib/rxjs-vhtml/v3/jsx-runtime"

const navItems = [
  "home",
  "resume",
  "blog",
  "tags",
  "projects",
]

const dynamicNavItems = [
  ...navItems,
  interval(750).pipe(map(i => (i % 2 ? "admin" : ""))),
]

export default () => (
  <nav style={{ background: "purple", color: "white" }}>
    Primary Nav:
    <ul>{dynamicNavItems.map(toNavItem)}</ul>
  </nav>
)

function toNavItem(item: string | Observable<string>) {
  if (!item) return ""
  if (typeof item === "string") return <li>{item}</li>
  // Recursive
  return isObservable(item)
    ? item.pipe(map(i => !!i && <li>{i}</li>))
    : null
}
