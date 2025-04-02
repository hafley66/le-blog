// @@filename Async Observables
import { Observable, timeInterval } from "rxjs"

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
    {
      new Observable<string>(sub => {
        sub.next("...")
        fakeUserApiCall().then(
          i => {
            sub.next(i.name)
            sub.complete()
          },
          err => sub.error(err),
        )
        return () => {}
      })
    }
  </div>
)
  .pipe(timeInterval())
  .subscribe(console.log)
