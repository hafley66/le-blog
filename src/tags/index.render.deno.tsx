import _ from "lodash"
import { combineLatest, map, switchMap } from "rxjs"
import { FS, SITEMAP } from "~/SITEMAP.deno.ts"
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { Hex } from "~/lib/Hex/index.dual.tsx"
import { deferFrom } from "~/lib/lib.dual.ts"
const $ = Render$(import.meta.filename!)

const allRenders = combineLatest(
  SITEMAP.includes("render.deno.ts" as const)
    .filter(i => i.path.startsWith("src/blog"))
    .filter(
      i =>
        i.path !== "src/blog/index.render.deno.tsx" &&
        i.path !== "src/resume/index.render.deno.tsx" &&
        i.path !== "src/home/index.render.deno.tsx" &&
        i.path !== "src/tags/index.render.deno.tsx",
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
    <div
      class="responsive-hex-grid-3"
      style={{
        flexDirection: "row",
        gap: "32px",
        justifyContent: "space-around",
      }}
    >
      {_.sortBy(
        Object.entries(i.tag_to_post),
        i => i[0],
      ).map(([tag, its], index) => (
        <div
          key={tag}
          className={Hex.className}
          style={{
            ...Hex.getColor(index),
          }}
        >
          <Hex value={tag} />
        </div>
        /* {its.map(it => (
              <a
                className="blog-linkimus"
                key={it.props.title}
                href={it.dir.replace(
                  "index.render.deno.tsx",
                  "index.html",
                )}
              >
                <h2>{it.props.title}</h2>
                <hr />
                <p>{it.props.description}</p>
              </a>
            ))} */
      ))}
    </div>
  )),
)

export default $.SSGLayout({
  title: "All Tags",
  description: "Oh this looks bad",
  disable_toc: true,
  // date_created: "2025-02-25",
  // tags: [],
  children: body,
})
