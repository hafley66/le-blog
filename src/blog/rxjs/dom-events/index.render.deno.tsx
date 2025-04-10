import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "(DRAFT) ",
  description: (
    <div className="f-col">
      <strong>DRAFT!!!</strong>
    </div>
  ),
  // date_created: "2025-02-25",
  tags: [
    "typescript",
    "javascript",
    "jsx",
    "react",
    "deno",
    "rxjs",
  ],
  ...$.md`

`,
})
