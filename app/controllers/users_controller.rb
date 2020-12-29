class UsersController < ApplicationController
	def show
		@user = User.find(current_user.id)
		@flights = @user.flights

		@distance = 0
		@carbon = 0
		@flights.each do |flight|
			if flight.repetition != nil && flight.repetition != 0 
				@distance += (flight.distance.to_i * flight.repetition.to_i)
				@carbon += (((flight.distance.to_f * flight.repetition.to_f) * 235) / 1000000)
			end
		end

		@user.total_distance = @distance
		@user.save!
	end
end