class AddTotalDistanceToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :total_distance, :integer
  end
end
