class AddCheckedOutToCarts < ActiveRecord::Migration[6.0]
  def change
    add_column :carts, :checked_out, :boolean, default: false
  end
end
