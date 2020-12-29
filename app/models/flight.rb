class Flight < ApplicationRecord
	belongs_to :user

	has_and_belongs_to_many :airports
	
	validates :depart, presence: true
	validates :repetition, presence: true
	validates :distance, presence: true
	validates :repetition, presence: true
end
