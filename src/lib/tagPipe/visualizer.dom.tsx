import { pipeMetadata } from "./monkey-patch.dual.tsx"

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DomVisualizer {
  /**
   * Create a DOM visualization of the RxJS pipe flow
   * @param containerId The ID of the container element
   */
  static createDomVisualization(
    containerId: string | HTMLElement,
  ): void {
    const container =
      containerId instanceof HTMLElement
        ? containerId
        : document.getElementById(containerId)
    if (!container) {
      console.error(
        `Container with ID ${containerId} not found`,
      )
      return
    }

    // Clear the container
    container.innerHTML = ""

    // Create a title
    const title = document.createElement("h2")
    title.textContent = "RxJS Pipe Flow Visualization"
    container.appendChild(title)

    // Create a visualization container
    const vizContainer = document.createElement("div")
    vizContainer.className = "rxjs-viz-container"
    container.appendChild(vizContainer)

    // Add some basic styling
    const style = document.createElement("style")
    style.textContent = `
      .rxjs-viz-container {
        font-family: monospace;
        padding: 10px;
      }
      .rxjs-pipe {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .rxjs-pipe-id {
        font-weight: bold;
        color: #007bff;
      }
      .rxjs-operations {
        margin: 5px 0;
        color: #28a745;
      }
      .rxjs-children {
        margin-left: 20px;
      }
      .rxjs-arrow {
        color: #dc3545;
        font-weight: bold;
      }
    `
    document.head.appendChild(style)

    // Find root pipes (those without a source)
    const rootPipes = Object.values(pipeMetadata).filter(
      pipe => !pipe.sourceId,
    )

    // Recursively build the visualization
    rootPipes.forEach(pipe => {
      // biome-ignore lint/complexity/noThisInStatic: <explanation>
      const pipeElement = this.createPipeElement(pipe)
      vizContainer.appendChild(pipeElement)
    })
  }

  /**
   * Create a DOM element for a pipe and its downstream pipes
   */
  private static createPipeElement(pipe: any): HTMLElement {
    const pipeDiv = document.createElement("div")
    pipeDiv.className = "rxjs-pipe"

    const pipeId = document.createElement("div")
    pipeId.className = "rxjs-pipe-id"
    pipeId.textContent = `Pipe: ${pipe.id}`
    pipeDiv.appendChild(pipeId)

    const operations = document.createElement("div")
    operations.className = "rxjs-operations"
    operations.textContent = `Operations: ${pipe.operations.join(" → ")}`
    pipeDiv.appendChild(operations)

    // Find downstream pipes
    const downstreamPipes = Object.values(
      pipeMetadata,
    ).filter(p => p.sourceId === pipe.id)

    if (downstreamPipes.length > 0) {
      const arrow = document.createElement("div")
      arrow.className = "rxjs-arrow"
      arrow.textContent = "↓"
      pipeDiv.appendChild(arrow)

      const children = document.createElement("div")
      children.className = "rxjs-children"

      downstreamPipes.forEach(downstream => {
        const childElement =
          this.createPipeElement(downstream)
        children.appendChild(childElement)
      })

      pipeDiv.appendChild(children)
    }

    return pipeDiv
  }
}
