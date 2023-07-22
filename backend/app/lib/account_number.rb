class AccountNumber
    require "securerandom"

    def self.generate 
        prefix = "ESAC"
        accounts = Account.all
        numbers = Array.new
        accounts.each do |account|
            numbers.push(account.account_number)
        end
       
        result = loop do
            acc_number = prefix + SecureRandom.hex(6).to_s.upcase
            break acc_number unless numbers.include? acc_number
        end
        result 
    end
end
