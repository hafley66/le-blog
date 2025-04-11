import type { Root, RootContent, Element } from "hast"
function cssEscapeSimple(str: string, double = false) {
  return `${str.replace(/[^a-zA-Z0-9_-]/g, c => (double ? `\\\\${c}` : `\\${c}`))}`
}

let rid = 0
/**
 * Process HAST code blocks to add cut line functionality
 * @param {Object} hastNode - The HAST node to process
 * @return {Object} The processed HAST node
 */
export function processCodeCuts(
  hastNode: Root,
  id: string,
): Root {
  // Track cut regions
  let cutRegions = [] as {
    index: number
    startLine: number
    endLine: number
  }[]
  let currentCutIndex = 0
  let inCutRegion = false
  let startLineNumber = null

  // Clone the node to avoid mutating the original
  const processedNode = JSON.parse(
    JSON.stringify(hastNode),
  ) as Root

  // Process the node recursively
  processNode(processedNode.children[0])

  // Add toggle buttons for each cut region
  addToggleButtons(processedNode, cutRegions)

  const pre = processedNode.children[0]
  if (pre && pre.type === "element") {
    pre.properties.id ??= `${id}--pre`
    id = pre.properties.id
  }
  processedNode.children.push({
    type: "element",
    tagName: "style",
    properties: {},
    children: [
      {
        type: "text",
        value: cutRegions
          .map(
            c => `
            #${cssEscapeSimple(id)} {
              :nth-child(${c.endLine - c.startLine - 1} of [data-region="cut-${c.index}"]){
                  margin-bottom: -1.4rem;
                  display: inline-flex !important;
              }
            }
            #${cssEscapeSimple(id)}:not(:has(.cut-toggle-${c.index}:checked)) [data-region="cut-${c.index}"] {
              display: inline-flex;
              height: 0px;
              overflow: hidden;
              
            }
            #${cssEscapeSimple(id)}:has(.cut-toggle-${c.index}:checked) [data-region="cut-${c.index}"] {
              height: unset;
            }
            
            `,
          )
          .join("\n"),
      },
    ],
  })

  return processedNode

  /**
   * Process a node and its children
   * @param {Object} node - The node to process
   * @param {number} depth - Current depth in the tree
   */
  function processNode(node: RootContent, depth = 0) {
    // Only process nodes with children
    if (
      !node ||
      !(node.type === "element" && node.children)
    )
      return

    // If this is a code block with line spans
    if (
      node.type === "element" &&
      node.tagName === "code"
    ) {
      processCodeBlock(node)
    } else {
      // Process children recursively
      node.children.forEach(child =>
        processNode(child, depth + 1),
      )
    }
  }

  /**
   * Process a code block node
   * @param {Object} codeNode - The code block node
   */
  function processCodeBlock(codeNode: Element) {
    // Reset state for each code block
    inCutRegion = false
    currentCutIndex = 0
    startLineNumber = null

    // Get all line spans
    const lineSpans = codeNode.children.filter(
      child =>
        child.type === "element" &&
        child.tagName === "span" &&
        child.properties &&
        child.properties?.class?.includes?.("line"),
    ) as Element[]

    // Process each line span
    for (let i = 0; i < lineSpans.length; i++) {
      const lineSpan = lineSpans[i]
      const lineContent = getTextContent(lineSpan)
      if (!lineSpan.properties) lineSpan.properties = {}
      if (!lineSpan.properties.class)
        lineSpan.properties.class = ""

      // Check for cut markers
      if (lineContent.includes("// --cut-start")) {
        // console.log("Found cut start!", lineContent)
        lineSpan.properties.class += " cut-op"
        inCutRegion = true
        startLineNumber = i + 1 // 1-based line numbers
        currentCutIndex++
        continue
      }

      if (lineContent.includes("// --cut-end")) {
        // console.log("Found cut end! 1", lineContent)
        lineSpan.properties.class += " cut-op"
        if (inCutRegion) {
          // console.log("Found cut end! 2", lineContent)
          // Store the cut region info
          cutRegions.push({
            index: currentCutIndex,
            startLine: startLineNumber,
            endLine: i + 1,
          })

          inCutRegion = false
        }
        continue
      }

      // Add class to lines in cut region
      if (inCutRegion) {
        // console.log("Found in cut region! 3", lineContent)
        lineSpan.properties.class += " cut-line"
        lineSpan.properties.dataRegion = `cut-${currentCutIndex}`
      }
    }
  }

  /**
   * Add toggle buttons for each cut region
   * @param {Object} rootNode - The root HAST node
   * @param {Array} regions - The cut regions information
   */
  function addToggleButtons(
    rootNode: Root,
    regions: any[],
  ) {
    // Find all code blocks
    const codeBlocks = findAllCodeBlocks(rootNode)

    // Process each code block
    codeBlocks.forEach(codeBlock => {
      const lineSpans = codeBlock.children.filter(
        child =>
          child.type === "element" &&
          child.tagName === "span" &&
          child.properties &&
          child.properties.class &&
          child.properties.class?.includes?.("line"),
      )

      // Add toggle buttons for each region
      regions.forEach(region => {
        // Find the line before the cut region starts
        if (region.startLine > 1) {
          const insertAfterIndex = region.startLine - 1 // Convert to 0-based index

          if (
            insertAfterIndex >= 0 &&
            insertAfterIndex < lineSpans.length
          ) {
            // Create toggle button
            const toggleButton = createToggleButton(
              region.index,
              region.startLine,
              region.endLine,
            ) as Element

            // Insert after the line before the cut region
            const insertPosition =
              codeBlock.children.indexOf(
                lineSpans[insertAfterIndex],
              ) + 1
            codeBlock.children.splice(
              insertPosition,
              0,
              toggleButton,
            )
          }
        }
      })
    })
  }

  /**
   * Find all code blocks in the HAST tree
   * @param {Object} node - The node to search
   * @return {Array} Array of code block nodes
   */
  function findAllCodeBlocks(node: Root) {
    const codeBlocks: Element[] = []

    function search(node: RootContent) {
      if (!node) return

      if (
        node.type === "element" &&
        node.tagName === "code"
      ) {
        codeBlocks.push(node)
      } else if (node.children) {
        node.children.forEach(search)
      }
    }

    search(node)
    return codeBlocks
  }

  /**
   * Create a toggle button for a cut region
   * @param {number} regionIndex - The region index
   * @param {number} startLine - The start line number
   * @param {number} endLine - The end line number
   * @return {Object} The toggle button HAST node
   */
  function createToggleButton(
    regionIndex: number,
    startLine: number,
    endLine: number,
  ): Element {
    const lineCount = endLine - startLine - 1
    rid++
    return {
      type: "element",
      tagName: "span",
      properties: {
        class: ["cut-toggle-container"],
        dataId: "cut-toggle-" + regionIndex,
      },
      children: [
        {
          type: "element",
          tagName: "input",
          properties: {
            type: "checkbox",
            id: `cut-toggle-${rid}`,
            name: `cut-toggle-${rid}`,
            class: [`cut-toggle cut-toggle-${regionIndex}`],
            "aria-label": `Show ${lineCount} hidden lines`,
          },
          children: [],
        },
        {
          type: "element",
          tagName: "label",
          properties: {
            htmlFor: `cut-toggle-${rid}`,
            class: ["cut-toggle-label"],
            dataLines: lineCount,
          },
          children: [
            {
              type: "text",
              value: `Show ${lineCount} more lines...`,
            },
          ],
        },
      ],
    }
  }

  /**
   * Get the text content of a node
   * @param {Object} node - The node to extract text from
   * @return {string} The text content
   */
  function getTextContent(node: RootContent) {
    if (!node) return ""

    if (node.type === "text") {
      return node.value || ""
    }

    if (node.children) {
      return node.children.map(getTextContent).join("")
    }

    return ""
  }
}
import rehypeParse from "rehype-parse"
import rehypeStringify from "rehype-stringify"
import { unified } from "unified"

// Example HTML with code block
const html = `
<pre><code>
  <span class="line">function example() {</span>
  <span class="line">  // Normal code</span>
  <span class="line">  const a = 1;</span>
  <span class="line">  // --cut-start</span>
  <span class="line">  // This will be hidden</span>
  <span class="line">  const b = 2;</span>
  <span class="line">  const c = 3;</span>
  <span class="line">  // --cut-end</span>
  <span class="line">  return a + b + c;</span>
  <span class="line">}</span>
</code></pre>
`

// Parse HTML to HAST
const hast = unified()
  .use(rehypeParse, { fragment: true })
  .parse(html)

// Process the HAST to add cut line functionality
const processedHast = processCodeCuts(hast)

// Convert back to HTML
const result = unified()
  .use(rehypeStringify)
  .stringify(processedHast)

console.log(String(result))
