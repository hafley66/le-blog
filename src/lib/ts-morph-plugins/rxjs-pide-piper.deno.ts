import { Project, SyntaxKind } from "ts-morph"

const code = `
import { of } from "rxjs";
import { map, filter } from "rxjs/operators";

const obs = of(1, 2, 3).pipe(
  map(x => x + 1),
  filter(x => x > 2)
);
`

const project = new Project()
const sourceFile = project.createSourceFile(
  "temp.ts",
  code,
  { overwrite: true },
)

sourceFile.forEachDescendant(node => {
  if (!node.isKind(SyntaxKind.CallExpression)) return

  const callExpr = node
  const expr = callExpr.getExpression()
  if (!expr.isKind(SyntaxKind.PropertyAccessExpression))
    return
  if (expr.getName() !== "pipe") return

  const args = callExpr.getArguments()
  if (args.length === 0) return

  const lhs = expr.getExpression().getText()
  const argsText = args.map(arg => arg.getText()).join(", ")

  callExpr.replaceWithText(
    `${lhs}.pipe(...(() => [${argsText}])())`,
  )
})

console.log(sourceFile.getFullText())
