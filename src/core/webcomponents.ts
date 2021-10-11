const template = document.createElement('template');

template.innerHTML = `
  <style>
    h3 {
      color: coral;
    }
  </style>
  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  showInfo: boolean = true;
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.appendChild(template.content.cloneNode(true));
    this.shadowRoot!.querySelector('h3')!.innerText =
      this.getAttribute('name')!;
    this.shadowRoot!.querySelector('img')!.src = this.getAttribute('avatar')!;
  }
  toggleInfo() {
    this.showInfo = !this.showInfo;
    const info = this.shadowRoot!.querySelector('.info')!;
    const toggleBtn = this.shadowRoot!.querySelector('#toggle-info')!;
    if (this.showInfo) {
    } else {
    }
  }
  connectedCallback() {
    this.shadowRoot!.getElementById('toggle-info')!.addEventListener(
      'click',
      () => this.toggleInfo()
    );
  }
  disconnectedCallback() {
    this.shadowRoot!.getElementById('toggle-info')!.removeEventListener(
      'click',
      () => this.toggleInfo()
    );
  }
}

window.customElements.define('user-card', UserCard);

export {};
