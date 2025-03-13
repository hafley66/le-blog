/** @jsxImportSource ~/lib/rxjs-vhtml */
/** @jsxImportSourceTypes ~/lib/rxjs-vhtml */

import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "How its made: This website, Part 1",
  url: "/blog/how-i-made-this-site",
  description: "Astro.js is cool, but its too much magic",
  date_created: "2025-03-11",
  tags: [
    "typescript",
    "javascript",
    "astro",
    "ssg",
    "deno",
    "markdown",
    "node",
    "",
  ],
  ...$.md`

## Reasons to make my own website
So I have been caught writing a lot of my thoughts to coworkers in gigantic article length messages. 
If you've hit the teams message limit enough times, it gets frustrating...or if you've ever had Confluence or Teams decide your message was no longer worth keeping around >:|



## Astro.js: The good

`,
})
