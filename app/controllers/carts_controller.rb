class CartsController < ApplicationController

  def show
    @cart = Cart.find_by(id: current_cart.id)

    respond_to do |format|
      format.json { render 'carts/show.html.erb', layout: false }
      format.any { redirect_to root_path}
    end
  end

end
