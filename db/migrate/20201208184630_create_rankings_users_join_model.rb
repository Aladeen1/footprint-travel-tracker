class CreateRankingsUsersJoinModel < ActiveRecord::Migration[6.0]
  def change
    create_table :registrations do |t|
      t.belongs_to :user
      t.belongs_to :ranking
      t.timestamps
    end
  end
end
