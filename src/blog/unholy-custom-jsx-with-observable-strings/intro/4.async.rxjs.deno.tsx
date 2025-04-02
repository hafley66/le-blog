// @@filename Async RxJS
import {
  defer,
  from,
  map,
  startWith,
  timeInterval,
} from "rxjs"

type User = {
  id: number
  name: string
}

const fakeUserApiCall = (): Promise<User> =>
  new Promise(res =>
    setTimeout(
      () => res({ id: 0, name: "ZA WARUDO" }),
      100,
    ),
  )

const Subscription = (
  <div>
    Hello&nbsp;
    {defer(() => from(fakeUserApiCall())).pipe(
      map(i => i.name),
      startWith("..."),
    )}
  </div>
)
  .pipe(timeInterval())
  .subscribe(console.log)
