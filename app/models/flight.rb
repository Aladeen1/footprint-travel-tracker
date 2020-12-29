class Flight < ApplicationRecord
	belongs_to :user

	validates :depart, presence: true
	validates :repetition, presence: true
	validates :distance, presence: true
	validates :repetition, presence: true
end
