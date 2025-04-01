import { router } from "~/apps/trpc.deno.ts"
import { taskRouter } from "~/apps/task/api/index.trpc.deno.ts"
import { createHTTPServer } from "@trpc/server/adapters/standalone"
import { createHTTPHandler } from "@trpc/server/adapters/standalone"
import cors from "cors"

const appRouter = router({
  task: taskRouter,
})

export type AppRouter = typeof appRouter

export const trpcServer = createHTTPServer({
  middleware: cors(),
  router: appRouter,
})

export const trpcHandler = createHTTPHandler({
  router: appRouter,
  createContext() {
    return {}
  },
})
