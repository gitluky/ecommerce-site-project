class LineItemsController < ApplicationController

  def create
    if !current_cart
      new_cart = Cart.create(user: current_user)
      session[:cart_id] = new_cart.id
    end
    @line_item = LineItem.update_or_create_to_cart(current_cart, line_item_params)
    redirect_to cart_path(current_cart)
  end


  private

  def line_item_params
    params.require(:line_item).permit(:product_id, :quantity)
  end
end
