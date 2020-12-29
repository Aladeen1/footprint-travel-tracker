class AddRankingToUsers < ActiveRecord::Migration[6.0]
  def change
    add_reference :users, :ranking, foreign_key: true
  end
end
