function toggleAddressFields() {
  $('#order_shipping_address_id').change(() => {
    if ($('#order_shipping_address_id').is(':checked')) {
      $('#address-fields').show();
    }
  })
  $('input[name="order[shipping_address_id]"]').change(() => {
    if (!$('#order_shipping_address_id').is(':checked'))
      $('#address-fields').hide();
  })
}

function attachProcessOrderLinkListener(callback) {
  $('#new_order').submit((event) => {
    event.preventDefault();
    let body;
    const csrf_token = $("meta[name='csrf-token']").attr('content');
    if ($('#order_shipping_address_id').is(':checked')) {
      body = {
        order: {
          shipping_address_attributes: {
            street_1: $('#order_shipping_address_attributes_street_1').val(),
            street_2: $('#order_shipping_address_attributes_street_2').val(),
            city: $('#order_shipping_address_attributes_city').val(),
            state: $('#order_shipping_address_attributes_state').val(),
            zipcode: $('#order_shipping_address_attributes_zipcode').val()
          }
        }
      };

    } else {
      body = {
        order: {
          shipping_address_id: $('input[name="order[shipping_address_id]"]:checked').val()
        }
      };
    }
    callback(csrf_token, body);
  });
}

function processOrderFetchRequest(csrf_token, body) {
  fetch('/process_order', {
    method: 'POST',
    headers: {
     "Content-Type": "application/json",
     "Accept": "application/json",
     'X-CSRF-Token': csrf_token
    },
    body: JSON.stringify(body)
  })
  .then(resp => resp.json())
  .then((json) => {
    const stripe = Stripe('pk_test_4MTh5FR8tF64XSKKPUJr0YxP002P8e3dSV');
    stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: json.id
    }).then(function (result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    });
  });
}
