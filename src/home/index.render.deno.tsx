import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { FS } from "~/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "Hello World",
  disable_toc: true,
  children: $.markdown`

I'm Chris Hafley and this is my personal site/blog/portfolio/notebook/garden/living resume.

I am a professional software engineer and am currently looking for a next role.

I have tried to bake in as much app state using css instead of js and trying my best to uphold accessibility with native html.

Here is my current professional highlights as a diagram:

~~~d2
tools: Tooling {

}

me: Chris Hafley {
  fe: Frontend Skills
  be: Backend Skills
}

ux: UX Team {

}

pm: Product Managers {

}

ceo: Stakeholders {

}

me.fe -> ux: Measure future design efforts
me.fe -> ux: Help maintain consistency across designs
me.fe -> ux
~~~
`,
})
