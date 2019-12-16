class ProductsController < ApplicationController

  def index
    @category = Category.find_by(id: params[:category_id])
    @products = @category.products.where('stock > 0')
    respond_to do |format|
      format.json { render json: ProductSerializer.new(@products) }
      format.any { redirect_to root_path}
    end
  end

  def search
    @products = Product.where("products.name LIKE ?", "%#{params[:keywords]}%")
    render json: ProductSerializer.new(@products)
  end

  def show
    @product = Product.find_by(id: params[:id])
    @line_item = LineItem.new(product: @product)
    respond_to do |format|
      format.json { render 'products/show.html.erb', layout: false }
      format.any { redirect_to root_path }
    end
  end



end
