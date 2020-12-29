class CreateFlights < ActiveRecord::Migration[6.0]
  def change
    create_table :flights do |t|
      t.string :depart
      t.string :arrival
      t.integer :distance

      t.timestamps
    end
  end
end
