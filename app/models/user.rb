class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable :recoverable,
  devise :database_authenticatable, :registerable,
          :rememberable, :validatable
  has_many :carts
  has_many :line_items, through: :carts
  has_many :products, through: :line_items
  has_many :shipping_addresses
end
