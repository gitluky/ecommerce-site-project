$(function() {
  attachCategoryListeners();
});

function attachCategoryListeners() {
  const Product = createProduct();
  const categoryLinks = $('.category-link');
  categoryLinks.each((index, categoryLink) => {
    const categoryId = $(categoryLink).data('categoryid')
    $(categoryLink).click((event) => {
      event.preventDefault();
      fetch('/categories/' + categoryId + '/products')
        .then(resp => resp.json())
        .then(json => {
          json.data.forEach((dataObj) => {
            const newProduct = new Product(dataObj.attributes);
            const html = newProduct.generateProductCellHtml();
            $('#product-container').append(html);
          });
        })
    });
  });
}
