import { DiffDOM } from "diff-dom"
import _, { isEmpty, sortBy } from "lodash"
import {
  animationFrameScheduler,
  catchError,
  distinctUntilChanged,
  map,
  merge,
  of,
  throttleTime,
} from "rxjs"
import { TAG } from "~/lib/lib.dual.ts"
import { tasks, tasksByLane } from "./api.dom"
import {
  AddFormDetails,
  Board,
  BoardHeader,
  Lane,
  MOUNT,
  STATUS,
  TaskDiv,
  css,
} from "./components.dom.tsx"
import { DragHandlers } from "./drag_handlers.dom"
import { ADD_FORM, EDIT_FORM } from "./forms.dom.tsx"

const LANES = Object.entries(STATUS).map(([key, value]) => (
  <Lane
    key={key}
    open
    data-status={key}
    style={DragHandlers.pipe(
      map(i =>
        i[0] === "dragover" && i[1] === key
          ? {
              backgroundColor: "var(--color-slate-700)",
              height: "unset",
            }
          : undefined,
      ),
      distinctUntilChanged(),
    )}
  >
    <summary>
      {value.toUpperCase()} {`(`}
      {tasksByLane.pipe(
        map(i =>
          i[0] === "data"
            ? (i[1]?.[key]?.length ?? 0)
            : "...",
        ),
      )}
      {")"}
    </summary>
    <div
      style={{
        // Without this, margin collapse gets really freaky in summary vs rest of details. this html comp is weird.
        // But when i do margintop/bottom -2px trick for white border not taking height, without this it will flicker and super jump
        marginBlock: "10px",
      }}
    >
      {tasksByLane.pipe(
        map(([event, data]) =>
          event === "loading"
            ? "Loading..."
            : isEmpty(data)
              ? "No tasks"
              : sortBy(data[key], i => i.index).map(it => (
                  <TaskDiv
                    key={it.uuid}
                    data-uuid={it.uuid}
                    draggable="true"
                    data-index={it.index}
                    style={DragHandlers.pipe(
                      map(i =>
                        i[0] === "dragover" &&
                        i[1] === key &&
                        i[2]?.task?.uuid === it.uuid
                          ? i[2].dist > 0
                            ? "Top"
                            : "Bottom"
                          : "",
                      ),
                      // distinctUntilChanged(),
                      map(i =>
                        i
                          ? {
                              backgroundColor:
                                "var(--color-emerald-700)",
                              [`margin${i}`]: "-6px",
                              borderRadius: "0px",
                              [`border${i}`]:
                                "6px solid white",
                            }
                          : undefined,
                      ),
                    )}
                  >
                    <div style="font-size: 16px; line-height: 1.2; padding-bottom: 4px;">
                      {it.title}
                    </div>
                    <hr style="margin-block: 4px;" />
                    <div>{it.description}</div>

                    {it.parent ? (
                      <pre style="padding-top: 4px; border-top: 2px solid white; margin-top: 4px;">
                        <code>{it.parent}</code>
                      </pre>
                    ) : null}
                  </TaskDiv>
                )),
        ),
        catchError(err => of(["catchError", err])),
      )}
    </div>
  </Lane>
))

export const TASK_APP = (
  <Board
    className={merge(
      TaskDiv.$.dragstart.pipe(map(() => "dragging")),
      TaskDiv.$.dragend.pipe(map(() => "")),
    )}
  >
    {css}
    <BoardHeader>
      {tasks.pipe(
        map(i =>
          i[0] === "loading"
            ? "Loading cards..."
            : `Total Tasks: ${i[1].length}`,
        ),
      )}
      <button
        type="button"
        id="add-card-btn"
        commandfor={AddFormDetails.id}
        command="show-modal"
      >
        Add Card
      </button>
      {ADD_FORM}
    </BoardHeader>
    {LANES}
    {EDIT_FORM}
  </Board>
)

let app = document.getElementById(MOUNT)
if (!app) {
  app = document.createElement("div")
  app.setAttribute("id", MOUNT)
  const mount =
    document.querySelector("main")?.parentElement ||
    document.body
  mount.appendChild(app)
}

const dd = new DiffDOM({
  valueDiffing: false,
  caseSensitive: false,

  // @ts-ignore this whole lib is not typed :( but it works fine lol
  preDiffApply: function (info) {
    if (
      info.diff.action === "removeAttribute" &&
      info.diff.name === "open" &&
      (info.node as HTMLElement).tagName === "DIALOG" &&
      info.diff.value === ""
    ) {
      console.log(
        "preventing attribute removal for dialog open",
      )
      return true
    }
  },
})

TASK_APP.pipe(
  throttleTime(16, animationFrameScheduler, {
    leading: true,
    trailing: true,
  }),
  distinctUntilChanged(),
).subscribe(n => {
  let full = `<div id="${MOUNT}">${n}</div>`
  const diff = dd.diff(app, full) as unknown as {
    action: string
    node?: any
    name?: string
  }[]
  const actualDiffsAfterRedundantRemoveAddFiltered = diff
    .reduce(
      (sum, next, index) => {
        if (
          next.action === "addAttribute" &&
          next.name?.startsWith("data-")
        ) {
          const redundantRemove = sum.findIndex(
            i =>
              i &&
              i.action === "removeAttribute" &&
              i.node === next.node &&
              i.name?.startsWith("data-"),
          )
          if (redundantRemove >= 0) {
            // @ts-ignore
            sum[redundantRemove] = null
          } else {
            sum[index] = next
          }

          return sum
        }
        sum[index] = next
        return sum
      },
      new Array(diff.length) as (
        | (typeof diff)[number]
        | null
      )[],
    )
    .filter(Boolean)
  // console.log({
  //   diff,
  //   actualDiffsAfterRedundantRemoveAddFiltered,
  // })
  dd.apply(
    app,
    actualDiffsAfterRedundantRemoveAddFiltered as typeof diff,
  )
  // console.groupEnd()
})
