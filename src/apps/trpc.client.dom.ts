import {
  createTRPCClient,
  httpBatchLink,
} from "@trpc/client"
import type { AppRouter } from "./trpc.listen.deno.ts"
//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:4041",
    }),
  ],
})
