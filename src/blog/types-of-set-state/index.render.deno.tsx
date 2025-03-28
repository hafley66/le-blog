import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "Types of setState",
  description: (
    <div className="f-col">
      <strong>DRAFT!!!</strong>
      <em>
        <blockquote>
          "Do you think God stays in heaven because he too
          lives in fear of what he's created?"
        </blockquote>
      </em>
    </div>
  ),
  // date_created: "2025-02-25",

  tags: ["typescript", "javascript", "react", "rxjs"],
  ...$.md`
## 
`,
})
