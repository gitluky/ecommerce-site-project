class CartSerializer
  include FastJsonapi::ObjectSerializer
  
  attributes :id, :item_count
end
