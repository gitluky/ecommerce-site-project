function displayProducts() {
  const Product = createProduct();
  const categoryId = $('#product-container').data('categoryid')
  boldCategory(categoryId);
  let url = location.href === 'http://localhost:3000/' ? '/categories/' + categoryId + '/products' : location.href
  fetch(url)
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
      clearNotifications();
      $('#product-container').data('categoryid', categoryId);
      history.pushState('products',null,'/categories/' + categoryId + '/products');
      displayProducts();
    });
  })
}

function boldCategory(categoryId) {
  $('.category-link').css('font-weight', 'normal');
  $('.category-link[data-categoryid="' + categoryId + '"]').css('font-weight', 'bold');
}

function displayProduct() {
  const url = location.href;
  fetch(url)
  .then(resp => resp.text())
  .then(text => {
    $('#product-container').html(text);
    attachAddToCartListener();
  });
}

function attachProductListeners() {
  const productCards = $('.product-card');
  productCards.each((index, productCard) => {
    const productId = $(productCard).data('productid');
    const categoryId = $('#product-container').data('categoryid');
    const url = '/categories/' + categoryId + '/products/' + productId
    $(productCard).click((event) => {
      event.preventDefault();
      clearNotifications();
      history.pushState('product', null, url);
      displayProduct();
    })
  })
}

function attachAddToCartListener() {
  $('#new_line_item').submit((event) => {
    event.preventDefault();
    if ($('.login-link').length === 0) {
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
    } else {
      fetch('/users/sign_in')
      .then(resp => resp.text())
      .then(text => {
        $('#form-container').html(text);
        $('.alert').text('Please log in or sign up.')
        attachLoginFormListener();
        attachSignUpLinkListener();
      })
    }
  })
}
