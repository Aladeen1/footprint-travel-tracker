class AddRepetitionToFlights < ActiveRecord::Migration[6.0]
  def change
  	add_column :flights, :repetition, :integer
  end
end
