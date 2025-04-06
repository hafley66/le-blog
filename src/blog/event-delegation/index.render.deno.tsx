// deno-lint-ignore-file jsx-key
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { SUB } from "./SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title:
    "Event Delegation Exploration with HTMLElement.closest",
  description:
    "Creating an all events visualizer for debugging",
  date_created: "2025-04-06",
  tags: ["rxjs", "events"],
  ...$.md`
## Test page
Testing 1-2-3

${SUB.fs["demo.dom.tsx"].DemoScript()}
`,
  // ``
})
