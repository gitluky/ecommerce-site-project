class Product < ApplicationRecord
  validates :name, presence: true
  has_many :product_categories
  has_many :categories, through: :product_categories
  has_many_attached :product_images
end
