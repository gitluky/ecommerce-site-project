class Order < ApplicationRecord
  belongs_to :cart
  belongs_to :shipping_address
end
