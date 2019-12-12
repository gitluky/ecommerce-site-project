function attachMyAccountListener() {
    $('#my_account_link').click( e => {
      e.preventDefault();
      history.pushState('account', null, '/users/edit');
      fetchAccount();
    });
}

function fetchAccount() {
  fetch(location.href)
  .then(resp => resp.text())
  .then(text => {
    $('#product-container').html(text);
  })
  .then(() => {
    attachRemoveAddress();
    attachUpdateListener();
    cancelAccountUpdateListener();
  });
}

function attachRemoveAddress() {
  $('a[data-link="remove"]').each((i,el) => {
    $(el).click((e) => {
      e.preventDefault();
      const addressId = $(el).data('address-id');
      fetch('/shipping_addresses/' + addressId + '/remove_address')
      .then(resp => {
        fetch('/shipping_addresses/user_addresses')
        .then(resp => resp.text())
        .then(text => {
          $('#address-list').html(text);
          attachRemoveAddress();
        })
      })
    });
  });
}

function cancelAccountUpdateListener() {
  $('#cancel-button').click((event) => {
    event.preventDefault();
    history.back();
  })
}

function attachUpdateListener() {
  $('#edit_user').submit((event) => {
    event.preventDefault();
    const csrf_token = $("meta[name='csrf-token']").attr('content');
    const values = {
      user: {
        password: $('#user_password').val(),
        password_confirmation: $('#user_password_confirmation').val(),
        current_password: $('#user_current_password').val(),
        shipping_addresses_attributes: {
          street_1: $('#user_shipping_addresses_attributes_0_street_1').val(),
          street_2: $('#user_shipping_addresses_attributes_0_street_2').val(),
          city: $('#user_shipping_addresses_attributes_0_city').val(),
          state: $('#user_shipping_addresses_attributes_0_state').val(),
          zip_code: $('#user_shipping_addresses_attributes_0_zip_code').val()
        }
      }
    };

    fetch('/users', {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "X-CSRF-Token": csrf_token
      },
      body: JSON.stringify(values)
    })
    .then(resp => resp.json())
    .then(json => {
      fetchAccount();
      displayNotificationsAlerts(json)
    });
  });
}

function displayNotificationsAlerts(json) {
  clearNotifications();
  const json_data = json.data.attributes.errors;
  for (let i in json_data) {
	  for (let x in json_data[i]) {
      let field = i.replace('_', ' ').replace(/^\w/, c => c.toUpperCase());
      $('.alert').append(`<p>${field} ${json_data[i][x]}</p>`)
    }
  }
}
