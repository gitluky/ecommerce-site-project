class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable :recoverable,
  devise :database_authenticatable, :registerable,
          :rememberable, :validatable
  has_many :carts
  has_many :line_items, through: :carts
  has_many :products, through: :line_items
  has_and_belongs_to_many :shipping_addresses
  has_many :orders

  def shipping_addresses_attributes=(shipping_address)
    if shipping_address[:street_1] != ''
      self.shipping_addresses << ShippingAddress.find_or_create_by(street_1: shipping_address[:street_1], street_2: shipping_address['street_2'], city: shipping_address[:city], state: shipping_address[:state], zip_code: shipping_address[:zip_code])
    end
  end

  def add_shipping_address(address_obj)
    if !self.shipping_addresses.include?(address_obj)
      self.shipping_addresses << address_obj
      self.save
    end
  end

end
