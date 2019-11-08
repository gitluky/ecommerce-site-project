$( document ).on('turbolinks:load', function() {
  if ($('body').data('controller') == 'home' && $('body').data('action') == 'index') {
    onLoadFunctions();
  }
});

function onLoadFunctions() {
  displayProducts();
  attachCategoryListeners();
  attachCartLinkListener();
  attachSignUpLinkListener();
  attachSearchListener();
  $('.login-link').length === 0 ? attachLogOutLinkListener() : attachLoginLinkListener();
}

function reloadCsrfAndNavBar() {
  fetch('/navbar')
  .then(resp => resp.text())
  .then(text => {
    $('#form-container').empty();
    $('#nav').html(text);
    attachLogOutLinkListener();
  })
  fetch('/csrf')
  .then(resp => resp.text())
  .then(text => {
    $('meta[name^="csrf"]').remove();
    $('head').prepend(text);
  })
}

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
      clearNotifications();
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
      clearNotifications();
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

function attachCartLinkListener() {
  $('#cart-link').click((event) => {
    event.preventDefault();
    fetchCart();
  })
}

function attachUpdateLineItemListener() {
  const lineItems = $('.edit_line_item');
  lineItems.each((index, lineItem) => {
    $(lineItem).submit((event) => {
      event.preventDefault();
      const lineItemId = $(lineItem).data('lineitemid');
      const quantity = $('#edit_line_item_' + lineItemId + ' > select').val();
      const csrf_token = $("meta[name='csrf-token']").attr('content');
      fetch('/line_items/' + lineItemId, {
        method: 'PATCH',
        headers: {
         "Content-Type": "application/json",
         "Accept": "application/json",
         'X-CSRF-Token': csrf_token
        },
        body: JSON.stringify({quantity: quantity})
      })
      .then( resp => resp.json())
      .then( (json) => {
        $('#cart-link').text(`Cart (${json.data.attributes.item_count})`);
        fetchCart();
      });
    });
  })
}

function fetchCart() {
  const cartId = $('#cart-link').data('cartid');
  fetch('carts/' + cartId )
  .then(resp => resp.text())
  .then(text => {
    $('#product-container').html(text);
    attachUpdateLineItemListener();
  })
}

//Login and Sigh Up Listeners

function attachSignUpLinkListener() {
  $('.sign-up-link').click((event) => {
    event.preventDefault();
    clearNotifications();
    fetch('/users/sign_up')
    .then(resp => resp.text())
    .then(text => {
      $('#form-container').html(text);
      attachLoginLinkListener();
      attachSignUpFormListener();
      attachCancelListener();
    })
  })
}

function attachSignUpFormListener() {
  $('#new_user').submit((event) =>{
    event.preventDefault();
    const email = $('#user_email').val();
    const password = $('#user_password').val();
    const password_confirmation =  $('#user_password_confirmation').val();
    const csrf_token = $("meta[name='csrf-token']").attr('content');
    fetch('/users', {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       "Accept": "application/json",
       'X-CSRF-Token': csrf_token
      },
      body: JSON.stringify( {user: {email: email , password: password, password_confirmation: password_confirmation }})
    })
    .then(resp => resp.json())
    .then(json => {
      if (!!json.errors) {
        for(i in json.errors) {
          const message = `${i.charAt(0).toUpperCase() + i.slice(1)} ${json.errors[i]}`;
          $('.alert').append('<p>'+ message + '</p>');
        }
      } else {
        $('#form-container').empty();
        reloadCsrfAndNavBar();
        clearNotifications();
      }
    })
  })
}

function attachLogOutLinkListener() {
  $('#log-out-link').click((event) => {
    event.preventDefault();
    clearNotifications();
    const csrf_token = $("meta[name='csrf-token']").attr('content');
    fetch('/users/sign_out', {
      method: 'DELETE'
    })
    .then(resp => resp.text())
    .then(text => {
      attachLoginLinkListener();
      attachSignUpFormListener();
    })
  })
}

function attachLoginLinkListener() {
  $('.login-link').click((event) => {
    event.preventDefault();
    clearNotifications();
    fetch('/users/sign_in')
    .then(resp => resp.text())
    .then(text => {
      $('#form-container').html(text);
      attachLoginFormListener();
      attachSignUpLinkListener();
    })
  })
}

function attachLoginFormListener() {
  attachCancelListener();
  $('#new_user').submit((event) =>{
    event.preventDefault();
    const email = $('#user_email').val();
    const password = $('#user_password').val();
    const csrf_token = $("meta[name='csrf-token']").attr('content');
    const body = JSON.stringify({user: {email: email , password: password}})
    fetch('/users/sign_in', {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       "Accept": "application/json",
       'X-CSRF-Token': csrf_token
      },
      body: body
    })
    .then(resp => resp.json())
    .then(json => {
      if (!!json.error) {
        $('.alert').text(json.error);
      } else {
        reloadCsrfAndNavBar();
        clearNotifications();
        attachLogOutLinkListener()
      }
    })
  })
}

function attachCancelListener() {
  $('#cancel-button').click((event) => {
    event.preventDefault();
    clearNotifications();
    $('#form-container').empty();
  })
}

function clearNotifications() {
  $('.notice').empty();
  $('.alert').empty();
}

function attachSearchListener() {
  $('#search-form').submit((event) => {
    event.preventDefault();
    const search_string = $('#search-field').val();
    const csrf_token = $("meta[name='csrf-token']").attr('content');
    fetch('/products/search', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "Accept": "applicaiton/json",
        "X-CSRF-Token": csrf_token
      },
      body: JSON.stringify({search_string: search_string})
    })
    .then(resp => resp.json())
    .then((json) => {
      const Product = createProduct();
      $('#product-container').empty();
      json.data.forEach((dataObj) => {
        const newProduct = new Product(dataObj);
        const html = newProduct.generateProductCellHtml();
        $('#product-container').append(html);
        attachProductListeners();
      })
    })
  })
}
