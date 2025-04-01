import _, { maxBy, minBy } from "lodash"
import {
  animationFrameScheduler,
  delay,
  filter,
  map,
  merge,
  switchMap,
  takeUntil,
  tap,
  throttleTime,
  withLatestFrom,
} from "rxjs"
import { event$ } from "~/lib/lib.dom"
import { shareLatest, TAG } from "~/lib/lib.dual"
import { Task } from "../types"
import { Lane, STATUS, TaskDiv } from "./components.dom.tsx"
import { task_actions, tasks } from "./api.dom"

console.log("I am very confused")
export const DragHandlers = TaskDiv.$.dragstart
  .pipe(
    TAG("AA"),
    withLatestFrom(
      tasks.pipe(filter(i => i[0] === "data")),
    ),
    switchMap(([ev, [__, tasks]]) => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const it = tasks.find(
        i =>
          i.uuid ===
          (ev.target as HTMLElement).dataset["uuid"],
      )!
      console.log("Wat")
      const laneListern = (status: string) => {
        const statusTasks = tasks.filter(
          t => t.status === +status,
        )
        const $ = event$(
          `${Lane.selector}[data-status="${status}"] *, ${Lane.selector}[data-status="${status}"]`,
        )

        let taskList = [] as HTMLElement[]
        let latestMin = undefined as
          | undefined
          | { dist: number; task: Task | undefined }

        return merge(
          $("dragenter").pipe(
            map(i => {
              taskList = Array.from(
                document.querySelectorAll(
                  `${Lane.selector}[data-status="${status}"] ${TaskDiv.selector}`,
                ) || [],
              )
              return ["dragenter", status, it] as const
            }),
          ),
          // This is a very VIOLENT event
          $("dragover").pipe(
            map(i => {
              i.preventDefault()
              return [
                "dragover",
                status,
                // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
                (latestMin = minBy(
                  taskList.map(T => {
                    const TT = T.getBoundingClientRect()
                    const dist =
                      TT.y + TT.height * 0.5 - i.y
                    const abs = Math.abs(dist)
                    const ret = {
                      T,
                      dist,
                      abs,
                      id: T.dataset.uuid,
                      uuid: it.uuid,
                    }
                    return {
                      dist: ret.dist,
                      task: tasks.find(
                        i => i.uuid === T.dataset.uuid,
                      ),
                      abs,
                    }
                  }),
                  i => i.abs,
                )),
              ] as const
            }),
          ),

          $("drop").pipe(
            map(i => {
              i.preventDefault()
              const lane = status
              it.status = +(lane || 0)

              let cousinOffset = +(
                (latestMin?.dist ?? 0) < 0
              )

              let cousinIndex =
                (latestMin?.task?.index ??
                  maxBy(statusTasks.map(t => t.index)) ??
                  0) + cousinOffset
              console.log({
                cousinIndex,
                cousinOffset,
                lane,
                latestMin,
              })
              it.index = cousinIndex
              tasks
                .filter(
                  i =>
                    i.status === +status &&
                    i.index >= cousinIndex &&
                    i !== it,
                )
                .map(i => i.index++)
              console.log({
                cousinIndex,
                cousinOffset,
                lane,
                latestMin,
                tasks: [...tasks],
              })
              task_actions.next(["update", tasks])
              return ["drop", status, it] as const
            }),
          ),
        ).pipe(filter(Boolean))
      }
      return merge(
        ...Object.entries(STATUS).map(i =>
          laneListern(i[0]),
        ),
      ).pipe(takeUntil(TaskDiv.$.dragend.pipe(delay(10))))
    }),
  )
  .pipe(
    throttleTime(16, animationFrameScheduler, {
      leading: true,
      trailing: true,
    }),
    // tap(i => console.log("How", i[0])),
    shareLatest(),
  )
