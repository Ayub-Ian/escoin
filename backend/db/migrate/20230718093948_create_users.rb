class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :firstname, null: false
      t.string :lastname, null: false
      t.string :password_digest, null: false
      t.string :email, unique: true
      t.string :phone_number, null: false
      t.timestamps
    end
  end
end
