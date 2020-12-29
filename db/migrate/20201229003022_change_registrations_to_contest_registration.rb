class ChangeRegistrationsToContestRegistration < ActiveRecord::Migration[6.0]
  def change
  	rename_table :registrations, :contest_registrations
  end
end
