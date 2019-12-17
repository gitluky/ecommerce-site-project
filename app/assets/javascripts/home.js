$( document ).on('turbolinks:load', function() {
  if ($('body').data('controller') == 'home' && $('body').data('action') == 'index') {
    displayProducts();
    attachCategoryListeners();
    attachCartLinkListener();
    attachSignUpLinkListener();
    attachSearchListener();
    attachMyAccountListener();
    $('.login-link').length === 0 ? attachLogOutLinkListener() : attachLoginLinkListener();
  }
  $(window).on('popstate', (e) => {
    reloadCsrfAndNavBar();
    if (!!location.href.match(/.*carts\/\d+/)) {
      fetchCart();
    } else if (!!location.href.match(/.*search\?keywords=/)) {
      getSearchResults();
    } else if (!!location.href.match(/.*categories\/\d+\/products$/)) {
      displayProducts();
    } else if (!!location.href.match(/.*categories\/\d+\/products\/\d+/)) {
      displayProduct();
    } else if (!!location.href.match(/.*users\/edit/)) {
      fetchAccount();
    }
  })
});

function clearNotifications() {
  $('.notice').empty();
  $('.alert').empty();
}

function reloadCsrfAndNavBar() {
  fetch('/navbar')
  .then(resp => resp.text())
  .then(text => {
    $('#form-container').empty();
    $('#nav').html(text);
    attachLogOutLinkListener();
    attachCartLinkListener();
    attachMyAccountListener();
  })
  fetch('/csrf')
  .then(resp => resp.text())
  .then(text => {
    $('meta[name^="csrf"]').remove();
    $('head').prepend(text);
  })
}
