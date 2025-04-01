import _ from "lodash"
import {
  filter,
  withLatestFrom,
  switchMap,
  of,
  catchError,
  map,
  startWith,
  tap,
  merge,
} from "rxjs"
import {
  AddActions,
  AddFormDetails,
  EditFormDetails,
  STATUS,
  TaskDiv,
} from "./components.dom.tsx"
import {
  task_actions,
  tasks,
  tasksByLane,
} from "./api.dom.ts"
import { trpcClient } from "~/apps/trpc.client.dom.ts"
import { z } from "zod"
import {
  InputConfig,
  withForm,
} from "~/lib/form_helpers/with.forms.dom.ts"
import { shareLatest } from "~/lib/lib.dual.ts"

import { v7 } from "uuid"

const reqStr = z.string().trim().min(1, "Required")
export const AddForm = withForm("add-task-form", {
  form: "form",
}).withInputs(
  mapValuesBy(
    [
      InputConfig({
        id: "title",
        valueType: "text",
        input: (props: any) => <input {...props} />,
        startsWith: of(""),
        validator: reqStr,
        extraProps: { autofocus: true },
      }),
      InputConfig({
        id: "description",
        valueType: "text",
        startsWith: of(""),
        validator: reqStr,
      }),
      InputConfig({
        id: "tags",
        valueType: "commaString",
        startsWith: of([]),
        validator: z.array(
          z.string().min(1, "Tags cannot be empty strings"),
        ),
      }),
      InputConfig({
        id: "status",
        // debug: true,
        valueType: "selectNumber",
        input: (props: any) => (
          console.log({ props }),
          (
            <select {...props}>
              {Object.entries(STATUS).map(x => (
                <option key={x[0]} value={x[0]}>
                  {x[1]}
                </option>
              ))}
            </select>
          )
        ),
        startsWith: of(+Object.keys(STATUS)[0]),
        validator: z.coerce
          .number()
          .transform(arg => +arg)
          .superRefine((arg, ctx) =>
            arg in STATUS
              ? undefined
              : ctx.addIssue({
                  message: `Status ${arg} not in ${JSON.stringify(STATUS)}`,
                  code: "custom",
                }),
          ),
      }),
      InputConfig({
        id: "parent",
        validator: z.string(),
        valueType: "text",
        startsWith: of(""),
      }),
    ],
    "id",
  ),
)

const editClick = TaskDiv.$.click.pipe(
  withLatestFrom(tasks.pipe(filter(i => i[0] === "data"))),
  map(([i, tasks]) =>
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    tasks[1].find(
      it =>
        ((i.target as HTMLDivElement).dataset["uuid"] ??
          "") === it.uuid,
    ),
  ),
  filter(Boolean),
  tap(() => EditFormDetails.ref()?.showModal()),
  shareLatest(),
)

export const EditForm = withForm("edit-task-form", {
  form: "form",
}).withInputs(
  mapValuesBy(
    [
      InputConfig({
        id: "uuid",
        valueType: "text",
        input: (props: any) => (
          <input {...props} disabled />
        ),
        startsWith: editClick.pipe(map(i => i.uuid)),
        validator: z.any(),
      }),
      InputConfig({
        id: "title",
        valueType: "text",
        input: (props: any) => <input {...props} />,
        startsWith: editClick.pipe(map(i => i.title)),
        validator: reqStr,
        extraProps: { autofocus: true },
      }),
      InputConfig({
        id: "description",
        valueType: "text",
        startsWith: editClick.pipe(map(i => i.description)),
        validator: reqStr,
      }),
      InputConfig({
        id: "tags",
        valueType: "commaString",
        startsWith: editClick.pipe(map(i => i.tags)),
        validator: z.array(
          z.string().min(1, "Tags cannot be empty strings"),
        ),
      }),
      InputConfig({
        id: "parent",
        validator: z.string(),
        startsWith: editClick.pipe(
          map(i => i.parent ?? ""),
        ),
        valueType: "text",
      }),
    ],
    "id",
  ),
)

export const AddFormSubmit = merge(
  AddForm.submit$,
  EditForm.submit$,
).pipe(
  tap(i => {
    i.submit.preventDefault()
  }),
  withLatestFrom(
    tasks.pipe(filter(i => i[0] === "data")),
    tasksByLane.pipe(filter(i => i[0] === "data")),
  ),
  switchMap(async ([ev, [__, tasks], byLane]) => {
    const next = [...tasks]
    if (ev.error) return ["error", ev] as const
    try {
      if (ev.id === AddForm.id) {
        next.push({
          ...ev.value,
          created_at: +new Date(),
          updated_at: 0,
          index: byLane[1][ev.value.status]?.length
            ? Math.max(
                ...(byLane[1][ev.value.status] ?? []).map(
                  i => i.index,
                ),
              ) + 1
            : 1,
          uuid: v7(),
        })
      } else {
        const toUpdate = next.find(
          i => i.uuid === ev.value.uuid,
        )
        if (!toUpdate)
          return ["error-edit-no-find", ev] as const
        Object.assign(toUpdate, ev.value)
      }
    } catch (e) {
      console.error(e)
      throw e
    }

    await trpcClient.task.upsert.mutate(next)
    task_actions.next([
      ev.id === AddForm.id ? "create" : "update",
      next,
    ])
    if (
      (ev.submit.submitter as HTMLButtonElement).value ===
      "add"
    ) {
      AddForm.Form.ref()?.reset()
      AddFormDetails.ref()?.close()
    } else if (
      (ev.submit.submitter as HTMLButtonElement).value ===
      "add-more"
    ) {
      AddForm.Form.ref()?.reset()
    }
    return ["data", ev, next] as const
  }),
  catchError(err => of(["error", err] as const)),
  shareLatest(),
  startWith([] as const),
)

// AddForm.defaults$.pipe(map(i => i.))

export const ADD_FORM = (
  <AddFormDetails className="action-dialog" closedby="any">
    <AddForm.Form>
      <header>
        <h3>Add Task</h3>
      </header>
      <div className="with-form-standard-layout">
        {AddForm.standard()}
      </div>
      <footer>
        <AddActions>
          <button
            name="cancel"
            type="button"
            commandfor={AddFormDetails.id}
            command="close"
          >
            Cancel
          </button>
          <AddForm.SubmitButton
            value="add"
            disabled={AddForm.disabled$}
          >
            Add
          </AddForm.SubmitButton>
          <button
            name="add-more"
            type="submit"
            value="add-more"
          >
            Add++
          </button>
        </AddActions>
      </footer>
    </AddForm.Form>
    {AddFormSubmit.pipe(
      map(() => ""),
      filter(Boolean),
    )}
  </AddFormDetails>
)

export const EDIT_FORM = (
  <EditFormDetails className="action-dialog" closedby="any">
    <EditForm.Form>
      <header>
        <h3>
          Edit Task:
          {editClick.pipe(map(i => i?.uuid ?? ""))}
        </h3>
      </header>
      <div className="with-form-standard-layout">
        {EditForm.standard()}
      </div>
      <footer>
        <AddActions>
          <button
            name="cancel"
            type="button"
            commandfor={EditFormDetails.id}
            command="close"
          >
            Cancel
          </button>
          <EditForm.SubmitButton
            value="main"
            disabled={EditForm.disabled$}
          >
            Update
          </EditForm.SubmitButton>
        </AddActions>
      </footer>
    </EditForm.Form>
  </EditFormDetails>
)

function mapValuesBy<
  const T extends readonly Record<K, any>[],
  const K extends keyof T[number],
>(
  arr: T,
  key: K,
): {
  [P in T[number] as P[K]]: P
} {
  const result = {} as any
  for (const item of arr) {
    result[item[key]] = item
  }
  return result
}

// Example usage:
const testA = mapValuesBy(
  [
    { id: "a", x: 13 },
    { id: "b", x: 12 },
  ],
  "id",
)

// Type check
type Expected = {
  a: { id: "a" }
  b: { id: "b" }
}

const _assert: Expected = testA
