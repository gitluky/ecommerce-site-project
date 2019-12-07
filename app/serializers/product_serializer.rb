class ProductSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :description, :formatted_price, :stock, :first_thumbnail



end
