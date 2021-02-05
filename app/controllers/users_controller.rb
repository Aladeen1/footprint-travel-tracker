class UsersController < ApplicationController
	def show
		# policies = policy_scope(User)
		@user_suggestion = current_user
		@rankings = Ranking.all
		@user = User.find(params[:id])
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

		@airports = Flight.select("flights.id as flight_id", :city, :longitude, :latitude).joins("INNER JOIN airports ON (flights.iata_departure = airports.iata_code OR flights.iata_arrival = airports.iata_code)").where(user_id: @user.id).order("flight_id ASC")
	end

	def update
		@user = current_user
		@user.update(user_params)

		redirect_to user_path(User.find(params[:id]))

		flash[:alert] = "Thank you for your suggestion!"
	end

	private 

	def user_params
		params.require(:user).permit(:suggestion)
	end
end 

