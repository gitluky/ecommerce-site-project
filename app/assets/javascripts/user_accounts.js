function attachMyAccountListener() {
    $('#my_account_link').click( e => {
      e.preventDefault();
      fetch('/users/edit')
      .then(resp => resp.text())
      .then(text => {
        $('#product-container').html(text);
      })
      .then(() => attachRemoveAddress())
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
        })
      })
    });
  });
}
