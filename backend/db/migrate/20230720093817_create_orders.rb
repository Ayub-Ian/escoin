class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.string :item_name, null: false
      t.string :description, null: false
      t.integer :price, null: false
      t.string :type, null: false
      t.text :agreement_terms, null: false
      t.timestamps
    end
  end
end
