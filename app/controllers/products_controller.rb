class ProductsController < ApplicationController
  def index
    @category = Category.find_by(id: params[:category_id])
    @products = @category.products.where('stock > 0')
    render json: ProductSerializer.new(@products)
  end
end
