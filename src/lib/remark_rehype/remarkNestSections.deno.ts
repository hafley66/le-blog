import _ from "lodash"
import type { Node, Nodes as MNodes, Root } from "mdast"
import type {
  Node as HNode,
  Nodes as HNodes,
  Root as HRoot,
  Element,
} from "hast"
import { Directives } from "mdast-util-directive"
import { u } from "unist-builder"
import { visit } from "unist-util-visit"
import { h } from "hastscript"
import { inspect } from "unist-util-inspect"
import { readdirSync, rmSync, writeFileSync } from "node:fs"
import { $$ } from "~/BASH.deno.ts"
import { lastValueFrom } from "rxjs"
import { visitParents } from "unist-util-visit-parents"
import { writeFile } from "node:fs/promises"

const evalLogs: Record<string, string[]> = {}
const demoLogs: Record<string, string> = {}
export function remarkNestSections(
  props: { enableNesting: boolean } = {
    enableNesting: false,
  },
) {
  return (tree: Root) => {
    const root = {
      type: "root",
      children: [] as Node[],
      depth: undefined as undefined | number,
    } // Root of the transformed AST

    let sectionStack = [root] // Stack to track nesting
    for (const node of tree.children) {
      if (node.type === "heading") {
        // console.log("NODE", node
        const level = node.depth // `h1` -> 1, `h2` -> 2, etc.
        // Close sections if the new heading is at a higher or equal level
        if (props.enableNesting) {
          while (
            sectionStack.length > 1 &&
            (sectionStack[sectionStack.length - 1]?.depth ??
              0) >= level
          ) {
            sectionStack.pop()
          }
        }

        // Create a new section for the heading
        const newSection = u(
          "section",
          {
            data: { hName: "section" },
            depth: level,
          },
          [node],
        )
        if (props.enableNesting) {
          // Append the new section to the last section in the stack
          sectionStack[
            sectionStack.length - 1
          ].children.push(newSection)

          // Push this new section onto the stack
          sectionStack.push(newSection)
        } else {
          sectionStack = [newSection]
          root.children.push(newSection)
        }
      } else {
        // Append non-heading elements to the current open section
        sectionStack[sectionStack.length - 1].children.push(
          node,
        )
      }
    }
    // @ts-ignore
    tree.children = root.children // Replace tree children with our transformed structure
  }
}

export const rehypeAddIdToSectionForToc = () => {
  return (tree: any) => {
    visit(
      tree,
      "element",
      (node: HNodes, index, parent) => {
        if (node.type !== "element") return

        if (
          node.tagName === "pre" &&
          node.properties.class
            ?.toString()
            .includes("shiki")
        ) {
          node.children = [
            {
              type: "element",
              tagName: "div",
              properties: {
                class: "code-scroller",
              },
              children: node.children,
            },
            {
              type: "element",
              tagName: "button",
              properties: {
                class: "copy-to-clipboard caption",
              },
              children: [
                {
                  type: "text",
                  value: "Copy",
                },
              ],
            },
          ]
        }

        if (node.tagName === "section") {
          let headerId = ""
          const heading = node.children.find(
            i =>
              i.type === "element" &&
              i.tagName.match(/^h[123456]$/gi),
          )

          const text =
            heading?.type === "element" &&
            heading.children?.[0].type === "text"
              ? heading.children[0]
              : null
          headerId = _.kebabCase(
            text?.value.replace(/^(\d+\.)+/gi, ""),
          )
          const marker = text?.value
            .match(/^((\d+\.)+) /gi)?.[0]
            .trim()
          // console.log({ marker })
          // console.log({ heading, text, headerId });
          if (
            heading?.type === "element" &&
            text?.type === "text"
          ) {
            node.properties.id = `section-${headerId}`
            heading.properties.id = headerId
            heading.children = [
              {
                type: "element",
                tagName: "a",
                properties: {
                  href: `#${headerId}`,
                },
                children: [
                  h(
                    "span",
                    { class: "marker" },
                    { type: "text", value: marker },
                  ),
                  ((text.value = text.value.replace(
                    marker,
                    "",
                  )),
                  text),
                  h("div", { class: "flair-a" }, []),
                ],
              },
              h("div", { class: "flair-h" }, []),
            ]
          }

          const parentSections: Array<any> =
            parent?.children?.filter(
              (i: any) => i.tagName === "section",
            )

          const incr = 100 / parentSections.length
          const start =
            ((parentSections.findIndex(i => i === node) +
              1) /
              parentSections.length) *
            100

          node.children.push({
            type: "element",
            tagName: "style",
            properties: {},
            children: [
              {
                type: "text",
                value: `
#${node.properties.id} {
  --section-header-hr-start: ${start - incr}%;
  --section-header-hr-stop: ${start}%;
}
`,
              },
            ],
          })

          node.children.push(
            h("div", { class: "flair-section" }, []),
          )
        }
      },
    )
  }
}

// This plugin is an example to let users write HTML with directives.
// It’s informative but rather useless.
// See below for others examples.
export function myRemarkPlugin() {
  /**
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  let codes_id = 0
  let tab_id = 0
  return async (tree: any) => {
    const promises: Promise<any>[] = []
    const wtf = readdirSync(`${import.meta.dirname!}/temp`)
    for (const it of wtf) {
      // rmSync(`${import.meta.dirname!}/temp/${it}`)
    }
    visit(tree, (node: MNodes | Directives) => {
      if (
        node.type === "containerDirective" &&
        node.name === "codes"
      ) {
        let srcToId = {} as Record<string, string>
        const enhanced = node.children
          .filter(i => i.type === "code")
          .map(i => {
            const maybe = i.value.match(
              /(.*@@filename.*\n)/i,
            )?.[1]
            const maybeLogs =
              i.value.match(/(.*@@log.*\n)/i)?.[1]
            // console.log({ maybe, data: i.data });
            const filename = maybe?.split("@@filename ")[1]
            const id = `code-group-radio-${tab_id++}`

            const f = maybe
              ? (i.value.replace?.(maybe, "") ?? i.value)
              : i.value
            const g = maybeLogs
              ? f.replace(maybeLogs, "")
              : f

            return {
              ...i,
              data: {
                ...i?.data,
                hProperties: {
                  ...i.data?.hProperties,
                  "data-for": id,
                },
              },
              filename,
              value: g,
              id,
            }
          })
          .map(node => {
            if (node.value.match(/@@eval/gi)) {
              const isFrontend =
                node.value.match(/@@eval-frontend/gi)
              node.value = node.value?.replace(
                /(.*@@eval.*\n)/i,
                "",
              )

              let key = `${+new Date()}`
              if (key in evalLogs) {
                key += `-${_.uniqueId()}`
              }
              evalLogs[key] = []
              const id = key

              const script = `
// ${id}
${`const log = console.log.bind(console);
console.log = (...args: any[]) => {
  log(...args)
  log('øøø')
  return;
};
;`}${node.value};
`
              if (isFrontend) {
              }
              const name = `${import.meta.dirname!}/temp/${id}.${node.lang!}`

              // console.log("Writing...", name, node.meta)
              promises.push(
                writeFile(name, script)
                  .then(() =>
                    lastValueFrom(
                      $$`deno --allow-read --allow-env ${name}`,
                    ),
                  )
                  .then(ret => {
                    // console.log(ret)
                    node.meta
                    // rmSync(name)
                    const res = ret
                      .split("\nøøø\n")
                      .filter(Boolean)
                    if (res.length) {
                      rmSync(name)
                      // We are going to look for .line {this key} in the html pass and expode the line parent with more lines.
                      evalLogs[`//${id}`] = res
                      node.value += `
//${id}`
                    }

                    return ret
                  })
                  .catch(err => {
                    console.log(
                      "ERROR in remark code sample!",
                    )
                    console.error(err)
                    return
                  }),
              )
            }
            if (node.value.match(/@@demo/gi)) {
              node.value = node.value?.replace(
                /(.*@@demo.*\n)/i,
                "",
              )
              let key = `${+new Date()}`
              if (key in demoLogs) {
                key += `-${_.uniqueId()}`
              }
              demoLogs[key] = key
              const id = key
              demoLogs[`//${id}`] = key
              node.value += `
//${id}`
            }
            if (node.value.includes("--cut--")) {
              const indexOf =
                node.value.indexOf("// --cut--")

              node.value = node.value.substring(0, indexOf)
            }
            if (node.value.includes("// @@src ")) {
              const maybe =
                node.value.match(/(.* @@src .*\n)/i)?.[1]
              const filename = maybe?.split("@@src ")[1]
              if (filename) {
                srcToId[node.id!] = filename.trim()
                node.value = node.value?.replace(
                  /(.* @@src .*\n)/i,
                  "",
                )
              }
              // node.src = filename
            }
            node.value = node.value.trim()
            return node
          })

        const radioName = `code-group-${codes_id++}`

        node.children = [
          {
            type: "element",
            data: {
              hProperties: {
                class: "code-group-tabs",
                "data-sticky": "1",
                id: radioName,
              },
              hName: "div",
              hChildren: [
                ...enhanced.flatMap((i, index) => {
                  return [
                    {
                      type: "element" as const,
                      tagName: "input",
                      properties: {
                        type: "radio",
                        name: radioName,
                        id: i.id,
                        checked:
                          "data-last" in
                          (node.attributes || {})
                            ? index ===
                                enhanced.length - 1 &&
                              "true"
                            : index === 0 && "true",
                      },
                      children: [],
                    },
                    {
                      type: "element" as const,
                      tagName: "label",
                      properties: { for: i.id },
                      children: [
                        {
                          type: "element",
                          tagName: "div",
                          properties: {
                            class: "centerino",
                          },
                          children: [
                            {
                              type: "text",
                              value: i.filename ?? "???",
                            },
                          ],
                        },
                      ],
                    },
                  ].filter(Boolean)
                }),
              ],
            },
          },
          // @ts-ignore
          ...enhanced,
          {
            type: "element",
            data: {
              hName: "div",
              hProperties: {
                class: "demo-iframe",
                id: "demo-iframe-" + radioName,
              },
            },
          },
          {
            type: "element" as const,
            data: { hName: "script" },
            value: `
            //${JSON.stringify(srcToId)}
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.getElementById("${radioName}");
  const demoContainer = document.getElementById("${"demo-iframe-" + radioName}");
  const toDemoArea = (src) => {
    demoContainer.children[0]?.remove();
    const iframe = document.createElement('iframe');
    iframe.style.width = 'calc(100%)';
    iframe.onload=function(){ window.resizeIframe(this)};
    
    iframe.onload = function() {
      const iframeWindow = iframe.contentWindow;
      const doc = iframe.contentDocument || iframeWindow.document;

      doc.open();
      doc.write(\`
        <html style='height: fit-content;'>
          <head>
            <style>
            <\\/style>
          <\\/head>
          <body style='margin: 4px; height: fit-content;'>
          <\\/body>
          <script type="module" src="\${src}"><\\/script>
          <script>
            console.log("WTF");
              (function() {
                const observer = new MutationObserver(() => {
                  // Adjust the height of the parent iframe based on the body's height
                  window.frameElement.style.height = (document.documentElement.offsetHeight + 1) +'px';
                });

                // Start observing changes in the body element
                observer.observe(document.body, { childList: true, subtree: true, attributes: true });

                // Initial setting of height
                window.frameElement.style.height = (document.documentElement.offsetHeight + 1) + 'px';
              })();
            <\\/script>
        <\\/html>
      \`);
      doc.close();
    };
    // iframe.style.cssText="width:100%;";
    demoContainer.appendChild(iframe);
    // const doc = iframe.contentDocument || iframe.contentWindow?.document;
    // doc.open();
    // doc.write(\`
    //   
    //   <head></head>
    //   
    //     
    //   </body>
    //   </html>
    // \`);
    // doc.close();
  };

${Object.entries(srcToId)
  .map(([k, v], index) => {
    return `
  const id${index} = document.getElementById('${k}');
  id${index}.addEventListener('input', e => {
    if(e.target.checked) {
      toDemoArea("${v}")
    }
  });
  if(id${index}.checked) {
    console.log("I am checked...", id${index});
    toDemoArea("${v}")
  }
  `
  })
  .join("\n")}
});
`,
          },
          {
            // @ts-ignore
            type: "element",
            data: { hName: "style" },
            value: `
.code-group pre {display:none}
.${radioName} {
${enhanced
  .map(
    (i, index) => `
  #${i.id}+label {

  }

  #${i.id}:checked+label {
    background:#282c34;
    position: relative;
    z-index:1;
    border-bottom: none;
    
    &:hover {
      text-decoration: underline;
      color: white;
    }

    border-top-color: var(--color-blue-500);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      z-index: 10;
      width: 100%; 
      background: var(--color-blue-500);
    }

  }

  &:has(#${i.id}:checked) pre:nth-child(${index + 2}){ 
    display: block;
  }
  `,
  )
  .join("\n")}
} `,
          },
        ]

        node.data = {
          hName: "div",
          hProperties: {
            class: "code-group " + radioName,
            ...node.attributes,
          },
        }

        return
      }
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        const data = node.data || (node.data = {})
        const hast = h(node.name, node.attributes || {})

        data.hName = hast.tagName
        data.hProperties = hast.properties
      }
    })
    await Promise.all(promises)
  }
}

export function rehype_AddConsoleLogsToLines() {
  return async (tree: HRoot) => {
    let promises: Promise<any>[] = []
    // console.log({ evalLogs })
    visitParents(
      tree,
      (node: HNodes, ancestors: HNodes[]) => {
        if (
          node.type === "element" &&
          (node.properties?.class as string)?.includes(
            "line",
          ) &&
          node.children?.[0]
        ) {
          const f = node.children?.[0]

          const possibleChild =
            f.type === "element" ? f.children?.[0] : null
          if (
            possibleChild &&
            possibleChild.type === "text" &&
            possibleChild.value in evalLogs
          ) {
            // console.log({ f })

            const p = ancestors.at(-1)
            const pre = ancestors.find(
              i =>
                i.type === "element" && i.tagName === "pre",
            )
            const logs = evalLogs[possibleChild.value]
            // now we swap
            if (
              pre &&
              pre.type === "element" &&
              p?.type === "element" &&
              logs.length
            ) {
              // remove eval id line
              const start = p.children.findIndex(
                i => i === node,
              )
              p.children.splice(start - 1, 2)
              // console.log({ start })

              pre.children.push({
                type: "element",
                tagName: "details",
                properties: {
                  class: "console.log-details",
                  open: "1",
                },
                children: [
                  {
                    type: "element",
                    tagName: "summary",
                    children: [
                      {
                        type: "text",
                        value: `console.log[${logs.length}]`,
                      },
                    ],
                    properties: {
                      class: "log-grid-heading",
                    },
                  },
                  {
                    type: "element",
                    tagName: "code",
                    properties: {
                      class: "console.log-output",
                    },
                    children: [
                      ...logs.flatMap<Element>(
                        (i, index) => [
                          {
                            type: "element",
                            tagName: "span",
                            children: [
                              {
                                type: "text",
                                value: `log(${index + 1})`,
                              },
                            ],
                            properties: {
                              class: "log-line",
                            },
                          },
                          {
                            type: "element",
                            tagName: "span",
                            children: [
                              { type: "text", value: i },
                            ],
                            properties: {
                              class: "log-line",
                            },
                          },
                        ],
                      ),
                    ],
                  },
                ],
              })
            }
            // console.log(p)
          }
        }
      },
    )

    await Promise.all(promises)
  }
}
