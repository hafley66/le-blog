import rehypeExpressiveCode, {
  RehypeExpressiveCodeOptions,
} from "rehype-expressive-code"
import ecTwoSlash from "expressive-code-twoslash"
import remarkGfm from "remark-gfm"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import { use, useMemo } from "react"
import remarkRehype from "remark-rehype"
import rehypeSanitize from "rehype-sanitize"
import { unified } from "unified"

import { createMermaidRenderer } from "mermaid-isomorphic"

const MERMAIDER = createMermaidRenderer()
const diagram = `
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D; 
`
const safeMermaider = async (mermaid: string) => {
  try {
    const derp = (await MERMAIDER([mermaid]))[0]
    return derp.status === "fulfilled" ? derp.value.svg : ""
  } catch (e) {
    console.error(e)
    return `<pre>
        <code>${mermaid}</code>
      </pre>`
  }
}
// const results = await renderer([diagram])
// console.log(results)

const rehypeExpressiveCodeOptions: RehypeExpressiveCodeOptions =
  {
    defaultProps: {
      overridesByLang: {
        "bash,ps,sh,ts,tsx,js,jsx": {
          preserveIndent: false,
        },
      },
      // wrap: true,
      preserveIndent: true,
    },
    plugins: [ecTwoSlash({})],
  }

const REEEE = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  // .use(
  //   rehypeMermaid,
  //   {} as Parameters<typeof rehypeMermaid>[0],
  // )
  .use(rehypeSanitize)
  .use(rehypeExpressiveCode, rehypeExpressiveCodeOptions)
  .use(rehypeStringify)

export const Remark = (props: {
  val?: string
  children?: string
}) => {
  const wtf = use(
    useMemo(
      () => REEEE.process(props.val ?? props.children),
      [props.val],
    ),
  )
  return (
    <div dangerouslySetInnerHTML={{ __html: wtf.value }} />
  )
}

export const RemarkDenoSyntaxHighlighter = (props: {
  href: string
}) => {
  const text = useMemo(
    () => Deno.readTextFileSync(props.href),
    [props.href],
  )
  const wtf = use(
    useMemo(() => REEEE.process(text), [text]),
  )
  return (
    <div dangerouslySetInnerHTML={{ __html: wtf.value }} />
  )
}

export const Mermaider = (props: { val: string }) => {
  const wtf = use(
    useMemo(() => safeMermaider(props.val), [props.val]),
  )
  return <div dangerouslySetInnerHTML={{ __html: wtf }} />
}

export const MermaiderDeno = (props: {
  href: string
}) => {
  const text = useMemo(
    () => Deno.readTextFileSync(props.href),
    [props.href],
  )
  const wtf = use(
    useMemo(() => safeMermaider(text), [text]),
  )
  return <div dangerouslySetInnerHTML={{ __html: wtf }} />
}
