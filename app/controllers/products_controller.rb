class ProductsController < ApplicationController
  def index
    @category = Category.find_by(id: params[:category_id])
    @products = @category.products.order(:name)
    render json: @products, except: [:created_at, :updated_at]
  end
end
