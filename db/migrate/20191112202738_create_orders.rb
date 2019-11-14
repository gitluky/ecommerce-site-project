class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.references :cart, null: false, foreign_key: true
      t.references :shipping_address, null: false, foreign_key: true
      t.references :user, null: true, foreign_key: true
      t.string :status, default: 'Created'

      t.timestamps
    end
  end
end
