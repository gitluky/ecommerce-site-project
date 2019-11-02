class CartsController < ApplicationController

  def show
    @cart = Cart.find_by(id: current_cart.id)
    render partial: 'cart'
  end
end
