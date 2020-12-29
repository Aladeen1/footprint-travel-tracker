class CreateAirports < ActiveRecord::Migration[6.0]
  def change
    create_table :airports do |t|
      t.string :name
      t.string :city
      t.string :country
      t.string :iata_code
      t.decimal :latitude
      t.decimal :longitude

      t.timestamps
    end
  end
end
