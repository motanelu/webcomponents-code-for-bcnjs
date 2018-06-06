const CSS_STYLE = `
  * {
    margin: 0;
  }
  :host {
    font-family: "Comic Sans MS"; /* on purpose :) */
    display: block;
    margin: 5px;
    padding: 2px;
    border-radius: 5px;
    background-color: #97bbf4;
  }
  :host([type="danger"]) {
    background-color: #ed7965;
  }
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
  }
`

class Notification extends HTMLElement {
  static get observedAttributes () {
    return ['title', 'content', 'disposable']
  }

  constructor () {
    super()

    /** @type {HTMLElement} */
    this._shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this._render()
  }

  attributeChangedCallback (name, current, previous) {
    this._render()
  }

  _render () {
    while (this._shadow.firstChild) {
      this._shadow.removeChild(this._shadow.firstChild)
    }

    const title = document.createElement('strong')
    const content = document.createElement('p')

    title.innerHTML = this.getAttribute('title')
    content.innerHTML = this.getAttribute('content')

    this._shadow.appendChild(title)
    this._shadow.appendChild(content)

    if (this.getAttribute('disposable')) {
      const close = document.createElement('span')
      close.classList.add('close')
      close.innerHTML = 'X'
      close.addEventListener('click', () => {
        this.parentNode.removeChild(this)
      })

      this._shadow.appendChild(close)
    }

    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.innerHTML = CSS_STYLE

    this._shadow.appendChild(style)
  }
}

window.customElements.define('cstm-notification', Notification)
