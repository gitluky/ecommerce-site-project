class ShippingAddress < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :orders

  def full_address
    [self.street_1, self.street_2, self.city, self.state, self.zip_code].join(', ')
  end
end
