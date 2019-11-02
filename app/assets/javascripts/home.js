$( document ).on('turbolinks:load', function() {
  if ($('body').data('controller') == 'home' && $('body').data('action') == 'index') {
    displayProducts();
    attachCategoryListeners();
  }
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
      })
    })
    .then(() => attachProductListeners())
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
  const productCards = $('.product-card');
  productCards.each((index, productCard) => {
    const productId = $(productCard).data('productid')
    $(productCard).click((event) => {
      event.preventDefault();
      fetch('products/' + productId)
      .then(resp => resp.text())
      .then(text => {
        $('#product-container').html(text);
        attachAddToCartListener();
      })
    })
  })
}

function attachAddToCartListener() {
  $('#new_line_item').submit((event) => {
    event.preventDefault();
    const product_id = $('#line_item_product_id').val();
    const quantity = $('#line_item_quantity').val();
    const csrf_token = $("meta[name='csrf-token']").attr('content');
    fetch('/line_items', {
      method: 'POST',
      headers: {
       "Content-Type": "application/json",
       "Accept": "application/json",
       'X-CSRF-Token': csrf_token
      },
      body: JSON.stringify({product_id: product_id, quantity: quantity})
    })
    .then(resp => resp.json())
    .then(json => {
      $('#cart-link').text(`Cart (${json.data.attributes.item_count})`);
    });
  })
}
