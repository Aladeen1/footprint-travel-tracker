class Ranking < ApplicationRecord
	has_many :contest_registrations
  	has_many :users, through: :contest_registrations
end
