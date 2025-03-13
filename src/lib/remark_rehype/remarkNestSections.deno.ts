import _ from "lodash";
import type { Node, Root } from "mdast";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

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
        const level = node.depth; // `h1` -> 1, `h2` -> 2, etc.
        node.data = {
          hProperties: {
            id: _.kebabCase(node.children[0].value.split(" ")[1]),
          },
        };
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
  return (tree: Node) => {
    visit(tree, "element", (node: Node, index, parent) => {
      if (node.tagName === "section") {
        // console.log({ NODE: node });
        const heading = node.children.find(
          (i) => i.properties?.id,
        );
        if (heading) {
          node.properties.id = "section-" + heading.properties.id;
        }
      }
    });
  };
};
