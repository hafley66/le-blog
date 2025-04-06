import {
  filter,
  groupBy,
  map,
  mergeMap,
  Observable,
  scan,
} from "rxjs"
import { autoDemo } from "~/lib/client/auto-demo"
import { TAG } from "~/lib/lib.dual"

const allEvents = Object.getOwnPropertyNames(window)
  .filter(propertyName => propertyName.startsWith("on"))
  .map(eventName => eventName.substring(2))
  .filter(
    i => i !== "pointerrawupdate" && i === "mousemove",
  )

const all$ = new Observable<Event>(sub => {
  const allListener = (event: any) => {
    sub.next(event)
  }

  const add = () =>
    allEvents.forEach(e =>
      document.addEventListener(e, allListener),
    )

  const remove = () =>
    allEvents.forEach(e =>
      document.removeEventListener(e, allListener),
    )

  add()
  return () => {
    remove()
  }
})

const delegateAllFor = (selecto: string) =>
  all$.pipe(
    filter(i => i.target instanceof HTMLElement),
    map(
      i =>
        [
          i,
          (i.target as HTMLElement)?.closest(selecto)!,
        ] as const,
    ),
    filter(i => !!i[1]),
  )

const wat = delegateAllFor(
  "#my-button-demo-all-events",
).pipe(
  groupBy(([event, element]) => event.type),
  mergeMap(group$ => {
    let start = +new Date()
    let latest = +new Date()
    return group$.pipe(
      map((i, index) => ({
        event: i[0].type,
        index,
        time: +new Date(),
        percent: start - +new Date(),
      })),
      scan(
        (sum, next) => (sum.push(next), sum),
        [] as {
          event: string
          index: number
          time: number
          percent: number
        }[],
      ),
      map(i => ({
        key: i[0].event,
        value: i,
      })),
    )
  }),
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  scan(
    (s, n) => ((s[n.key] = n.value), s),
    {} as Record<
      string,
      {
        event: string
        index: number
        time: number
        percent: number
      }[]
    >,
  ),
)

autoDemo(import.meta.url, () => (
  <div>
    <button
      className="btn--blue"
      id="my-button-demo-all-events"
    >
      Lmao lol even
    </button>
    <div
      style={{ display: "flex", flexDirection: "column" }}
    >
      {wat.pipe(
        map(it =>
          Object.entries(it).map(([k, v]) => {
            return (
              <div
                key={k}
                style={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "100px" }}>{k}</div>
                <div
                  style={{
                    flex: "1 1 auto",
                    display: "flex",
                    position: "relative",
                  }}
                  debug
                >
                  {v.slice(1, 3).map(e => (
                    <div
                      key={e.index}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: e.percent + "%",
                        borderRadius: "50%",
                        backgroundColor: "red",
                        width: "6px",
                        height: "6px",
                        color: "white",
                      }}
                    >
                      {e.index}
                    </div>
                  ))}
                </div>
              </div>
            )
          }),
        ),
      )}
    </div>
  </div>
))
