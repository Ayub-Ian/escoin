class User < ApplicationRecord
    has_secure_password

    validates :firstname, :lastname, :password, :phone_number, presence: true
    validates :password, length: { in: 6..20 }
    validates :email,{uniqueness: true, presence: true}
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }


    before_save :normalize_name

    private 
    def normalize_name
        self.firstname = firstname.downcase
        self.lastname = lastname.downcase 
    end
end
