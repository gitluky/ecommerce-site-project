class Product < ApplicationRecord
  include Rails.application.routes.url_helpers

  validates :name, presence: true
  has_many :product_categories, dependent: :destroy
  has_many :categories, through: :product_categories, dependent: :destroy
  has_many :line_items
  has_many :carts, through: :line_items
  has_many_attached :product_images


  def first_thumbnail
    rails_representation_url(self.product_images.first.variant(resize: '300x300').processed)
  end

  def thumbnails
    image_urls = []
    self.product_images.each do |image|
      image_urls << rails_representation_url(image.variant(resize: '300x300').processed)
    end
    image_urls
  end

  def formatted_price
    "$#{'%.2f' % self.price}"
  end

end
