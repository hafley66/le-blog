import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { FS } from "~/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "Hello World",
  disable_toc: true,
  children: [
    <div key="1" style="text-align:center;">
      {$.markdown`

I'm Chris Hafley, and this is my personal site/blog/portfolio/notebook/garden/living resume.

I've been programming for 16 years, and in industry for ~10.

I love coding and working with others, and I intend to write a whole bunch of things on this site to try and help others and hopefully learn in the process.


This site is powered by a (currently) 725 lines of a custom remark.js plugin, and a variant of JSX that is just RxJS and strings over time.

---

Here is my TODO board. I made this using absolutely zero BehaviorSubjects, useState, useContext, useEffect, or for that matter any imperative global state, or ornate class diagram.

Quite literally just form states, api calls, and RxJS. I made it to test out how to do a full interactive app with my RxJS (RxJS + JSX) library. It looks a lot like React, __but its not__.

${
  ""
  // :::figure
  //`!["spongebob and patrick working hard"](../meme/spongebob-patrick-building.gif)`
  // ::figurecaption[Rare footage of me constantly working on this site's remark.js custom plugin]{}
  // :::
}
`}
    </div>,
    FS[
      "src/apps/task/frontend/index.dom.tsx"
    ].demoScript$(),
  ],
})

const d2forlater = `tools: Tooling {

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
me.fe -> ux`
