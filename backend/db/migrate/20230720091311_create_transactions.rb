class CreateTransactions < ActiveRecord::Migration[7.0]
  def change
    create_table :transactions do |t|
      t.belongs_to :account, foreign_key: true
      t.belongs_to :order, foreign_key: true
      t.timestamps
    end
  end
end
