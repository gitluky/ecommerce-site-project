class CartsController < ApplicationController

  def show
    @cart = Cart.find_by(id: current_cart.id)
  end
end
