/** @jsxImportSource ~/lib/rxjs-vhtml/v3/ */
import { merge, Observable, of } from "rxjs"
import { map } from "rxjs/operators"
import {
  pipeMetadata,
  pipeTree,
  PipeNode,
  pipeEvents,
  lifeEvents,
} from "./core.2.dual"
import { RxJSXNode } from "~/lib/rxjs-vhtml/v3/jsx-runtime"
import { CONSOLE_TAG, TAG } from "../lib.dual"

const trigger = merge(
  of(null),
  pipeEvents,
  lifeEvents,
).pipe(CONSOLE_TAG("TRIGGER"))

// Types for visualization elements
interface NodeVisualizationProps {
  node: PipeNode
  depth: number
}

// Node visualization component
const NodeVisualization = ({
  node,
  depth,
}: NodeVisualizationProps) => {
  const indentStyle = {
    marginLeft: `${depth * 20}px`,
    borderLeft: depth > 0 ? "2px solid #ccc" : "none",
    paddingLeft: "10px",
  }

  const nodeStyle = {
    padding: "10px",
    margin: "5px 0",
    borderRadius: "4px",
    backgroundColor: "#f5f5f5",
    border: "1px solid #ddd",
    fontFamily: "monospace",
  }

  const headerStyle = {
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  }

  const operatorsStyle = {
    color: "#0066cc",
    marginBottom: "5px",
  }

  const subscribersStyle = {
    color: "#009900",
    marginBottom: "5px",
  }

  const arrowStyle = {
    color: "#cc0000",
    fontWeight: "bold",
    margin: "5px 0",
  }

  return (
    <div style={indentStyle}>
      <div style={nodeStyle}>
        <div style={headerStyle}>Pipe: {node.id}</div>
        <div style={operatorsStyle}>
          Operations: {node.operators.join(" → ")}
        </div>
        {node.subscribers.length > 0 && (
          <div style={subscribersStyle}>
            Subscribers: {node.subscribers.length}
          </div>
        )}
      </div>

      {node.children.length > 0 && (
        <div style={arrowStyle}>↓</div>
      )}

      {node.children.map((child, index) => (
        <NodeVisualization
          key={`${child.id}-${index}`}
          node={child}
          depth={depth + 1}
        />
      ))}
    </div>
  )
}

// Main debugger component
export const RXJS_DEBUGGER = trigger.pipe(
  map(() => {
    // Find root nodes (those without parents)
    const rootNodes = Object.values(pipeTree).filter(
      node => !node.parentId,
    )

    const containerStyle = {
      fontFamily: "sans-serif",
      padding: "20px",
      backgroundColor: "#ffffff",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      maxWidth: "100%",
      overflow: "auto",
    }

    const headerStyle = {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#333",
      borderBottom: "1px solid #eee",
      paddingBottom: "10px",
    }

    const statsStyle = {
      marginBottom: "15px",
      fontSize: "14px",
      color: "#666",
    }

    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          RxJS Pipe Flow Visualization
        </div>

        <div style={statsStyle}>
          <div>
            Total Pipes: {Object.keys(pipeTree).length}
          </div>
          <div>
            Total Metadata Entries:{" "}
            {Object.keys(pipeMetadata).length}
          </div>
        </div>

        <div>
          {rootNodes.map((node, index) => (
            <NodeVisualization
              key={`${node.id}-${index}`}
              node={node}
              depth={0}
            />
          ))}

          {rootNodes.length === 0 && (
            <div
              style={{
                color: "#999",
                fontStyle: "italic",
              }}
            >
              No RxJS pipes detected yet. Start using
              observables to see them here.
            </div>
          )}
        </div>
      </div>
    )
  }),
)

// // Additional components for more detailed views

// Component to show detailed pipe metadata
export const PipeMetadataView = trigger.pipe(
  map(() => {
    const containerStyle = {
      fontFamily: "monospace",
      padding: "15px",
      backgroundColor: "#f8f8f8",
      border: "1px solid #ddd",
      borderRadius: "4px",
      maxHeight: "500px",
      overflow: "auto",
    }

    const headerStyle = {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "10px",
    }

    const pipeStyle = {
      padding: "8px",
      margin: "5px 0",
      backgroundColor: "#fff",
      border: "1px solid #eee",
      borderRadius: "4px",
    }

    const pipeIdStyle = {
      fontWeight: "bold",
      color: "#0066cc",
    }

    return (
      <div style={containerStyle}>
        <div style={headerStyle}>Pipe Metadata</div>

        {Object.entries(pipeMetadata).map(([id, data]) => (
          <div key={id} style={pipeStyle} debug>
            <div style={pipeIdStyle}>{id}</div>
            <div>
              Operations: {data.operations.join(", ")}
            </div>
            {!!data.sourceId && (
              <div>Source: {data.sourceId}</div>
            )}
            {!!data.resultId && (
              <div>Result: {data.resultId}</div>
            )}
            {!!data.operatorIds &&
              data.operatorIds.length > 0 && (
                <div>
                  Operators: {data.operatorIds.join(", ")}
                </div>
              )}
            {!!data.subscriberIds &&
              data.subscriberIds.length > 0 && (
                <div>
                  Subscribers:{" "}
                  {data.subscriberIds.join(", ")}
                </div>
              )}
          </div>
        ))}

        {Object.keys(pipeMetadata).length === 0 && (
          <div
            style={{ color: "#999", fontStyle: "italic" }}
          >
            No pipe metadata available yet.
          </div>
        )}
      </div>
    )
  }),
)

// Component to show a simplified tree view
export const SimpleTreeView = trigger.pipe(
  map(() => {
    const containerStyle = {
      fontFamily: "sans-serif",
      padding: "15px",
    }

    const treeStyle = {
      listStyleType: "none",
      padding: 0,
      margin: 0,
    }

    const renderTreeNode = (
      node: PipeNode,
      depth: number,
    ) => {
      const nodeStyle = {
        marginLeft: `${depth * 20}px`,
        padding: "5px 0",
      }

      return (
        <li key={node.id} style={nodeStyle}>
          <strong>{node.id}</strong> (
          {node.operators.join(", ")})
          {node.children.length > 0 && (
            <ul style={treeStyle}>
              {node.children.map(child =>
                renderTreeNode(child, depth + 1),
              )}
            </ul>
          )}
        </li>
      )
    }

    // Find root nodes
    const rootNodes = Object.values(pipeTree).filter(
      node => !node.parentId,
    )

    return (
      <div style={containerStyle}>
        <h3>Observable Tree</h3>
        <ul style={treeStyle}>
          {rootNodes.map(node => renderTreeNode(node, 0))}
        </ul>
      </div>
    )
  }),
)
// function withId<Selector extends string = any>(
//   id: Selector,
// ) {
//   return {
//     id,
//     selector: "#" + id,
//     click: fromEventDelegate(`#${id}`, "click"),
//     props: {
//       id: "#" + id,
//     },
//   }
// }

// function ROOT<T extends string = any>(id?: T) {
//   return "my-confirm-dialog-" + (id ?? "")
// }

// const Buttons = {
//   confirm: ROOT("confirm"),
//   cancel: ROOT("cancel"),
//   extra: ROOT("extra"),
// }

// Buttons.
// In your render method:
export const RXJSX_DEBUG_DEMO = (
  <div>
    <h1>RxJS Debugger</h1>
    {RXJS_DEBUGGER}
    {PipeMetadataView}
    {SimpleTreeView}
  </div>
)
