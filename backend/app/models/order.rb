class Order < ApplicationRecord
    has_many :transactions
    has_one :account, through: :account
end
