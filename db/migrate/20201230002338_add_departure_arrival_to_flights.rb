class AddDepartureArrivalToFlights < ActiveRecord::Migration[6.0]
  def change
    add_column :flights, :iata_departure, :string
    add_index :flights, :iata_departure
    add_column :flights, :iata_arrival, :string
    add_index :flights, :iata_arrival
  end
end
