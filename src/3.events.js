class Notification extends HTMLElement {
  constructor () {
    super()
  }

  connectedCallback () {
    this._render()
  }

  disconnectedCallback () {
    const event = new CustomEvent('notification-removed', {
      detail: {
        title: this.getAttribute('title'),
        content: this.getAttribute('content')
      }
    })

    this.dispatchEvent(event)
  }

  _render () {
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
