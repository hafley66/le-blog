class Sidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = String.raw`
      <div>
        Derp
      </div>
    `;
    this.style.display = "block";
    this.style.width = "250px";
    this.style.height = "100%";
    this.style.backgroundColor = "#f5f5f5";
    this.style.padding = "1rem";
    this.style.boxSizing = "border-box";
  }
}

customElements.define("hafley-sidebar", Sidebar);

declare global {
  interface HTMLElementTagNameMap {
    "hafley-sidebar": Sidebar;
  }
}
