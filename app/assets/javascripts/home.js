$('.home.index').ready(function() {
  displayProducts();
  attachCategoryListeners();
});


function displayProducts() {
  const Product = createProduct();
  const categoryId = $('#product-container').data('categoryid')
  boldCategory(categoryId);
  fetch('/categories/' + categoryId + '/products')
    .then(resp => resp.json())
    .then(json => {
      $('#product-container').empty();
      json.data.forEach((dataObj) => {
        const newProduct = new Product(dataObj);
        const html = newProduct.generateProductCellHtml();
        $('#product-container').append(html);
        $('#product-container').attr('data-categoryid', categoryId);
      });
    })
}

function attachCategoryListeners() {
  const categoryLinks = $('.category-link');
  categoryLinks.each((index, categoryLink) => {
    const categoryId = $(categoryLink).data('categoryid')
    $(categoryLink).click((event) => {
      event.preventDefault();
      $('#product-container').data('categoryid', categoryId);
      displayProducts();
    });
  })
}

function boldCategory(categoryId) {
  $('.category-link').css('font-weight', 'normal');
  $('.category-link[data-categoryid="' + categoryId + '"]').css('font-weight', 'bold');
}

function attachProductListeners() {
  const productCards = $('.product-card')


}
