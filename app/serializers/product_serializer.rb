class ProductSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :description, :price, :stock, :images



end
