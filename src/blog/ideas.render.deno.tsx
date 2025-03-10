import _ from "lodash"
import { switchMap, tap } from "rxjs"
import { Layout } from "../lib/0_Layout.dual.tsx"
import { Render$ } from "../lib/0_RenderBase.deno.tsx"
import { asyncPrerenderStatic } from "../lib/00_ReactAsyncPrerender.dual.tsx"
import {
  Mermaider,
  Remark,
} from "../lib/00_Remark.deno.tsx"
import { deferFrom } from "../lib/fs_watcher.deno.ts"

const OUTFILE = import.meta.filename!.replace(
  ".render.deno.tsx",
  ".vite.html",
)

export const render$ = deferFrom(async () => {
  const $ = Render$()
  return asyncPrerenderStatic(
    <Layout
      title="How I made this site"
      url="/blog/how-i-made-this-site"
      description="TOCs are hard man"
      author=""
      date_created="2025/03/08"
      tags={[
        "vultr",
        "rsync",
        "bash",
        "nginx",
        "ssh",
        "ssl",
      ]}
    >
      <Remark
        val={`
          
## Derp derpy doo 

\`\`\`ts 
const jsx = 14; 
\`\`\`

`}
      />
      <Mermaider
        val={`
graph LR
  A --> B
  B --> C`}
      />
      {/* <$.SectionH2
        title="Whoopy doopy"
        render={<p>Whoooomp</p>}
      /> */}
    </Layout>,
  )
}).pipe(
  tap({
    // subscribe: () => {
    //   try {
    //     Deno.removeSync(OUTFILE)
    //   } catch (e) {}
    // },
  }),
  switchMap(
    async content => (
      console.log("Writing...", OUTFILE),
      {
        writer: await Deno.writeTextFile(
          OUTFILE,
          content.replace(
            /[\u0000-\u001F\u007F-\u009F]/g,
            "",
          ),
        ),
        content,
        renderedPath: OUTFILE,
        dirname: import.meta.dirname,
        filename: import.meta.filename,
      }
    ),
  ),
)
