class CreateAccountStatements < ActiveRecord::Migration[7.0]
  def change
    create_table :account_statements do |t|
      t.integer :closing_balance
      t.integer :total_credit
      t.integer :total_debit
      t.belongs_to :account, foreign_key: true
      t.timestamps
    end
  end
end
