class User < ApplicationRecord
    has_secure_password
    has_one :account
    has_many :account_statements, through: :account

    validates :firstname, :lastname, :password, :phone_number, presence: true
    validates :password, length: { in: 6..20 }
    validates :email,{uniqueness: true, presence: true}
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }


    before_create :normalize_name
    after_save :initialize_account

    private 
    def normalize_name
        self.firstname = firstname.downcase
        self.lastname = lastname.downcase 
    end

    def initialize_account
        @user = self
        @account = @user.create_account(account_number: AccountNumber.generate)
    end
end
