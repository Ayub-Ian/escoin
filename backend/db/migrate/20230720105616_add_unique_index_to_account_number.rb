class AddUniqueIndexToAccountNumber < ActiveRecord::Migration[7.0]
  def change
    add_index :accounts, :account_number, unique: true
  end
end
