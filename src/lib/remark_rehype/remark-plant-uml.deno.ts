import type { Node, Nodes as MNodes, Root } from "mdast";
import { lastValueFrom } from "rxjs";
import { visit } from "unist-util-visit";
import { $$ } from "~/BASH.deno.ts";
import { $ } from "zx";
export function remarkPlantUML() {
  return async (tree: Root) => {
    const plantUMLServerUrl = Deno.env.get("URL_PLANT_UML");

    if (!plantUMLServerUrl) {
      throw new Error("URL_PLANT_UML environment variable is not set");
    }

    const promises: Promise<any>[] = [];

    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "plantuml") {
        promises.push(
          fetch(`${plantUMLServerUrl}/svg/`, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
            body: node.value,
          })
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(
                  `Failed to generate diagram: ${response.statusText}`,
                );
              }

              const svg = await response.text();

              const imageNode = {
                type: "html",
                value: svg, // Insert the SVG directly into the markdown
              };

              parent.children[index] = imageNode;
            }).catch((error) => {
              console.error(error);
              // Optionally, replace node with an error message
              parent.children[index] = {
                type: "text",
                value: `Error generating PlantUML diagram: ${error.message}`,
              };
            }),
        );
      } else if (node.lang === "d2") {
        // Replace this stub with the logic to execute the D2 binary
        promises.push(
          generateD2Diagram(node.value.trim()).then((svg) => {
            parent.children[index] = { type: "html", value: svg };
          }).catch((error) => {
            console.error(error);
            parent.children[index] = {
              type: "text",
              value: `Error generating D2 diagram: ${error.message}`,
            };
          }),
        );
      }
    });

    await Promise.all(promises);
    return;
  };
}

// This function would run the D2 binary to generate an SVG
async function generateD2Diagram(d2Content: string) {
  // Use Deno.run or another mechanism to execute the D2 binary
  // This is a stub - actual implementation depends on setup
  // Consider using an HTTP service wrapped around your D2 tool if complex
  // console.log("Calling D2", d2Content);
  // Example using Deno.run (stub implementation - adjust args and paths):
  const command = $`d2 -`;

  command.stdin.write(d2Content);
  command.stdin.end();

  return await command.text(); // foo\n\bar\n
}
