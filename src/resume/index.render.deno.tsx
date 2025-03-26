import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { FS } from "~/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)
export default (
  <$.SSGLayout title="" disable_toc>
    {FS["src/resume/resume.html"].readSync()}
  </$.SSGLayout>
)
