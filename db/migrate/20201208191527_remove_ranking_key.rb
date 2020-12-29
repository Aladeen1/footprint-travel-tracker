class RemoveRankingKey < ActiveRecord::Migration[6.0]
  def change
    remove_reference :users, :ranking, foreign_key: true
  end
end
