$( document ).on('turbolinks:load', function() {
  if ($('body').attr('controller') == 'carts' && $('body').attr('action') == 'show') {
    attachUpdateLineItemListener();
  }
});

function attachUpdateLineItemListener() {
  $('#edit_line_item_11').submit((event) => {
    event.preventDefault();
    const lineItemId = $('#edit_line_item_11').data('lineitemid');
    const quantity = $('#line_item_quantity').val();
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
      console.log(json)
      $('#cart-link').text(`Cart (${json.data.attributes.item_count})`);
    });
  });
}
