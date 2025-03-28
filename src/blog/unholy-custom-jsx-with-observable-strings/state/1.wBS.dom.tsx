import { BehaviorSubject, Observable } from "rxjs"
import { withId } from "~/lib/lib.dom"
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

const state = new BehaviorSubject(0)

Interactive.addOne.$.click.subscribe(() => {
  state.next(state.value + 1)
})
Interactive.subOne.$.click.subscribe(() => {
  state.next(state.value - 1)
})

const main = (
  <div style="display: flex; flex-direction: column;">
    <Interactive.addOne
      style={{
        padding: 10,
        color: "white",
        background: "blue",
      }}
    >
      Add One
    </Interactive.addOne>
    <Interactive.subOne
      name="sub-one"
      style={{
        padding: 10,
        color: "white",
      }}
    >
      Sub One
    </Interactive.subOne>
    <div>Result: {state}</div>
  </div>
)

// --cut--
main.subscribe(n => (document.body.innerHTML = n))
