class User < ApplicationRecord
	has_many :contest_registrations
  	has_many :rankings, through: :contest_registrations
	has_many :flights, dependent: :destroy
	# Include default devise modules. Others available are:
	# :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
	devise :database_authenticatable, :registerable,
	     :recoverable, :rememberable, :validatable
end
