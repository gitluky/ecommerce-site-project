class Order < ApplicationRecord
  belongs_to :cart
  belongs_to :shipping_address, optional: true
  belongs_to :user

  accepts_nested_attributes_for :shipping_address

  # def address=(address)
  #   split_addr = address.split(', ')
  #   self.shipping_address = Address.find_or_create_by(street_1: split_addr[0], street_2: split_addr[1], city: split_addr[2], state: split_addr[3], zip_code: split_addr[4])
  # end
  #
  # def address
  #   self.shipping_address ? self.shipping_address.full_address : nil
  # end

end
