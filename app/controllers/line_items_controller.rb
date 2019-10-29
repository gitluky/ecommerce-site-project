class LineItemsController < ApplicationController

  def create
    if !current_cart
      new_cart = Cart.create(user: current_user)
      session[:cart_id] = new_cart.id
    end
    @line_item = current_cart.line_items.add_to_cart(line_item_params)
  end


  private

  def line_item_params
    params.require(:line_item).permit(:product_id, :cart_id, :quantity)
  end
end
