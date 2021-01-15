class AddVerificationToRankings < ActiveRecord::Migration[6.0]
  def change
    add_column :rankings, :verification, :integer
  end
end
