class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :email, :shipping_addresses, :errors
end
