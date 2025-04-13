/** @jsxImportSource ~/lib/rxjs-vhtml/v3/ */
import { merge, Observable, of } from "rxjs"
import { map } from "rxjs/operators"
import {
  pipeMetadata,
  pipeTree,
  PipeNode,
  pipeEvents,
  lifeEvents,
  rxjsDebugState,
} from "./core.2.dual"
import { RxJSXNode } from "~/lib/rxjs-vhtml/v3/jsx-runtime"
import { CONSOLE_TAG, TAG } from "../lib.dual"
import "./index.css"

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

// // Additional components for more detailed views

// Component to show detailed pipe metadata
export const PipeMetadataView = rxjsDebugState.pipe(
  map(
    ({
      currentNode,
      observables,
      subs,
      subscribeChain,
      activeSubRoots,
    }) => {
      const tree = `
      display: grid;
      grid-template-columns: auto 100px 150px;
      row-gap: 4px;
      list-style: none;
      padding: 0;
      margin: 0;
    `

      const subtree = `
      display: grid;
      grid-template-columns: subgrid;
    `

      const node = `
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
    `

      // .node > :first-child {
      //   padding-left: calc(var(--depth) * 1.5rem);
      // }

      const containerStyle = {
        fontFamily: "monospace",
        padding: "15px",
        backgroundColor: "#f8f8f8",
        border: "1px solid #ddd",
        borderRadius: "4px",
        maxHeight: "500px",
        overflow: "auto",
      }

      // const headerStyle = {
      //   fontSize: "16px",
      //   fontWeight: "bold",
      //   marginBottom: "10px",
      // }

      // const pipeStyle = {
      //   padding: "8px",
      //   margin: "5px 0",
      //   backgroundColor: "#fff",
      //   border: "1px solid #eee",
      //   borderRadius: "4px",
      // }

      // const pipeIdStyle = {
      //   fontWeight: "bold",
      //   color: "#0066cc",
      // }

      // Grab all unique root, trace them recursively by observable ID

      const Node = (lol: (typeof observables)[string]) => {
        if (!lol) {
          return null
        }

        return (
          <li
            className="__node"
            style={{ ["--depth" as any]: lol.depth }}
          >
            <p>{lol.url.replace(lol.parent ?? "", "")}</p>
            {!!lol.children && (
              <ol>
                {lol.children
                  .map(i => observables[i])
                  .map(Node)}
              </ol>
            )}
          </li>
        )
      }
      return (
        <div className="rxjs-debugger">
          {!!currentNode[0].children && (
            <ol className={"__tree"}>
              {Object.entries(subs)
                .flatMap(([k, v]) =>
                  v.map(it => ({
                    url: k,
                    lol: it.events,
                    parent: it.root?.[0] ?? null,
                    children: [],
                    childPipes: [],
                    depth: observables[k].depth,
                    refs: [],
                  })),
                )
                .map(Node)}
            </ol>
          )}
        </div>
      )

      // return (
      //   <div style={containerStyle}>
      //     <div style={headerStyle}>Pipe Metadata</div>

      //     {Object.entries(pipeMetadata).map(([id, data]) => (
      //       <div key={id} style={pipeStyle} debug>
      //         <div style={pipeIdStyle}>{id}</div>
      //         <div>
      //           Operations: {data.operations.join(", ")}
      //         </div>
      //         {!!data.sourceId && (
      //           <div>Source: {data.sourceId}</div>
      //         )}
      //         {!!data.resultId && (
      //           <div>Result: {data.resultId}</div>
      //         )}
      //         {!!data.operatorIds &&
      //           data.operatorIds.length > 0 && (
      //             <div>
      //               Operators: {data.operatorIds.join(", ")}
      //             </div>
      //           )}
      //         {!!data.subscriberIds &&
      //           data.subscriberIds.length > 0 && (
      //             <div>
      //               Subscribers:{" "}
      //               {data.subscriberIds.join(", ")}
      //             </div>
      //           )}
      //       </div>
      //     ))}
      //   </div>
      // )
    },
  ),
)

export const RXJSX_DEBUG_DEMO = (
  <div>
    <h1>RxJS Debugger</h1>
    {PipeMetadataView}
  </div>
)
