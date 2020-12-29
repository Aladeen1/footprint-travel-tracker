class CreateJoinTableAirportFlight < ActiveRecord::Migration[6.0]
  def change
    create_table :airports_flights, id: false do |t|
      t.belongs_to :airport, index: true
      t.belongs_to :flight, index: true
    end
  end
end
