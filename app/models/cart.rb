class Cart < ApplicationRecord
  belongs_to :user
  has_many :line_items, dependent: :destroy
  has_many :products, through: :line_items

  def item_count
    self.line_items.map {|line_item| line_item.quantity}.reduce {|quantity, n| quantity + n }
  end
end
