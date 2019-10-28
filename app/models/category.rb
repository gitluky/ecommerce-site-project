class Category < ApplicationRecord
  has_many :product_categories, dependent: :destroy
  has_many :products, through: :product_categories, dependent: :destroy


  def self.ordered_categories
    categories = []
    non_hot_deals_categories = self.all.where.not(name: 'Hot Deals').order(:name)
    categories << self.find_by(name: 'Hot Deals')
    categories << non_hot_deals_categories
    categories.flatten
  end

end
