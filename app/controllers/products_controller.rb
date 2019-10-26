class ProductsController < ApplicationController
  def index
    @category = Category.find_by(id: params[:category_id])
    @products = @category.products.order(:name)
    render json: ProductSerializer.new(@products)
  end
end
