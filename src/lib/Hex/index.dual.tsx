export const Hex: {
  (props: {
    value: React.ReactNode
  }): React.ReactNode
  getColor(index: number): Record<string, string>
  className: string
} = props => {
  return (
    <>
      <div className="hex-content hex-shadow">
        <div className="hex-content-amoeba" />
      </div>
      <div className="hex-content-amoeba" />
      <span>{props.value}</span>
    </>
  )
}

Hex.getColor = index => ({
  "--hex-color": `var(--color-inferno-${((index + 1) * 2) % 17})`,
})

Hex.className = "hex-content"
