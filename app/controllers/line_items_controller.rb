class LineItemsController < ApplicationController

  def create
    if !current_cart
      new_cart = Cart.create(user: current_user)
      session[:cart_id] = new_cart.id
    end
    @line_item = LineItem.update_or_create_to_cart(current_cart, line_item_params)
    respond_to do |format|
      format.json { render json: CartSerializer.new(current_cart), status: 200 }
    end
  end

  def update
    @line_item = current_cart.line_items.find_by(id:params[:id])
    @line_item.update(line_item_params)
    if @line_item.quantity == 0
      @line_item.destroy
    end
    respond_to do |format|
      format.json {render json: CartSerializer.new(current_cart), status: 200}
    end
  end

  private

  def line_item_params
    params.require(:line_item).permit(:product_id, :quantity)
  end
end
