export function TextDiff(p: { a: string; b: string }) {
  return DiffViewer({
    rows: groupDiffLinesToRows(diffLines(p.a, p.b)).map(
      r => ({
        ...r,
        bText: escape(r.bText ?? ""),
        aText: escape(r.aText ?? ""),
      }),
    ),
  })
}

type DiffLine = {
  aLine: number | null
  bLine: number | null
  type: "equal" | "insert" | "delete"
  text: string
  groupId?: string
}

type DiffRow = {
  aLine: number | null
  bLine: number | null
  aText: string | null
  bText: string | null
  type: "equal" | "insert" | "delete" | "replace"
  groupId?: string
}

export function diffLines(
  a: string,
  b: string,
): DiffLine[] {
  const aLines = a.split("\n")
  const bLines = b.split("\n")
  const m = aLines.length
  const n = bLines.length

  const dp = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0),
  )
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] =
        aLines[i] === bLines[j]
          ? 1 + dp[i + 1][j + 1]
          : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }

  const out: DiffLine[] = []
  let i = 0,
    j = 0
  let aLine = 0,
    bLine = 0

  while (i < m || j < n) {
    if (i < m && j < n && aLines[i] === bLines[j]) {
      out.push({
        aLine,
        bLine,
        type: "equal",
        text: aLines[i],
      })
      i++
      j++
      aLine++
      bLine++
    } else if (
      j < n &&
      (i === m || dp[i][j + 1] >= dp[i + 1]?.[j])
    ) {
      out.push({
        aLine: null,
        bLine,
        type: "insert",
        text: bLines[j],
      })
      j++
      bLine++
    } else if (i < m) {
      out.push({
        aLine,
        bLine: null,
        type: "delete",
        text: aLines[i],
      })
      i++
      aLine++
    }
  }

  return out
}

export function groupDiffLinesToRows(
  lines: DiffLine[],
): DiffRow[] {
  const rows: DiffRow[] = []
  let i = 0
  while (i < lines.length) {
    const cur = lines[i]
    const next = lines[i + 1]

    if (cur.type === "equal") {
      rows.push({
        aLine: cur.aLine,
        bLine: cur.bLine,
        aText: cur.text,
        bText: cur.text,
        type: "equal",
      })
      i++
    } else if (
      cur.type === "delete" &&
      next?.type === "insert"
    ) {
      rows.push({
        aLine: cur.aLine,
        bLine: next.bLine,
        aText: cur.text,
        bText: next.text,
        type: "replace",
      })
      i += 2
    } else if (cur.type === "insert") {
      rows.push({
        aLine: null,
        bLine: cur.bLine,
        aText: null,
        bText: cur.text,
        type: "insert",
      })
      i++
    } else if (cur.type === "delete") {
      rows.push({
        aLine: cur.aLine,
        bLine: null,
        aText: cur.text,
        bText: null,
        type: "delete",
      })
      i++
    }
  }
  return rows
}

export function DiffViewer({
  rows,
  inline,
}: { rows: DiffRow[]; inline?: boolean }) {
  console.log({ rows })
  if (inline) {
    return (
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
        }}
      >
        {rows.map((row, i) => {
          const bg =
            row.type === "insert"
              ? "#c8facc"
              : row.type === "delete"
                ? "#fdd"
                : row.type === "replace"
                  ? "#fceeb5"
                  : undefined

          return (
            <div
              key={i}
              style={{
                backgroundColor: bg,
                color:
                  row.type !== "equal"
                    ? "black"
                    : undefined,
                padding: "0 0.5em",
              }}
            >
              <span style={{ opacity: 0.5 }}>
                {row.aLine ?? "-"} | {row.bLine ?? "-"}
              </span>{" "}
              {row.bText ?? row.aText}
            </div>
          )
        })}
      </pre>
    )
  }

  return (
    <div
      style={{ display: "flex", fontFamily: "monospace" }}
    >
      <pre style={{ flex: 1, margin: 0, padding: 0 }}>
        {rows
          .filter(i => i.aLine != null)
          .map((row, i) => (
            <div
              key={`left-${i}`}
              style={{
                backgroundColor:
                  row.type === "delete" ||
                  row.type === "replace"
                    ? "#fdd"
                    : undefined,
                color:
                  row.type !== "equal"
                    ? "black"
                    : undefined,
                padding: "0 0.5em",
              }}
            >
              <span style={{ opacity: 0.5 }}>
                {row.aLine ?? "-"}
              </span>{" "}
              {row.aText ?? ""}
            </div>
          ))}
      </pre>
      <pre style={{ flex: 1, margin: 0, padding: 0 }}>
        {rows
          .filter(i => i.bLine != null)
          .map((row, i) => (
            <div
              key={`right-${i}`}
              style={{
                color:
                  row.type !== "equal"
                    ? "black"
                    : undefined,
                backgroundColor:
                  row.type === "insert" ||
                  row.type === "replace"
                    ? "#c8facc"
                    : undefined,
                padding: "0 0.5em",
              }}
            >
              <span style={{ opacity: 0.5 }}>
                {row.bLine ?? "-"}
              </span>{" "}
              {row.bText ?? ""}
            </div>
          ))}
      </pre>
    </div>
  )
}

function escape(s: string | any): string {
  if (typeof s === "string")
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/'/g, "&#39;")
      .replace(/"/g, "&quot;")
  return s + ""
}
