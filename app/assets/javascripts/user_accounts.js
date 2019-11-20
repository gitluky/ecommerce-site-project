function attachMyAccountListener() {
    $('#my_account_link').click( e => {
      e.preventDefault();
      fetch('/users/edit')
      .then(resp => resp.text())
      .then(text => {
        $('#product-container').html(text);
      });
    });
}
