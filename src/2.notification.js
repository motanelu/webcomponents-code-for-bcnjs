class Notification extends HTMLElement {
  static get observedAttributes () {
    return ['title', 'content', 'disposable']
  }

  constructor () {
    super()
  }

  connectedCallback () {
    this._render()
  }

  attributeChangedCallback (name, current, previous) {
    this._render()
  }

  _render () {
    while (this.firstChild) {
      this.removeChild(this.firstChild)
    }
    const title = document.createElement('strong')
    const content = document.createElement('p')

    title.innerHTML = this.getAttribute('title')
    content.innerHTML = this.getAttribute('content')

    this.appendChild(title)
    this.appendChild(content)

    if (this.getAttribute('disposable')) {
      const close = document.createElement('span')
      close.classList.add('close')
      close.innerHTML = 'X'
      close.addEventListener('click', () => {
        this.parentNode.removeChild(this)
      })

      this.appendChild(close)
    }
  }
}

window.customElements.define('cstm-notification', Notification)
