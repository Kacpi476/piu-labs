import loadTemplate from '../loadTemplate.js';

export default class ProductCard extends HTMLElement {
  constructor() {
    super();
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
  }

  async connectedCallback() {
    const shadowRoot = this.shadowRoot;

    if (!ProductCard.template) {
      ProductCard.template = await loadTemplate('./components/product-card.html');
    }

    if (shadowRoot.children.length === 0 && ProductCard.template) {
      shadowRoot.appendChild(ProductCard.template.content.cloneNode(true));
    }
  }
}

ProductCard.template = null; 

customElements.define('product-card', ProductCard);