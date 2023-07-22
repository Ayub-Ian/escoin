class Account < ApplicationRecord
    belongs_to :user
    has_many :account_statements
    has_many :transactions
    has_many :orders, through: :transactions

    validates! :account_number, uniqueness: true
end
