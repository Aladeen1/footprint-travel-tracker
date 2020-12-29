class Airport < ApplicationRecord

  has_and_belongs_to_many :flights
  
  include PgSearch::Model
	pg_search_scope :search_by_full_name, against: [:name, :city, :country, :iata_code],
	using: {
      tsearch: {
        prefix: true
      }
    }
end
