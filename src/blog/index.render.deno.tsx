import _ from "lodash"
import { combineLatest, filter, map, switchMap } from "rxjs"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { deferFrom } from "~/lib/lib.dual.ts"
import { SUB } from "~/blog/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

const allRenders = combineLatest(
  SUB.includes("render.deno.ts")
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
      i =>
        i.importMetaFilename !== import.meta.filename! &&
        !!i.props.date_created,
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
            <hr />
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
  disable_toc: true,
  // date_created: "2025-02-25",
  // tags: [],
  children: body,
})
