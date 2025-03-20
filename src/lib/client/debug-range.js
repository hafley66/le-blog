// .wrap(role='group' aria-labelledby='multi-lbl'
//   style=`--a: ${a}; --b: ${b}; --min: ${min}; --max: ${max}`)
// #multi-lbl Multi thumb slider:
// label.sr-only(for='a') Value A:
// input#a(type='range' min=min value=a max=max)
// output(for='a' style='--c: var(--a)')
// label.sr-only(for='b') Value B:
// input#b(type='range' min=min value=b max=max)
// output(for='b' style='--c: var(--b)')
let id_ = 0
class MyComponent extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: "open" })

    const container = document.createElement("div")
    container.classList.add("double-slider")

    const id = this.getAttribute("id") || `${id_++}`
    const [min, max, a, b] = [
      ["min", -50],
      ["max", 50],
      ["a", -30],
      ["b", 20],
    ].map(
      ([prop, def]) => +(this.getAttribute(prop) || def),
    )

    const propName = (i: string) => `${id}-`
    // let min = -50,
    //   max = 50
    // let a = -30,
    //   b = 20
    container.style.setProperty("--a", )
    container.innerHTML = String.raw`
<input type="range" min="${min}" max="${max}" value="${a}" />
<input type="range" min="${min}" max="${max}" value="${b}" />
`

    const style = document.createElement("style")
    style.textContent = `
                div {
                    color: blue;
                    font-size: 20px;
                }
            `

    shadow.appendChild(style)
    shadow.appendChild(container)
  }
}

customElements.define("range", MyComponent)
