class Product < ApplicationRecord
  include Rails.application.routes.url_helpers

  validates :name, presence: true
  has_many :product_categories, dependent: :destroy
  has_many :categories, through: :product_categories, dependent: :destroy
  has_many_attached :product_images

  def images
    i = 0
    image_urls = {}
    self.product_images.each do |image|
      image_urls[i] = rails_blob_path(image)
      i+=1
    end
    image_urls
  end

end
