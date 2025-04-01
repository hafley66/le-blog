// deno-lint-ignore-file no-fallthrough
import { writeFileSync } from "node:fs"
import {
  publicProcedure,
  router,
} from "~/apps/trpc.deno.ts"
import { SUB } from "../SITEMAP.deno.ts"
import { taskCU, TaskDB } from "../types.ts"
import { debounceTime, Subject, tap } from "rxjs"
import { TAKE_UNTIL_EXIT } from "~/lib/lib.deno.ts"
import { z } from "zod"

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
export const taskRouter = router({
  readAll: p.query(({ ctx }) => {
    return readDb() as TaskDB
  }),
  upsert: p
    .input(z.array(taskCU))
    .mutation(({ input: it }) => {
      // let index = db.findIndex(i => i.uuid === it.uuid)
      // let curr = db[index]
      // // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
      // curr = !curr
      //   ? {
      //       // board: "main",
      //       parent: "",
      //       status: 0,
      //       ...it,
      //       updated_at: 0,
      //       created_at: +new Date(),
      //     }
      //   : {
      //       ...curr,
      //       ...it,
      //       updated_at: +new Date(),
      //     }

      // if (index === -1) {
      //   db.push(curr)
      // } else {
      //   db[index] = curr
      // }
      db = it
      update.next(1)
      return it
    }),
})
