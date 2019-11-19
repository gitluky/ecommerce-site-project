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
