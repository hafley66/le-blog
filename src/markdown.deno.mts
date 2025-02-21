import { transformerTwoslash } from "@shikijs/twoslash";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
// import MarkdownItAsync from "markdown-it-async";

import markdownItToc from "markdown-it-toc-done-right";
// @ts-ignore
import markdownItSub from "markdown-it-sub";
// @ts-ignore
import markdownItSup from "markdown-it-sup";
// @ts-ignore
import markdownItFootnote from "markdown-it-footnote";
// @ts-ignore
import markdownItDeflist from "markdown-it-deflist";
// @ts-ignore
import markdownItAbbr from "markdown-it-abbr";
// @ts-ignore
import markdownItContainer from "markdown-it-container";
// @ts-ignore
import markdownItIns from "markdown-it-ins";
// @ts-ignore
import markdownItMark from "markdown-it-mark";
// @ts-ignore
import markdownItTaskLists from "markdown-it-task-lists";
import { SHIKI_LANGS } from "./shiki.dual.mts";
import Shiki from "@shikijs/markdown-it";

export const MARKDOWN_IT = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})
  .use(
    await Shiki({
      theme: "nord",
      transformers: [transformerTwoslash()],
      langs: SHIKI_LANGS,
    }),
  )
  .use(markdownItAnchor, {
    permalink: true,
    // permalinkBefore: true,
    // permalinkSymbol: "ø",
  })
  .use(markdownItToc)
  .use(markdownItSub)
  .use(markdownItSup)
  .use(markdownItFootnote)
  .use(markdownItDeflist)
  .use(markdownItAbbr)
  .use(markdownItContainer)
  .use(markdownItIns)
  .use(markdownItMark)
  .use(markdownItTaskLists);
