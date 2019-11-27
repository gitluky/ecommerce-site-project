function fetchCart() {
  const url = location.href
  fetch(url)
  .then(resp => resp.text())
  .then(text => {
    $('#product-container').html(text);
    attachUpdateLineItemListener();
    attachCheckOutLinkListener();
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

function attachCheckOutLinkListener() {
  $('#checkout-button').click((event) => {
    event.preventDefault();
    fetch('/checkout')
    .then(resp => resp.text())
    .then(text => {
      $('#product-container').html(text);
      attachUpdateLineItemListener();
      attachProcessOrderLinkListener(processOrderFetchRequest);
      toggleAddressFields();
    })
  })
}
