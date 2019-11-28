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

  def line_items_array
    all_line_items = []
    self.line_items.map do |line_item|
      all_line_items << {
        name: line_item.product.name,
        description: line_item.product.description,
        images: line_item.product.thumbnails,
        amount: (line_item.product.price * 100).to_i,
        currency: 'usd',
        quantity: line_item.quantity,
      }
    end
  end

end
