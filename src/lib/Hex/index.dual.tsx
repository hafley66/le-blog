import { Observable, of } from "rxjs"

export const Hex: {
  (props: {
    value: string
  }): Observable<string>
  getColor(index: number): Record<string, string>
  className: string
} = props => {
  return of(
    String.raw`
      <div class="hex-content hex-shadow">
        <div class="hex-content-amoeba"></div>
      </div>
      <div class="hex-content-amoeba"></div>
      <span>${props.value}</span>
`,
  )
}

Hex.getColor = index => ({
  "--hex-color": `var(--color-inferno-${((index + 1) * 2) % 17})`,
})

Hex.className = "hex-content"
