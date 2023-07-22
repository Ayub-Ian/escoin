class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :account_number
      t.belongs_to :user, index: { unique: true }, foreign_key: true
      t.timestamps
    end
  end
end
