export default class ProductCard extends HTMLElement {
  set product(value) {
    this._product = value;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div style="border:1px solid #ccc;padding:15px;width:250px">
        <img src="${this._product.image}" style="width:100%;height:180px;object-fit:cover" />
        <h3>${this._product.name}</h3>
        <strong>${this._product.price} PLN</strong>
        <button>Dodaj do koszyka</button>
      </div>
    `;

    this.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('add-to-cart', {
          detail: this._product,
          bubbles: true
        })
      );
    });
  }
}

customElements.define('product-card', ProductCard);
  