export default class CartComponent extends HTMLElement {
  constructor() {
    super();
    this.items = [];
  }

  connectedCallback() {
    this.render();

    window.addEventListener('add-to-cart', e => {
      this.items.push(e.detail);
      this.render();
    });
  }

  remove(index) {
    this.items.splice(index, 1);
    this.render();
  }

  render() {
    const sum = this.items.reduce((s, p) => s + p.price, 0);

    this.innerHTML = `
      <div style="border:1px solid #ccc;padding:15px;width:300px">
        <h2>Koszyk</h2>
        <ul>
          ${this.items
            .map(
              (item, index) => `
            <li>
              ${item.name} – ${item.price} PLN
              <button data-i="${index}">❌</button>
            </li>`
            )
            .join('')}
        </ul>
        <hr />
        <strong>Suma: ${sum} PLN</strong>
      </div>
    `;

    this.querySelectorAll('button[data-i]').forEach(btn => {
      btn.addEventListener('click', () =>
        this.remove(btn.dataset.i)
      );
    });
  }
}

customElements.define('cart-component', CartComponent);
