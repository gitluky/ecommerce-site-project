class ProductsController < ApplicationController
  
  def index
    @category = Category.find_by(id: params[:category_id])
    @products = @category.products.where('stock > 0')
    render json: ProductSerializer.new(@products)
  end

  def show
    @product = Product.find_by(id: params[:id])
    @line_item = LineItem.new(product: @product)
    render layout: false
  end

  def search
    @products = Product.where("products.name LIKE ?", "%#{params[:search_string]}%")
    render json: ProductSerializer.new(@products)
  end
end
