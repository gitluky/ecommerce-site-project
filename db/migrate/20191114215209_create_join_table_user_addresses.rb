class CreateJoinTableUserAddresses < ActiveRecord::Migration[6.0]
  def change
    create_join_table :users, :shipping_addresses do |t|
      # t.index [:user_id, :shipping_address_id]
      # t.index [:shipping_address_id, :user_id]
    end
  end
end
