class AccountsController < ApplicationController
    def index
        accounts = Account.all
        numbers = Array.new
        accounts.each do |account|
            numbers.push(account.account_number)
        end
        render json: numbers
    end
end
