# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_20_105616) do
  create_table "account_statements", force: :cascade do |t|
    t.integer "closing_balance"
    t.integer "total_credit"
    t.integer "total_debit"
    t.integer "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_account_statements_on_account_id"
  end

  create_table "accounts", force: :cascade do |t|
    t.string "account_number"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_number"], name: "index_accounts_on_account_number", unique: true
    t.index ["user_id"], name: "index_accounts_on_user_id", unique: true
  end

  create_table "orders", force: :cascade do |t|
    t.string "item_name", null: false
    t.string "description", null: false
    t.integer "price", null: false
    t.string "type", null: false
    t.text "agreement_terms", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "account_id"
    t.integer "order_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_transactions_on_account_id"
    t.index ["order_id"], name: "index_transactions_on_order_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "firstname", null: false
    t.string "lastname", null: false
    t.string "password_digest", null: false
    t.string "email"
    t.string "phone_number", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "account_statements", "accounts"
  add_foreign_key "accounts", "users"
  add_foreign_key "transactions", "accounts"
  add_foreign_key "transactions", "orders"
end
