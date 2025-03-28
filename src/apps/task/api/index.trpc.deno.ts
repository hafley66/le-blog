// deno-lint-ignore-file no-fallthrough
import { writeFileSync } from "node:fs"
import {
  publicProcedure,
  router,
} from "~/apps/trpc.deno.ts"
import { SUB } from "../SITEMAP.deno.ts"
import { Task, taskCU, TaskDB } from "../types.ts"
import { debounceTime, scan, Subject, tap } from "rxjs"
import { TAKE_UNTIL_EXIT } from "~/lib/lib.deno.ts"

// type CRUD = "create" | "read" | "update" | "delete"
// type Keys = keyof TodoDB
// type Ops = [Keys, CRUD, any]

// const $ = new Subject<Ops>()
// const init = readDb()
// $.pipe(
//   scan((db, [typ, op, input]) => {
//     switch (typ) {
//       case "todo":
//         switch (op) {
//           case "create":
//           case "read":
//           case "update":
//           case "delete":
//         }
//       case "board":
//         switch (op) {
//           case "create":
//           case "read":
//           case "update":
//           case "delete":
//         }
//       case "state":
//         switch (op) {
//           case "create":
//           case "read":
//           case "update":
//           case "delete":
//         }
//     }
//     return db
//   }, init),
//   debounceTime(100),
//   tap(writeDb),
//   TAKE_UNTIL_EXIT(),
// ).subscribe()
const readDb = () =>
  JSON.parse(SUB.fs["db/index.json"].readSync()) as TaskDB
const writeDb = (next: TaskDB) =>
  writeFileSync(
    SUB.fs["db/index.json"].path,
    JSON.stringify(next, null, 2),
  )

const update = new Subject<number>()

update
  .pipe(
    debounceTime(100),
    tap(() => writeDb(db)),
    TAKE_UNTIL_EXIT(),
  )
  .subscribe()

let db = readDb()

const p = publicProcedure
export const todoRouter = router({
  task: router({
    upsert: p
      .input(taskCU)
      .mutation(({ input: it, ctx, signal }) => {
        let curr = db.task[it.uuid]
        // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
        let next = (db.task[it.uuid] = !curr
          ? {
              board: "main",
              parent: "",
              status: "0. Planning",
              ...it,
              updated_at: 0,
              created_at: +new Date(),
            }
          : {
              ...curr,
              ...it,
              updated_at: +new Date(),
            })
        update.next(1)
        return next
      }),
  }),
})
