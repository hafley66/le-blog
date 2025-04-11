import js from "@shikijs/langs/javascript"
import ts from "@shikijs/langs/typescript"
import bash from "@shikijs/langs/bash"
import html from "@shikijs/langs/html"
import tsx from "@shikijs/langs/tsx"
import jsx from "@shikijs/langs/jsx"
import json from "@shikijs/langs/json"
import css from "@shikijs/langs/css"
import mermaid from "@shikijs/langs/mermaid"
import vitesseDark from "@shikijs/themes/vitesse-dark"
import vitesseLight from "@shikijs/themes/vitesse-light"
import oneDarkPro from "@shikijs/themes/one-dark-pro"
import {
  transformerNotationDiff,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationFocus,
  transformerNotationMap,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  // ...
} from "@shikijs/transformers"
import { createHighlighterCore } from "shiki/core"
import { createOnigurumaEngine } from "shiki/engine/oniguruma"
import { deferFrom, TAG } from "../lib.dual"
import { readFile } from "node:fs/promises"
import { map, of } from "rxjs"
import { transformerTwoslash } from "@shikijs/twoslash"
import path from "node:path"

export const SHIKI_LANGS = [
  js,
  ts,
  bash,
  html,
  css,
  json,
  tsx,
  jsx,
  mermaid,
]

// Load this somewhere beforehand
const engine = await createOnigurumaEngine(
  import("shiki/wasm"),
)

export const SHIKI_THEMES = {
  light: vitesseLight,
  dark: vitesseDark,
  oneDarkPro,
}

export const SHIKI = await createHighlighterCore({
  langs: SHIKI_LANGS,
  themes: [vitesseDark, vitesseLight, oneDarkPro],
  engine, // if a resolved engine passed in, the rest can still be synced.
})

import { createHighlighter } from "shiki"
import { processCodeCuts } from "~/lib/remark_rehype/code-cutter.deno.ts"

// `createHighlighter` is async, it initializes the internal and
// loads the themes and languages specified.
const highlighter = await createHighlighter({
  themes: ["one-dark-pro"],
  langs: [
    "javascript",
    "typescript",
    "tsx",
    "ts",
    "js",
    "jsx",
    "json",
    "bash",
    "text",
    "shell",
    "python",
    "py",
    "mermaid",
    "css",
    "html",
  ],
})
let id = 0
export const Shiki = ({
  ...props
}: {
  src?: string
  code?: string
  lang?: string
  meta?: string | null
  debug?: boolean
  id?: string
}) => {
  const code = props.src
    ? deferFrom(() =>
        readFile(props.src!).then(i => i.toString("utf-8")),
      )
    : of(props.code ?? "")
  const _id = props.id ?? `${id++}`
  props.debug &&
    console.log({ meta: props.code?.includes("twoslash") })
  return code.pipe(
    map(c =>
      processCodeCuts(
        // @ts-ignore shhh hast types dont matter, stop mismatching
        highlighter.codeToHast(c.trim(), {
          mergeWhitespaces: false,
          lang:
            (props.lang && ensureDotExt(props.lang)) ||
            (props.src &&
              ensureDotExt(path.extname(props.src!))) ||
            "tsx",
          theme: "one-dark-pro",

          transformers: [
            ...(props.code?.includes("twoslash")
              ? [
                  transformerTwoslash({
                    throws: true,
                  }),
                ]
              : []),
            transformerNotationFocus({
              matchAlgorithm: "v3",
            }),
            transformerNotationDiff({
              matchAlgorithm: "v3",
            }),
            transformerNotationWordHighlight(),
            transformerMetaWordHighlight(),
            transformerMetaHighlight(),
          ],
        }),
        _id,
      ),
    ),
  )
}

function ensureDotExt(s: string) {
  return s.startsWith(".") ? s.slice(1) : s
}

Shiki({ code: "const x = 1;" }).subscribe(console.log)
