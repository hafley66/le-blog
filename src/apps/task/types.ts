import z from "zod"
export type Task = {
  uuid: string
  title: string
  description: string
  parent: string | ""
  created_at: number | 0
  updated_at: number | 0
  board: string
  status: string
  tags: string[]
}

export const taskCU = z.object({
  uuid: z.string(),
  title: z.string(),
  description: z.string(),
  parent: z.optional(z.string()),
  tags: z.array(z.string()),
  board: z.optional(z.string()),
  status: z.optional(z.string()),
})

export const taskR = taskCU.extend({
  created_at: z.number(),
  updated_at: z.optional(z.number()),
})

export type Status = {
  key: string
}

export type Board = {
  key: string
  value: string
  // lanes: Status[]
}

export type Tag = {
  key: string
}

export type TaskDB = {
  tag: Record<string, Tag>
  task: Record<string, Task>
  board: Record<string, Board>
  state: Record<string, Status>
}
