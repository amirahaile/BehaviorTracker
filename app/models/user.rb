class User < ActiveRecord::Base
  has_secure_password # enables bcrypt

# Associations -----------------------------------------------------------------
  has_many :locations

# Validations ------------------------------------------------------------------
  validates :email,                          presence: true, uniqueness: true
  validates :first_name, :last_name,         presence: true
  validates :password, :confirm_password,    presence: true
end
