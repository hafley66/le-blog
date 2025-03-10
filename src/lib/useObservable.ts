import { useEffect, useState } from "react"
import { Observable } from "rxjs"

export function useObservable<T>(
  observable$: Observable<T>,
) {
  const [state, setState] = useState(null as null | T)
  useEffect(() => {
    const S = observable$.subscribe(setState)
    return () => S.unsubscribe()
  }, [observable$])
  return state
}
