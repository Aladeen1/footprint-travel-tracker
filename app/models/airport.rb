class Airport < ApplicationRecord  
  include PgSearch::Model
	pg_search_scope :search_by_full_name, against: [:name, :city, :country, :iata_code],
	using: {
      tsearch: {
        prefix: true
      }
    }
end
