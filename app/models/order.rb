class Order < ApplicationRecord
  belongs_to :cart
  belongs_to :shipping_address
  belongs_to :user
end
