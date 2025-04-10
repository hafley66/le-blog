// @@filename Static Nav Array
import {
  Observable,
  interval,
  isObservable,
  map,
  of,
  switchMap,
} from "rxjs"

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

function toNavItem(
  item: string | Observable<string>,
): string | Observable<string> {
  if (!item) return ""
  if (typeof item === "string") return <li>{item}</li>
  // Recursive
  return item.pipe(switchMap(toNavItem))
}
