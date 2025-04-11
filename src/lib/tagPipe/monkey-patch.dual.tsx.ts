import {
  Observable,
  OperatorFunction,
  pipe,
  UnaryFunction,
} from "rxjs"

// Global counter for unnamed pipes
let globalPipeCounter = 0

// Store for pipe metadata
export interface PipeMetadata {
  id: string
  operations: string[]
  sourceId?: string
  resultId?: string
}

export const pipeMetadata: Record<string, PipeMetadata> = {}

/**
 * Custom operator to name a pipe
 * @param id The identifier for the pipe
 */
export function pipeId<T>(
  id: string,
): UnaryFunction<Observable<T>, Observable<T>> {
  const it = (source: Observable<T>): Observable<T> => {
    // This is a no-op operator that just passes the source through
    return source
  }
  it.pipeId = id
  return it
}

// Store original pipe method
const originalPipe = Observable.prototype.pipe

let pid = 0

// Monkey patch the pipe method
Observable.prototype.pipe = function (
  ...operations: OperatorFunction<any, any>[]
): any {
  let pipeIdentifier: string | null = null
  let pid_ = pid++

  // Look for pipeId operator to extract the identifier
  for (let i = 0; i < operations.length; i++) {
    const op = operations[i]
    if (
      op.name === "pipeId" ||
      (op.operator && op.operator.name === "pipeId")
    ) {
      // Extract the ID from the operator
      pipeIdentifier =
        op.id || `pipe-${globalPipeCounter++}`
      // Remove the pipeId operator as it's just for identification
      operations.splice(i, 1)
      break
    }
  }

  // If no pipeId was found, generate a sequential ID
  if (!pipeIdentifier) {
    pipeIdentifier = `pipe-${globalPipeCounter++}`
  }

  // Store metadata about this pipe
  pipeMetadata[pipeIdentifier] = {
    id: pipeIdentifier,
    operations: operations.map(op => op.name || "unknown"),
    sourceId: (this as any).__pipeId,
  }

  // Call the original pipe method
  const result = originalPipe.apply(this, operations)

  // Tag the result with the pipe ID for chaining
  ;(result as any).__pipeId = pipeIdentifier

  return result
}
