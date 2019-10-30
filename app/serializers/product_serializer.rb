class ProductSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :description, :item_price, :stock, :thumbnails



end
