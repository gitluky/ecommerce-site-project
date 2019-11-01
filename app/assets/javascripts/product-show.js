$( document ).on('turbolinks:load', function() {
  if ($('body').data('controller') == 'products' && $('body').data('action') == 'show') {
      attachAddToCartListener();
  }
});


function attachAddToCartListener() {
  $('#new_line_item').submit((event) => {
    debugger;
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
      debugger;
      $('#cart-link').text(`Cart (${json.data.attributes.item_count})`);
    });
  })
}
