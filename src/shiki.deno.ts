import js from "@shikijs/langs/javascript"
import ts from "@shikijs/langs/typescript"
import bash from "@shikijs/langs/bash"
import html from "@shikijs/langs/html"
import tsx from "@shikijs/langs/tsx"
import jsx from "@shikijs/langs/jsx"
import json from "@shikijs/langs/json"
import css from "@shikijs/langs/css"
import mermaid from "@shikijs/langs/mermaid"
import nord from "@shikijs/themes/nord"
import vitesseDark from "@shikijs/themes/vitesse-dark"
import vitesseLight from "@shikijs/themes/vitesse-light"
import oneDarkPro from "@shikijs/themes/one-dark-pro"

import { createHighlighterCore } from "shiki/core"
import { createOnigurumaEngine } from "shiki/engine/oniguruma"
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
