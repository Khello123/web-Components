class Tooltip extends HTMLElement {

    tooltipBody = `
        <style>
        .container{
            background-color: #f3f4f6;
            color: #1f2937;
            position: absolute;
            z-index: 10;
            left:50px;
            top:20px;
            padding:5px 20px;
            border-radius:7px;
            font-size:14px;
        }
        :host{
            background-color:green;
        }
        :host(.important){
            background-color: var(--bg-primary,red);
        }
        :host-context(p){
            background-color: yellow;
        }
        ::slotted(*){
            background-color: blue;
        }
        ::slotted(span){
            background-color: orange;
        }
        </style>
        <slot></slot>
        <span></span>
   `
    constructor() {
        super()
        this._title = "";
        this._message = "";
        this._isVisible = false;
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = this.tooltipBody;
        this._span = this.shadowRoot.querySelector('span');
        this._slot = this.shadowRoot.querySelector('slot');
    }
    connectedCallback() {
        if (this.hasAttribute('tooltip-title')) {
            this._title = this.getAttribute('tooltip-title')
        }
        if (this.hasAttribute('message')) {
            this._message = this.getAttribute('message')
        }
        this.style.position = 'relative';
        if (this._span) {
            this._span.innerText = this._title;
            this._span.addEventListener('mouseenter', this._mouseEnter.bind(this))
            this._span.addEventListener('mouseleave', this._mouseLeave.bind(this))
        }
        if (this._slot) {
            this._slot.addEventListener('mouseenter', this._mouseEnter.bind(this))
            this._slot.addEventListener('mouseleave', this._mouseLeave.bind(this))
        }
    }

    disconnectedCallback() {
        this._span.removeEventListener("mouseenter", this._mouseEnter);
        this._span.removeEventListener("mouseleave", this._mouseLeave);
        this._slot.removeEventListener("mouseenter", this._mouseEnter);
        this._slot.removeEventListener("mouseleave", this._mouseLeave);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (name === "message") {

            this._message = newValue;
        }
        if (name === "tooltip-title") {
            this._title = newValue;
        }
    }

    static get observedAttributes() {
        return ['message', "tooltip-title"]
    }
    _render() {
        let container = this.shadowRoot.querySelector('div');
        if (this._isVisible) {
            container = document.createElement('div');
            container.innerText = this._message;
            container.className = "container"
            this.shadowRoot.appendChild(container);
        }
        else {
            if (container) {
                this.shadowRoot.removeChild(container);
            }
        }
    }
    _mouseEnter() {
        this._isVisible = true;
        this._render()
    }
    _mouseLeave() {
        this._isVisible = false;
        this._render()
    }
}
customElements.define("cm-tooltip",Tooltip)