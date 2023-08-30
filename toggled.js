class Toggled extends HTMLElement {

  _toggledBody = `
    <style>
    #info-box {
      display: block;
    }
    </style>
    <button>Show</button>  
    <p id="info-box"><slot></slot></p>  
    `;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this._toggledBody;
    this._isOpen = false;
    this._button;
    this._p;
  }
  connectedCallback() {
    if (this.hasAttribute("isOpen")) {
      if (this.getAttribute('isOpen') === "true") {
        this._isOpen = true;
      }
    }
    this._button = this.shadowRoot.querySelector('button');
    this._p = this.shadowRoot.querySelector('p');
    if (this._button) {
      this._button.addEventListener("click", this._toggleOpen.bind(this));
      this._button.textContent = this._isOpen ? "Hide" : "Show"
    }
    if (this._p) {
      this._p.style.display = this._isOpen ? "block" : "none";
    }
  }

  _toggleOpen() {
    this._isOpen = !this._isOpen;
    if (this._p) {
      this._p.style.display = this._isOpen ? "block" : "none";
    }
    if (this._button) {
      this._button.textContent = this._isOpen ? "Hide" : "Show"
    }
  }
}
customElements.define("cm-toggled", Toggled);