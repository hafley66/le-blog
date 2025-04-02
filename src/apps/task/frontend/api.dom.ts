import _ from "lodash"
import {
  BehaviorSubject,
  delay,
  map,
  merge,
  of,
  skip,
  startWith,
  Subject,
  Observable,
  switchMap,
  tap,
  filter,
} from "rxjs"
import { trpcClient } from "~/apps/trpc.client.dom"
import { deferFrom, shareLatest, TAG } from "~/lib/lib.dual"
import { Task, TaskDB } from "../types"

const __tasks = deferFrom(() =>
  import.meta.env.DEV
    ? trpcClient.task.readAll.query()
    : (import("~/apps/task/db/index.json").then(
        i => i.default,
      ) as Promise<TaskDB>),
).pipe()

let hmm = []
const _tasks = new BehaviorSubject<Task[]>(
  Array.from({ length: 25 }).map<Task>((_, i) => ({
    uuid: `${i}`,
    created_at: +new Date(),
    updated_at: 0,
    title: "Title: " + i,
    description: "Description #" + i,
    parent: "",
    tags: [],
    status: i % 5,
    index:
      ((hmm[i % 5] ||= []).push(i), hmm[i % 5].length - 1),
  })),
)

export const task_actions = new Subject<
  ["create", TaskDB] | ["update", TaskDB]
>()

export const tasks = merge(
  __tasks as Observable<TaskDB>,
  task_actions.pipe(
    tap(n => trpcClient.task.upsert.mutate(n[1])),
    map(i => i[1]),
  ),
).pipe(
  map(i => ["data", i] as const),
  startWith(["loading", []] as const),
  shareLatest(),
)

export const tasksByLane = tasks.pipe(
  map(i =>
    i[0] === "loading"
      ? i
      : (["data", _.groupBy(i[1], i => i.status)] as const),
  ),
  shareLatest(),
)
