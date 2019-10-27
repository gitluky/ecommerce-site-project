
function createProduct() {
  return class {
    constructor(args) {
      for (let i = 0; i < Object.keys(args).length; i++) {
        this[Object.keys(args)[i]] = Object.values(args)[i];
      }
    }

    generateProductCellHtml() {
      let html = `<div class="product-card">
                    <img src="${this.thumbnails[0]}" class="product-image">
                    <h4>${this.name}</h4>
                    <p>${this.price}</p>
                  </div>
                  `
      return html;
    }

  }
}
