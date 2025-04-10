/** @jsxImportSource ~/lib/rxjs-vhtml/v3/ */
import {
  combineLatest,
  filter,
  groupBy,
  map,
  mergeMap,
  Observable,
  of,
  scan,
  startWith,
  switchMap,
  tap,
} from "rxjs"
import { autoDemo } from "~/lib/client/auto-demo"
import { shareLatest, TAG } from "~/lib/lib.dual"

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
        (sum, next, index) => (
          sum.push({
            event: next[0].type,
            index,
            time: +new Date(),
            percent: 0,
          }),
          sum.map(i => {
            i.percent =
              ((i.time - start) / (+new Date() - start)) *
              100
            return i
          })
        ),
        [] as {
          event: string
          index: number
          time: number
          percent: number
        }[],
      ),
      map(i => ({
        key: group$.key,
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
      {myButtomDemoEvents_Grouped.pipe(
        switchMap(it =>
          combineLatest(
            Object.entries(it).map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  position: "relative",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "100px" }}>{k}</div>
                {
                  <div
                    style={{
                      flex: "1 1 auto",
                      display: "flex",
                      position: "relative",
                      marginRight: 20,
                    }}
                  >
                    {v.map(e => (
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
                }
              </div>
            )),
          ).pipe(TAG("wat")),
        ),
        startWith(null),
      )}
    </div>
  </div>
))
