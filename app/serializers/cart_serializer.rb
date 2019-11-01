class CartSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :item_count, :line_items
end
