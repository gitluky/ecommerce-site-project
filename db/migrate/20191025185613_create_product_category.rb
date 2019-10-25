class CreateProductCategory < ActiveRecord::Migration[6.0]
  def change
    create_table :product_categories do |t|
      t.references :product, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true
    end
  end
end
