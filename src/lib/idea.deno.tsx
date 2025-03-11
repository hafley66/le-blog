/** @jsxImportSource ./rxjs-vhtml */
/** @jsxImportSourceTypes ./rxjs-vhtml */

import { Observable, map, of } from "rxjs"
import { TAG } from "~/lib/lib.dual.ts"
// Example Usage
const x = of(1, 2, 3)
const y = of(4, 5, 6, 7, 8)

const derp = (
  <div
    className={x}
    style={y.pipe(map(i => ({ marginTop: `${i}px` })))}
  >
    {
      new Observable<string>(subscriber => {
        subscriber.next("Loading")
        new Promise<{
          firstname: string
          lastname: string
        }>(res =>
          setTimeout(
            () =>
              res({
                firstname: "Fake",
                lastname: "McApi-Call Jr.",
              }),
            1000,
          ),
        )
          .then(it => {
            subscriber.next(
              `${it.firstname} ${it.lastname}`,
            )
            subscriber.complete()
          })
          .catch(err => subscriber.error(err))

        return () => {}
      })
    }
  </div>
).subscribe(lol => console.log("lmao", lol))

const NoWay = (props: any) => (
  <div className={x.pipe(map(String), TAG("NoWay"))}>
    Hello World
  </div>
)

// const example$ = (
//   <div className="test" style={({ marginTop: y })}>
//     {x}
//   </div>
// )

// jsx$("div", { class: "test", id: y }, "Hello ", x)

// example$.subscribe((it) => console.log("jsx$", it));
