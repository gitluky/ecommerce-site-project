class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.references :cart, null: false, foreign_key: true
      t.references :shipping_address, null: false, foreign_key: true
      t.decimal :payment

      t.timestamps
    end
  end
end
