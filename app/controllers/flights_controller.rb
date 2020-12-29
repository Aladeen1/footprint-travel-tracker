class FlightsController < ApplicationController
	def new
		
		@flight = Flight.new

		if !current_user.nil?
			@flights = current_user.flights.reverse
		end
		

		respond_to do |format|

		if params[:q]
  			@results = Airport.search_by_full_name(params[:q])
		else
  			@results = 'tabon'
		end

      		format.html
      		format.json { render json: { result: @results } }
    	end
	end

	def create
		@flight = Flight.new(flight_params)
		@flight.user = current_user
    	@flight.save!
    	redirect_to new_flight_path
  	end

  	def destroy
  		@flight = Flight.find(params[:id])
  		@flight.destroy

  		redirect_to new_flight_path
  	end

  	private

  	def flight_params
  	  params.require(:flight).permit(:depart, :arrival, :distance, :repetition)
  	end
	
end
