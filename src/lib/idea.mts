import {
  Observable,
  isObservable,
  combineLatest,
} from "rxjs"
import { map } from "rxjs/operators"
import { of } from "rxjs"

export function html(
  strings: TemplateStringsArray,
  ...values: any[]
): Observable<string> {
  const observables = values.map(value =>
    isObservable(value)
      ? value
      : new Observable(sub => {
          sub.next(value)
          sub.complete()
        }),
  )

  return combineLatest(observables).pipe(
    map(resolvedValues => {
      return strings.reduce(
        (acc, str, i) =>
          acc + str + (resolvedValues[i] ?? ""),
        "",
      )
    }),
  )
}

const x = of(1, 2, 3)

html`<div class="">${x}<script src="">

  import { of } from 'rxjs';

</script></div>`.subscribe()
