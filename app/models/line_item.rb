class LineItem < ApplicationRecord
  belongs_to :product
  belongs_to :cart

  def self.update_or_create_to_cart(cart, params)
    cart = Cart.find_by(id: cart)
    if product_found = cart.products.find_by(id: params[:product_id])
      line_item = cart.line_items.find_by(product_id: product_found.id)
      new_quantity = line_item.quantity+=params[:quantity].to_i
      line_item.update(quantity: new_quantity )
    else
      cart.line_items.create(params)
    end
  end

  def formatted_item_total
    "$#{'%.2f' % (self.item_total)}"
  end

  def item_total
    self.product.price * self.quantity
  end

end
