/** @jsxImportSource ~/lib/rxjs-vhtml */
/** @jsxImportSourceTypes ~/lib/rxjs-vhtml */

import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "How I made this site as of 2025/03/16",
  description:
    "Astro.js is cool but I don't like that much magic",
  // date_created: "2025-03-11",
  tags: [
    "typescript",
    "javascript",
    "astro",
    "ssg",
    "deno",
    "markdown",
    "node",
  ],
  ...$.md`

## Reasons to make my own website
So I have been caught writing a lot of my thoughts to coworkers in gigantic article length messages. 
I kept hitting post limits, so better to state an argument for or against an idea publically, so my goal is to make it easy for me to shortform, it gets frustrating...or if you've ever had Confluence or Teams decide your message was no longer worth keeping around >:|



## The good



### Really nice docs

### Is quite fast 

### Lots of options

### Markdown 

### Vite based

## The Bad

### Too many options

### Confusing flow of time

### To react or not react

### Magic meta glob imports

### Collections or source code

### Markdown frontmatter

`,
})
