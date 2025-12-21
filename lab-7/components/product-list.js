import products from '../data/products.json' with { type: 'json' };
import './product-card.js';

export default class ProductList extends HTMLElement {
  connectedCallback() {
    this.style.display = 'grid';
    this.style.gridTemplateColumns = 'repeat(auto-fill, 250px)';
    this.style.gap = '20px';

    products.forEach(product => {
      const card = document.createElement('product-card');
      card.product = product;
      this.appendChild(card);
    });
  }
}

customElements.define('product-list', ProductList);
