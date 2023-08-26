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
        </style>
        <slot/>
        <span/>
   `
    constructor() {
        super()
        this._title = "";
        this._message = "";
        this._container;
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = this.tooltipBody;
    }
    connectedCallback() {
        if (this.hasAttribute('tooltip-title')) {
            this._title = this.getAttribute('tooltip-title')
        }
        if (this.hasAttribute('message')) {
            this._message = this.getAttribute('message')
        }
        this.style.position = 'relative';
        const span = this.shadowRoot.querySelector('span');
        const slot = this.shadowRoot.querySelector('slot');
        if (span) {
            span.innerText = this._title;
            span.addEventListener('mouseenter', this._mouseEnter.bind(this))
            span.addEventListener('mouseleave', this._mouseLeave.bind(this))
            this.shadowRoot.appendChild(span)
        }
        if (slot) {
            slot.addEventListener('mouseenter', this._mouseEnter.bind(this))
            slot.addEventListener('mouseleave', this._mouseLeave.bind(this))
        }
    }

    disconnectedCallback() {

    }

    _mouseEnter() {
        this._container = document.createElement('div');
        this._container.innerText = this._message;
        this._container.className = "container"
        this.shadowRoot.appendChild(this._container);
    }
    _mouseLeave() {
        this.shadowRoot.removeChild(this._container);
    }
}
customElements.define("kl-tooltip",Tooltip)