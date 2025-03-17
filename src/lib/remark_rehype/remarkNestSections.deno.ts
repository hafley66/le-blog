import _ from "lodash";
import type { Node, Nodes as MNodes, Root } from "mdast";
import type { Node as HNode, Nodes as HNodes, Root as HRoot } from "hast";
import { Directives } from "mdast-util-directive";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";
import { h } from "hastscript";

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
    }; // Root of the transformed AST

    let sectionStack = [root]; // Stack to track nesting

    for (const node of tree.children) {
      if (node.type === "heading") {
        // console.log("NODE", node
        const level = node.depth; // `h1` -> 1, `h2` -> 2, etc.
        // Close sections if the new heading is at a higher or equal level
        if (props.enableNesting) {
          while (
            sectionStack.length > 1 &&
            (sectionStack[sectionStack.length - 1]?.depth ??
                0) >= level
          ) {
            sectionStack.pop();
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
        );
        if (props.enableNesting) {
          // Append the new section to the last section in the stack
          sectionStack[
            sectionStack.length - 1
          ].children.push(newSection);

          // Push this new section onto the stack
          sectionStack.push(newSection);
        } else {
          sectionStack = [newSection];
          root.children.push(newSection);
        }
      } else {
        // Append non-heading elements to the current open section
        sectionStack[sectionStack.length - 1].children.push(
          node,
        );
      }
    }
    // @ts-ignore
    tree.children = root.children; // Replace tree children with our transformed structure
  };
}

export const rehypeAddIdToSectionForToc = () => {
  return (tree: any) => {
    visit(tree, "element", (node: HNodes, index, parent) => {
      if (node.type !== "element") return;

      if (
        node.tagName === "pre" &&
        node.properties.class?.toString().includes("shiki")
      ) {
        node.children = [
          {
            type: "element",
            tagName: "div",
            properties: {
              "class": "code-scroller",
            },
            children: node.children,
          },
          {
            type: "element",
            tagName: "button",
            properties: {
              "class": "copy-to-clipboard caption",
            },
            children: [{
              type: "text",
              "value": "Copy",
            }],
          },
        ];
      }

      if (node.tagName === "section") {
        let headerId = "";
        const heading = node.children.find((i) =>
          i.type === "element" && i.tagName.match(/^h[123456]$/ig)
        );

        const text =
          heading?.type === "element" && heading.children?.[0].type === "text"
            ? heading.children[0]
            : null;
        headerId = _.kebabCase(text?.value.replace(/^(\d+\.)+/ig, ""));
        // console.log({ heading, text, headerId });
        if (heading?.type === "element" && text?.type === "text") {
          node.properties.id = `section-${headerId}`;
          heading.properties.id = headerId;
          heading.children = [{
            type: "element",
            tagName: "a",
            properties: {
              href: `#${headerId}`,
            },
            children: [text],
          }];
        }
      }
    });
  };
};

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
  let codes_id = 0;
  let tab_id = 0;
  return (tree: any) => {
    visit(tree, (node: MNodes | Directives) => {
      if (node.type === "containerDirective" && node.name === "codes") {
        const enhanced = node.children.filter((i) => i.type === "code").map(
          (i) => {
            const maybe = i.value.match(/(.* @@filename .*)\n/i)?.[1];
            console.log({ maybe, data: i.data });
            const filename = maybe?.split("@@filename ")[1];
            const id = `code-group-radio-${tab_id++}`;
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
              value: maybe ? i.value.replace?.(maybe, "") ?? i.value : i.value,
              id,
            };
          },
        );

        const radioName = `code-group-${codes_id++}`;

        node.children = [
          {
            type: "element",
            data: {
              hProperties: { class: "code-group-tabs" },
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
                        checked: "data-last" in (node.attributes || {})
                          ? (index === enhanced.length - 1) && "true"
                          : index === 0 && "true",
                      },
                      children: [],
                    },
                    {
                      type: "element" as const,
                      tagName: "label",
                      properties: { for: i.id },
                      children: [{
                        type: "element",
                        tagName: "div",
                        properties: {
                          class: "centerino",
                        },
                        children: [{
                          type: "text",
                          value: i.filename ?? "???",
                        }],
                      }],
                    },
                  ];
                }),
              ],
            },
          },
          ...enhanced,
          {
            type: "element",
            data: { hName: "style" },
            value: `
.code-group pre {display:none}
.${radioName} {
${
              enhanced.map((i, index) => `
  #${i.id}+label {

  }

  #${i.id}:checked+label {
    background:rgb(18, 18, 18);
    position: relative;
    z-index:1;

    &:hover {
      text-decoration: underline;
      color: white;
    }

    border-top-color: var(--color-red-600);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      z-index: 10;
      width: 100%; 
      background: var(--color-red-600);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      z-index: 10;
      width: 100%; 
      background: rgba(18, 18, 18, 1.0);;
    }
  }

  &:has(#${i.id}:checked) pre:nth-child(${index + 2}){ 
    display: block;
  }
  `).join("\n")
            }
} `,
          },
        ];

        node.data = {
          hName: "div",
          hProperties: { class: "code-group " + radioName, ...node.attributes },
        };

        return;
      }
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name, node.attributes || {});

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}
