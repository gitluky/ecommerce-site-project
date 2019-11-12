class CreateShippingAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :shipping_addresses do |t|
      t.string :street_1
      t.string :street_2
      t.string :city
      t.string :state
      t.string :zip_code

      t.timestamps
    end
  end
end
