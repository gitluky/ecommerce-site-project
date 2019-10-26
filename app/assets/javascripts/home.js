$(function() {
  attachCategoryListeners();
});

function attachCategoryListeners() {
  const categoryLinks = $('.category-link');
  categoryLinks.each((index, categoryLink) => {
    const categoryId = $(categoryLink).data('categoryid')
    $(categoryLink).click((event) => {
      event.preventDefault();
      fetch('/categories/' + categoryId + '/products')
        .then(resp => resp.json())
        .then(json => console.log(json))
    });
  });
}
