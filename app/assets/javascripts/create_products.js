
function createProduct() {
  return class {
    constructor(args) {
      for (let i = 0; i < Object.keys(args).length; i++) {
        this[Object.keys(args)[i]] = Object.values(args)[i];
      }
    }

    generateProductCellHtml() {
      let html = `<a href="products/${this.id}" class="product-card" data-productid="${this.id}">
                    <img src="${this.attributes.thumbnails[0]}" class="product-image">
                    <h4>${this.attributes.name}</h4>
                    <p>${this.attributes['formatted_price']}</p>
                  </a>`
      return html;
    }

  }
}
