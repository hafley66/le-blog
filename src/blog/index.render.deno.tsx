import _ from "lodash"
import { combineLatest, map, switchMap } from "rxjs"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { deferFrom } from "~/lib/lib.dual.ts"
import { FS, SITEMAP } from "~/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

const allRenders = combineLatest(
  SITEMAP.includes("render.deno.ts" as const)
    .filter(
      i => i.path !== "src/blog/index.render.deno.tsx",
    )
    .map(i =>
      deferFrom(() =>
        i.dynamicImport().then(i => i.default),
      ),
    ),
).pipe(
  map(i => {
    const blogs = i.filter(
      i => i.importMetaFilename !== import.meta.filename!,
    )

    const groups = {} as Record<
      string,
      Set<(typeof blogs)[number]>
    >
    for (const it of blogs) {
      for (const t of it.props.tags ?? []) {
        ;(groups[t] ||= new Set()).add(it)
      }
    }
    const tag_to_post = _.mapValues(groups, i => [...i])

    return {
      tag_to_post,
      blogs,
      i,
    }
  }),
)

const body = allRenders.pipe(
  switchMap(i => (
    <div>
      {i.blogs.map(it => (
        <a
          className="blog-linkimus"
          key={it.props.title}
          href={it.dir.replace(
            "index.render.deno.tsx",
            "index.html",
          )}
        >
          <section>
            <h2>{it.props.title}</h2>
            <p>{it.props.description}</p>
          </section>
        </a>
      ))}
    </div>
  )),
)

export default $.SSGLayout({
  title: "All Posts",
  description: "",
  // date_created: "2025-02-25",
  // tags: [],
  children: body,
})
