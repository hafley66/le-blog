import React, { use, useMemo } from "react"
import { prerender } from "react-dom/static"
import _ from "lodash"
import { Buffer } from "node:buffer"
import {
  isObservable,
  lastValueFrom,
  Observable,
} from "rxjs"

export const asyncPrerenderStatic = async (
  jsxMaybes: React.ReactNode | Observable<React.ReactNode>,
): Promise<string> => {
  const Root = isObservable(jsxMaybes)
    ? () =>
        use(
          useMemo(
            () => lastValueFrom(jsxMaybes),
            [jsxMaybes],
          ),
        )
    : () => jsxMaybes

  const reader = (
    await prerender(<Root />)
  ).prelude.getReader()

  let content = ""
  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      return content
    }
    content += Buffer.from(value).toString("utf8")
  }
}
