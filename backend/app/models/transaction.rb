class Transaction < ApplicationRecord
    belongs_to :account
    belongs_to :order
end
