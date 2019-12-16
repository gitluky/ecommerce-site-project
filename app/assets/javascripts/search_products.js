function attachSearchListener() {
  $('#search-form').submit((event) => {
    event.preventDefault();
    const keywords = $('#search-field').val();
    const url = `/products/search?keywords=${keywords}`
    history.pushState('product search', null, url)
    getSearchResults();
  })
}

function getSearchResults() {
  const url = location.href
  fetch(url)
  .then(resp => resp.json())
  .then((json) => {
    const Product = createProduct();
    $('#product-container').empty();
    json.data.forEach((dataObj) => {
      const newProduct = new Product(dataObj);
      const html = newProduct.generateProductCellHtml();
      $('#product-container').append(html);
    })
    attachProductListeners();
  })
}
