export const main = (
  <div style={{ background: "red", color: "white" }}>
    {true ? "Yes " : "No "}
    {false ? "Yay " : "Nay "}
  </div>
)
// --cut--
main.subscribe(n => (document.body.innerHTML = n))
