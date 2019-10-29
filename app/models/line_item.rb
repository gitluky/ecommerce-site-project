class LineItem < ApplicationRecord
  belongs_to :product
  belongs_to :cart

  def add_to_cart(params)
    cart = Cart.find_by(id: params[:cart_id])
    if iem_found = cart.products.find_by(id: params[:product_id])
      item_found.update(params)
    else
      cart.line_items.create(params)
    end
  end

  def item_total
    self.product.price * self.quantity
  end

end
