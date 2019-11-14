class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable :recoverable,
  devise :database_authenticatable, :registerable,
          :rememberable, :validatable
  has_many :carts
  has_many :line_items, through: :carts
  has_many :products, through: :line_items
  has_and_belongs_to_many :shipping_addresses
  has_many :orders
end
