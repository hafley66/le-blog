// @@filename Without BehaviorSubject
import {
  map,
  merge,
  Observable,
  scan,
  startWith,
} from "rxjs"
import { withId } from "~/lib/form_helpers/with.dom"
import { RxJSX } from "~/lib/rxjs-vhtml/v2/jsx-runtime"

const MyButton: RxJSX.FC<{ name: string }> = props => (
  <button
    {...props}
    style={{ background: "red", ...props.style }}
  />
)

const Interactive = {
  addOne: withId("button", "add"),
  subOne: withId(MyButton, "sub"),
}

const state = merge(
  Interactive.addOne.$.click.pipe(map(() => 1)),
  Interactive.subOne.$.click.pipe(map(() => -1)),
).pipe(
  scan((sum, next) => sum + next, 0),
  startWith(0),
)

export default () => (
  <div style="display: flex; flex-direction: column;">
    <Interactive.addOne
      style={{
        padding: "10px",
        color: "white",
        background: "blue",
      }}
    >
      Add One
    </Interactive.addOne>
    <Interactive.subOne
      name="sub-one"
      style={{
        padding: "10px",
        color: "white",
      }}
    >
      Sub One
    </Interactive.subOne>
    <div>Result: {state}</div>
  </div>
)
