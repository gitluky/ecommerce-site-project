class Order < ApplicationRecord
  belongs_to :cart
  belongs_to :shipping_address, optional: true
  belongs_to :user

  def shipping_address_attributes=(shipping_address)
    self.shipping_address = ShippingAddress.find_or_create_by(street_1: shipping_address[:street_1], street_2: shipping_address[:street_2], city: shipping_address[:city], state: shipping_address[:state], zip_code: shipping_address[:zip_code])
  end

end
