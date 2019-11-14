class Cart < ApplicationRecord
  belongs_to :user
  has_many :line_items, dependent: :destroy
  has_many :products, through: :line_items
  has_one :order

  def item_count
    self.line_items.map {|line_item| line_item.quantity}.reduce {|quantity, n| quantity + n } || 0
  end

  def total
    self.line_items.map {|line_item| line_item.item_total}.reduce {|quantity, n| quantity + n } || 0
  end

  def formatted_total
    "$#{'%.2f' % (total)}"
  end

end
