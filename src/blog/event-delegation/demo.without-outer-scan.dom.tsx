/** @jsxImportSource ~/lib/rxjs-vhtml/v3/ */
import {
  filter,
  groupBy,
  map,
  mergeMap,
  Observable,
  scan,
  startWith,
} from "rxjs"
import { autoDemo } from "~/lib/client/auto-demo"

const allEvents = Object.getOwnPropertyNames(window)
  .filter(propertyName => propertyName.startsWith("on"))
  .map(eventName => eventName.substring(2))
  .filter(
    i => i !== "pointerrawupdate" && !i.includes("pointer"),
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

const myButtomDemoEvents_Grouped = delegateAllFor(
  "#my-button-demo-all-events",
).pipe(
  groupBy(([event, element]) => event.type),
  mergeMap(group$ => {
    const start = +new Date()
    return group$.pipe(
      scan(
        (sum, next, index) => {
          sum.push({
            event: next[0].type,
            index,
            time: +new Date(),
            percent: 0,
          })
          return sum
        },
        [] as {
          event: string
          index: number
          time: number
          percent: number
        }[],
      ),
    )
  }),
)

autoDemo(import.meta.url, () => (
  <div key="parent">
    {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
    <button
      className="btn--blue"
      id="my-button-demo-all-events"
      style={{
        height: "400px",
        resize: "both",
        position: "relative",
        overflow: "auto",
        fontSize: "20px",
      }}
    >
      Resizeable
    </button>
    <div
      key="all-events"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          alignItems: "center",
        }}
      >
        {myButtomDemoEvents_Grouped.pipe(
          map(it =>
            Object.entries(it).map(([k, v], index) => {
              return (
                <>
                  {index === 0 ? (
                    <div key={0} style={{ width: "100px" }}>
                      {v.event}
                    </div>
                  ) : null}
                  <div
                    key="events"
                    style={{
                      flex: "1 1 auto",
                      display: "flex",
                      position: "relative",
                      marginRight: 20,
                    }}
                  >
                    <div
                      key={v.index}
                      style={{
                        position: "absolute",
                        top: 0,
                        borderRadius: "50%",
                        backgroundColor: "red",
                        width: "6px",
                        height: "6px",
                        color: "white",
                      }}
                    >
                      {v.index}
                    </div>
                  </div>
                </>
              )
            }),
          ),
          startWith(null),
        )}
      </div>
    </div>
  </div>
))
