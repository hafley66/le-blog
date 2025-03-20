import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { FS } from "~/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "Hello World",
  disable_toc: true,
  children: $.markdown`

I'm Chris Hafley and this is my personal site/blog/portfolio/notebook/garden/living resume.

I am a professional software engineer and am currently looking for a next role. 

I have tried to bake in as much app state using css instead of js and trying my best to uphold accessibility with native html, instead of over-relying on frameworks and not knowing what they know.

Here is my current professional highlights as a diagram:

~~~plantuml
@startuml
State1 --> [*]
State1 : this is a string
State1 : this is another string
State1 -> State2
State2 --> [*]
@enduml
~~~


~~~d2
x -> y: hello world
~~~

My larger project RxJS/Redux(at first). These libraries get me into practical functional programming concepts by treating

I have heavy expertise in web technologies (browsers) and while I have my own style, I like to discuss UX concepts 


`,
})
