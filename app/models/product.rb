class Product < ApplicationRecord
  validates :name, presence: true
  has_many_attached :product_images
end
