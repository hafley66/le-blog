import _ from "lodash"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { $$ } from "~/BASH.deno.ts"
import { lastValueFrom, switchMap } from "rxjs"
const $ = Render$(import.meta.filename!)
import { of } from "rxjs"

export default $.SSGLayout({
  tags: [],
  title: "",
})
